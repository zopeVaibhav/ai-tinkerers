import { fileURLToPath } from "node:url";
import { config } from "dotenv";
import { PrismaClient } from "../generated/client";

// There is one .env, at the repo root. Anything running from inside this
// package — turbo tasks, prisma scripts — has a different cwd and would
// otherwise start with no DATABASE_URL at all.
config({ path: fileURLToPath(new URL("../../../.env", import.meta.url)) });

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export * from "../generated/client";
