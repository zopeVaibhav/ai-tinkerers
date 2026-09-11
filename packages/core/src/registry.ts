import type { Decision } from "@repo/types";

/**
 * The claim this whole product rests on, and deliberately the most boring code
 * in it. No model, no embeddings, no similarity score — five equality checks.
 *
 * A false contradiction in front of someone reads as keyword matching and kills
 * the idea, so a narrow rule that is always right beats a broad one that is
 * sometimes wrong. If the vocabulary cannot express something, widen the enums
 * in @repo/types. Never loosen the comparison.
 */
export function findConflicts(incoming: Decision, existing: Decision[]): Decision[] {
    return existing.filter((candidate) => contradicts(incoming, candidate));
}

export function contradicts(a: Decision, b: Decision): boolean {
    // A thread changing its mind is a correction, not a disagreement.
    if (a.threadKey === b.threadKey) return false;

    // Superseded claims are no longer what anyone stands behind.
    if (a.supersededById || b.supersededById) return false;

    if (a.subsystem !== b.subsystem) return false;
    if (a.condition !== b.condition) return false;

    // Same answer to the same question is agreement, not conflict.
    return a.action !== b.action;
}
