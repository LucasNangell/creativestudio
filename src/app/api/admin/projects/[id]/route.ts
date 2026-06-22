import { ProjectStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { parseProjectMetrics } from "@/lib/admin/project-metrics";
import { requireAdminApi } from "@/lib/auth/require-admin-api";
import prisma from "@/lib/prisma";
import { sanitizeOptionalText, sanitizeText } from "@/lib/sanitize";
import { projectFormSchema, type ProjectFormInput } from "@/lib/validations/project";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function mapProjectData(data: ProjectFormInput) {
  return {
    title: sanitizeText(data.title, 255),
    slug: data.slug,
    category: sanitizeText(data.category, 100),
    shortDescription: sanitizeText(data.shortDescription, 2000),
    fullDescription: sanitizeText(data.fullDescription, 10000),
    problem: sanitizeText(data.problem, 10000),
    solution: sanitizeText(data.solution, 10000),
    features: data.features,
    stack: data.stack,
    coverImage: sanitizeText(data.coverImage, 500),
    gallery: data.gallery,
    metrics: parseProjectMetrics(data.metrics),
    demoType: data.demoType,
    demoRoute: sanitizeOptionalText(data.demoRoute, 255),
    isFeatured: data.isFeatured,
    status: data.status,
    seoTitle: sanitizeText(data.seoTitle, 255),
    seoDescription: sanitizeText(data.seoDescription, 500),
    sortOrder: data.sortOrder,
  };
}

export async function GET(_request: NextRequest, context: RouteContext) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  const { id } = await context.params;

  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) {
    return NextResponse.json({ success: false, error: "Projeto não encontrado." }, { status: 404 });
  }

  return NextResponse.json(project);
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

  const parsed = projectFormSchema.safeParse(body);

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

  const existing = await prisma.project.findUnique({ where: { id } });

  if (!existing) {
    return NextResponse.json({ success: false, error: "Projeto não encontrado." }, { status: 404 });
  }

  if (parsed.data.slug !== existing.slug) {
    const slugTaken = await prisma.project.findFirst({
      where: { slug: parsed.data.slug, NOT: { id } },
      select: { id: true },
    });

    if (slugTaken) {
      return NextResponse.json(
        { success: false, error: "Já existe um projeto com este slug." },
        { status: 409 },
      );
    }
  }

  const project = await prisma.project.update({
    where: { id },
    data: mapProjectData(parsed.data),
  });

  return NextResponse.json(project);
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  const { id } = await context.params;

  const existing = await prisma.project.findUnique({ where: { id } });

  if (!existing) {
    return NextResponse.json({ success: false, error: "Projeto não encontrado." }, { status: 404 });
  }

  const project = await prisma.project.update({
    where: { id },
    data: { status: ProjectStatus.HIDDEN },
  });

  return NextResponse.json(project);
}
