import type { SharedObject } from "@repo/types";

export function createObject(id: string): SharedObject {
    return {
        id,
        version: 0,
        facts: {
            what: "Nothing reported yet",
            severity: "low",
            affected: 0,
            acknowledgedBy: null,
            proposedFix: null,
            approvedBy: null,
            status: "triage",
        },
        framings: {},
        timeline: [],
    };
}
