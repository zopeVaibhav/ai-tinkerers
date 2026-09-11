import { Surface } from "@repo/types";
import type { Decision } from "@repo/types";
import type { Claim } from "./agent/extract";
import { createDecision, decisionForThread, supersede } from "./repository";

export type ThreadRef = {
    surface: Surface;
    threadKey: string;
    threadName: string;
};

/**
 * Re-reading a thread must not pile up duplicate decisions. An unchanged claim
 * is a no-op; a changed one supersedes what the thread said before, and the
 * superseded row stops being visible to conflict detection.
 */
export async function record(
    thread: ThreadRef,
    claim: Claim,
    decidedBy: string,
): Promise<{ decision: Decision; changed: boolean } | null> {
    const previous = await decisionForThread(thread.threadKey);

    if (
        previous &&
        previous.subsystem === claim.subsystem &&
        previous.condition === claim.condition &&
        previous.action === claim.action
    ) {
        return { decision: previous, changed: false };
    }

    const decision = await createDecision({
        surface: thread.surface,
        threadKey: thread.threadKey,
        threadName: thread.threadName,
        decidedBy,
        rawText: claim.rawText,
        subsystem: claim.subsystem,
        condition: claim.condition,
        action: claim.action,
    });

    if (previous) await supersede(previous.id, decision.id);

    return { decision, changed: true };
}
