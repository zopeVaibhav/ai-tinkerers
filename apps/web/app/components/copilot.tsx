"use client";

import { useRef } from "react";
// zod v3 on purpose: CopilotKit converts tool schemas with zod-to-json-schema,
// which does not understand zod v4. The server stays on v4.
import { z } from "zod";
import {
    useAgentContext,
    useConfigureSuggestions,
    useFrontendTool,
} from "@copilotkit/react-core/v2";
import { ActionType, ConflictStatus } from "@repo/types";
import type { Conflict, Decision } from "@repo/types";
import { ConflictCard } from "./conflict-card";

type Draft = { type: ActionType; [key: string]: unknown };

/**
 * The registry as the agent sees it, plus the two things it may do about it.
 *
 * Both tools route through the same POST the buttons use, so the guard and the
 * permission check still apply. If this wrote to the database directly, the web
 * surface would quietly become a different product from the other two.
 *
 * `conflicts` is the agent's whole world: it can only answer about, show, or
 * acknowledge what is in that array. A conflict's own page passes just that
 * conflict, which is the difference between "acknowledge this" meaning the one
 * on screen and it meaning whichever conflict happens to sort first.
 */
export function RegistryCopilot({
    conflicts,
    decisions,
    onAct,
    scoped = false,
}: {
    conflicts: Conflict[];
    decisions: Decision[];
    onAct: (conflictId: string, action: Draft) => Promise<void>;
    /** True when `conflicts` is one conflict's page rather than the registry. */
    scoped?: boolean;
}) {
    /**
     * The registry arrives over SSE, so this component first mounts with an
     * empty list. useAgentContext takes no dependencies and re-reads on every
     * render, so the agent sees conflicts as they land; useFrontendTool
     * registers like an effect and keeps the closure it was handed, which was
     * the empty one. Reading through a ref means a tool answers from the
     * current registry whenever it happens to have been registered.
     */
    const latest = useRef(conflicts);
    latest.current = conflicts;

    /**
     * A conflict id is a cuid, and a model copies one wrong often enough that
     * requiring it is the difference between the card rendering and the agent
     * apologising. Every conflict therefore also answers to its position in the
     * list, and a missing reference resolves to the newest conflict.
     */
    const pick = (reference?: string): Conflict | undefined => {
        const list = latest.current;

        if (reference) {
            const byId = list.find((one) => one.id === reference);
            if (byId) return byId;

            const index = Number(reference.trim()) - 1;
            if (Number.isInteger(index) && list[index]) return list[index];
        }
        return list[0];
    };

    /** Moves when a conflict appears or is acted on, not on every identical push. */
    const fingerprint = conflicts.map((one) => `${one.id}:${one.version}`).join(",");

    /**
     * An empty chat gives no clue what it knows. These name the three things
     * worth asking, and are written from the registry so the room in the second
     * one is a room that actually decided something.
     */
    const room = decisions.find((decision) => !decision.supersededById)?.threadName;
    const open = conflicts.find((conflict) => conflict.status === ConflictStatus.Open);

    const only = scoped ? conflicts[0] : undefined;

    useConfigureSuggestions(
        {
            available: "before-first-message",
            suggestions: only
                ? [
                      { title: "Show me this conflict", message: "Show me this conflict." },
                      {
                          title: "Why do these clash?",
                          message: `Why can ${only.a.threadName} and ${only.b.threadName} not both be right about ${only.a.condition}?`,
                      },
                      {
                          title:
                              only.status === ConflictStatus.Open
                                  ? "Acknowledge this"
                                  : "What was decided?",
                          message:
                              only.status === ConflictStatus.Open
                                  ? "Acknowledge this conflict."
                                  : "What was decided here, and who decided it?",
                      },
                  ]
                : [
                      {
                          title: "Show me the open conflict",
                          message: open
                              ? `Show me the open conflict about ${open.a.subsystem}.`
                              : "Show me the open conflict.",
                      },
                      {
                          title: room ? `What did ${room} decide?` : "What has been decided?",
                          message: room
                              ? `What did ${room} decide, and does anything contradict it?`
                              : "What has each room decided so far?",
                      },
                      {
                          title: "Acknowledge this",
                          message: open
                              ? `Acknowledge the open conflict about ${open.a.subsystem}.`
                              : "Acknowledge the conflict on screen.",
                      },
                  ],
        },
        [room, open?.id, only?.id, only?.status],
    );

    useAgentContext({
        description:
            (only
                ? `You are on the page for one conflict: ${only.a.threadName} versus ` +
                  `${only.b.threadName}, on ${only.a.subsystem} / ${only.a.condition}. It is the ` +
                  "only conflict you can see or act on, and every question is about it unless the " +
                  "person plainly says otherwise. If they ask about a different conflict, say it " +
                  "is not on this page and that the registry lists the rest. "
                : "") +
            "The contradiction registry. Every conversation thread gets an agent that records " +
            "what its room decided. Two rooms deciding opposite things about the same subsystem " +
            "and condition is a conflict. Answer only from this data and never invent a decision. " +
            "Whenever your answer concerns a specific conflict, call showConflict first and then " +
            "add at most two sentences — never describe a conflict in prose instead of showing it. " +
            "Any conflict can be shown, resolved ones included. Pass its ref, or omit the argument " +
            "to show the only one. When asked what was decided, read the resolution field: it is " +
            "the answer. A superseded decision means that room later changed its own mind, which " +
            "is not the same as that room losing the conflict. " +
            "You can show a conflict and you can acknowledge one. You cannot add a note, resolve " +
            "a conflict, or pick which side wins — there is no tool for any of those. If asked " +
            "for one, say plainly that you cannot and point at the controls on the card. Never " +
            "report having done something you had no tool to do.",
        value: {
            decisions: decisions.map((decision) => ({
                id: decision.id,
                room: decision.threadName,
                decidedBy: decision.decidedBy,
                claim: `${decision.subsystem} on ${decision.condition} -> ${decision.action}`,
                said: decision.rawText,
                superseded: Boolean(decision.supersededById),
            })),
            conflicts: conflicts.map((conflict, index) => ({
                ref: String(index + 1),
                id: conflict.id,
                status: conflict.status,
                subsystem: conflict.a.subsystem,
                condition: conflict.a.condition,
                sides: [
                    { room: conflict.a.threadName, action: conflict.a.action },
                    { room: conflict.b.threadName, action: conflict.b.action },
                ],
                acknowledgedBy: conflict.acknowledgedBy,
                resolution: conflict.resolution,
                timeline: conflict.timeline.map((entry) => `${entry.by}: ${entry.what}`),
            })),
        },
    });

    useFrontendTool(
        {
            name: "showConflict",
            description:
                "Show a conflict as a live card the person can act on. Always prefer this over " +
                "describing a conflict in words. Works for open, seen and resolved conflicts alike.",
            parameters: z.object({
                ref: z
                    .string()
                    .optional()
                    .describe('the conflict\'s ref, such as "1". Omit to show the only conflict.'),
            }),
            handler: async ({ ref }) => {
                const found = pick(ref);
                if (!found) return "the registry has no conflicts yet";
                return `showing ${found.a.threadName} vs ${found.b.threadName}, status ${found.status}`;
            },
            render: ({ args }) => {
                const conflict = pick(args.ref);
                if (!conflict) return <Muted>The registry has no conflicts yet.</Muted>;
                return (
                    <ConflictCard
                        conflict={conflict}
                        onAcknowledge={() =>
                            void onAct(conflict.id, { type: ActionType.Acknowledge })
                        }
                    />
                );
            },
        },
        [fingerprint],
    );

    useFrontendTool(
        {
            name: "acknowledgeConflict",
            description: "Mark a conflict as seen. Only when the person asks for it.",
            parameters: z.object({
                ref: z
                    .string()
                    .optional()
                    .describe('the conflict\'s ref, such as "1". Omit for the only conflict.'),
            }),
            handler: async ({ ref }) => {
                const found = pick(ref);
                if (!found) return "the registry has no conflicts yet";
                await onAct(found.id, { type: ActionType.Acknowledge });
                return "acknowledged";
            },
        },
        [fingerprint],
    );

    return null;
}

function Muted({ children }: { children: React.ReactNode }) {
    return <p className="text-sm text-neutral-500">{children}</p>;
}
