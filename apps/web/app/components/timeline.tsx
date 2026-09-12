"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ActionType } from "@repo/types";
import type { TimelineEntry } from "@repo/types";
import { fullTime } from "../lib/display";

/** Rows added each time the reader reaches the bottom. */
const PAGE = 30;

/** Columns in the activity chart. */
const BUCKETS = 48;

const DOT: Record<ActionType, string> = {
    [ActionType.Acknowledge]: "bg-amber-500",
    [ActionType.Resolve]: "bg-emerald-500",
    [ActionType.Supersede]: "bg-violet-500",
    [ActionType.Note]: "bg-sky-500",
    [ActionType.Reframe]: "bg-neutral-300",
};

/**
 * The reducer writes `what` through describe() in packages/core/src/reducer.ts.
 * These patterns are its inverse, so the two must change together.
 *
 * A line matching nothing is a note, because a note is the only entry whose
 * text a person wrote rather than the reducer.
 */
function classify(what: string): ActionType {
    if (what === "acknowledged the conflict") return ActionType.Acknowledge;
    if (what === "rewrote the summaries") return ActionType.Reframe;
    if (what.startsWith("resolved: ")) return ActionType.Resolve;
    if (what.startsWith("kept side ")) return ActionType.Supersede;
    return ActionType.Note;
}

/** Index is identity: the timeline is append-only, so a row never moves. */
type Row = { entry: TimelineEntry; type: ActionType; index: number };

export function Timeline({ entries }: { entries: TimelineEntry[] }) {
    const [query, setQuery] = useState("");
    const [types, setTypes] = useState<ActionType[]>([]);
    const [people, setPeople] = useState<string[]>([]);
    const [visible, setVisible] = useState(PAGE);
    const [open, setOpen] = useState<number[]>([]);
    const [hovered, setHovered] = useState<number | null>(null);

    const scroller = useRef<HTMLDivElement>(null);
    const sentinel = useRef<HTMLDivElement>(null);

    /** Newest first, the way a log reads. */
    const rows = useMemo<Row[]>(
        () =>
            entries.map((entry, index) => ({ entry, type: classify(entry.what), index })).reverse(),
        [entries],
    );

    /** Both filter lists are built from the log itself, never hardcoded. */
    const typeOptions = useMemo(() => [...new Set(rows.map((row) => row.type))].sort(), [rows]);

    const peopleOptions = useMemo(
        () => [...new Set(rows.map((row) => row.entry.by))].sort(),
        [rows],
    );

    const filtered = useMemo(() => {
        const needle = query.trim().toLowerCase();
        return rows.filter(({ entry, type }) => {
            if (types.length > 0 && !types.includes(type)) return false;
            if (people.length > 0 && !people.includes(entry.by)) return false;
            if (!needle) return true;
            return [entry.what, entry.by, type].join(" ").toLowerCase().includes(needle);
        });
    }, [rows, query, types, people]);

    /** A new filter means a new list, so start the window over and scroll up. */
    useEffect(() => {
        setVisible(PAGE);
        scroller.current?.scrollTo({ top: 0 });
    }, [query, types, people]);

    useEffect(() => {
        const node = sentinel.current;
        if (!node) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    setVisible((shown) => Math.min(shown + PAGE, filtered.length));
                }
            },
            { root: scroller.current, rootMargin: "160px" },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [filtered.length]);

    const chart = useMemo(() => {
        if (filtered.length === 0) return null;
        const times = filtered.map((row) => new Date(row.entry.at).getTime());
        const start = Math.min(...times);
        const end = Math.max(...times);
        const width = Math.max((end - start) / BUCKETS, 1);
        const counts = new Array<number>(BUCKETS).fill(0);
        for (const time of times) {
            const slot = Math.min(BUCKETS - 1, Math.floor((time - start) / width));
            counts[slot] = (counts[slot] ?? 0) + 1;
        }
        return { counts, start, width, peak: Math.max(...counts) };
    }, [filtered]);

    const shown = filtered.slice(0, visible);
    const filtering = query.trim() !== "" || types.length > 0 || people.length > 0;

    function toggle<T>(list: T[], value: T, set: (next: T[]) => void) {
        set(list.includes(value) ? list.filter((item) => item !== value) : [...list, value]);
    }

    if (rows.length === 0) {
        return (
            <section className="flex flex-col gap-2 rounded-xl border border-neutral-200 bg-white p-5">
                <h2 className="text-sm font-medium text-neutral-500">Timeline</h2>
                <p className="text-sm text-neutral-400">nobody has looked at this yet</p>
            </section>
        );
    }

    return (
        <section className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-5">
            <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-sm font-medium text-neutral-500">Timeline</h2>
                <span className="text-xs text-neutral-400">
                    Displaying {filtered.length}
                    {filtering && ` of ${rows.length}`} event{filtered.length === 1 ? "" : "s"}
                </span>
            </div>

            {chart && filtered.length > 1 && (
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium text-neutral-500">Event details</span>
                    <div className="relative">
                        <div className="flex h-20 items-end gap-px border-b border-neutral-200">
                            {chart.counts.map((count, slot) => (
                                <div
                                    key={slot}
                                    onMouseEnter={() => setHovered(slot)}
                                    onMouseLeave={() => setHovered(null)}
                                    className="flex h-full flex-1 cursor-default items-end"
                                >
                                    <div
                                        style={{
                                            height: `${chart.peak ? (count / chart.peak) * 100 : 0}%`,
                                        }}
                                        className={`w-full rounded-t-sm ${
                                            count === 0
                                                ? "bg-transparent"
                                                : hovered === slot
                                                  ? "bg-neutral-900"
                                                  : "bg-neutral-400"
                                        }`}
                                    />
                                </div>
                            ))}
                        </div>

                        {hovered !== null && (
                            <div
                                style={{ left: `${((hovered + 0.5) / BUCKETS) * 100}%` }}
                                className="pointer-events-none absolute -top-1 z-10 -translate-x-1/2 -translate-y-full rounded-lg border border-neutral-200 bg-white px-3 py-2 shadow-sm"
                            >
                                <div className="text-[11px] whitespace-nowrap text-neutral-400">
                                    {fullTime(
                                        new Date(chart.start + hovered * chart.width).toISOString(),
                                    )}
                                </div>
                                <div className="text-sm whitespace-nowrap text-neutral-900">
                                    {chart.counts[hovered]} entries
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between pt-1 text-[11px] text-neutral-400">
                            <span>{fullTime(new Date(chart.start).toISOString())}</span>
                            <span>peak {chart.peak}</span>
                            <span>
                                {fullTime(
                                    new Date(chart.start + BUCKETS * chart.width).toISOString(),
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-wrap items-center gap-2">
                <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search the log"
                    className="min-w-0 max-w-xs flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm"
                />
                <Filter
                    label="Type"
                    options={typeOptions}
                    selected={types}
                    onToggle={(value) => toggle(types, value, setTypes)}
                    onClear={() => setTypes([])}
                />
                <Filter
                    label="Person"
                    options={peopleOptions}
                    selected={people}
                    onToggle={(value) => toggle(people, value, setPeople)}
                    onClear={() => setPeople([])}
                />
                {filtering && (
                    <button
                        onClick={() => {
                            setQuery("");
                            setTypes([]);
                            setPeople([]);
                        }}
                        className="shrink-0 rounded-lg border border-neutral-300 px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50"
                    >
                        Clear
                    </button>
                )}
            </div>

            <div
                ref={scroller}
                className="@container max-h-96 overflow-y-auto rounded-lg border border-neutral-200"
            >
                {/* Column headings only mean anything once the row is in columns. */}
                <div className="@lg:grid sticky top-0 z-10 hidden grid-cols-[7rem_10rem_1fr] gap-3 bg-neutral-50 px-3 py-2 text-[11px] tracking-wide text-neutral-400 uppercase">
                    <span>Type</span>
                    <span>Time</span>
                    <span>Message</span>
                </div>

                <ol>
                    {shown.map(({ entry, type, index }) => {
                        const expanded = open.includes(index);
                        return (
                            <li
                                key={index}
                                onClick={() => toggle(open, index, setOpen)}
                                className="@lg:grid @lg:grid-cols-[7rem_10rem_1fr] @lg:gap-3 flex cursor-default flex-col gap-1 border-t border-neutral-100 px-3 py-2 text-sm hover:bg-neutral-50"
                            >
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${DOT[type]}`}
                                    />
                                    <span className="text-neutral-700">{type}</span>
                                    {/* In one column the timestamp rides along with the type. */}
                                    <span className="@lg:hidden ml-auto text-xs text-neutral-400">
                                        {fullTime(entry.at)}
                                    </span>
                                </div>

                                <div className="@lg:block hidden whitespace-nowrap text-neutral-400">
                                    {fullTime(entry.at)}
                                </div>

                                <div className={`min-w-0 ${expanded ? "break-words" : "truncate"}`}>
                                    <span className="font-medium text-neutral-900">{entry.by}</span>
                                    {/* Who and what read as one sentence with nothing between
                                        them, and a note is free text that can start any way. */}
                                    <span className="px-1.5 text-neutral-300">·</span>
                                    <span className="text-neutral-700">{entry.what}</span>
                                </div>
                            </li>
                        );
                    })}
                </ol>

                <div ref={sentinel} className="px-3 py-3 text-center text-xs text-neutral-400">
                    {filtered.length === 0
                        ? "no events match"
                        : shown.length < filtered.length
                          ? `loading ${filtered.length - shown.length} more…`
                          : "end of log"}
                </div>
            </div>
        </section>
    );
}

/**
 * A dropdown, not a chip row. The options come from the log, so the list can be
 * long, and the toolbar has to stay one row however many there are.
 *
 * One option is no choice at all, so the control hides until there are two.
 */
function Filter<T extends string>({
    label,
    options,
    selected,
    onToggle,
    onClear,
}: {
    label: string;
    options: T[];
    selected: T[];
    onToggle: (value: T) => void;
    onClear: () => void;
}) {
    const [open, setOpen] = useState(false);
    const wrapper = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        function close(event: MouseEvent) {
            if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
        }
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, [open]);

    if (options.length < 2) return null;

    return (
        <div ref={wrapper} className="relative shrink-0">
            <button
                onClick={() => setOpen((was) => !was)}
                className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm ${
                    selected.length > 0
                        ? "border-neutral-900 bg-neutral-900 text-white"
                        : "border-neutral-300 text-neutral-600 hover:bg-neutral-50"
                }`}
            >
                {label}
                {selected.length > 0 && (
                    <span className="rounded-full bg-white/20 px-1.5 text-xs">
                        {selected.length}
                    </span>
                )}
                <span className="text-xs opacity-60">▾</span>
            </button>

            {open && (
                <div className="absolute right-0 z-20 mt-1 max-h-64 w-52 overflow-y-auto rounded-lg border border-neutral-200 bg-white p-1 shadow-lg">
                    {selected.length > 0 && (
                        <button
                            onClick={onClear}
                            className="w-full rounded-md px-2 py-1.5 text-left text-xs text-neutral-500 hover:bg-neutral-50"
                        >
                            Clear {label.toLowerCase()}
                        </button>
                    )}
                    {options.map((option) => (
                        <label
                            key={option}
                            className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-neutral-50"
                        >
                            <input
                                type="checkbox"
                                checked={selected.includes(option)}
                                onChange={() => onToggle(option)}
                            />
                            <span className="truncate text-neutral-700">{option}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}
