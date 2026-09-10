"use client";

import { useEffect, useRef, useState } from "react";
import type { Action, SharedObject, Severity } from "@repo/types";

const SERVER = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:5101";

/** Omit distributes over the union, so each variant keeps its own fields. */
type Draft<T> = T extends unknown ? Omit<T, "by"> : never;

const STATUS_LABEL: Record<SharedObject["facts"]["status"], string> = {
    triage: "Triage",
    awaiting_approval: "Waiting for approval",
    approved: "Approved",
    resolved: "Resolved",
};

export default function Page() {
    const [object, setObject] = useState<SharedObject | null>(null);
    const [name, setName] = useState("");
    const [what, setWhat] = useState("");
    const [severity, setSeverity] = useState<Severity>("low");
    const [affected, setAffected] = useState(0);
    const [fix, setFix] = useState("");
    const [note, setNote] = useState("");
    const seeded = useRef(false);

    useEffect(() => {
        setName(localStorage.getItem("name") ?? "web");
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

    async function send(action: Draft<Action>) {
        await fetch(`${SERVER}/action`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...action, by: name || "web" }),
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
                                <option value="low">low</option>
                                <option value="medium">medium</option>
                                <option value="high">high</option>
                            </select>
                            <input
                                type="number"
                                value={affected}
                                onChange={(event) => setAffected(Number(event.target.value))}
                                className="w-28 rounded-lg border border-neutral-300 px-3 py-2"
                            />
                            <span className="text-sm text-neutral-500">users affected</span>
                            <button
                                onClick={() => send({ type: "intake", what, severity, affected })}
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
                                    onClick={() => fix && send({ type: "propose", fix })}
                                    className="rounded-lg bg-neutral-900 px-4 py-2 text-sm text-white"
                                >
                                    Propose
                                </button>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-2 pt-1">
                            {facts.status === "triage" && !facts.acknowledgedBy && (
                                <Btn onClick={() => send({ type: "acknowledge" })}>Take it</Btn>
                            )}
                            {facts.status === "awaiting_approval" && (
                                <>
                                    <Btn onClick={() => send({ type: "approve" })}>Approve</Btn>
                                    <Btn
                                        onClick={() =>
                                            send({ type: "reject", reason: "rejected on web" })
                                        }
                                    >
                                        Reject
                                    </Btn>
                                </>
                            )}
                            {facts.status === "approved" && (
                                <Btn onClick={() => send({ type: "resolve" })}>Resolve</Btn>
                            )}
                        </div>
                    </section>

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
                                    void send({ type: "note", text: note });
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
