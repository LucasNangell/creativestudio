"use client";

import { useCallback, useEffect, useState } from "react";
import { Pencil, Plus, Star, X } from "lucide-react";
import { DemoType, ProjectStatus } from "@prisma/client";

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
import { projectStatusTone, StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toast, useToast } from "@/components/ui/toast";
import { slugify, stringifyJsonArray } from "@/lib/slug";
import type { ProjectFormInput } from "@/lib/validations/project";

type ProjectRecord = ProjectFormInput & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

const DEMO_TYPE_OPTIONS = [
  { label: "Nenhuma", value: DemoType.NONE },
  { label: "Nativa", value: DemoType.NATIVE },
  { label: "Iframe", value: DemoType.IFRAME },
  { label: "Externa", value: DemoType.EXTERNAL },
];

const STATUS_OPTIONS = [
  { label: "Rascunho", value: ProjectStatus.DRAFT },
  { label: "Publicado", value: ProjectStatus.PUBLISHED },
  { label: "Oculto", value: ProjectStatus.HIDDEN },
];

const STATUS_LABELS: Record<ProjectStatus, string> = {
  [ProjectStatus.DRAFT]: "Rascunho",
  [ProjectStatus.PUBLISHED]: "Publicado",
  [ProjectStatus.HIDDEN]: "Oculto",
};

function emptyProject(): ProjectFormInput {
  return {
    title: "",
    slug: "",
    category: "",
    shortDescription: "",
    fullDescription: "",
    problem: "",
    solution: "",
    features: [],
    stack: [],
    coverImage: "",
    gallery: [],
    metrics: undefined,
    demoType: DemoType.NONE,
    demoRoute: null,
    isFeatured: false,
    status: ProjectStatus.DRAFT,
    seoTitle: "",
    seoDescription: "",
    sortOrder: 0,
  };
}

function toFormState(project: ProjectRecord | ProjectFormInput) {
  return {
    ...project,
    features: stringifyJsonArray(
      Array.isArray(project.features) ? project.features : [],
    ),
    stack: stringifyJsonArray(Array.isArray(project.stack) ? project.stack : []),
    gallery: stringifyJsonArray(
      Array.isArray(project.gallery) ? project.gallery : [],
    ),
    metrics:
      project.metrics && typeof project.metrics === "object"
        ? JSON.stringify(project.metrics, null, 2)
        : typeof project.metrics === "string"
          ? project.metrics
          : "",
    demoRoute: project.demoRoute ?? "",
    sortOrder: String(project.sortOrder ?? 0),
  };
}

type FormState = ReturnType<typeof toFormState>;

export function ProjectsAdminPanel() {
  const { toast, showToast, dismiss } = useToast();

  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(toFormState(emptyProject()));
  const [autoSlug, setAutoSlug] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/projects");
      if (!response.ok) throw new Error("fetch_failed");
      const data = (await response.json()) as { items: ProjectRecord[] };
      setProjects(data.items ?? []);
    } catch {
      showToast("Não foi possível carregar os projetos.", "error");
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    void fetchProjects();
  }, [fetchProjects]);

  function openCreate() {
    setEditingId(null);
    setForm(toFormState(emptyProject()));
    setAutoSlug(true);
    setPanelOpen(true);
  }

  function openEdit(project: ProjectRecord) {
    setEditingId(project.id);
    setForm(toFormState(project));
    setAutoSlug(false);
    setPanelOpen(true);
  }

  function closePanel() {
    setPanelOpen(false);
    setEditingId(null);
  }

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => {
      const next = { ...current, [key]: value };
      if (key === "title" && autoSlug && typeof value === "string") {
        next.slug = slugify(value);
      }
      return next;
    });
  }

  async function saveProject() {
    setSaving(true);
    try {
      let metrics: ProjectFormInput["metrics"];
      if (form.metrics.trim()) {
        try {
          metrics = JSON.parse(form.metrics) as Record<string, unknown>;
        } catch {
          showToast("JSON de métricas inválido.", "error");
          setSaving(false);
          return;
        }
      }

      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        category: form.category.trim(),
        shortDescription: form.shortDescription.trim(),
        fullDescription: form.fullDescription.trim(),
        problem: form.problem.trim(),
        solution: form.solution.trim(),
        features: form.features,
        stack: form.stack,
        coverImage: form.coverImage.trim(),
        gallery: form.gallery,
        metrics,
        demoType: form.demoType,
        demoRoute: form.demoRoute.trim() || null,
        isFeatured: form.isFeatured,
        status: form.status,
        seoTitle: form.seoTitle.trim(),
        seoDescription: form.seoDescription.trim(),
        sortOrder: Number(form.sortOrder) || 0,
      };

      const url = editingId
        ? `/api/admin/projects/${editingId}`
        : "/api/admin/projects";
      const response = await fetch(url, {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        success?: boolean;
        data?: ProjectRecord;
        error?: string;
      };

      if (!response.ok || !result.success) {
        showToast(result.error ?? "Erro ao salvar projeto.", "error");
        return;
      }

      showToast(editingId ? "Projeto atualizado." : "Projeto criado.");
      closePanel();
      await fetchProjects();
    } catch {
      showToast("Não foi possível salvar o projeto.", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-nangell-text sm:text-3xl">
            Projetos
          </h1>
          <p className="mt-1 text-sm text-nangell-muted">
            Cadastre e edite cases do portfólio.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={openCreate}>
          <Plus className="h-4 w-4" aria-hidden />
          Novo projeto
        </Button>
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
                <DataTableHeaderCell>Destaque</DataTableHeaderCell>
                <DataTableHeaderCell className="text-right">Ações</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <DataTableBody>
              {projects.length === 0 ? (
                <DataTableEmpty colSpan={5} message="Nenhum projeto cadastrado." />
              ) : (
                projects.map((project) => (
                  <DataTableRow key={project.id}>
                    <DataTableCell className="font-medium text-nangell-text">
                      {project.title}
                    </DataTableCell>
                    <DataTableCell className="font-mono text-xs text-nangell-muted">
                      {project.slug}
                    </DataTableCell>
                    <DataTableCell>
                      <StatusBadge
                        label={STATUS_LABELS[project.status]}
                        tone={projectStatusTone(project.status)}
                      />
                    </DataTableCell>
                    <DataTableCell>
                      {project.isFeatured ? (
                        <Star className="h-4 w-4 fill-nangell-cyan text-nangell-cyan" aria-hidden />
                      ) : (
                        <span className="text-nangell-muted">—</span>
                      )}
                    </DataTableCell>
                    <DataTableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(project)}>
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

      {panelOpen ? (
        <div className="fixed inset-0 z-[100]">
          <button
            type="button"
            className="absolute inset-0 bg-nangell-dark/80 backdrop-blur-sm"
            aria-label="Fechar painel"
            onClick={closePanel}
          />
          <aside className="absolute top-0 right-0 flex h-full w-full max-w-2xl flex-col border-l border-glass-border bg-nangell-surface shadow-glass">
            <div className="flex items-start justify-between gap-4 border-b border-glass-border p-5">
              <div>
                <h2 className="font-heading text-lg font-semibold text-nangell-text">
                  {editingId ? "Editar projeto" : "Novo projeto"}
                </h2>
                <p className="mt-1 text-sm text-nangell-muted">
                  Preencha os campos do case de portfólio.
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                aria-label="Fechar"
                onClick={closePanel}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" aria-hidden />
              </Button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-5">
              <FormSection title="Informações básicas">
                <Input
                  label="Título"
                  value={form.title}
                  onChange={(event) => updateField("title", event.target.value)}
                />
                <div className="space-y-2">
                  <Input
                    label="Slug"
                    value={form.slug}
                    onChange={(event) => updateField("slug", event.target.value)}
                    hint="URL amigável (ex: crm-inteligente)"
                  />
                  <label className="flex items-center gap-2 text-sm text-nangell-muted">
                    <input
                      type="checkbox"
                      checked={autoSlug}
                      onChange={(event) => setAutoSlug(event.target.checked)}
                      className="rounded border-glass-border accent-nangell-cyan"
                    />
                    Gerar slug automaticamente a partir do título
                  </label>
                </div>
                <Input
                  label="Categoria"
                  value={form.category}
                  onChange={(event) => updateField("category", event.target.value)}
                />
                <Textarea
                  label="Descrição curta"
                  value={form.shortDescription}
                  onChange={(event) => updateField("shortDescription", event.target.value)}
                />
                <Textarea
                  label="Descrição completa"
                  rows={5}
                  value={form.fullDescription}
                  onChange={(event) => updateField("fullDescription", event.target.value)}
                />
              </FormSection>

              <FormSection title="Problema e solução">
                <Textarea
                  label="Problema"
                  value={form.problem}
                  onChange={(event) => updateField("problem", event.target.value)}
                />
                <Textarea
                  label="Solução"
                  value={form.solution}
                  onChange={(event) => updateField("solution", event.target.value)}
                />
              </FormSection>

              <FormSection title="Detalhes técnicos">
                <JsonListField
                  label="Funcionalidades"
                  value={form.features}
                  onChange={(value) => updateField("features", value)}
                />
                <JsonListField
                  label="Stack"
                  value={form.stack}
                  onChange={(value) => updateField("stack", value)}
                />
                <JsonListField
                  label="Galeria (URLs)"
                  value={form.gallery}
                  onChange={(value) => updateField("gallery", value)}
                />
                <Input
                  label="Imagem de capa"
                  value={form.coverImage}
                  onChange={(event) => updateField("coverImage", event.target.value)}
                />
                <Textarea
                  label="Métricas (JSON)"
                  rows={4}
                  value={form.metrics}
                  onChange={(event) => updateField("metrics", event.target.value)}
                  hint='Ex: {"conversao": "+32%"}'
                />
              </FormSection>

              <FormSection title="Demonstração e publicação">
                <Select
                  label="Tipo de demonstração"
                  value={form.demoType}
                  onChange={(event) =>
                    updateField("demoType", event.target.value as DemoType)
                  }
                  options={DEMO_TYPE_OPTIONS}
                />
                <Input
                  label="Rota da demonstração"
                  value={form.demoRoute}
                  onChange={(event) => updateField("demoRoute", event.target.value)}
                  hint="Opcional — ex: /demo/crm-inteligente"
                />
                <Select
                  label="Status"
                  value={form.status}
                  onChange={(event) =>
                    updateField("status", event.target.value as ProjectStatus)
                  }
                  options={STATUS_OPTIONS}
                />
                <Input
                  label="Ordem de exibição"
                  type="number"
                  min={0}
                  value={form.sortOrder}
                  onChange={(event) => updateField("sortOrder", event.target.value)}
                />
                <label className="flex items-center gap-2 text-sm text-nangell-text">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(event) => updateField("isFeatured", event.target.checked)}
                    className="rounded border-glass-border accent-nangell-cyan"
                  />
                  Destacar na home
                </label>
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
            </div>

            <div className="flex justify-end gap-2 border-t border-glass-border p-5">
              <Button variant="ghost" size="sm" onClick={closePanel} disabled={saving}>
                Cancelar
              </Button>
              <Button variant="primary" size="sm" onClick={() => void saveProject()} disabled={saving}>
                {saving ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </aside>
        </div>
      ) : null}

      <Toast toast={toast} onDismiss={dismiss} />
    </div>
  );
}
