import { NextRequest, NextResponse } from "next/server";

import { requireAdminApi } from "@/lib/auth/require-admin-api";
import prisma from "@/lib/prisma";
import { sanitizeText } from "@/lib/sanitize";
import { postFormSchema, type PostFormInput } from "@/lib/validations/post";

function mapPostData(data: PostFormInput) {
  return {
    title: sanitizeText(data.title, 255),
    slug: data.slug,
    excerpt: sanitizeText(data.excerpt, 2000),
    content: sanitizeText(data.content, 50000),
    coverImage: sanitizeText(data.coverImage, 500),
    category: sanitizeText(data.category, 100),
    tags: data.tags,
    author: sanitizeText(data.author, 255),
    status: data.status,
    seoTitle: sanitizeText(data.seoTitle, 255),
    seoDescription: sanitizeText(data.seoDescription, 500),
    publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
  };
}

export async function GET() {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  const items = await prisma.post.findMany({
    orderBy: [{ createdAt: "desc" }],
  });

  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Payload inválido." }, { status: 400 });
  }

  const parsed = postFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Verifique os campos do formulário.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const slugTaken = await prisma.post.findUnique({
    where: { slug: parsed.data.slug },
    select: { id: true },
  });

  if (slugTaken) {
    return NextResponse.json(
      { success: false, error: "Já existe um artigo com este slug." },
      { status: 409 },
    );
  }

  const post = await prisma.post.create({
    data: mapPostData(parsed.data),
  });

  return NextResponse.json(post, { status: 201 });
}
