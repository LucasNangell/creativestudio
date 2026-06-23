import Link from "next/link";

import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { Badge } from "@/components/ui/badge";
import { AdmCharts } from "@/app/_components/adm/adm-charts";
import {
  EVENT_LABELS,
  getAdmAnalyticsStats,
  type AdmPeriod,
} from "@/services/adm-analytics-service";
import { cn } from "@/lib/utils";

const PERIODS: { value: AdmPeriod; label: string }[] = [
  { value: "7d", label: "7 dias" },
  { value: "30d", label: "30 dias" },
  { value: "90d", label: "90 dias" },
  { value: "all", label: "Tudo" },
];

const LEAD_STATUS: Record<string, string> = {
  NOVO: "Novo",
  CONTATO: "Contato",
  REUNIAO: "Reunião",
  PROPOSTA: "Proposta",
  FECHADO: "Fechado",
  PERDIDO: "Perdido",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

function formatMetadata(metadata: Record<string, unknown>): string {
  const entries = Object.entries(metadata).filter(
    ([, value]) => value !== undefined && value !== null && value !== "",
  );
  if (entries.length === 0) return "-";
  return entries
    .slice(0, 3)
    .map(([key, value]) => `${key}: ${String(value)}`)
    .join(" · ");
}

type AdmDashboardContentProps = {
  period: AdmPeriod;
};

export async function AdmDashboardContent({ period }: AdmDashboardContentProps) {
  const stats = await getAdmAnalyticsStats(period);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-nangell-text sm:text-3xl">
            Painel de estatísticas
          </h1>
          <p className="mt-1 text-sm text-nangell-muted">
            Visitas, localização, formulários, ações e demonstrações, {stats.periodLabel}.
          </p>
        </div>
        <nav
          className="flex flex-wrap gap-2"
          aria-label="Filtrar período"
        >
          {PERIODS.map((item) => (
            <Link
              key={item.value}
              href={item.value === "30d" ? "/adm" : `/adm?period=${item.value}`}
              className={cn(
                "rounded-nangell border px-3 py-1.5 text-xs font-medium transition-colors",
                stats.period === item.value
                  ? "border-nangell-cyan/50 bg-nangell-cyan/10 text-nangell-cyan"
                  : "border-glass-border text-nangell-muted hover:border-nangell-cyan/30 hover:text-nangell-text",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5">
        <AdminStatCard label="Visitas de página" value={stats.summary.totalVisits} />
        <AdminStatCard
          label="Visitantes únicos"
          value={stats.summary.uniqueVisitors}
          hint="Por endereço IP"
        />
        <AdminStatCard label="Eventos registrados" value={stats.summary.totalEvents} />
        <AdminStatCard label="Leads captados" value={stats.summary.totalLeads} />
        <AdminStatCard
          label="Demos abertas"
          value={stats.summary.demoOpens}
          hint="Evento open_demo"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdminStatCard label="Diagnósticos" value={stats.summary.diagnosticLeads} />
        <AdminStatCard label="Contatos" value={stats.summary.contactLeads} />
        <AdminStatCard label="Cases visualizados" value={stats.summary.caseViews} />
        <AdminStatCard label="Cliques WhatsApp" value={stats.summary.whatsappClicks} />
      </div>

      <AdmCharts
        visitsByDay={stats.visitsByDay}
        eventsByType={stats.eventsByType.map((row) => ({
          name: EVENT_LABELS[row.eventName] ?? row.eventName,
          count: row.count,
        }))}
        demoViews={stats.demoViews}
        locations={stats.locations}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <section>
          <h2 className="mb-4 font-heading text-lg font-semibold text-nangell-text">
            Páginas mais visitadas
          </h2>
          <div className="overflow-x-auto rounded-nangell-xl border border-glass-border">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="border-b border-glass-border bg-nangell-surface/80">
                <tr>
                  <th className="px-4 py-3 font-medium text-nangell-muted">Página</th>
                  <th className="px-4 py-3 font-medium text-nangell-muted">Visitas</th>
                </tr>
              </thead>
              <tbody>
                {stats.topPages.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-4 py-6 text-center text-nangell-muted">
                      Nenhuma visita registrada ainda.
                    </td>
                  </tr>
                ) : (
                  stats.topPages.map((row) => (
                    <tr key={row.path} className="border-b border-glass-border/50">
                      <td className="px-4 py-3 font-mono text-xs text-nangell-text">{row.path}</td>
                      <td className="px-4 py-3 text-nangell-muted">{row.count}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-lg font-semibold text-nangell-text">
            Origens de tráfego (referrer)
          </h2>
          <div className="overflow-x-auto rounded-nangell-xl border border-glass-border">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="border-b border-glass-border bg-nangell-surface/80">
                <tr>
                  <th className="px-4 py-3 font-medium text-nangell-muted">Referrer</th>
                  <th className="px-4 py-3 font-medium text-nangell-muted">Visitas</th>
                </tr>
              </thead>
              <tbody>
                {stats.topReferrers.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-4 py-6 text-center text-nangell-muted">
                      Sem referrers externos registrados.
                    </td>
                  </tr>
                ) : (
                  stats.topReferrers.map((row) => (
                    <tr key={row.referrer} className="border-b border-glass-border/50">
                      <td className="max-w-xs truncate px-4 py-3 text-xs text-nangell-text">
                        {row.referrer}
                      </td>
                      <td className="px-4 py-3 text-nangell-muted">{row.count}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <section>
        <h2 className="mb-4 font-heading text-lg font-semibold text-nangell-text">
          Visitantes por localização (IP)
        </h2>
        <div className="overflow-x-auto rounded-nangell-xl border border-glass-border">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-glass-border bg-nangell-surface/80">
              <tr>
                <th className="px-4 py-3 font-medium text-nangell-muted">IP</th>
                <th className="px-4 py-3 font-medium text-nangell-muted">País</th>
                <th className="px-4 py-3 font-medium text-nangell-muted">Cidade</th>
                <th className="px-4 py-3 font-medium text-nangell-muted">Visitas</th>
                <th className="px-4 py-3 font-medium text-nangell-muted">Última visita</th>
              </tr>
            </thead>
            <tbody>
              {stats.uniqueIps.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-nangell-muted">
                    Nenhum visitante geolocalizado ainda.
                  </td>
                </tr>
              ) : (
                stats.uniqueIps.map((row) => (
                  <tr key={row.ip} className="border-b border-glass-border/50">
                    <td className="px-4 py-3 font-mono text-xs text-nangell-text">{row.ip}</td>
                    <td className="px-4 py-3 text-nangell-muted">{row.country ?? "-"}</td>
                    <td className="px-4 py-3 text-nangell-muted">{row.city ?? "-"}</td>
                    <td className="px-4 py-3 text-nangell-muted">{row.visits}</td>
                    <td className="px-4 py-3 font-mono text-xs text-nangell-muted">
                      {formatDate(row.lastSeen)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <section>
          <h2 className="mb-4 font-heading text-lg font-semibold text-nangell-text">
            Visualizações por demonstração
          </h2>
          <div className="overflow-x-auto rounded-nangell-xl border border-glass-border">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="border-b border-glass-border bg-nangell-surface/80">
                <tr>
                  <th className="px-4 py-3 font-medium text-nangell-muted">Demo</th>
                  <th className="px-4 py-3 font-medium text-nangell-muted">Aberturas</th>
                  <th className="px-4 py-3 font-medium text-nangell-muted">Interações</th>
                  <th className="px-4 py-3 font-medium text-nangell-muted">CTAs</th>
                </tr>
              </thead>
              <tbody>
                {stats.demoViews.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-nangell-muted">
                      Nenhuma demonstração aberta no período.
                    </td>
                  </tr>
                ) : (
                  stats.demoViews.map((row) => (
                    <tr key={row.slug} className="border-b border-glass-border/50">
                      <td className="px-4 py-3 font-medium text-nangell-text">{row.slug}</td>
                      <td className="px-4 py-3 text-nangell-muted">{row.opens}</td>
                      <td className="px-4 py-3 text-nangell-muted">{row.interactions}</td>
                      <td className="px-4 py-3 text-nangell-muted">{row.ctaClicks}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-lg font-semibold text-nangell-text">
            Visualizações por case
          </h2>
          <div className="overflow-x-auto rounded-nangell-xl border border-glass-border">
            <table className="w-full min-w-[360px] text-left text-sm">
              <thead className="border-b border-glass-border bg-nangell-surface/80">
                <tr>
                  <th className="px-4 py-3 font-medium text-nangell-muted">Case</th>
                  <th className="px-4 py-3 font-medium text-nangell-muted">Views</th>
                </tr>
              </thead>
              <tbody>
                {stats.caseViews.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="px-4 py-6 text-center text-nangell-muted">
                      Nenhum case visualizado no período.
                    </td>
                  </tr>
                ) : (
                  stats.caseViews.map((row) => (
                    <tr key={row.slug} className="border-b border-glass-border/50">
                      <td className="px-4 py-3 font-medium text-nangell-text">{row.slug}</td>
                      <td className="px-4 py-3 text-nangell-muted">{row.count}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section>
          <h2 className="mb-4 font-heading text-lg font-semibold text-nangell-text">
            Campanhas UTM
          </h2>
          <div className="overflow-x-auto rounded-nangell-xl border border-glass-border">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="border-b border-glass-border bg-nangell-surface/80">
                <tr>
                  <th className="px-4 py-3 font-medium text-nangell-muted">Source</th>
                  <th className="px-4 py-3 font-medium text-nangell-muted">Medium</th>
                  <th className="px-4 py-3 font-medium text-nangell-muted">Campaign</th>
                  <th className="px-4 py-3 font-medium text-nangell-muted">Visitas</th>
                </tr>
              </thead>
              <tbody>
                {stats.utmSources.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-nangell-muted">
                      Nenhuma visita com UTM no período.
                    </td>
                  </tr>
                ) : (
                  stats.utmSources.map((row) => (
                    <tr
                      key={`${row.source}-${row.medium}-${row.campaign}`}
                      className="border-b border-glass-border/50"
                    >
                      <td className="px-4 py-3 text-nangell-text">{row.source}</td>
                      <td className="px-4 py-3 text-nangell-muted">{row.medium ?? "-"}</td>
                      <td className="px-4 py-3 text-nangell-muted">{row.campaign ?? "-"}</td>
                      <td className="px-4 py-3 text-nangell-muted">{row.count}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-lg font-semibold text-nangell-text">
            Filtros do portfólio
          </h2>
          <div className="overflow-x-auto rounded-nangell-xl border border-glass-border">
            <table className="w-full min-w-[360px] text-left text-sm">
              <thead className="border-b border-glass-border bg-nangell-surface/80">
                <tr>
                  <th className="px-4 py-3 font-medium text-nangell-muted">Filtro</th>
                  <th className="px-4 py-3 font-medium text-nangell-muted">Valor</th>
                  <th className="px-4 py-3 font-medium text-nangell-muted">Usos</th>
                </tr>
              </thead>
              <tbody>
                {stats.portfolioFilters.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-4 py-6 text-center text-nangell-muted">
                      Nenhum filtro aplicado no período.
                    </td>
                  </tr>
                ) : (
                  stats.portfolioFilters.map((row) => (
                    <tr
                      key={`${row.filterType}-${row.filterValue}`}
                      className="border-b border-glass-border/50"
                    >
                      <td className="px-4 py-3 text-nangell-text">{row.filterType}</td>
                      <td className="px-4 py-3 text-nangell-muted">{row.filterValue}</td>
                      <td className="px-4 py-3 text-nangell-muted">{row.count}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <section>
        <h2 className="mb-4 font-heading text-lg font-semibold text-nangell-text">
          Respostas de formulários (leads)
        </h2>
        <div className="overflow-x-auto rounded-nangell-xl border border-glass-border">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead className="border-b border-glass-border bg-nangell-surface/80">
              <tr>
                <th className="px-4 py-3 font-medium text-nangell-muted">Nome</th>
                <th className="px-4 py-3 font-medium text-nangell-muted">Empresa</th>
                <th className="px-4 py-3 font-medium text-nangell-muted">Projeto</th>
                <th className="px-4 py-3 font-medium text-nangell-muted">Origem</th>
                <th className="px-4 py-3 font-medium text-nangell-muted">Demo</th>
                <th className="px-4 py-3 font-medium text-nangell-muted">Status</th>
                <th className="px-4 py-3 font-medium text-nangell-muted">Data</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-nangell-muted">
                    Nenhum formulário enviado no período.
                  </td>
                </tr>
              ) : (
                stats.recentLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-glass-border/50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-nangell-text">{lead.name}</p>
                      <p className="text-xs text-nangell-muted">{lead.email}</p>
                    </td>
                    <td className="px-4 py-3 text-nangell-muted">{lead.company}</td>
                    <td className="px-4 py-3 text-nangell-muted">{lead.projectType}</td>
                    <td className="px-4 py-3 font-mono text-xs text-nangell-muted">
                      {lead.sourcePage}
                    </td>
                    <td className="px-4 py-3 text-nangell-muted">{lead.sourceDemo ?? "-"}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline">
                        {LEAD_STATUS[lead.status] ?? lead.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-nangell-muted">
                      {formatDate(lead.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <section>
          <h2 className="mb-4 font-heading text-lg font-semibold text-nangell-text">
            Visitas recentes
          </h2>
          <div className="overflow-x-auto rounded-nangell-xl border border-glass-border">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-glass-border bg-nangell-surface/80">
                <tr>
                  <th className="px-4 py-3 font-medium text-nangell-muted">Quando</th>
                  <th className="px-4 py-3 font-medium text-nangell-muted">Página</th>
                  <th className="px-4 py-3 font-medium text-nangell-muted">IP</th>
                  <th className="px-4 py-3 font-medium text-nangell-muted">Local</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentVisits.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-nangell-muted">
                      Sem visitas recentes.
                    </td>
                  </tr>
                ) : (
                  stats.recentVisits.map((visit) => (
                    <tr key={visit.id} className="border-b border-glass-border/50">
                      <td className="px-4 py-3 font-mono text-xs text-nangell-muted">
                        {formatDate(visit.createdAt)}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-nangell-text">
                        {visit.path}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-nangell-muted">
                        {visit.ipAddress}
                      </td>
                      <td className="px-4 py-3 text-nangell-muted">
                        {[visit.city, visit.country].filter(Boolean).join(", ") || "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-heading text-lg font-semibold text-nangell-text">
            Ações recentes no site
          </h2>
          <div className="overflow-x-auto rounded-nangell-xl border border-glass-border">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-glass-border bg-nangell-surface/80">
                <tr>
                  <th className="px-4 py-3 font-medium text-nangell-muted">Quando</th>
                  <th className="px-4 py-3 font-medium text-nangell-muted">Ação</th>
                  <th className="px-4 py-3 font-medium text-nangell-muted">Página</th>
                  <th className="px-4 py-3 font-medium text-nangell-muted">Detalhes</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentEvents.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-nangell-muted">
                      Nenhuma ação registrada no período.
                    </td>
                  </tr>
                ) : (
                  stats.recentEvents.map((event) => (
                    <tr key={event.id} className="border-b border-glass-border/50">
                      <td className="px-4 py-3 font-mono text-xs text-nangell-muted">
                        {formatDate(event.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-nangell-text">
                        {EVENT_LABELS[event.eventName] ?? event.eventName}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-nangell-muted">
                        {event.page}
                      </td>
                      <td className="max-w-xs truncate px-4 py-3 text-xs text-nangell-muted">
                        {event.demoSlug
                          ? `demo: ${event.demoSlug} · `
                          : ""}
                        {formatMetadata(event.metadata)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
