"use client";

import { ConflictStatus } from "@repo/types";
import type { Conflict } from "@repo/types";
import { STATUS_LABEL, STATUS_ORDER, STATUS_STYLE, ago } from "../lib/display";

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
                    className={`rounded-full px-3 py-1 text-xs ${
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

export function ConflictList({
    conflicts,
    selectedId,
    onSelect,
}: {
    conflicts: Conflict[];
    selectedId: string | null;
    onSelect: (id: string) => void;
}) {
    if (!conflicts.length) {
        return (
            <p className="rounded-xl border border-neutral-200 bg-white p-4 text-sm text-neutral-400">
                No contradictions found. Two threads have to disagree first.
            </p>
        );
    }

    return (
        <ol className="flex flex-col gap-2">
            {conflicts.map((conflict) => (
                <li key={conflict.id}>
                    <button
                        onClick={() => onSelect(conflict.id)}
                        className={`w-full rounded-xl border p-4 text-left ${
                            selectedId === conflict.id
                                ? "border-neutral-900 bg-white"
                                : "border-neutral-200 bg-white hover:border-neutral-400"
                        }`}
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
                    </button>
                </li>
            ))}
        </ol>
    );
}
