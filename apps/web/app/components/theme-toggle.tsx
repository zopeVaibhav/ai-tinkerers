"use client";

import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

export const THEME_KEY = "theme";

/**
 * The one place that knows how a theme is applied, so the toggle and the
 * before-paint script in layout.tsx cannot drift apart.
 */
export function applyTheme(theme: Theme) {
    document.documentElement.classList.toggle("dark", theme === "dark");
}

export function ThemeToggle() {
    /**
     * The server has no way to know which theme this reader chose, so the first
     * render must not depend on it. `null` until mounted means the markup React
     * hydrates is the markup the server sent; the real icon appears a frame
     * later, by which time the inline script has already painted the right
     * colours underneath it.
     */
    const [theme, setTheme] = useState<Theme | null>(null);

    useEffect(() => {
        setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    }, []);

    function flip() {
        const next: Theme = theme === "dark" ? "light" : "dark";
        setTheme(next);
        applyTheme(next);
        localStorage.setItem(THEME_KEY, next);
    }

    return (
        <button
            onClick={flip}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-neutral-300 text-neutral-600 hover:bg-neutral-50"
        >
            {theme === null ? null : theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
    );
}

function SunIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
        >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
    );
}

function MoonIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
    );
}
