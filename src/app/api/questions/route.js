import { prisma } from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim() || "";
    const pageParam = Number(searchParams.get("page"));
    const pageSizeParam = Number(searchParams.get("pageSize"));
    const page = Number.isFinite(pageParam) && pageParam > 0 ? Math.floor(pageParam) : 1;
    const pageSize = Number.isFinite(pageSizeParam)
      ? Math.min(100, Math.max(1, Math.floor(pageSizeParam)))
      : 10;

    const where = q
      ? {
          OR: [
            { text: { contains: q, mode: "insensitive" } },
            { explanation: { contains: q, mode: "insensitive" } },
            { sourceUrl: { contains: q, mode: "insensitive" } },
          ],
        }
      : {};

    const [items, total] = await Promise.all([
      prisma.question.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.question.count({ where }),
    ]);

    return Response.json({ items, total, page, pageSize });
  } catch (e) {
    return new Response("Failed to fetch questions", { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { text, isTrue, explanation, sourceUrl } = body || {};
    if (
      typeof text !== "string" ||
      typeof explanation !== "string" ||
      typeof isTrue !== "boolean"
    ) {
      return new Response("Invalid payload", { status: 400 });
    }

    const created = await prisma.question.create({
      data: {
        text,
        isTrue,
        explanation,
        sourceUrl: sourceUrl || null,
      },
    });
    return Response.json(created, { status: 201 });
  } catch (e) {
    return new Response("Failed to create question", { status: 500 });
  }
}
