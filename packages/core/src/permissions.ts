import { ActionType, Audience } from "@repo/types";
import type { Action, SharedObject } from "@repo/types";

/**
 * Capability belongs to the window, not the person. A customer looking at their
 * own thread cannot steer the incident, and a phone in a group chat cannot type
 * a proposal, because those windows are not built to produce those actions.
 *
 * Enforced twice on purpose: the renderer does not draw the control, and this
 * runs before anything reaches the store.
 */
const ALLOWED: Record<Audience, ActionType[]> = {
    [Audience.Lead]: [
        ActionType.Intake,
        ActionType.Acknowledge,
        ActionType.Propose,
        ActionType.Approve,
        ActionType.Reject,
        ActionType.Resolve,
        ActionType.Note,
    ],
    [Audience.Engineer]: [
        ActionType.Acknowledge,
        ActionType.Approve,
        ActionType.Reject,
        ActionType.Resolve,
    ],
    [Audience.Customer]: [ActionType.Intake],
};

/** Written by the agent, not by a person, so no window owns it. */
const SYSTEM: ActionType[] = [ActionType.Reframe];

export function can(audience: Audience, action: ActionType): boolean {
    return SYSTEM.includes(action) || ALLOWED[audience].includes(action);
}

/** Nobody signs off on their own proposal, whichever surface they are on. */
export function isSelfApproval(state: SharedObject, action: Action): boolean {
    if (action.type !== ActionType.Approve) return false;
    const proposal = [...state.timeline]
        .reverse()
        .find((entry) => entry.what.startsWith("proposed:"));
    return proposal?.by === action.by;
}
