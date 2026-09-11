import { reduce } from "@repo/core";
import { prisma } from "@repo/database";
import { ActionType, Audience, Severity, Status, Surface } from "@repo/types";
import type { Action, SharedObject, ViewRef } from "@repo/types";

type Listener = (issue: SharedObject) => void;

const listeners = new Set<Listener>();

export function onChange(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

function announce(issue: SharedObject) {
    for (const listener of listeners) listener(issue);
}

const INCLUDE = { timeline: { orderBy: { at: "asc" } } } as const;

export async function createIssue(
    action: Extract<Action, { type: ActionType.Intake }>,
    raisedOn: Surface,
): Promise<SharedObject> {
    const row = await prisma.issue.create({
        data: {
            raisedBy: action.by,
            raisedOn,
            what: action.what,
            severity: action.severity,
            affected: action.affected,
            status: Status.Triage,
            version: 1,
            timeline: { create: { by: action.by, what: `reported: ${action.what}` } },
        },
        include: INCLUDE,
    });
    return toDomain(row);
}

export async function getIssue(id: string): Promise<SharedObject | null> {
    const row = await prisma.issue.findUnique({ where: { id }, include: INCLUDE });
    return row ? toDomain(row) : null;
}

export async function listIssues(): Promise<SharedObject[]> {
    const rows = await prisma.issue.findMany({
        include: INCLUDE,
        orderBy: { createdAt: "desc" },
        take: 50,
    });
    return rows.map(toDomain);
}

/**
 * Persist the result of the pure reducer. The reducer decides what the next
 * object is; this only writes it down and tells everyone.
 */
export async function persist(current: SharedObject, action: Action): Promise<SharedObject> {
    const next = reduce(current, action);
    const entry = next.timeline[next.timeline.length - 1];

    const row = await prisma.issue.update({
        where: { id: current.id },
        data: {
            version: next.version,
            what: next.facts.what,
            severity: next.facts.severity,
            affected: next.facts.affected,
            acknowledgedBy: next.facts.acknowledgedBy,
            proposedFix: next.facts.proposedFix,
            approvedBy: next.facts.approvedBy,
            status: next.facts.status,
            framings: next.framings,
            ...(entry ? { timeline: { create: { by: entry.by, what: entry.what } } } : {}),
        },
        include: INCLUDE,
    });

    const issue = toDomain(row);
    announce(issue);
    return issue;
}

export function publish(issue: SharedObject) {
    announce(issue);
}

export async function addView(issueId: string, view: ViewRef): Promise<void> {
    if (view.surface === Surface.Web) return;
    await prisma.view.create({
        data: {
            issueId,
            surface: view.surface,
            audience: view.audience,
            channel: view.surface === Surface.Slack ? view.channel : null,
            ts: view.surface === Surface.Slack ? view.ts : null,
            chatId: view.surface === Surface.Telegram ? BigInt(view.chatId) : null,
            messageId: view.surface === Surface.Telegram ? view.messageId : null,
        },
    });
}

export async function viewsOf(issueId: string): Promise<ViewRef[]> {
    const rows = await prisma.view.findMany({ where: { issueId } });
    return rows.map(toView);
}

export async function dropView(issueId: string, view: ViewRef): Promise<void> {
    if (view.surface === Surface.Slack) {
        await prisma.view.deleteMany({ where: { issueId, surface: Surface.Slack, ts: view.ts } });
    }
    if (view.surface === Surface.Telegram) {
        await prisma.view.deleteMany({
            where: { issueId, surface: Surface.Telegram, messageId: view.messageId },
        });
    }
}

type Row = {
    id: string;
    createdAt: Date;
    version: number;
    raisedBy: string;
    raisedOn: string;
    what: string;
    severity: string;
    affected: number;
    acknowledgedBy: string | null;
    proposedFix: string | null;
    approvedBy: string | null;
    status: string;
    framings: unknown;
    timeline: { at: Date; by: string; what: string }[];
};

function toDomain(row: Row): SharedObject {
    return {
        id: row.id,
        version: row.version,
        createdAt: row.createdAt.toISOString(),
        raisedBy: row.raisedBy,
        raisedOn: row.raisedOn as Surface,
        facts: {
            what: row.what,
            severity: row.severity as Severity,
            affected: row.affected,
            acknowledgedBy: row.acknowledgedBy,
            proposedFix: row.proposedFix,
            approvedBy: row.approvedBy,
            status: row.status as Status,
        },
        framings: (row.framings ?? {}) as SharedObject["framings"],
        timeline: row.timeline.map((entry) => ({
            at: entry.at.toISOString(),
            by: entry.by,
            what: entry.what,
        })),
    };
}

function toView(row: {
    surface: string;
    audience: string;
    channel: string | null;
    ts: string | null;
    chatId: bigint | null;
    messageId: number | null;
}): ViewRef {
    if (row.surface === Surface.Slack) {
        return {
            surface: Surface.Slack,
            audience: row.audience as Audience,
            channel: row.channel ?? "",
            ts: row.ts ?? "",
        };
    }
    return {
        surface: Surface.Telegram,
        audience: row.audience as Audience,
        chatId: Number(row.chatId ?? 0),
        messageId: row.messageId ?? 0,
    };
}
