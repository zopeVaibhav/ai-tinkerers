import { Bot } from "grammy";
import { renderTelegram } from "@repo/core";
import { ActionType, Audience, Surface } from "@repo/types";
import type { Action, SharedObject } from "@repo/types";
import { ENV } from "../config/env";
import { addView, dropView, viewsOf } from "../repository";

let bot: Bot | null = null;

export async function startTelegram(
    act: (issueId: string, action: Action, from: Audience) => Promise<unknown>,
    raise: (text: string, by: string, on: Surface) => Promise<unknown>,
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
        if (!parsed) return;
        await act(parsed.issueId, parsed.action, Audience.Engineer);
    });

    // Long polling. Never await this — it only settles when the bot stops.
    void instance.start({ drop_pending_updates: true });
    bot = instance;
    console.log("telegram connected");
}

/** The engineers' window: the team group. One message per issue. */
export async function postIssue(issue: SharedObject) {
    if (!bot) return;
    const chatId = Number(ENV.TELEGRAM_CHAT_ID);
    const payload = renderTelegram(issue);
    const sent = await bot.api.sendMessage(chatId, payload.text, {
        reply_markup: markup(payload, issue.id),
    });
    await addView(issue.id, {
        surface: Surface.Telegram,
        audience: Audience.Engineer,
        chatId,
        messageId: sent.message_id,
    });
    console.log(`telegram card posted issue=${issue.id} message_id=${sent.message_id}`);
}

export async function updateTelegram(issue: SharedObject) {
    if (!bot) return;
    for (const view of await viewsOf(issue.id)) {
        if (view.surface !== Surface.Telegram) continue;

        const payload = renderTelegram(issue);

        try {
            await bot.api.editMessageText(view.chatId, view.messageId, payload.text, {
                reply_markup: markup(payload, issue.id),
            });
        } catch (error) {
            const message = (error as Error).message ?? "";
            // Editing to identical content is a no-op, not a failure.
            if (message.includes("message is not modified")) continue;
            // The card was deleted. Stop trying to render into a dead window.
            if (message.includes("message to edit not found")) {
                await dropView(issue.id, view);
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
    issueId: string,
) {
    return {
        inline_keyboard: payload.reply_markup.inline_keyboard.map((row) =>
            row.map((cell) => ({
                text: cell.text,
                callback_data: `${cell.callback_data}:${issueId}`,
            })),
        ),
    };
}

function parse(data: string, by: string): { issueId: string; action: Action } | null {
    const [verb, issueId] = data.split(":");
    if (!verb || !issueId) return null;

    switch (verb) {
        case ActionType.Acknowledge:
            return { issueId, action: { type: ActionType.Acknowledge, by } };
        case ActionType.Approve:
            return { issueId, action: { type: ActionType.Approve, by } };
        case ActionType.Resolve:
            return { issueId, action: { type: ActionType.Resolve, by } };
        case ActionType.Reject:
            return {
                issueId,
                action: { type: ActionType.Reject, by, reason: "rejected from mobile" },
            };
        default:
            return null;
    }
}
