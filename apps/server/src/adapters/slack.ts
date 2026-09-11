import { App, LogLevel } from "@slack/bolt";
import { renderSlack } from "@repo/core";
import { ActionType, Audience, Surface } from "@repo/types";
import type { Action, SharedObject } from "@repo/types";
import { ENV } from "../config/env";
import { addView, dropView, viewsOf } from "../repository";

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

type MentionArgs = {
    event: { text: string; user?: string };
};

let client: SlackClient | null = null;

const DIRECT = [ActionType.Acknowledge, ActionType.Approve, ActionType.Resolve] as const;

/**
 * Slack rejects input blocks in posted messages, so the only way to collect
 * text is button -> views.open -> view_submission. The issue id rides along in
 * private_metadata so the submission knows which card it came from.
 */
const PROMPTS = {
    [ActionType.Propose]: { title: "Propose a fix", submit: "Propose", label: "What is the fix?" },
    [ActionType.Reject]: { title: "Reject the fix", submit: "Reject", label: "Why?" },
    [ActionType.Note]: { title: "Add a note", submit: "Add", label: "Note" },
} as const;

type PromptKey = keyof typeof PROMPTS;

export async function startSlack(
    act: (issueId: string, action: Action, from: Audience) => Promise<unknown>,
    raise: (text: string, by: string, on: Surface) => Promise<unknown>,
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
            const issueId = issueOf(args);
            if (issueId) await act(issueId, { type, by: who(args.body) }, Audience.Lead);
        });
    }

    for (const key of Object.keys(PROMPTS) as PromptKey[]) {
        app.action(key, async (args: ActionArgs) => {
            await args.ack();
            const issueId = issueOf(args);
            if (!args.body.trigger_id || !issueId) return;
            await args.client.views.open({
                trigger_id: args.body.trigger_id,
                view: modal(key, issueId) as never,
            });
        });

        app.view(`${key}_modal`, async (args: ViewArgs) => {
            await args.ack();
            const value = args.view.state.values.field?.value?.value?.trim();
            const issueId = args.view.private_metadata;
            if (!value || !issueId) return;
            await act(issueId, toAction(key, who(args.body), value), Audience.Lead);
        });
    }

    app.event("app_mention", async (args: MentionArgs) => {
        const text = args.event.text.replace(/<@[^>]+>/g, "").trim();
        if (text) await raise(text, args.event.user ?? Surface.Slack, Surface.Slack);
    });

    await app.start();
    client = app.client;
    console.log("slack connected");
}

/** A new issue gets its own card. Cards are never reposted, only rewritten. */
export async function postIssue(issue: SharedObject) {
    if (!client) return;
    const posted = await client.chat.postMessage({
        channel: ENV.SLACK_CHANNEL_ID,
        text: summary(issue),
        blocks: renderSlack(issue) as never[],
    });
    if (!posted.ts) return;
    await addView(issue.id, {
        surface: Surface.Slack,
        audience: Audience.Lead,
        channel: ENV.SLACK_CHANNEL_ID,
        ts: posted.ts,
    });
    console.log(`slack card posted issue=${issue.id} ts=${posted.ts}`);
}

export async function updateSlack(issue: SharedObject) {
    if (!client) return;
    for (const view of await viewsOf(issue.id)) {
        if (view.surface !== Surface.Slack) continue;
        try {
            await client.chat.update({
                channel: view.channel,
                ts: view.ts,
                text: summary(issue),
                blocks: renderSlack(issue) as never[],
            });
        } catch (error) {
            const message = (error as Error).message ?? "";
            if (message.includes("message_not_found")) {
                await dropView(issue.id, view);
                console.warn("slack view dropped: message no longer exists");
                continue;
            }
            console.error("slack update failed:", message);
        }
    }
}

function toAction(key: PromptKey, by: string, value: string): Action {
    if (key === ActionType.Propose) return { type: ActionType.Propose, by, fix: value };
    if (key === ActionType.Reject) return { type: ActionType.Reject, by, reason: value };
    return { type: ActionType.Note, by, text: value };
}

function modal(key: PromptKey, issueId: string) {
    const prompt = PROMPTS[key];
    return {
        type: "modal",
        callback_id: `${key}_modal`,
        private_metadata: issueId,
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

function issueOf(args: ActionArgs): string | undefined {
    const body = args.body as { actions?: { value?: string }[] };
    return body.actions?.[0]?.value;
}

function who(body: { user?: { username?: string; name?: string } }): string {
    return body.user?.username ?? body.user?.name ?? Surface.Slack;
}

function summary(issue: SharedObject): string {
    return `Customer escalation: ${issue.facts.what}`;
}
