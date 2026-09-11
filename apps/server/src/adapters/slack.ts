import { App, LogLevel } from "@slack/bolt";
import { renderSlack } from "@repo/core";
import { ActionType, Audience, Side, Surface } from "@repo/types";
import type { Action, Conflict } from "@repo/types";
import { ENV } from "../config/env";
import { dropView, viewsOf } from "../repository";

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

    await app.start();
    client = app.client;
    console.log("slack connected");
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
