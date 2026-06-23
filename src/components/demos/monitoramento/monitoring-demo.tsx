"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AlertCircle,
  Pause,
  Play,
  Plus,
  Radio,
} from "lucide-react";

import {
  DemoShell,
  trackDemoFinish,
  trackDemoInteraction,
} from "@/components/demos/demo-shell";
import { DemoKpiCard } from "@/components/demos/demo-kpi-card";
import { DemoSidebar } from "@/components/demos/demo-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  createRandomEvent,
  type MonitorEvent,
  type MonitorSeverity,
  type MonitorSentiment,
} from "@/data/demos/monitor-mock";
import { cn } from "@/lib/utils";

const DEMO_ID = "monitoramento-tempo-real";

const severityVariant: Record<MonitorSeverity, "default" | "warning" | "muted"> = {
  info: "default",
  warning: "warning",
  critical: "warning",
};

const sentimentColor: Record<MonitorSentiment, string> = {
  positive: "text-emerald-400",
  neutral: "text-nangell-muted",
  negative: "text-red-400",
};

export function MonitoringDemo() {
  const [events, setEvents] = useState<MonitorEvent[]>([]);
  const [streaming, setStreaming] = useState(false);
  const [keywordFilter, setKeywordFilter] = useState("");
  const [severityFilter, setSeverityFilter] = useState<MonitorSeverity | "all">("all");
  const [volumeData, setVolumeData] = useState<{ minute: string; count: number }[]>([]);
  const [customAlerts, setCustomAlerts] = useState<{ id: string; keyword: string }[]>([]);
  const [alertKeyword, setAlertKeyword] = useState("");
  const [activeNav, setActiveNav] = useState("feed");
  const counterRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const addEvent = useCallback(() => {
    counterRef.current += 1;
    const event = createRandomEvent(counterRef.current);
    setEvents((prev) => [event, ...prev].slice(0, 100));

    const minute = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setVolumeData((prev) => {
      const existing = prev.find((v) => v.minute === minute);
      if (existing) {
        return prev.map((v) =>
          v.minute === minute ? { ...v, count: v.count + 1 } : v,
        );
      }
      return [...prev.slice(-9), { minute, count: 1 }];
    });
  }, []);

  useEffect(() => {
    if (streaming) {
      intervalRef.current = setInterval(addEvent, 1800);
      trackDemoInteraction(DEMO_ID, "stream_start");
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      trackDemoInteraction(DEMO_ID, "stream_pause");
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [streaming, addEvent]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      if (severityFilter !== "all" && event.severity !== severityFilter) return false;
      if (keywordFilter && !event.message.toLowerCase().includes(keywordFilter.toLowerCase()) &&
          !event.keyword.toLowerCase().includes(keywordFilter.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [events, keywordFilter, severityFilter]);

  const sentimentStats = useMemo(() => {
    const counts = { positive: 0, neutral: 0, negative: 0 };
    filteredEvents.forEach((e) => {
      counts[e.sentiment] += 1;
    });
    return counts;
  }, [filteredEvents]);

  const criticalAlerts = useMemo(
    () => filteredEvents.filter((e) => e.severity === "critical").slice(0, 3),
    [filteredEvents],
  );

  const handleCreateAlert = () => {
    if (!alertKeyword.trim()) return;
    const alert = { id: `alert-${Date.now()}`, keyword: alertKeyword.trim() };
    setCustomAlerts((prev) => [alert, ...prev].slice(0, 5));
    setAlertKeyword("");
    trackDemoFinish(DEMO_ID, "alert_created", alert.keyword);
  };

  const sidebarItems = [
    { id: "feed", label: "Feed ao vivo", active: activeNav === "feed", onClick: () => setActiveNav("feed") },
    { id: "alerts", label: "Alertas", active: activeNav === "alerts", onClick: () => setActiveNav("alerts") },
    { id: "analytics", label: "Analytics", active: activeNav === "analytics", onClick: () => setActiveNav("analytics") },
  ];

  return (
    <DemoShell
      demoId={DEMO_ID}
      title="Monitoramento em Tempo Real"
      subtitle="Feed simulado de menções, logs e alertas com classificação de sentimento fictícia."
      ctaLabel="Quero monitorar meus dados"
      sidebar={<DemoSidebar title="Simulação de monitoramento" items={sidebarItems} />}
    >
      <div className="border-b border-glass-border bg-nangell-dark/40 px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant={streaming ? "secondary" : "primary"}
            size="sm"
            onClick={() => setStreaming(!streaming)}
          >
            {streaming ? (
              <>
                <Pause className="h-4 w-4" aria-hidden />
                Pausar stream
              </>
            ) : (
              <>
                <Play className="h-4 w-4" aria-hidden />
                Iniciar stream
              </>
            )}
          </Button>
          <Badge variant={streaming ? "success" : "muted"}>
            <Radio className="mr-1 inline h-3 w-3" aria-hidden />
            {streaming ? "Ao vivo" : "Pausado"}
          </Badge>
          <span className="text-xs text-nangell-muted">{events.length} eventos na fila</span>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <DemoKpiCard label="Eventos" value={String(filteredEvents.length)} trend="neutral" />
          <DemoKpiCard label="Positivos" value={String(sentimentStats.positive)} trend="up" change="Sentimento" />
          <DemoKpiCard label="Neutros" value={String(sentimentStats.neutral)} trend="neutral" />
          <DemoKpiCard label="Negativos" value={String(sentimentStats.negative)} trend="down" change="Sentimento" />
        </div>

        <div className="mb-4 flex flex-wrap gap-3">
          <Input
            label="Filtrar por palavra-chave"
            value={keywordFilter}
            onChange={(e) => {
              setKeywordFilter(e.target.value);
              trackDemoInteraction(DEMO_ID, "filter_keyword");
            }}
            placeholder="CRM, suporte, bug..."
            className="sm:max-w-xs"
          />
          <Select
            label="Severidade"
            value={severityFilter}
            onChange={(e) => {
              setSeverityFilter(e.target.value as MonitorSeverity | "all");
              trackDemoInteraction(DEMO_ID, "filter_severity", { value: e.target.value });
            }}
            options={[
              { label: "Todas", value: "all" },
              { label: "Info", value: "info" },
              { label: "Warning", value: "warning" },
              { label: "Critical", value: "critical" },
            ]}
            className="w-[160px]"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h3 className="mb-3 text-sm font-medium text-nangell-text">Feed de eventos</h3>
            <ul className="max-h-[360px] space-y-2 overflow-y-auto rounded-nangell border border-glass-border bg-nangell-dark/30 p-3">
              {filteredEvents.length === 0 ? (
                <li className="py-8 text-center text-sm text-nangell-muted">
                  {streaming ? "Aguardando eventos..." : "Inicie o stream para simular eventos"}
                </li>
              ) : (
                filteredEvents.map((event) => (
                  <li
                    key={event.id}
                    className="rounded-nangell border border-glass-border bg-nangell-surface/50 px-3 py-2 text-sm"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] text-nangell-muted">{event.timestamp}</span>
                      <Badge variant="muted">{event.source}</Badge>
                      <Badge variant={severityVariant[event.severity]}>{event.severity}</Badge>
                      <span className={cn("text-xs capitalize", sentimentColor[event.sentiment])}>
                        {event.sentiment}
                      </span>
                    </div>
                    <p className="mt-1">
                      <span className="text-nangell-cyan">#{event.keyword}</span>, {event.message}
                    </p>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-medium text-nangell-text">
                <AlertCircle className="h-4 w-4 text-red-400" aria-hidden />
                Alertas críticos
              </h3>
              <ul className="space-y-2">
                {criticalAlerts.length === 0 ? (
                  <li className="text-xs text-nangell-muted">Nenhum alerta crítico no momento</li>
                ) : (
                  criticalAlerts.map((event) => (
                    <li
                      key={event.id}
                      className="rounded-nangell border border-red-500/30 bg-red-500/5 px-3 py-2 text-xs"
                    >
                      {event.message}
                    </li>
                  ))
                )}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-medium text-nangell-text">Volume por minuto</h3>
              <div className="h-[160px]">
                <ResponsiveContainer width="100%" height={160} minWidth={0}>
                  <BarChart data={volumeData}>
                    <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="minute" tick={{ fill: "#94A3B8", fontSize: 10 }} />
                    <YAxis tick={{ fill: "#94A3B8", fontSize: 10 }} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{
                        background: "#0B0F1A",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    />
                    <Bar dataKey="count" fill="#00C2FC" radius={[4, 4, 0, 0]} name="Eventos" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-medium">Criar alerta fake</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Palavra-chave..."
                  value={alertKeyword}
                  onChange={(e) => setAlertKeyword(e.target.value)}
                />
                <Button size="sm" onClick={handleCreateAlert}>
                  <Plus className="h-4 w-4" aria-hidden />
                </Button>
              </div>
              {customAlerts.length > 0 ? (
                <ul className="mt-2 space-y-1">
                  {customAlerts.map((a) => (
                    <li key={a.id} className="text-xs text-nangell-muted">
                      Alerta: <span className="text-nangell-cyan">{a.keyword}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
