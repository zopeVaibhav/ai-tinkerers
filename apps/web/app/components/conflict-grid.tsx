"use client";

import Link from "next/link";
import type { Conflict } from "@repo/types";
import { AnimatePresence, motion } from "motion/react";
import { STATUS_LABEL, STATUS_STYLE, ago } from "../lib/display";
import { listItem, stagger } from "../lib/motion";
import { EmptyConflicts } from "./conflict-list";

/**
 * The other view of the same set. Where the list is for scanning many, this is
 * for reading a few: it spends the extra width on both sides of the clash side
 * by side, which is the one thing a row cannot show without wrapping.
 */
export function ConflictGrid({ conflicts }: { conflicts: Conflict[] }) {
    if (!conflicts.length) return <EmptyConflicts />;

    return (
        <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence>
                {conflicts.map((conflict, index) => (
                    <motion.li key={conflict.id} {...listItem} transition={stagger(index)}>
                        <Link
                            href={`/conflicts/${conflict.id}`}
                            className="flex h-full cursor-pointer flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-4 hover:border-neutral-400"
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

                            <p className="text-sm text-neutral-800">
                                <span className="font-medium">{conflict.a.subsystem}</span>
                                <span className="text-neutral-400"> on </span>
                                <code className="text-xs">{conflict.a.condition}</code>
                            </p>

                            {/* mt-auto: cards in a row are as tall as the tallest, and the
                                two sides should line up across them rather than float. */}
                            <div className="mt-auto grid grid-cols-2 gap-2">
                                {[conflict.a, conflict.b].map((side) => (
                                    <div
                                        key={side.id}
                                        className="rounded-lg border border-neutral-200 p-2.5"
                                    >
                                        <p className="truncate text-xs font-medium text-neutral-700">
                                            {side.threadName}
                                        </p>
                                        <code className="text-xs text-neutral-900">
                                            {side.action}
                                        </code>
                                    </div>
                                ))}
                            </div>

                            {conflict.resolution && (
                                <p className="line-clamp-2 text-xs text-neutral-500">
                                    {conflict.resolution}
                                </p>
                            )}
                        </Link>
                    </motion.li>
                ))}
            </AnimatePresence>
        </ol>
    );
}
