"use client";

import { use } from "react";
import Link from "next/link";
import type { Action } from "@repo/types";
import { ConflictDetail } from "../../components/conflict-detail";
import { RegistryCopilot } from "../../components/copilot";
import { RegistryHeader } from "../../components/registry-header";
import { ChatPanel } from "../../components/chat-panel";
import { ConflictDetailSkeleton } from "../../components/skeleton";
import { useRegistry } from "../../lib/use-registry";

type Draft<T> = T extends unknown ? Omit<T, "by"> : never;

/**
 * One conflict, at its own address, beside a chat about that conflict.
 *
 * The whole registry still streams in behind this — the conflict has to update
 * in place when another surface acts on it — but only this one is handed to the
 * copilot. That is deliberate: the agent's tools resolve a bare "this" to the
 * first conflict they can see, so a chat that could see all of them would
 * sometimes act on a conflict the reader is not looking at.
 *
 * The two columns are one flex row, sized in CSS rather than by the chat
 * mounting. Both halves are therefore final on the first paint, which is what
 * keeps the page from rendering full width and then snapping narrower.
 */
export default function ConflictPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { conflicts, link, loading, name, rename, send } = useRegistry();

    const conflict = conflicts.find((one) => one.id === id) ?? null;

    async function act(action: Draft<Action>) {
        if (!conflict) return;
        await send(conflict.id, action as unknown as Record<string, unknown>);
    }

    return (
        <div className="flex flex-col lg:h-screen lg:flex-row">
            {conflict && (
                <RegistryCopilot
                    scoped
                    conflicts={[conflict]}
                    decisions={[conflict.a, conflict.b]}
                    onAct={(conflictId, action) => send(conflictId, action)}
                />
            )}

            <main className="flex min-w-0 flex-1 flex-col gap-6 p-4 sm:p-8 lg:overflow-y-auto">
                <RegistryHeader
                    back
                    link={link}
                    name={name}
                    onRename={rename}
                    subtitle={
                        conflict
                            ? `${conflict.a.subsystem} on ${conflict.a.condition} — ${conflict.a.threadName} against ${conflict.b.threadName}.`
                            : undefined
                    }
                />

                {loading ? (
                    <ConflictDetailSkeleton />
                ) : conflict ? (
                    <ConflictDetail conflict={conflict} onAct={act} />
                ) : (
                    <Missing />
                )}
            </main>

            {/* Width is a class, not a measurement taken after mount, so the main
                column is already the right size on the server-rendered paint. */}
            <div className="h-[70vh] shrink-0 lg:h-auto lg:w-[30%] lg:min-w-80">
                <ChatPanel />
            </div>
        </div>
    );
}

function Missing() {
    return (
        <div className="flex flex-col items-start gap-3 rounded-xl border border-neutral-200 bg-white p-5">
            <p className="text-sm text-neutral-500">
                No conflict with that id. It may have been resolved away, or the link may be from a
                different registry.
            </p>
            <Link
                href="/"
                className="cursor-pointer rounded-lg border border-neutral-300 px-3 py-1.5 text-sm text-neutral-800 hover:bg-neutral-50"
            >
                Back to the registry
            </Link>
        </div>
    );
}
