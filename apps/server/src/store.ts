import { createObject, isValid, reduce } from "@repo/core";
import type { Action, SharedObject } from "@repo/types";

type Listener = (object: SharedObject) => void;

const objects = new Map<string, SharedObject>();
const listeners = new Set<Listener>();

export function getObject(id: string): SharedObject {
    let object = objects.get(id);
    if (!object) {
        object = createObject(id);
        objects.set(id, object);
    }
    return object;
}

/**
 * The only write path. Every surface and the agent go through here.
 * Applying an action fires one change event; fan-out happens in the caller.
 */
export function apply(id: string, action: Action): SharedObject {
    const current = getObject(id);

    // A tap against a state that has already moved on changes nothing.
    if (!isValid(current, action)) {
        console.log(`ignored stale ${action.type} from ${action.by}`);
        return current;
    }

    const next = reduce(current, action);
    objects.set(id, next);
    for (const listener of listeners) listener(next);
    return next;
}

/** Start the object over. Needed for repeated demo takes, not for production. */
export function reset(id: string): SharedObject {
    const fresh = createObject(id);
    objects.set(id, fresh);
    for (const listener of listeners) listener(fresh);
    return fresh;
}

export function onChange(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

export function snapshotObjects(): Record<string, SharedObject> {
    return Object.fromEntries(objects);
}

export function restoreObjects(data: Record<string, SharedObject>): void {
    for (const [id, object] of Object.entries(data)) objects.set(id, object);
}
