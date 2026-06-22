"use client";

import { useCallback, useEffect, useState } from "react";
import { Pencil, Plus } from "lucide-react";
import { PostStatus } from "@prisma/client";

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
import { MarkdownEditor } from "@/components/admin/markdown-editor";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toast, useToast } from "@/components/ui/toast";
import { slugify } from "@/lib/slug";
import type { PostFormInput } from "@/lib/validations/post";

type PostRecord = PostFormInput & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

const STATUS_OPTIONS = [
  { label: "Rascunho", value: PostStatus.DRAFT },
  { label: "Publicado", value: PostStatus.PUBLISHED },
];

const STATUS_LABELS: Record<PostStatus, string> = {
  [PostStatus.DRAFT]: "Rascunho",
  [PostStatus.PUBLISHED]: "Publicado",
};

function postStatusTone(status: PostStatus): "success" | "warning" {
  return status === PostStatus.PUBLISHED ? "success" : "warning";
}

function emptyPost(): PostFormInput {
  return {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    category: "",
    tags: [],
    author: "",
    status: PostStatus.DRAFT,
    seoTitle: "",
    seoDescription: "",
    publishedAt: null,
  };
}

function toFormState(post: PostRecord | PostFormInput) {
  return {
    ...post,
    tags: Array.isArray(post.tags) ? post.tags.join(", ") : "",
    publishedAt: post.publishedAt
      ? new Date(post.publishedAt).toISOString().slice(0, 16)
      : "",
  };
}

type FormState = ReturnType<typeof toFormState>;

function formatDate(value: string | null | undefined) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(new Date(value));
}

export function PostsAdminPanel() {
  const { toast, showToast, dismiss } = useToast();

  const [posts, setPosts] = useState<PostRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(toFormState(emptyPost()));
  const [autoSlug, setAutoSlug] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/posts");
      if (!response.ok) throw new Error("fetch_failed");
      const data = (await response.json()) as { items: PostRecord[] };
      setPosts(data.items ?? []);
    } catch {
      showToast("Não foi possível carregar os artigos.", "error");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);

  function openCreate() {
    setEditingId(null);
    setForm(toFormState(emptyPost()));
    setAutoSlug(true);
    setModalOpen(true);
  }

  function openEdit(post: PostRecord) {
    setEditingId(post.id);
    setForm(toFormState(post));
    setAutoSlug(false);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingId(null);
  }

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => {
      const next = { ...current, [key]: value };
      if (key === "title" && autoSlug && typeof value === "string") {
        next.slug = slugify(value);
      }
      if (key === "status" && value === PostStatus.PUBLISHED && !next.publishedAt) {
        next.publishedAt = new Date().toISOString().slice(0, 16);
      }
      return next;
    });
  }

  async function savePost() {
    setSaving(true);
    try {
      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        excerpt: form.excerpt.trim(),
        content: form.content.trim(),
        coverImage: form.coverImage.trim(),
        category: form.category.trim(),
        tags: form.tags,
        author: form.author.trim(),
        status: form.status,
        seoTitle: form.seoTitle.trim(),
        seoDescription: form.seoDescription.trim(),
        publishedAt: form.publishedAt
          ? new Date(form.publishedAt).toISOString()
          : form.status === PostStatus.PUBLISHED
            ? new Date().toISOString()
            : null,
      };

      const url = editingId ? `/api/admin/posts/${editingId}` : "/api/admin/posts";
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
        showToast(result.error ?? "Erro ao salvar artigo.", "error");
        return;
      }

      showToast(editingId ? "Artigo atualizado." : "Artigo criado.");
      closeModal();
      await fetchPosts();
    } catch {
      showToast("Não foi possível salvar o artigo.", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-nangell-text sm:text-3xl">
            Blog
          </h1>
          <p className="mt-1 text-sm text-nangell-muted">
            Crie e publique artigos estratégicos.
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={openCreate}>
          <Plus className="h-4 w-4" aria-hidden />
          Novo artigo
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
                <DataTableHeaderCell>Categoria</DataTableHeaderCell>
                <DataTableHeaderCell>Status</DataTableHeaderCell>
                <DataTableHeaderCell>Publicado em</DataTableHeaderCell>
                <DataTableHeaderCell className="text-right">Ações</DataTableHeaderCell>
              </tr>
            </DataTableHead>
            <DataTableBody>
              {posts.length === 0 ? (
                <DataTableEmpty colSpan={5} message="Nenhum artigo cadastrado." />
              ) : (
                posts.map((post) => (
                  <DataTableRow key={post.id}>
                    <DataTableCell>
                      <p className="font-medium text-nangell-text">{post.title}</p>
                      <p className="font-mono text-xs text-nangell-muted">{post.slug}</p>
                    </DataTableCell>
                    <DataTableCell className="text-nangell-muted">{post.category}</DataTableCell>
                    <DataTableCell>
                      <StatusBadge
                        label={STATUS_LABELS[post.status]}
                        tone={postStatusTone(post.status)}
                      />
                    </DataTableCell>
                    <DataTableCell className="font-mono text-xs text-nangell-muted">
                      {formatDate(post.publishedAt)}
                    </DataTableCell>
                    <DataTableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(post)}>
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
        title={editingId ? "Editar artigo" : "Novo artigo"}
        size="lg"
      >
        <div className="max-h-[75vh] space-y-4 overflow-y-auto pr-1">
          <FormSection title="Informações">
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
              label="Autor"
              value={form.author}
              onChange={(event) => updateField("author", event.target.value)}
            />
            <Input
              label="Categoria"
              value={form.category}
              onChange={(event) => updateField("category", event.target.value)}
            />
            <Input
              label="Tags"
              value={form.tags}
              onChange={(event) => updateField("tags", event.target.value)}
              hint="Separadas por vírgula"
            />
            <Input
              label="Imagem de capa"
              value={form.coverImage}
              onChange={(event) => updateField("coverImage", event.target.value)}
            />
          </FormSection>

          <FormSection title="Conteúdo">
            <Textarea
              label="Resumo"
              value={form.excerpt}
              onChange={(event) => updateField("excerpt", event.target.value)}
            />
            <MarkdownEditor
              label="Conteúdo (Markdown)"
              value={form.content}
              onChange={(value) => updateField("content", value)}
            />
          </FormSection>

          <FormSection title="Publicação">
            <Select
              label="Status"
              value={form.status}
              onChange={(event) =>
                updateField("status", event.target.value as PostStatus)
              }
              options={STATUS_OPTIONS}
            />
            <Input
              label="Data de publicação"
              type="datetime-local"
              value={form.publishedAt}
              onChange={(event) => updateField("publishedAt", event.target.value)}
              hint="Usada quando o status for Publicado"
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
            <Button variant="primary" size="sm" onClick={() => void savePost()} disabled={saving}>
              {saving ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </div>
      </Modal>

      <Toast toast={toast} onDismiss={dismiss} />
    </div>
  );
}
