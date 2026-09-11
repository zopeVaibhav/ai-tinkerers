import type { Conflict } from "@repo/types";

/**
 * The web surface renders the conflict itself in React, so this is identity.
 * It exists so every surface goes through the same contract.
 */
export function renderWeb(conflict: Conflict): Conflict {
    return conflict;
}
