import { LeadStatus, Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export type AdmPeriod = "7d" | "30d" | "90d" | "all";

export type AdmAnalyticsStats = {
  period: AdmPeriod;
  periodLabel: string;
  summary: {
    totalVisits: number;
    uniqueVisitors: number;
    totalEvents: number;
    totalLeads: number;
    diagnosticLeads: number;
    contactLeads: number;
    demoOpens: number;
    caseViews: number;
    whatsappClicks: number;
    ctaHeroClicks: number;
  };
  visitsByDay: { date: string; count: number }[];
  topPages: { path: string; count: number }[];
  topReferrers: { referrer: string; count: number }[];
  locations: { country: string; region: string | null; city: string | null; count: number }[];
  uniqueIps: { ip: string; country: string | null; city: string | null; visits: number; lastSeen: Date }[];
  eventsByType: { eventName: string; count: number }[];
  demoViews: { slug: string; opens: number; interactions: number; ctaClicks: number }[];
  caseViews: { slug: string; count: number }[];
  portfolioFilters: { filterType: string; filterValue: string; count: number }[];
  utmSources: { source: string; medium: string | null; campaign: string | null; count: number }[];
  recentVisits: {
    id: string;
    path: string;
    ipAddress: string;
    country: string | null;
    city: string | null;
    referrer: string | null;
    createdAt: Date;
  }[];
  recentEvents: {
    id: string;
    eventName: string;
    page: string;
    demoSlug: string | null;
    metadata: Record<string, unknown>;
    createdAt: Date;
  }[];
  recentLeads: {
    id: string;
    name: string;
    email: string;
    company: string;
    projectType: string;
    sourcePage: string;
    sourceDemo: string | null;
    status: LeadStatus;
    createdAt: Date;
  }[];
  demoSessions: {
    demoSlug: string;
    sessions: number;
    interactions: number;
  }[];
};

const PERIOD_DAYS: Record<Exclude<AdmPeriod, "all">, number> = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
};

const PERIOD_LABELS: Record<AdmPeriod, string> = {
  "7d": "Últimos 7 dias",
  "30d": "Últimos 30 dias",
  "90d": "Últimos 90 dias",
  all: "Todo o período",
};

function getSinceDate(period: AdmPeriod): Date | null {
  if (period === "all") return null;
  const since = new Date();
  since.setDate(since.getDate() - PERIOD_DAYS[period]);
  since.setHours(0, 0, 0, 0);
  return since;
}

function dateFilter(since: Date | null): Prisma.DateTimeFilter | undefined {
  return since ? { gte: since } : undefined;
}

function readMetadataString(metadata: unknown, key: string): string | null {
  if (!metadata || typeof metadata !== "object") return null;
  const value = (metadata as Record<string, unknown>)[key];
  return typeof value === "string" ? value : null;
}

const EMPTY_STATS: AdmAnalyticsStats = {
  period: "30d",
  periodLabel: PERIOD_LABELS["30d"],
  summary: {
    totalVisits: 0,
    uniqueVisitors: 0,
    totalEvents: 0,
    totalLeads: 0,
    diagnosticLeads: 0,
    contactLeads: 0,
    demoOpens: 0,
    caseViews: 0,
    whatsappClicks: 0,
    ctaHeroClicks: 0,
  },
  visitsByDay: [],
  topPages: [],
  topReferrers: [],
  locations: [],
  uniqueIps: [],
  eventsByType: [],
  demoViews: [],
  caseViews: [],
  portfolioFilters: [],
  utmSources: [],
  recentVisits: [],
  recentEvents: [],
  recentLeads: [],
  demoSessions: [],
};

export async function getAdmAnalyticsStats(
  period: AdmPeriod = "30d",
): Promise<AdmAnalyticsStats> {
  try {
    const since = getSinceDate(period);
    const createdAt = dateFilter(since);
    const visitWhere: Prisma.PageVisitWhereInput = createdAt ? { createdAt } : {};
    const eventWhere: Prisma.AnalyticsEventWhereInput = createdAt ? { createdAt } : {};
    const leadWhere: Prisma.LeadWhereInput = createdAt ? { createdAt } : {};

    const [
      totalVisits,
      uniqueVisitorsRows,
      totalEvents,
      totalLeads,
      diagnosticLeads,
      contactLeads,
      demoOpens,
      caseViewsCount,
      whatsappClicks,
      ctaHeroClicks,
      topPagesRaw,
      topReferrersRaw,
      locationsRaw,
      uniqueIpsRaw,
      eventsByTypeRaw,
      demoOpensRaw,
      demoInteractionsRaw,
      demoCtaRaw,
      viewCaseEvents,
      filterEvents,
      utmRaw,
      recentVisits,
      recentEvents,
      recentLeads,
      demoSessionsRaw,
      demoInteractionsCount,
    ] = await Promise.all([
      prisma.pageVisit.count({ where: visitWhere }),
      prisma.pageVisit.groupBy({
        by: ["ipAddress"],
        where: visitWhere,
        _count: { id: true },
      }),
      prisma.analyticsEvent.count({ where: eventWhere }),
      prisma.lead.count({ where: leadWhere }),
      prisma.lead.count({ where: { ...leadWhere, sourcePage: { contains: "diagnostico" } } }),
      prisma.lead.count({ where: { ...leadWhere, sourcePage: "/contato" } }),
      prisma.analyticsEvent.count({ where: { ...eventWhere, eventName: "open_demo" } }),
      prisma.analyticsEvent.count({ where: { ...eventWhere, eventName: "view_case" } }),
      prisma.analyticsEvent.count({ where: { ...eventWhere, eventName: "click_whatsapp" } }),
      prisma.analyticsEvent.count({ where: { ...eventWhere, eventName: "click_cta_hero" } }),
      prisma.pageVisit.groupBy({
        by: ["path"],
        where: visitWhere,
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
        take: 15,
      }),
      prisma.pageVisit.groupBy({
        by: ["referrer"],
        where: {
          ...visitWhere,
          referrer: { not: null },
        },
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
        take: 10,
      }),
      prisma.pageVisit.groupBy({
        by: ["country", "region", "city"],
        where: {
          ...visitWhere,
          country: { not: null },
        },
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
        take: 20,
      }),
      prisma.pageVisit.groupBy({
        by: ["ipAddress", "country", "city"],
        where: visitWhere,
        _count: { id: true },
        _max: { createdAt: true },
        orderBy: { _count: { id: "desc" } },
        take: 25,
      }),
      prisma.analyticsEvent.groupBy({
        by: ["eventName"],
        where: eventWhere,
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
      }),
      prisma.analyticsEvent.groupBy({
        by: ["demoSlug"],
        where: {
          ...eventWhere,
          eventName: "open_demo",
          demoSlug: { not: null },
        },
        _count: { id: true },
      }),
      prisma.analyticsEvent.groupBy({
        by: ["demoSlug"],
        where: {
          ...eventWhere,
          eventName: "demo_interaction",
          demoSlug: { not: null },
        },
        _count: { id: true },
      }),
      prisma.analyticsEvent.groupBy({
        by: ["demoSlug"],
        where: {
          ...eventWhere,
          eventName: "demo_cta_click",
          demoSlug: { not: null },
        },
        _count: { id: true },
      }),
      prisma.analyticsEvent.findMany({
        where: { ...eventWhere, eventName: "view_case" },
        select: { metadata: true },
      }),
      prisma.analyticsEvent.findMany({
        where: { ...eventWhere, eventName: "filter_portfolio" },
        select: { metadata: true },
      }),
      prisma.pageVisit.groupBy({
        by: ["utmSource", "utmMedium", "utmCampaign"],
        where: {
          ...visitWhere,
          utmSource: { not: null },
        },
        _count: { id: true },
        orderBy: { _count: { id: "desc" } },
        take: 10,
      }),
      prisma.pageVisit.findMany({
        where: visitWhere,
        orderBy: { createdAt: "desc" },
        take: 20,
        select: {
          id: true,
          path: true,
          ipAddress: true,
          country: true,
          city: true,
          referrer: true,
          createdAt: true,
        },
      }),
      prisma.analyticsEvent.findMany({
        where: eventWhere,
        orderBy: { createdAt: "desc" },
        take: 30,
        select: {
          id: true,
          eventName: true,
          page: true,
          demoSlug: true,
          metadata: true,
          createdAt: true,
        },
      }),
      prisma.lead.findMany({
        where: leadWhere,
        orderBy: { createdAt: "desc" },
        take: 15,
        select: {
          id: true,
          name: true,
          email: true,
          company: true,
          projectType: true,
          sourcePage: true,
          sourceDemo: true,
          status: true,
          createdAt: true,
        },
      }),
      prisma.demoSession.groupBy({
        by: ["demoSlug"],
        where: createdAt ? { startedAt: createdAt } : undefined,
        _count: { id: true },
      }),
      prisma.demoInteraction.count({
        where: createdAt ? { createdAt } : undefined,
      }),
    ]);

    let visitsByDay: { date: string; count: number }[] = [];

    if (since) {
      visitsByDay = await prisma.$queryRaw<{ date: string; count: bigint }[]>`
        SELECT DATE(created_at) as date, COUNT(*) as count
        FROM page_visits
        WHERE created_at >= ${since}
        GROUP BY DATE(created_at)
        ORDER BY date ASC
      `.then((rows) =>
        rows.map((row) => ({
          date: String(row.date).slice(0, 10),
          count: Number(row.count),
        })),
      );
    } else {
      visitsByDay = await prisma.$queryRaw<{ date: string; count: bigint }[]>`
        SELECT DATE(created_at) as date, COUNT(*) as count
        FROM page_visits
        GROUP BY DATE(created_at)
        ORDER BY date ASC
        LIMIT 90
      `.then((rows) =>
        rows.map((row) => ({
          date: String(row.date).slice(0, 10),
          count: Number(row.count),
        })),
      );
    }

    const demoSlugSet = new Set<string>();
    for (const row of demoOpensRaw) {
      if (row.demoSlug) demoSlugSet.add(row.demoSlug);
    }
    for (const row of demoInteractionsRaw) {
      if (row.demoSlug) demoSlugSet.add(row.demoSlug);
    }
    for (const row of demoCtaRaw) {
      if (row.demoSlug) demoSlugSet.add(row.demoSlug);
    }

    const opensMap = new Map(demoOpensRaw.map((r) => [r.demoSlug, r._count.id]));
    const interactionsMap = new Map(
      demoInteractionsRaw.map((r) => [r.demoSlug, r._count.id]),
    );
    const ctaMap = new Map(demoCtaRaw.map((r) => [r.demoSlug, r._count.id]));

    const demoViews = [...demoSlugSet]
      .map((slug) => ({
        slug,
        opens: opensMap.get(slug) ?? 0,
        interactions: interactionsMap.get(slug) ?? 0,
        ctaClicks: ctaMap.get(slug) ?? 0,
      }))
      .sort((a, b) => b.opens - a.opens);

    const caseCountMap = new Map<string, number>();
    for (const event of viewCaseEvents) {
      const slug =
        readMetadataString(event.metadata, "caseSlug") ??
        readMetadataString(event.metadata, "case_slug") ??
        "desconhecido";
      caseCountMap.set(slug, (caseCountMap.get(slug) ?? 0) + 1);
    }

    const caseViews = [...caseCountMap.entries()]
      .map(([slug, count]) => ({ slug, count }))
      .sort((a, b) => b.count - a.count);

    const filterCountMap = new Map<string, { filterType: string; filterValue: string; count: number }>();
    for (const event of filterEvents) {
      const filterType = readMetadataString(event.metadata, "filterType") ?? "tipo";
      const filterValue = readMetadataString(event.metadata, "filterValue") ?? "-";
      const key = `${filterType}::${filterValue}`;
      const existing = filterCountMap.get(key);
      if (existing) {
        existing.count += 1;
      } else {
        filterCountMap.set(key, { filterType, filterValue, count: 1 });
      }
    }

    const portfolioFilters = [...filterCountMap.values()].sort((a, b) => b.count - a.count);

    return {
      period,
      periodLabel: PERIOD_LABELS[period],
      summary: {
        totalVisits,
        uniqueVisitors: uniqueVisitorsRows.length,
        totalEvents,
        totalLeads,
        diagnosticLeads,
        contactLeads,
        demoOpens,
        caseViews: caseViewsCount,
        whatsappClicks,
        ctaHeroClicks,
      },
      visitsByDay,
      topPages: topPagesRaw.map((row) => ({ path: row.path, count: row._count.id })),
      topReferrers: topReferrersRaw
        .filter((row) => row.referrer)
        .map((row) => ({ referrer: row.referrer!, count: row._count.id })),
      locations: locationsRaw.map((row) => ({
        country: row.country ?? "Desconhecido",
        region: row.region,
        city: row.city,
        count: row._count.id,
      })),
      uniqueIps: uniqueIpsRaw.map((row) => ({
        ip: row.ipAddress,
        country: row.country,
        city: row.city,
        visits: row._count.id,
        lastSeen: row._max.createdAt ?? new Date(),
      })),
      eventsByType: eventsByTypeRaw.map((row) => ({
        eventName: row.eventName,
        count: row._count.id,
      })),
      demoViews,
      caseViews,
      portfolioFilters,
      utmSources: utmRaw
        .filter((row) => row.utmSource)
        .map((row) => ({
          source: row.utmSource!,
          medium: row.utmMedium,
          campaign: row.utmCampaign,
          count: row._count.id,
        })),
      recentVisits,
      recentEvents: recentEvents.map((event) => ({
        ...event,
        metadata:
          event.metadata && typeof event.metadata === "object"
            ? (event.metadata as Record<string, unknown>)
            : {},
      })),
      recentLeads,
      demoSessions: demoSessionsRaw.map((row) => ({
        demoSlug: row.demoSlug,
        sessions: row._count.id,
        interactions: demoInteractionsCount,
      })),
    };
  } catch (error) {
    console.error("[adm-analytics-service]", error);
    return { ...EMPTY_STATS, period, periodLabel: PERIOD_LABELS[period] };
  }
}

export const EVENT_LABELS: Record<string, string> = {
  click_cta_hero: "Clique CTA Hero",
  click_whatsapp: "Clique WhatsApp",
  open_demo: "Abriu demonstração",
  demo_interaction: "Interação na demo",
  demo_cta_click: "CTA da demonstração",
  submit_diagnostico: "Enviou diagnóstico",
  submit_contato: "Enviou contato",
  view_case: "Visualizou case",
  click_case_cta: "CTA do case",
  filter_portfolio: "Filtro no portfólio",
};
