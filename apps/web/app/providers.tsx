"use client";

import type { ReactNode } from "react";
import { CopilotKitProvider } from "@copilotkit/react-core/v2";
import { MotionConfig } from "motion/react";

export function Providers({ children }: { children: ReactNode }) {
    return (
        <MotionConfig reducedMotion="user">
            <CopilotKitProvider runtimeUrl="/api/copilotkit">{children}</CopilotKitProvider>
        </MotionConfig>
    );
}
