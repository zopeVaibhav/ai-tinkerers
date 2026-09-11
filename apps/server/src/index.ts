import cors from "cors";
import express from "express";
import { Audience } from "@repo/types";
import type { Action } from "@repo/types";
import { ENABLED, ENV } from "./config/env";
import { act } from "./actions";
import { getConflict, listConflicts, listDecisions, onChange, persist } from "./repository";
import { record } from "./decisions";
import { detect } from "./detect";
import { extract } from "./agent/extract";
import { reframe } from "./agent";
import type { Message } from "./agent/extract";
import type { ThreadRef } from "./decisions";
import { openStream, pushWeb } from "./adapters/web";
import { confirmDecision, startSlack, updateSlack } from "./adapters/slack";
import { startTelegram, updateTelegram } from "./adapters/telegram";

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/health", (_req, res) => {
    res.json({ ok: true, surfaces: ENABLED });
});

app.get("/conflicts", async (_req, res) => {
    res.json(await listConflicts());
});

app.get("/decisions", async (_req, res) => {
    res.json(await listDecisions());
});

app.get("/stream", (req, res) => {
    void openStream(req, res);
});

app.post("/conflicts/:id/action", async (req, res) => {
    const conflict = await act(req.params.id, req.body as Action, Audience.Lead);
    if (!conflict) return res.status(404).json({ error: "no such conflict" });
    return res.json(conflict);
});

/**
 * One thread, one agent. It re-reads the thread once the typing stops, decides
 * whether anything was settled, and records it. Most of the time the answer is
 * no and nothing happens at all.
 *
 * Comparing this decision against the registry is issue #6.
 */
async function readThread(thread: ThreadRef, messages: Message[], lastSpeaker: string) {
    if (!ENABLED.agent) return;

    const claim = await extract(messages);
    if (!claim) {
        console.log(`${thread.threadName}: nothing decided yet`);
        for (const message of messages.slice(-4)) {
            console.log(`    ${message.by}: ${message.text.slice(0, 90)}`);
        }
        return;
    }

    const result = await record(thread, claim, lastSpeaker);
    if (!result?.changed) return;

    console.log(
        `decision recorded ${thread.threadName}: ${claim.subsystem}/${claim.condition} -> ${claim.action}`,
    );
    await confirmDecision(result.decision);
    void pushWeb();

    for (const conflict of await detect(result.decision)) void rewrite(conflict.id);
}

const rewriting = new Set<string>();

/** Framings are the agent's wording of the clash, written once it is found. */
async function rewrite(conflictId: string) {
    if (!ENABLED.agent || rewriting.has(conflictId)) return;
    rewriting.add(conflictId);
    try {
        const current = await getConflict(conflictId);
        if (!current) return;
        const action = await reframe(current);
        if (action) await persist(current, action);
    } finally {
        rewriting.delete(conflictId);
    }
}

/**
 * The single fan-out point. One change event, every registered view re-rendered.
 * No surface talks to another surface. Ever.
 */
onChange((conflict) => {
    void pushWeb();
    void updateSlack(conflict);
    void updateTelegram(conflict);
});

app.listen(ENV.SERVER_PORT, async () => {
    console.log(`server on http://localhost:${ENV.SERVER_PORT}`);

    if (ENABLED.slack) {
        await startSlack(apply, readThread).catch((error: Error) =>
            console.error("slack failed to start:", error.message),
        );
    }

    if (ENABLED.telegram) {
        await startTelegram(apply).catch((error: Error) =>
            console.error("telegram failed to start:", error.message),
        );
    }
});

function apply(conflictId: string, action: Action, from: Audience) {
    return act(conflictId, action, from);
}
