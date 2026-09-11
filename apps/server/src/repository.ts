import { createObject, reduce } from "@repo/core";
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
            timeline: {
                create: {
                    by: action.by,
                    what: `reported: ${action.what}`,
                    type: action.type,
                    payload: action,
                },
            },
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
 * Every version this issue has ever been, oldest first.
 *
 * Nothing is stored twice to make this work. The event log already holds every
 * action that was applied, and the reducer is pure, so replaying the log from a
 * fresh object rebuilds each version exactly as it was. This is what lets a
 * window show the past without a second object and without posting a new card.
 */
export async function versionsOf(issueId: string): Promise<SharedObject[]> {
    const row = await prisma.issue.findUnique({ where: { id: issueId }, include: INCLUDE });
    if (!row) return [];

    // `INCLUDE` already brought the event rows back with the issue, ordered, so
    // the log is in hand. Querying for it again would double a round trip that
    // a Slack modal is waiting on against a trigger expiring in three seconds.
    const events = row.timeline;

    // Rows written before events carried their action cannot be replayed.
    // Inferring one from the English would put words in someone's mouth, so the
    // honest answer is the live object on its own.
    if (events.some((event) => !event.type)) return [toDomain(row)];

    const seed: SharedObject = {
        ...createObject(row.id, row.raisedBy, row.raisedOn as Surface),
        createdAt: row.createdAt.toISOString(),
    };

    const versions: SharedObject[] = [seed];
    let current = seed;

    for (const event of events) {
        const next = reduce(current, event.payload as unknown as Action);
        // The reducer stamps the new entry with now, because that is true when
        // an action is applied. Replaying, the event knows when it happened.
        const entry = next.timeline[next.timeline.length - 1];
        if (entry) {
            next.timeline = [
                ...next.timeline.slice(0, -1),
                { ...entry, at: event.at.toISOString() },
            ];
        }
        versions.push(next);
        current = next;
    }

    return versions;
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
            ...(entry
                ? {
                      timeline: {
                          create: {
                              by: entry.by,
                              what: entry.what,
                              type: action.type,
                              payload: action,
                          },
                      },
                  }
                : {}),
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
    timeline: { at: Date; by: string; what: string; type: string | null; payload: unknown }[];
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
