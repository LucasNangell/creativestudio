"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

import { BrowserWindow } from "@/components/mockups/browser-window";
import { cn } from "@/lib/utils";

type ProjectCoverProps = {
  src: string;
  alt: string;
  title: string;
  className?: string;
  priority?: boolean;
};

export function ProjectCover({
  src,
  alt,
  title,
  className,
  priority = false,
}: ProjectCoverProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <BrowserWindow title={title} url="nangell.com.br/demo" className={className}>
        <div
          className={cn(
            "flex min-h-[140px] flex-col items-center justify-center gap-2 rounded-nangell border border-dashed border-glass-border bg-nangell-dark/60 p-6 text-center sm:min-h-[180px]",
          )}
        >
          <ImageOff className="h-8 w-8 text-nangell-muted" aria-hidden />
          <p className="font-mono text-xs text-nangell-muted">
            Mockup em preparação
          </p>
          <p className="text-sm font-medium text-nangell-text">{title}</p>
        </div>
      </BrowserWindow>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-nangell-lg border border-glass-border bg-nangell-surface/50",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={640}
        height={360}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className="aspect-video w-full object-cover object-top"
        onError={() => setHasError(true)}
      />
    </div>
  );
}
