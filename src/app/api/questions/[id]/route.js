import { prisma } from "@/lib/prisma";

export async function GET(_req, { params }) {
  const { id } = params;
  try {
    const q = await prisma.question.findUnique({ where: { id } });
    if (!q) return new Response("Not found", { status: 404 });
    return Response.json(q);
  } catch (e) {
    return new Response("Failed to fetch", { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  const { id } = params;
  try {
    const body = await request.json();
    const data = {};
    if (typeof body.text === "string") data.text = body.text;
    if (typeof body.explanation === "string") data.explanation = body.explanation;
    if (typeof body.isTrue === "boolean") data.isTrue = body.isTrue;
    if ("sourceUrl" in body) data.sourceUrl = body.sourceUrl || null;
    if (Object.keys(data).length === 0) return new Response("No changes", { status: 400 });

    const updated = await prisma.question.update({ where: { id }, data });
    return Response.json(updated);
  } catch (e) {
    return new Response("Failed to update", { status: 500 });
  }
}

export async function DELETE(_req, { params }) {
  const { id } = params;
  try {
    await prisma.question.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (e) {
    return new Response("Failed to delete", { status: 500 });
  }
}
