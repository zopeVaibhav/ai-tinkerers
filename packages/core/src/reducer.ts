import { ActionType, Status } from "@repo/types";
import type { Action, SharedObject } from "@repo/types";

type Facts = SharedObject["facts"];

/**
 * Pure. No IO, no model calls, no platform knowledge.
 * One action in, one new object out. This is the only place state changes.
 */
export function reduce(state: SharedObject, action: Action): SharedObject {
    const facts = nextFacts(state.facts, action);
    const framings =
        action.type === ActionType.Reframe
            ? { ...state.framings, ...action.framings }
            : state.framings;

    return {
        ...state,
        version: state.version + 1,
        facts,
        framings,
        timeline: [
            ...state.timeline,
            { at: new Date().toISOString(), by: action.by, what: describe(action) },
        ],
    };
}

function nextFacts(facts: Facts, action: Action): Facts {
    switch (action.type) {
        case ActionType.Intake:
            return {
                ...facts,
                what: action.what,
                severity: action.severity,
                affected: action.affected,
                status: Status.Triage,
            };
        case ActionType.Acknowledge:
            return { ...facts, acknowledgedBy: action.by };
        case ActionType.Propose:
            return { ...facts, proposedFix: action.fix, status: Status.AwaitingApproval };
        case ActionType.Approve:
            return { ...facts, approvedBy: action.by, status: Status.Approved };
        case ActionType.Reject:
            return { ...facts, proposedFix: null, approvedBy: null, status: Status.Triage };
        case ActionType.Resolve:
            return { ...facts, status: Status.Resolved };
        case ActionType.Note:
        case ActionType.Reframe:
            return facts;
    }
}

function describe(action: Action): string {
    switch (action.type) {
        case ActionType.Intake:
            return `reported: ${action.what}`;
        case ActionType.Acknowledge:
            return "took ownership";
        case ActionType.Propose:
            return `proposed: ${action.fix}`;
        case ActionType.Approve:
            return "approved the fix";
        case ActionType.Reject:
            return `rejected: ${action.reason}`;
        case ActionType.Resolve:
            return "marked resolved";
        case ActionType.Note:
            return action.text;
        case ActionType.Reframe:
            return "rewrote the summaries";
    }
}
