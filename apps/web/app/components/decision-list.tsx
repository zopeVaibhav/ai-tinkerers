"use client";

import type { Decision } from "@repo/types";
import { AnimatePresence, motion } from "motion/react";
import { SURFACE_LABEL, ago } from "../lib/display";
import { listItem, stagger } from "../lib/motion";

/**
 * The other half of the registry. A decision on its own is not news — this is
 * what each room currently stands behind, and what the next decision gets
 * compared against.
 */
export function DecisionList({ decisions }: { decisions: Decision[] }) {
    if (!decisions.length) {
        return (
            <p className="rounded-xl border border-neutral-200 bg-white p-4 text-sm text-neutral-400">
                Nothing recorded yet. The agent only writes a decision down when a room settles on a
                rule.
            </p>
        );
    }

    return (
        <ol className="flex flex-col gap-2">
            {/* Motion writes opacity inline, where it outranks `opacity-60`, so a superseded
                row has to settle on the dimmed value itself rather than on 1. */}
            <AnimatePresence>
                {decisions.map((decision, index) => (
                    <motion.li
                        key={decision.id}
                        {...listItem}
                        animate={{
                            ...listItem.animate,
                            opacity: decision.supersededById ? 0.6 : 1,
                        }}
                        transition={stagger(index)}
                        className={`rounded-xl border p-4 ${
                            decision.supersededById
                                ? "border-neutral-200 bg-neutral-50 opacity-60"
                                : "border-neutral-200 bg-white"
                        }`}
                    >
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <span className="font-medium">{decision.threadName}</span>
                            <span className="text-xs text-neutral-400">
                                {decision.decidedBy} · {SURFACE_LABEL[decision.surface]} ·{" "}
                                {ago(decision.createdAt)}
                            </span>
                        </div>

                        <p className="mt-2 text-sm">
                            <span className="text-neutral-500">{decision.subsystem}</span>
                            <span className="text-neutral-400"> on </span>
                            <code className="text-xs">{decision.condition}</code>
                            <span className="text-neutral-400"> → </span>
                            <code className="text-xs font-medium">{decision.action}</code>
                            {decision.supersededById && (
                                <span className="ml-2 text-xs text-neutral-400">superseded</span>
                            )}
                        </p>

                        <p className="mt-1 text-sm text-neutral-600">
                            &ldquo;{decision.rawText}&rdquo;
                        </p>
                    </motion.li>
                ))}
            </AnimatePresence>
        </ol>
    );
}
