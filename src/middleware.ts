import { NextRequest, NextResponse } from "next/server";

import {
  redirectToLogin,
  verifySessionFromRequest,
} from "@/lib/auth/middleware-utils";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await verifySessionFromRequest(request);

  if (pathname.startsWith("/admin/login")) {
    if (session) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (!session) {
      return redirectToLogin(request, pathname);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
