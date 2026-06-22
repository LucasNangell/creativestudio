import { NextRequest, NextResponse } from "next/server";

import { requireAdminApi } from "@/lib/auth/require-admin-api";
import prisma from "@/lib/prisma";
import { sanitizeText } from "@/lib/sanitize";
import { serviceFormSchema, type ServiceFormInput } from "@/lib/validations/service";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function mapServiceData(data: ServiceFormInput) {
  return {
    title: sanitizeText(data.title, 255),
    slug: data.slug,
    headline: sanitizeText(data.headline, 255),
    description: sanitizeText(data.description, 10000),
    problemSolved: sanitizeText(data.problemSolved, 10000),
    deliverables: data.deliverables,
    technologies: data.technologies,
    targetAudience: sanitizeText(data.targetAudience, 10000),
    ctaLabel: sanitizeText(data.ctaLabel, 100),
    seoTitle: sanitizeText(data.seoTitle, 255),
    seoDescription: sanitizeText(data.seoDescription, 500),
    status: data.status,
  };
}

export async function GET(_request: NextRequest, context: RouteContext) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  const { id } = await context.params;

  const service = await prisma.service.findUnique({ where: { id } });

  if (!service) {
    return NextResponse.json({ success: false, error: "Serviço não encontrado." }, { status: 404 });
  }

  return NextResponse.json(service);
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

  const parsed = serviceFormSchema.safeParse(body);

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

  const existing = await prisma.service.findUnique({ where: { id } });

  if (!existing) {
    return NextResponse.json({ success: false, error: "Serviço não encontrado." }, { status: 404 });
  }

  if (parsed.data.slug !== existing.slug) {
    const slugTaken = await prisma.service.findFirst({
      where: { slug: parsed.data.slug, NOT: { id } },
      select: { id: true },
    });

    if (slugTaken) {
      return NextResponse.json(
        { success: false, error: "Já existe um serviço com este slug." },
        { status: 409 },
      );
    }
  }

  const service = await prisma.service.update({
    where: { id },
    data: mapServiceData(parsed.data),
  });

  return NextResponse.json(service);
}
