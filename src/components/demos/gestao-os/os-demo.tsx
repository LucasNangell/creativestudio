"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Bell,
  ClipboardList,
  LayoutGrid,
  List,
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
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  OS_COLUMNS,
  OS_MOCK_ORDERS,
  OS_NOTIFICATIONS,
  type OsPriority,
  type OsStatus,
  type ServiceOrder,
} from "@/data/demos/os-mock";

const DEMO_ID = "gestao-os";
const STORAGE_KEY = "nangell-demo-os-orders";

function loadOrders(): ServiceOrder[] {
  if (typeof window === "undefined") return OS_MOCK_ORDERS;
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as ServiceOrder[];
  } catch {
    /* ignore */
  }
  return OS_MOCK_ORDERS;
}

const priorityVariant: Record<OsPriority, "default" | "warning" | "success" | "muted"> = {
  baixa: "muted",
  media: "default",
  alta: "warning",
  critica: "warning",
};

export function OsDemo() {
  const [orders, setOrders] = useState<ServiceOrder[]>(OS_MOCK_ORDERS);
  const [view, setView] = useState<"list" | "kanban">("kanban");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [selected, setSelected] = useState<ServiceOrder | null>(null);
  const [progressNote, setProgressNote] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("os");

  useEffect(() => {
    setOrders(loadOrders());
  }, []);

  const persist = useCallback((next: ServiceOrder[]) => {
    setOrders(next);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const filtered = useMemo(() => {
    return orders.filter((os) => {
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        os.codigo.toLowerCase().includes(q) ||
        os.titulo.toLowerCase().includes(q) ||
        os.cliente.toLowerCase().includes(q);
      if (!matchesSearch) return false;
      if (statusFilter !== "all" && os.status !== statusFilter) return false;
      if (priorityFilter !== "all" && os.prioridade !== priorityFilter) return false;
      return true;
    });
  }, [orders, search, statusFilter, priorityFilter]);

  const kpis = useMemo(
    () => ({
      abertas: orders.filter((o) => o.status === "aberta").length,
      andamento: orders.filter((o) => o.status === "em_andamento").length,
      criticas: orders.filter((o) => o.prioridade === "critica").length,
      concluidas: orders.filter((o) => o.status === "concluida").length,
    }),
    [orders],
  );

  const handleRegisterProgress = () => {
    if (!selected || !progressNote.trim()) return;
    const entry = {
      id: `t-${Date.now()}`,
      author: "Você (simulação)",
      message: progressNote,
      date: new Date().toLocaleString("pt-BR"),
    };
    const next = orders.map((os) =>
      os.id === selected.id
        ? { ...os, timeline: [...os.timeline, entry], status: "em_andamento" as OsStatus }
        : os,
    );
    persist(next);
    setSelected(next.find((o) => o.id === selected.id) ?? null);
    setProgressNote("");
    trackDemoFinish(DEMO_ID, "register_progress", selected.codigo);
  };

  const handleStatusChange = (status: OsStatus) => {
    if (!selected) return;
    const next = orders.map((os) =>
      os.id === selected.id ? { ...os, status } : os,
    );
    persist(next);
    setSelected(next.find((o) => o.id === selected.id) ?? null);
    trackDemoInteraction(DEMO_ID, "change_status", { status });
  };

  const sidebarItems = [
    { id: "os", label: "Ordens de serviço", active: activeNav === "os", onClick: () => setActiveNav("os") },
    { id: "tecnicos", label: "Técnicos", active: activeNav === "tecnicos", onClick: () => setActiveNav("tecnicos") },
    { id: "relatorios", label: "Relatórios", active: activeNav === "relatorios", onClick: () => setActiveNav("relatorios") },
  ];

  const renderCard = (os: ServiceOrder) => (
    <button
      key={os.id}
      type="button"
      onClick={() => {
        setSelected(os);
        trackDemoInteraction(DEMO_ID, "open_os", { codigo: os.codigo });
      }}
      className="w-full rounded-nangell border border-glass-border bg-nangell-dark/50 p-3 text-left transition-colors hover:border-nangell-cyan/30"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-mono text-[10px] text-nangell-cyan">{os.codigo}</span>
        <Badge variant={priorityVariant[os.prioridade]}>{os.prioridade}</Badge>
      </div>
      <p className="mt-1 text-sm font-medium text-nangell-text">{os.titulo}</p>
      <p className="text-xs text-nangell-muted">{os.cliente}</p>
      <p className="mt-2 text-[10px] text-nangell-muted">Prazo: {os.prazo}</p>
    </button>
  );

  return (
    <DemoShell
      demoId={DEMO_ID}
      title="Gestão de OS"
      subtitle="Controle operacional de ordens de serviço com kanban, timeline e notificações simuladas."
      ctaLabel="Preciso organizar minha operação"
      sidebar={<DemoSidebar title="Simulação OS" items={sidebarItems} />}
    >
      <div className="border-b border-glass-border bg-nangell-dark/40 px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <Button
              variant={view === "kanban" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setView("kanban")}
            >
              <LayoutGrid className="h-4 w-4" aria-hidden />
              Kanban
            </Button>
            <Button
              variant={view === "list" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setView("list")}
            >
              <List className="h-4 w-4" aria-hidden />
              Lista
            </Button>
          </div>
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                trackDemoInteraction(DEMO_ID, "toggle_notifications");
              }}
            >
              <Bell className="h-4 w-4" aria-hidden />
              Notificações
              <Badge variant="warning" className="ml-1 normal-case">
                {OS_NOTIFICATIONS.length}
              </Badge>
            </Button>
            {notificationsOpen ? (
              <div className="absolute right-0 z-20 mt-2 w-72 rounded-nangell border border-glass-border bg-nangell-surface p-3 shadow-glass">
                <ul className="space-y-2">
                  {OS_NOTIFICATIONS.map((n) => (
                    <li key={n.id} className="text-xs">
                      <p className="text-nangell-text">{n.message}</p>
                      <span className="text-nangell-muted">{n.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <DemoKpiCard label="Abertas" value={String(kpis.abertas)} trend="neutral" />
          <DemoKpiCard label="Em andamento" value={String(kpis.andamento)} trend="neutral" />
          <DemoKpiCard label="Críticas" value={String(kpis.criticas)} change="Atenção" trend="down" />
          <DemoKpiCard label="Concluídas" value={String(kpis.concluidas)} change="Este mês" trend="up" />
        </div>

        <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Input
            label="Buscar"
            placeholder="Código, título ou cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="lg:col-span-2"
          />
          <Select
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { label: "Todos", value: "all" },
              ...OS_COLUMNS.map((c) => ({ label: c.label, value: c.id })),
            ]}
          />
          <Select
            label="Prioridade"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            options={[
              { label: "Todas", value: "all" },
              { label: "Baixa", value: "baixa" },
              { label: "Média", value: "media" },
              { label: "Alta", value: "alta" },
              { label: "Crítica", value: "critica" },
            ]}
          />
        </div>

        {view === "kanban" ? (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {OS_COLUMNS.map((column) => {
              const columnOrders = filtered.filter((o) => o.status === column.id);
              return (
                <div
                  key={column.id}
                  className="min-w-[240px] flex-1 rounded-nangell border border-glass-border bg-nangell-dark/30 p-3"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-medium">{column.label}</h3>
                    <Badge variant="muted">{columnOrders.length}</Badge>
                  </div>
                  <div className="space-y-2">{columnOrders.map(renderCard)}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="overflow-x-auto rounded-nangell border border-glass-border">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-glass-border bg-nangell-dark/50">
                <tr>
                  <th className="px-4 py-3 font-medium text-nangell-muted">Código</th>
                  <th className="px-4 py-3 font-medium text-nangell-muted">Título</th>
                  <th className="px-4 py-3 font-medium text-nangell-muted">Cliente</th>
                  <th className="px-4 py-3 font-medium text-nangell-muted">Status</th>
                  <th className="px-4 py-3 font-medium text-nangell-muted">Prioridade</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((os) => (
                  <tr
                    key={os.id}
                    className="cursor-pointer border-b border-glass-border/50 hover:bg-white/5"
                    onClick={() => setSelected(os)}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-nangell-cyan">{os.codigo}</td>
                    <td className="px-4 py-3">{os.titulo}</td>
                    <td className="px-4 py-3 text-nangell-muted">{os.cliente}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline">{os.status.replace("_", " ")}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={priorityVariant[os.prioridade]}>{os.prioridade}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.codigo ?? "OS"}
        description={selected?.titulo}
        size="lg"
      >
        {selected ? (
          <div className="space-y-4">
            <div className="grid gap-2 text-sm sm:grid-cols-2">
              <p>
                <span className="text-nangell-muted">Cliente:</span> {selected.cliente}
              </p>
              <p>
                <span className="text-nangell-muted">Técnico:</span> {selected.tecnico}
              </p>
              <p className="sm:col-span-2">
                <span className="text-nangell-muted">Endereço:</span> {selected.endereco}
              </p>
              <p className="sm:col-span-2">{selected.descricao}</p>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium">Timeline</p>
              <ul className="max-h-40 space-y-2 overflow-y-auto">
                {selected.timeline.map((entry) => (
                  <li
                    key={entry.id}
                    className="rounded-nangell border border-glass-border bg-nangell-dark/40 px-3 py-2 text-sm"
                  >
                    <span className="font-mono text-[10px] text-nangell-muted">
                      {entry.date}, {entry.author}
                    </span>
                    <p className="mt-0.5">{entry.message}</p>
                  </li>
                ))}
              </ul>
            </div>

            <Textarea
              label="Registrar andamento"
              placeholder="Descreva o que foi feito..."
              value={progressNote}
              onChange={(e) => setProgressNote(e.target.value)}
              rows={3}
            />

            <div className="flex flex-wrap gap-2">
              <Button size="sm" onClick={handleRegisterProgress}>
                <ClipboardList className="h-4 w-4" aria-hidden />
                Registrar andamento
              </Button>
              {OS_COLUMNS.filter((c) => c.id !== selected.status).map((col) => (
                <Button
                  key={col.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleStatusChange(col.id)}
                >
                  Mover para {col.label}
                </Button>
              ))}
            </div>
          </div>
        ) : null}
      </Modal>
    </DemoShell>
  );
}
