import { ActionType, Surface } from "@repo/types";

/**
 * Capability belongs to the surface, not the person. It is a statement about
 * what a window can physically produce: Slack has modals, so it can carry the
 * text that superseding and noting need. A Telegram callback is 64 bytes of
 * verb and id with nowhere to type, so that window cannot originate them.
 *
 * Nothing here is about seniority. Two people in the same thread have the same
 * capability, because they are looking through the same window.
 *
 * Enforced twice on purpose: the renderer does not draw the control, and this
 * runs before anything reaches the store.
 */
const ALLOWED: Record<Surface, ActionType[]> = {
    [Surface.Slack]: [
        ActionType.Acknowledge,
        ActionType.Resolve,
        ActionType.Supersede,
        ActionType.Note,
    ],
    [Surface.Telegram]: [ActionType.Acknowledge],
    // The browser can type, so it can produce everything. Note that the HTTP
    // endpoint behind this is unauthenticated — membership of a Slack workspace
    // or Telegram group is the only gate the other two surfaces get for free.
    //
    // Resolve is granted but currently unsent: superseding is what resolves a
    // conflict. It stays here so wiring a Resolve control later needs no change.
    [Surface.Web]: [
        ActionType.Acknowledge,
        ActionType.Resolve,
        ActionType.Supersede,
        ActionType.Note,
    ],
};

/**
 * Reframe is absent on purpose. The agent writes framings through `persist`
 * rather than `act`, because no window produced it and there is no surface to
 * ask about. If a Reframe ever needs to arrive from a person, give it a row
 * here rather than an exemption.
 */
export function can(surface: Surface, action: ActionType): boolean {
    return ALLOWED[surface].includes(action);
}
