"use client";

import { CopilotChatInput } from "@copilotkit/react-core/v2";

/**
 * The add-attachment menu. Attachments are never configured, so the button
 * renders permanently disabled and can never do anything — a dead control
 * taking a column away from the text.
 *
 * The slot is typed as the component itself, statics included, so the
 * replacement has to carry those across.
 */
const NoAddMenuButton = Object.assign(function NoAddMenuButton() {
    return null;
}, CopilotChatInput.AddMenuButton);

export const ChatInput = Object.assign(function ChatInput(
    props: React.ComponentProps<typeof CopilotChatInput>,
) {
    return <CopilotChatInput {...props} addMenuButton={NoAddMenuButton} />;
}, CopilotChatInput);
