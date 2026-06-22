import { NextRequest, NextResponse } from "next/server";

import { buildLeadWhere, parseLeadListParams } from "@/lib/admin/lead-filters";
import { requireAdminApi } from "@/lib/auth/require-admin-api";
import prisma from "@/lib/prisma";

const CSV_HEADERS = [
  "id",
  "name",
  "email",
  "phone",
  "company",
  "website",
  "projectType",
  "challenge",
  "budgetRange",
  "urgency",
  "preferredContact",
  "message",
  "sourcePage",
  "sourceDemo",
  "utmSource",
  "utmMedium",
  "utmCampaign",
  "consent",
  "status",
  "internalNotes",
  "createdAt",
  "updatedAt",
] as const;

function escapeCsvValue(value: unknown): string {
  if (value === null || value === undefined) return "";

  const str = value instanceof Date ? value.toISOString() : String(value);

  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }

  return str;
}

function leadToCsvRow(lead: Record<string, unknown>): string {
  return CSV_HEADERS.map((header) => escapeCsvValue(lead[header])).join(",");
}

export async function GET(request: NextRequest) {
  const auth = await requireAdminApi();
  if (auth.error) return auth.error;

  const params = parseLeadListParams(request.nextUrl.searchParams);
  const where = buildLeadWhere(params);

  const leads = await prisma.lead.findMany({
    where,
    orderBy: { createdAt: params.sort },
  });

  const csvLines = [
    CSV_HEADERS.join(","),
    ...leads.map((lead) => leadToCsvRow(lead as unknown as Record<string, unknown>)),
  ];

  const filename = `leads-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csvLines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
