import type { ReactNode } from "react";
import { Plus_Jakarta_Sans, Spline_Sans_Mono } from "next/font/google";
import "@copilotkit/react-core/v2/styles.css";
import "./globals.css";
import { Providers } from "./providers";

// The pair copilotkit.ai sets its own site in: Plus Jakarta Sans for text,
// Spline Sans Mono for the claim values, which are code-shaped and read as
// such. next/font self-hosts both, so there is no request to Google at runtime.
const sans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-jakarta",
    display: "swap",
});

const mono = Spline_Sans_Mono({
    subsets: ["latin"],
    variable: "--font-spline",
    display: "swap",
});

export const metadata = {
    title: "Shared object",
    description: "One object, many surfaces",
};

/**
 * Runs before anything paints, so a reader who chose dark never sees a white
 * frame first. React cannot do this: the theme lives in localStorage, which the
 * server cannot read, so by the time a component could apply it the light paint
 * has already happened. Falls back to the OS setting when nothing is stored.
 *
 * Kept in step with applyTheme() and THEME_KEY in components/theme-toggle.tsx.
 */
const THEME_SCRIPT = `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        // The script below writes to this element's class list before React
        // hydrates, which is exactly the mismatch this suppresses.
        <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
            <head>
                <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
            </head>
            <body className="min-h-screen bg-neutral-50 font-sans text-neutral-900 antialiased">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
