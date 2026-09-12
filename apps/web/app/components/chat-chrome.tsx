"use client";

import {
    CopilotChatInput,
    CopilotChatToggleButton,
    CopilotModalHeader,
} from "@copilotkit/react-core/v2";
import { CopilotKitKite } from "./copilotkit-kite";

/**
 * The panel is permanent, so the two controls that exist to open and close it
 * have nothing to do. They are replaced rather than hidden: a button that is
 * only invisible is still in the accessibility tree, and still announces
 * "Open chat" for a panel that is already open and cannot be shut.
 *
 * Both slots are typed as the component itself, statics included, so the
 * replacements carry those across.
 */
export const NoToggleButton = Object.assign(function NoToggleButton() {
    return null;
}, CopilotChatToggleButton);

/** The stock header exists to hold a close button. This one just names the panel. */
export const ChatHeader = Object.assign(function ChatHeader() {
    return (
        <header className="flex items-center justify-center gap-2 border-b border-neutral-200 px-4 py-4 text-base font-medium">
            <CopilotKitKite />
            CopilotKit Chat
        </header>
    );
}, CopilotModalHeader);

/**
 * The add-attachment menu. The sidebar's props omit `attachments` and
 * `onAddFile` altogether, so the button renders permanently disabled and can
 * never do anything — it is a dead control taking a column from the text.
 */
const NoAddMenuButton = Object.assign(function NoAddMenuButton() {
    return null;
}, CopilotChatInput.AddMenuButton);

export const ChatInput = Object.assign(function ChatInput(
    props: React.ComponentProps<typeof CopilotChatInput>,
) {
    return <CopilotChatInput {...props} addMenuButton={NoAddMenuButton} />;
}, CopilotChatInput);
