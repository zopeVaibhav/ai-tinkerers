import { can, isValid } from "@repo/core";
import { ActionType, Side, Surface } from "@repo/types";
import type { Action, Conflict } from "@repo/types";
import { getConflict, persist, supersede } from "./repository";

/**
 * The single write path. Every surface and the agent come through here.
 * Two refusals happen before anything is written: the window is not allowed to
 * do it, or the tap arrived against a state that has already moved on.
 */
export async function act(
    conflictId: string,
    action: Action,
    from: Surface,
): Promise<Conflict | null> {
    const current = await getConflict(conflictId);
    if (!current) return null;

    if (!can(from, action.type)) {
        console.log(`refused ${action.type} from ${from}: that surface cannot produce it`);
        return current;
    }

    if (!isValid(current, action)) {
        console.log(`ignored stale ${action.type} from ${action.by}`);
        return current;
    }

    // Superseding is the only verb that changes a decision rather than the
    // conflict. The losing claim stops being what its room stands behind, which
    // is what keeps the same clash from being found again a minute later.
    if (action.type === ActionType.Supersede) {
        const loser = action.winner === Side.A ? current.b : current.a;
        const winner = action.winner === Side.A ? current.a : current.b;
        await supersede(loser.id, winner.id);
        console.log(
            `superseded ${loser.threadName} (${loser.action}) in favour of ${winner.threadName}`,
        );
    }

    return persist(current, action);
}
