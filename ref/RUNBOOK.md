# Runbook

How to run and test this yourself. No help needed.

## Start

```bash
cd <repo root>
bun install
bun run generate          # Prisma client, after any schema change
bun run db:push           # push schema to whatever DATABASE_URL points at
bun run dev
```

Starts both: web on `http://localhost:5100`, server on `http://localhost:5101`
(`SERVER_PORT` in `.env`, default 5101).

**Which database.** `DATABASE_URL` in `.env` decides. Two options:

- **Remote** — a Prisma Postgres URL. Nothing to start. Shared with whoever else
  holds that URL, so `db:clear` wipes their rows too.
- **Local** — `docker compose up -d` brings up Postgres on `:5433`, then set
  `DATABASE_URL=postgres://shared:shared@localhost:5433/shared_object` and
  `bun run db:push`.

Watch the terminal. You should see:

```
server on http://localhost:5101
slack connected
telegram connected
```

A surface that prints nothing is switched off because its credentials are
missing from `.env`. See `ENABLED` in `apps/server/src/config/env.ts`.

Stop with `Ctrl+C`.

## Check it is alive

```bash
curl -s http://localhost:5101/health
```

Expect `{"ok":true,"surfaces":{"slack":true,"telegram":true,"agent":true}}`.
Any `false` means that surface's credentials are missing from `.env`.

## What this is

Every conversation thread gets its own agent. It records what its room decided,
and when two rooms decide opposite things about the same subsystem, both rooms
get told. Read `ref/PLAN.md` first.

## How an issue gets raised

**Only by talking in Slack.** Nobody fills in a form.

Every message in a channel the bot is in belongs to a thread. Once the typing
stops, that thread's agent re-reads it and decides whether anything was settled.
A bare channel with no threading counts as one conversation — see the `message`
handler in `apps/server/src/adapters/slack.ts`.

The other two surfaces cannot originate anything:

| Surface        | Can raise an issue | Why                                                         |
| -------------- | ------------------ | ----------------------------------------------------------- |
| Slack          | yes                | the only intake path                                        |
| Telegram group | no                 | `callback_query` only — buttons, no message handler         |
| Web            | no                 | reads `/stream`, acts on `/conflicts/:id/action`, no intake |

To raise one without Slack, write the decision straight into the store — see
[Checking it without Slack](#checking-it-without-slack).

## The full test, start to finish

1. Open `http://localhost:5100`, put your name in the top-right box.
2. Open `#shared-object` in Slack. Scroll to the bot's card.
3. Open the Telegram group. Scroll to the bot's message.
4. Reset to a clean state:

    ```bash
    bun run db:clear
    ```

    This deletes rows directly and does **not** fan out — `onChange` never
    fires, so nothing re-renders. Refresh the web page, and delete the stale
    Slack and Telegram cards by hand. They now point at conflict ids that no
    longer exist.

5. In Slack, have two channels decide opposite things about the same subsystem —
   one says hard-fail on payment timeout, the other says retry silently. Each
   takes a few seconds after the typing stops.
6. When the clash is found, check all three say different things:
    - Telegram — a decision, terse, for a phone
    - Slack — status, owner, what is blocked
    - Web — both framings side by side
7. In Slack click **Acknowledge**, then **Supersede**, pick a winner, submit.
8. On your phone, the Telegram card follows in place. It can only acknowledge.
9. Watch the losing decision go grey in the **Recorded decisions** tab.

If every step moved all three surfaces, the whole thing works.

## Things that look broken but are not

**"Nothing happened."** Cards update in place. They never bump or re-notify.
You are probably looking at the bottom of the channel while the card is higher up.

**A warning triangle on the Slack buttons.** Nothing is connected to the socket.
Start the server.

**Telegram went silent after changing group settings.** Telegram upgraded the
group to a supergroup and the chat id changed. Send a message in the group, read
the new id from the terminal (`telegram chat seen: id=...`), and put it in `.env`
as `TELEGRAM_CHAT_ID`.

**A button did nothing.** Check the terminal. Two lines mean it was deliberate,
and both are printed by `act()` in `apps/server/src/actions.ts` before anything
is written:

- `refused <action> from <surface>: that surface cannot produce it` — that
  window has no way to originate it
- `ignored stale <action> from <name>` — someone already moved the object past
  that step

A third line means it worked:

- `superseded <thread> (<action>) in favour of <thread>`

**The agent ignores everything in a channel.** Two causes. Either the app is
missing `channels:history` / `channels:read`, or the bot event `message.channels`
is not subscribed under Event Subscriptions. Scopes alone are not enough.

**The agent read the thread and recorded nothing.** That is the normal case. It
only records when someone states what the system should do and the claim fits the
closed vocabularies in `packages/types/src/enums.ts`. Still discussing means no
decision.

**Piles of old cards.** `db:clear` does not retract anything already posted.
Every card from before the last clear is dead. Delete them by hand.

## Your own sandbox

Two people cannot share a bot. Telegram allows one poller per token; Slack sends
each event to one socket connection. Whoever connected last wins, at random.

Each developer needs:

1. Their own bot — `/newbot` in BotFather, own token
2. Their own Telegram group with that bot in it
3. Their own Slack channel, with the app invited
4. Their own `.env` holding those values

The shared channel and group are for demos only, run from one machine. The same
goes for a remote `DATABASE_URL` — one clear wipes it for everyone on it.

## Checking it without Slack

```bash
bun run db:clear
bun run --filter server check:detection
```

Twelve assertions covering the whole lifecycle: a lone decision clashes with
nothing, a second room disagrees and produces exactly one conflict, re-running
detection makes no duplicate, acknowledging moves it out of open, a phone cannot
leave a note, superseding resolves it and marks the losing claim superseded, a
settled clash is never found again, and a second clash on another subsystem
stands on its own.

It writes real rows. Run `db:clear` after it, not just before.

If any line says FAIL, stop and read it before touching Slack.

## The four states every surface must render

Check all of these before filming. `bun run db:clear` between each.

1. **Nothing recorded** — empty registry, both tabs
2. **One decision, no clash** — the Recorded decisions tab has a row, no cards anywhere
3. **Conflict open** — a card in both Slack rooms, one in the Telegram group, the
   Contradictions tab filled, Acknowledge available
4. **Conflict resolved** — every card shows the resolution and who made it, no
   buttons, and the losing decision greyed out as superseded

## Useful commands

```bash
# open contradictions
curl -s http://localhost:5101/conflicts | python3 -m json.tool

# every decision on record
curl -s http://localhost:5101/decisions | python3 -m json.tool

# browse the database
bun run db:studio

# act on a conflict
curl -X POST http://localhost:5101/conflicts/<id>/action -H 'Content-Type: application/json' \
  -d '{"type":"acknowledge","by":"vaibhav"}'

# wipe everything and start clean between takes
bun run db:clear

# seed the state before a clash — one room has decided, nobody has disagreed
bun run db:seed

# full lifecycle check, no Slack needed
bun run --filter server check:detection

# checks that must pass before pushing
bun run typecheck
bun run test
bun run format
```

Every route the server has: `GET /health`, `GET /conflicts`, `GET /decisions`,
`GET /stream`, `POST /conflicts/:id/action`.

## Action types

`acknowledge` · `resolve` · `supersede` · `note` · `reframe`

Each needs `by`. `resolve` needs `resolution`, `supersede` needs `winner` (`a` or
`b`) and `note`, `note` needs `text`. `reframe` is written by the agent and no
window owns it.

Who may do what — keyed on the **surface**, never on the audience:

|                | acknowledge | resolve | supersede | note |
| -------------- | ----------- | ------- | --------- | ---- |
| Slack          | yes         | yes     | yes       | yes  |
| Web            | yes         | yes     | yes       | yes  |
| Telegram group | yes         | no      | no        | no   |

The phone cannot type, so it cannot supersede or leave a note. Both the renderer
and the server enforce that — a refused action prints
`refused <action> from <surface>: that surface cannot produce it`. Source of
truth is `ALLOWED` in `packages/core/src/permissions.ts`.
