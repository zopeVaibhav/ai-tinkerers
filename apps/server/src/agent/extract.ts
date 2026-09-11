import { z } from "zod";
import { ClaimAction, Condition, Subsystem } from "@repo/types";
import { ask } from "./client";

/**
 * Most threads have not decided anything. An agent that extracts a claim from
 * every conversation produces noise and false conflicts, which is the single
 * most likely way this project fails in front of someone. The prompt is written
 * for restraint, and the schema only admits values from the closed vocabularies.
 */
const schema = z.discriminatedUnion("decided", [
    z.object({ decided: z.literal(false) }),
    z.object({
        decided: z.literal(true),
        subsystem: z.enum(Subsystem),
        condition: z.enum(Condition),
        action: z.enum(ClaimAction),
        rawText: z.string().min(1),
    }),
]);

export type Claim = {
    subsystem: Subsystem;
    condition: Condition;
    action: ClaimAction;
    rawText: string;
};

export type Message = { by: string; text: string };

export async function extract(messages: Message[]): Promise<Claim | null> {
    const transcript = messages.map((message) => `${message.by}: ${message.text}`).join("\n");

    const result = await ask(
        [
            "You read one conversation thread and decide whether the people in it",
            "have settled on a rule about how the system should behave.",
            "",
            "Return JSON only.",
            'If they are still discussing, exploring, or only describing a problem: {"decided": false}.',
            "Only return decided true when someone states what the system should do,",
            "and nobody has disagreed with it afterwards.",
            "",
            "When decided is true, also return:",
            `  subsystem: one of ${Object.values(Subsystem).join(", ")}`,
            `  condition: one of ${Object.values(Condition).join(", ")}`,
            `  action: one of ${Object.values(ClaimAction).join(", ")}`,
            "  rawText: the exact sentence from the thread that states the decision",
            "",
            "If the decision does not fit those vocabularies, return decided false.",
            "Never invent a value. Never guess a subsystem that was not discussed.",
        ].join("\n"),
        transcript,
        schema,
    );

    if (!result || !result.decided) return null;

    return {
        subsystem: result.subsystem,
        condition: result.condition,
        action: result.action,
        rawText: result.rawText,
    };
}
