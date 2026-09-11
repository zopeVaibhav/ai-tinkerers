import cors from "cors";
import express from "express";
import { ActionType, Audience } from "@repo/types";
import type { Action } from "@repo/types";
import { ENABLED, ENV } from "./config/env";
import { apply, getObject, onChange, reset } from "./store";
import { openStream, pushWeb } from "./adapters/web";
import { startSlack, updateSlack } from "./adapters/slack";
import { startTelegram, updateTelegram } from "./adapters/telegram";
import { intake, reframe } from "./agent";
import { load, save } from "./persist";

const OBJECT_ID = "demo";

load();

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/health", (_req, res) => {
    res.json({ ok: true, surfaces: ENABLED });
});

app.get("/stream", (req, res) => {
    openStream(req, res, OBJECT_ID, getObject(OBJECT_ID));
});

app.post("/action", (req, res) => {
    res.json(dispatch(req.body as Action));
});

app.post("/reset", (_req, res) => {
    res.json(reset(OBJECT_ID));
});

/** Raw, unstructured text from a customer. The agent turns it into facts. */
app.post("/report", async (req, res) => {
    const { text, from } = req.body as { text?: string; from?: string };
    if (!text?.trim()) return res.status(400).json({ error: "text is required" });
    if (!ENABLED.agent) return res.status(503).json({ error: "agent is not configured" });

    const action = await intake(text, from ?? Audience.Customer);
    if (!action) return res.status(502).json({ error: "agent could not read that message" });
    return res.json(dispatch(action));
});

/** The single write path. Every surface and the agent come through here. */
function dispatch(action: Action) {
    const object = apply(OBJECT_ID, action);
    if (shouldReframe(action)) void rewrite();
    return object;
}

/**
 * Framings are the agent's wording of the facts, so they are refreshed
 * whenever the facts move — and never in response to its own writes.
 */
function shouldReframe(action: Action): boolean {
    return ENABLED.agent && action.type !== ActionType.Reframe && action.type !== ActionType.Note;
}

let rewriting = false;

async function rewrite() {
    if (rewriting) return;
    rewriting = true;
    try {
        const action = await reframe(getObject(OBJECT_ID));
        if (action) apply(OBJECT_ID, action);
    } finally {
        rewriting = false;
    }
}

/**
 * The single fan-out point. One change event, every registered view re-rendered.
 * No surface talks to another surface. Ever.
 */
onChange((object) => {
    save();
    pushWeb(object);
    void updateSlack(object);
    void updateTelegram(object);
});

app.listen(ENV.SERVER_PORT, async () => {
    console.log(`server on http://localhost:${ENV.SERVER_PORT}`);

    if (ENABLED.slack) {
        await startSlack(OBJECT_ID, getObject(OBJECT_ID), dispatch).catch((error: Error) =>
            console.error("slack failed to start:", error.message),
        );
    }

    if (ENABLED.telegram) {
        await startTelegram(OBJECT_ID, getObject(OBJECT_ID), dispatch).catch((error: Error) =>
            console.error("telegram failed to start:", error.message),
        );
    }

    save();
});
