"use client";

/**
 * Stand-ins for the registry while the stream is still connecting.
 *
 * Every block mirrors the real element's border, padding and line height rather
 * than approximating it. A skeleton of the wrong size shifts the page the moment
 * data lands, which reads worse than having shown nothing.
 */

const ROWS = [0, 1, 2];

export function Skeleton({ className = "" }: { className?: string }) {
    return <div aria-hidden className={`animate-pulse rounded bg-neutral-200 ${className}`} />;
}

export function ConflictListSkeleton() {
    return (
        <div role="status" className="flex flex-col gap-2">
            <span className="sr-only">Loading contradictions</span>
            {ROWS.map((row) => (
                <div key={row} className="rounded-xl border border-neutral-200 bg-white p-4">
                    <div className="flex items-center justify-between gap-2">
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-4 w-14" />
                    </div>
                    <Skeleton className="mt-2 h-5 w-3/4" />
                    <Skeleton className="mt-1 h-4 w-4/5" />
                </div>
            ))}
        </div>
    );
}

export function ConflictGridSkeleton() {
    return (
        <div role="status" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <span className="sr-only">Loading contradictions</span>
            {ROWS.map((row) => (
                <div
                    key={row}
                    className="flex flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-4"
                >
                    <div className="flex items-center justify-between gap-2">
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-4 w-14" />
                    </div>
                    <Skeleton className="h-5 w-3/4" />
                    <div className="grid grid-cols-2 gap-2">
                        <Skeleton className="h-16 rounded-lg" />
                        <Skeleton className="h-16 rounded-lg" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function ConflictDetailSkeleton() {
    return (
        <div role="status" className="flex flex-col gap-5">
            <span className="sr-only">Loading contradiction</span>
            <section className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <Skeleton className="h-5 w-20 rounded-full" />
                    <Skeleton className="h-5 w-56" />
                    <Skeleton className="ml-auto h-4 w-32" />
                </div>

                <Skeleton className="h-7 w-4/5" />

                <div className="grid gap-3 sm:grid-cols-2">
                    <SideCardSkeleton />
                    <SideCardSkeleton />
                </div>

                <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-9 w-32 rounded-lg" />
                    <Skeleton className="h-9 w-40 rounded-lg" />
                    <Skeleton className="h-9 w-28 rounded-lg" />
                </div>
            </section>

            <TimelineSkeleton />
        </div>
    );
}

export function DecisionListSkeleton() {
    return (
        <div role="status" className="flex flex-col gap-2">
            <span className="sr-only">Loading recorded decisions</span>
            {ROWS.map((row) => (
                <div key={row} className="rounded-xl border border-neutral-200 bg-white p-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-44" />
                    </div>
                    <Skeleton className="mt-2 h-5 w-3/5" />
                    <Skeleton className="mt-1 h-5 w-4/5" />
                </div>
            ))}
        </div>
    );
}

/** The panel always carries the log below the clash, so the stand-in has to as well. */
function TimelineSkeleton() {
    return (
        <section className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-5">
            <div className="flex items-baseline justify-between gap-4">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-4 w-28" />
            </div>

            <div className="flex flex-wrap items-center gap-2">
                <Skeleton className="h-9 max-w-xs flex-1 rounded-lg" />
                <Skeleton className="h-9 w-20 rounded-lg" />
                <Skeleton className="h-9 w-24 rounded-lg" />
            </div>

            <div className="rounded-lg border border-neutral-200">
                <div className="bg-neutral-50 px-3 py-2">
                    <Skeleton className="h-3.5 w-40" />
                </div>
                {ROWS.map((row) => (
                    <div key={row} className="border-t border-neutral-100 px-3 py-2">
                        <Skeleton className="h-5 w-2/3" />
                    </div>
                ))}
            </div>
        </section>
    );
}

function SideCardSkeleton() {
    return (
        <div className="flex flex-col gap-2 rounded-lg border border-neutral-200 p-4">
            <div className="flex items-baseline justify-between gap-2">
                <Skeleton className="h-6 w-28" />
                <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-4 w-2/3" />
        </div>
    );
}
