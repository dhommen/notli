import { PrismaClient } from "@prisma/client";
import { QUESTIONS } from "../src/data/questions.js";

const prisma = new PrismaClient();

async function main() {
  for (const q of QUESTIONS) {
    await prisma.question.upsert({
      where: { id: q.id },
      update: {
        text: q.text,
        isTrue: q.isTrue,
        explanation: q.explanation,
        sourceUrl: q.sourceUrl ?? null,
      },
      create: {
        id: q.id,
        text: q.text,
        isTrue: q.isTrue,
        explanation: q.explanation,
        sourceUrl: q.sourceUrl ?? null,
      },
    });
  }
  console.log(`Seeded ${QUESTIONS.length} questions.`);
}

main().finally(async () => {
  await prisma.$disconnect();
});
