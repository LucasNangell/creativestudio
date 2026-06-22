import { NextRequest, NextResponse } from "next/server";

import { parseProjectMetrics } from "@/lib/admin/project-metrics";
import { requireAdminApi } from "@/lib/auth/require-admin-api";
import prisma from "@/lib/prisma";
import { sanitizeOptionalText, sanitizeText } from "@/lib/sanitize";
import { projectFormSchema, type ProjectFormInput } from "@/lib/validations/project";

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

export async function GET() {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  const items = await prisma.project.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
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

  const slugTaken = await prisma.project.findUnique({
    where: { slug: parsed.data.slug },
    select: { id: true },
  });

  if (slugTaken) {
    return NextResponse.json(
      { success: false, error: "Já existe um projeto com este slug." },
      { status: 409 },
    );
  }

  const project = await prisma.project.create({
    data: mapProjectData(parsed.data),
  });

  return NextResponse.json(project, { status: 201 });
}
