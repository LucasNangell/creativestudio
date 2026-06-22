import { NextRequest, NextResponse } from "next/server";

import { requireAdminApi } from "@/lib/auth/require-admin-api";
import prisma from "@/lib/prisma";
import { sanitizeText } from "@/lib/sanitize";
import { testimonialFormSchema, type TestimonialFormInput } from "@/lib/validations/testimonial";

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

export async function GET() {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  const items = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
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

  const testimonial = await prisma.testimonial.create({
    data: mapTestimonialData(parsed.data),
  });

  return NextResponse.json(testimonial, { status: 201 });
}
