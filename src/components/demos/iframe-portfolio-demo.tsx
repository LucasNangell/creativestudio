"use client";

import Link from "next/link";
import { useState } from "react";
import { AlertTriangle, ExternalLink, Monitor } from "lucide-react";

import { DemoShell } from "@/components/demos/demo-shell";
import type { IframeDemoConfig } from "@/data/demos/iframe-demos";
import { cn } from "@/lib/utils";

type IframePortfolioDemoProps = {
  config: IframeDemoConfig;
};

export function IframePortfolioDemo({ config }: IframePortfolioDemoProps) {
  const [loadError, setLoadError] = useState(false);

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
        {loadError ? (
          <div
            className="flex min-h-[480px] flex-col items-center justify-center gap-4 rounded-nangell border border-amber-500/30 bg-nangell-surface/80 p-8 text-center"
            style={{ minHeight: config.minHeight }}
          >
            <AlertTriangle className="h-10 w-10 text-amber-400" aria-hidden />
            <div>
              <p className="font-medium text-nangell-text">Não foi possível carregar a demo aqui</p>
              <p className="mt-1 text-sm text-nangell-muted">
                Abra em uma nova aba — os arquivos estáticos da demonstração ficam em{" "}
                <code className="text-nangell-cyan">{config.iframeSrc}</code>
              </p>
            </div>
            <Link
              href={config.iframeSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-nangell bg-nangell-electric px-4 py-2 text-sm font-medium text-nangell-dark hover:bg-nangell-cyan"
            >
              Abrir demonstração
              <ExternalLink className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        ) : (
          <iframe
            title={`Demonstração interativa — ${config.title}`}
            src={config.iframeSrc}
            className={cn(
              "w-full rounded-nangell border border-glass-border bg-white",
              "min-h-[480px]",
            )}
            style={{ minHeight: config.minHeight }}
            loading="eager"
            onError={() => setLoadError(true)}
          />
        )}
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
