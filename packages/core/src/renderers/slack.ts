import { ActionType, Audience, ConflictStatus } from "@repo/types";
import type { Conflict, Decision } from "@repo/types";

/**
 * Pure function: conflict in, Block Kit out. Knows nothing about what happened,
 * only what the conflict currently is. Never import a Slack client here.
 *
 * Note: input blocks are rejected by chat.postMessage ("unsupported type: input").
 * Anything needing typed input must be a button that opens a modal.
 */
export function renderSlack(conflict: Conflict): unknown[] {
    const { a, b, framings, status, timeline } = conflict;

    const blocks: unknown[] = [
        {
            type: "header",
            text: { type: "plain_text", text: "Contradicting decisions" },
        },
        {
            type: "section",
            text: {
                type: "mrkdwn",
                text: framings[Audience.Lead] ?? headline(conflict),
            },
        },
        {
            type: "section",
            fields: [side(a), side(b)],
        },
        {
            type: "context",
            elements: [
                {
                    type: "mrkdwn",
                    text: `*Status* ${STATUS_LABEL[status]}${
                        conflict.acknowledgedBy ? ` · seen by ${conflict.acknowledgedBy}` : ""
                    }${conflict.resolution ? ` · ${conflict.resolution}` : ""}`,
                },
            ],
        },
    ];

    const buttons = actionsFor(conflict);
    if (buttons.length) blocks.push({ type: "actions", elements: buttons });

    blocks.push({ type: "divider" });
    blocks.push({ type: "context", elements: [{ type: "mrkdwn", text: recent(timeline) }] });

    return blocks;
}

const STATUS_LABEL: Record<ConflictStatus, string> = {
    [ConflictStatus.Open]: "Open",
    [ConflictStatus.Acknowledged]: "Acknowledged",
    [ConflictStatus.Resolved]: "Resolved",
};

export function headline(conflict: Conflict): string {
    return `Two threads decided different things about *${conflict.a.subsystem}* on \`${conflict.a.condition}\`.`;
}

function side(decision: Decision) {
    return {
        type: "mrkdwn",
        text: `*${decision.threadName}*\n\`${decision.action}\`\n_${decision.decidedBy}_`,
    };
}

function actionsFor(conflict: Conflict): unknown[] {
    const id = conflict.id;
    const buttons: unknown[] = [];

    if (conflict.status === ConflictStatus.Open) {
        buttons.push(button(ActionType.Acknowledge, "Acknowledge", id, "primary"));
    }

    if (conflict.status !== ConflictStatus.Resolved) {
        buttons.push(button(ActionType.Supersede, "Keep one", id));
        buttons.push(button(ActionType.Note, "Add note", id));
    }

    return buttons;
}

function button(actionId: ActionType, text: string, conflictId: string, style?: "primary") {
    return {
        type: "button",
        action_id: actionId,
        value: conflictId,
        text: { type: "plain_text", text },
        ...(style ? { style } : {}),
    };
}

function recent(timeline: Conflict["timeline"]): string {
    if (!timeline.length) return "_nobody has looked at this yet_";
    return timeline
        .slice(-3)
        .map((entry) => `${entry.by} ${entry.what}`)
        .join("  ·  ");
}
