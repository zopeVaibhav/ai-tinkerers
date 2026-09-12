import {
    ActionType,
    Audience,
    ClaimAction,
    Condition,
    ConflictStatus,
    Subsystem,
    Surface,
} from "@repo/types";
import type { Conflict, Decision, TimelineEntry, ViewSummary } from "@repo/types";

/**
 * Dummy registry for building the UI without a server or a database.
 *
 * Deliberately richer than real data tends to be early on: several statuses, a
 * log long enough to page through, messages long enough to clip, and entries
 * spread over days so the activity chart has a shape. If a layout survives this
 * it will survive production.
 *
 * Built inside a function rather than at module scope: the timestamps are
 * relative to now, and a value computed during SSR would not match the one
 * computed on the client.
 */

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const PEOPLE = ["Vaibhav Zope", "Aashish Raj", "Himanshu Naik", "on-call", "agent"];

const NOTES = [
    "vendor status page still amber, nothing official yet",
    "paged the on-call, waiting on them to pick it up",
    "customer replied — they are seeing it on the web checkout too, not just mobile",
    "rolled the canary to 10% and latency looks flat so far",
    "no change after the restart, so it is not the connection pool",
    "escalating to the platform team, this is beyond us",
    "adding a contract test so this cannot regress quietly again",
    "this is the third time this quarter the same condition has bitten us, worth a postmortem",
];

function decision(
    id: string,
    at: number,
    thread: string,
    by: string,
    subsystem: Subsystem,
    condition: Condition,
    action: ClaimAction,
    rawText: string,
    supersededById: string | null = null,
): Decision {
    return {
        id,
        createdAt: new Date(at).toISOString(),
        surface: Surface.Slack,
        threadKey: `C${id.toUpperCase()}`,
        threadName: thread,
        decidedBy: by,
        rawText,
        subsystem,
        condition,
        action,
        supersededById,
    };
}

/** Wording that matches what the reducer writes, so the log classifies it right. */
function log(at: number, by: string, what: string): TimelineEntry {
    return { at: new Date(at).toISOString(), by, what };
}

function longLog(now: number, count: number): TimelineEntry[] {
    const entries: TimelineEntry[] = [];
    for (let index = 0; index < count; index += 1) {
        // Newest last, thinning out as it goes back, so the chart is not a flat bar.
        const at = now - index * (17 * MINUTE + (index % 5) * 9 * MINUTE);
        const by = PEOPLE[index % PEOPLE.length] ?? "agent";
        const what =
            index % 7 === 0
                ? "rewrote the summaries"
                : (NOTES[index % NOTES.length] ?? "looking into it");
        entries.push(log(at, by === "agent" ? "agent" : by, what));
    }
    return entries.reverse();
}

const BOTH: ViewSummary[] = [
    { surface: Surface.Slack, audience: Audience.Lead },
    { surface: Surface.Slack, audience: Audience.Lead },
    { surface: Surface.Telegram, audience: Audience.Engineer },
];

export function mockRegistry(): { conflicts: Conflict[]; decisions: Decision[] } {
    const now = Date.now();

    const payA = decision(
        "d1",
        now - 3 * HOUR,
        "#mobile",
        "Himanshu Naik",
        Subsystem.Payments,
        Condition.GatewayTimeout,
        ClaimAction.RetrySilently,
        "let's retry silently on timeout, three attempts before showing anything",
    );
    const payB = decision(
        "d2",
        now - 3 * HOUR - 4 * MINUTE,
        "#payments",
        "Vaibhav Zope",
        Subsystem.Payments,
        Condition.GatewayTimeout,
        ClaimAction.HardFail,
        "ok let's hard-fail on timeout, better to show an error than take money we can't confirm",
    );

    const authA = decision(
        "d3",
        now - 26 * HOUR,
        "#web",
        "Aashish Raj",
        Subsystem.Auth,
        Condition.TokenExpired,
        ClaimAction.QueueAndWarn,
        "queue the request and warn the user their session is about to go, do not dump them out",
    );
    const authB = decision(
        "d4",
        now - 25 * HOUR,
        "#platform",
        "Vaibhav Zope",
        Subsystem.Auth,
        Condition.TokenExpired,
        ClaimAction.HardFail,
        "expired token is a hard fail, full stop — anything else is a security hole",
    );

    const notifA = decision(
        "d5",
        now - 4 * DAY,
        "#growth",
        "Himanshu Naik",
        Subsystem.Notifications,
        Condition.DuplicateEvent,
        ClaimAction.LogOnly,
        "just log duplicates, users would rather get two than none",
    );
    const notifB = decision(
        "d6",
        now - 4 * DAY + 20 * MINUTE,
        "#infra",
        "on-call",
        Subsystem.Notifications,
        Condition.DuplicateEvent,
        ClaimAction.HardFail,
        "drop duplicates hard, we were paying twice for every retry storm",
        "d5",
    );

    const rateA = decision(
        "d7",
        now - 40 * MINUTE,
        "#api",
        "Aashish Raj",
        Subsystem.Payments,
        Condition.RateLimited,
        ClaimAction.QueueAndWarn,
        "queue and warn on 429, the caller can wait a beat",
    );
    const rateB = decision(
        "d8",
        now - 35 * MINUTE,
        "#mobile",
        "Himanshu Naik",
        Subsystem.Payments,
        Condition.RateLimited,
        ClaimAction.RetrySilently,
        "retry silently with backoff, the user should never see a 429",
    );

    const conflicts: Conflict[] = [
        {
            id: "c1",
            version: 3,
            createdAt: new Date(now - 3 * HOUR).toISOString(),
            status: ConflictStatus.Open,
            acknowledgedBy: null,
            resolution: null,
            a: payA,
            b: payB,
            framings: {
                [Audience.Engineer]:
                    "On the phone, #mobile retries silently on gateway_timeout while #payments hard-fails, causing a clash on timeout handling.",
                [Audience.Lead]:
                    "In #mobile, the team decided to retry silently on gateway_timeout; in #payments, the team decided to hard-fail on the same condition. If both ship, the user experience breaks due to inconsistent timeout handling.",
            },
            timeline: longLog(now, 46),
            views: BOTH,
        },
        {
            id: "c2",
            version: 7,
            createdAt: new Date(now - 26 * HOUR).toISOString(),
            status: ConflictStatus.Acknowledged,
            acknowledgedBy: "Vaibhav Zope",
            resolution: null,
            a: authA,
            b: authB,
            framings: {
                [Audience.Engineer]:
                    "#web queues and warns on token_expired, #platform hard-fails. Same condition, opposite handling.",
                [Audience.Lead]:
                    "The web team wants an expiring session to degrade gently; platform treats it as a hard security boundary. Someone has to pick before the auth refactor lands.",
            },
            timeline: [
                log(now - 26 * HOUR, "agent", "rewrote the summaries"),
                log(now - 25 * HOUR, "Vaibhav Zope", "acknowledged the conflict"),
                log(
                    now - 24 * HOUR,
                    "Aashish Raj",
                    "this one is not urgent but it does block the auth refactor, so we should settle it this week rather than let it sit",
                ),
                log(now - 20 * HOUR, "Himanshu Naik", "pulled in security to weigh in"),
            ],
            views: BOTH,
        },
        {
            id: "c3",
            version: 12,
            createdAt: new Date(now - 4 * DAY).toISOString(),
            status: ConflictStatus.Resolved,
            acknowledgedBy: "on-call",
            resolution: "dropping duplicates, the cost of double-sending outweighed the misses",
            a: notifA,
            b: notifB,
            framings: {
                [Audience.Engineer]:
                    "#growth logs duplicate_event, #infra drops it. Settled: #infra won.",
                [Audience.Lead]:
                    "Growth wanted duplicates tolerated so nobody misses a notification; infra was paying for every retry storm. Resolved in favour of dropping them.",
            },
            timeline: [
                log(now - 4 * DAY, "agent", "rewrote the summaries"),
                log(now - 4 * DAY + 30 * MINUTE, "on-call", "acknowledged the conflict"),
                log(
                    now - 3 * DAY,
                    "on-call",
                    "kept side B: dropping duplicates, the cost of double-sending outweighed the misses",
                ),
            ],
            views: [{ surface: Surface.Slack, audience: Audience.Lead }],
        },
        {
            id: "c4",
            version: 1,
            createdAt: new Date(now - 35 * MINUTE).toISOString(),
            status: ConflictStatus.Open,
            acknowledgedBy: null,
            resolution: null,
            a: rateA,
            b: rateB,
            framings: {},
            timeline: [],
            views: [],
        },
    ];

    return { conflicts, decisions: [payA, payB, authA, authB, notifA, notifB, rateA, rateB] };
}
