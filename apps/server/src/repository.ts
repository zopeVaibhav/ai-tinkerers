import { reduce } from "@repo/core";
import { prisma } from "@repo/database";
import { Audience, ConflictStatus, Surface } from "@repo/types";
import type {
    Action,
    ClaimAction,
    Condition,
    Conflict,
    Decision,
    Subsystem,
    ViewRef,
} from "@repo/types";

type Listener = (conflict: Conflict) => void;

const listeners = new Set<Listener>();

export function onChange(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

function announce(conflict: Conflict) {
    for (const listener of listeners) listener(conflict);
}

const INCLUDE = {
    decisionA: true,
    decisionB: true,
    timeline: { orderBy: { at: "asc" } },
    // surface and audience only: the identifiers are for fan-out, not for a reader,
    // and a Telegram chatId is a BigInt that would not survive JSON.
    views: { select: { surface: true, audience: true } },
} as const;

export type NewDecision = {
    surface: Surface;
    threadKey: string;
    threadName: string;
    decidedBy: string;
    rawText: string;
    subsystem: Subsystem;
    condition: Condition;
    action: ClaimAction;
};

export async function createDecision(input: NewDecision): Promise<Decision> {
    const row = await prisma.decision.create({ data: input });
    return toDecision(row);
}

/** Superseded decisions are invisible here, which is what stops a resolved
 *  conflict reappearing forever. */
export async function candidatesFor(
    subsystem: Subsystem,
    condition: Condition,
): Promise<Decision[]> {
    const rows = await prisma.decision.findMany({
        where: { subsystem, condition, supersededById: null },
        orderBy: { createdAt: "desc" },
    });
    return rows.map(toDecision);
}

/** The live claim a thread currently stands behind, if it has one. */
export async function decisionForThread(threadKey: string): Promise<Decision | null> {
    const row = await prisma.decision.findFirst({
        where: { threadKey, supersededById: null },
        orderBy: { createdAt: "desc" },
    });
    return row ? toDecision(row) : null;
}

/** A thread changing its mind is a correction, not a conflict. */
export async function supersede(oldId: string, newId: string): Promise<void> {
    await prisma.decision.update({ where: { id: oldId }, data: { supersededById: newId } });
}

export async function listDecisions(): Promise<Decision[]> {
    const rows = await prisma.decision.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
    return rows.map(toDecision);
}

export async function createConflict(a: Decision, b: Decision): Promise<Conflict | null> {
    const existing = await prisma.conflict.findFirst({
        where: {
            OR: [
                { decisionAId: a.id, decisionBId: b.id },
                { decisionAId: b.id, decisionBId: a.id },
            ],
        },
    });
    if (existing) return null;

    const row = await prisma.conflict.create({
        data: { decisionAId: a.id, decisionBId: b.id, version: 1, status: ConflictStatus.Open },
        include: INCLUDE,
    });

    const conflict = toConflict(row);
    announce(conflict);
    return conflict;
}

export async function getConflict(id: string): Promise<Conflict | null> {
    const row = await prisma.conflict.findUnique({ where: { id }, include: INCLUDE });
    return row ? toConflict(row) : null;
}

export async function listConflicts(): Promise<Conflict[]> {
    const rows = await prisma.conflict.findMany({
        include: INCLUDE,
        orderBy: { createdAt: "desc" },
        take: 50,
    });
    return rows.map(toConflict);
}

/**
 * Persist the result of the pure reducer. The reducer decides what the next
 * conflict is; this only writes it down and tells everyone.
 */
export async function persist(current: Conflict, action: Action): Promise<Conflict> {
    const next = reduce(current, action);
    const entry = next.timeline[next.timeline.length - 1];

    const row = await prisma.conflict.update({
        where: { id: current.id },
        data: {
            version: next.version,
            status: next.status,
            acknowledgedBy: next.acknowledgedBy,
            resolution: next.resolution,
            framings: next.framings,
            ...(entry ? { timeline: { create: { by: entry.by, what: entry.what } } } : {}),
        },
        include: INCLUDE,
    });

    const conflict = toConflict(row);
    announce(conflict);
    return conflict;
}

export async function addView(conflictId: string, view: ViewRef): Promise<void> {
    if (view.surface === Surface.Web) return;
    await prisma.view.create({
        data: {
            conflictId,
            surface: view.surface,
            audience: view.audience,
            channel: view.surface === Surface.Slack ? view.channel : null,
            ts: view.surface === Surface.Slack ? view.ts : null,
            threadTs: view.surface === Surface.Slack ? view.threadTs : null,
            chatId: view.surface === Surface.Telegram ? BigInt(view.chatId) : null,
            messageId: view.surface === Surface.Telegram ? view.messageId : null,
        },
    });
}

export async function viewsOf(conflictId: string): Promise<ViewRef[]> {
    const rows = await prisma.view.findMany({ where: { conflictId } });
    return rows.map(toView);
}

export async function dropView(conflictId: string, view: ViewRef): Promise<void> {
    if (view.surface === Surface.Slack) {
        await prisma.view.deleteMany({
            where: { conflictId, surface: Surface.Slack, ts: view.ts },
        });
    }
    if (view.surface === Surface.Telegram) {
        await prisma.view.deleteMany({
            where: { conflictId, surface: Surface.Telegram, messageId: view.messageId },
        });
    }
}

type DecisionRow = {
    id: string;
    createdAt: Date;
    surface: string;
    threadKey: string;
    threadName: string;
    decidedBy: string;
    rawText: string;
    subsystem: string;
    condition: string;
    action: string;
    supersededById: string | null;
};

function toDecision(row: DecisionRow): Decision {
    return {
        id: row.id,
        createdAt: row.createdAt.toISOString(),
        surface: row.surface as Surface,
        threadKey: row.threadKey,
        threadName: row.threadName,
        decidedBy: row.decidedBy,
        rawText: row.rawText,
        subsystem: row.subsystem as Subsystem,
        condition: row.condition as Condition,
        action: row.action as ClaimAction,
        supersededById: row.supersededById,
    };
}

function toConflict(row: {
    id: string;
    createdAt: Date;
    version: number;
    status: string;
    acknowledgedBy: string | null;
    resolution: string | null;
    framings: unknown;
    decisionA: DecisionRow;
    decisionB: DecisionRow;
    timeline: { at: Date; by: string; what: string }[];
    views: { surface: string; audience: string }[];
}): Conflict {
    return {
        id: row.id,
        version: row.version,
        createdAt: row.createdAt.toISOString(),
        status: row.status as ConflictStatus,
        acknowledgedBy: row.acknowledgedBy,
        resolution: row.resolution,
        a: toDecision(row.decisionA),
        b: toDecision(row.decisionB),
        framings: (row.framings ?? {}) as Conflict["framings"],
        timeline: row.timeline.map((entry) => ({
            at: entry.at.toISOString(),
            by: entry.by,
            what: entry.what,
        })),
        views: row.views.map((view) => ({
            surface: view.surface as Surface,
            audience: view.audience as Audience,
        })),
    };
}

function toView(row: {
    surface: string;
    audience: string;
    channel: string | null;
    ts: string | null;
    threadTs: string | null;
    chatId: bigint | null;
    messageId: number | null;
}): ViewRef {
    if (row.surface === Surface.Slack) {
        return {
            surface: Surface.Slack,
            audience: row.audience as Audience,
            channel: row.channel ?? "",
            ts: row.ts ?? "",
            threadTs: row.threadTs ?? "",
        };
    }
    return {
        surface: Surface.Telegram,
        audience: row.audience as Audience,
        chatId: Number(row.chatId ?? 0),
        messageId: row.messageId ?? 0,
    };
}
