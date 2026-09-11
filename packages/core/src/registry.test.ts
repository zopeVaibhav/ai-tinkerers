import { describe, expect, test } from "bun:test";
import { ClaimAction, Condition, Subsystem, Surface } from "@repo/types";
import type { Decision } from "@repo/types";
import { contradicts, findConflicts } from "./registry";

function decision(overrides: Partial<Decision> = {}): Decision {
    return {
        id: "d1",
        createdAt: new Date().toISOString(),
        surface: Surface.Slack,
        threadKey: "C0PAYMENTS:1",
        threadName: "#payments",
        decidedBy: "vaibhav",
        rawText: "hard-fail on timeout",
        subsystem: Subsystem.Payments,
        condition: Condition.GatewayTimeout,
        action: ClaimAction.HardFail,
        supersededById: null,
        ...overrides,
    };
}

const other = { id: "d2", threadKey: "C0MOBILE:1", threadName: "#mobile", decidedBy: "himanshu" };

describe("contradicts", () => {
    test("same subsystem and condition, different action, different thread", () => {
        expect(
            contradicts(decision(), decision({ ...other, action: ClaimAction.RetrySilently })),
        ).toBe(true);
    });

    test("different subsystem is not a conflict", () => {
        expect(
            contradicts(
                decision(),
                decision({
                    ...other,
                    subsystem: Subsystem.Auth,
                    action: ClaimAction.RetrySilently,
                }),
            ),
        ).toBe(false);
    });

    test("different condition is not a conflict", () => {
        expect(
            contradicts(
                decision(),
                decision({
                    ...other,
                    condition: Condition.RateLimited,
                    action: ClaimAction.RetrySilently,
                }),
            ),
        ).toBe(false);
    });

    test("same action is agreement, not conflict", () => {
        expect(contradicts(decision(), decision({ ...other }))).toBe(false);
    });

    test("same thread changing its mind is a correction", () => {
        expect(
            contradicts(decision(), decision({ id: "d2", action: ClaimAction.RetrySilently })),
        ).toBe(false);
    });

    test("a superseded decision no longer conflicts", () => {
        expect(
            contradicts(
                decision({ supersededById: "d9" }),
                decision({ ...other, action: ClaimAction.RetrySilently }),
            ),
        ).toBe(false);
        expect(
            contradicts(
                decision(),
                decision({ ...other, action: ClaimAction.RetrySilently, supersededById: "d9" }),
            ),
        ).toBe(false);
    });
});

describe("findConflicts", () => {
    test("returns only the contradicting decisions", () => {
        const incoming = decision({ ...other, action: ClaimAction.RetrySilently });
        const existing = [
            decision({ id: "a", threadKey: "C0PAY:1" }),
            decision({ id: "b", threadKey: "C0AUTH:1", subsystem: Subsystem.Auth }),
            decision({ id: "c", threadKey: "C0OPS:1", action: ClaimAction.RetrySilently }),
            decision({ id: "d", threadKey: "C0SRE:1", action: ClaimAction.QueueAndWarn }),
        ];

        expect(findConflicts(incoming, existing).map((one) => one.id)).toEqual(["a", "d"]);
    });

    test("no existing decisions means no conflicts", () => {
        expect(findConflicts(decision(), [])).toEqual([]);
    });
});
