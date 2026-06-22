"use client";

import { useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";

type PostShareProps = {
  url: string;
  title: string;
};

export function PostShare({ url, title }: PostShareProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="rounded-nangell border border-glass-border bg-nangell-surface/50 p-4">
      <p className="mb-3 flex items-center gap-2 text-sm font-medium text-nangell-text">
        <Share2 className="h-4 w-4 text-nangell-cyan" aria-hidden />
        Compartilhar
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex items-center gap-2 rounded-nangell border border-glass-border px-3 py-2 text-xs text-nangell-muted hover:border-nangell-cyan/40 hover:text-nangell-text"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
          {copied ? "Copiado!" : "Copiar link"}
        </button>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-nangell border border-glass-border px-3 py-2 text-xs text-nangell-muted hover:border-nangell-cyan/40 hover:text-nangell-text"
        >
          LinkedIn
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-nangell border border-glass-border px-3 py-2 text-xs text-nangell-muted hover:border-nangell-cyan/40 hover:text-nangell-text"
        >
          X / Twitter
        </a>
        <a
          href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-nangell border border-glass-border px-3 py-2 text-xs text-nangell-muted hover:border-nangell-cyan/40 hover:text-nangell-text"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
