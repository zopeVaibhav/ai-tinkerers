import { prisma } from "./index";

/**
 * Backdrop for the demo recording. A registry holding one row does not read as
 * a registry, and the status filters and search box on the web surface are
 * meaningless with nothing to filter.
 *
 * This is deliberately not `seed.ts`, whose contract is that a clash is only
 * ever produced by the real path. Two rules keep that contract intact here:
 *
 * 1. **Nothing touches payments/gateway_timeout.** That pair belongs to the live
 *    demo. A seeded claim on it would sit in the registry as a third party and
 *    turn the one conflict typed on camera into two.
 * 2. **Every seeded conflict is already resolved.** A seeded conflict has no
 *    View rows, because only an adapter posting a real message creates one. An
 *    open one would draw buttons that fan out to nowhere; a resolved one reads
 *    as history, which is what it is.
 *
 * Run it before recording, then type the real conflict live. Do not describe
 * these rows as something that happened during the demo.
 */

const HOURS = 60 * 60 * 1000;
const ago = (hours: number) => new Date(Date.now() - hours * HOURS);

async function main() {
    await prisma.view.deleteMany();
    await prisma.event.deleteMany();
    await prisma.conflict.deleteMany();
    await prisma.decision.deleteMany();

    // The pair that clashed and was settled. Different subsystem from the demo.
    const ios = await prisma.decision.create({
        data: {
            createdAt: ago(30),
            surface: "slack",
            threadKey: "C0IOS:demo",
            threadName: "#ios",
            decidedBy: "Aashish Raj",
            rawText: "when the token expires we send them back to login, clean and obvious",
            subsystem: "auth",
            condition: "token_expired",
            action: "hard_fail",
        },
    });

    const android = await prisma.decision.create({
        data: {
            createdAt: ago(29),
            surface: "slack",
            threadKey: "C0ANDROID:demo",
            threadName: "#android",
            decidedBy: "Himanshu Naik",
            rawText:
                "refresh the token in the background, the user should never see a login screen",
            subsystem: "auth",
            condition: "token_expired",
            action: "retry_silently",
            // #android lost, so its claim is no longer what that room stands behind.
            supersededById: ios.id,
        },
    });

    await prisma.conflict.create({
        data: {
            createdAt: ago(29),
            version: 4,
            decisionAId: ios.id,
            decisionBId: android.id,
            status: "resolved",
            acknowledgedBy: "Vaibhav Zope",
            resolution: "one session policy, both clients log out. mobile follows ios here",
            framings: {
                engineer:
                    "#ios and #android disagree on auth after token_expired: one logs the user out, the other refreshes silently.",
                lead: "In #ios the team decided to hard-fail on token_expired; in #android they decided to retry silently. If both ship, session behaviour differs by platform and bugs will only reproduce on one.",
            },
            timeline: {
                create: [
                    { at: ago(29), by: "agent", what: "rewrote the summaries" },
                    { at: ago(28), by: "Vaibhav Zope", what: "acknowledged the conflict" },
                    {
                        at: ago(27),
                        by: "Vaibhav Zope",
                        what: "kept side A: one session policy, both clients log out. mobile follows ios here",
                    },
                ],
            },
        },
    });

    // Standing claims nobody has contradicted. These are what a registry mostly
    // holds, and they give the decisions tab and the search box something real.
    await prisma.decision.createMany({
        data: [
            {
                createdAt: ago(22),
                surface: "slack",
                threadKey: "C0GROWTH:demo",
                threadName: "#growth",
                decidedBy: "Aashish Raj",
                rawText:
                    "queue them and warn once, dropping a push silently is worse than a late one",
                subsystem: "notifications",
                condition: "rate_limited",
                action: "queue_and_warn",
            },
            {
                createdAt: ago(9),
                surface: "slack",
                threadKey: "C0BILLING:demo",
                threadName: "#billing",
                decidedBy: "Himanshu Naik",
                rawText: "a duplicate webhook is just noise, log it and move on",
                subsystem: "payments",
                condition: "duplicate_event",
                action: "log_only",
            },
            {
                createdAt: ago(4),
                surface: "slack",
                threadKey: "C0PLATFORM:demo",
                threadName: "#platform",
                decidedBy: "Vaibhav Zope",
                rawText:
                    "back off and queue when the auth service rate limits us, never hard fail a login",
                subsystem: "auth",
                condition: "rate_limited",
                action: "queue_and_warn",
            },
        ],
    });

    const decisions = await prisma.decision.count();
    const conflicts = await prisma.conflict.count();
    console.log(`demo backdrop: ${decisions} decisions, ${conflicts} resolved conflict`);
    console.log("payments/gateway_timeout is untouched — type that one live.");
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
