"use client";

import { useEffect, useMemo, useState } from "react";
import { Audience, Status } from "@repo/types";
import type { Action, SharedObject } from "@repo/types";
import { IssueList, StatusFilter } from "./components/issue-list";
import { IssueDetail } from "./components/issue-detail";
import { STATUS_ORDER, haystack } from "./lib/display";

const SERVER = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:5101";

type Draft<T> = T extends unknown ? Omit<T, "by"> : never;
type Link = "connecting" | "live" | "dropped";

export default function Page() {
    const [issues, setIssues] = useState<SharedObject[]>([]);
    const [link, setLink] = useState<Link>("connecting");
    const [selected, setSelected] = useState<string | null>(null);
    const [status, setStatus] = useState<Status | "all">("all");
    const [query, setQuery] = useState("");
    const [name, setName] = useState("");
    const [report, setReport] = useState("");
    const [thinking, setThinking] = useState(false);

    useEffect(() => {
        setName(localStorage.getItem("name") ?? "");
        const source = new EventSource(`${SERVER}/stream`);
        source.onopen = () => setLink("live");
        source.onerror = () => setLink("dropped");
        source.onmessage = (event) => {
            setLink("live");
            setIssues(JSON.parse(event.data) as SharedObject[]);
        };
        return () => source.close();
    }, []);

    const counts = useMemo(() => {
        const tally = Object.fromEntries(STATUS_ORDER.map((key) => [key, 0])) as Record<
            Status,
            number
        >;
        for (const issue of issues) tally[issue.facts.status] += 1;
        return tally;
    }, [issues]);

    const visible = useMemo(() => {
        const needle = query.trim().toLowerCase();
        return issues.filter((issue) => {
            if (status !== "all" && issue.facts.status !== status) return false;
            return !needle || haystack(issue).includes(needle);
        });
    }, [issues, status, query]);

    const issue = useMemo(
        () => visible.find((candidate) => candidate.id === selected) ?? visible[0] ?? null,
        [visible, selected],
    );

    function rename(value: string) {
        setName(value);
        localStorage.setItem("name", value);
    }

    async function sendReport() {
        if (!report.trim()) return;
        setThinking(true);
        try {
            await fetch(`${SERVER}/report`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: report, from: name || Audience.Customer }),
            });
            setReport("");
        } finally {
            setThinking(false);
        }
    }

    async function send(action: Draft<Action>) {
        if (!issue) return;
        await fetch(`${SERVER}/issues/${issue.id}/action`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...action, by: name || "web" }),
        });
    }

    return (
        <main className="mx-auto flex max-w-6xl flex-col gap-5 p-6 sm:p-8">
            <header className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-medium">Issues</h1>
                    <p className="flex items-center gap-2 text-sm text-neutral-500">
                        <Link state={link} />
                        {issues.length} in the shared database, every surface
                    </p>
                </div>
                <input
                    value={name}
                    onChange={(event) => rename(event.target.value)}
                    placeholder="your name"
                    className="w-40 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm"
                />
            </header>

            <section className="flex flex-col gap-3 rounded-xl border border-dashed border-neutral-300 p-4">
                <div className="flex flex-col gap-2 sm:flex-row">
                    <input
                        value={report}
                        onChange={(event) => setReport(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") sendReport();
                        }}
                        placeholder="paste what the customer actually wrote, in their words"
                        className="flex-1 rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm"
                    />
                    <button
                        onClick={sendReport}
                        disabled={thinking || !report.trim()}
                        className="rounded-lg bg-neutral-900 px-4 py-2 text-sm text-white disabled:opacity-40"
                    >
                        {thinking ? "reading…" : "Hand to agent"}
                    </button>
                </div>
            </section>

            <div className="flex flex-wrap items-center justify-between gap-3">
                <StatusFilter
                    counts={counts}
                    total={issues.length}
                    active={status}
                    onChange={setStatus}
                />
                <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="search text, reporter, owner"
                    className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm sm:w-64"
                />
            </div>

            <div className="grid gap-5 lg:grid-cols-[23rem_1fr]">
                <IssueList
                    issues={visible}
                    selectedId={issue?.id ?? null}
                    onSelect={setSelected}
                    emptyNote={
                        issues.length === 0
                            ? "Nothing raised yet. Paste a report above, or mention the bot in Slack or Telegram."
                            : "No issue matches this filter."
                    }
                />
                {issue ? (
                    <IssueDetail issue={issue} onAction={send} />
                ) : (
                    <p className="rounded-xl border border-neutral-200 bg-white p-6 text-sm text-neutral-400">
                        Pick an issue to see its facts, framings and timeline.
                    </p>
                )}
            </div>
        </main>
    );
}

/** The stream is the only thing that keeps three machines honest, so name its state. */
function Link({ state }: { state: Link }) {
    const dot = {
        connecting: "bg-amber-400",
        live: "bg-emerald-500",
        dropped: "bg-red-500",
    }[state];
    const label = { connecting: "connecting", live: "live", dropped: "server offline" }[state];

    return (
        <span className="flex items-center gap-1.5 text-xs text-neutral-500">
            <span className={`size-2 rounded-full ${dot}`} aria-hidden />
            {label} ·
        </span>
    );
}
