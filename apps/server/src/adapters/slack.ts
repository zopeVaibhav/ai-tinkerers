import { App, LogLevel } from "@slack/bolt";
import { renderSlack } from "@repo/core";
import type { Action, SharedObject } from "@repo/types";
import { ENV } from "../config/env";
import { subscribe, unsubscribe, viewsOf } from "../subscriptions";

type SlackClient = InstanceType<typeof App>["client"];

type ActionArgs = {
    ack: () => Promise<void>;
    body: { user?: { username?: string; name?: string }; trigger_id?: string };
    client: SlackClient;
};

type ViewArgs = {
    ack: () => Promise<void>;
    body: { user?: { username?: string; name?: string } };
    view: { state: { values: Record<string, Record<string, { value?: string | null }>> } };
};

let client: SlackClient | null = null;

/** Buttons that change state directly, with nothing to type. */
const DIRECT = ["acknowledge", "approve", "resolve"] as const;

/**
 * Buttons that need typed input. Slack rejects input blocks in posted messages,
 * so the only way to collect text is button -> views.open -> view_submission.
 */
const PROMPTS = {
    propose: { title: "Propose a fix", submit: "Propose", label: "What is the fix?" },
    reject: { title: "Reject the fix", submit: "Reject", label: "Why?" },
    note: { title: "Add a note", submit: "Add", label: "Note" },
} as const;

type PromptKey = keyof typeof PROMPTS;

export async function startSlack(
    objectId: string,
    initial: SharedObject,
    dispatch: (action: Action) => void,
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
            dispatch({ type, by: who(args.body) });
        });
    }

    for (const key of Object.keys(PROMPTS) as PromptKey[]) {
        app.action(key, async (args: ActionArgs) => {
            await args.ack();
            if (!args.body.trigger_id) return;
            await args.client.views.open({
                trigger_id: args.body.trigger_id,
                view: modal(key) as never,
            });
        });

        app.view(`${key}_modal`, async (args: ViewArgs) => {
            await args.ack();
            const value = args.view.state.values.field?.value?.value?.trim();
            if (!value) return;
            dispatch(toAction(key, who(args.body), value));
        });
    }

    await app.start();
    client = app.client;

    // Reattach to a view we already own rather than posting a second card.
    const existing = viewsOf(objectId).find((view) => view.surface === "slack");
    if (existing && existing.surface === "slack") {
        try {
            await app.client.chat.update({
                channel: existing.channel,
                ts: existing.ts,
                text: summary(initial),
                blocks: renderSlack(initial) as never[],
            });
            console.log(`slack view reattached ts=${existing.ts}`);
            return;
        } catch {
            unsubscribe(objectId, (view) => view.surface === "slack");
        }
    }

    const posted = await app.client.chat.postMessage({
        channel: ENV.SLACK_CHANNEL_ID,
        text: summary(initial),
        blocks: renderSlack(initial) as never[],
    });

    if (posted.ts) {
        subscribe(objectId, { surface: "slack", channel: ENV.SLACK_CHANNEL_ID, ts: posted.ts });
        console.log(`slack view registered ts=${posted.ts}`);
    }
}

export async function updateSlack(object: SharedObject) {
    if (!client) return;
    for (const view of viewsOf(object.id)) {
        if (view.surface !== "slack") continue;
        try {
            await client.chat.update({
                channel: view.channel,
                ts: view.ts,
                text: summary(object),
                blocks: renderSlack(object) as never[],
            });
        } catch (error) {
            const message = (error as Error).message ?? "";
            // The card was deleted. Stop trying to render into a dead window.
            if (message.includes("message_not_found")) {
                unsubscribe(object.id, (candidate) => candidate === view);
                console.warn("slack view dropped: message no longer exists");
                continue;
            }
            console.error("slack update failed:", message);
        }
    }
}

function toAction(key: PromptKey, by: string, value: string): Action {
    if (key === "propose") return { type: "propose", by, fix: value };
    if (key === "reject") return { type: "reject", by, reason: value };
    return { type: "note", by, text: value };
}

function modal(key: PromptKey) {
    const prompt = PROMPTS[key];
    return {
        type: "modal",
        callback_id: `${key}_modal`,
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

function who(body: { user?: { username?: string; name?: string } }): string {
    return body.user?.username ?? body.user?.name ?? "slack";
}

function summary(object: SharedObject): string {
    return `Customer escalation: ${object.facts.what}`;
}
