export type Surface = "slack" | "telegram" | "web";

export type Audience = "engineer" | "lead" | "customer";

/**
 * A live window onto one shared object. The subscription table maps
 * one object id to many of these. This is the core mechanism: we never
 * forward messages between platforms, we re-render every registered view.
 */
export type ViewRef =
    | { surface: "slack"; channel: string; ts: string }
    | { surface: "telegram"; chatId: number; messageId: number }
    | { surface: "web"; connectionId: string };

export type TimelineEntry = {
    at: string;
    by: string;
    what: string;
};

export type Severity = "low" | "medium" | "high";

export type Status = "triage" | "awaiting_approval" | "approved" | "resolved";

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
    | { type: "intake"; by: string; what: string; severity: Severity; affected: number }
    | { type: "acknowledge"; by: string }
    | { type: "propose"; by: string; fix: string }
    | { type: "approve"; by: string }
    | { type: "reject"; by: string; reason: string }
    | { type: "resolve"; by: string }
    | { type: "note"; by: string; text: string }
    | { type: "reframe"; by: string; framings: Partial<Record<Audience, string>> };
