import { NextResponse } from "next/server";
import { z } from "zod";

import { methodNotAllowed, parseJsonBody } from "@/lib/api/route-utils";
import prisma from "@/lib/prisma";
import { checkAnalyticsRateLimit, getClientIp } from "@/lib/rate-limit";

const ALLOWED_EVENT_NAMES = [
  "click_cta_hero",
  "click_whatsapp",
  "open_demo",
  "demo_interaction",
  "demo_cta_click",
  "submit_diagnostico",
  "submit_contato",
  "view_case",
  "click_case_cta",
  "filter_portfolio",
] as const;

const analyticsEventSchema = z.object({
  eventName: z.enum(ALLOWED_EVENT_NAMES),
  page: z.string().min(1).max(255),
  demoSlug: z.string().max(255).optional(),
  metadata: z
    .record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
    .optional()
    .default({}),
});

export async function GET() {
  return methodNotAllowed(["POST"]);
}

export async function POST(request: Request) {
  try {
    if (
      request.headers.get("content-type") &&
      !request.headers.get("content-type")!.includes("application/json")
    ) {
      return NextResponse.json({ success: false }, { status: 415 });
    }

    const ip = getClientIp(request);
    const rateLimit = checkAnalyticsRateLimit(`analytics:${ip}`);

    if (!rateLimit.allowed) {
      return NextResponse.json({ success: false }, { status: 429 });
    }

    const parsedBody = await parseJsonBody(request);
    if ("error" in parsedBody) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const parsed = analyticsEventSchema.safeParse(parsedBody.data);

    if (!parsed.success) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const { eventName, page, demoSlug, metadata } = parsed.data;

    if (page.startsWith("/admin") || page.startsWith("/adm")) {
      return NextResponse.json({ success: false }, { status: 403 });
    }

    await prisma.analyticsEvent.create({
      data: {
        eventName,
        page,
        demoSlug: demoSlug ?? null,
        metadata,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ success: true }, { status: 202 });
  }
}
