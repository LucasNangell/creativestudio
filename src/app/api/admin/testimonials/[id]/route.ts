import { NextRequest, NextResponse } from "next/server";

import { requireAdminApi } from "@/lib/auth/require-admin-api";
import prisma from "@/lib/prisma";
import { sanitizeText } from "@/lib/sanitize";
import { testimonialFormSchema, type TestimonialFormInput } from "@/lib/validations/testimonial";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function mapTestimonialData(data: TestimonialFormInput) {
  return {
    clientName: sanitizeText(data.clientName, 255),
    clientRole: sanitizeText(data.clientRole, 255),
    company: sanitizeText(data.company, 255),
    content: sanitizeText(data.content, 10000),
    rating: data.rating,
    image: sanitizeText(data.image, 500),
    status: data.status,
  };
}

export async function GET(_request: NextRequest, context: RouteContext) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  const { id } = await context.params;

  const testimonial = await prisma.testimonial.findUnique({ where: { id } });

  if (!testimonial) {
    return NextResponse.json(
      { success: false, error: "Depoimento não encontrado." },
      { status: 404 },
    );
  }

  return NextResponse.json(testimonial);
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

  const parsed = testimonialFormSchema.safeParse(body);

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

  const existing = await prisma.testimonial.findUnique({ where: { id } });

  if (!existing) {
    return NextResponse.json(
      { success: false, error: "Depoimento não encontrado." },
      { status: 404 },
    );
  }

  const testimonial = await prisma.testimonial.update({
    where: { id },
    data: mapTestimonialData(parsed.data),
  });

  return NextResponse.json(testimonial);
}
