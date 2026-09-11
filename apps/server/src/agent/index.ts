import { z } from "zod";
import { ActionType, Audience } from "@repo/types";
import type { Action, Conflict } from "@repo/types";
import { ask } from "./client";

/**
 * The agent's wording job. One conflict, two readers who need different things
 * from it: the engineer on a phone needs the decision, the lead in the channel
 * needs the shape of the disagreement.
 *
 * Extraction — turning a thread into a structured claim — is issue #5.
 */
const framingSchema = z.object({
    [Audience.Engineer]: z.string().min(1),
    [Audience.Lead]: z.string().min(1),
});

export async function reframe(conflict: Conflict): Promise<Action | null> {
    const result = await ask(
        [
            "Two teams decided contradicting things without knowing about each other.",
            "Return JSON only, with keys: engineer, lead.",
            "engineer: on a phone. Name both rooms and the clash in one short sentence.",
            "lead: in a team channel. What was decided where, and what breaks if both ship. Max 2 sentences.",
            "Use only the claims given. Never invent a cause, a fix or a deadline.",
        ].join("\n"),
        JSON.stringify({
            subsystem: conflict.a.subsystem,
            condition: conflict.a.condition,
            sides: [
                {
                    thread: conflict.a.threadName,
                    action: conflict.a.action,
                    said: conflict.a.rawText,
                },
                {
                    thread: conflict.b.threadName,
                    action: conflict.b.action,
                    said: conflict.b.rawText,
                },
            ],
        }),
        framingSchema,
    );

    if (!result) return null;
    return { type: ActionType.Reframe, by: "agent", framings: result };
}
