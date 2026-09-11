"use client";

import { useEffect, useMemo, useState } from "react";
import { ActionType, Audience, Severity, Status } from "@repo/types";
import type { Action, SharedObject } from "@repo/types";

const SERVER = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:5101";

type Draft<T> = T extends unknown ? Omit<T, "by"> : never;

const STATUS_LABEL: Record<Status, string> = {
    [Status.Triage]: "Triage",
    [Status.AwaitingApproval]: "Waiting for approval",
    [Status.Approved]: "Approved",
    [Status.Resolved]: "Resolved",
};

const STATUS_STYLE: Record<Status, string> = {
    [Status.Triage]: "bg-neutral-200 text-neutral-800",
    [Status.AwaitingApproval]: "bg-amber-100 text-amber-900",
    [Status.Approved]: "bg-sky-100 text-sky-900",
    [Status.Resolved]: "bg-emerald-100 text-emerald-900",
};

const SEVERITY_STYLE: Record<Severity, string> = {
    [Severity.Low]: "text-neutral-500",
    [Severity.Medium]: "text-amber-700",
    [Severity.High]: "text-red-700",
};

export default function Page() {
    const [issues, setIssues] = useState<SharedObject[]>([]);
    const [selected, setSelected] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [report, setReport] = useState("");
    const [thinking, setThinking] = useState(false);
    const [history, setHistory] = useState<SharedObject[] | null>(null);
    const [at, setAt] = useState<number | null>(null);

    useEffect(() => {
        setName(localStorage.getItem("name") ?? "");
        const source = new EventSource(`${SERVER}/stream`);
        source.onmessage = (event) => setIssues(JSON.parse(event.data) as SharedObject[]);
        return () => source.close();
    }, []);

    const issue = useMemo(
        () => issues.find((candidate) => candidate.id === selected) ?? issues[0] ?? null,
        [issues, selected],
    );

    // Stepping through one issue's past says nothing about the next one.
    useEffect(() => {
        setHistory(null);
        setAt(null);
    }, [issue?.id]);

    async function openHistory() {
        if (!issue) return;
        const response = await fetch(`${SERVER}/issues/${issue.id}/history`);
        if (!response.ok) return;
        const versions = (await response.json()) as SharedObject[];
        setHistory(versions);
        setAt(versions.length - 1);
    }

    function rename(value: string) {
        setName(value);
        localStorage.setItem("name", value);
    }

    /**
     * The past is read-only. Nothing here writes, so a second person acting on
     * the live object never disturbs whoever is reading back through it.
     */
    const past = at !== null && history !== null && at < history.length - 1;
    const shown = at !== null && history !== null ? history[at] : issue;

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
        <main className="mx-auto flex max-w-6xl flex-col gap-6 p-8">
            <header className="flex items-baseline justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-medium">Issues</h1>
                    <p className="text-sm text-neutral-500">
                        {issues.length} open across Slack, Telegram and web
                    </p>
                </div>
                <input
                    value={name}
                    onChange={(event) => rename(event.target.value)}
                    placeholder="your name"
                    className="w-40 rounded-lg border border-neutral-300 px-3 py-1.5 text-sm"
                />
            </header>

            <section className="flex flex-col gap-3 rounded-xl border border-dashed border-neutral-300 p-5">
                <h2 className="text-sm font-medium text-neutral-500">Raise an issue</h2>
                <textarea
                    value={report}
                    onChange={(event) => setReport(event.target.value)}
                    rows={2}
                    placeholder="paste what the customer actually wrote, in their words"
                    className="rounded-lg border border-neutral-300 px-3 py-2"
                />
                <button
                    onClick={sendReport}
                    disabled={thinking}
                    className="self-start rounded-lg bg-neutral-900 px-4 py-2 text-sm text-white disabled:opacity-50"
                >
                    {thinking ? "reading…" : "Hand to agent"}
                </button>
            </section>

            <div className="grid gap-6 lg:grid-cols-[22rem_1fr]">
                <ol className="flex flex-col gap-2">
                    {issues.length === 0 && (
                        <li className="rounded-xl border border-neutral-200 bg-white p-4 text-sm text-neutral-400">
                            nothing raised yet
                        </li>
                    )}
                    {issues.map((candidate) => (
                        <li key={candidate.id}>
                            <button
                                onClick={() => setSelected(candidate.id)}
                                className={`w-full rounded-xl border p-4 text-left ${
                                    issue?.id === candidate.id
                                        ? "border-neutral-900 bg-white"
                                        : "border-neutral-200 bg-white hover:border-neutral-400"
                                }`}
                            >
                                <div className="flex items-center justify-between gap-2">
                                    <span
                                        className={`rounded-full px-2 py-0.5 text-xs ${STATUS_STYLE[candidate.facts.status]}`}
                                    >
                                        {STATUS_LABEL[candidate.facts.status]}
                                    </span>
                                    <span
                                        className={`text-xs uppercase ${SEVERITY_STYLE[candidate.facts.severity]}`}
                                    >
                                        {candidate.facts.severity}
                                    </span>
                                </div>
                                <p className="mt-2 line-clamp-2 text-sm text-neutral-800">
                                    {candidate.facts.what}
                                </p>
                                <p className="mt-2 text-xs text-neutral-500">
                                    {candidate.raisedBy} via {candidate.raisedOn} ·{" "}
                                    {new Date(candidate.createdAt).toLocaleTimeString()} ·{" "}
                                    {candidate.facts.affected} affected
                                </p>
                            </button>
                        </li>
                    ))}
                </ol>

                {issue && shown && (
                    <div className="flex flex-col gap-5">
                        <section className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-5">
                            <div className="flex flex-wrap items-center gap-3 text-sm">
                                <span
                                    className={`rounded-full px-3 py-1 ${STATUS_STYLE[shown.facts.status]}`}
                                >
                                    {STATUS_LABEL[shown.facts.status]}
                                </span>
                                <span className="text-neutral-500">
                                    raised by {shown.raisedBy} via {shown.raisedOn} · owner{" "}
                                    {shown.facts.acknowledgedBy ?? "unassigned"} · v{shown.version}
                                </span>
                                {history === null ? (
                                    <button
                                        onClick={openHistory}
                                        className="rounded-lg border border-neutral-300 px-3 py-1 text-xs hover:bg-neutral-50"
                                    >
                                        History
                                    </button>
                                ) : (
                                    <span className="flex items-center gap-1">
                                        <button
                                            onClick={() => setAt((index) => Math.max(0, (index ?? 0) - 1))}
                                            disabled={at === 0}
                                            className="rounded-lg border border-neutral-300 px-2 py-1 text-xs disabled:opacity-30"
                                        >
                                            ◀
                                        </button>
                                        <button
                                            onClick={() =>
                                                setAt((index) =>
                                                    Math.min(history.length - 1, (index ?? 0) + 1),
                                                )
                                            }
                                            disabled={at === history.length - 1}
                                            className="rounded-lg border border-neutral-300 px-2 py-1 text-xs disabled:opacity-30"
                                        >
                                            ▶
                                        </button>
                                        <button
                                            onClick={() => {
                                                setHistory(null);
                                                setAt(null);
                                            }}
                                            className="rounded-lg border border-neutral-300 px-3 py-1 text-xs hover:bg-neutral-50"
                                        >
                                            Back to live
                                        </button>
                                    </span>
                                )}
                            </div>
                            {past && (
                                <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900">
                                    Reading v{shown.version} of {history.length - 1}. The past is
                                    read-only — the live object is still moving without you.
                                </p>
                            )}
                            <p className="text-lg">{shown.facts.what}</p>

                            {shown.facts.proposedFix && (
                                <p className="rounded-lg bg-neutral-50 p-3 text-sm">
                                    <span className="text-neutral-500">Proposed fix — </span>
                                    {shown.facts.proposedFix}
                                    {shown.facts.approvedBy && (
                                        <span className="text-neutral-500">
                                            {" "}
                                            (approved by {shown.facts.approvedBy})
                                        </span>
                                    )}
                                </p>
                            )}

                            <div className={`flex flex-wrap gap-2 ${past ? "hidden" : ""}`}>
                                {shown.facts.status === Status.Triage && (
                                    <>
                                        {!shown.facts.acknowledgedBy && (
                                            <Btn
                                                onClick={() =>
                                                    send({ type: ActionType.Acknowledge })
                                                }
                                            >
                                                Take it
                                            </Btn>
                                        )}
                                        <Prompt
                                            label="Propose fix"
                                            placeholder="what is the fix?"
                                            onSubmit={(value) =>
                                                send({ type: ActionType.Propose, fix: value })
                                            }
                                        />
                                    </>
                                )}
                                {shown.facts.status === Status.AwaitingApproval && (
                                    <>
                                        <Btn onClick={() => send({ type: ActionType.Approve })}>
                                            Approve
                                        </Btn>
                                        <Prompt
                                            label="Reject"
                                            placeholder="why?"
                                            onSubmit={(value) =>
                                                send({ type: ActionType.Reject, reason: value })
                                            }
                                        />
                                    </>
                                )}
                                {shown.facts.status === Status.Approved && (
                                    <Btn onClick={() => send({ type: ActionType.Resolve })}>
                                        Resolve
                                    </Btn>
                                )}
                                <Prompt
                                    label="Add note"
                                    placeholder="note"
                                    onSubmit={(value) =>
                                        send({ type: ActionType.Note, text: value })
                                    }
                                />
                            </div>
                        </section>

                        {Object.keys(shown.framings).length > 0 && (
                            <section className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-5">
                                <h2 className="text-sm font-medium text-neutral-500">
                                    Same facts, three readers
                                </h2>
                                <div className="grid gap-4 sm:grid-cols-3">
                                    {Object.values(Audience).map((audience) => (
                                        <div key={audience} className="flex flex-col gap-1">
                                            <span className="text-xs uppercase tracking-wide text-neutral-400">
                                                {audience}
                                            </span>
                                            <p className="text-sm text-neutral-700">
                                                {shown.framings[audience] ?? "—"}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        <section className="flex flex-col gap-2 rounded-xl border border-neutral-200 bg-white p-5">
                            <h2 className="text-sm font-medium text-neutral-500">Timeline</h2>
                            <ol className="flex flex-col gap-1 text-sm">
                                {shown.timeline.map((entry, index) => (
                                    <li key={index} className="text-neutral-700">
                                        <span className="text-neutral-400">
                                            {new Date(entry.at).toLocaleTimeString()}
                                        </span>{" "}
                                        <span className="font-medium">{entry.by}</span> {entry.what}
                                    </li>
                                ))}
                            </ol>
                        </section>
                    </div>
                )}
            </div>
        </main>
    );
}

function Btn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
    return (
        <button
            onClick={onClick}
            className="rounded-lg border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-50"
        >
            {children}
        </button>
    );
}

function Prompt({
    label,
    placeholder,
    onSubmit,
}: {
    label: string;
    placeholder: string;
    onSubmit: (value: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    if (!open) return <Btn onClick={() => setOpen(true)}>{label}</Btn>;

    return (
        <span className="flex gap-2">
            <input
                autoFocus
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder={placeholder}
                className="rounded-lg border border-neutral-300 px-3 py-2 text-sm"
            />
            <button
                onClick={() => {
                    if (!value.trim()) return;
                    onSubmit(value.trim());
                    setValue("");
                    setOpen(false);
                }}
                className="rounded-lg bg-neutral-900 px-3 py-2 text-sm text-white"
            >
                {label}
            </button>
        </span>
    );
}
