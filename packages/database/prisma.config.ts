import { config } from "dotenv";
import { defineConfig } from "prisma/config";

// The Prisma CLI runs with this package as its working directory, so it never
// finds the single .env at the repo root. Load it explicitly, the same file the
// server reads, so `db:push`, `db:migrate` and `studio` all talk to the same
// database as `bun run dev`.
config({ path: "../../.env" });

export default defineConfig({
    schema: "prisma/schema.prisma",
});
