"use client";

import type { ReactElement } from "react";

/** The two pieces CopilotKit hands a welcome screen, already built. */
type WelcomeScreenProps = {
    input: ReactElement;
    suggestionView: ReactElement;
};

/**
 * The default welcome screen centres the greeting and parks the suggestions
 * just above the input, at the far end of the panel from the question they
 * answer. Here they sit under the greeting, where they read as the answer to
 * "how can I help" rather than as a toolbar.
 *
 * `input` and `suggestionView` arrive already built; this only places them.
 */
export function ChatWelcome({ input, suggestionView }: WelcomeScreenProps) {
    return (
        <div className="flex h-full flex-col">
            <div className="flex flex-1 flex-col items-center justify-center gap-5 px-4">
                <h1 className="text-center text-xl font-medium sm:text-2xl">
                    How can I help you today?
                </h1>
                {suggestionView}
            </div>
            <div className="px-3 pb-4">{input}</div>
        </div>
    );
}
