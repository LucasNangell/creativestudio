"use client";

import Link from "next/link";
import { ExternalLink, Globe, Monitor } from "lucide-react";

import { DemoShell } from "@/components/demos/demo-shell";
import { DemoSystemOverview } from "@/components/demos/demo-system-overview";
import type { ExternalDemoConfig } from "@/data/demos/external-demos";
import { getDemoPageContentOrThrow } from "@/lib/demos/get-demo-content";

type ExternalPortfolioDemoProps = {
  config: ExternalDemoConfig;
};

export function ExternalPortfolioDemo({ config }: ExternalPortfolioDemoProps) {
  const overviewContent = getDemoPageContentOrThrow(config.slug);

  return (
    <DemoShell
      demoId={config.slug}
      title={config.title}
      subtitle={config.subtitle}
      ctaLabel={config.ctaLabel}
      overview={<DemoSystemOverview content={overviewContent} />}
    >
      <div className="border-b border-glass-border bg-nangell-surface/60 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-nangell-electric/15 text-nangell-electric">
            <Globe className="h-6 w-6" aria-hidden />
          </div>
          <div>
            <p className="font-medium text-nangell-text">
              Demonstração no ambiente de produção
            </p>
            <p className="mt-1 text-sm text-nangell-muted">
              O Encurtou.pro é um sistema PHP + MySQL com autenticação, pagamentos e edge
              Cloudflare. Por segurança, o painel completo abre em nova aba no domínio oficial.
            </p>
          </div>
          <Link
            href={config.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-nangell bg-nangell-electric px-5 py-2.5 text-sm font-semibold text-nangell-dark hover:bg-nangell-cyan"
          >
            Abrir Encurtou.pro
            <ExternalLink className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>

      {config.desktopRecommended ? (
        <p className="border-b border-glass-border bg-nangell-surface/40 px-4 py-2 text-center text-xs text-nangell-muted md:hidden">
          <Monitor className="mr-1 inline h-3.5 w-3.5 align-text-bottom" aria-hidden />
          Prévia abaixo otimizada em telas maiores.
        </p>
      ) : null}

      {config.previewIframeSrc ? (
        <div className="relative bg-nangell-dark/40 p-2 sm:p-4">
          <p className="mb-2 px-1 text-xs text-nangell-muted">
            Prévia do painel principal — navegue pelos módulos. Algumas ações exigem login no site
            oficial.
          </p>
          <iframe
            title={`Prévia — ${config.title}`}
            src={config.previewIframeSrc}
            className="min-h-[480px] w-full rounded-nangell border border-glass-border bg-white"
            style={{ minHeight: config.previewMinHeight ?? 640 }}
            loading="lazy"
          />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-nangell-muted">
            <span>
              Interface real do sistema — dados fictícios em modo visitante. Use o botão acima para
              abrir a versão completa.
            </span>
            <Link
              href={config.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-nangell-cyan hover:text-nangell-blue"
            >
              Abrir produto completo
              <ExternalLink className="h-3 w-3" aria-hidden />
            </Link>
          </div>
        </div>
      ) : null}
    </DemoShell>
  );
}
