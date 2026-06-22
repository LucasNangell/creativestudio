import { NextRequest, NextResponse } from "next/server";

import { requireAdminApi } from "@/lib/auth/require-admin-api";
import prisma from "@/lib/prisma";
import { sanitizeOptionalText } from "@/lib/sanitize";
import { leadUpdateSchema } from "@/lib/validations/lead-admin";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, context: RouteContext) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  const { id } = await context.params;

  const lead = await prisma.lead.findUnique({ where: { id } });

  if (!lead) {
    return NextResponse.json({ success: false, error: "Lead não encontrado." }, { status: 404 });
  }

  return NextResponse.json(lead);
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

  const parsed = leadUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Verifique os campos enviados.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const existing = await prisma.lead.findUnique({ where: { id } });

  if (!existing) {
    return NextResponse.json({ success: false, error: "Lead não encontrado." }, { status: 404 });
  }

  const data: { status?: typeof existing.status; internalNotes?: string | null } = {};

  if (parsed.data.status !== undefined) {
    data.status = parsed.data.status;
  }

  if (parsed.data.internalNotes !== undefined) {
    data.internalNotes = sanitizeOptionalText(parsed.data.internalNotes, 10000);
  }

  const lead = await prisma.lead.update({
    where: { id },
    data,
  });

  return NextResponse.json(lead);
}
