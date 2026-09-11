import {
    ActionType,
    ClaimAction,
    Audience,
    Condition,
    Side,
    Subsystem,
    Surface,
} from "@repo/types";
import { createDecision, listConflicts, listDecisions } from "../repository";
import { act } from "../actions";
import { detect } from "../detect";

/**
 * Walks the whole lifecycle without Slack: two rooms disagree, the clash is
 * found once and only once, one side wins, and the settled claim never comes
 * back as a conflict again.
 *
 * This is a check, not the demo. The demo must always come from two people
 * typing into two channels.
 */
function line(label: string, ok: boolean, detail = "") {
    console.log(`${ok ? "ok  " : "FAIL"} ${label}${detail ? ` — ${detail}` : ""}`);
    if (!ok) process.exitCode = 1;
}

const payments = await createDecision({
    surface: Surface.Slack,
    threadKey: "C0PAYMENTS:check",
    threadName: "#payments",
    decidedBy: "aashish",
    rawText:
        "then we hard-fail on timeout, better to show an error than take money we can't confirm",
    subsystem: Subsystem.Payments,
    condition: Condition.GatewayTimeout,
    action: ClaimAction.HardFail,
});
line("first room decides, nothing to clash with", (await detect(payments)).length === 0);

const mobile = await createDecision({
    surface: Surface.Slack,
    threadKey: "C0MOBILE:check",
    threadName: "#mobile",
    decidedBy: "himanshu",
    rawText: "let's retry silently on timeout, three attempts before showing anything",
    subsystem: Subsystem.Payments,
    condition: Condition.GatewayTimeout,
    action: ClaimAction.RetrySilently,
});

const found = await detect(mobile);
line("second room disagrees, one conflict found", found.length === 1);
line("running detection again makes no duplicate", (await detect(mobile)).length === 0);

const conflict = found[0];
if (!conflict) {
    console.log("no conflict to carry on with");
    process.exit(1);
}

const acked = await act(
    conflict.id,
    { type: ActionType.Acknowledge, by: "vaibhav" },
    Audience.Lead,
);
line("acknowledging moves it out of open", acked?.status === "acknowledged", acked?.status);

const engineerNote = await act(
    conflict.id,
    { type: ActionType.Note, by: "himanshu", text: "from a phone" },
    Audience.Engineer,
);
line("a phone cannot leave a note", engineerNote?.timeline.length === acked?.timeline.length);

const resolved = await act(
    conflict.id,
    {
        type: ActionType.Supersede,
        by: "vaibhav",
        winner: Side.A,
        note: "mobile is right, cap at 3",
    },
    Audience.Lead,
);
line("superseding resolves it", resolved?.status === "resolved", resolved?.status);

const superseded = (await listDecisions()).find((one) => one.id === conflict.b.id);
line("the losing claim is superseded", Boolean(superseded?.supersededById));

const again = await detect(mobile);
line("a settled clash is not found again", again.length === 0);
line("still exactly one conflict on record", (await listConflicts()).length === 1);

// A second clash, on an unrelated subsystem, must stand on its own.
const authA = await createDecision({
    surface: Surface.Slack,
    threadKey: "C0AUTH:check",
    threadName: "#auth",
    decidedBy: "aashish",
    rawText: "expired tokens should just log and move on",
    subsystem: Subsystem.Auth,
    condition: Condition.TokenExpired,
    action: ClaimAction.LogOnly,
});
await detect(authA);

const authB = await createDecision({
    surface: Surface.Slack,
    threadKey: "C0WEB:check",
    threadName: "#web",
    decidedBy: "himanshu",
    rawText: "on an expired token we hard-fail and send them back to sign in",
    subsystem: Subsystem.Auth,
    condition: Condition.TokenExpired,
    action: ClaimAction.HardFail,
});

const second = await detect(authB);
line("an unrelated subsystem clashes on its own", second.length === 1);
line("both conflicts coexist", (await listConflicts()).length === 2);
line("the settled payments clash stayed settled", (await detect(mobile)).length === 0);

process.exit(process.exitCode ?? 0);
