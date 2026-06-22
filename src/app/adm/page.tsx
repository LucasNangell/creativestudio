import type { Metadata } from "next";

import { AdmDashboardContent } from "@/app/_components/adm/adm-dashboard-content";
import { AdmLayoutShell } from "@/components/adm/adm-layout-shell";
import { createPageMetadata } from "@/lib/page-metadata";
import type { AdmPeriod } from "@/services/adm-analytics-service";

export const metadata: Metadata = createPageMetadata({
  title: "Estatísticas do site",
  description: "Painel privado de analytics e leads.",
  path: "/adm",
  noIndex: true,
});

const VALID_PERIODS = new Set<AdmPeriod>(["7d", "30d", "90d", "all"]);

type AdmPageProps = {
  searchParams: Promise<{ period?: string }>;
};

export default async function AdmPage({ searchParams }: AdmPageProps) {
  const params = await searchParams;
  const periodParam = params.period;
  const period: AdmPeriod =
    periodParam && VALID_PERIODS.has(periodParam as AdmPeriod)
      ? (periodParam as AdmPeriod)
      : "30d";

  return (
    <AdmLayoutShell>
      <AdmDashboardContent period={period} />
    </AdmLayoutShell>
  );
}
