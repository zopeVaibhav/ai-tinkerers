/**
 * One motion vocabulary for the whole surface.
 *
 * Eight files animate against the same registry, and motion only reads as a
 * single system when a row, a panel and a card travel the same distance on the
 * same curve. Kept per-file those numbers drift apart within a release, so they
 * live here and are imported rather than retyped.
 */

import type { TargetAndTransition, Transition } from "motion/react";

/** initial/animate/exit, ready to spread onto a `motion` element. */
export type Appear = {
    initial: TargetAndTransition;
    animate: TargetAndTransition;
    exit: TargetAndTransition;
};

/** Short and flat. This screen is a list of things that are wrong, not a showcase. */
export const EASE: Transition = { duration: 0.2, ease: "easeOut" };

export const fade: Appear = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

export const riseIn: Appear = {
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 6 },
};

/** Same travel as a panel, named apart so rows can drift later without touching panels. */
export const listItem: Appear = {
    initial: { opacity: 0, y: 6 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 6 },
};

const STEP = 0.03;
const CAP = 0.15;

/**
 * Order is worth ~150ms and no more: past the sixth row the delay stops growing,
 * so a registry with forty conflicts still lands at once rather than crawling in.
 */
export function stagger(index: number): Transition {
    return { ...EASE, delay: Math.min(index * STEP, CAP) };
}
