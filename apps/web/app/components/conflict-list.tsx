"use client";

import Link from "next/link";
import { ConflictStatus } from "@repo/types";
import type { Conflict } from "@repo/types";
import { AnimatePresence, motion } from "motion/react";
import { STATUS_LABEL, STATUS_ORDER, STATUS_STYLE, ago } from "../lib/display";
import { listItem, stagger } from "../lib/motion";

export function StatusFilter({
    value,
    counts,
    onChange,
}: {
    value: ConflictStatus | "all";
    counts: Record<string, number>;
    onChange: (next: ConflictStatus | "all") => void;
}) {
    const options: (ConflictStatus | "all")[] = ["all", ...STATUS_ORDER];

    return (
        <div className="flex flex-wrap gap-1">
            {options.map((option) => (
                <button
                    key={option}
                    onClick={() => onChange(option)}
                    className={`cursor-pointer rounded-full px-3 py-1 text-xs ${
                        value === option
                            ? "bg-neutral-900 text-white"
                            : "border border-neutral-300 text-neutral-600 hover:bg-neutral-50"
                    }`}
                >
                    {option === "all" ? "All" : STATUS_LABEL[option]}
                    <span className="ml-1.5 opacity-60">{counts[option] ?? 0}</span>
                </button>
            ))}
        </div>
    );
}

export function EmptyConflicts() {
    return (
        <p className="rounded-xl border border-neutral-200 bg-white p-4 text-sm text-neutral-400">
            No contradictions found. Two threads have to disagree first.
        </p>
    );
}

/**
 * The dense view: one line per clash, scannable top to bottom.
 *
 * A row is a link rather than a button because a conflict has its own address
 * now — which is what lets one be pasted into the thread it came from.
 */
export function ConflictList({ conflicts }: { conflicts: Conflict[] }) {
    if (!conflicts.length) return <EmptyConflicts />;

    return (
        <ol className="flex flex-col gap-2">
            {/* Keyed by conflict id, never by position: a filter change should move
                the rows that survive it, not replay them. */}
            <AnimatePresence>
                {conflicts.map((conflict, index) => (
                    <motion.li key={conflict.id} {...listItem} transition={stagger(index)}>
                        <Link
                            href={`/conflicts/${conflict.id}`}
                            className="block w-full cursor-pointer rounded-xl border border-neutral-200 bg-white p-4 text-left hover:border-neutral-400"
                        >
                            <div className="flex items-center justify-between gap-2">
                                <span
                                    className={`rounded-full px-2 py-0.5 text-xs ${STATUS_STYLE[conflict.status]}`}
                                >
                                    {STATUS_LABEL[conflict.status]}
                                </span>
                                <span className="text-xs text-neutral-400">
                                    {ago(conflict.createdAt)}
                                </span>
                            </div>

                            <p className="mt-2 text-sm text-neutral-800">
                                <span className="font-medium">{conflict.a.subsystem}</span>
                                <span className="text-neutral-400"> on </span>
                                <code className="text-xs">{conflict.a.condition}</code>
                            </p>

                            <p className="mt-1 text-xs text-neutral-500">
                                {conflict.a.threadName} says {conflict.a.action} ·{" "}
                                {conflict.b.threadName} says {conflict.b.action}
                            </p>
                        </Link>
                    </motion.li>
                ))}
            </AnimatePresence>
        </ol>
    );
}
