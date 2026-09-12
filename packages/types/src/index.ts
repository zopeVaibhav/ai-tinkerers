import {
    ActionType,
    Audience,
    ClaimAction,
    Condition,
    ConflictStatus,
    Side,
    Subsystem,
    Surface,
} from "./enums";

export { ActionType, Audience, ClaimAction, Condition, ConflictStatus, Side, Subsystem, Surface };

/**
 * A live window onto one conflict. The subscription table maps one conflict id
 * to many of these. This is the core mechanism: we never forward messages
 * between platforms, we re-render every registered view.
 */
export type ViewRef =
    | { surface: Surface.Slack; audience: Audience; channel: string; ts: string; threadTs: string }
    | { surface: Surface.Telegram; audience: Audience; chatId: number; messageId: number }
    | { surface: Surface.Web; audience: Audience; connectionId: string };

export type TimelineEntry = {
    at: string;
    by: string;
    what: string;
};

/**
 * What one thread concluded. The claim is three closed-vocabulary values, so
 * comparing two decisions is an equality check and never a judgement call.
 */
export type Decision = {
    id: string;
    createdAt: string;
    surface: Surface;
    threadKey: string;
    threadName: string;
    decidedBy: string;
    rawText: string;
    subsystem: Subsystem;
    condition: Condition;
    action: ClaimAction;
    supersededById: string | null;
};

/**
 * The subscription table projected down to what a reader needs: which surface
 * carries this conflict, and who that window is written for. No identifiers, so
 * it survives JSON — a Telegram view's chatId is a BigInt and would not.
 */
export type ViewSummary = { surface: Surface; audience: Audience };

/**
 * Two decisions that cannot both be true. This is the shared object — the thing
 * that renders in both threads at once and updates in place everywhere.
 */
export type Conflict = {
    id: string;
    version: number;
    createdAt: string;
    status: ConflictStatus;
    acknowledgedBy: string | null;
    resolution: string | null;
    a: Decision;
    b: Decision;
    framings: Partial<Record<Audience, string>>;
    timeline: TimelineEntry[];
    /** Every live window onto this conflict. Empty until it has been posted. */
    views: ViewSummary[];
};

/**
 * Every inbound event from every surface is normalised into one of these
 * before it touches the store. Nothing downstream knows which app it came from.
 */
export type Action =
    | { type: ActionType.Acknowledge; by: string }
    | { type: ActionType.Resolve; by: string; resolution: string }
    | { type: ActionType.Supersede; by: string; winner: Side; note: string }
    | { type: ActionType.Note; by: string; text: string }
    | { type: ActionType.Reframe; by: string; framings: Partial<Record<Audience, string>> };
