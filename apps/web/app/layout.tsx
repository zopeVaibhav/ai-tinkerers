import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
    title: "Shared object",
    description: "One object, many surfaces",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-neutral-50 text-neutral-900">{children}</body>
        </html>
    );
}
