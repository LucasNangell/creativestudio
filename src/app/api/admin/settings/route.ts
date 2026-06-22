import { NextRequest, NextResponse } from "next/server";

import { requireAdminApi } from "@/lib/auth/require-admin-api";
import prisma from "@/lib/prisma";
import { normalizeEmail, sanitizeText } from "@/lib/sanitize";
import {
  SITE_SETTING_KEYS,
  siteSettingsFormSchema,
  type SiteSettingsFormInput,
} from "@/lib/validations/settings";

function mapSettingsValues(data: SiteSettingsFormInput): Record<string, string> {
  return {
    site_name: sanitizeText(data.site_name, 255),
    site_tagline: sanitizeText(data.site_tagline, 500),
    contact_email: normalizeEmail(data.contact_email),
    contact_phone: sanitizeText(data.contact_phone, 50),
    whatsapp_number: sanitizeText(data.whatsapp_number, 20),
    address: sanitizeText(data.address, 500),
    social_linkedin: sanitizeText(data.social_linkedin, 500),
    social_instagram: sanitizeText(data.social_instagram, 500),
    social_github: sanitizeText(data.social_github, 500),
    default_seo_title: sanitizeText(data.default_seo_title, 255),
    default_seo_description: sanitizeText(data.default_seo_description, 500),
    maintenance_mode: data.maintenance_mode,
  };
}

export async function GET() {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  const rows = await prisma.siteSetting.findMany({
    where: { key: { in: [...SITE_SETTING_KEYS] } },
  });

  const settings = Object.fromEntries(
    SITE_SETTING_KEYS.map((key) => {
      const row = rows.find((item) => item.key === key);
      return [key, row?.value ?? ""];
    }),
  );

  return NextResponse.json(settings);
}

export async function PATCH(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Payload inválido." }, { status: 400 });
  }

  const parsed = siteSettingsFormSchema.safeParse(body);

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

  const values = mapSettingsValues(parsed.data);

  await prisma.$transaction(
    Object.entries(values).map(([key, value]) =>
      prisma.siteSetting.upsert({
        where: { key },
        create: { key, value },
        update: { value },
      }),
    ),
  );

  return NextResponse.json(values);
}
