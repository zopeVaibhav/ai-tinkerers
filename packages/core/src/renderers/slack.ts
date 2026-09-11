import { ActionType, Audience, Control, Status } from "@repo/types";
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
            text: { type: "mrkdwn", text: framings[Audience.Lead] ?? facts.what },
        },
        {
            type: "section",
            fields: [
                { type: "mrkdwn", text: `*Severity*\n${facts.severity.toUpperCase()}` },
                { type: "mrkdwn", text: `*Users affected*\n${facts.affected}` },
                { type: "mrkdwn", text: `*Status*\n${STATUS_LABEL[facts.status]}` },
                { type: "mrkdwn", text: `*Owner*\n${facts.acknowledgedBy ?? "unassigned"}` },
                { type: "mrkdwn", text: `*Raised by*\n${object.raisedBy}` },
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

const STATUS_LABEL: Record<Status, string> = {
    [Status.Triage]: "Triage",
    [Status.AwaitingApproval]: "Waiting for approval",
    [Status.Approved]: "Approved",
    [Status.Resolved]: "Resolved",
};

function actionsFor(object: SharedObject): unknown[] {
    const { status, acknowledgedBy } = object.facts;
    const id = object.id;
    const buttons: unknown[] = [];

    if (status === Status.Triage) {
        if (!acknowledgedBy) buttons.push(button(ActionType.Acknowledge, "Take it", id, "primary"));
        buttons.push(button(ActionType.Propose, "Propose fix", id));
    }

    if (status === Status.AwaitingApproval) {
        buttons.push(button(ActionType.Approve, "Approve", id, "primary"));
        buttons.push(button(ActionType.Reject, "Reject", id, "danger"));
    }

    if (status === Status.Approved)
        buttons.push(button(ActionType.Resolve, "Resolve", id, "primary"));

    if (status !== Status.Resolved) buttons.push(button(ActionType.Note, "Add note", id));

    // Reading the past is not an action on the object. It opens a modal, which
    // is private to whoever clicked, so the card itself never moves.
    if (object.version > 0) buttons.push(button(Control.History, `History · v${object.version}`, id));

    return buttons;
}

function button(
    actionId: ActionType | Control,
    text: string,
    issueId: string,
    style?: "primary" | "danger",
) {
    return {
        type: "button",
        action_id: actionId,
        value: issueId,
        text: { type: "plain_text", text },
        ...(style ? { style } : {}),
    };
}

function recent(timeline: SharedObject["timeline"]): string {
    if (!timeline.length) return "_no activity yet_";
    return timeline
        .slice(-3)
        .map((entry) => `${entry.by} ${entry.what}`)
        .join("  ·  ");
}

/**
 * The object's past, as Block Kit. Pure like every other renderer: versions in,
 * markup out. Shown in a modal, which is private to one person, so reading
 * history never disturbs the card everyone else is looking at.
 */
export function renderHistory(versions: SharedObject[]): unknown[] {
    if (versions.length <= 1) {
        return [{ type: "section", text: { type: "mrkdwn", text: "_nothing has changed yet_" } }];
    }

    // A modal takes 100 blocks. A long-running issue can pass that, and the
    // recent past is the part anyone opens this to read.
    return [...versions]
        .reverse()
        .slice(0, 100)
        .map((version) => {
            const entry = version.timeline[version.timeline.length - 1];
            const when = entry ? new Date(entry.at).toLocaleTimeString() : "start";
            const what = entry ? `*${entry.by}* ${entry.what}` : "_issue raised_";
            return {
                type: "context",
                elements: [{ type: "mrkdwn", text: `*v${version.version}* · ${when} · ${what}` }],
            };
        });
}
