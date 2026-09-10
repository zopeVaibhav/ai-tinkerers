import type { SharedObject } from "@repo/types";

/**
 * The web surface renders the object itself in React, so this is identity.
 * It exists so every surface goes through the same contract.
 */
export function renderWeb(object: SharedObject): SharedObject {
    return object;
}
