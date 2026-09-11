import { ActionType, Audience, ConflictStatus } from "@repo/types";
import type { Conflict } from "@repo/types";
import { headline } from "./slack";

export type TelegramButton = { text: string; callback_data: ActionType };

export type TelegramPayload = {
    text: string;
    reply_markup: { inline_keyboard: TelegramButton[][] };
};

/**
 * Pure function: conflict in, Telegram payload out.
 *
 * Deliberately thinner than Slack. This is someone holding a phone, so it names
 * the two rooms and the clash and offers the one thing they can actually do —
 * not the Slack card shrunk down.
 */
export function renderTelegram(conflict: Conflict): TelegramPayload {
    const { a, b, framings, status } = conflict;

    const lines = [
        framings[Audience.Engineer] ?? strip(headline(conflict)),
        "",
        `${a.threadName}: ${a.action}`,
        `${b.threadName}: ${b.action}`,
    ];

    if (status === ConflictStatus.Acknowledged && conflict.acknowledgedBy) {
        lines.push("", `Seen by ${conflict.acknowledgedBy}.`);
    }

    if (status === ConflictStatus.Resolved) {
        lines.push("", `Resolved. ${conflict.resolution ?? ""}`.trim());
    }

    return { text: lines.join("\n"), reply_markup: { inline_keyboard: keyboard(conflict) } };
}

function keyboard(conflict: Conflict): TelegramButton[][] {
    if (conflict.status !== ConflictStatus.Open) return [];
    return [[{ text: "Acknowledge", callback_data: ActionType.Acknowledge }]];
}

function strip(text: string): string {
    return text.replace(/[*`_]/g, "");
}
