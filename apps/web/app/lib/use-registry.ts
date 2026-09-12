"use client";

import { useEffect, useState } from "react";
import type { Conflict, Decision } from "@repo/types";
import { mockRegistry } from "./fixtures";

const SERVER = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:5101";

/** Build the UI without a server: `NEXT_PUBLIC_MOCK=1 bun run dev`. */
const MOCK = process.env.NEXT_PUBLIC_MOCK === "1";

export type Link = "connecting" | "live" | "dropped" | "mock";

/**
 * The whole registry, plus the one write path back to it.
 *
 * Two routes render this data now — the landing list and a single conflict's
 * page — and both need the same live stream. Holding it in a hook rather than
 * in either page means neither one owns it, and a reader who deep-links
 * straight to a conflict gets the same subscription as one who clicked through.
 */
export function useRegistry() {
    const [conflicts, setConflicts] = useState<Conflict[]>([]);
    const [decisions, setDecisions] = useState<Decision[]>([]);
    const [link, setLink] = useState<Link>("connecting");
    const [name, setName] = useState("");

    useEffect(() => {
        setName(localStorage.getItem("name") ?? "");

        if (MOCK) {
            const registry = mockRegistry();
            setConflicts(registry.conflicts);
            setDecisions(registry.decisions);
            setLink("mock");
            return;
        }

        const source = new EventSource(`${SERVER}/stream`);
        source.onopen = () => setLink("live");
        source.onerror = () => setLink("dropped");
        source.onmessage = (event) => {
            setLink("live");
            const payload = JSON.parse(event.data) as {
                conflicts: Conflict[];
                decisions: Decision[];
            };
            setConflicts(payload.conflicts ?? []);
            setDecisions(payload.decisions ?? []);
        };
        return () => source.close();
    }, []);

    function rename(value: string) {
        setName(value);
        localStorage.setItem("name", value);
    }

    /** One write path for the panel, the buttons and the agent alike. */
    async function send(conflictId: string, action: Record<string, unknown>) {
        if (MOCK) {
            console.warn("mock mode: no server, action not sent", conflictId, action);
            return;
        }
        await fetch(`${SERVER}/conflicts/${conflictId}/action`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...action, by: name || "web" }),
        });
    }

    /**
     * An empty registry is only unknown until the first payload; after that it
     * is the answer.
     */
    const loading = link === "connecting" && !conflicts.length;

    return { conflicts, decisions, link, loading, name, rename, send };
}
