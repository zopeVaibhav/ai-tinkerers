import { prisma } from "./index";

/**
 * Dev fixture. It seeds the state *before* a contradiction exists — one room
 * has decided, the other has not. The clash itself must always be produced by
 * the real path, because that is the only thing the product actually claims.
 *
 * Never fabricate a conflict here. See ref/PLAN.md and issue #10.
 */
async function main() {
    await prisma.view.deleteMany();
    await prisma.event.deleteMany();
    await prisma.conflict.deleteMany();
    await prisma.decision.deleteMany();

    const first = await prisma.decision.create({
        data: {
            surface: "slack",
            threadKey: "C0PAYMENTS:seed",
            threadName: "#payments",
            decidedBy: "vaibhav",
            rawText:
                "then we hard-fail on timeout, better to show an error than take money we can't confirm",
            subsystem: "payments",
            condition: "gateway_timeout",
            action: "hard_fail",
        },
    });

    console.log(`seeded one decision: ${first.threadName} -> ${first.action}`);
    console.log("no conflict yet. another room has to disagree.");
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
