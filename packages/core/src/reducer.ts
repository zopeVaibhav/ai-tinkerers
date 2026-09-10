import type { Action, SharedObject } from "@repo/types";

type Facts = SharedObject["facts"];

/**
 * Pure. No IO, no model calls, no platform knowledge.
 * One action in, one new object out. This is the only place state changes.
 */
export function reduce(state: SharedObject, action: Action): SharedObject {
    const facts = nextFacts(state.facts, action);
    const framings =
        action.type === "reframe" ? { ...state.framings, ...action.framings } : state.framings;

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
        case "intake":
            return {
                ...facts,
                what: action.what,
                severity: action.severity,
                affected: action.affected,
                status: "triage",
            };
        case "acknowledge":
            return { ...facts, acknowledgedBy: action.by };
        case "propose":
            return { ...facts, proposedFix: action.fix, status: "awaiting_approval" };
        case "approve":
            return { ...facts, approvedBy: action.by, status: "approved" };
        case "reject":
            return { ...facts, proposedFix: null, approvedBy: null, status: "triage" };
        case "resolve":
            return { ...facts, status: "resolved" };
        case "note":
        case "reframe":
            return facts;
    }
}

function describe(action: Action): string {
    switch (action.type) {
        case "intake":
            return `reported: ${action.what}`;
        case "acknowledge":
            return "took ownership";
        case "propose":
            return `proposed: ${action.fix}`;
        case "approve":
            return "approved the fix";
        case "reject":
            return `rejected: ${action.reason}`;
        case "resolve":
            return "marked resolved";
        case "note":
            return action.text;
        case "reframe":
            return "rewrote the summaries";
    }
}
