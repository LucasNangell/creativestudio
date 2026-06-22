import { NextResponse } from "next/server";

import { getServerSession } from "@/lib/auth/get-server-session";
import type { AdminSession } from "@/lib/auth/session";

type RequireAdminResult =
  | { session: AdminSession; error: null }
  | { session: null; error: NextResponse };

export async function requireAdminApi(): Promise<RequireAdminResult> {
  const session = await getServerSession();

  if (!session) {
    return {
      session: null,
      error: NextResponse.json({ success: false, error: "Não autenticado." }, { status: 401 }),
    };
  }

  return { session, error: null };
}
