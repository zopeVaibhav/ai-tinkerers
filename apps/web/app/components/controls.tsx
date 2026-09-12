"use client";

import { useState } from "react";

export function Btn({
    onClick,
    children,
    tone = "quiet",
}: {
    onClick: () => void;
    children: React.ReactNode;
    tone?: "quiet" | "solid";
}) {
    const style =
        tone === "solid"
            ? "bg-neutral-900 text-white hover:bg-neutral-700"
            : "border border-neutral-300 text-neutral-800 hover:bg-neutral-50";
    return (
        <button onClick={onClick} className={`rounded-lg px-4 py-2 text-sm ${style}`}>
            {children}
        </button>
    );
}

/** A button that turns into a one-field form, so the panel stays quiet until used. */
export function Prompt({
    label,
    placeholder,
    onSubmit,
}: {
    label: string;
    placeholder: string;
    onSubmit: (value: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    function submit() {
        if (!value.trim()) return;
        onSubmit(value.trim());
        setValue("");
        setOpen(false);
    }

    if (!open) return <Btn onClick={() => setOpen(true)}>{label}</Btn>;

    return (
        <span className="flex w-full gap-2 sm:w-auto">
            <input
                autoFocus
                value={value}
                onChange={(event) => setValue(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === "Enter") submit();
                    if (event.key === "Escape") setOpen(false);
                }}
                placeholder={placeholder}
                className="min-w-0 flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm sm:flex-none"
            />
            <Btn tone="solid" onClick={submit}>
                {label}
            </Btn>
        </span>
    );
}
