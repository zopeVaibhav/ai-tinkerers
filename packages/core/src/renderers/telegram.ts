import type { SharedObject } from "@repo/types";

export type TelegramPayload = {
    text: string;
    reply_markup: {
        inline_keyboard: { text: string; callback_data: string }[][];
    };
};

/**
 * Pure function: object in, Telegram payload out.
 * The phone view is deliberately thinner than Slack — same object, less of it.
 */
export function renderTelegram(object: SharedObject): TelegramPayload {
    return {
        text: `Shared object ${object.id}\nCount: ${object.facts.count}  (v${object.version})`,
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "+1", callback_data: "increment" },
                    { text: "-1", callback_data: "decrement" },
                ],
            ],
        },
    };
}
