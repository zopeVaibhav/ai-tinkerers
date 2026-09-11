# Shared object

One live object, rendered natively inside every app each person already uses.
Change it anywhere, it updates everywhere. See `ref/IDEA.md` for the full brief
and `ref/RUNBOOK.md` for how to run and test it.

## Layout

```
apps/web          Next.js 16 — registry list and conflict detail
apps/server       Bun + Express 5 — repository, fan-out, adapters, agent
packages/core     pure: reducer, guard, permissions, renderers (no IO, no model calls)
packages/database Prisma schema and client (Postgres)
packages/types    shared enums and contracts
```

The product is a **contradiction registry**: every thread gets an agent, it
writes what the thread decided into a shared registry, and when two threads
decide opposite things about the same subsystem both threads get told. Read
`ref/PLAN.md` before changing anything.

## Surfaces

| Surface        | Audience | Renders                               | Raises issues             |
| -------------- | -------- | ------------------------------------- | ------------------------- |
| Slack channel  | lead     | full Block Kit card, modals, timeline | yes, via `@mention`       |
| Telegram group | engineer | one line, one decision, two buttons   | no                        |
| Telegram DM    | customer | one sentence, no controls             | yes, by messaging the bot |
| Web            | lead     | editable canvas, all three framings   | yes, via the inbound box  |

## Rules that keep the design honest

1. Nothing travels sideways. No Slack-to-Telegram wire. Every surface talks only
   to the object.
2. Every inbound event is normalised into one `Action` before it touches the store.
3. Capability belongs to the window, not the person. Enforced twice: the renderer
   does not draw the control, and `apply()` refuses the action.
4. The subscription table maps one object id to every live view of it.
5. Renderers are pure functions. Object in, that platform's markup out. Never a
   model call.

## The agent

Three jobs, all text-only: read an unstructured report into facts, write the same
facts once per audience, and propose the next move. It never touches fan-out,
transport or the subscription table — those stay deterministic. A failed model
call logs and skips; the rest keeps working.

## Commands

```bash
bun install
bun run generate       # prisma generate
bun run db:push        # sync schema to the database in .env
bun run dev            # web on :5100, server on :5101
bun run db:seed        # dev fixture: one fabricated conflict
bun run db:studio      # prisma studio
bun run typecheck
bun run format
```

`docker compose up -d` still brings up a local Postgres on :5433 if you want to
work against a throwaway database instead of the shared one.

## Working as a team

Telegram allows exactly one poller per bot token, and Slack delivers each Socket
Mode event to exactly one connection. Two people running the server against the
same tokens will steal each other's events, whatever the database says.

So each developer gets their own sandbox: their own Telegram bot from BotFather,
their own group, and their own Slack channel. Same code, different `.env`. Keep
one shared channel and bot for demos, used by one machine at a time.

The database is the exception. Every developer points `DATABASE_URL` at the same
hosted Postgres, so an issue raised on one machine is already there when another
runs `bun run dev`. Ask a teammate for the URL and paste it into your own `.env`;
it is not in the repository and must not be. One person runs `bun run db:push`
after a schema change and tells the others to run `bun run generate`, because a
push rewrites the shared schema for everyone.

Migrations from a local `.env`: the Prisma CLI reads that same root `.env`
through `packages/database/prisma.config.ts`, so `db:push` and `db:studio` hit
whichever database you are pointing at. Check before you push.

## Setup

`DATABASE_URL` may point at the local Docker Postgres or at a hosted one — check
which before running anything destructive.

Copy `.env.example` to `.env` and fill it in. Each surface stays disabled until
its credentials are present, so the server boots either way — check
`GET /health` to see which are live.

Slack needs:

- bot scopes `chat:write`, `app_mentions:read`, `channels:history`, `channels:read`
- Socket Mode on, Interactivity on
- bot events subscribed: `app_mention` and `message.channels`

The bot only reads threads in channels it has been invited to.
