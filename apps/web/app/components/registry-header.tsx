"use client";

import Link from "next/link";
import type { Link as LinkState } from "../lib/use-registry";
import { ThemeToggle } from "./theme-toggle";

const TONE: Record<LinkState, string> = {
    live: "text-emerald-600",
    dropped: "text-red-600",
    mock: "text-amber-600",
    connecting: "text-neutral-400",
};

/**
 * The same masthead on both routes, so the stream indicator and the name field
 * do not move when a conflict is opened. `back` turns the title into a way out.
 */
export function RegistryHeader({
    link,
    name,
    onRename,
    subtitle,
    back = false,
}: {
    link: LinkState;
    name: string;
    onRename: (value: string) => void;
    subtitle?: string;
    back?: boolean;
}) {
    const title = <h1 className="text-2xl font-medium">Contradiction registry</h1>;

    return (
        <header className="flex flex-wrap items-baseline justify-between gap-4">
            <div className="flex items-center gap-3">
                {/* A titled link is a weak way out — it does not look like one until
                    you hover it. An arrow beside the title reads as "back" on sight. */}
                {back && (
                    <Link
                        href="/"
                        aria-label="Back to the registry"
                        className="flex h-9 w-9 shrink-0 items-center justify-center self-center rounded-lg border border-neutral-300 text-neutral-600 hover:bg-neutral-50"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="h-4 w-4"
                        >
                            <path d="M19 12H5" />
                            <path d="m12 19-7-7 7-7" />
                        </svg>
                    </Link>
                )}
                <div>
                    {back ? (
                        <Link href="/" className="cursor-pointer hover:underline">
                            {title}
                        </Link>
                    ) : (
                        title
                    )}
                    <p className="text-sm text-neutral-500">
                        {subtitle ??
                            "Decisions that cannot both be true, found across threads nobody shares."}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <span className={`text-xs ${TONE[link]}`}>{link}</span>
                <input
                    value={name}
                    onChange={(event) => onRename(event.target.value)}
                    placeholder="your name"
                    className="w-36 rounded-lg border border-neutral-300 px-3 py-1.5 text-sm"
                />
                <ThemeToggle />
            </div>
        </header>
    );
}
