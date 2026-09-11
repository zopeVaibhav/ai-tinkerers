import { ActionType, Audience, Severity, Status, Surface } from "./enums";

export { ActionType, Audience, Severity, Status, Surface };

/**
 * A live window onto one shared object. The subscription table maps
 * one object id to many of these. This is the core mechanism: we never
 * forward messages between platforms, we re-render every registered view.
 */
export type ViewRef =
    | { surface: Surface.Slack; audience: Audience; channel: string; ts: string }
    | { surface: Surface.Telegram; audience: Audience; chatId: number; messageId: number }
    | { surface: Surface.Web; audience: Audience; connectionId: string };

export type TimelineEntry = {
    at: string;
    by: string;
    what: string;
};

/**
 * The single source of truth. Every surface renders this and nothing else.
 *
 * `facts` is what is true — deterministic, written by actions.
 * `framings` is the agent's per-audience wording of those same facts.
 * Renderers read both. Renderers never call a model.
 */
export type SharedObject = {
    id: string;
    version: number;
    createdAt: string;
    raisedBy: string;
    raisedOn: Surface;
    facts: {
        what: string;
        severity: Severity;
        affected: number;
        acknowledgedBy: string | null;
        proposedFix: string | null;
        approvedBy: string | null;
        status: Status;
    };
    framings: Partial<Record<Audience, string>>;
    timeline: TimelineEntry[];
};

/**
 * Every inbound event from every surface is normalised into one of these
 * before it touches the store. Nothing downstream knows which app it came from.
 */
export type Action =
    | { type: ActionType.Intake; by: string; what: string; severity: Severity; affected: number }
    | { type: ActionType.Acknowledge; by: string }
    | { type: ActionType.Propose; by: string; fix: string }
    | { type: ActionType.Approve; by: string }
    | { type: ActionType.Reject; by: string; reason: string }
    | { type: ActionType.Resolve; by: string }
    | { type: ActionType.Note; by: string; text: string }
    | { type: ActionType.Reframe; by: string; framings: Partial<Record<Audience, string>> };
