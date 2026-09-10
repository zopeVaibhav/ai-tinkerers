"use client";

import { useEffect, useState } from "react";
import type { SharedObject } from "@repo/types";

const SERVER = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:5101";

export default function Page() {
    const [object, setObject] = useState<SharedObject | null>(null);

    useEffect(() => {
        const source = new EventSource(`${SERVER}/stream`);
        source.onmessage = (event) => setObject(JSON.parse(event.data) as SharedObject);
        return () => source.close();
    }, []);

    async function send(type: string) {
        await fetch(`${SERVER}/action`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type, by: "web" }),
        });
    }

    return (
        <main className="mx-auto flex max-w-xl flex-col gap-6 p-10">
            <h1 className="text-2xl font-medium">Shared object</h1>
            <p className="text-6xl tabular-nums">{object?.facts.count ?? "—"}</p>
            <div className="flex gap-3">
                <button
                    onClick={() => send("increment")}
                    className="rounded-lg bg-neutral-900 px-4 py-2 text-white"
                >
                    +1
                </button>
                <button
                    onClick={() => send("decrement")}
                    className="rounded-lg border border-neutral-300 px-4 py-2"
                >
                    -1
                </button>
            </div>
            <p className="text-sm text-neutral-500">version {object?.version ?? 0}</p>
        </main>
    );
}
