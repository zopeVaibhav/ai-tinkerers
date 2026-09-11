import { ClaimAction, Condition, Subsystem, Surface } from "@repo/types";
import { createDecision, listConflicts } from "../repository";
import { detect } from "../detect";

/**
 * Exercises detection without Slack. Run after `bun run db:seed`, which leaves
 * one room having decided and nobody disagreeing yet.
 *
 * This is a check, not the demo. The demo must always come from two people
 * typing into two channels.
 */
const second = await createDecision({
    surface: Surface.Slack,
    threadKey: "C0MOBILE:check",
    threadName: "#mobile",
    decidedBy: "himanshu",
    rawText: "let's retry silently on timeout, three attempts before showing anything",
    subsystem: Subsystem.Payments,
    condition: Condition.GatewayTimeout,
    action: ClaimAction.RetrySilently,
});

const found = await detect(second);
console.log(`detect found ${found.length} conflict(s)`);

const again = await detect(second);
console.log(`second run found ${again.length} (must be 0 — no duplicate rows)`);

for (const conflict of await listConflicts()) {
    console.log(
        `  ${conflict.a.threadName} ${conflict.a.action}  vs  ${conflict.b.threadName} ${conflict.b.action}`,
    );
}

process.exit(0);
