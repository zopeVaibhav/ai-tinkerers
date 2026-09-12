import { describe, expect, test } from "bun:test";
import { ActionType, Surface } from "@repo/types";
import { can } from "./permissions";

describe("can", () => {
    test("a Slack window can produce every verb a person types", () => {
        for (const action of [
            ActionType.Acknowledge,
            ActionType.Resolve,
            ActionType.Supersede,
            ActionType.Note,
        ]) {
            expect(can(Surface.Slack, action)).toBe(true);
        }
    });

    test("a Telegram callback can only acknowledge", () => {
        expect(can(Surface.Telegram, ActionType.Acknowledge)).toBe(true);
        expect(can(Surface.Telegram, ActionType.Supersede)).toBe(false);
        expect(can(Surface.Telegram, ActionType.Note)).toBe(false);
        expect(can(Surface.Telegram, ActionType.Resolve)).toBe(false);
    });

    test("no surface can produce a reframe: the agent does not come through here", () => {
        for (const surface of Object.values(Surface)) {
            expect(can(surface, ActionType.Reframe)).toBe(false);
        }
    });
});
