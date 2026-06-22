import { NextResponse } from "next/server";

import { requireAdminApi } from "@/lib/auth/require-admin-api";
import prisma from "@/lib/prisma";

export async function GET() {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  const items = await prisma.service.findMany({
    orderBy: [{ title: "asc" }],
  });

  return NextResponse.json({ items });
}
