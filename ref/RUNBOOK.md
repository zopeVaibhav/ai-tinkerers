# Runbook

How to run and test this yourself. No help needed.

## Start

```bash
cd /Users/vaibhav_zope/utility/ai-tinkers
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

**A button did nothing.** Check the terminal for `ignored stale ...`. That is
correct — someone else already moved the object past that step.

**Piles of old cards.** Every card from before the last `.state.json` reset is
dead. Delete them; only the newest is registered.

## Useful commands

```bash
# what the object currently holds
python3 -c "import json;print(json.dumps(json.load(open('.state.json'))['objects']['demo'],indent=2))"

# start over
curl -X POST http://localhost:5101/reset

# force brand new cards on every surface
rm .state.json    # then restart

# drive it from the terminal instead of clicking
curl -X POST http://localhost:5101/action -H 'Content-Type: application/json' \
  -d '{"type":"acknowledge","by":"vaibhav"}'

# checks that must pass before pushing
bun run typecheck
bun run format
```

## Action types

`intake` · `acknowledge` · `propose` · `approve` · `reject` · `resolve` · `note` · `reframe`

Each needs `by`. `intake` also needs `what`, `severity`, `affected`.
`propose` needs `fix`. `reject` needs `reason`. `note` needs `text`.
