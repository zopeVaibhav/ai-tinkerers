import { can, isValid } from "@repo/core";
import { Audience } from "@repo/types";
import type { Action, Conflict } from "@repo/types";
import { getConflict, persist } from "./repository";

/**
 * The single write path. Every surface and the agent come through here.
 * Two refusals happen before anything is written: the window is not allowed to
 * do it, or the tap arrived against a state that has already moved on.
 */
export async function act(
    conflictId: string,
    action: Action,
    from: Audience,
): Promise<Conflict | null> {
    const current = await getConflict(conflictId);
    if (!current) return null;

    if (!can(from, action.type)) {
        console.log(`refused ${action.type} from ${from}: not allowed on that surface`);
        return current;
    }

    if (!isValid(current, action)) {
        console.log(`ignored stale ${action.type} from ${action.by}`);
        return current;
    }

    return persist(current, action);
}
