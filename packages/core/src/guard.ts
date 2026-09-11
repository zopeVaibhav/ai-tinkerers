import { ActionType, Status } from "@repo/types";
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
        case ActionType.Intake:
            return status !== Status.Resolved;
        case ActionType.Acknowledge:
            return !acknowledgedBy;
        case ActionType.Propose:
            return status === Status.Triage;
        case ActionType.Approve:
        case ActionType.Reject:
            return status === Status.AwaitingApproval;
        case ActionType.Resolve:
            return status === Status.Approved;
        case ActionType.Note:
        case ActionType.Reframe:
            return true;
    }
}
