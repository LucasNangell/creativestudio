import { NextRequest, NextResponse } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  type AdminSession,
  verifySessionToken,
} from "@/lib/auth/session";

type AttemptRecord = {
  count: number;
  lastAt: number;
};

const attemptsByKey = new Map<string, AttemptRecord>();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 10;

export function recordFailedLoginAttempt(key: string): void {
  const now = Date.now();
  const record = attemptsByKey.get(key) ?? { count: 0, lastAt: now };

  if (now - record.lastAt > WINDOW_MS) {
    record.count = 0;
  }

  record.count += 1;
  record.lastAt = now;
  attemptsByKey.set(key, record);
}

export function isLoginBlocked(key: string): boolean {
  const record = attemptsByKey.get(key);
  if (!record) return false;

  const now = Date.now();
  if (now - record.lastAt > WINDOW_MS) {
    attemptsByKey.delete(key);
    return false;
  }

  return record.count >= MAX_ATTEMPTS;
}

export function getFailedAttemptCount(key: string): number {
  return attemptsByKey.get(key)?.count ?? 0;
}

export async function verifySessionFromRequest(
  request: NextRequest,
): Promise<AdminSession | null> {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

export function redirectToLogin(request: NextRequest, pathname: string) {
  const loginUrl = new URL("/admin/login", request.url);
  if (pathname !== "/admin/login") {
    loginUrl.searchParams.set("redirect", pathname);
  }
  return NextResponse.redirect(loginUrl);
}

export const middlewareConfig = {
  matcher: ["/admin/:path*"],
};
