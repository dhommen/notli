import { prisma } from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = Number(searchParams.get("limit"));
    const limit = Number.isFinite(limitParam) ? Math.max(1, Math.min(limitParam, 50)) : 10;

    const rows = await prisma.$queryRaw`
      SELECT 
        q.id, q.text, q."isTrue", q.explanation, q."sourceUrl", q."createdAt", q."updatedAt"
      FROM "Question" AS q
      ORDER BY RANDOM()
      LIMIT ${limit};
    `;

    return Response.json(rows);
  } catch (e) {
    return new Response("Failed to fetch random questions", { status: 500 });
  }
}
