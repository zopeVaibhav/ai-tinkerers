import { Severity, Status } from "@repo/types";
import type { SharedObject } from "@repo/types";

export function createObject(id: string): SharedObject {
    return {
        id,
        version: 0,
        facts: {
            what: "Nothing reported yet",
            severity: Severity.Low,
            affected: 0,
            acknowledgedBy: null,
            proposedFix: null,
            approvedBy: null,
            status: Status.Triage,
        },
        framings: {},
        timeline: [],
    };
}
