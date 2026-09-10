import type { ViewRef } from "@repo/types";

/**
 * The subscription table. One object id maps to every live view of it.
 * Without this we would be syncing platforms. With it we are re-rendering
 * one object into many windows.
 */
const views = new Map<string, ViewRef[]>();

export function subscribe(objectId: string, view: ViewRef): void {
    const list = views.get(objectId) ?? [];
    list.push(view);
    views.set(objectId, list);
}

export function unsubscribe(objectId: string, match: (view: ViewRef) => boolean): void {
    const list = views.get(objectId) ?? [];
    views.set(
        objectId,
        list.filter((view) => !match(view)),
    );
}

export function viewsOf(objectId: string): ViewRef[] {
    return views.get(objectId) ?? [];
}

export function snapshotViews(): Record<string, ViewRef[]> {
    return Object.fromEntries(views);
}

export function restoreViews(data: Record<string, ViewRef[]>): void {
    for (const [id, list] of Object.entries(data)) views.set(id, list);
}
