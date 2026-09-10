# IDEA.md — single source of truth

Team PaavGang · AI Tinkerers "Agents, Everywhere" · Sat 12 Sep 2026, Pune

Last updated: 2026-09-11

---

## 1. Read this first

**Building:** one shared live object, rendered natively inside every app each person already uses. Change it anywhere, it updates everywhere.

**Not building:** a bot in Slack. A bridge between apps. A unified inbox.

**Status:** practice build running. M0-M3 done and verified on all three surfaces.

| Milestone | State |
|---|---|
| M0 accounts and tunnels | done — Slack Socket Mode, Telegram group, no public URL needed |
| M1 fan-out | done — one action from any surface moves all three |
| M2 real object | done — escalation object, Slack modals, editable web canvas |
| M3 agent | done — intake from raw text, three per-audience framings |
| M4 rough edges | next |

Repo: `github.com/zopeVaibhav/ai-tinkerers` (private), work on `dev`.

**Known behaviour, not a bug:** cards update silently in place. They never bump
or re-notify. Keep them on screen during the demo or it looks like nothing happened.

---

## 2. Problem statement (use this verbatim)

When a team is spread across different apps — one person in Slack, one on their phone in Telegram, one in a web tool, a customer on WhatsApp — someone has to become the wire between them. That person spends their day copying a message out of one app, rewording it, and pasting it into another, then carrying the reply back. It is slow, detail gets lost in every hop, and at the end there is no single place that says what was decided. Existing AI agents do not fix this, because an agent is still just one more chat window that everyone has to come to. We are building the opposite: one shared, live object that holds the whole piece of work, shown to each person natively inside whatever app they are already in. When any one of them changes it, everyone else's view updates in place. Nobody switches apps, nobody copies anything, and the decision lives in one object instead of scattered across three inboxes.

**Short version (submission form, video open):**

> Teams are split across Slack, phones, web tools and customer channels, so one person always ends up as the human copy-paste layer between them. We replace that person with one shared live object that renders natively in every app at once — change it anywhere, and it updates everywhere.

**Pitch line (do not lead with "multiplayer AI" — now marketing noise):**

> Everyone else collapses many apps into one place and asks people to move there. People don't move. We go the other way — work stays in one place, projects out to where each person already is.

---

## 3. Why it scores

Rubric has 4 equal criteria. Three are easy. Innovation is where teams die.

- Score 5 = "surprising new agent pattern whose central value could not be reproduced in a standalone chatbox"
- Score 2 = "the environment mostly serves as a wrapper"

Test: **could ChatGPT with API access do this?**

Here the answer is no. A chatbox is one person, one screen, one conversation. This is many people, many screens, one object. Remove the multi-surface part and the idea does not get worse — it stops existing.

Origin: a CopilotKit dev asked for exactly two things at a session — multi-surface multiplayer design, and someone porting a genuine web application using Block Kit. This answers both.

---

## 4. Prior art — checked, survived

Nobody shipped the mechanism. Everything found is **shared memory, separate views**. Nobody does one object with many live windows.

| Closest thing                  | What it is                                                                 | Why ours is different                                                      |
| ------------------------------ | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Microsoft Loop components      | Same object live in Teams, Outlook, Word. Closest architecturally.         | Microsoft-only. Cannot cross vendors. It is a document, not an agent.      |
| incident.io                    | One incident live in Slack + their web dashboard. Closest shipped product. | Two surfaces, both theirs. No phone, no customer.                          |
| Dust ($40M Series B, May 2026) | "Multiplayer AI", shared workspace, 3,000 orgs. Same problem statement.    | Dust is a place you go to. Ours has no destination.                        |
| GitHub Next "Ace"              | Realtime multiplayer coding agent workspace.                               | Same shape as Dust — one shared place.                                     |
| Beeper, Front, Missive         | Collapse many apps into one inbox for one person.                          | Opposite direction.                                                        |
| NanoClaw / Hermes agent        | One agent across Slack, Telegram, WhatsApp.                                | Explicitly separate session per surface. Shared memory, not shared object. |

**The Q&A landmine.** CopilotKit homepage says Channels gives "same shared state." Docs say otherwise: state is per thread, design is **"one fresh agent per conversationKey"**. No cross-surface object, no documented message editing. Memorize that phrase.

**Three rebuttals to keep loaded:**

1. _Isn't this Loop?_ — One vendor owns both ends. Ours crosses companies that will never integrate.
2. _Doesn't the SDK do this?_ — One fresh agent per conversationKey, state scoped per thread. We built the object and the fan-out.
3. _Isn't this incident.io?_ — Slack plus their dashboard. Ours reaches a phone and a customer.

**Three things must all hold or we are a rebuild of someone:**

1. One object, not synced copies.
2. Across companies that do not integrate.
3. Agent inside it, not a document.

---

## 5. Architecture

Flow, top to bottom, then loop back:

```
  Slack          Telegram        Web app
  Block Kit      2 buttons       canvas
     |               |               |
     +---------------+---------------+
                     |
            Action normalizer
       any tap becomes one action
                     |
             Shared object  <---- Agent
          single source of truth   writes changes
                     |
            Subscription table
           every live view, listed
                     |
     +---------------+---------------+
     |               |               |
  Block Kit      Telegram         Web
  chat.update    editMessageText  push
```

Bottom row rewrites the top row. Same Slack message, same Telegram message. Not new posts.

**Four rules:**

1. **Nothing travels sideways.** No Slack-to-Telegram wire. Every surface talks only to the object. Any code sending a message from one platform to another is a bridge — delete it.
2. **Normalizer flattens everything.** Slack button, Telegram callback, web submit all arrive different. They leave as one action, e.g. `{type: "acknowledge", by: "himanshu"}`. Nothing downstream cares which app it came from.
3. **Subscription table is the actual invention.** `object_id` maps to a list of live views. Slack view = `channel + message_ts`. Telegram view = `chat_id + message_id`. Web view = open connection. Without it you are syncing. With it you are re-rendering.
4. **Renderers are pure functions.** Object in, that platform's markup out. A renderer never knows what happened, only what the object currently is. Break this and surfaces drift.

**Agent sits beside people, not above them.** It writes to the object same as a human tap. No separate code path for "agent did it."

---

## 6. The agent's role

Three jobs. Nothing else.

**1. Intake — turn mess into structure.**
Customer types a paragraph of frustration on WhatsApp. Agent fills the fields: what broke, how bad, which part, what they expect. Plain code cannot do this.

**2. Framing — say the same truth three different ways. THIS IS THE ONE THAT MATTERS.**

- Engineer on Telegram at 11pm: _"Payments timing out, 40 users hit. Roll back deploy 4a91? Yes / No."_
- Lead in Slack: full card — timeline, who is on it, severity, proposed fix, approve button.
- Customer on WhatsApp: _"We've found the cause and a fix is going out. We'll confirm within the hour."_

Same facts. Three audiences. Template cannot do it. Renderer cannot do it. Only a model can.

**3. Drive — propose next move, ask the right person.**
Drafts the fix, drafts the customer reply, sets object to "waiting for approval", puts buttons in front of whoever can say yes. On tap, carries out what it proposed.

**Agent must never touch:** fan-out, subscription table, message updating, transport. All deterministic code, zero AI. Those run on every state change live in front of judges. A model in that path makes the demo a coin flip.

**Object shape:**

```
object = {
  facts:    { what, severity, affected, proposed_fix, status },
  framings: { engineer: "...", lead: "...", customer: "..." },
  timeline: [...]
}
```

Agent writes framings into the object as fields. Renderers stay dumb — Slack renderer reads `framings.lead`, Telegram renderer reads `framings.engineer`. No model call at render time. A framing change is a state change, so it fans out through the same path as a button tap.

**Judge test: rip the AI out, does the demo still work?**
With only jobs 1 and 3 the answer is "mostly yes, worse text" — scores badly. Job 2 makes the answer **no**: without the model, all three screens show the same blob, which defeats being on three screens at all.

Say this out loud: the agent's job is translating one shared truth for readers who need different things from it. That is why it needs a model AND why it needs multi-surface. The two halves justify each other.

---

## 7. Platforms

**Build 3 on the day:**

1. **Slack** — the deep one. Block Kit, buttons, modal, updates in place. The surface the CopilotKit dev asked someone to push hard.
2. **Telegram** — the cheap one. BotFather ~2 min. The "works on a phone" proof.
3. **Web** — the full one. The original that Block Kit is a port of.

**Skip and why:**

- **Discord** — easy but it is a third chat box. Looks like Slack. Costs 30 min, proves nothing new.
- **Teams** — sideloading needs tenant admin. Unreachable admin = lost hour, zero output.
- **WhatsApp** — SDK supports it, but WhatsApp Business API needs Meta business account + number verification. Not same-day reliable. Never on the critical path.

**Two surfaces = death.** Slack card + web dashboard IS incident.io. The phone surface is the proof, not a bonus.

**Future scope (say out loud in video, cheap points):**

- **GitHub pull request as a surface** — PR becomes a channel, review comments and suggestion blocks are the UI. Strongest line available: Vaibhav has 25+ merged PRs in that repo.
- Email, Google Chat, VS Code, voice.

---

## 8. Scenarios this solves

Pattern is the product. Scenario is just what you fill it with.

1. **Customer escalation — RECOMMENDED DEMO.** Customer on WhatsApp, support in Slack, engineer on Telegram. Crosses company boundaries, which no shipped product does.
2. **On-call incident at 2am.** One on phone, one in Slack, one watching a dashboard. Object = incident: status, who acked, what was tried. _Caution: overlaps incident.io._
3. **Approval needing three people.** Deploy, expense, refund over a limit. Object = the approval with three slots. First tap, others see it change.
4. **Client work.** Client on WhatsApp/email, team in Slack, PM in a web tool. Object = the request, original wording attached.
5. **Hiring loop.** Four interviewers, feedback in four DMs. Object = the scorecard.

---

## 9. Roadmap

Hard thing first, deliberately.

**M0 — accounts and tunnels. ~1 hour.**
Slack app with Socket Mode on. Telegram bot from BotFather. Tokens in `.env`.
Trick: Slack Socket Mode and Telegram long polling both work with **no public URL**. No ngrok, no tunnel, no deploy. Removes a whole category of Saturday pain.

**M1 — the counter spike. 2–3 hours. THIS IS THE WHOLE PROJECT.**
Do not build the real thing yet. Build an object with one number and a plus button, shown on all three surfaces.
Press plus on Telegram. Slack card must change **in place** — not post a new message. Web must change too.
Works = project de-risked, everything after is content. Fails = nothing else matters. Find out at hour two, not hour ten.

**M2 — real object and real renderers. 3–4 hours.**
Replace counter with the escalation object. Write three renderers properly.
Gotcha: **Slack rejects input fields in posted messages** (`unsupported type: input`). Anything needing typed input = button opens a modal, modal returns `view_submission`.

**M3 — agent in the loop. 2–3 hours.**
Until now humans changed the object. Now agent does. Writes framings, proposes next step, asks one specific person on their surface. Approval is a state change like any other, so it fans out automatically. This is where it stops being a synced widget.

**M4 — second scenario and rough edges. ~2 hours.**
Run a different object shape through the same engine to prove it is not hardcoded. Then: two people acting at once, a surface offline, Telegram erroring when edited to identical content.

**Practice build total: roughly 10–13 hours.** Spread across the week.

---

## 10. Riskiest unknown — answer this first

**Can `@copilotkit/channels` update a message it already sent?**

SDK is built around one thread, one agent. Ours is one object, many surfaces, edited in place. Different shapes.

- If it exposes a handle to edit a sent message: use it everywhere.
- If not: use the SDK for receiving input and agent plumbing, call raw Slack and Telegram clients for updates.

Either way the state store and subscription table are ours, not the library's. That is fine, and better — the new pattern is the part we wrote.

**Timebox: 45 minutes. Then decide and stop debating.**

**Two known SDK traps:**

- API is `createChannel`, **not** `createBot`. Old name deleted, no compatibility alias. Every blog post and tutorial online still shows the old one. Fails to compile with an error that has zero Google results.
- Slack input blocks only work inside modals (`views.open` / `views.push`), never in `chat.postMessage`.

---

## 11. Hard constraints

- **Real build window: 11:15–15:30 = 4h15m.** Submissions close 15:30.
- **Video is 2 minutes.** Longer deducts points.
- **Project must be net-new during the event.** Libraries and templates allowed. Must be able to say which parts were built when.
- **Slack cannot backdate messages.** No historical `ts` on `chat.postMessage`. Killed 7 earlier ideas.
- **Filter before picking anything:** can the entire demo be generated live by typing during the recording? If no, do not pick it.
- **3 people only.** Any idea needing 4 humans on screen, or the agent guessing "who is the right person" out of 3 candidates, looks like luck not intelligence.
- **Do not seed fake chat history.** Unparallelizable, unjudged, and Slack timestamps it all "4 minutes ago" anyway.

**Submission needs:** project name, description (25+ words), sponsor tool checkboxes, per-person contribution notes, public GitHub repo, social post tagging 10 handles with `#AgentsEverywhere`.

**On practice building before the day:** treat this week's build as a throwaway. Separate repo, do not submit it. Saturday starts a fresh repo. What legitimately carries over: Slack app already created, tokens in hand, architecture decided, generic scaffolding.

---

## 12. Fallback ideas

If the chosen idea dies, these are ranked and still alive.

**Backup A — Contradiction Registry** (strongest fallback)
Every thread gets its own agent, born when the thread starts. Each extracts its thread's decision into a fixed schema `{subsystem, condition, action}` and publishes to a shared registry, which it also reads for conflicts. `#payments` decides hard-fail-on-timeout, `#mobile` decides retry-silently — both threads get a cross-linked conflict notice in seconds.

- Why strong: nobody is in both rooms, so no human and no chatbox can see it. Needs no seeded corpus, no backdating, no fourth person. Entire demo typed live.
- Kill risk: false contradictions. Fix: hard-code the schema to one domain, let AI only fill blanks, do the comparison in plain code. Open-ended fields = last hour lost to prompt tweaking.

**Backup B — Relay (the chat IS the database)**
Agent has no DB, no memory file, no checkpoint. State is a machine-readable trace serialized into the channel thread itself. On camera: kill the process, `rm -rf` its directory, start a cold agent, it reads the channel and resumes — including the pending approval.

- Why strong: every other team _claims_ the environment is essential. This deletes everything else on camera and survives. Best 15 seconds of any candidate.
- Kill risk: mid-tool-call resume. Fix: only resume from a clean pause point, record intent before the call, keep terminal in frame.

**Backup C — Sixth Adapter (GitHub)**
Write a GitHub adapter for `@copilotkit/channels` so a pull request is a channel. Same agent starts in Slack as a Block Kit card, continues into a GitHub PR as review comments and ` ```suggestion ` blocks. Human clicks "Commit suggestion", Slack thread updates in place.

- Leverage: 25+ merged PRs and maintainer standing in that exact repo.
- Kill risk: if the adapter interface is internal you must fork (90-min detour). Timebox source discovery to 45 min. Also a judge can say "an adapter is literally a wrapper" — video must say out loud that _thread identity persisting across surfaces_ is the pattern.

**Parked:** The Tool That Says No (needs paid ChatGPT plan). Retraction Ledger (reads as surveillance). Reaction Capability Grants (a modifier, not a product — best folded in as a control layer).

**Two blind spots nobody reached:** agent as co-editor inside an artifact; voice (zero of 48 candidates used it, and it is the most legible medium for a 2-minute video — but phone number provisioning can eat hours).

---

## 13. Before Saturday

- [ ] Check hackathon portal for prize list and credits package — both unannounced as of 2026-09-11
- [ ] Assign the social post: 10 handles + `#AgentsEverywhere`. Do not leave it for 15:25
- [ ] Answer the riskiest unknown (section 10) — 45 min
- [ ] Finish M0 so Saturday starts with tokens in hand
- [ ] Record practice video at 14:15, not 15:15. First take will be bad

---

## 14. Next action

M0. Create Slack app with Socket Mode enabled. Get Telegram bot token from BotFather. ~1 hour, unblocks everything.
