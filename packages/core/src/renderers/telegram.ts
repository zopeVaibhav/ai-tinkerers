import { ActionType, Audience, Status } from "@repo/types";
import type { SharedObject } from "@repo/types";

export type TelegramButton = { text: string; callback_data: ActionType };

export type TelegramPayload = {
    text: string;
    reply_markup: { inline_keyboard: TelegramButton[][] };
};

/**
 * Pure function: object in, Telegram payload out.
 *
 * Deliberately thinner than Slack. This is someone holding a phone, so it is
 * one situation line and the single decision that is actually theirs — not the
 * Slack card shrunk down.
 */
export function renderTelegram(object: SharedObject): TelegramPayload {
    const { facts, framings } = object;

    const lines = [
        framings[Audience.Engineer] ?? facts.what,
        "",
        `${facts.severity.toUpperCase()} · ${facts.affected} users affected`,
    ];

    if (facts.status === Status.AwaitingApproval && facts.proposedFix) {
        lines.push("", `Proposed: ${facts.proposedFix}`);
    }

    if (facts.status === Status.Approved) lines.push("", "Approved. Fix going out.");
    if (facts.status === Status.Resolved) lines.push("", "Resolved.");

    return { text: lines.join("\n"), reply_markup: { inline_keyboard: keyboard(object) } };
}

function keyboard(object: SharedObject): TelegramButton[][] {
    const { status, acknowledgedBy } = object.facts;

    if (status === Status.Triage) {
        return acknowledgedBy ? [] : [[{ text: "Take it", callback_data: ActionType.Acknowledge }]];
    }

    if (status === Status.AwaitingApproval) {
        return [
            [
                { text: "Approve", callback_data: ActionType.Approve },
                { text: "Reject", callback_data: ActionType.Reject },
            ],
        ];
    }

    if (status === Status.Approved)
        return [[{ text: "Resolve", callback_data: ActionType.Resolve }]];

    return [];
}
