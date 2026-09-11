# Runbook

How to run and test this yourself. No help needed.

## Start

```bash
cd /Users/vaibhav_zope/utility/ai-tinkers
docker compose up -d     # Postgres on :5433, first time only
bun run db:push          # after any schema change
bun run dev
```

Starts both: web on `http://localhost:5100`, server on `http://localhost:5101`.

Watch the terminal. You should see:

```
server on http://localhost:5101
slack view reattached ts=...
telegram view reattached message_id=...
```

`registered` instead of `reattached` means it posted a brand new card. That
happens after `.state.json` is deleted, or if the old card was deleted.

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

## Three ways to raise an issue

| Where       | How                                                 |
| ----------- | --------------------------------------------------- |
| Slack       | `@Shared Object` followed by the customer's message |
| Telegram DM | message the bot directly — you are the customer     |
| Web         | the dashed **Inbound customer message** box         |

The Telegram group cannot raise issues. Engineers there tap, they do not file.

## The full test, start to finish

1. Open `http://localhost:5100`, put your name in the top-right box.
2. Open `#shared-object` in Slack. Scroll to the bot's card.
3. Open the Telegram group. Scroll to the bot's message.
4. Reset to a clean state:

    ```bash
    curl -X POST http://localhost:5101/reset
    ```

    All three go back to "Nothing reported yet". They change **in place** — they
    do not bump to the bottom and do not notify. Keep them on screen.

5. On the web page, paste a messy customer message into **Inbound customer
   message** and hit **Hand to agent**. Takes a few seconds.
6. Check all three now say different things:
    - Telegram — a decision, terse, for a phone
    - Slack — status, owner, what is blocked
    - Web — all three framings side by side
7. In Slack click **Take it**, then **Propose fix**, type something, submit.
8. On your phone, tap **Approve**. Slack and web both flip to Approved.
9. Click **Resolve** anywhere. All three finish.

If every step moved all three surfaces, the whole thing works.

## Things that look broken but are not

**"Nothing happened."** Cards update in place. They never bump or re-notify.
You are probably looking at the bottom of the channel while the card is higher up.

**A warning triangle on the Slack buttons.** Nothing is connected to the socket.
Start the server.

**Telegram went silent after changing group settings.** Telegram upgraded the
group to a supergroup and the chat id changed. Send
`/start@paavgang_shared_object_bot` in the group, read the new id from the
terminal (`telegram chat seen: id=...`), and put it in `.env` as
`TELEGRAM_CHAT_ID`.

**A button did nothing.** Check the terminal. Three lines mean it was deliberate:

- `ignored stale <action>` — someone already moved the object past that step
- `refused <action> from <audience>: not allowed on that surface` — that window
  has no right to do it
- `refused approve from <name>: cannot approve own proposal` — get someone else
  to sign off

**The agent ignores everything in a channel.** Two causes. Either the app is
missing `channels:history` / `channels:read`, or the bot event `message.channels`
is not subscribed under Event Subscriptions. Scopes alone are not enough.

**The agent read the thread and recorded nothing.** That is the normal case. It
only records when someone states what the system should do and the claim fits the
closed vocabularies in `packages/types/src/enums.ts`. Still discussing means no
decision.

**Piles of old cards.** Every card from before the last `.state.json` reset is
dead. Delete them; only the newest is registered.

## Your own sandbox

Two people cannot share a bot. Telegram allows one poller per token; Slack sends
each event to one socket connection. Whoever connected last wins, at random.

Each developer needs:

1. Their own bot — `/newbot` in BotFather, own token
2. Their own Telegram group with that bot in it
3. Their own Slack channel, with the app invited
4. Their own `.env` holding those values

The shared channel and group are for demos only, run from one machine.

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
# every issue and its status
curl -s http://localhost:5101/issues | python3 -m json.tool

# browse the database
bun run db:studio

# raise an issue from the terminal
curl -X POST http://localhost:5101/report -H 'Content-Type: application/json' \
  -d '{"text":"checkout hangs then errors","from":"vaibhav"}'

# act on one
curl -X POST http://localhost:5101/issues/<id>/action -H 'Content-Type: application/json' \
  -d '{"type":"acknowledge","by":"vaibhav"}'

# wipe everything and start clean between takes
bun run db:clear

# seed the state before a clash — one room has decided, nobody has disagreed
bun run db:seed

# full lifecycle check, no Slack needed
bun run --filter server check:detection

# checks that must pass before pushing
bun run typecheck
bun run format
```

## Action types

`acknowledge` · `resolve` · `supersede` · `note` · `reframe`

Each needs `by`. `resolve` needs `resolution`, `supersede` needs `winner` (`a` or
`b`) and `note`, `note` needs `text`. `reframe` is written by the agent and no
window owns it.

Who may do what:

|                           | acknowledge | resolve | supersede | note |
| ------------------------- | ----------- | ------- | --------- | ---- |
| Slack and web (lead)      | yes         | yes     | yes       | yes  |
| Telegram group (engineer) | yes         | no      | no        | no   |

The phone cannot type, so it cannot supersede or leave a note. Both the renderer
and the server enforce that — a refused action prints `refused ... not allowed on
that surface`.
