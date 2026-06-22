import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { methodNotAllowed, parseJsonBody } from "@/lib/api/route-utils";
import {
  getFailedAttemptCount,
  isLoginBlocked,
  recordFailedLoginAttempt,
} from "@/lib/auth/middleware-utils";
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
import { getAdminUserByEmail } from "@/services/admin-dashboard-service";

export async function GET() {
  return methodNotAllowed(["POST"]);
}

export async function POST(request: NextRequest) {
  const parsedBody = await parseJsonBody(request);
  if ("error" in parsedBody) return parsedBody.error;

  const parsed = adminLoginSchema.safeParse(parsedBody.data);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: GENERIC_LOGIN_ERROR,
      },
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

  const user = await getAdminUserByEmail(parsed.data.email);

  const passwordValid =
    user != null && (await bcrypt.compare(parsed.data.password, user.passwordHash));

  if (!passwordValid) {
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
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  const response = NextResponse.json({
    success: true,
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });

  response.cookies.set(ADMIN_SESSION_COOKIE, token, getSessionCookieOptions());

  return response;
}
