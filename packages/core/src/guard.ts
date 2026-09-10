import type { Action, SharedObject } from "@repo/types";

/**
 * Three surfaces render the same object, so two people can be looking at the
 * same card and tap at the same moment. The second tap arrives against a state
 * that has already moved on.
 *
 * Rather than trusting whichever click lands last, an action is only applied
 * if it still makes sense for the current status. A stale tap becomes a no-op
 * and the card that person is looking at corrects itself a moment later.
 */
export function isValid(state: SharedObject, action: Action): boolean {
    const { status, acknowledgedBy } = state.facts;

    switch (action.type) {
        case "intake":
            return status !== "resolved";
        case "acknowledge":
            return !acknowledgedBy;
        case "propose":
            return status === "triage";
        case "approve":
        case "reject":
            return status === "awaiting_approval";
        case "resolve":
            return status === "approved";
        case "note":
        case "reframe":
            return true;
    }
}
