import { z } from "zod";
import { ActionType, Side } from "@repo/types";
import type { Action } from "@repo/types";

/**
 * The shape check the cast used to skip. `reduce` reads fields straight off the
 * action — a Supersede without a winner reached `action.winner.toUpperCase()`
 * and took the request down with it.
 *
 * Reframe is not here: the agent builds that action in-process and never posts
 * it, so accepting one over HTTP would let anyone rewrite the agent's wording.
 */
const schema = z.discriminatedUnion("type", [
    z.object({ type: z.literal(ActionType.Acknowledge), by: z.string().min(1) }),
    z.object({
        type: z.literal(ActionType.Resolve),
        by: z.string().min(1),
        resolution: z.string().min(1),
    }),
    z.object({
        type: z.literal(ActionType.Supersede),
        by: z.string().min(1),
        winner: z.enum(Side),
        note: z.string().min(1),
    }),
    z.object({ type: z.literal(ActionType.Note), by: z.string().min(1), text: z.string().min(1) }),
]);

export function parseAction(body: unknown): Action | null {
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
        console.log(`rejected malformed action: ${parsed.error.issues[0]?.message ?? "bad shape"}`);
        return null;
    }
    return parsed.data;
}
