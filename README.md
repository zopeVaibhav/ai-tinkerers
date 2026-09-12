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

| Surface        | Framing  | Renders                               | Sends today                  | Records decisions      |
| -------------- | -------- | ------------------------------------- | ---------------------------- | ---------------------- |
| Slack thread   | lead     | full Block Kit card, modals, timeline | acknowledge, supersede, note | yes, by talking in one |
| Telegram group | engineer | one line, one decision, two buttons   | acknowledge                  | no                     |
| Web            | both     | canvas, both framings side by side    | acknowledge, supersede, note | no                     |

`resolve` is in the table in `core/permissions` for Slack and web but no control
sends it — superseding is what resolves a conflict. `reframe` is in no row at
all: the agent writes framings through `persist`, not `act`, because no window
produced it.

Two separate axes, easy to confuse. **Framing** is how the agent words the same
facts for that window. **Sends today** is what that window is physically able to
produce — Slack has modals, so it can carry the text superseding needs; a
Telegram callback is 64 bytes with nowhere to type. Neither axis knows who is
looking: two people in one thread share one window and have identical
capability.

## Rules that keep the design honest

1. Nothing travels sideways. No Slack-to-Telegram wire. Every surface talks only
   to the object.
2. Every inbound event is normalised into one `Action` before it touches the store,
   and validated on the way in — `parseAction` rejects a shape the reducer would
   have crashed on.
3. Capability belongs to the window, not the person — keyed on `Surface`, never on
   seniority. Enforced twice: the renderer does not draw the control, and `act()`
   refuses the action before it reaches the store.
4. The subscription table maps one object id to every live view of it.
5. Renderers are pure functions. Object in, that platform's markup out. Never a
   model call.

## The agent

Two jobs, both text-only: read a thread into a structured claim, and write the
same facts once per framing. It never touches fan-out,
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
