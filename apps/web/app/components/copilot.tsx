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
    useAgentContext({
        description:
            "The contradiction registry. Every conversation thread gets an agent that records " +
            "what its room decided. Two rooms deciding opposite things about the same subsystem " +
            "and condition is a conflict. Answer only from this data and never invent a decision.",
        value: {
            decisions: decisions.map((decision) => ({
                id: decision.id,
                room: decision.threadName,
                decidedBy: decision.decidedBy,
                claim: `${decision.subsystem} on ${decision.condition} -> ${decision.action}`,
                said: decision.rawText,
                superseded: Boolean(decision.supersededById),
            })),
            howToShowAConflict:
                "Call showConflict with the conflict id exactly as written below, or omit the " +
                "id when there is only one.",
            conflicts: conflicts.map((conflict) => ({
                id: conflict.id,
                status: conflict.status,
                subsystem: conflict.a.subsystem,
                condition: conflict.a.condition,
                sides: [
                    { room: conflict.a.threadName, action: conflict.a.action },
                    { room: conflict.b.threadName, action: conflict.b.action },
                ],
            })),
        },
    });

    useFrontendTool({
        name: "showConflict",
        description:
            "Show a conflict as a live card the person can act on. Prefer this over describing " +
            "a conflict in words.",
        parameters: z.object({
            conflictId: z.string().describe("id of the conflict to show"),
        }),
        handler: async ({ conflictId }) => {
            const found = conflicts.find((one) => one.id === conflictId);
            return found ? `showing ${found.a.threadName} vs ${found.b.threadName}` : "not found";
        },
        render: ({ args }) => {
            const conflict = conflicts.find((one) => one.id === args.conflictId);
            if (!conflict) return <Muted>No conflict with that id.</Muted>;
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
            conflictId: z.string().describe("id of the conflict to acknowledge"),
        }),
        handler: async ({ conflictId }) => {
            await onAct(conflictId, { type: ActionType.Acknowledge });
            return "acknowledged";
        },
    });

    return null;
}

function Muted({ children }: { children: React.ReactNode }) {
    return <p className="text-sm text-neutral-500">{children}</p>;
}
