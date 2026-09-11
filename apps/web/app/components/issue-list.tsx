"use client";

import type { SharedObject, Status } from "@repo/types";
import { SEVERITY_DOT, STATUS_LABEL, STATUS_STYLE, SURFACE_LABEL, ago } from "../lib/display";

export function IssueList({
    issues,
    selectedId,
    onSelect,
    emptyNote,
}: {
    issues: SharedObject[];
    selectedId: string | null;
    onSelect: (id: string) => void;
    emptyNote: string;
}) {
    if (issues.length === 0) {
        return (
            <p className="rounded-xl border border-neutral-200 bg-white p-6 text-sm text-neutral-400">
                {emptyNote}
            </p>
        );
    }

    return (
        <ol className="flex flex-col gap-2">
            {issues.map((issue) => (
                <li key={issue.id}>
                    <IssueRow
                        issue={issue}
                        selected={issue.id === selectedId}
                        onSelect={() => onSelect(issue.id)}
                    />
                </li>
            ))}
        </ol>
    );
}

function IssueRow({
    issue,
    selected,
    onSelect,
}: {
    issue: SharedObject;
    selected: boolean;
    onSelect: () => void;
}) {
    const { facts } = issue;
    const owner = facts.acknowledgedBy;

    return (
        <button
            onClick={onSelect}
            aria-current={selected}
            className={`w-full rounded-xl border bg-white p-4 text-left transition-colors ${
                selected ? "border-neutral-900" : "border-neutral-200 hover:border-neutral-400"
            }`}
        >
            <div className="flex items-start gap-3">
                <span
                    aria-hidden
                    className={`mt-1.5 size-2 shrink-0 rounded-full ${SEVERITY_DOT[facts.severity]}`}
                />
                <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 text-sm text-neutral-900">{facts.what}</p>
                    <p className="mt-1.5 truncate text-xs text-neutral-500">
                        {issue.raisedBy} via {SURFACE_LABEL[issue.raisedOn]} ·{" "}
                        {ago(issue.createdAt)}
                        {facts.affected > 0 && ` · ${facts.affected} affected`}
                        {owner && ` · ${owner} owns it`}
                    </p>
                </div>
                <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${STATUS_STYLE[facts.status]}`}
                >
                    {STATUS_LABEL[facts.status]}
                </span>
            </div>
        </button>
    );
}

export function StatusFilter({
    counts,
    total,
    active,
    onChange,
}: {
    counts: Record<Status, number>;
    total: number;
    active: Status | "all";
    onChange: (next: Status | "all") => void;
}) {
    const chips: { key: Status | "all"; label: string; count: number }[] = [
        { key: "all", label: "All", count: total },
        ...(Object.keys(counts) as Status[]).map((status) => ({
            key: status,
            label: STATUS_LABEL[status],
            count: counts[status],
        })),
    ];

    return (
        <div className="flex flex-wrap gap-2">
            {chips.map((chip) => (
                <button
                    key={chip.key}
                    onClick={() => onChange(chip.key)}
                    className={`rounded-full border px-3 py-1 text-xs ${
                        active === chip.key
                            ? "border-neutral-900 bg-neutral-900 text-white"
                            : "border-neutral-300 bg-white text-neutral-600 hover:border-neutral-500"
                    }`}
                >
                    {chip.label}
                    <span className={active === chip.key ? "opacity-70" : "text-neutral-400"}>
                        {" "}
                        {chip.count}
                    </span>
                </button>
            ))}
        </div>
    );
}
