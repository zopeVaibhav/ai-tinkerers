"use client";

import { useEffect, useState } from "react";

/** The width at which the registry and the copilot can sit side by side. */
const SIDE_BY_SIDE = "(min-width: 1024px)";

/**
 * Starts false on purpose. The server has no viewport, so a first render that
 * claimed desktop would mismatch on a phone, and the failure there is the worse
 * one: a chat panel covering the whole screen. Narrow is the safe first answer,
 * corrected on mount.
 */
export function useDesktop(): boolean {
    const [desktop, setDesktop] = useState(false);

    useEffect(() => {
        const query = window.matchMedia(SIDE_BY_SIDE);
        setDesktop(query.matches);
        const update = (event: MediaQueryListEvent) => setDesktop(event.matches);
        query.addEventListener("change", update);
        return () => query.removeEventListener("change", update);
    }, []);

    return desktop;
}
