import { App, LogLevel } from "@slack/bolt";
import { renderSlack } from "@repo/core";
import { ActionType, Audience, Side, Surface } from "@repo/types";
import type { Action, Conflict, Decision } from "@repo/types";
import { ENV } from "../config/env";
import { dropView, viewsOf } from "../repository";
import { onThreadQuiet } from "../threads";
import type { Message } from "../agent/extract";
import type { ThreadRef } from "../decisions";

type SlackClient = InstanceType<typeof App>["client"];

type ActionArgs = {
    ack: () => Promise<void>;
    body: { user?: { username?: string; name?: string }; trigger_id?: string };
    client: SlackClient;
};

type ViewArgs = {
    ack: () => Promise<void>;
    body: { user?: { username?: string; name?: string } };
    view: {
        private_metadata: string;
        state: { values: Record<string, Record<string, { value?: string | null }>> };
    };
};

type MessageArgs = {
    event: {
        channel: string;
        ts: string;
        thread_ts?: string;
        user?: string;
        text?: string;
        bot_id?: string;
        subtype?: string;
    };
};

let client: SlackClient | null = null;

const channelNames = new Map<string, string>();
const userNames = new Map<string, string>();

const DIRECT = [ActionType.Acknowledge] as const;

/**
 * Slack rejects input blocks in posted messages, so the only way to collect
 * text is button -> views.open -> view_submission. The issue id rides along in
 * private_metadata so the submission knows which card it came from.
 */
const PROMPTS = {
    [ActionType.Supersede]: {
        title: "Keep one decision",
        submit: "Keep",
        label: "Which side wins, and why?",
    },
    [ActionType.Note]: { title: "Add a note", submit: "Add", label: "Note" },
} as const;

type PromptKey = keyof typeof PROMPTS;

export async function startSlack(
    act: (conflictId: string, action: Action, from: Audience) => Promise<unknown>,
    onThread: (thread: ThreadRef, messages: Message[], lastSpeaker: string) => Promise<void>,
) {
    const app = new App({
        token: ENV.SLACK_BOT_TOKEN,
        appToken: ENV.SLACK_APP_TOKEN,
        socketMode: true,
        logLevel: LogLevel.ERROR,
    });

    for (const type of DIRECT) {
        app.action(type, async (args: ActionArgs) => {
            await args.ack();
            const id = conflictOf(args);
            if (id) await act(id, { type, by: who(args.body) }, Audience.Lead);
        });
    }

    for (const key of Object.keys(PROMPTS) as PromptKey[]) {
        app.action(key, async (args: ActionArgs) => {
            await args.ack();
            const id = conflictOf(args);
            if (!args.body.trigger_id || !id) return;
            await args.client.views.open({
                trigger_id: args.body.trigger_id,
                view: modal(key, id) as never,
            });
        });

        app.view(`${key}_modal`, async (args: ViewArgs) => {
            await args.ack();
            const value = args.view.state.values.field?.value?.value?.trim();
            const id = args.view.private_metadata;
            if (!value || !id) return;
            await act(id, toAction(key, who(args.body), value), Audience.Lead);
        });
    }

    /**
     * Every message in a channel the bot is in belongs to some thread. The
     * agent for that thread re-reads it once the typing stops, which is the
     * only way a decision gets recorded — nobody fills in a form.
     */
    app.event("message", async (args: MessageArgs) => {
        const event = args.event;
        console.log(
            `slack message seen: channel=${event.channel} thread=${event.thread_ts ?? "-"} subtype=${event.subtype ?? "-"} bot=${event.bot_id ?? "-"}`,
        );
        if (event.bot_id || (event.subtype && event.subtype !== "thread_broadcast")) return;
        if (!event.text?.trim()) return;

        // A thread is one conversation. So is a channel where nobody threads —
        // which is how most teams actually talk. Keying a bare message by its
        // own ts would make every sentence its own conversation of one.
        const rootTs = event.thread_ts;
        const threadKey = rootTs ? `${event.channel}:${rootTs}` : event.channel;

        onThreadQuiet(threadKey, async () => {
            const messages = await readThread(event.channel, rootTs);
            console.log(`thread agent reading ${threadKey}: ${messages.length} message(s)`);
            if (messages.length === 0) return;
            const thread: ThreadRef = {
                surface: Surface.Slack,
                threadKey,
                threadName: await channelName(event.channel),
            };
            const last = messages[messages.length - 1];
            await onThread(thread, messages, await personName(last?.by));
        });
    });

    await app.start();
    client = app.client;
    console.log("slack connected");
}

/** Small and quiet. The loud moment belongs to the conflict card. */
export async function confirmDecision(decision: Decision) {
    if (!client) return;
    const [channel, ts] = decision.threadKey.split(":");
    if (!channel) return;

    await client.chat.postMessage({
        channel,
        ...(ts ? { thread_ts: ts } : {}),
        text: `Recorded: ${decision.subsystem} · on ${decision.condition} · ${decision.action}`,
        blocks: [
            {
                type: "context",
                elements: [
                    {
                        type: "mrkdwn",
                        text: `Recorded · *${decision.subsystem}* on \`${decision.condition}\` → \`${decision.action}\``,
                    },
                ],
            },
        ],
    });
}

async function readThread(channel: string, ts?: string): Promise<Message[]> {
    if (!client) return [];
    try {
        const result = ts
            ? await client.conversations.replies({ channel, ts, limit: 50 })
            : await client.conversations.history({ channel, limit: 25 });

        const messages = (result.messages ?? [])
            .filter((message) => !message.bot_id && message.text?.trim())
            .map((message) => ({ by: message.user ?? "someone", text: message.text ?? "" }));

        // history comes back newest first; a conversation reads the other way.
        return ts ? messages : messages.reverse();
    } catch (error) {
        console.error("could not read conversation:", (error as Error).message);
        return [];
    }
}

/**
 * history and replies return user ids, not names. The conflict card has to say
 * who decided each side, so an id there reads as a bug.
 */
async function personName(userId?: string): Promise<string> {
    if (!userId) return Surface.Slack;
    const cached = userNames.get(userId);
    if (cached) return cached;
    if (!client) return userId;
    try {
        const info = await client.users.info({ user: userId });
        const name =
            info.user?.profile?.display_name || info.user?.real_name || info.user?.name || userId;
        userNames.set(userId, name);
        return name;
    } catch {
        return userId;
    }
}

async function channelName(channel: string): Promise<string> {
    const cached = channelNames.get(channel);
    if (cached) return cached;
    if (!client) return channel;
    try {
        const info = await client.conversations.info({ channel });
        const name = info.channel?.name ? `#${info.channel.name}` : channel;
        channelNames.set(channel, name);
        return name;
    } catch {
        return channel;
    }
}

export async function updateSlack(conflict: Conflict) {
    if (!client) return;
    for (const view of await viewsOf(conflict.id)) {
        if (view.surface !== Surface.Slack) continue;
        try {
            await client.chat.update({
                channel: view.channel,
                ts: view.ts,
                text: summary(conflict),
                blocks: renderSlack(conflict) as never[],
            });
        } catch (error) {
            const message = (error as Error).message ?? "";
            if (message.includes("message_not_found")) {
                await dropView(conflict.id, view);
                console.warn("slack view dropped: message no longer exists");
                continue;
            }
            console.error("slack update failed:", message);
        }
    }
}

function toAction(key: PromptKey, by: string, value: string): Action {
    if (key === ActionType.Supersede) {
        return { type: ActionType.Supersede, by, winner: Side.A, note: value };
    }
    return { type: ActionType.Note, by, text: value };
}

function modal(key: PromptKey, conflictId: string) {
    const prompt = PROMPTS[key];
    return {
        type: "modal",
        callback_id: `${key}_modal`,
        private_metadata: conflictId,
        title: { type: "plain_text", text: prompt.title },
        submit: { type: "plain_text", text: prompt.submit },
        close: { type: "plain_text", text: "Cancel" },
        blocks: [
            {
                type: "input",
                block_id: "field",
                label: { type: "plain_text", text: prompt.label },
                element: { type: "plain_text_input", action_id: "value", multiline: true },
            },
        ],
    };
}

function conflictOf(args: ActionArgs): string | undefined {
    const body = args.body as { actions?: { value?: string }[] };
    return body.actions?.[0]?.value;
}

function who(body: { user?: { username?: string; name?: string } }): string {
    return body.user?.username ?? body.user?.name ?? Surface.Slack;
}

function summary(conflict: Conflict): string {
    return `Contradicting decisions about ${conflict.a.subsystem}`;
}
