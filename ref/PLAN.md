# PLAN.md — what we are building and why

Team PaavGang · AI Tinkerers "Agents, Everywhere" · Pune
Last updated: 2026-09-11

This file exists so anyone — including a fresh session with no memory of the
conversation — can pick up the work without re-deriving the reasoning. Read this
before touching an issue.

---

## 1. The idea, in one paragraph

Every conversation thread gets its own agent. That agent reads what the thread
decided, writes it into a shared registry as a structured claim, and reads the
registry back looking for claims that contradict it. When two threads decide
opposite things about the same subsystem, both threads get told — inside the
thread, on the phone of whoever owns each side, and in the web registry — within
seconds of the second decision being made.

Nobody is in both rooms. No human sees the contradiction. No chatbox can either,
because a chatbox has exactly one conversation.

## 2. The scenario that explains everything

Two Slack channels, two conversations, nobody in both.

**11:02 — `#payments`**
Aashish: "the gateway keeps timing out under load"
Vaibhav: "then we hard-fail on timeout, better to show an error than take money
we can't confirm"

The `#payments` thread-agent extracts:
`{ subsystem: payments, condition: gateway_timeout, action: hard_fail }`
Writes it to the registry. No conflict found. Posts a quiet confirmation card.

**11:06 — `#mobile`**
Himanshu: "the app looks broken when checkout errors, users just close it"
Someone: "let's retry silently on timeout, three attempts before showing anything"

The `#mobile` thread-agent extracts:
`{ subsystem: payments, condition: gateway_timeout, action: retry_silently }`
Writes it. Reads the registry. **Same subsystem, same condition, opposite action.**

**11:06 — both threads, at once**

A conflict card appears in `#payments` and in `#mobile`, cross-linked, each
showing the other side's decision and who made it. The on-call engineer's phone
shows one line and two buttons. The web registry shows the pair.

Neither room knew the other existed. Twenty minutes later both changes ship and
payments silently double-charges under load.

That is the whole product.

## 3. Why this, and not what we built first

We spent this session building a multi-surface issue tracker: one shared object
rendered natively in Slack, a Telegram group and the web, updating in place
everywhere. The engine is good. The story was not.

Three honest problems with it:

1. **The sponsor asked for it.** A CopilotKit developer said publicly he wanted
   to see multi-surface multi-player design and a real web app ported to Block
   Kit. Everyone at the hackathon who heard that, read the Channels SDK launch
   post, or asked an LLM what to build lands on the same square. It is the
   crowded answer, not the surprising one.
2. **The agent did nothing.** It parsed an inbound message into fields and
   reworded it three ways. Every actual decision — take it, propose, approve,
   resolve — was a human clicking a button. Strip the model out and the demo
   still runs with worse text. That scores a 2 on innovation, not a 5.
3. **It is an issue tracker.** incident.io, Dust and Front already own that
   shape. Ours had one more surface than theirs.

The Contradiction Registry passes the three tests the tracker failed:

- **Nobody asked for it.** It is not on anyone's roadmap or wish list.
- **It needs the environment.** Many rooms, many people, no overlap. A chatbox
  has one room.
- **The agent acts unprompted.** Nobody clicks anything to find the conflict.

## 4. What survives from the current codebase

The engine was not wasted. It is the body; the registry is the brain.

**Keep:**

- `apps/server/src/repository.ts` — Postgres-backed store, change events
- the subscription table (`View` rows) — one object id maps to every live view
- the fan-out point in `apps/server/src/index.ts` — one change, every view
  re-rendered, no surface talking to another surface
- Slack adapter: Block Kit card, `views.open` modals, `chat.update` in place
- Telegram adapter: thin card, `editMessageText` in place
- `packages/core` purity rules: reducer, guard, permissions, pure renderers
- `packages/types` enums — no string literals anywhere
- Postgres + Prisma, docker-compose

**Remove (done):**

- the customer Telegram DM surface and `renderCustomer`
- `ref/READ-THIS.md` (superseded by this file)

**Replace (issue #5):**

- the `Issue` domain — `what`, `severity`, `affected`, `acknowledgedBy`,
  `proposedFix`, `approvedBy`, `status` — becomes `Decision` and `Conflict`
- intake-from-a-customer becomes extraction-from-a-thread

## 5. Non-negotiable design rules

These held for the tracker and still hold. Breaking any of them is how this
turns back into a generic product.

1. **Nothing travels sideways.** No Slack-to-Telegram wire. Every surface talks
   only to the object. Any code forwarding a message between platforms is a
   bridge — delete it.
2. **Every inbound event is normalised into one `Action`** before it touches the
   store. Nothing downstream knows which app it came from.
3. **Capability belongs to the window, not the person.** No login, no user table.
4. **The subscription table is the mechanism.** One object id maps to every live
   view. Without it you are syncing platforms. With it you are re-rendering one
   object.
5. **Renderers are pure functions.** Object in, that platform's markup out. Never
   a model call at render time.
6. **The model fills blanks; plain code makes decisions.** Extraction is the
   model's job. Conflict detection is a deterministic comparison. If an LLM
   decides what counts as a contradiction, the last hour is lost to prompt
   tweaking and the demo looks like keyword matching.

## 6. Where CopilotKit fits

The hackathon is CopilotKit's. Their thesis is that agents should not live in a
chatbox — the rubric's top score is that thesis written as a scoring criterion.
So far we use none of their stack. That is the single biggest scoring gap.

Three layers, in increasing risk:

1. **Web surface on CopilotKit React** (issue #9) — `useCopilotReadable` exposes
   the registry, `useCopilotAction` with `render` makes the conflict card
   generative UI. Low risk, ships regardless.
2. **The agent speaks AG-UI** (issue #10) — thread agents emit AG-UI events;
   our fan-out becomes literal state snapshots and deltas.
3. **Channels SDK for Slack and Telegram** (issue #10) — this now _fits_. The SDK
   is documented as "one fresh agent per conversationKey" — one agent per thread.
   That is exactly the registry's shape, where it was a fight for the tracker.
   Open question: can a thread-agent post into a _different_ thread? The conflict
   has to land in both rooms. If it cannot, the raw Slack client does it in five
   lines and we keep our adapters for that one call.

### Spike result — 2026-09-12, `@copilotkit/channels@0.9.2`

Answered from the published package types, not from blog posts.

**Can a thread-agent read its conversation and update what it posted? Yes.**
`Thread` exposes `post(ui)`, `update(ref, ui)`, `delete(ref)`, `stream()`,
`postFile()`, `setTitle()`, plus `onMessage`, `onMention`, `onReaction`,
`onModalSubmit`, `onInteraction`, `onInterrupt` and `onCommand` on the channel.
`update(ref, ui)` is exactly the in-place rewrite this project runs on. That was
the risk flagged when the idea was still a tracker, and it is not a risk.

**Can a thread-agent post into a different thread? No.**
`Channel` has no `openThread`, `getThread` or anything keyed by
`conversationKey`. A `Thread` only ever arrives as an argument to a handler, and
`ReplyTarget` is documented as "opaque to the channel core — created by an
adapter during ingress". There is no way to construct one for a room that has
not just spoken.

That is fatal for us specifically. The whole product is that a decision in
`#mobile` causes a card to appear in `#payments`, a room nobody messaged. The SDK
is built for reply-to-what-arrived; we need speak-into-a-room-unprompted.

**Third finding, larger than either: Channels requires CopilotKit Intelligence.**
The documented path is a Channel created in the Intelligence console, a Channel
Code and a project API key, with Slack credentials held by CopilotKit rather than
by us. Platform ingress is delivered to a long-running process. That is account
provisioning we do not have and a different ownership model for the Slack app.

**Decision: keep the hand-rolled Slack and Telegram adapters.**
CopilotKit stays in the project through the web surface — runtime, provider,
`useAgentContext`, `useFrontendTool` — which is a real integration rather than an
imitation of one. Porting the channel surfaces would cost the cross-thread post,
which is the product.

Say this plainly if asked, rather than letting it look like we did not know the
SDK existed: one agent per thread matches Channels exactly, and we would have used
it, but a conflict has to reach a room that did not ask.

Known trap: the API is `createChannel`, **not** `createBot`. The old name was
deleted with no alias, and every blog post and tutorial online still shows it.

## 7. Hard constraints

- Real build window on the day: **11:15–15:30 = 4h15m**. Submissions close 15:30.
- Video is **2 minutes**. Longer deducts points.
- Project must be net-new during the event. Libraries and templates are allowed;
  you must be able to say which parts were built when.
- **Slack cannot backdate messages.** No historical `ts` on `chat.postMessage`.
  Nothing in the demo may depend on a message appearing to be older than it is.
- **Do not seed fake chat history.** It cannot be split across three people, no
  judge ever sees it, and Slack timestamps it all to "4 minutes ago" anyway.
- The filter before building anything: **can the whole demo be produced by typing
  live during the recording?** For this idea the answer is yes — two people type
  two decisions into two channels. That is the demo.
- Three people. Any idea needing a fourth human on screen, or the agent guessing
  correctly among three candidates, reads as luck.

## 8. Team and environments

Vaibhav Zope (lead), Aashish Raj, Himanshu Naik.

Telegram allows exactly one poller per bot token. Slack delivers each Socket Mode
event to exactly one connection. Two people running the server against the same
tokens steal each other's events, whatever the database says.

So each developer runs their own sandbox: own bot from BotFather, own Telegram
group, own Slack channels, own `.env`. One shared environment is kept for demos
and run from a single machine.

## 9. Order of work

Pick them in this order. Each issue restates the scenario it enables, names what
it must not do, and is written to be picked up by a session that has read only
this file.

| Order | Issue                                                                                                       | Depends on           |
| ----- | ----------------------------------------------------------------------------------------------------------- | -------------------- |
| 1     | [#4](https://github.com/zopeVaibhav/ai-tinkerers/issues/4) Decision and Conflict domain model               | —                    |
| 2     | [#5](https://github.com/zopeVaibhav/ai-tinkerers/issues/5) Thread agent: extract a decision from a thread   | #4                   |
| 3     | [#6](https://github.com/zopeVaibhav/ai-tinkerers/issues/6) Registry and deterministic conflict detection    | #4, #5               |
| 4     | [#7](https://github.com/zopeVaibhav/ai-tinkerers/issues/7) The conflict as a shared object in both threads  | #6                   |
| 5     | [#8](https://github.com/zopeVaibhav/ai-tinkerers/issues/8) CopilotKit on the web surface                    | #7                   |
| 6     | [#9](https://github.com/zopeVaibhav/ai-tinkerers/issues/9) Channels SDK and AG-UI: spike, decide, integrate | #7, parallel with #8 |
| 7     | [#10](https://github.com/zopeVaibhav/ai-tinkerers/issues/10) Resolution flow and demo hardening             | #7                   |

Issue #1 (intake from every surface, customer DM, permissions) is superseded by
this plan and closed.
