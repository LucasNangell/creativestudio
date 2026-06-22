"use client";

import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AlertTriangle, Download, TrendingUp } from "lucide-react";

import {
  DemoShell,
  trackDemoFinish,
  trackDemoInteraction,
} from "@/components/demos/demo-shell";
import { DemoKpiCard } from "@/components/demos/demo-kpi-card";
import { DemoSidebar } from "@/components/demos/demo-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import {
  BI_ALERTS,
  BI_CATEGORY_DATA,
  BI_CLIENT_RANKING,
  BI_LINE_DATA,
  getBiKpis,
  type BiPeriod,
  type BiProduct,
  type BiRegion,
} from "@/data/demos/bi-mock";
import { cn } from "@/lib/utils";

const DEMO_ID = "dashboard-bi";

const COLORS = ["#00C2FC", "#058FF7", "#3061FA", "#6139FA"];

function formatMoney(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

export function BiDemo() {
  const [period, setPeriod] = useState<BiPeriod>("30d");
  const [region, setRegion] = useState<BiRegion>("all");
  const [product, setProduct] = useState<BiProduct>("all");
  const [view, setView] = useState<"executive" | "operational">("executive");
  const [exportMsg, setExportMsg] = useState("");
  const [activeNav, setActiveNav] = useState("overview");

  const kpis = useMemo(() => getBiKpis(period, region, product), [period, region, product]);
  const chartData = BI_LINE_DATA[period];
  const categoryData = BI_CATEGORY_DATA[product];

  const handleExport = () => {
    setExportMsg("Exportação simulada — arquivo BI-demo.csv gerado.");
    trackDemoFinish(DEMO_ID, "export_csv");
    setTimeout(() => setExportMsg(""), 4000);
  };

  const sidebarItems = [
    { id: "overview", label: "Visão geral", active: activeNav === "overview", onClick: () => setActiveNav("overview") },
    { id: "sales", label: "Vendas", active: activeNav === "sales", onClick: () => setActiveNav("sales") },
    { id: "alerts", label: "Alertas", active: activeNav === "alerts", onClick: () => setActiveNav("alerts") },
  ];

  return (
    <DemoShell
      demoId={DEMO_ID}
      title="Dashboard BI"
      subtitle="Painel executivo e operacional com KPIs, gráficos e alertas inteligentes simulados."
      ctaLabel="Quero um painel para minha empresa"
      sidebar={<DemoSidebar title="BI Demo" items={sidebarItems} />}
    >
      <div className="p-4 sm:p-6">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap gap-3">
            <Select
              label="Período"
              value={period}
              onChange={(e) => {
                setPeriod(e.target.value as BiPeriod);
                trackDemoInteraction(DEMO_ID, "filter_period", { value: e.target.value });
              }}
              options={[
                { label: "7 dias", value: "7d" },
                { label: "30 dias", value: "30d" },
                { label: "90 dias", value: "90d" },
                { label: "12 meses", value: "12m" },
              ]}
              className="w-[140px]"
            />
            <Select
              label="Região"
              value={region}
              onChange={(e) => {
                setRegion(e.target.value as BiRegion);
                trackDemoInteraction(DEMO_ID, "filter_region", { value: e.target.value });
              }}
              options={[
                { label: "Todas", value: "all" },
                { label: "Sudeste", value: "sudeste" },
                { label: "Sul", value: "sul" },
                { label: "Nordeste", value: "nordeste" },
                { label: "Centro-Oeste", value: "centro-oeste" },
              ]}
              className="w-[160px]"
            />
            <Select
              label="Produto"
              value={product}
              onChange={(e) => {
                setProduct(e.target.value as BiProduct);
                trackDemoInteraction(DEMO_ID, "filter_product", { value: e.target.value });
              }}
              options={[
                { label: "Todos", value: "all" },
                { label: "SaaS", value: "saas" },
                { label: "Consultoria", value: "consultoria" },
                { label: "Licenças", value: "licencas" },
              ]}
              className="w-[160px]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={view === "executive" ? "primary" : "secondary"}
              size="sm"
              onClick={() => {
                setView("executive");
                trackDemoInteraction(DEMO_ID, "view_executive");
              }}
            >
              Visão executiva
            </Button>
            <Button
              variant={view === "operational" ? "primary" : "secondary"}
              size="sm"
              onClick={() => {
                setView("operational");
                trackDemoInteraction(DEMO_ID, "view_operational");
              }}
            >
              Visão operacional
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4" aria-hidden />
              Exportar
            </Button>
          </div>
        </div>

        {exportMsg ? (
          <p className="mb-4 text-sm text-emerald-400" role="status">
            {exportMsg}
          </p>
        ) : null}

        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <DemoKpiCard label="Receita" value={formatMoney(kpis.receita)} change="+8,2%" trend="up" />
          <DemoKpiCard label="Margem" value={`${kpis.margem}%`} change="Estável" trend="neutral" />
          <DemoKpiCard label="Clientes ativos" value={String(kpis.clientesAtivos)} change="+14 novos" trend="up" />
          <DemoKpiCard label="Ticket médio" value={formatMoney(kpis.ticketMedio)} change="-2,1%" trend="down" />
        </div>

        {view === "executive" ? (
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-nangell border border-glass-border bg-nangell-dark/30 p-4">
              <h3 className="mb-4 text-sm font-medium text-nangell-text">Receita vs Meta</h3>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height={260} minWidth={0}>
                  <AreaChart data={chartData}>
                    <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="label" tick={{ fill: "#94A3B8", fontSize: 11 }} />
                    <YAxis tick={{ fill: "#94A3B8", fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{
                        background: "#0B0F1A",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 8,
                      }}
                    />
                    <Area type="monotone" dataKey="receita" stroke="#00C2FC" fill="#00C2FC33" name="Receita" />
                    <Area type="monotone" dataKey="meta" stroke="#6139FA" fill="#6139FA22" name="Meta" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-nangell border border-glass-border bg-nangell-dark/30 p-4">
              <h3 className="mb-4 text-sm font-medium text-nangell-text">Mix por categoria</h3>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height={260} minWidth={0}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      label={({ name, percent }) =>
                        `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                      }
                    >
                      {categoryData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: "#0B0F1A",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-nangell border border-glass-border bg-nangell-dark/30 p-4">
              <h3 className="mb-4 text-sm font-medium text-nangell-text">Receita vs Custo</h3>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height={260} minWidth={0}>
                  <BarChart data={chartData}>
                    <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="label" tick={{ fill: "#94A3B8", fontSize: 11 }} />
                    <YAxis tick={{ fill: "#94A3B8", fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{
                        background: "#0B0F1A",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="receita" fill="#00C2FC" name="Receita" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="custo" fill="#6139FA" name="Custo" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-nangell border border-glass-border bg-nangell-dark/30 p-4">
              <h3 className="mb-4 text-sm font-medium text-nangell-text">Tendência operacional</h3>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height={260} minWidth={0}>
                  <LineChart data={chartData}>
                    <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="label" tick={{ fill: "#94A3B8", fontSize: 11 }} />
                    <YAxis tick={{ fill: "#94A3B8", fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{
                        background: "#0B0F1A",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    />
                    <Line type="monotone" dataKey="receita" stroke="#058FF7" strokeWidth={2} name="Receita" />
                    <Line type="monotone" dataKey="custo" stroke="#3061FA" strokeWidth={2} name="Custo" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-nangell-text">
              <AlertTriangle className="h-4 w-4 text-amber-400" aria-hidden />
              Alertas inteligentes
            </h3>
            <ul className="space-y-2">
              {BI_ALERTS.map((alert) => (
                <li
                  key={alert.id}
                  className={cn(
                    "rounded-nangell border px-4 py-3",
                    alert.severity === "critical" && "border-red-500/30 bg-red-500/5",
                    alert.severity === "warning" && "border-amber-500/30 bg-amber-500/5",
                    alert.severity === "info" && "border-nangell-cyan/30 bg-nangell-cyan/5",
                  )}
                >
                  <p className="text-sm font-medium text-nangell-text">{alert.title}</p>
                  <p className="mt-1 text-xs text-nangell-muted">{alert.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-nangell-text">
              <TrendingUp className="h-4 w-4 text-emerald-400" aria-hidden />
              Ranking de clientes
            </h3>
            <ul className="space-y-2">
              {BI_CLIENT_RANKING.map((client, index) => (
                <li
                  key={client.id}
                  className="flex items-center justify-between rounded-nangell border border-glass-border bg-nangell-dark/40 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-nangell-cyan">#{index + 1}</span>
                    <span className="text-sm text-nangell-text">{client.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatMoney(client.revenue)}</p>
                    <Badge variant={client.growth >= 0 ? "success" : "warning"}>
                      {client.growth >= 0 ? "+" : ""}
                      {client.growth}%
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
