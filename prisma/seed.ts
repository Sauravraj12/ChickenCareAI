import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const demo = await prisma.user.upsert({
    where: { email: "demo@chickencare.ai" },
    update: {},
    create: {
      email: "demo@chickencare.ai",
      name: "Alex Morgan",
      role: UserRole.CAREGIVER,
      profile: { create: { preferredLanguage: "English", timezone: "Asia/Taipei" } },
      caregiver: { create: { notes: "Competition demo caregiver account." } }
    }
  });
  for (const name of ["Clover", "Poppy", "Sunny"]) {
    await prisma.chicken.upsert({
      where: { id: `seed-${name.toLowerCase()}` },
      update: {},
      create: { id: `seed-${name.toLowerCase()}`, name, ownerId: demo.id }
    });
  }
  for (const activity of [
    { title: "Supervised chicken feeding", durationMins: 20, difficulty: "Easy", safety: "Wash hands before and after; use approved feed.", equipment: "Approved feed", participants: "All ages with supervision", benefit: "A gentle routine and opportunity for connection.", description: "Offer a small portion of approved feed with supervision." },
    { title: "Observe chicken behaviour", durationMins: 15, difficulty: "Easy", safety: "Observe quietly from a comfortable distance.", equipment: "Observation journal", participants: "Solo or small group", benefit: "Mindful observation and curiosity.", description: "Spend a quiet moment noticing the flock’s normal behaviors." },
    { title: "Gentle gardening", durationMins: 20, difficulty: "Gentle", safety: "Use accessible tools and plants safe for animals.", equipment: "Gloves and small hand tools", participants: "Individual or caregiver-supported", benefit: "Light movement and a sense of accomplishment.", description: "Tend a small garden area at a comfortable pace." }
  ]) {
    const existing = await prisma.activity.findFirst({ where: { title: activity.title } });
    if (!existing) await prisma.activity.create({ data: activity });
  }
  console.log(`Seeded demo account ${demo.email} and sample care data.`);
}

main().catch(error => {
  console.error("Could not seed ChickenCare AI demo data.", error);
  process.exitCode = 1;
}).finally(async () => prisma.$disconnect());
