import { resolve } from "node:path";
import { config } from "dotenv";
import { z } from "zod";

config({ path: resolve(import.meta.dir, "../../../../.env") });

const schema = z.object({
    SLACK_BOT_TOKEN: z.string().default(""),
    SLACK_APP_TOKEN: z.string().default(""),
    SLACK_CHANNEL_ID: z.string().default(""),
    TELEGRAM_BOT_TOKEN: z.string().default(""),
    TELEGRAM_CHAT_ID: z.string().default(""),
    OPENROUTER_API_KEY: z.string().default(""),
    SERVER_PORT: z.coerce.number().default(5101),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
    console.error("Invalid environment. Fix .env at the repo root:\n");
    for (const issue of parsed.error.issues) {
        console.error(`  ${issue.path.join(".")}: ${issue.message}`);
    }
    process.exit(1);
}

export const ENV = parsed.data;

/** Surfaces stay off until their credentials exist. M1 turns these on. */
export const ENABLED = {
    slack: Boolean(ENV.SLACK_BOT_TOKEN && ENV.SLACK_APP_TOKEN && ENV.SLACK_CHANNEL_ID),
    telegram: Boolean(ENV.TELEGRAM_BOT_TOKEN && ENV.TELEGRAM_CHAT_ID),
};
