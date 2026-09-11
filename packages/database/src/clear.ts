import { prisma } from "./index";

/** Empty registry. Both sides of the clash then have to come from real rooms. */
async function main() {
    await prisma.view.deleteMany();
    await prisma.event.deleteMany();
    await prisma.conflict.deleteMany();
    await prisma.decision.deleteMany();
    console.log("registry cleared");
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
