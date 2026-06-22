import { cookies } from "next/headers";

import {
  ADMIN_SESSION_COOKIE,
  type AdminSession,
  verifySessionToken,
} from "@/lib/auth/session";

export async function getServerSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}
