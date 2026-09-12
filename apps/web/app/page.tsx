"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ConflictStatus } from "@repo/types";
import { ConflictList, StatusFilter } from "./components/conflict-list";
import { ConflictGrid } from "./components/conflict-grid";
import { DecisionList } from "./components/decision-list";
import { RegistryHeader } from "./components/registry-header";
import { STATUS_ORDER, haystack } from "./lib/display";
import {
    ConflictGridSkeleton,
    ConflictListSkeleton,
    DecisionListSkeleton,
} from "./components/skeleton";
import { EASE, fade } from "./lib/motion";
import { useRegistry } from "./lib/use-registry";

type View = "cards" | "list";

/**
 * The index. It answers one question — what is unresolved — and then hands off.
 *
 * A conflict is read on its own page rather than in a panel beside the list,
 * because the thing being read is a shared object: it has to have an address
 * that can be pasted back into the thread it came from.
 */
export default function Page() {
    const { conflicts, decisions, link, loading, name, rename } = useRegistry();
    const [tab, setTab] = useState<"conflicts" | "decisions">("conflicts");
    const [view, setView] = useState<View>("cards");
    const [status, setStatus] = useState<ConflictStatus | "all">("all");
    const [query, setQuery] = useState("");

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

    return (
        <main className="mx-auto flex max-w-6xl flex-col gap-6 p-4 sm:p-8">
            <RegistryHeader link={link} name={name} onRename={rename} />

            <div className="flex flex-wrap items-center gap-1">
                <Tab active={tab === "conflicts"} onClick={() => setTab("conflicts")}>
                    Contradictions {conflicts.length}
                </Tab>
                <Tab active={tab === "decisions"} onClick={() => setTab("decisions")}>
                    Recorded decisions {decisions.length}
                </Tab>

                {tab === "conflicts" && (
                    <div className="ml-auto flex gap-1">
                        <ViewButton active={view === "cards"} onClick={() => setView("cards")}>
                            Cards
                        </ViewButton>
                        <ViewButton active={view === "list"} onClick={() => setView("list")}>
                            List
                        </ViewButton>
                    </div>
                )}
            </div>

            <AnimatePresence mode="wait" initial={false}>
                {tab === "decisions" ? (
                    <motion.div key="decisions" {...fade} transition={EASE}>
                        {loading ? (
                            <DecisionListSkeleton />
                        ) : (
                            <DecisionList decisions={decisions} />
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="conflicts"
                        className="flex flex-col gap-6"
                        {...fade}
                        transition={EASE}
                    >
                        <div className="flex flex-wrap items-center gap-3">
                            <StatusFilter value={status} counts={counts} onChange={setStatus} />
                            <input
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="search threads, subsystems, people"
                                className="min-w-56 flex-1 rounded-lg border border-neutral-300 px-3 py-1.5 text-sm"
                            />
                        </div>

                        {/* The two views hold the same rows in a different shape, so they
                            swap in place rather than crossing over one another. */}
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div key={view} {...fade} transition={EASE}>
                                {loading ? (
                                    view === "cards" ? (
                                        <ConflictGridSkeleton />
                                    ) : (
                                        <ConflictListSkeleton />
                                    )
                                ) : view === "cards" ? (
                                    <ConflictGrid conflicts={visible} />
                                ) : (
                                    <ConflictList conflicts={visible} />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
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
            className={`cursor-pointer rounded-lg px-3 py-1.5 text-sm ${
                active
                    ? "bg-neutral-900 text-white"
                    : "border border-neutral-300 text-neutral-600 hover:bg-neutral-50"
            }`}
        >
            {children}
        </button>
    );
}

function ViewButton({
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
            className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs ${
                active
                    ? "border border-neutral-900 text-neutral-900"
                    : "border border-neutral-200 text-neutral-500 hover:bg-neutral-50"
            }`}
        >
            {children}
        </button>
    );
}
