"use client";

import Link from "next/link";
import { ExternalLink, Monitor } from "lucide-react";

import { DemoShell } from "@/components/demos/demo-shell";
import type { IframeDemoConfig } from "@/data/demos/iframe-demos";
import { cn } from "@/lib/utils";

type IframePortfolioDemoProps = {
  config: IframeDemoConfig;
};

export function IframePortfolioDemo({ config }: IframePortfolioDemoProps) {
  return (
    <DemoShell
      demoId={config.slug}
      title={config.title}
      subtitle={config.subtitle}
      ctaLabel={config.ctaLabel}
    >
      {config.desktopRecommended ? (
        <p className="border-b border-glass-border bg-nangell-surface/60 px-4 py-2 text-center text-xs text-nangell-muted md:hidden">
          <Monitor className="mr-1 inline h-3.5 w-3.5 align-text-bottom" aria-hidden />
          Experiência otimizada em telas maiores. Gire o dispositivo ou use um computador.
        </p>
      ) : null}

      <div className="relative bg-nangell-dark/40 p-2 sm:p-4">
        <iframe
          title={`Demonstração interativa — ${config.title}`}
          src={config.iframeSrc}
          className={cn(
            "w-full rounded-nangell border border-glass-border bg-white",
            "min-h-[480px]",
          )}
          style={{ minHeight: config.minHeight }}
          loading="lazy"
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-nangell-muted">
          <span>Dados 100% fictícios — simulação para portfólio.</span>
          <Link
            href={config.iframeSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-nangell-cyan hover:text-nangell-blue"
          >
            Abrir demo em tela cheia
            <ExternalLink className="h-3 w-3" aria-hidden />
          </Link>
        </div>
      </div>
    </DemoShell>
  );
}
