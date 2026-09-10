import type { SharedObject } from "@repo/types";

/**
 * Pure function: object in, Block Kit out. Knows nothing about what happened,
 * only what the object currently is. Never import a Slack client here.
 *
 * Note: input blocks are rejected by chat.postMessage ("unsupported type: input").
 * Anything needing typed input must be a button that opens a modal.
 */
export function renderSlack(object: SharedObject): unknown[] {
    return [
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: `*Shared object* \`${object.id}\`\nCount: *${object.facts.count}*  ·  v${object.version}`,
            },
        },
        {
            type: "actions",
            elements: [
                {
                    type: "button",
                    action_id: "increment",
                    text: { type: "plain_text", text: "+1" },
                    style: "primary",
                },
                {
                    type: "button",
                    action_id: "decrement",
                    text: { type: "plain_text", text: "-1" },
                },
                {
                    type: "button",
                    action_id: "reset",
                    text: { type: "plain_text", text: "Reset" },
                },
            ],
        },
        {
            type: "context",
            elements: [
                {
                    type: "mrkdwn",
                    text: object.timeline.length
                        ? `last: ${object.timeline[object.timeline.length - 1]?.what} by ${object.timeline[object.timeline.length - 1]?.by}`
                        : "no changes yet",
                },
            ],
        },
    ];
}
