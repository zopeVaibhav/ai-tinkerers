import { z } from "zod";
import { ActionType, Audience, Severity } from "@repo/types";
import type { Action, SharedObject } from "@repo/types";
import { ask } from "./client";

/**
 * Job 1 — intake. Turn an unstructured customer message into facts.
 * Plain code cannot do this.
 */
const intakeSchema = z.object({
    what: z.string().min(1),
    severity: z.enum(Severity),
    affected: z.number().int().min(0),
});

type IntakeAction = Extract<Action, { type: ActionType.Intake }>;

export async function intake(raw: string, from: string): Promise<IntakeAction | null> {
    const result = await ask(
        [
            "You triage inbound customer reports for a software team.",
            "Return JSON only, with keys: what, severity, affected.",
            "what: one plain sentence describing what is broken, no jargon, no blame.",
            "severity: low, medium or high, judged by user impact.",
            "affected: your best integer estimate of users affected, 0 if the message gives no clue.",
            "Never invent detail that is not in the message.",
        ].join("\n"),
        raw,
        intakeSchema,
    );

    if (!result) return null;
    return { type: ActionType.Intake, by: from, ...result };
}

/**
 * Job 2 — framing. One truth, three readers who need different things from it.
 * This is the job that makes the model load-bearing: without it every surface
 * shows the same blob of text, which defeats being on three surfaces at all.
 */
const framingSchema = z.object({
    [Audience.Engineer]: z.string().min(1),
    [Audience.Lead]: z.string().min(1),
    [Audience.Customer]: z.string().min(1),
});

export async function reframe(object: SharedObject): Promise<Action | null> {
    const result = await ask(
        [
            "You write the same situation three ways for three different readers.",
            "Return JSON only, with keys: engineer, lead, customer.",
            "engineer: on a phone, off hours. Terse and technical. Name the one decision they must make. Max 2 short sentences.",
            "lead: in a team channel. What happened, who owns it, what is blocked. Max 2 sentences.",
            "customer: waiting for an answer. Calm, no internal detail, no jargon, no blame, no promises about timing. Max 2 sentences.",
            "Use only the facts given. Never invent a cause, a fix or a deadline.",
        ].join("\n"),
        JSON.stringify(object.facts),
        framingSchema,
    );

    if (!result) return null;
    return { type: ActionType.Reframe, by: "agent", framings: result };
}
