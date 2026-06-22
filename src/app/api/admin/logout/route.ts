import { NextResponse } from "next/server";

import { methodNotAllowed } from "@/lib/api/route-utils";
import { ADMIN_SESSION_COOKIE, getSessionCookieOptions } from "@/lib/auth/session";

export async function GET() {
  return methodNotAllowed(["POST"]);
}

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    ...getSessionCookieOptions(),
    maxAge: 0,
  });

  return response;
}
