import OpenAI from "openai";
import { z } from "zod";
import { ENV } from "../config/env";

const client = new OpenAI({ apiKey: ENV.LLM_API_KEY, baseURL: ENV.LLM_BASE_URL });

/**
 * Ask for JSON, validate it, and return null if anything is off.
 *
 * The agent is allowed to fail. It writes text into the object and nothing
 * else, so a bad response degrades the wording and never breaks the fan-out.
 */
export async function ask<T>(
    system: string,
    user: string,
    schema: z.ZodType<T>,
): Promise<T | null> {
    try {
        const response = await client.chat.completions.create({
            model: ENV.LLM_MODEL,
            temperature: 0.2,
            response_format: { type: "json_object" },
            messages: [
                { role: "system", content: system },
                { role: "user", content: user },
            ],
        });

        const raw = response.choices[0]?.message?.content;
        if (!raw) return null;

        const parsed = schema.safeParse(JSON.parse(raw));
        if (!parsed.success) {
            console.error("agent returned unexpected shape:", parsed.error.issues[0]?.message);
            return null;
        }
        return parsed.data;
    } catch (error) {
        console.error("agent call failed:", (error as Error).message);
        return null;
    }
}
