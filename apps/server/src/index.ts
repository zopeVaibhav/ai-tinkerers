import cors from "cors";
import express from "express";
import { Audience, Surface } from "@repo/types";
import type { Action, SharedObject } from "@repo/types";
import { ENABLED, ENV } from "./config/env";
import { act } from "./actions";
import { intake, reframe } from "./agent";
import { createIssue, getIssue, listIssues, persist, publish } from "./repository";
import { onChange } from "./repository";
import { openStream, pushWeb } from "./adapters/web";
import { postIssue as postSlack, startSlack, updateSlack } from "./adapters/slack";
import { postIssue as postTelegram, startTelegram, updateTelegram } from "./adapters/telegram";

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/health", (_req, res) => {
    res.json({ ok: true, surfaces: ENABLED });
});

app.get("/issues", async (_req, res) => {
    res.json(await listIssues());
});

app.get("/stream", (req, res) => {
    void openStream(req, res);
});

app.post("/issues/:id/action", async (req, res) => {
    const issue = await act(req.params.id, req.body as Action, Audience.Lead);
    if (!issue) return res.status(404).json({ error: "no such issue" });
    return res.json(issue);
});

/** Raw, unstructured text from any door. The agent turns it into an issue. */
app.post("/report", async (req, res) => {
    const { text, from } = req.body as { text?: string; from?: string };
    if (!text?.trim()) return res.status(400).json({ error: "text is required" });
    if (!ENABLED.agent) return res.status(503).json({ error: "agent is not configured" });

    const issue = await raise(text, from ?? Audience.Customer, Surface.Web);
    if (!issue) return res.status(502).json({ error: "agent could not read that message" });
    return res.json(issue);
});

/**
 * A report creates a new issue and opens a window on every surface. Every other
 * action targets an issue that already exists.
 */
async function raise(text: string, by: string, on: Surface): Promise<SharedObject | null> {
    if (!ENABLED.agent) return null;

    const action = await intake(text, by);
    if (!action) return null;

    const issue = await createIssue(action, on);

    if (ENABLED.slack) await postSlack(issue);
    if (ENABLED.telegram) await postTelegram(issue);

    publish(issue);
    void rewrite(issue.id);
    return issue;
}

async function apply(issueId: string, action: Action, from: Audience) {
    const issue = await act(issueId, action, from);
    if (issue) void rewrite(issueId);
    return issue;
}

const rewriting = new Set<string>();

/** Framings are the agent's wording of the facts, refreshed when facts move. */
async function rewrite(issueId: string) {
    if (!ENABLED.agent || rewriting.has(issueId)) return;
    rewriting.add(issueId);
    try {
        const current = await getIssue(issueId);
        if (!current) return;
        const action = await reframe(current);
        if (action) await persist(current, action);
    } finally {
        rewriting.delete(issueId);
    }
}

/**
 * The single fan-out point. One change event, every registered view re-rendered.
 * No surface talks to another surface. Ever.
 */
onChange((issue) => {
    void pushWeb();
    void updateSlack(issue);
    void updateTelegram(issue);
});

app.listen(ENV.SERVER_PORT, async () => {
    console.log(`server on http://localhost:${ENV.SERVER_PORT}`);

    if (ENABLED.slack) {
        await startSlack(apply, raise).catch((error: Error) =>
            console.error("slack failed to start:", error.message),
        );
    }

    if (ENABLED.telegram) {
        await startTelegram(apply, raise).catch((error: Error) =>
            console.error("telegram failed to start:", error.message),
        );
    }
});
