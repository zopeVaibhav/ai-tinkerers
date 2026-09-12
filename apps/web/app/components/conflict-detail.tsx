"use client";

import { ActionType, Audience, ConflictStatus, Side } from "@repo/types";
import type { Action, Conflict, Decision } from "@repo/types";
import { Btn, Prompt } from "./controls";
import { STATUS_LABEL, STATUS_STYLE, SURFACE_LABEL, fullTime } from "../lib/display";
import { Timeline } from "./timeline";

type Draft<T> = T extends unknown ? Omit<T, "by"> : never;

/** What each framing is, rather than where it lands. */
const FRAMING_LABEL: Record<Audience, string> = {
    [Audience.Engineer]: "Clash",
    [Audience.Lead]: "Decision",
};

export function ConflictDetail({
    conflict,
    onAct,
}: {
    conflict: Conflict;
    onAct: (action: Draft<Action>) => void;
}) {
    return (
        <div className="flex flex-col gap-5">
            <section className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-5">
                {/* What this clash is about on the left, where it came from on the
                    right. One grey run of dot-separated facts read as clutter. */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                    <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLE[conflict.status]}`}
                    >
                        {STATUS_LABEL[conflict.status]}
                    </span>
                    <span>
                        <span className="font-medium text-neutral-900">{conflict.a.subsystem}</span>
                        <span className="text-neutral-400"> on </span>
                        <code className="text-xs text-neutral-700">{conflict.a.condition}</code>
                    </span>
                    <span className="ml-auto text-xs text-neutral-400">
                        found{" "}
                        <span className="font-medium text-neutral-600">
                            {fullTime(conflict.createdAt)}
                        </span>{" "}
                        · v{conflict.version}
                    </span>
                </div>

                <p className="text-lg">
                    Two threads decided different things, and nobody was in both rooms.
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                    <SideCard decision={conflict.a} />
                    <SideCard decision={conflict.b} />
                </div>

                {conflict.resolution && (
                    <p className="rounded-lg bg-neutral-50 p-3 text-sm">
                        <span className="text-neutral-500">Resolution — </span>
                        {conflict.resolution}
                    </p>
                )}

                <div className="flex flex-wrap gap-2">
                    {conflict.status === ConflictStatus.Open && (
                        <Btn onClick={() => onAct({ type: ActionType.Acknowledge })}>
                            Acknowledge
                        </Btn>
                    )}
                    {conflict.status !== ConflictStatus.Resolved && (
                        <>
                            <Prompt
                                label={`Keep ${conflict.a.threadName}`}
                                placeholder="why does this side win?"
                                onSubmit={(note) =>
                                    onAct({ type: ActionType.Supersede, winner: Side.A, note })
                                }
                            />
                            <Prompt
                                label={`Keep ${conflict.b.threadName}`}
                                placeholder="why does this side win?"
                                onSubmit={(note) =>
                                    onAct({ type: ActionType.Supersede, winner: Side.B, note })
                                }
                            />
                        </>
                    )}
                    <Prompt
                        label="Add note"
                        placeholder="note"
                        onSubmit={(text) => onAct({ type: ActionType.Note, text })}
                    />
                </div>
            </section>

            {Object.keys(conflict.framings).length > 0 && (
                <section className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-5">
                    <h2 className="text-sm font-medium text-neutral-500">
                        Same clash, two readers
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {Object.values(Audience).map((audience) => (
                            <div key={audience} className="flex flex-col gap-1">
                                <span className="text-xs font-medium tracking-wide text-neutral-500 uppercase">
                                    {FRAMING_LABEL[audience]}
                                </span>
                                <p className="text-sm text-neutral-700">
                                    {conflict.framings[audience] ?? "—"}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <Timeline entries={conflict.timeline} />
        </div>
    );
}

function SideCard({ decision }: { decision: Decision }) {
    return (
        <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 p-4">
            <div className="flex items-baseline justify-between gap-2">
                <span className="font-medium">{decision.threadName}</span>
                <span className="text-xs text-neutral-400">{SURFACE_LABEL[decision.surface]}</span>
            </div>
            <code className="text-sm text-neutral-900">{decision.action}</code>
            <p className="text-sm text-neutral-600">&ldquo;{decision.rawText}&rdquo;</p>
            <p className="text-xs text-neutral-400">
                {decision.decidedBy} · {fullTime(decision.createdAt)}
            </p>
        </div>
    );
}
