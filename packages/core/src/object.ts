import type { SharedObject } from "@repo/types";

export function createObject(id: string): SharedObject {
    return {
        id,
        version: 0,
        facts: { count: 0, status: "open" },
        framings: {},
        timeline: [],
    };
}
