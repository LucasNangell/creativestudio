"use client";

import { useCallback, useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { ServiceStatus } from "@prisma/client";

import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableEmpty,
  DataTableHead,
  DataTableHeaderCell,
  DataTableRow,
} from "@/components/admin/data-table";
import { FormSection } from "@/components/admin/form-section";
import { JsonListField } from "@/components/admin/json-list-field";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toast, useToast } from "@/components/ui/toast";
import { stringifyJsonArray } from "@/lib/slug";
import type { ServiceFormInput } from "@/lib/validations/service";

type ServiceRecord = ServiceFormInput & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

const STATUS_OPTIONS = [
  { label: "Ativo", value: ServiceStatus.ACTIVE },
  { label: "Inativo", value: ServiceStatus.INACTIVE },
];

const STATUS_LABELS: Record<ServiceStatus, string> = {
  [ServiceStatus.ACTIVE]: "Ativo",
  [ServiceStatus.INACTIVE]: "Inativo",
};

function serviceStatusTone(status: ServiceStatus): "success" | "muted" {
  return status === ServiceStatus.ACTIVE ? "success" : "muted";
}

function toFormState(service: ServiceRecord) {
  return {
    ...service,
    deliverables: stringifyJsonArray(
      Array.isArray(service.deliverables) ? service.deliverables : [],
    ),
    technologies: stringifyJsonArray(
      Array.isArray(service.technologies) ? service.technologies : [],
    ),
  };
}

type FormState = ReturnType<typeof toFormState>;

export function ServicesAdminPanel() {
  const { toast, showToast, dismiss } = useToast();

  const [services, setServices] = useState<ServiceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ServiceRecord | null>(null);
  const [form, setForm] = useState<FormState | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/services");
      if (!response.ok) throw new Error("fetch_failed");
      const data = (await response.json()) as { items: ServiceRecord[] };
      setServices(data.items ?? []);
    } catch {
      showToast("Não foi possível carregar os serviços.", "error");
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    void fetchServices();
  }, [fetchServices]);

  function openEdit(service: ServiceRecord) {
    setSelected(service);
    setForm(toFormState(service));
  }

  function closeModal() {
    setSelected(null);
    setForm(null);
  }

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => (current ? { ...current, [key]: value } : current));
  }

  async function saveService() {
    if (!selected || !form) return;

    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        headline: form.headline.trim(),
        description: form.description.trim(),
        problemSolved: form.problemSolved.trim(),
        deliverables: form.deliverables,
        technologies: form.technologies,
        targetAudience: form.targetAudience.trim(),
        ctaLabel: form.ctaLabel.trim(),
        seoTitle: form.seoTitle.trim(),
        seoDescription: form.seoDescription.trim(),
        status: form.status,
      };

      const response = await fetch(`/api/admin/services/${selected.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || !result.success) {
        showToast(result.error ?? "Erro ao salvar serviço.", "error");
        return;
      }

      showToast("Serviço atualizado.");
      closeModal();
      await fetchServices();
    } catch {
      showToast("Não foi possível salvar o serviço.", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-nangell-text sm:text-3xl">
          Serviços
        </h1>
        <p className="mt-1 text-sm text-nangell-muted">
          Edite soluções e páginas de serviços.
        </p>
      </div>

      <div className="glass-card overflow-hidden p-1">
        {loading ? (
          <p className="px-4 py-10 text-center text-sm text-nangell-muted">Carregando...</p>
        ) : (
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell>Título</DataTableHeaderCell>
                <DataTableHeaderCell>Slug</DataTableHeaderCell>
                <DataTableHeaderCell>Status</DataTableHeaderCell>
                <DataTableHeaderCell className="text-right">Ações</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <DataTableBody>
              {services.length === 0 ? (
                <DataTableEmpty colSpan={4} message="Nenhum serviço cadastrado." />
              ) : (
                services.map((service) => (
                  <DataTableRow key={service.id}>
                    <DataTableCell>
                      <p className="font-medium text-nangell-text">{service.title}</p>
                      <p className="text-xs text-nangell-muted">{service.headline}</p>
                    </DataTableCell>
                    <DataTableCell className="font-mono text-xs text-nangell-muted">
                      {service.slug}
                    </DataTableCell>
                    <DataTableCell>
                      <StatusBadge
                        label={STATUS_LABELS[service.status]}
                        tone={serviceStatusTone(service.status)}
                      />
                    </DataTableCell>
                    <DataTableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(service)}>
                        <Pencil className="h-4 w-4" aria-hidden />
                        Editar
                      </Button>
                    </DataTableCell>
                  </DataTableRow>
                ))
              )}
            </DataTableBody>
          </DataTable>
        )}
      </div>

      <Modal
        open={selected !== null && form !== null}
        onClose={closeModal}
        title={form?.title ?? "Editar serviço"}
        description={form?.headline}
        size="lg"
      >
        {form ? (
          <div className="max-h-[70vh] space-y-4 overflow-y-auto pr-1">
            <FormSection title="Identificação">
              <Input
                label="Título"
                value={form.title}
                onChange={(event) => updateField("title", event.target.value)}
              />
              <Input
                label="Slug"
                value={form.slug}
                onChange={(event) => updateField("slug", event.target.value)}
              />
              <Input
                label="Headline"
                value={form.headline}
                onChange={(event) => updateField("headline", event.target.value)}
              />
              <Select
                label="Status"
                value={form.status}
                onChange={(event) =>
                  updateField("status", event.target.value as ServiceStatus)
                }
                options={STATUS_OPTIONS}
              />
            </FormSection>

            <FormSection title="Conteúdo">
              <Textarea
                label="Descrição"
                rows={4}
                value={form.description}
                onChange={(event) => updateField("description", event.target.value)}
              />
              <Textarea
                label="Problema resolvido"
                value={form.problemSolved}
                onChange={(event) => updateField("problemSolved", event.target.value)}
              />
              <Textarea
                label="Público-alvo"
                value={form.targetAudience}
                onChange={(event) => updateField("targetAudience", event.target.value)}
              />
              <JsonListField
                label="Entregáveis"
                value={form.deliverables}
                onChange={(value) => updateField("deliverables", value)}
              />
              <JsonListField
                label="Tecnologias"
                value={form.technologies}
                onChange={(value) => updateField("technologies", value)}
              />
              <Input
                label="Texto do CTA"
                value={form.ctaLabel}
                onChange={(event) => updateField("ctaLabel", event.target.value)}
              />
            </FormSection>

            <FormSection title="SEO">
              <Input
                label="Título SEO"
                value={form.seoTitle}
                onChange={(event) => updateField("seoTitle", event.target.value)}
              />
              <Textarea
                label="Descrição SEO"
                value={form.seoDescription}
                onChange={(event) => updateField("seoDescription", event.target.value)}
              />
            </FormSection>

            <div className="flex justify-end gap-2 border-t border-glass-border pt-4">
              <Button variant="ghost" size="sm" onClick={closeModal} disabled={saving}>
                Cancelar
              </Button>
              <Button variant="primary" size="sm" onClick={() => void saveService()} disabled={saving}>
                {saving ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>

      <Toast toast={toast} onDismiss={dismiss} />
    </div>
  );
}
