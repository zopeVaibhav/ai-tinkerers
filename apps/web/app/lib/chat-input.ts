"use client";

/**
 * The sidebar owns its input state. `inputValue` and `onInputChange` are on the
 * prop type but are not honoured — passing them changes nothing, while typing
 * into the box works, so the field is uncontrolled from out here.
 *
 * Writing through the prototype's value setter and firing an input event is how
 * you reach a React-managed field from outside: assigning `.value` directly
 * would be discarded on the next render, because React never sees it.
 */
export function fillChatInput(message: string) {
    const field = document.querySelector<HTMLTextAreaElement>(
        '[data-testid="copilot-chat-textarea"]',
    );
    if (!field) return;

    const setValue = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")?.set;
    setValue?.call(field, message);
    field.dispatchEvent(new Event("input", { bubbles: true }));
    field.focus();
    field.setSelectionRange(message.length, message.length);
}
