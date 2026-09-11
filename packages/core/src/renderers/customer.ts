import { Audience, Status } from "@repo/types";
import type { SharedObject } from "@repo/types";
import type { TelegramPayload } from "./telegram";

/**
 * The customer's own thread. It renders one sentence and no controls — not
 * because the controls are filtered out, but because this renderer cannot
 * produce them. Internal fields never pass through here.
 */
export function renderCustomer(object: SharedObject): TelegramPayload {
    const { facts, framings } = object;

    const fallback =
        facts.status === Status.Resolved
            ? "This has been resolved. Thanks for your patience."
            : "Thanks for reporting this. We are looking into it.";

    return {
        text: framings[Audience.Customer] ?? fallback,
        reply_markup: { inline_keyboard: [] },
    };
}
