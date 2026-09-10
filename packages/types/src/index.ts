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

/**
 * The single source of truth. Every surface renders this and nothing else.
 * `facts` is what is true. `framings` is the agent's per-audience wording.
 * Renderers read both, but never call a model.
 */
export type SharedObject = {
    id: string;
    version: number;
    facts: {
        count: number;
        status: "open" | "awaiting_approval" | "resolved";
    };
    framings: Partial<Record<Audience, string>>;
    timeline: TimelineEntry[];
};

/**
 * Every inbound event from every surface is normalised into one of these
 * before it touches the store. Nothing downstream knows which app it came from.
 */
export type Action =
    | { type: "increment"; by: string }
    | { type: "decrement"; by: string }
    | { type: "reset"; by: string };
