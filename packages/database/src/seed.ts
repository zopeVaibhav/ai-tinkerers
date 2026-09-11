import { prisma } from "./index";

/**
 * Dev fixture only. It fabricates a conflict so the domain model and the web
 * surface can be exercised before extraction (#5) and detection (#6) exist.
 *
 * Never use this to produce the demo. The whole credibility of the product is
 * that two people type two decisions live and the contradiction surfaces by
 * itself — see ref/PLAN.md and issue #10.
 */
async function main() {
    await prisma.view.deleteMany();
    await prisma.event.deleteMany();
    await prisma.conflict.deleteMany();
    await prisma.decision.deleteMany();

    const a = await prisma.decision.create({
        data: {
            surface: "slack",
            threadKey: "C0PAYMENTS:1789140000.000100",
            threadName: "#payments",
            decidedBy: "vaibhav",
            rawText:
                "then we hard-fail on timeout, better to show an error than take money we can't confirm",
            subsystem: "payments",
            condition: "gateway_timeout",
            action: "hard_fail",
        },
    });

    const b = await prisma.decision.create({
        data: {
            surface: "slack",
            threadKey: "C0MOBILE:1789140240.000200",
            threadName: "#mobile",
            decidedBy: "himanshu",
            rawText: "let's retry silently on timeout, three attempts before showing anything",
            subsystem: "payments",
            condition: "gateway_timeout",
            action: "retry_silently",
        },
    });

    const conflict = await prisma.conflict.create({
        data: {
            decisionAId: a.id,
            decisionBId: b.id,
            version: 1,
            status: "open",
        },
    });

    console.log(`seeded conflict ${conflict.id}`);
    console.log(`  ${a.threadName}: ${a.action}`);
    console.log(`  ${b.threadName}: ${b.action}`);
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
