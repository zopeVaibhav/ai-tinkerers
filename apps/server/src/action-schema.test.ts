import { describe, expect, test } from "bun:test";
import { ActionType, Side } from "@repo/types";
import { parseAction } from "./action-schema";

describe("parseAction", () => {
    test("a well formed action passes through with its fields intact", () => {
        const parsed = parseAction({
            type: ActionType.Supersede,
            by: "vaibhav",
            winner: Side.A,
            note: "cap at 3",
        });
        expect(parsed?.type).toBe(ActionType.Supersede);
        expect(parsed?.by).toBe("vaibhav");
        expect(parsed && "winner" in parsed && parsed.winner).toBe(Side.A);
        expect(parsed && "note" in parsed && parsed.note).toBe("cap at 3");
    });

    test("a supersede without a winner is rejected, not handed to the reducer", () => {
        // This is the one that used to throw inside reduce() on winner.toUpperCase().
        expect(parseAction({ type: ActionType.Supersede, by: "vaibhav", note: "cap at 3" })).toBe(
            null,
        );
    });

    test("an action with no author is rejected", () => {
        expect(parseAction({ type: ActionType.Acknowledge, by: "" })).toBe(null);
    });

    test("a reframe cannot arrive over HTTP", () => {
        expect(
            parseAction({ type: ActionType.Reframe, by: "web", framings: { lead: "rewritten" } }),
        ).toBe(null);
    });

    test("junk is rejected", () => {
        for (const body of [null, undefined, "acknowledge", 7, {}, { type: "explode", by: "x" }]) {
            expect(parseAction(body)).toBe(null);
        }
    });
});
