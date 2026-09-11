import { ActionType, ConflictStatus } from "@repo/types";
import type { Action, Conflict } from "@repo/types";

/**
 * Two threads render the same conflict, so two people can be looking at it and
 * tap at the same moment. The second tap arrives against a state that has
 * already moved on.
 *
 * An action is only applied if it still makes sense for the current status.
 * A stale tap becomes a no-op and that person's card corrects itself a moment
 * later.
 */
export function isValid(state: Conflict, action: Action): boolean {
    switch (action.type) {
        case ActionType.Acknowledge:
            return state.status === ConflictStatus.Open;
        case ActionType.Resolve:
        case ActionType.Supersede:
            return state.status !== ConflictStatus.Resolved;
        case ActionType.Note:
        case ActionType.Reframe:
            return true;
    }
}
