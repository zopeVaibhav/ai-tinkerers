"use client";

import { useEffect, useMemo, useState } from "react";
import { ConflictStatus } from "@repo/types";
import type { Action, Conflict, Decision } from "@repo/types";
import { ConflictList, StatusFilter } from "./components/conflict-list";
import { ConflictDetail } from "./components/conflict-detail";
import { DecisionList } from "./components/decision-list";
import { STATUS_ORDER, haystack } from "./lib/display";

const SERVER = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:5101";

type Draft<T> = T extends unknown ? Omit<T, "by"> : never;
type Link = "connecting" | "live" | "dropped";

export default function Page() {
    const [conflicts, setConflicts] = useState<Conflict[]>([]);
    const [decisions, setDecisions] = useState<Decision[]>([]);
    const [tab, setTab] = useState<"conflicts" | "decisions">("conflicts");
    const [link, setLink] = useState<Link>("connecting");
    const [selected, setSelected] = useState<string | null>(null);
    const [status, setStatus] = useState<ConflictStatus | "all">("all");
    const [query, setQuery] = useState("");
    const [name, setName] = useState("");

    useEffect(() => {
        setName(localStorage.getItem("name") ?? "");
        const source = new EventSource(`${SERVER}/stream`);
        source.onopen = () => setLink("live");
        source.onerror = () => setLink("dropped");
        source.onmessage = (event) => {
            setLink("live");
            const payload = JSON.parse(event.data) as {
                conflicts: Conflict[];
                decisions: Decision[];
            };
            setConflicts(payload.conflicts ?? []);
            setDecisions(payload.decisions ?? []);
        };
        return () => source.close();
    }, []);

    const counts = useMemo(() => {
        const tally: Record<string, number> = { all: conflicts.length };
        for (const value of STATUS_ORDER) {
            tally[value] = conflicts.filter((one) => one.status === value).length;
        }
        return tally;
    }, [conflicts]);

    const visible = useMemo(() => {
        const needle = query.trim().toLowerCase();
        return conflicts.filter((one) => {
            if (status !== "all" && one.status !== status) return false;
            if (needle && !haystack(one).includes(needle)) return false;
            return true;
        });
    }, [conflicts, status, query]);

    const conflict = useMemo(
        () => visible.find((one) => one.id === selected) ?? visible[0] ?? null,
        [visible, selected],
    );

    function rename(value: string) {
        setName(value);
        localStorage.setItem("name", value);
    }

    async function act(action: Draft<Action>) {
        if (!conflict) return;
        await fetch(`${SERVER}/conflicts/${conflict.id}/action`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...action, by: name || "web" }),
        });
    }

    return (
        <main className="mx-auto flex max-w-6xl flex-col gap-6 p-8">
            <header className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-medium">Contradiction registry</h1>
                    <p className="text-sm text-neutral-500">
                        Decisions that cannot both be true, found across threads nobody shares.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span
                        className={`text-xs ${
                            link === "live"
                                ? "text-emerald-600"
                                : link === "dropped"
                                  ? "text-red-600"
                                  : "text-neutral-400"
                        }`}
                    >
                        {link}
                    </span>
                    <input
                        value={name}
                        onChange={(event) => rename(event.target.value)}
                        placeholder="your name"
                        className="w-36 rounded-lg border border-neutral-300 px-3 py-1.5 text-sm"
                    />
                </div>
            </header>

            <div className="flex gap-1">
                <Tab active={tab === "conflicts"} onClick={() => setTab("conflicts")}>
                    Contradictions {conflicts.length}
                </Tab>
                <Tab active={tab === "decisions"} onClick={() => setTab("decisions")}>
                    Recorded decisions {decisions.length}
                </Tab>
            </div>

            {tab === "decisions" ? (
                <DecisionList decisions={decisions} />
            ) : (
                <>
                    <div className="flex flex-wrap items-center gap-3">
                        <StatusFilter value={status} counts={counts} onChange={setStatus} />
                        <input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="search threads, subsystems, people"
                            className="min-w-56 flex-1 rounded-lg border border-neutral-300 px-3 py-1.5 text-sm"
                        />
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[22rem_1fr]">
                        <ConflictList
                            conflicts={visible}
                            selectedId={conflict?.id ?? null}
                            onSelect={setSelected}
                        />
                        {conflict && <ConflictDetail conflict={conflict} onAct={act} />}
                    </div>
                </>
            )}
        </main>
    );
}

function Tab({
    active,
    onClick,
    children,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            onClick={onClick}
            className={`rounded-lg px-3 py-1.5 text-sm ${
                active
                    ? "bg-neutral-900 text-white"
                    : "border border-neutral-300 text-neutral-600 hover:bg-neutral-50"
            }`}
        >
            {children}
        </button>
    );
}
