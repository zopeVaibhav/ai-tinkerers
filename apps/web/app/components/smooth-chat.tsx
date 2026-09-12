"use client";

import { useEffect, useRef, useState } from "react";
import {
    CopilotChatAssistantMessage,
    CopilotChatMessageView,
    CopilotChatUserMessage,
} from "@copilotkit/react-core/v2";
import { fillChatInput } from "../lib/chat-input";

/**
 * A model streams in bursts: a whole clause lands at once, then nothing for a
 * beat. Painting each burst the moment it arrives is what makes a reply read as
 * snappy and mechanical rather than written.
 *
 * So what the reader sees trails what we have, and closes the gap by a fraction
 * on every frame. Bursts even out, and a long pause still catches up quickly
 * because the step is proportional to how far behind the reader is.
 */
const CATCH_UP = 0.12;

/** Proportional alone leaves the tail crawling, so always move at least this far. */
const FLOOR = 2;

function useRevealed(full: string): string {
    const [shown, setShown] = useState(full.length);
    const frame = useRef<number | null>(null);

    useEffect(() => {
        function step() {
            let settled = false;
            setShown((prev) => {
                // A different message took this slot: do not animate backwards.
                if (prev > full.length) return full.length;
                if (prev === full.length) {
                    settled = true;
                    return prev;
                }
                const gap = full.length - prev;
                return Math.min(full.length, prev + Math.max(FLOOR, Math.ceil(gap * CATCH_UP)));
            });
            frame.current = settled ? null : requestAnimationFrame(step);
        }

        frame.current = requestAnimationFrame(step);
        return () => {
            if (frame.current !== null) cancelAnimationFrame(frame.current);
            frame.current = null;
        };
    }, [full]);

    return full.slice(0, shown);
}

type AssistantProps = React.ComponentProps<typeof CopilotChatAssistantMessage>;

/**
 * The slot is typed as the component itself, statics and all, so the wrapper has
 * to carry those across rather than being a bare function.
 */
const SmoothAssistantMessage = Object.assign(function SmoothAssistant(props: AssistantProps) {
    const content = typeof props.message?.content === "string" ? props.message.content : "";
    const revealed = useRevealed(content);

    if (!content) return <CopilotChatAssistantMessage {...props} />;
    return (
        <CopilotChatAssistantMessage {...props} message={{ ...props.message, content: revealed }} />
    );
}, CopilotChatAssistantMessage);

type UserMessageProps = React.ComponentProps<typeof CopilotChatUserMessage>;

/**
 * CopilotKit draws the edit button only when it is given something to do with
 * it. Pressing it puts that turn's text back in the composer, so a question can
 * be amended and asked again.
 *
 * It does not rewrite the thread. The library models editing as branching, and
 * a branch needs thread state the sidebar owns and does not hand out, so the
 * earlier turn stays and the amended one is appended.
 */
const EditableUserMessage = Object.assign(function EditableUserMessage(props: UserMessageProps) {
    return (
        <CopilotChatUserMessage
            {...props}
            onEditMessage={({ message }) => {
                const text = typeof message?.content === "string" ? message.content : "";
                if (text) fillChatInput(text);
            }}
        />
    );
}, CopilotChatUserMessage);

type MessageViewProps = React.ComponentProps<typeof CopilotChatMessageView>;

/** Pass to the sidebar as its `messageView` slot. */
export const SmoothMessageView = Object.assign(function SmoothView(props: MessageViewProps) {
    return (
        <CopilotChatMessageView
            {...props}
            assistantMessage={SmoothAssistantMessage}
            userMessage={EditableUserMessage}
        />
    );
}, CopilotChatMessageView);
