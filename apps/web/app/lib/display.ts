import { Severity, Status, Surface } from "@repo/types";
import type { SharedObject } from "@repo/types";

export const STATUS_ORDER: Status[] = [
    Status.Triage,
    Status.AwaitingApproval,
    Status.Approved,
    Status.Resolved,
];

export const STATUS_LABEL: Record<Status, string> = {
    [Status.Triage]: "Triage",
    [Status.AwaitingApproval]: "Waiting",
    [Status.Approved]: "Approved",
    [Status.Resolved]: "Resolved",
};

export const STATUS_STYLE: Record<Status, string> = {
    [Status.Triage]: "bg-neutral-200 text-neutral-800",
    [Status.AwaitingApproval]: "bg-amber-100 text-amber-900",
    [Status.Approved]: "bg-sky-100 text-sky-900",
    [Status.Resolved]: "bg-emerald-100 text-emerald-900",
};

export const SEVERITY_DOT: Record<Severity, string> = {
    [Severity.Low]: "bg-neutral-300",
    [Severity.Medium]: "bg-amber-400",
    [Severity.High]: "bg-red-500",
};

export const SEVERITY_TEXT: Record<Severity, string> = {
    [Severity.Low]: "text-neutral-500",
    [Severity.Medium]: "text-amber-700",
    [Severity.High]: "text-red-700",
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
 * everything a person might remember about an issue beats a field picker.
 */
export function haystack(issue: SharedObject): string {
    return [
        issue.facts.what,
        issue.raisedBy,
        issue.raisedOn,
        issue.facts.acknowledgedBy ?? "",
        issue.facts.proposedFix ?? "",
    ]
        .join(" ")
        .toLowerCase();
}
