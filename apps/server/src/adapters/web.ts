import type { Request, Response } from "express";
import { listConflicts, listDecisions } from "../repository";

const connections = new Set<Response>();

/**
 * SSE, not WebSocket. Fan-out is one-directional server to client, which is
 * exactly what SSE is. Actions travel back up as plain POST.
 */
export async function openStream(req: Request, res: Response) {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
    });

    connections.add(res);
    res.write(`data: ${JSON.stringify(await snapshot())}\n\n`);

    req.on("close", () => {
        connections.delete(res);
    });
}

/** Every web view sees the whole registry, so any change reaches every tab. */
export async function pushWeb() {
    if (!connections.size) return;
    const payload = `data: ${JSON.stringify(await snapshot())}\n\n`;
    for (const res of connections) res.write(payload);
}

async function snapshot() {
    const [conflicts, decisions] = await Promise.all([listConflicts(), listDecisions()]);
    return { conflicts, decisions };
}
