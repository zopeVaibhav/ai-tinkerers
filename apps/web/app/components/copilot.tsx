"use client";

// zod v3 on purpose: CopilotKit converts tool schemas with zod-to-json-schema,
// which does not understand zod v4. The server stays on v4.
import { z } from "zod";
import { useAgentContext, useFrontendTool } from "@copilotkit/react-core/v2";
import { ActionType } from "@repo/types";
import type { Conflict, Decision } from "@repo/types";
import { ConflictCard } from "./conflict-card";

type Draft = { type: ActionType; [key: string]: unknown };

/**
 * The registry as the agent sees it, plus the two things it may do about it.
 *
 * Both tools route through the same POST the buttons use, so the guard and the
 * permission check still apply. If this wrote to the database directly, the web
 * surface would quietly become a different product from the other two.
 */
export function RegistryCopilot({
    conflicts,
    decisions,
    onAct,
}: {
    conflicts: Conflict[];
    decisions: Decision[];
    onAct: (conflictId: string, action: Draft) => Promise<void>;
}) {
    /**
     * A conflict id is a cuid, and a model copies one wrong often enough that
     * requiring it is the difference between the card rendering and the agent
     * apologising. Every conflict therefore also answers to its position in the
     * list, and a missing reference resolves to the only conflict there is.
     */
    const pick = (reference?: string): Conflict | undefined => {
        if (reference) {
            const byId = conflicts.find((one) => one.id === reference);
            if (byId) return byId;

            const index = Number(reference.trim()) - 1;
            if (Number.isInteger(index) && conflicts[index]) return conflicts[index];
        }
        return conflicts.length === 1 ? conflicts[0] : conflicts[0];
    };

    useAgentContext({
        description:
            "The contradiction registry. Every conversation thread gets an agent that records " +
            "what its room decided. Two rooms deciding opposite things about the same subsystem " +
            "and condition is a conflict. Answer only from this data and never invent a decision. " +
            "Whenever your answer concerns a specific conflict, call showConflict first and then " +
            "add at most two sentences — never describe a conflict in prose instead of showing it. " +
            "Any conflict can be shown, resolved ones included. Pass its ref, or omit the argument " +
            "to show the only one. When asked what was decided, read the resolution field: it is " +
            "the answer. A superseded decision means that room later changed its own mind, which " +
            "is not the same as that room losing the conflict.",
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

    useFrontendTool({
        name: "showConflict",
        description:
            "Show a conflict as a live card the person can act on. Always prefer this over " +
            "describing a conflict in words. Works for open, seen and resolved conflicts alike.",
        parameters: z.object({
            ref: z
                .string()
                .optional()
                .describe("the conflict's ref, such as \"1\". Omit to show the only conflict."),
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
                    onAcknowledge={() => void onAct(conflict.id, { type: ActionType.Acknowledge })}
                />
            );
        },
    });

    useFrontendTool({
        name: "acknowledgeConflict",
        description: "Mark a conflict as seen. Only when the person asks for it.",
        parameters: z.object({
            ref: z
                .string()
                .optional()
                .describe("the conflict's ref, such as \"1\". Omit for the only conflict."),
        }),
        handler: async ({ ref }) => {
            const found = pick(ref);
            if (!found) return "the registry has no conflicts yet";
            await onAct(found.id, { type: ActionType.Acknowledge });
            return "acknowledged";
        },
    });

    return null;
}

function Muted({ children }: { children: React.ReactNode }) {
    return <p className="text-sm text-neutral-500">{children}</p>;
}
