import { ConflictStatus, Surface } from "@repo/types";
import type { Conflict } from "@repo/types";

export const STATUS_ORDER: ConflictStatus[] = [
    ConflictStatus.Open,
    ConflictStatus.Acknowledged,
    ConflictStatus.Resolved,
];

export const STATUS_LABEL: Record<ConflictStatus, string> = {
    [ConflictStatus.Open]: "Open",
    [ConflictStatus.Acknowledged]: "Seen",
    [ConflictStatus.Resolved]: "Resolved",
};

export const STATUS_STYLE: Record<ConflictStatus, string> = {
    [ConflictStatus.Open]: "bg-red-100 text-red-900",
    [ConflictStatus.Acknowledged]: "bg-amber-100 text-amber-900",
    [ConflictStatus.Resolved]: "bg-emerald-100 text-emerald-900",
};

export const SURFACE_LABEL: Record<Surface, string> = {
    [Surface.Slack]: "Slack",
    [Surface.Telegram]: "Telegram",
    [Surface.Web]: "web",
};

/** Short enough to sit in a list row without wrapping it. */
export function ago(iso: string, now = Date.now()): string {
    const seconds = Math.max(0, Math.round((now - new Date(iso).getTime()) / 1000));
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function fullTime(iso: string): string {
    return new Date(iso).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

/**
 * One text field to search over. The list is small, so a substring match over
 * everything a person might remember about a clash beats a field picker.
 */
export function haystack(conflict: Conflict): string {
    return [
        conflict.a.subsystem,
        conflict.a.condition,
        conflict.a.threadName,
        conflict.b.threadName,
        conflict.a.action,
        conflict.b.action,
        conflict.a.decidedBy,
        conflict.b.decidedBy,
        conflict.resolution ?? "",
    ]
        .join(" ")
        .toLowerCase();
}
