import { NextResponse } from "next/server";
import { z } from "zod";

import { methodNotAllowed, parseJsonBody } from "@/lib/api/route-utils";
import { resolveGeoFromIp } from "@/lib/geoip";
import prisma from "@/lib/prisma";
import { checkAnalyticsRateLimit, getClientIp } from "@/lib/rate-limit";

const BOT_PATTERN =
  /bot|crawler|spider|slurp|facebookexternalhit|whatsapp|preview|lighthouse|headless|curl|wget/i;

const pageViewSchema = z.object({
  path: z.string().min(1).max(500),
  referrer: z.string().max(500).optional(),
  utmSource: z.string().max(255).optional(),
  utmMedium: z.string().max(255).optional(),
  utmCampaign: z.string().max(255).optional(),
});

export async function GET() {
  return methodNotAllowed(["POST"]);
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkAnalyticsRateLimit(`pageview:${ip}`);

    if (!rateLimit.allowed) {
      return NextResponse.json({ success: false }, { status: 429 });
    }

    const userAgent = request.headers.get("user-agent") ?? undefined;
    if (userAgent && BOT_PATTERN.test(userAgent)) {
      return NextResponse.json({ success: true, skipped: "bot" }, { status: 202 });
    }

    const parsedBody = await parseJsonBody(request);
    if ("error" in parsedBody) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const parsed = pageViewSchema.safeParse(parsedBody.data);
    if (!parsed.success) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const { path, referrer, utmSource, utmMedium, utmCampaign } = parsed.data;

    if (
      path.startsWith("/admin") ||
      path.startsWith("/adm") ||
      path.startsWith("/api") ||
      path.startsWith("/_next")
    ) {
      return NextResponse.json({ success: false }, { status: 403 });
    }

    const cfCountry = request.headers.get("cf-ipcountry");
    const geo = await resolveGeoFromIp(ip, cfCountry);

    await prisma.pageVisit.create({
      data: {
        path,
        referrer: referrer ?? null,
        userAgent: userAgent?.slice(0, 500) ?? null,
        ipAddress: ip.slice(0, 45),
        country: geo.country,
        region: geo.region,
        city: geo.city,
        utmSource: utmSource ?? null,
        utmMedium: utmMedium ?? null,
        utmCampaign: utmCampaign ?? null,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ success: true }, { status: 202 });
  }
}
