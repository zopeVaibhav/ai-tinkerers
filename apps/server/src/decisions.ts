import { Surface } from "@repo/types";
import type { Decision } from "@repo/types";
import type { Claim } from "./agent/extract";
import { claimAlreadyMade, createDecision, decisionForThread, supersede } from "./repository";

export type ThreadRef = {
    surface: Surface;
    threadKey: string;
    threadName: string;
};

/**
 * Re-reading a thread must not pile up duplicate decisions. A claim this room
 * has made before is a no-op even if it was later superseded, because the
 * message that stated it is still in the scrollback and will extract on every
 * re-read. A genuinely new claim supersedes whatever the room stood behind, and
 * the superseded row stops being visible to conflict detection.
 */
export async function record(
    thread: ThreadRef,
    claim: Claim,
    decidedBy: string,
): Promise<{ decision: Decision; changed: boolean } | null> {
    // Asked of every claim the room has ever made, not only the live one: a
    // superseded claim is still sitting in the scrollback and extracts again.
    const already = await claimAlreadyMade(
        thread.threadKey,
        claim.subsystem,
        claim.condition,
        claim.action,
    );
    if (already) return { decision: already, changed: false };

    const previous = await decisionForThread(thread.threadKey);

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
