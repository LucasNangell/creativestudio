"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Download, MessageCircle } from "lucide-react";
import type { LeadStatus } from "@prisma/client";

import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableEmpty,
  DataTableHead,
  DataTableHeaderCell,
  DataTableRow,
} from "@/components/admin/data-table";
import { leadStatusTone, StatusBadge } from "@/components/admin/status-badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toast, useToast } from "@/components/ui/toast";
import { PROJECT_TYPE_OPTIONS } from "@/lib/validations/lead";
import { LEAD_STATUS_OPTIONS } from "@/lib/validations/lead-admin";
import {
  buildContextualWhatsAppUrl,
  type WhatsAppContext,
} from "@/lib/whatsapp";

type LeadRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  website: string | null;
  projectType: string;
  challenge: string;
  budgetRange: string;
  urgency: string;
  preferredContact: string;
  message: string | null;
  sourcePage: string;
  sourceDemo: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  consent: boolean;
  status: LeadStatus;
  internalNotes: string | null;
  createdAt: string;
  updatedAt: string;
};

type LeadsListResponse = {
  items: LeadRecord[];
  total: number;
  page: number;
  pageSize: number;
};

const PAGE_SIZE = 10;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

function getStatusLabel(status: LeadStatus) {
  return LEAD_STATUS_OPTIONS.find((option) => option.value === status)?.label ?? status;
}

function getWhatsAppSource(sourcePage: string): WhatsAppContext["source"] {
  if (sourcePage.includes("diagnostico")) return "diagnostico";
  if (sourcePage.includes("contato")) return "contato";
  if (sourcePage.includes("obrigado")) return "obrigado";
  return "geral";
}

export function LeadsAdminPanel() {
  const { toast, showToast, dismiss } = useToast();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [projectTypeFilter, setProjectTypeFilter] = useState("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [page, setPage] = useState(1);

  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);
  const [editStatus, setEditStatus] = useState<LeadStatus>("NOVO");
  const [editNotes, setEditNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const exportUrl = useMemo(() => {
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (statusFilter) params.set("status", statusFilter);
    if (projectTypeFilter) params.set("projectType", projectTypeFilter);
    params.set("sort", "createdAt");
    params.set("order", sortOrder);
    const query = params.toString();
    return query ? `/api/admin/leads/export?${query}` : "/api/admin/leads/export";
  }, [search, statusFilter, projectTypeFilter, sortOrder]);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(PAGE_SIZE),
        sort: "createdAt",
        order: sortOrder,
      });
      if (search.trim()) params.set("search", search.trim());
      if (statusFilter) params.set("status", statusFilter);
      if (projectTypeFilter) params.set("projectType", projectTypeFilter);

      const response = await fetch(`/api/admin/leads?${params.toString()}`);
      if (!response.ok) throw new Error("fetch_failed");

      const data = (await response.json()) as LeadsListResponse;
      setLeads(data.items ?? []);
      setTotal(data.total ?? 0);
    } catch {
      showToast("Não foi possível carregar os leads.", "error");
      setLeads([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter, projectTypeFilter, sortOrder, showToast]);

  useEffect(() => {
    void fetchLeads();
  }, [fetchLeads]);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, projectTypeFilter, sortOrder]);

  function openLead(lead: LeadRecord) {
    setSelectedLead(lead);
    setEditStatus(lead.status);
    setEditNotes(lead.internalNotes ?? "");
  }

  function closeModal() {
    setSelectedLead(null);
  }

  async function saveLead() {
    if (!selectedLead) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/admin/leads/${selectedLead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: editStatus,
          internalNotes: editNotes.trim() || null,
        }),
      });

      const result = (await response.json()) as {
        success?: boolean;
        data?: LeadRecord;
        error?: string;
      };

      if (!response.ok || !result.success) {
        showToast(result.error ?? "Erro ao salvar lead.", "error");
        return;
      }

      const updated = result.data ?? {
        ...selectedLead,
        status: editStatus,
        internalNotes: editNotes.trim() || null,
      };

      setLeads((current) =>
        current.map((lead) => (lead.id === updated.id ? updated : lead)),
      );
      setSelectedLead(updated);
      showToast("Lead atualizado com sucesso.");
    } catch {
      showToast("Não foi possível salvar as alterações.", "error");
    } finally {
      setSaving(false);
    }
  }

  const whatsAppUrl = selectedLead
    ? buildContextualWhatsAppUrl({
        name: selectedLead.name,
        company: selectedLead.company,
        projectType: selectedLead.projectType,
        source: getWhatsAppSource(selectedLead.sourcePage),
      })
    : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-nangell-text sm:text-3xl">
            Leads
          </h1>
          <p className="mt-1 text-sm text-nangell-muted">
            Gerencie diagnósticos e contatos captados no site.
          </p>
        </div>
        <a
          href={exportUrl}
          download
          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
        >
          <Download className="h-4 w-4" aria-hidden />
          Exportar CSV
        </a>
      </div>

      <div className="glass-card grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
        <Input
          label="Buscar"
          placeholder="Nome, e-mail ou empresa..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="sm:col-span-2 lg:col-span-1"
        />
        <Select
          label="Status"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          options={[
            { label: "Todos", value: "" },
            ...LEAD_STATUS_OPTIONS.map((option) => ({
              label: option.label,
              value: option.value,
            })),
          ]}
        />
        <Select
          label="Tipo de projeto"
          value={projectTypeFilter}
          onChange={(event) => setProjectTypeFilter(event.target.value)}
          options={[
            { label: "Todos", value: "" },
            ...PROJECT_TYPE_OPTIONS.map((option) => ({
              label: option.label,
              value: option.label,
            })),
          ]}
        />
        <Select
          label="Ordenar por data"
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value as "desc" | "asc")}
          options={[
            { label: "Mais recentes", value: "desc" },
            { label: "Mais antigos", value: "asc" },
          ]}
        />
      </div>

      <div className="glass-card overflow-hidden p-1">
        {loading ? (
          <p className="px-4 py-10 text-center text-sm text-nangell-muted">Carregando...</p>
        ) : (
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell>Nome</DataTableHeaderCell>
                <DataTableHeaderCell>Empresa</DataTableHeaderCell>
                <DataTableHeaderCell>Projeto</DataTableHeaderCell>
                <DataTableHeaderCell>Status</DataTableHeaderCell>
                <DataTableHeaderCell>Data</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <DataTableBody>
              {leads.length === 0 ? (
                <DataTableEmpty colSpan={5} message="Nenhum lead encontrado." />
              ) : (
                leads.map((lead) => (
                  <DataTableRow key={lead.id} onClick={() => openLead(lead)}>
                    <DataTableCell>
                      <p className="font-medium text-nangell-text">{lead.name}</p>
                      <p className="text-xs text-nangell-muted">{lead.email}</p>
                    </DataTableCell>
                    <DataTableCell className="text-nangell-muted">{lead.company}</DataTableCell>
                    <DataTableCell className="text-nangell-muted">{lead.projectType}</DataTableCell>
                    <DataTableCell>
                      <StatusBadge
                        label={getStatusLabel(lead.status)}
                        tone={leadStatusTone(lead.status)}
                      />
                    </DataTableCell>
                    <DataTableCell className="font-mono text-xs text-nangell-muted">
                      {formatDate(lead.createdAt)}
                    </DataTableCell>
                  </DataTableRow>
                ))
              )}
            </DataTableBody>
          </DataTable>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-nangell-muted">
          {total} registro(s) · Página {page} de {totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1 || loading}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages || loading}
            onClick={() => setPage((current) => current + 1)}
          >
            Próxima
          </Button>
        </div>
      </div>

      <Modal
        open={selectedLead !== null}
        onClose={closeModal}
        title={selectedLead?.name ?? "Lead"}
        description={selectedLead ? `${selectedLead.company} · ${selectedLead.email}` : undefined}
        size="lg"
      >
        {selectedLead ? (
          <div className="max-h-[70vh] space-y-6 overflow-y-auto pr-1">
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-nangell-muted">Telefone</dt>
                <dd className="text-nangell-text">{selectedLead.phone}</dd>
              </div>
              <div>
                <dt className="text-nangell-muted">Contato preferido</dt>
                <dd className="text-nangell-text">{selectedLead.preferredContact}</dd>
              </div>
              <div>
                <dt className="text-nangell-muted">Tipo de projeto</dt>
                <dd className="text-nangell-text">{selectedLead.projectType}</dd>
              </div>
              <div>
                <dt className="text-nangell-muted">Orçamento</dt>
                <dd className="text-nangell-text">{selectedLead.budgetRange}</dd>
              </div>
              <div>
                <dt className="text-nangell-muted">Urgência</dt>
                <dd className="text-nangell-text">{selectedLead.urgency}</dd>
              </div>
              <div>
                <dt className="text-nangell-muted">Origem</dt>
                <dd className="text-nangell-text">{selectedLead.sourcePage}</dd>
              </div>
              {selectedLead.website ? (
                <div className="sm:col-span-2">
                  <dt className="text-nangell-muted">Website</dt>
                  <dd className="text-nangell-cyan">{selectedLead.website}</dd>
                </div>
              ) : null}
            </dl>

            <div>
              <p className="mb-1 text-sm font-medium text-nangell-muted">Desafio / mensagem</p>
              <p className="whitespace-pre-wrap rounded-nangell border border-glass-border bg-nangell-dark/30 p-3 text-sm text-nangell-text">
                {selectedLead.challenge}
              </p>
            </div>

            <Select
              label="Status"
              value={editStatus}
              onChange={(event) => setEditStatus(event.target.value as LeadStatus)}
              options={LEAD_STATUS_OPTIONS.map((option) => ({
                label: option.label,
                value: option.value,
              }))}
            />

            <Textarea
              label="Notas internas"
              rows={4}
              value={editNotes}
              onChange={(event) => setEditNotes(event.target.value)}
              placeholder="Anotações de acompanhamento comercial..."
            />

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-glass-border pt-4">
              {whatsAppUrl ? (
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" aria-hidden />
                  WhatsApp
                </a>
              ) : (
                <span />
              )}
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={closeModal} disabled={saving}>
                  Fechar
                </Button>
                <Button variant="primary" size="sm" onClick={() => void saveLead()} disabled={saving}>
                  {saving ? "Salvando..." : "Salvar"}
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>

      <Toast toast={toast} onDismiss={dismiss} />
    </div>
  );
}
