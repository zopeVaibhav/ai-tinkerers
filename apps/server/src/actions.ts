import { can, isSelfApproval, isValid } from "@repo/core";
import { Audience } from "@repo/types";
import type { Action, SharedObject } from "@repo/types";
import { getIssue, persist } from "./repository";

/**
 * The single write path. Every surface and the agent come through here.
 * Three refusals happen before anything is written: the window is not allowed
 * to do it, the person is signing off their own proposal, or the tap arrived
 * against a state that has already moved on.
 */
export async function act(
    issueId: string,
    action: Action,
    from: Audience,
): Promise<SharedObject | null> {
    const current = await getIssue(issueId);
    if (!current) return null;

    if (!can(from, action.type)) {
        console.log(`refused ${action.type} from ${from}: not allowed on that surface`);
        return current;
    }

    if (isSelfApproval(current, action)) {
        console.log(`refused ${action.type} from ${action.by}: cannot approve own proposal`);
        return current;
    }

    if (!isValid(current, action)) {
        console.log(`ignored stale ${action.type} from ${action.by}`);
        return current;
    }

    return persist(current, action);
}
