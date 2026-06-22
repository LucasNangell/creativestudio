"use client";

import { useCallback, useEffect, useState } from "react";
import { Pencil, Plus } from "lucide-react";
import { TestimonialStatus } from "@prisma/client";

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
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toast, useToast } from "@/components/ui/toast";
import type { TestimonialFormInput } from "@/lib/validations/testimonial";

type TestimonialRecord = TestimonialFormInput & {
  id: string;
  createdAt: string;
};

const STATUS_OPTIONS = [
  { label: "Aprovado", value: TestimonialStatus.APPROVED },
  { label: "Pendente", value: TestimonialStatus.PENDING },
];

const STATUS_LABELS: Record<TestimonialStatus, string> = {
  [TestimonialStatus.APPROVED]: "Aprovado",
  [TestimonialStatus.PENDING]: "Pendente",
};

function testimonialStatusTone(status: TestimonialStatus): "success" | "warning" {
  return status === TestimonialStatus.APPROVED ? "success" : "warning";
}

function emptyTestimonial(): TestimonialFormInput {
  return {
    clientName: "",
    clientRole: "",
    company: "",
    content: "",
    rating: 5,
    image: "",
    status: TestimonialStatus.PENDING,
  };
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(new Date(value));
}

export function TestimonialsAdminPanel() {
  const { toast, showToast, dismiss } = useToast();

  const [testimonials, setTestimonials] = useState<TestimonialRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TestimonialFormInput>(emptyTestimonial());
  const [saving, setSaving] = useState(false);

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/testimonials");
      if (!response.ok) throw new Error("fetch_failed");
      const data = (await response.json()) as { items: TestimonialRecord[] };
      setTestimonials(data.items ?? []);
    } catch {
      showToast("Não foi possível carregar os depoimentos.", "error");
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    void fetchTestimonials();
  }, [fetchTestimonials]);

  function openCreate() {
    setEditingId(null);
    setForm(emptyTestimonial());
    setModalOpen(true);
  }

  function openEdit(testimonial: TestimonialRecord) {
    setEditingId(testimonial.id);
    setForm({
      clientName: testimonial.clientName,
      clientRole: testimonial.clientRole,
      company: testimonial.company,
      content: testimonial.content,
      rating: testimonial.rating,
      image: testimonial.image,
      status: testimonial.status,
    });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingId(null);
  }

  function updateField<K extends keyof TestimonialFormInput>(
    key: K,
    value: TestimonialFormInput[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function saveTestimonial() {
    setSaving(true);
    try {
      const payload = {
        clientName: form.clientName.trim(),
        clientRole: form.clientRole.trim(),
        company: form.company.trim(),
        content: form.content.trim(),
        rating: Number(form.rating) || 5,
        image: form.image.trim(),
        status: form.status,
      };

      const url = editingId
        ? `/api/admin/testimonials/${editingId}`
        : "/api/admin/testimonials";
      const response = await fetch(url, {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || !result.success) {
        showToast(result.error ?? "Erro ao salvar depoimento.", "error");
        return;
      }

      showToast(editingId ? "Depoimento atualizado." : "Depoimento criado.");
      closeModal();
      await fetchTestimonials();
    } catch {
      showToast("Não foi possível salvar o depoimento.", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-nangell-text sm:text-3xl">
            Depoimentos
          </h1>
          <p className="mt-1 text-sm text-nangell-muted">
            Gerencie avaliações de clientes exibidas no site.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={openCreate}>
          <Plus className="h-4 w-4" aria-hidden />
          Novo depoimento
        </Button>
      </div>

      <div className="glass-card overflow-hidden p-1">
        {loading ? (
          <p className="px-4 py-10 text-center text-sm text-nangell-muted">Carregando...</p>
        ) : (
          <DataTable>
            <DataTableHead>
              <tr>
                <DataTableHeaderCell>Cliente</DataTableHeaderCell>
                <DataTableHeaderCell>Empresa</DataTableHeaderCell>
                <DataTableHeaderCell>Nota</DataTableHeaderCell>
                <DataTableHeaderCell>Status</DataTableHeaderCell>
                <DataTableHeaderCell>Data</DataTableHeaderCell>
                <DataTableHeaderCell className="text-right">Ações</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <DataTableBody>
              {testimonials.length === 0 ? (
                <DataTableEmpty colSpan={6} message="Nenhum depoimento cadastrado." />
              ) : (
                testimonials.map((testimonial) => (
                  <DataTableRow key={testimonial.id}>
                    <DataTableCell>
                      <p className="font-medium text-nangell-text">{testimonial.clientName}</p>
                      <p className="text-xs text-nangell-muted">{testimonial.clientRole}</p>
                    </DataTableCell>
                    <DataTableCell className="text-nangell-muted">{testimonial.company}</DataTableCell>
                    <DataTableCell className="text-nangell-cyan">{testimonial.rating}/5</DataTableCell>
                    <DataTableCell>
                      <StatusBadge
                        label={STATUS_LABELS[testimonial.status]}
                        tone={testimonialStatusTone(testimonial.status)}
                      />
                    </DataTableCell>
                    <DataTableCell className="font-mono text-xs text-nangell-muted">
                      {formatDate(testimonial.createdAt)}
                    </DataTableCell>
                    <DataTableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(testimonial)}>
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
        open={modalOpen}
        onClose={closeModal}
        title={editingId ? "Editar depoimento" : "Novo depoimento"}
        size="lg"
      >
        <div className="space-y-4">
          <FormSection title="Cliente">
            <Input
              label="Nome"
              value={form.clientName}
              onChange={(event) => updateField("clientName", event.target.value)}
            />
            <Input
              label="Cargo"
              value={form.clientRole}
              onChange={(event) => updateField("clientRole", event.target.value)}
            />
            <Input
              label="Empresa"
              value={form.company}
              onChange={(event) => updateField("company", event.target.value)}
            />
            <Input
              label="URL da foto"
              value={form.image}
              onChange={(event) => updateField("image", event.target.value)}
            />
          </FormSection>

          <FormSection title="Conteúdo">
            <Textarea
              label="Depoimento"
              rows={5}
              value={form.content}
              onChange={(event) => updateField("content", event.target.value)}
            />
            <Input
              label="Nota (1–5)"
              type="number"
              min={1}
              max={5}
              value={String(form.rating)}
              onChange={(event) => updateField("rating", Number(event.target.value))}
            />
            <Select
              label="Status"
              value={form.status}
              onChange={(event) =>
                updateField("status", event.target.value as TestimonialStatus)
              }
              options={STATUS_OPTIONS}
            />
          </FormSection>

          <div className="flex justify-end gap-2 border-t border-glass-border pt-4">
            <Button variant="ghost" size="sm" onClick={closeModal} disabled={saving}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => void saveTestimonial()}
              disabled={saving}
            >
              {saving ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>
      </Modal>

      <Toast toast={toast} onDismiss={dismiss} />
    </div>
  );
}
