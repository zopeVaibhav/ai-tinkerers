import { ActionType, Audience } from "@repo/types";

/**
 * Capability belongs to the window, not the person. A phone in a group chat
 * cannot type, so it cannot supersede a decision or leave a note — those
 * windows are not built to produce those actions.
 *
 * Enforced twice on purpose: the renderer does not draw the control, and this
 * runs before anything reaches the store.
 */
const ALLOWED: Record<Audience, ActionType[]> = {
    [Audience.Lead]: [
        ActionType.Acknowledge,
        ActionType.Resolve,
        ActionType.Supersede,
        ActionType.Note,
    ],
    [Audience.Engineer]: [ActionType.Acknowledge],
};

/** Written by the agent, not by a person, so no window owns it. */
const SYSTEM: ActionType[] = [ActionType.Reframe];

export function can(audience: Audience, action: ActionType): boolean {
    return SYSTEM.includes(action) || ALLOWED[audience].includes(action);
}
