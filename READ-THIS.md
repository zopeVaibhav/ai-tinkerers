# What to build at the hackathon

Plain version. Read top to bottom. About 8 minutes.

---

## 1. The one thing judges care about

There are 4 things being scored. Each is worth the same.

Three of them, most teams will do fine on.

**One of them, almost every team will fail.** That is where you win or lose.

That one is called **Innovation**. Here is the exact wording:

> **Score 5** = "a surprising new agent pattern whose central value could not be reproduced in a standalone chatbox"
>
> **Score 2** = "the agent appears in an eligible environment, but the environment mostly serves as a wrapper"

In normal words:

- **Score 2** = you built a bot and put it in Slack. The Slack part is just delivery. ChatGPT could do the same job.
- **Score 5** = your agent reads something that **only exists inside that place**. Take the place away and the whole idea dies.

**Test every idea with one question:**

> Could ChatGPT with API access do this same thing?

If yes, you score 2. Doesn't matter how good the code is.

---

## 2. Three things that will ruin your day

I cut 25 ideas. Most died on these three.

### a) Slack cannot fake old messages

You cannot post a message and say it was sent 40 minutes ago. Slack does not allow it.

So if your demo needs a line like _"Aashish hit this problem 40 minutes ago"_ — you have two bad options:

- Run a script 40 real minutes before you record. That's a timer you now have to babysit during a 4-hour build.
- Fake the timestamp in your own UI. That is lying on camera.

**This killed 7 ideas.**

### b) You are 3 people

Some ideas need the agent to figure out "who is the right person to ask."

With 3 people in the workspace, there are only 3 answers. The agent guessing right looks like luck, not intelligence.

Same problem for anything needing 4 different humans on screen at once.

### c) Fake chat history will eat your whole day

Some ideas need a Slack channel that looks busy and real.

Writing that fake history is a trap:

- One person has to write it all (can't split it 3 ways)
- Judges never see it
- Nothing else can be tested until it's done
- Slack timestamps it all to "4 minutes ago" anyway, so it looks fake

**The filter to use before you pick:**

> Can I record the entire demo by just typing live during the recording?

If no, don't pick it.

---

## 3. The recommendation

### Pick this: **Contradiction Registry**

**The idea in one line:** every conversation thread gets its own agent, and those agents catch each other contradicting.

**How it works:**

1. Someone starts a thread in `#payments`. An agent is born for that thread.
2. That agent pulls out the decision made in the thread. Not as free text — as fixed fields, like `{part: payments, when: timeout, do: hard-fail}`.
3. It writes that into a shared list.
4. Meanwhile a thread in `#mobile` decides `{part: payments, when: timeout, do: retry-silently}`.
5. Both agents check the shared list. They clash.
6. Both threads instantly get a note: _"This conflicts with a decision in #mobile — here's the link."_

**Why this beats a chatbox:** nobody is in both channels. No single person can see the conflict. No chatbox can either, because a chatbox only has one conversation. Your agent sees it because it lives inside the thread.

**Why this is safe to build:**

- No fake history needed
- No fake timestamps needed
- No fourth person needed
- You type both decisions live while recording

**Add two cheap things (about 40 extra minutes) that buy you points:**

- Every action the agent takes, it also stores how to undo it. A human can hit revoke, and it unwinds.
- When the agent quietly falls back to a backup model or backup tool, it says so out loud instead of hiding it.

Both of those match the wording judges use for a top score on the technical criterion: _"thoughtful failure handling."_ Almost nobody demos failing on purpose.

**What could go wrong:** the agent finds contradictions that aren't real, or misses obvious ones.

**Fix:** lock the fields to one topic. Let the AI only fill in the blanks. Do the actual comparison with plain code, not AI. If you leave the fields open-ended, you will spend your last hour tweaking prompts and the demo will look like keyword matching.

**Split for 3 people:**

- **Person 1:** thread lifecycle + the shared list (SQLite is fine)
- **Person 2:** pulling decisions out of text + the conflict check
- **Person 3:** the conflict card in Slack, the cross-links, the undo log

**Your 15-second video moment:** split screen, two channels. You type a decision into each. Seconds later both threads show a conflict notice pointing at the other.

---

## 4. The two backups

### Backup A: **Relay** — the chat IS the database

**The idea:** the agent has no database, no memory file, nothing saved anywhere. Everything it knows lives in the Slack thread.

**The demo, and this is the whole point:**

1. Agent is halfway through a task.
2. On camera, you kill the process. `kill -9`.
3. On camera, you delete its folder. `rm -rf`.
4. You start a brand new agent that knows nothing.
5. It reads the Slack channel and carries on exactly where the old one stopped.

**Why it's strong:** every other team will _say_ "our environment is essential." This one proves it by deleting everything else while the judge watches. It's the best 15 seconds available out of all 48 ideas.

**What could go wrong:** resuming in the middle of a half-finished action is hard, and a `kill -9` can look staged.

**Fix:** only resume from a clean pause point, never mid-action. Keep the terminal visible the whole shot so nobody thinks it's fake.

---

### Backup B: **The Sixth Adapter** — your CopilotKit play

**Background:** CopilotKit shipped a thing called the Channels SDK about three weeks ago. It lets one agent live in Slack, Teams, Discord, Telegram and WhatsApp from one codebase. Five places.

**The idea:** you write the sixth. A **GitHub adapter**, so a pull request works as a channel too.

Same agent, no code change. It posts a card in Slack, and the same conversation continues inside a GitHub PR as review comments and suggested code changes. Human clicks "Commit suggestion" in GitHub, and the Slack thread updates.

**Why only you can do this:** Vaibhav has 25+ merged PRs in that repo. Nobody else in the global pool knows this codebase. And there's a real trap waiting for anyone who tries: **the SDK renamed `createBot` to `createChannel` and deleted the old name.** Every blog post and tutorial online still shows the old one. Anyone copying a tutorial gets an error message with zero Google results. You won't.

**What could go wrong:** if the adapter interface isn't publicly exported, you have to fork the SDK. That's a 90-minute detour.

**Fix:** give yourself 45 minutes to find out. If it's internal, fork immediately and stop debating.

**One more risk:** a judge can say "an adapter is literally a wrapper" — and "wrapper" is the exact word for a score of 2. So in the video you must say out loud: _the point is the conversation keeps its identity across two totally different surfaces._ If you don't say it, it doesn't get scored.

---

## 5. Two things nobody thought of

Six different brainstorming angles ran over this. Neither of these came up once. Both are still open if you hate all six ideas.

**a) The agent as a co-writer inside a document.** Every idea assumed the agent is a new person who _talks_. Nobody thought about the agent being a thing that already exists in the environment, which suddenly gains the ability to act.

**b) Voice.** Zero ideas used it. The hackathon theme names voice directly. And voice is the easiest thing to show in a 2-minute video — the judge _hears_ it working instead of squinting at a tiny emoji.

Warning on voice: getting a phone number set up can eat hours. Only do it as a bonus, never as the main thing.

---

## 6. Things to check before Saturday

- [ ] The prize list and the free-credits package were still not published as of today. **Check the hackathon page on Saturday morning.**
- [ ] Decide who writes the social media post. It's required, and it needs 10 accounts tagged plus `#AgentsEverywhere`. Do not leave it for 15:25.
- [ ] Record a full practice video at 14:15, not 15:15. Your first take will be bad. You need room for a second.

---

## What to do next

Read section 3. Then tell me which one you want: **Contradiction Registry**, **Relay**, or **Sixth Adapter**.
