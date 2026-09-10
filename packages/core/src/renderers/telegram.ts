import type { SharedObject } from "@repo/types";

export type TelegramPayload = {
    text: string;
    reply_markup: {
        inline_keyboard: { text: string; callback_data: string }[][];
    };
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
        framings.engineer ?? facts.what,
        "",
        `${facts.severity.toUpperCase()} · ${facts.affected} users affected`,
    ];

    if (facts.status === "awaiting_approval" && facts.proposedFix) {
        lines.push("", `Proposed: ${facts.proposedFix}`);
    }

    if (facts.status === "approved") lines.push("", "Approved. Fix going out.");
    if (facts.status === "resolved") lines.push("", "Resolved.");

    return { text: lines.join("\n"), reply_markup: { inline_keyboard: keyboard(object) } };
}

function keyboard(object: SharedObject): { text: string; callback_data: string }[][] {
    const { status, acknowledgedBy } = object.facts;

    if (status === "triage") {
        return acknowledgedBy ? [] : [[{ text: "Take it", callback_data: "acknowledge" }]];
    }

    if (status === "awaiting_approval") {
        return [
            [
                { text: "Approve", callback_data: "approve" },
                { text: "Reject", callback_data: "reject" },
            ],
        ];
    }

    if (status === "approved") return [[{ text: "Resolve", callback_data: "resolve" }]];

    return [];
}
