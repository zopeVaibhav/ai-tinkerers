import { Bot } from "grammy";
import { renderTelegram } from "@repo/core";
import { ActionType, Audience, Surface } from "@repo/types";
import type { Action, Conflict } from "@repo/types";
import { ENV } from "../config/env";
import { addView, dropView, viewsOf } from "../repository";

let bot: Bot | null = null;

export async function startTelegram(
    act: (conflictId: string, action: Action, from: Audience) => Promise<unknown>,
) {
    const instance = new Bot(ENV.TELEGRAM_BOT_TOKEN);

    instance.use(async (ctx, next) => {
        const chat = ctx.chat;
        if (chat) console.log(`telegram chat seen: id=${chat.id} type=${chat.type}`);
        await next();
    });

    instance.on("callback_query:data", async (ctx) => {
        await ctx.answerCallbackQuery();
        const by = ctx.from?.first_name ?? Surface.Telegram;
        const parsed = parse(ctx.callbackQuery.data, by);
        if (parsed) await act(parsed.conflictId, parsed.action, Audience.Engineer);
    });

    // Long polling. Never await this — it only settles when the bot stops.
    void instance.start({ drop_pending_updates: true });
    bot = instance;
    console.log("telegram connected");
}

/** The phone surface. One message per conflict, in the team group. */
export async function postConflict(conflict: Conflict) {
    if (!bot) return;
    const chatId = Number(ENV.TELEGRAM_CHAT_ID);
    const payload = renderTelegram(conflict);

    try {
        const sent = await bot.api.sendMessage(chatId, payload.text, {
            reply_markup: markup(payload, conflict.id),
        });
        await addView(conflict.id, {
            surface: Surface.Telegram,
            audience: Audience.Engineer,
            chatId,
            messageId: sent.message_id,
        });
        console.log(`conflict card posted to telegram message_id=${sent.message_id}`);
    } catch (error) {
        console.error("could not post conflict to telegram:", (error as Error).message);
    }
}

export async function updateTelegram(conflict: Conflict) {
    if (!bot) return;
    for (const view of await viewsOf(conflict.id)) {
        if (view.surface !== Surface.Telegram) continue;

        const payload = renderTelegram(conflict);

        try {
            await bot.api.editMessageText(view.chatId, view.messageId, payload.text, {
                reply_markup: markup(payload, conflict.id),
            });
        } catch (error) {
            const message = (error as Error).message ?? "";
            // Editing to identical content is a no-op, not a failure.
            if (message.includes("message is not modified")) continue;
            // The card was deleted. Stop trying to render into a dead window.
            if (message.includes("message to edit not found")) {
                await dropView(conflict.id, view);
                console.warn("telegram view dropped: message no longer exists");
                continue;
            }
            console.error("telegram update failed:", message);
        }
    }
}

/** Callback data is capped at 64 bytes, so it carries only the verb and the id. */
function markup(
    payload: { reply_markup: { inline_keyboard: { text: string; callback_data: ActionType }[][] } },
    conflictId: string,
) {
    return {
        inline_keyboard: payload.reply_markup.inline_keyboard.map((row) =>
            row.map((cell) => ({
                text: cell.text,
                callback_data: `${cell.callback_data}:${conflictId}`,
            })),
        ),
    };
}

function parse(data: string, by: string): { conflictId: string; action: Action } | null {
    const [verb, conflictId] = data.split(":");
    if (!verb || !conflictId) return null;
    if (verb !== ActionType.Acknowledge) return null;
    return { conflictId, action: { type: ActionType.Acknowledge, by } };
}
