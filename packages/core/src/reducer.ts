import { ActionType, ConflictStatus } from "@repo/types";
import type { Action, Conflict } from "@repo/types";

/**
 * Pure. No IO, no model calls, no platform knowledge.
 * One action in, one new conflict out. This is the only place state changes.
 */
export function reduce(state: Conflict, action: Action): Conflict {
    const next: Conflict = {
        ...state,
        version: state.version + 1,
        framings:
            action.type === ActionType.Reframe
                ? { ...state.framings, ...action.framings }
                : state.framings,
        timeline: [
            ...state.timeline,
            { at: new Date().toISOString(), by: action.by, what: describe(action) },
        ],
    };

    switch (action.type) {
        case ActionType.Acknowledge:
            return { ...next, status: ConflictStatus.Acknowledged, acknowledgedBy: action.by };
        case ActionType.Resolve:
            return { ...next, status: ConflictStatus.Resolved, resolution: action.resolution };
        case ActionType.Supersede:
            return { ...next, status: ConflictStatus.Resolved, resolution: action.note };
        case ActionType.Note:
        case ActionType.Reframe:
            return next;
    }
}

function describe(action: Action): string {
    switch (action.type) {
        case ActionType.Acknowledge:
            return "acknowledged the conflict";
        case ActionType.Resolve:
            return `resolved: ${action.resolution}`;
        case ActionType.Supersede:
            return `kept side ${action.winner.toUpperCase()}: ${action.note}`;
        case ActionType.Note:
            return action.text;
        case ActionType.Reframe:
            return "rewrote the summaries";
    }
}
