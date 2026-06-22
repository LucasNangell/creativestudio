"use client";

import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type MarkdownEditorProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  disabled?: boolean;
};

function renderMarkdownPreview(source: string): string {
  return source
    .replace(/^### (.*$)/gim, "<h3 class='text-lg font-semibold mt-4 mb-2'>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2 class='text-xl font-semibold mt-4 mb-2'>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1 class='text-2xl font-bold mt-4 mb-2'>$1</h1>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")
    .replace(/`([^`]+)`/gim, "<code class='rounded bg-nangell-dark px-1 py-0.5 font-mono text-xs'>$1</code>")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/gim,
      "<a href='$2' class='text-nangell-cyan underline' target='_blank' rel='noopener noreferrer'>$1</a>",
    )
    .replace(/\n/gim, "<br />");
}

export function MarkdownEditor({
  label = "Conteúdo",
  value,
  onChange,
  rows = 16,
  disabled,
}: MarkdownEditorProps) {
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const previewHtml = useMemo(() => renderMarkdownPreview(value), [value]);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-nangell-text">{label}</label>
        <div className="flex rounded-nangell border border-glass-border p-0.5 text-xs">
          <button
            type="button"
            className={cn(
              "rounded-nangell px-3 py-1",
              tab === "edit" && "bg-nangell-gradient-subtle text-nangell-cyan",
            )}
            onClick={() => setTab("edit")}
          >
            Editar
          </button>
          <button
            type="button"
            className={cn(
              "rounded-nangell px-3 py-1",
              tab === "preview" && "bg-nangell-gradient-subtle text-nangell-cyan",
            )}
            onClick={() => setTab("preview")}
          >
            Preview
          </button>
        </div>
      </div>

      {tab === "edit" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          disabled={disabled}
          className="w-full rounded-nangell border border-glass-border bg-nangell-surface/80 px-4 py-3 font-mono text-sm text-nangell-text focus-visible:border-nangell-electric focus-visible:outline-none disabled:opacity-50"
        />
      ) : (
        <div
          className="min-h-[240px] rounded-nangell border border-glass-border bg-nangell-dark/40 p-4 text-sm leading-relaxed text-nangell-text"
          dangerouslySetInnerHTML={{ __html: previewHtml }}
        />
      )}
    </div>
  );
}
