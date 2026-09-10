import { App, LogLevel } from "@slack/bolt";
import { renderSlack } from "@repo/core";
import type { Action, SharedObject } from "@repo/types";
import { ENV } from "../config/env";
import { subscribe, unsubscribe, viewsOf } from "../subscriptions";

type SlackClient = InstanceType<typeof App>["client"];

type SlackActionArgs = {
    ack: () => Promise<void>;
    body: { user?: { username?: string; name?: string } };
};

let client: SlackClient | null = null;

/**
 * Post once, keep the ts, register it as a view, then only ever chat.update
 * that same ts. A second postMessage would create a second object in the eyes
 * of the reader, which is exactly what this project exists to avoid.
 */
export async function startSlack(objectId: string, initial: SharedObject, dispatch: (action: Action) => void) {
    const app = new App({
        token: ENV.SLACK_BOT_TOKEN,
        appToken: ENV.SLACK_APP_TOKEN,
        socketMode: true,
        logLevel: LogLevel.ERROR,
    });

    for (const type of ["increment", "decrement", "reset"] as const) {
        app.action(type, async (args: SlackActionArgs) => {
            await args.ack();
            const who = args.body.user;
            dispatch({ type, by: who?.username ?? who?.name ?? "slack" });
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
                text: `Shared object ${objectId}`,
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
        text: `Shared object ${objectId}`,
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
                text: `Shared object ${object.id}`,
                blocks: renderSlack(object) as never[],
            });
        } catch (error) {
            console.error("slack update failed:", (error as Error).message);
        }
    }
}
