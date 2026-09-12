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
