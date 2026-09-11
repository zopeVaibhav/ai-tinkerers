import { findConflicts } from "@repo/core";
import type { Conflict, Decision } from "@repo/types";
import { candidatesFor, createConflict } from "./repository";

/**
 * The moment the product turns on. A new decision is compared against every
 * live claim about the same subsystem and condition, and any that disagree
 * become a conflict — found by equality, not by a model.
 *
 * Neither room knew the other existed. Nobody clicked anything.
 */
export async function detect(decision: Decision): Promise<Conflict[]> {
    const candidates = await candidatesFor(decision.subsystem, decision.condition);
    const clashes = findConflicts(decision, candidates);

    const found: Conflict[] = [];
    for (const other of clashes) {
        const conflict = await createConflict(decision, other);
        if (!conflict) continue;
        console.log(
            `conflict found: ${decision.threadName} (${decision.action}) vs ${other.threadName} (${other.action})`,
        );
        found.push(conflict);
    }
    return found;
}
