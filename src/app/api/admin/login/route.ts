import { NextRequest, NextResponse } from "next/server";

import { methodNotAllowed, parseJsonBody } from "@/lib/api/route-utils";
import {
  getFailedAttemptCount,
  isLoginBlocked,
  recordFailedLoginAttempt,
} from "@/lib/auth/middleware-utils";
import {
  ADMIN_SESSION_MISCONFIGURED_ERROR,
  isAdminSessionConfigured,
  resolveAdminLogin,
} from "@/lib/auth/resolve-admin-login";
import {
  ADMIN_SESSION_COOKIE,
  createSessionToken,
  getSessionCookieOptions,
} from "@/lib/auth/session";
import { getClientIp } from "@/lib/rate-limit";
import {
  adminLoginSchema,
  GENERIC_LOGIN_ERROR,
  LOGIN_BLOCKED_ERROR,
} from "@/lib/validations/admin-auth";

export async function GET() {
  return methodNotAllowed(["POST"]);
}

export async function POST(request: NextRequest) {
  try {
    if (!isAdminSessionConfigured()) {
      return NextResponse.json(
        { success: false, error: ADMIN_SESSION_MISCONFIGURED_ERROR },
        { status: 503 },
      );
    }

    const parsedBody = await parseJsonBody(request);
    if ("error" in parsedBody) return parsedBody.error;

    const parsed = adminLoginSchema.safeParse(parsedBody.data);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: GENERIC_LOGIN_ERROR },
        { status: 401 },
      );
    }

    const ip = getClientIp(request);
    const rateKey = `${ip}:${parsed.data.email.toLowerCase()}`;

    if (isLoginBlocked(rateKey)) {
      return NextResponse.json(
        { success: false, error: LOGIN_BLOCKED_ERROR },
        { status: 429 },
      );
    }

    const admin = await resolveAdminLogin(parsed.data.email, parsed.data.password);

    if (!admin) {
      recordFailedLoginAttempt(rateKey);
      const payload: Record<string, unknown> = {
        success: false,
        error: GENERIC_LOGIN_ERROR,
      };

      if (process.env.NODE_ENV === "development") {
        payload.attempts = getFailedAttemptCount(rateKey);
      }

      return NextResponse.json(payload, { status: 401 });
    }

    const token = await createSessionToken({
      userId: admin.userId,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

    response.cookies.set(ADMIN_SESSION_COOKIE, token, getSessionCookieOptions());

    return response;
  } catch (error) {
    console.error("[api/admin/login]", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "Erro interno ao autenticar. Verifique DATABASE_URL, ADMIN_SESSION_SECRET e ADMIN_BOOTSTRAP_PASSWORD no servidor.",
      },
      { status: 500 },
    );
  }
}
