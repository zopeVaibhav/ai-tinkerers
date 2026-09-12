"use client";

import { CopilotChatSuggestionPill, CopilotChatSuggestionView } from "@copilotkit/react-core/v2";
import { fillChatInput } from "../lib/chat-input";

type Suggestion = { title: string; message: string };

/**
 * A suggestion fills the box; it does not send. Pressing one is a person saying
 * "ask something like this", not "ask exactly this" — they should still get to
 * edit it, and nothing leaves for the model until they say so.
 *
 * The slot hands us its own onSelectSuggestion, which submits. That is exactly
 * what we do not want, so it is ignored. The pill is still CopilotKit's, so its
 * hover, focus and disabled states are unchanged.
 */
export const SuggestionsToInput = Object.assign(function SuggestionsToInput({
    suggestions,
}: {
    suggestions: Suggestion[];
}) {
    if (!suggestions?.length) return null;
    return (
        <div className="mb-3 flex flex-col items-center gap-2">
            {suggestions.map((suggestion) => (
                <CopilotChatSuggestionPill
                    key={suggestion.title}
                    onClick={() => fillChatInput(suggestion.message)}
                >
                    {suggestion.title}
                </CopilotChatSuggestionPill>
            ))}
        </div>
    );
}, CopilotChatSuggestionView);
