import { NextRequest, NextResponse } from "next/server";

import { buildLeadWhere, parseLeadListParams } from "@/lib/admin/lead-filters";
import { requireAdminApi } from "@/lib/auth/require-admin-api";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  const params = parseLeadListParams(request.nextUrl.searchParams);
  const where = buildLeadWhere(params);

  const [items, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: params.sort },
      skip: (params.page - 1) * params.pageSize,
      take: params.pageSize,
    }),
    prisma.lead.count({ where }),
  ]);

  return NextResponse.json({
    items,
    total,
    page: params.page,
    pageSize: params.pageSize,
  });
}
