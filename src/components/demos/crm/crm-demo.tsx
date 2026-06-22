"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Building2,
  Download,
  Filter,
  GripVertical,
  Mail,
  MessageCircle,
  Phone,
  User,
} from "lucide-react";

import {
  DemoContentLoader,
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
import {
  CRM_COLUMNS,
  CRM_MOCK_LEADS,
  formatCurrency,
  type CrmLead,
  type CrmLeadOrigin,
  type CrmLeadStatus,
} from "@/data/demos/crm-mock";
import { cn } from "@/lib/utils";

const DEMO_ID = "crm-inteligente";
const STORAGE_KEY = "nangell-demo-crm-leads";

function loadLeads(): CrmLead[] {
  if (typeof window === "undefined") return CRM_MOCK_LEADS;
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as CrmLead[];
  } catch {
    /* ignore */
  }
  return CRM_MOCK_LEADS;
}

function DroppableColumn({
  id,
  label,
  count,
  children,
}: {
  id: CrmLeadStatus;
  label: string;
  count: number;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "min-w-[220px] flex-1 rounded-nangell border border-glass-border bg-nangell-dark/30 p-3",
        isOver && "border-nangell-cyan/40 bg-nangell-cyan/5",
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-nangell-text">{label}</h3>
        <Badge variant="muted">{count}</Badge>
      </div>
      {children}
    </div>
  );
}

function LeadCard({
  lead,
  onOpen,
  overlay = false,
}: {
  lead: CrmLead;
  onOpen: (lead: CrmLead) => void;
  overlay?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: lead.id, data: { status: lead.status } });

  const style = overlay
    ? undefined
    : {
        transform: CSS.Transform.toString(transform),
        transition,
      };

  return (
    <div
      ref={overlay ? undefined : setNodeRef}
      style={style}
      className={cn(
        "rounded-nangell border border-glass-border bg-nangell-dark/50 p-3",
        isDragging && "opacity-40",
        overlay && "shadow-glow-soft",
      )}
    >
      <div className="flex items-start gap-2">
        <button
          type="button"
          className="mt-0.5 cursor-grab text-nangell-muted hover:text-nangell-cyan active:cursor-grabbing"
          aria-label={`Arrastar lead ${lead.nome}`}
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="min-w-0 flex-1 text-left"
          onClick={() => onOpen(lead)}
        >
          <p className="truncate font-medium text-nangell-text">{lead.nome}</p>
          <p className="truncate text-xs text-nangell-muted">{lead.empresa}</p>
          <p className="mt-2 font-mono text-xs text-nangell-cyan">
            {formatCurrency(lead.valorEstimado)}
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            <Badge variant="muted">{lead.origem}</Badge>
          </div>
        </button>
      </div>
    </div>
  );
}

export function CrmDemo() {
  const [leads, setLeads] = useState<CrmLead[]>(CRM_MOCK_LEADS);
  const [activeLead, setActiveLead] = useState<CrmLead | null>(null);
  const [selectedLead, setSelectedLead] = useState<CrmLead | null>(null);
  const [originFilter, setOriginFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [whatsappMessage, setWhatsappMessage] = useState("");
  const [proposalSent, setProposalSent] = useState(false);
  const [activeNav, setActiveNav] = useState("pipeline");
  const [isNavLoading, setIsNavLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [exportMsg, setExportMsg] = useState("");

  useEffect(() => {
    setLeads(loadLeads());
  }, []);

  const handleNavChange = (id: string) => {
    if (id === activeNav) return;
    setIsNavLoading(true);
    setActiveNav(id);
    trackDemoInteraction(DEMO_ID, "nav_change", { section: id });
    window.setTimeout(() => setIsNavLoading(false), 320);
  };

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const persistLeads = useCallback((next: CrmLead[]) => {
    setLeads(next);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      if (originFilter !== "all" && lead.origem !== originFilter) return false;
      if (statusFilter !== "all" && lead.status !== statusFilter) return false;
      return true;
    });
  }, [leads, originFilter, statusFilter]);

  const kpis = useMemo(() => {
    const pipeline = leads.reduce((sum, l) => sum + l.valorEstimado, 0);
    const fechados = leads.filter((l) => l.status === "fechado").length;
    const novos = leads.filter((l) => l.status === "novo").length;
    return {
      pipeline: formatCurrency(pipeline),
      fechados,
      novos,
      taxa: `${Math.round((fechados / leads.length) * 100)}%`,
    };
  }, [leads]);

  const handleDragStart = (event: DragStartEvent) => {
    const lead = leads.find((l) => l.id === event.active.id);
    if (lead) setActiveLead(lead);
    trackDemoInteraction(DEMO_ID, "kanban_drag_start", { leadId: String(event.active.id) });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveLead(null);
    const { active, over } = event;
    if (!over) return;

    const leadId = String(active.id);
    let newStatus: CrmLeadStatus | null = null;

    if (CRM_COLUMNS.some((col) => col.id === over.id)) {
      newStatus = over.id as CrmLeadStatus;
    } else {
      const overLead = leads.find((l) => l.id === over.id);
      if (overLead) newStatus = overLead.status;
    }

    if (!newStatus) return;

    setIsActionLoading(true);
    const next = leads.map((lead) =>
      lead.id === leadId ? { ...lead, status: newStatus!, ultimaInteracao: "Agora" } : lead,
    );
    persistLeads(next);
    trackDemoInteraction(DEMO_ID, "kanban_move", { status: newStatus });
    window.setTimeout(() => setIsActionLoading(false), 280);
  };

  const handleOpenLead = (lead: CrmLead) => {
    setSelectedLead(lead);
    trackDemoInteraction(DEMO_ID, "open_lead_detail", { leadId: lead.id });
  };

  const handleSendWhatsapp = () => {
    if (!selectedLead || !whatsappMessage.trim()) return;
    const interaction = {
      id: `wa-${Date.now()}`,
      type: "whatsapp" as const,
      message: whatsappMessage,
      date: new Date().toLocaleString("pt-BR"),
    };
    const next = leads.map((l) =>
      l.id === selectedLead.id
        ? {
            ...l,
            interactions: [...l.interactions, interaction],
            ultimaInteracao: "Agora",
          }
        : l,
    );
    persistLeads(next);
    setSelectedLead(next.find((l) => l.id === selectedLead.id) ?? null);
    setWhatsappMessage("");
    setWhatsappOpen(false);
    trackDemoFinish(DEMO_ID, "whatsapp_sent", selectedLead.nome);
  };

  const handleCreateProposal = () => {
    setIsActionLoading(true);
    setProposalSent(true);
    trackDemoFinish(DEMO_ID, "proposal_created");
    window.setTimeout(() => {
      setProposalSent(false);
      setIsActionLoading(false);
    }, 3000);
  };

  const handleExportCsv = () => {
    setExportMsg("Exportação simulada — arquivo CRM-leads.csv gerado.");
    trackDemoFinish(DEMO_ID, "export_csv");
    window.setTimeout(() => setExportMsg(""), 4000);
  };

  const statusChartData = useMemo(() => {
    return CRM_COLUMNS.map((col) => ({
      label: col.label,
      count: leads.filter((l) => l.status === col.id).length,
    }));
  }, [leads]);

  const originChartData = useMemo(() => {
    const origins = ["Site", "WhatsApp", "Indicação", "LinkedIn", "Evento"] as CrmLeadOrigin[];
    return origins.map((origin) => ({
      label: origin,
      count: leads.filter((l) => l.origem === origin).length,
    }));
  }, [leads]);

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", active: activeNav === "dashboard", onClick: () => handleNavChange("dashboard") },
    { id: "pipeline", label: "Pipeline", active: activeNav === "pipeline", onClick: () => handleNavChange("pipeline") },
    { id: "relatorios", label: "Relatórios", active: activeNav === "relatorios", onClick: () => handleNavChange("relatorios") },
  ];

  return (
    <DemoShell
      demoId={DEMO_ID}
      title="CRM Inteligente"
      subtitle="Funil comercial com kanban, timeline e simulação de WhatsApp — dados 100% fictícios."
      ctaLabel="Quero um CRM parecido"
      sidebar={<DemoSidebar title="CRM Demo" items={sidebarItems} />}
    >
      <DemoContentLoader loading={isNavLoading || isActionLoading}>
      <div className="p-4 sm:p-6">
        {activeNav === "dashboard" ? (
          <>
            <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <DemoKpiCard label="Pipeline total" value={kpis.pipeline} change="+12% vs mês anterior" trend="up" />
              <DemoKpiCard label="Leads novos" value={String(kpis.novos)} change="Esta semana" trend="neutral" />
              <DemoKpiCard label="Negócios fechados" value={String(kpis.fechados)} change={kpis.taxa} trend="up" />
              <DemoKpiCard label="Taxa de conversão" value={kpis.taxa} change="Simulado" trend="neutral" />
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-nangell border border-glass-border bg-nangell-dark/30 p-4">
                <h3 className="mb-4 text-sm font-medium text-nangell-text">Leads por etapa do funil</h3>
                <ul className="space-y-3">
                  {statusChartData.map((item) => (
                    <li key={item.label}>
                      <div className="mb-1 flex justify-between text-xs text-nangell-muted">
                        <span>{item.label}</span>
                        <span>{item.count}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/5">
                        <div
                          className="h-full rounded-full bg-nangell-gradient"
                          style={{ width: `${Math.max((item.count / leads.length) * 100, 4)}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-nangell border border-glass-border bg-nangell-dark/30 p-4">
                <h3 className="mb-4 text-sm font-medium text-nangell-text">Origem dos leads</h3>
                <ul className="space-y-3">
                  {originChartData.map((item) => (
                    <li key={item.label}>
                      <div className="mb-1 flex justify-between text-xs text-nangell-muted">
                        <span>{item.label}</span>
                        <span>{item.count}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/5">
                        <div
                          className="h-full rounded-full bg-nangell-blue"
                          style={{ width: `${Math.max((item.count / leads.length) * 100, 4)}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        ) : activeNav === "relatorios" ? (
          <>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <Select
                  label="Origem"
                  value={originFilter}
                  onChange={(e) => {
                    setOriginFilter(e.target.value);
                    trackDemoInteraction(DEMO_ID, "filter_origin", { value: e.target.value });
                  }}
                  options={[
                    { label: "Todas", value: "all" },
                    ...(["Site", "WhatsApp", "Indicação", "LinkedIn", "Evento"] as CrmLeadOrigin[]).map(
                      (o) => ({ label: o, value: o }),
                    ),
                  ]}
                  className="sm:max-w-[180px]"
                />
                <Select
                  label="Status"
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    trackDemoInteraction(DEMO_ID, "filter_status", { value: e.target.value });
                  }}
                  options={[
                    { label: "Todos", value: "all" },
                    ...CRM_COLUMNS.map((c) => ({ label: c.label, value: c.id })),
                  ]}
                  className="sm:max-w-[180px]"
                />
              </div>
              <Button variant="outline" size="sm" onClick={handleExportCsv}>
                <Download className="h-4 w-4" aria-hidden />
                Exportar CSV
              </Button>
            </div>
            {exportMsg ? (
              <p className="mb-4 text-sm text-emerald-400" role="status">
                {exportMsg}
              </p>
            ) : null}
            <div className="overflow-x-auto rounded-nangell border border-glass-border">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="border-b border-glass-border bg-nangell-dark/40">
                  <tr>
                    <th className="px-4 py-3 font-medium text-nangell-muted">Nome</th>
                    <th className="px-4 py-3 font-medium text-nangell-muted">Empresa</th>
                    <th className="px-4 py-3 font-medium text-nangell-muted">Status</th>
                    <th className="px-4 py-3 font-medium text-nangell-muted">Origem</th>
                    <th className="px-4 py-3 font-medium text-nangell-muted">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-glass-border/50 hover:bg-white/[0.02]">
                      <td className="px-4 py-3 text-nangell-text">{lead.nome}</td>
                      <td className="px-4 py-3 text-nangell-muted">{lead.empresa}</td>
                      <td className="px-4 py-3">
                        <Badge variant="muted">
                          {CRM_COLUMNS.find((c) => c.id === lead.status)?.label ?? lead.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-nangell-muted">{lead.origem}</td>
                      <td className="px-4 py-3 font-mono text-nangell-cyan">
                        {formatCurrency(lead.valorEstimado)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <>
        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <DemoKpiCard label="Pipeline total" value={kpis.pipeline} change="+12% vs mês anterior" trend="up" />
          <DemoKpiCard label="Leads novos" value={String(kpis.novos)} change="Esta semana" trend="neutral" />
          <DemoKpiCard label="Negócios fechados" value={String(kpis.fechados)} change={kpis.taxa} trend="up" />
          <DemoKpiCard label="Taxa de conversão" value={kpis.taxa} change="Simulado" trend="neutral" />
        </div>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end">
          <Select
            label="Origem"
            value={originFilter}
            onChange={(e) => {
              setOriginFilter(e.target.value);
              trackDemoInteraction(DEMO_ID, "filter_origin", { value: e.target.value });
            }}
            options={[
              { label: "Todas", value: "all" },
              ...(["Site", "WhatsApp", "Indicação", "LinkedIn", "Evento"] as CrmLeadOrigin[]).map(
                (o) => ({ label: o, value: o }),
              ),
            ]}
            className="sm:max-w-[180px]"
          />
          <Select
            label="Status"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              trackDemoInteraction(DEMO_ID, "filter_status", { value: e.target.value });
            }}
            options={[
              { label: "Todos", value: "all" },
              ...CRM_COLUMNS.map((c) => ({ label: c.label, value: c.id })),
            ]}
            className="sm:max-w-[180px]"
          />
          <div className="flex items-center gap-2 pb-0.5 text-xs text-nangell-muted">
            <Filter className="h-4 w-4" aria-hidden />
            {filteredLeads.length} leads visíveis
          </div>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-3 overflow-x-auto pb-2">
            {CRM_COLUMNS.map((column) => {
              const columnLeads = filteredLeads.filter((l) => l.status === column.id);
              return (
                <DroppableColumn
                  key={column.id}
                  id={column.id}
                  label={column.label}
                  count={columnLeads.length}
                >
                  <SortableContext
                    items={columnLeads.map((l) => l.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="min-h-[120px] space-y-2">
                      {columnLeads.map((lead) => (
                        <LeadCard key={lead.id} lead={lead} onOpen={handleOpenLead} />
                      ))}
                    </div>
                  </SortableContext>
                </DroppableColumn>
              );
            })}
          </div>

          <DragOverlay>
            {activeLead ? (
              <div className="rounded-nangell border border-nangell-cyan/40 bg-nangell-surface p-3 shadow-glow">
                <p className="font-medium">{activeLead.nome}</p>
                <p className="text-xs text-nangell-muted">{activeLead.empresa}</p>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
          </>
        )}
      </div>
      </DemoContentLoader>

      <Modal
        open={!!selectedLead}
        onClose={() => setSelectedLead(null)}
        title={selectedLead?.nome ?? "Lead"}
        description={selectedLead?.empresa}
        size="lg"
      >
        {selectedLead ? (
          <div className="space-y-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-nangell-cyan" aria-hidden />
                {selectedLead.email}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-nangell-cyan" aria-hidden />
                {selectedLead.telefone}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="h-4 w-4 text-nangell-cyan" aria-hidden />
                {selectedLead.interesse}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-nangell-cyan" aria-hidden />
                {selectedLead.responsavel}
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-nangell-text">Timeline de interações</p>
              <ul className="space-y-2">
                {selectedLead.interactions.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-nangell border border-glass-border bg-nangell-dark/40 px-3 py-2 text-sm"
                  >
                    <span className="font-mono text-[10px] text-nangell-muted">{item.date}</span>
                    <p className="mt-0.5">{item.message}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setWhatsappOpen(true);
                  trackDemoInteraction(DEMO_ID, "open_whatsapp");
                }}
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                Simular WhatsApp
              </Button>
              <Button size="sm" onClick={handleCreateProposal}>
                {proposalSent ? "Proposta enviada!" : "Criar proposta"}
              </Button>
            </div>

            {whatsappOpen ? (
              <div className="rounded-nangell border border-emerald-500/30 bg-emerald-500/5 p-4">
                <p className="mb-2 text-sm font-medium text-emerald-400">WhatsApp simulado</p>
                <Input
                  label="Mensagem"
                  placeholder="Olá! Segue nossa proposta comercial..."
                  value={whatsappMessage}
                  onChange={(e) => setWhatsappMessage(e.target.value)}
                />
                <div className="mt-3 flex gap-2">
                  <Button size="sm" onClick={handleSendWhatsapp}>
                    Enviar
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setWhatsappOpen(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </Modal>
    </DemoShell>
  );
}
