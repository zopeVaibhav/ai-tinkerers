/**
 * One agent per thread, keyed by threadKey. This mirrors the Channels SDK's own
 * model — "one fresh agent per conversationKey" — which is why the registry fits
 * that SDK where an issue tracker fought it.
 *
 * People type in bursts, so a thread is only re-read once it has been quiet for
 * a moment. Without this the model gets called on every keystroke-sized event.
 */
const QUIET_MS = 4000;

type Pending = { timer: ReturnType<typeof setTimeout>; run: () => Promise<void> };

const pending = new Map<string, Pending>();
const busy = new Set<string>();

export function onThreadQuiet(threadKey: string, run: () => Promise<void>) {
    const existing = pending.get(threadKey);
    if (existing) clearTimeout(existing.timer);

    const timer = setTimeout(() => {
        pending.delete(threadKey);
        void fire(threadKey, run);
    }, QUIET_MS);

    pending.set(threadKey, { timer, run });
}

async function fire(threadKey: string, run: () => Promise<void>) {
    if (busy.has(threadKey)) return;
    busy.add(threadKey);
    try {
        await run();
    } catch (error) {
        console.error(`thread agent failed for ${threadKey}:`, (error as Error).message);
    } finally {
        busy.delete(threadKey);
    }
}
