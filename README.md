# Shared object

One live object, rendered natively inside every app each person already uses.
Change it anywhere, it updates everywhere. See `ref/IDEA.md` for the full brief
and `ref/RUNBOOK.md` for how to run and test it.

## Layout

```
apps/web        Next.js 16 — the canvas surface
apps/server     Bun + Express 5 — store, subscription table, fan-out, adapters, agent
packages/core   pure: object, reducer, guard, permissions, renderers (no IO, no model calls)
packages/types  shared enums and contracts
```

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
bun run dev          # turbo: web on :5100, server on :5101
bun run typecheck
bun run format
```

## Setup

Copy `.env.example` to `.env` and fill it in. Each surface stays disabled until
its credentials are present, so the server boots either way — check
`GET /health` to see which are live.

Slack needs bot scopes `chat:write` and `app_mentions:read`, Socket Mode on,
Interactivity on, and the bot event `app_mention` subscribed.
