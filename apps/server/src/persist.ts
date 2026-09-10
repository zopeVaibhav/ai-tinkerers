import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import type { SharedObject, ViewRef } from "@repo/types";
import { restoreObjects, snapshotObjects } from "./store";
import { restoreViews, snapshotViews } from "./subscriptions";

const FILE = resolve(import.meta.dir, "../../../.state.json");

type Snapshot = {
    objects: Record<string, SharedObject>;
    views: Record<string, ViewRef[]>;
};

/**
 * Dev convenience, not the architecture. A hot reload wipes in-memory state,
 * and without this every restart posts a brand new card to every surface.
 * Reattaching to the views we already own keeps one object on screen.
 */
export function load(): void {
    if (!existsSync(FILE)) return;
    try {
        const snapshot = JSON.parse(readFileSync(FILE, "utf8")) as Snapshot;
        restoreObjects(snapshot.objects ?? {});
        restoreViews(snapshot.views ?? {});
        console.log("state restored from .state.json");
    } catch {
        console.warn("could not read .state.json, starting fresh");
    }
}

export function save(): void {
    // Web views are per-connection and die with the browser tab. Only the
    // durable message-backed views are worth carrying across a restart.
    const views = Object.fromEntries(
        Object.entries(snapshotViews()).map(([id, list]) => [
            id,
            list.filter((view) => view.surface !== "web"),
        ]),
    );
    writeFileSync(FILE, JSON.stringify({ objects: snapshotObjects(), views } satisfies Snapshot, null, 2));
}
