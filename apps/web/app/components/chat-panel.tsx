"use client";

import { CopilotChat } from "@copilotkit/react-core/v2";
import { CopilotKitKite } from "./copilotkit-kite";
import { SmoothMessageView } from "./smooth-chat";
import { ChatWelcome } from "./chat-welcome";

/**
 * The chat as a column of the page rather than a panel floating over it.
 *
 * CopilotSidebar is `position: fixed` and pushes the page by setting a margin on
 * the body once it mounts, so the first paint is always the full-width layout
 * and the second is the real one — the reader watches the content jump left.
 * CopilotChat is the same chat with no chrome of its own, so it can sit in an
 * ordinary flex child whose width is settled before any JavaScript runs.
 */
export function ChatPanel() {
    return (
        <aside className="flex min-h-0 flex-col border-neutral-200 lg:h-screen lg:border-l">
            <header className="flex items-center justify-center gap-2 border-y border-neutral-200 px-4 py-4 text-base font-medium lg:border-t-0">
                <CopilotKitKite />
                CopilotKit Chat
            </header>

            {/* min-h-0: without it a flex child refuses to shrink below its content,
                so the message list grows the page instead of scrolling itself. */}
            <div className="min-h-0 flex-1">
                <CopilotChat messageView={SmoothMessageView} welcomeScreen={ChatWelcome} />
            </div>
        </aside>
    );
}
