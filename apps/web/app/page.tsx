"use client";

import { useEffect, useRef, useState } from "react";
import { ActionType, Audience, Severity, Status, Surface } from "@repo/types";
import type { Action, SharedObject } from "@repo/types";

const SERVER = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:5101";

/** Omit distributes over the union, so each variant keeps its own fields. */
type Draft<T> = T extends unknown ? Omit<T, "by"> : never;

const STATUS_LABEL: Record<Status, string> = {
    [Status.Triage]: "Triage",
    [Status.AwaitingApproval]: "Waiting for approval",
    [Status.Approved]: "Approved",
    [Status.Resolved]: "Resolved",
};

export default function Page() {
    const [object, setObject] = useState<SharedObject | null>(null);
    const [name, setName] = useState("");
    const [what, setWhat] = useState("");
    const [severity, setSeverity] = useState<Severity>(Severity.Low);
    const [affected, setAffected] = useState(0);
    const [fix, setFix] = useState("");
    const [note, setNote] = useState("");
    const [report, setReport] = useState("");
    const [thinking, setThinking] = useState(false);
    const seeded = useRef(false);

    useEffect(() => {
        setName(localStorage.getItem("name") ?? Surface.Web);
        const source = new EventSource(`${SERVER}/stream`);
        source.onmessage = (event) => {
            const next = JSON.parse(event.data) as SharedObject;
            setObject(next);
            if (!seeded.current) {
                seeded.current = true;
                setWhat(next.facts.what);
                setSeverity(next.facts.severity);
                setAffected(next.facts.affected);
            }
        };
        return () => source.close();
    }, []);

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
                body: JSON.stringify({ text: report, from: Audience.Customer }),
            });
            setReport("");
        } finally {
            setThinking(false);
        }
    }

    async function send(action: Draft<Action>) {
        await fetch(`${SERVER}/action`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...action, by: name || Surface.Web }),
        });
    }

    const facts = object?.facts;

    return (
        <main className="mx-auto flex max-w-3xl flex-col gap-8 p-10">
            <header className="flex items-baseline justify-between gap-4">
                <h1 className="text-2xl font-medium">Customer escalation</h1>
                <input
                    value={name}
                    onChange={(event) => rename(event.target.value)}
                    placeholder="your name"
                    className="w-40 rounded-lg border border-neutral-300 px-3 py-1.5 text-sm"
                />
            </header>

            {!facts ? (
                <p className="text-neutral-500">connecting…</p>
            ) : (
                <>
                    <section className="flex flex-wrap items-center gap-3 text-sm">
                        <span className="rounded-full bg-neutral-900 px-3 py-1 text-white">
                            {STATUS_LABEL[facts.status]}
                        </span>
                        <span className="text-neutral-500">
                            owner {facts.acknowledgedBy ?? "unassigned"} · v{object.version}
                        </span>
                    </section>

                    <section className="flex flex-col gap-3 rounded-xl border border-dashed border-neutral-300 p-5">
                        <h2 className="text-sm font-medium text-neutral-500">
                            Inbound customer message
                        </h2>
                        <textarea
                            value={report}
                            onChange={(event) => setReport(event.target.value)}
                            rows={3}
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

                    <section className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-5">
                        <h2 className="text-sm font-medium text-neutral-500">Situation</h2>
                        <textarea
                            value={what}
                            onChange={(event) => setWhat(event.target.value)}
                            rows={2}
                            className="rounded-lg border border-neutral-300 px-3 py-2"
                        />
                        <div className="flex flex-wrap items-center gap-3">
                            <select
                                value={severity}
                                onChange={(event) => setSeverity(event.target.value as Severity)}
                                className="rounded-lg border border-neutral-300 px-3 py-2"
                            >
                                {Object.values(Severity).map((level) => (
                                    <option key={level} value={level}>
                                        {level}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="number"
                                value={affected}
                                onChange={(event) => setAffected(Number(event.target.value))}
                                className="w-28 rounded-lg border border-neutral-300 px-3 py-2"
                            />
                            <span className="text-sm text-neutral-500">users affected</span>
                            <button
                                onClick={() =>
                                    send({ type: ActionType.Intake, what, severity, affected })
                                }
                                className="ml-auto rounded-lg bg-neutral-900 px-4 py-2 text-sm text-white"
                            >
                                Update situation
                            </button>
                        </div>
                    </section>

                    <section className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-5">
                        <h2 className="text-sm font-medium text-neutral-500">Proposed fix</h2>
                        {facts.proposedFix ? (
                            <p className="text-neutral-900">{facts.proposedFix}</p>
                        ) : (
                            <div className="flex gap-3">
                                <input
                                    value={fix}
                                    onChange={(event) => setFix(event.target.value)}
                                    placeholder="what is the fix?"
                                    className="flex-1 rounded-lg border border-neutral-300 px-3 py-2"
                                />
                                <button
                                    onClick={() => fix && send({ type: ActionType.Propose, fix })}
                                    className="rounded-lg bg-neutral-900 px-4 py-2 text-sm text-white"
                                >
                                    Propose
                                </button>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-2 pt-1">
                            {facts.status === Status.Triage && !facts.acknowledgedBy && (
                                <Btn onClick={() => send({ type: ActionType.Acknowledge })}>
                                    Take it
                                </Btn>
                            )}
                            {facts.status === Status.AwaitingApproval && (
                                <>
                                    <Btn onClick={() => send({ type: ActionType.Approve })}>
                                        Approve
                                    </Btn>
                                    <Btn
                                        onClick={() =>
                                            send({
                                                type: ActionType.Reject,
                                                reason: "rejected on web",
                                            })
                                        }
                                    >
                                        Reject
                                    </Btn>
                                </>
                            )}
                            {facts.status === Status.Approved && (
                                <Btn onClick={() => send({ type: ActionType.Resolve })}>
                                    Resolve
                                </Btn>
                            )}
                        </div>
                    </section>

                    {Object.keys(object.framings).length > 0 && (
                        <section className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-5">
                            <h2 className="text-sm font-medium text-neutral-500">
                                Same facts, three readers
                            </h2>
                            <div className="grid gap-3 sm:grid-cols-3">
                                {Object.values(Audience).map((audience) => (
                                    <div key={audience} className="flex flex-col gap-1">
                                        <span className="text-xs uppercase tracking-wide text-neutral-400">
                                            {audience}
                                        </span>
                                        <p className="text-sm text-neutral-700">
                                            {object.framings[audience] ?? "—"}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <section className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-5">
                        <h2 className="text-sm font-medium text-neutral-500">Timeline</h2>
                        <ol className="flex flex-col gap-1 text-sm">
                            {object.timeline.length === 0 && (
                                <li className="text-neutral-400">nothing yet</li>
                            )}
                            {object.timeline.map((entry, index) => (
                                <li key={index} className="text-neutral-700">
                                    <span className="text-neutral-400">
                                        {new Date(entry.at).toLocaleTimeString()}
                                    </span>{" "}
                                    <span className="font-medium">{entry.by}</span> {entry.what}
                                </li>
                            ))}
                        </ol>
                        <div className="flex gap-3">
                            <input
                                value={note}
                                onChange={(event) => setNote(event.target.value)}
                                placeholder="add a note"
                                className="flex-1 rounded-lg border border-neutral-300 px-3 py-2"
                            />
                            <button
                                onClick={() => {
                                    if (!note) return;
                                    void send({ type: ActionType.Note, text: note });
                                    setNote("");
                                }}
                                className="rounded-lg border border-neutral-300 px-4 py-2 text-sm"
                            >
                                Add
                            </button>
                        </div>
                    </section>
                </>
            )}
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
