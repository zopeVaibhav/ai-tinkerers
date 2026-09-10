import { Bot } from "grammy";
import { renderTelegram } from "@repo/core";
import type { Action, SharedObject } from "@repo/types";
import { ENV } from "../config/env";
import { subscribe, unsubscribe, viewsOf } from "../subscriptions";

let bot: Bot | null = null;

export async function startTelegram(
    objectId: string,
    initial: SharedObject,
    dispatch: (action: Action) => void,
) {
    const instance = new Bot(ENV.TELEGRAM_BOT_TOKEN);

    // Any inbound update names its chat. Handy when a group is created or
    // silently upgraded to a supergroup, which changes the chat id.
    instance.use(async (ctx, next) => {
        const chat = ctx.chat;
        if (chat) console.log(`telegram chat seen: id=${chat.id} type=${chat.type}`);
        await next();
    });

    instance.on("callback_query:data", async (ctx) => {
        await ctx.answerCallbackQuery();
        const by = ctx.from?.first_name ?? "telegram";
        const action = toAction(ctx.callbackQuery.data, by);
        if (action) dispatch(action);
    });

    // Long polling. Never await this — it only settles when the bot stops.
    void instance.start({ drop_pending_updates: true });
    bot = instance;

    const chatId = Number(ENV.TELEGRAM_CHAT_ID);
    const payload = renderTelegram(initial);

    const existing = viewsOf(objectId).find((view) => view.surface === "telegram");
    if (existing && existing.surface === "telegram") {
        try {
            await instance.api.editMessageText(existing.chatId, existing.messageId, payload.text, {
                reply_markup: payload.reply_markup,
            });
            console.log(`telegram view reattached message_id=${existing.messageId}`);
            return;
        } catch (error) {
            const message = (error as Error).message ?? "";
            if (message.includes("message is not modified")) {
                console.log(`telegram view reattached message_id=${existing.messageId}`);
                return;
            }
            unsubscribe(objectId, (view) => view.surface === "telegram");
        }
    }

    const sent = await instance.api.sendMessage(chatId, payload.text, {
        reply_markup: payload.reply_markup,
    });

    subscribe(objectId, { surface: "telegram", chatId, messageId: sent.message_id });
    console.log(`telegram view registered message_id=${sent.message_id}`);
}

export async function updateTelegram(object: SharedObject) {
    if (!bot) return;
    for (const view of viewsOf(object.id)) {
        if (view.surface !== "telegram") continue;
        const payload = renderTelegram(object);
        try {
            await bot.api.editMessageText(view.chatId, view.messageId, payload.text, {
                reply_markup: payload.reply_markup,
            });
        } catch (error) {
            // Telegram rejects an edit whose content is byte-identical.
            // That is a no-op, not a failure.
            const message = (error as Error).message ?? "";
            if (message.includes("message is not modified")) continue;
            console.error("telegram update failed:", message);
        }
    }
}

/**
 * The phone surface offers no typing. Reject carries a fixed reason rather
 * than opening a text prompt — the point of this surface is one tap.
 */
function toAction(data: string, by: string): Action | null {
    switch (data) {
        case "acknowledge":
            return { type: "acknowledge", by };
        case "approve":
            return { type: "approve", by };
        case "resolve":
            return { type: "resolve", by };
        case "reject":
            return { type: "reject", by, reason: "rejected from mobile" };
        default:
            return null;
    }
}
