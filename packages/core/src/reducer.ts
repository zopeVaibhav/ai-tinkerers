import type { Action, SharedObject } from "@repo/types";

/**
 * Pure. No IO, no model calls, no platform knowledge.
 * One action in, one new object out. This is the only place state changes.
 */
export function reduce(state: SharedObject, action: Action): SharedObject {
    const next = ((): SharedObject["facts"] => {
        switch (action.type) {
            case "increment":
                return { ...state.facts, count: state.facts.count + 1 };
            case "decrement":
                return { ...state.facts, count: state.facts.count - 1 };
            case "reset":
                return { ...state.facts, count: 0 };
        }
    })();

    return {
        ...state,
        version: state.version + 1,
        facts: next,
        timeline: [
            ...state.timeline,
            { at: new Date().toISOString(), by: action.by, what: action.type },
        ],
    };
}
