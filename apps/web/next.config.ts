import type { NextConfig } from "next";

const config: NextConfig = {
    transpilePackages: ["@repo/core", "@repo/types"],
};

export default config;
