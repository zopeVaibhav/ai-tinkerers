import cors from "cors";
import express from "express";
import { Audience } from "@repo/types";
import type { Action } from "@repo/types";
import { ENABLED, ENV } from "./config/env";
import { act } from "./actions";
import { listConflicts, listDecisions, onChange } from "./repository";
import { openStream, pushWeb } from "./adapters/web";
import { startSlack, updateSlack } from "./adapters/slack";
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
        await startSlack(apply).catch((error: Error) =>
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
