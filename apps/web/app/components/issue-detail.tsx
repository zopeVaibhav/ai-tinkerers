"use client";

import { ActionType, Audience, Status } from "@repo/types";
import type { Action, SharedObject } from "@repo/types";
import { Btn, Prompt } from "./controls";
import { SEVERITY_TEXT, STATUS_LABEL, STATUS_STYLE, SURFACE_LABEL, fullTime } from "../lib/display";

type Draft<T> = T extends unknown ? Omit<T, "by"> : never;

export function IssueDetail({
    issue,
    onAction,
}: {
    issue: SharedObject;
    onAction: (action: Draft<Action>) => void;
}) {
    const { facts } = issue;
    const framings = Object.values(Audience).filter((audience) => issue.framings[audience]);

    return (
        <div className="flex flex-col gap-4">
            <section className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-5">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className={`rounded-full px-3 py-1 ${STATUS_STYLE[facts.status]}`}>
                        {STATUS_LABEL[facts.status]}
                    </span>
                    <span className={`uppercase tracking-wide ${SEVERITY_TEXT[facts.severity]}`}>
                        {facts.severity} severity
                    </span>
                    <span className="text-neutral-400">v{issue.version}</span>
                </div>

                <p className="text-lg leading-snug">{facts.what}</p>

                <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-4">
                    <Field label="Raised by" value={issue.raisedBy} />
                    <Field label="Raised on" value={SURFACE_LABEL[issue.raisedOn]} />
                    <Field label="Owner" value={facts.acknowledgedBy ?? "unassigned"} />
                    <Field label="Affected" value={String(facts.affected)} />
                    <Field label="Opened" value={fullTime(issue.createdAt)} />
                </dl>

                {facts.proposedFix && (
                    <p className="rounded-lg bg-neutral-50 p-3 text-sm">
                        <span className="text-neutral-500">Proposed fix — </span>
                        {facts.proposedFix}
                        {facts.approvedBy && (
                            <span className="text-neutral-500">
                                {" "}
                                (approved by {facts.approvedBy})
                            </span>
                        )}
                    </p>
                )}

                <div className="flex flex-wrap gap-2">
                    {facts.status === Status.Triage && (
                        <>
                            {!facts.acknowledgedBy && (
                                <Btn onClick={() => onAction({ type: ActionType.Acknowledge })}>
                                    Take it
                                </Btn>
                            )}
                            <Prompt
                                label="Propose fix"
                                placeholder="what is the fix?"
                                onSubmit={(fix) => onAction({ type: ActionType.Propose, fix })}
                            />
                        </>
                    )}
                    {facts.status === Status.AwaitingApproval && (
                        <>
                            <Btn onClick={() => onAction({ type: ActionType.Approve })}>
                                Approve
                            </Btn>
                            <Prompt
                                label="Reject"
                                placeholder="why?"
                                onSubmit={(reason) => onAction({ type: ActionType.Reject, reason })}
                            />
                        </>
                    )}
                    {facts.status === Status.Approved && (
                        <Btn onClick={() => onAction({ type: ActionType.Resolve })}>Resolve</Btn>
                    )}
                    <Prompt
                        label="Add note"
                        placeholder="note"
                        onSubmit={(text) => onAction({ type: ActionType.Note, text })}
                    />
                </div>
            </section>

            {framings.length > 0 && (
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
                                    {issue.framings[audience] ?? "—"}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <section className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-5">
                <h2 className="text-sm font-medium text-neutral-500">
                    Timeline · {issue.timeline.length}
                </h2>
                <ol className="flex flex-col gap-2 text-sm">
                    {issue.timeline.map((entry, index) => (
                        <li key={index} className="flex gap-3">
                            <span className="w-28 shrink-0 text-xs text-neutral-400">
                                {fullTime(entry.at)}
                            </span>
                            <span className="text-neutral-700">
                                <span className="font-medium">{entry.by}</span> {entry.what}
                            </span>
                        </li>
                    ))}
                </ol>
            </section>
        </div>
    );
}

function Field({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col">
            <dt className="text-xs text-neutral-400">{label}</dt>
            <dd className="truncate text-neutral-800">{value}</dd>
        </div>
    );
}
