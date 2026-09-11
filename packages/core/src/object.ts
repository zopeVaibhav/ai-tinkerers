import { Severity, Status, Surface } from "@repo/types";
import type { SharedObject } from "@repo/types";

export function createObject(id: string, raisedBy: string, raisedOn: Surface): SharedObject {
    return {
        id,
        version: 0,
        createdAt: new Date().toISOString(),
        raisedBy,
        raisedOn,
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
