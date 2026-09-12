"use client";

import { ConflictStatus } from "@repo/types";
import type { Conflict } from "@repo/types";
import { STATUS_LABEL, STATUS_STYLE } from "../lib/display";

/**
 * The conflict, small enough to sit inside a chat turn. Same object, same
 * controls as the panel — the agent hands back the real thing, not a summary.
 */
export function ConflictCard({
    conflict,
    onAcknowledge,
}: {
    conflict: Conflict;
    onAcknowledge: () => void;
}) {
    return (
        <div className="my-2 flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-4">
            <div className="flex items-center justify-between gap-2">
                <span
                    className={`rounded-full px-2 py-0.5 text-xs ${STATUS_STYLE[conflict.status]}`}
                >
                    {STATUS_LABEL[conflict.status]}
                </span>
                <span className="text-xs text-neutral-400">
                    {conflict.a.subsystem} · {conflict.a.condition}
                </span>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
                {[conflict.a, conflict.b].map((side) => (
                    <div key={side.id} className="rounded-lg border border-neutral-200 p-3">
                        <p className="text-sm font-medium">{side.threadName}</p>
                        <code className="text-xs">{side.action}</code>
                        <p className="mt-1 text-xs text-neutral-500">{side.decidedBy}</p>
                    </div>
                ))}
            </div>

            {conflict.resolution && (
                <p className="rounded-lg bg-neutral-50 p-3 text-xs text-neutral-600">
                    <span className="text-neutral-400">Resolution — </span>
                    {conflict.resolution}
                </p>
            )}

            {conflict.status === ConflictStatus.Open && (
                <button
                    onClick={onAcknowledge}
                    className="self-start rounded-lg bg-neutral-900 px-3 py-1.5 text-xs text-white"
                >
                    Acknowledge
                </button>
            )}
        </div>
    );
}
