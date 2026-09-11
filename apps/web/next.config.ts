import { resolve } from "node:path";
import { config } from "dotenv";
import type { NextConfig } from "next";

// One .env, at the repo root. Next only looks in the app directory, and this
// file runs in Node before the bundler, so it is the right place to widen that.
config({ path: resolve(process.cwd(), "../../.env") });

const nextConfig: NextConfig = {
    transpilePackages: ["@repo/core", "@repo/types"],
};

export default nextConfig;
