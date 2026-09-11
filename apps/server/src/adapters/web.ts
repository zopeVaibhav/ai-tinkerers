import type { Request, Response } from "express";
import { renderWeb } from "@repo/core";
import { Surface } from "@repo/types";
import type { SharedObject } from "@repo/types";
import { subscribe, unsubscribe } from "../subscriptions";

type Connection = { id: string; res: Response; objectId: string };

const connections = new Map<string, Connection>();

/**
 * SSE, not WebSocket. Fan-out is one-directional server to client, which is
 * exactly what SSE is. Actions travel back up as plain POST.
 */
export function openStream(req: Request, res: Response, objectId: string, initial: SharedObject) {
    const id = crypto.randomUUID();

    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
    });

    connections.set(id, { id, res, objectId });
    subscribe(objectId, { surface: Surface.Web, connectionId: id });
    write(res, initial);

    req.on("close", () => {
        connections.delete(id);
        unsubscribe(objectId, (view) => view.surface === Surface.Web && view.connectionId === id);
    });
}

export function pushWeb(object: SharedObject): void {
    for (const connection of connections.values()) {
        if (connection.objectId === object.id) write(connection.res, object);
    }
}

function write(res: Response, object: SharedObject): void {
    res.write(`data: ${JSON.stringify(renderWeb(object))}\n\n`);
}
