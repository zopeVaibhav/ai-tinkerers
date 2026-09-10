import type { SharedObject } from "@repo/types";

/**
 * Pure function: object in, Block Kit out. Knows nothing about what happened,
 * only what the object currently is. Never import a Slack client here.
 *
 * Slack is the widest surface, so it gets the whole object: situation, fix,
 * timeline and every action available in the current status.
 *
 * Note: input blocks are rejected by chat.postMessage ("unsupported type: input").
 * Anything needing typed input must be a button that opens a modal.
 */
export function renderSlack(object: SharedObject): unknown[] {
    const { facts, framings, timeline } = object;

    const blocks: unknown[] = [
        {
            type: "header",
            text: { type: "plain_text", text: "Customer escalation" },
        },
        {
            type: "section",
            text: { type: "mrkdwn", text: framings.lead ?? facts.what },
        },
        {
            type: "section",
            fields: [
                { type: "mrkdwn", text: `*Severity*\n${facts.severity.toUpperCase()}` },
                { type: "mrkdwn", text: `*Users affected*\n${facts.affected}` },
                { type: "mrkdwn", text: `*Status*\n${label(facts.status)}` },
                { type: "mrkdwn", text: `*Owner*\n${facts.acknowledgedBy ?? "unassigned"}` },
            ],
        },
    ];

    if (facts.proposedFix) {
        blocks.push({
            type: "section",
            text: {
                type: "mrkdwn",
                text: `*Proposed fix*\n${facts.proposedFix}${
                    facts.approvedBy ? `\n_approved by ${facts.approvedBy}_` : ""
                }`,
            },
        });
    }

    const buttons = actionsFor(object);
    if (buttons.length) blocks.push({ type: "actions", elements: buttons });

    blocks.push({ type: "divider" });
    blocks.push({
        type: "context",
        elements: [{ type: "mrkdwn", text: recent(timeline) }],
    });

    return blocks;
}

function actionsFor(object: SharedObject): unknown[] {
    const { status } = object.facts;
    const buttons: unknown[] = [];

    if (status === "triage") {
        if (!object.facts.acknowledgedBy) buttons.push(button("acknowledge", "Take it", "primary"));
        buttons.push(button("propose", "Propose fix"));
    }

    if (status === "awaiting_approval") {
        buttons.push(button("approve", "Approve", "primary"));
        buttons.push(button("reject", "Reject", "danger"));
    }

    if (status === "approved") buttons.push(button("resolve", "Resolve", "primary"));

    if (status !== "resolved") buttons.push(button("note", "Add note"));

    return buttons;
}

function button(actionId: string, text: string, style?: "primary" | "danger") {
    return {
        type: "button",
        action_id: actionId,
        text: { type: "plain_text", text },
        ...(style ? { style } : {}),
    };
}

function label(status: SharedObject["facts"]["status"]): string {
    if (status === "awaiting_approval") return "Waiting for approval";
    if (status === "triage") return "Triage";
    if (status === "approved") return "Approved";
    return "Resolved";
}

function recent(timeline: SharedObject["timeline"]): string {
    if (!timeline.length) return "_no activity yet_";
    return timeline
        .slice(-3)
        .map((entry) => `${entry.by} ${entry.what}`)
        .join("  ·  ");
}
