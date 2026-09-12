# VIDEO.md — the two minutes

Team PaavGang · AI Tinkerers "Agents, Everywhere" · Pune
Last updated: 2026-09-12

Read this and `ref/PLAN.md` before recording. The demo is not improvised; every
line below is typed verbatim because the vocabulary is closed and improvised
wording comes back as "nothing decided".

---

## 1. The one rule

**Two minutes is a ceiling, not a target.** Going over deducts points. A tight
100 seconds beats a rambling 125.

Everything below fits 120 seconds with the waits included. If a take runs long,
cut from the talking, never from the moment the conflict lands.

---

## 2. What we are showing

Two Slack channels having separate conversations. Nobody is in both. Each thread
has its own agent. When both rooms decide opposite things about the same
subsystem, both rooms get told — plus a phone and a web page — within seconds,
and nobody clicked anything.

The claim to land, in one sentence: **a chatbox has one room; this needs many.**

---

## 3. Before you press record

Run through this list. Every item has burned someone.

1. `bun run db:clear` — a registry with old conflicts in it makes the new one
   ambiguous on screen.
2. `bun run dev` — web on :5100, server on :5101.
3. Open the web page and confirm the connection indicator reads **live**, not
   `dropped` in red. A red word in frame reads as broken software.
4. Post one throwaway message in each channel and confirm the server logs
   `slack message seen`. If it does not, the bot is not in the channel.
5. Confirm the copilot sidebar renders the conflict **card**, not a paragraph.
   Ask it `show me the conflict` against a seeded conflict first, then clear the
   database again.
6. Put all four surfaces on screen at once: Slack `#payments-test`, Slack
   `#mobile-test`, the Telegram group on a phone in frame, the web page.
7. Silence notifications on every device. A banner over the conflict card is a
   retake.

---

## 4. Who does what

Three people, three jobs, no swapping mid-take.

| Person   | Job during the take                                                      |
| -------- | ------------------------------------------------------------------------ |
| Aashish  | types in `#payments-test`                                                |
| Himanshu | types in `#mobile-test`, then taps the button on the phone               |
| Vaibhav  | drives the web surface and the copilot, and speaks the voiceover         |

One voice only. Two people narrating sounds like a conference call.

---

## 5. The script

Times are cumulative. The waits are real — the agent only reads a thread once it
has been quiet for four seconds, and the model call takes a few seconds after
that.

### 0:00–0:12 — the problem

No typing yet. Both channels visible.

> Two teams. Two Slack channels. Nobody is in both rooms.

### 0:12–0:32 — `#payments-test` decides

Aashish types, one message at a time:

```
the gateway keeps timing out under load
```

```
then we hard-fail on timeout. better to show an error than take money we can't confirm
```

Stop typing. Over the wait:

> One room just settled a rule. Its agent writes that down.

A grey line appears:

> Recorded · **payments** on `gateway_timeout` → `hard_fail`

Say why nothing else happened:

> Nothing to disagree with yet.

### 0:32–0:52 — `#mobile-test` decides

Himanshu types:

```
the app looks broken when checkout errors, users just close it
```

```
let's retry silently on timeout. three attempts before showing anything
```

Stop typing. Over the wait:

> Different room. Different people. Same subsystem, same condition, opposite
> answer — and neither room knows the other exists.

### 0:52–1:12 — the moment

Four things change at once:

- a conflict card in `#payments-test`
- a conflict card in `#mobile-test`
- one line and two buttons on the phone
- the web registry updates

**Hold the shot. Do not scroll. Do not click.**

> Both rooms just got told. Nobody pressed anything, and no human was in a
> position to notice this.

### 1:12–1:32 — one object, four windows

Himanshu taps **Acknowledge** on the phone.

Every surface changes together. The Slack messages are edited in place, not
reposted.

> One tap on a phone. Same Slack message, edited where it already was. These are
> not synced copies — it is one object with four windows onto it.

### 1:32–1:50 — the agent is in it too

Vaibhav opens the copilot sidebar and types:

```
show me the conflict
```

The live card renders inside the chat, with a working button.

> The agent hands back the real card, not a description of it. And when it acts,
> it goes through the same permission check a human does.

### 1:50–2:00 — close

> Everyone else collapses many apps into one place and asks people to move.
> People don't move. We go the other way. A chatbox has one room. This needs
> many.

---

## 6. The dead air problem

From the last keystroke to the card appearing is roughly eight to ten seconds:
four seconds of quiet, then the model call. That happens twice. Twenty seconds
of a two-minute video is a lot of nothing.

Three ways to handle it, in order of preference:

1. **Talk over it.** The voiceover lines in section 5 are sized to fill the wait.
   This is the plan.
2. **Cut it in post.** A hard cut across the wait is honest — nothing is being
   faked, only trimmed. Say "a few seconds later" if the cut is visible.
3. **Do not lower `QUIET_MS`.** It exists so the agent does not read
   half-finished conversations. Shortening it for the video is how you get a
   false extraction on camera.

---

## 7. Things that will go wrong

**"Nothing decided yet" in the logs.** The model did not see a settled rule. Type
the exact lines above; they map cleanly onto the closed vocabulary. Do not
improvise wording during a take.

**No card appears.** Check the server log for `conflict found`. If the decision
recorded but no conflict followed, the two claims did not actually differ —
usually because one thread was read twice and superseded itself.

**Cards update silently.** They never bump or re-notify. This is expected
behaviour, not a bug. Keep them on screen or it looks like nothing happened.

**The connection says `dropped`.** Reload the web page before the take, not
during it.

**Someone types in the wrong channel.** Start over. Editing around it costs more
than a retake.

---

## 8. What not to demo

**Do not use an iOS versus Android example.** It invites the question "are those
really in conflict, or just two apps that are allowed to differ?" That is a fair
question with a good answer, and answering it costs thirty seconds you do not
have. Keep it for Q&A.

**Do not show more than two channels.** A third channel produces one conflict
object per disagreeing pair, so the popular channel collects several cards. True,
correct, and confusing on camera.

**Do not seed fake chat history.** Slack timestamps everything "a few minutes
ago" anyway, and the whole point is that the demo is typed live.

---

## 9. Sponsors to name

Say these out loud or put them on a closing card. Do not list them all in the
voiceover — it eats seconds and sounds like a sponsor reel.

Named in the video: **CopilotKit** (the web surface, the runtime, generative UI).

Named in the submission text instead: OpenAI, OpenRouter, and anything else that
landed before the deadline.

---

## 10. Recording order

Record the demo take first, before any talking-head footage. If time runs out,
a demo with no intro still scores; an intro with no demo scores nothing.

Do a full rehearsal take and watch it back before the real one. The first take
is always bad and always longer than it felt.

Upload unlisted to YouTube or shareable on Loom, then paste the link into
`ref/submission.md`.
