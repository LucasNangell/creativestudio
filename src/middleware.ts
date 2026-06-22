import { NextRequest, NextResponse } from "next/server";

import {
  redirectToLogin,
  verifySessionFromRequest,
} from "@/lib/auth/middleware-utils";

function resolvePostLoginRedirect(request: NextRequest): string {
  const redirect = request.nextUrl.searchParams.get("redirect");
  if (redirect?.startsWith("/adm") || redirect?.startsWith("/admin")) {
    return redirect;
  }
  return "/admin";
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await verifySessionFromRequest(request);

  if (pathname.startsWith("/admin/login")) {
    if (session) {
      return NextResponse.redirect(
        new URL(resolvePostLoginRedirect(request), request.url),
      );
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") || pathname.startsWith("/adm")) {
    if (!session) {
      return redirectToLogin(request, pathname);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/adm", "/adm/:path*"],
};
