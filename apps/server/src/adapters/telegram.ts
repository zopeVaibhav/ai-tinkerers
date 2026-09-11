import { Bot } from "grammy";
import { renderCustomer, renderTelegram } from "@repo/core";
import { ActionType, Audience, Surface } from "@repo/types";
import type { Action, SharedObject, ViewRef } from "@repo/types";
import { ENV } from "../config/env";
import { subscribe, unsubscribe, viewsOf } from "../subscriptions";

let bot: Bot | null = null;

export async function startTelegram(
    objectId: string,
    initial: SharedObject,
    dispatch: (action: Action, from: Audience) => void,
    onReport: (text: string, by: string) => Promise<Action | null>,
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
        const by = ctx.from?.first_name ?? Surface.Telegram;
        const action = toAction(ctx.callbackQuery.data, by);
        if (action) dispatch(action, audienceOf(ctx.chat?.type));
    });

    /**
     * A private chat is a customer. Their first message is the report, and the
     * card we send back becomes their window onto the object from then on.
     */
    instance.on("message:text", async (ctx) => {
        if (ctx.chat.type !== "private") return;

        const chatId = ctx.chat.id;
        const by = ctx.from?.first_name ?? Audience.Customer;

        const action = await onReport(ctx.message.text, by);
        if (!action) return;
        dispatch(action, Audience.Customer);

        if (!viewsOf(objectId).some((view) => isCustomerView(view, chatId))) {
            const sent = await instance.api.sendMessage(chatId, renderCustomer(initial).text);
            subscribe(objectId, {
                surface: Surface.Telegram,
                audience: Audience.Customer,
                chatId,
                messageId: sent.message_id,
            });
            console.log(`telegram customer view registered chat=${chatId}`);
        }
    });

    // Long polling. Never await this — it only settles when the bot stops.
    void instance.start({ drop_pending_updates: true });
    bot = instance;

    const chatId = Number(ENV.TELEGRAM_CHAT_ID);
    const payload = renderTelegram(initial);

    const existing = viewsOf(objectId).find(
        (view) => view.surface === Surface.Telegram && view.audience === Audience.Engineer,
    );
    if (existing && existing.surface === Surface.Telegram) {
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
            unsubscribe(
                objectId,
                (view) => view.surface === Surface.Telegram && view.audience === Audience.Engineer,
            );
        }
    }

    const sent = await instance.api.sendMessage(chatId, payload.text, {
        reply_markup: payload.reply_markup,
    });

    subscribe(objectId, {
        surface: Surface.Telegram,
        audience: Audience.Engineer,
        chatId,
        messageId: sent.message_id,
    });
    console.log(`telegram view registered message_id=${sent.message_id}`);
}

export async function updateTelegram(object: SharedObject) {
    if (!bot) return;
    for (const view of viewsOf(object.id)) {
        if (view.surface !== Surface.Telegram) continue;

        const payload =
            view.audience === Audience.Customer ? renderCustomer(object) : renderTelegram(object);

        try {
            await bot.api.editMessageText(view.chatId, view.messageId, payload.text, {
                reply_markup: payload.reply_markup,
            });
        } catch (error) {
            const message = (error as Error).message ?? "";
            // Editing to identical content is a no-op, not a failure.
            if (message.includes("message is not modified")) continue;
            // The card was deleted. Stop trying to render into a dead window.
            if (message.includes("message to edit not found")) {
                unsubscribe(object.id, (candidate) => candidate === view);
                console.warn("telegram view dropped: message no longer exists");
                continue;
            }
            console.error("telegram update failed:", message);
        }
    }
}

function isCustomerView(view: ViewRef, chatId: number): boolean {
    return (
        view.surface === Surface.Telegram &&
        view.audience === Audience.Customer &&
        view.chatId === chatId
    );
}

function audienceOf(chatType: string | undefined): Audience {
    return chatType === "private" ? Audience.Customer : Audience.Engineer;
}

/**
 * The phone surface offers no typing. Reject carries a fixed reason rather
 * than opening a text prompt — the point of this surface is one tap.
 */
function toAction(data: string, by: string): Action | null {
    switch (data) {
        case ActionType.Acknowledge:
            return { type: ActionType.Acknowledge, by };
        case ActionType.Approve:
            return { type: ActionType.Approve, by };
        case ActionType.Resolve:
            return { type: ActionType.Resolve, by };
        case ActionType.Reject:
            return { type: ActionType.Reject, by, reason: "rejected from mobile" };
        default:
            return null;
    }
}
