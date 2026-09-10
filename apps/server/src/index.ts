import cors from "cors";
import express from "express";
import type { Action } from "@repo/types";
import { ENABLED, ENV } from "./config/env";
import { apply, getObject, onChange } from "./store";
import { openStream, pushWeb } from "./adapters/web";
import { startSlack, updateSlack } from "./adapters/slack";
import { startTelegram, updateTelegram } from "./adapters/telegram";
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

/** The single write path. Every surface and the agent come through here. */
function dispatch(action: Action) {
    return apply(OBJECT_ID, action);
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
