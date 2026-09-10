# Shared object

One live object, rendered natively on every surface each person already uses.
Change it anywhere, it updates everywhere. See `IDEA.md` for the full brief.

## Layout

```
apps/web        Next.js 16 — the canvas surface
apps/server     Bun + Express 5 — store, subscription table, fan-out, adapters
packages/core   pure: object schema, reducer, renderers (no IO, no model calls)
packages/types  shared contracts
```

## Rules that keep the design honest

1. Nothing travels sideways. No Slack-to-Telegram wire. Every surface talks only to the object.
2. Every inbound event is normalised into one `Action` before it touches the store.
3. The subscription table maps one object id to every live view of it.
4. Renderers are pure functions. Object in, that platform's markup out. Never a model call.

## Commands

```bash
bun install
bun run dev          # turbo: web on :5100, server on :5101
bun run typecheck
bun run format
```

## Setup

Copy `.env.example` to `.env` and fill it in. Slack and Telegram stay disabled
until their credentials are present, so the server boots either way.
