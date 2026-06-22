import { NextRequest, NextResponse } from "next/server";

import { requireAdminApi } from "@/lib/auth/require-admin-api";
import prisma from "@/lib/prisma";
import { sanitizeText } from "@/lib/sanitize";
import { postFormSchema, type PostFormInput } from "@/lib/validations/post";

type RouteContext = {
  params: Promise<{ id: string }>;
};

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

export async function GET(_request: NextRequest, context: RouteContext) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  const { id } = await context.params;

  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) {
    return NextResponse.json({ success: false, error: "Artigo não encontrado." }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  const { id } = await context.params;

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

  const existing = await prisma.post.findUnique({ where: { id } });

  if (!existing) {
    return NextResponse.json({ success: false, error: "Artigo não encontrado." }, { status: 404 });
  }

  if (parsed.data.slug !== existing.slug) {
    const slugTaken = await prisma.post.findFirst({
      where: { slug: parsed.data.slug, NOT: { id } },
      select: { id: true },
    });

    if (slugTaken) {
      return NextResponse.json(
        { success: false, error: "Já existe um artigo com este slug." },
        { status: 409 },
      );
    }
  }

  const post = await prisma.post.update({
    where: { id },
    data: mapPostData(parsed.data),
  });

  return NextResponse.json(post);
}
