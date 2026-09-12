# Shared object

One live object, rendered natively inside every app each person already uses.
Change it anywhere, it updates everywhere.

The product is a **contradiction registry**. Every conversation thread gets an
agent. The agent writes what that thread decided into a shared registry, and
when two threads decide opposite things about the same subsystem, both threads
get told — each in the wording its own room needs.

## Layout

```
apps/web          Next.js 16 — registry list and conflict detail
apps/server       Bun + Express 5 — repository, fan-out, adapters, agent
packages/core     pure: reducer, guard, permissions, renderers (no IO, no model calls)
packages/database Prisma schema and client (Postgres)
packages/types    shared enums and contracts
```

## Setup

Copy `.env.example` to `.env` and fill it in. Each surface stays disabled until
its credentials are present, so the server boots either way — `GET /health`
reports which are live.

**Database.** `DATABASE_URL` decides, and nothing warns you which one you are
pointed at. Check before running anything destructive.

- **Hosted** — a Prisma Postgres URL shared by the team. Nothing to start, and
  `db:clear` wipes everyone's rows, not just yours.
- **Local** — `docker compose up -d` brings up Postgres on `:5433`, then set
  `DATABASE_URL=postgresql://shared:shared@localhost:5433/shared_object` and run
  `bun run db:push`.

The Prisma CLI reads that same root `.env` through
`packages/database/prisma.config.ts`, so `db:push` and `db:studio` hit whichever
database you are pointing at.

**Slack** needs:

- bot scopes `chat:write`, `app_mentions:read`, `channels:history`, `channels:read`
- Socket Mode on, Interactivity on
- bot events subscribed: `app_mention` and `message.channels`

Scopes alone are not enough — without the `message.channels` event subscription
the agent never sees a thread. The bot only reads channels it has been invited
to.

**Model.** Any OpenAI-compatible endpoint. The agent caps every call at 1024
output tokens, because OpenRouter bills a request against the ceiling it is
allowed to reach rather than the reply it produces, and an uncapped call is
refused on the ceiling alone. Both prompts return small JSON, so the cap is
never the thing that truncates an answer.

## Commands

```bash
bun install
bun run generate       # prisma generate, after any schema change
bun run db:push        # sync schema to the database in .env
bun run dev            # web on :5100, server on :5101
bun run db:seed        # dev fixture: one fabricated conflict
bun run db:demo        # demo backdrop: settled history, no open conflicts
bun run db:clear       # wipe every row, between takes
bun run db:studio      # prisma studio
bun run typecheck
bun run test
bun run format
```

On a healthy start the terminal prints `server on http://localhost:5101`,
`slack connected`, `telegram connected`. A surface that prints nothing is
switched off because its credentials are missing — see `ENABLED` in
`apps/server/src/config/env.ts`.

`db:seed` and `db:demo` are different tools. `db:seed` sets up the state just
before a clash, so the real path is what produces one. `db:demo` fills the
registry with settled history — resolved conflicts and standing claims — so the
filters and the search box have something to work on, and it deliberately leaves
`payments/gateway_timeout` untouched for a conflict raised live.

Neither `db:clear` nor the seeds fan out. `onChange` never fires, so nothing
re-renders: refresh the web page and delete stale Slack and Telegram cards by
hand, because they point at conflict ids that no longer exist.

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

## How an issue gets raised

**Only by talking in Slack.** Nobody fills in a form. Every message in a channel
the bot is in belongs to a thread; once the typing stops, that thread's agent
re-reads it and decides whether anything was settled. A bare channel with no
threading counts as one conversation — see the `message` handler in
`apps/server/src/adapters/slack.ts`.

The other two surfaces cannot originate anything. Telegram handles
`callback_query` only — buttons, no message handler. Web reads `/stream` and
acts on `/conflicts/:id/action`, with no intake path.

The agent recording nothing is the normal case. It only records when someone
states what the system should do _and_ the claim fits the closed vocabularies in
`packages/types/src/enums.ts`. Still discussing means no decision.

## Rules that keep the design honest

1. Nothing travels sideways. No Slack-to-Telegram wire. Every surface talks only
   to the object.
2. Every inbound event is normalised into one `Action` before it touches the
   store, and validated on the way in — `parseAction` rejects a shape the reducer
   would have crashed on.
3. Capability belongs to the window, not the person — keyed on `Surface`, never
   on seniority. Enforced twice: the renderer does not draw the control, and
   `act()` refuses the action before it reaches the store.
4. The subscription table maps one object id to every live view of it.
5. Renderers are pure functions. Object in, that platform's markup out. Never a
   model call.

## The agent

Two jobs, both text-only: read a thread into a structured claim, and write the
same facts once per framing. It never touches fan-out, transport or the
subscription table — those stay deterministic. A failed model call logs and
skips; the rest keeps working.

## Actions

`acknowledge` · `resolve` · `supersede` · `note` · `reframe`

Each needs `by`. `resolve` needs `resolution`, `supersede` needs `winner`
(`a` or `b`) and `note`, `note` needs `text`. `reframe` is written by the agent
and no window owns it.

Who may do what — keyed on the **surface**, never on the audience:

|                | acknowledge | resolve | supersede | note |
| -------------- | ----------- | ------- | --------- | ---- |
| Slack          | yes         | yes     | yes       | yes  |
| Web            | yes         | yes     | yes       | yes  |
| Telegram group | yes         | no      | no        | no   |

The phone cannot type, so it cannot supersede or leave a note. Source of truth is
`ALLOWED` in `packages/core/src/permissions.ts`.

Routes: `GET /health`, `GET /conflicts`, `GET /decisions`, `GET /stream`,
`POST /conflicts/:id/action`.

## Testing it

Without Slack, the whole lifecycle in one command:

```bash
bun run db:clear
bun run --filter server check:detection
```

Twelve assertions: a lone decision clashes with nothing, a second room disagrees
and produces exactly one conflict, re-running detection makes no duplicate,
acknowledging moves it out of open, a phone cannot leave a note, superseding
resolves it and marks the losing claim superseded, a settled clash is never found
again, and a second clash on another subsystem stands on its own. It writes real
rows, so run `db:clear` afterwards too.

With all three surfaces, end to end:

1. Open `http://localhost:5100` and put your name in the top-right box. Open the
   Slack channel and the Telegram group alongside it.
2. `bun run db:clear`, then refresh the web page and delete the stale cards.
3. In Slack, have two channels decide opposite things about the same subsystem —
   one hard-fails on payment timeout, the other retries silently. Each takes a
   few seconds after the typing stops.
4. When the clash is found, check all three say different things: Telegram terse
   and decision-shaped, Slack with status and owner and what is blocked, web with
   both framings side by side.
5. In Slack, **Acknowledge**, then **Supersede**, pick a winner, submit. The
   Telegram card follows in place, and the losing decision goes grey in the
   **Recorded decisions** tab.

Four states worth checking before filming, with `db:clear` between each: nothing
recorded, one decision with no clash, a conflict open, a conflict resolved.

## Things that look broken but are not

**"Nothing happened."** Cards update in place. They never bump or re-notify, so
you are probably looking at the bottom of the channel while the card sits higher
up.

**A warning triangle on the Slack buttons.** Nothing is connected to the socket.
Start the server.

**Telegram went silent after a group settings change.** Telegram upgraded the
group to a supergroup and the chat id changed. Send a message in the group, read
the new id from the terminal (`telegram chat seen: id=...`), and put it in `.env`
as `TELEGRAM_CHAT_ID`.

**A button did nothing.** Check the terminal. Two of these lines mean the refusal
was deliberate, both printed by `act()` in `apps/server/src/actions.ts` before
anything is written:

- `refused <action> from <surface>: that surface cannot produce it` — that window
  has no way to originate it
- `ignored stale <action> from <name>` — someone already moved the object past
  that step

`superseded <thread> (<action>) in favour of <thread>` means it worked.

## Working as a team

Telegram allows exactly one poller per bot token, and Slack delivers each Socket
Mode event to exactly one connection. Two people running the server against the
same tokens will steal each other's events, whatever the database says.

So each developer gets their own sandbox: their own bot from BotFather, their own
Telegram group, their own Slack channel, and their own `.env` holding those
values. Same code, different credentials. Keep one shared channel and bot for
demos, used by one machine at a time.

The database is the exception. Every developer points `DATABASE_URL` at the same
hosted Postgres, so an issue raised on one machine is already there when another
runs `bun run dev`. Ask a teammate for the URL and paste it into your own `.env`;
it is not in the repository and must not be. One person runs `bun run db:push`
after a schema change and tells the others to run `bun run generate`, because a
push rewrites the shared schema for everyone.
