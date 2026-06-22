import { LeadStatus, type Prisma } from "@prisma/client";

import { sanitizeText } from "@/lib/sanitize";

export type LeadListParams = {
  q?: string | null;
  status?: string | null;
  projectType?: string | null;
  page: number;
  pageSize: number;
  sort: "asc" | "desc";
};

export function parseLeadListParams(searchParams: URLSearchParams): LeadListParams {
  const page = Math.max(1, Number.parseInt(searchParams.get("page") ?? "1", 10) || 1);
  const pageSize = Math.min(
    100,
    Math.max(1, Number.parseInt(searchParams.get("pageSize") ?? "20", 10) || 20),
  );
  const sortParam = searchParams.get("sort");
  const sort = sortParam === "asc" ? "asc" : "desc";

  return {
    q: searchParams.get("q"),
    status: searchParams.get("status"),
    projectType: searchParams.get("projectType"),
    page,
    pageSize,
    sort,
  };
}

export function buildLeadWhere(params: Pick<LeadListParams, "q" | "status" | "projectType">): Prisma.LeadWhereInput {
  const where: Prisma.LeadWhereInput = {};

  if (params.status && Object.values(LeadStatus).includes(params.status as LeadStatus)) {
    where.status = params.status as LeadStatus;
  }

  if (params.projectType) {
    where.projectType = sanitizeText(params.projectType, 100);
  }

  const q = params.q?.trim();
  if (q) {
    where.OR = [
      { name: { contains: q } },
      { email: { contains: q } },
      { company: { contains: q } },
      { phone: { contains: q } },
      { projectType: { contains: q } },
    ];
  }

  return where;
}
