"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ChevronRight, Info } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Skeleton } from "@/components/ui/skeleton";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

import { DemoTopbar } from "./demo-topbar";

type DemoShellProps = {
  demoId: string;
  title: string;
  subtitle?: string;
  ctaLabel: string;
  breadcrumb?: string[];
  sidebar?: React.ReactNode;
  overview?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  fullBleed?: boolean;
  wideContainer?: boolean;
};

export function DemoShell({
  demoId,
  title,
  subtitle,
  ctaLabel,
  breadcrumb = ["Portfólio", title],
  sidebar,
  overview,
  children,
  className,
  fullBleed = false,
  wideContainer = false,
}: DemoShellProps) {
  useEffect(() => {
    trackEvent("open_demo", { demoId, action: "page_load" });
  }, [demoId]);

  const handleCtaClick = () => {
    trackEvent("demo_cta_click", {
      demoId,
      action: "request_similar",
      label: ctaLabel,
    });
  };

  return (
    <div className="pb-16 pt-8">
      <Container
        className={cn(wideContainer && "max-w-[96rem]")}
      >
        <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-xs text-nangell-muted">
          <Link href="/portfolio" className="hover:text-nangell-cyan">
            {breadcrumb[0]}
          </Link>
          {breadcrumb.slice(1).map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center gap-1">
              <ChevronRight className="h-3 w-3" aria-hidden />
              <span className={index === breadcrumb.length - 2 ? "text-nangell-text" : undefined}>
                {item}
              </span>
            </span>
          ))}
        </nav>

        <DemoTopbar
          title={title}
          subtitle={subtitle}
          ctaLabel={ctaLabel}
          onCtaClick={handleCtaClick}
        />

        <div
          role="status"
          className="mt-4 flex items-start gap-2 rounded-nangell border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-xs text-amber-200/90"
        >
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden />
          <p>
            Ambiente de simulação com dados fictícios para fins de demonstração técnica.
            Nenhuma informação exibida é real ou persistida em servidores.
          </p>
        </div>

        {overview}

        <div
          className={cn(
            "overflow-hidden rounded-nangell-xl border border-glass-border bg-nangell-surface shadow-glass",
            overview ? "mt-6" : "mt-6",
            fullBleed && "min-h-[560px]",
            className,
          )}
        >
          <div className="flex min-h-[480px]">
            {sidebar}
            <div className="min-w-0 flex-1">{children}</div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export function DemoContentLoader({
  loading,
  children,
}: {
  loading?: boolean;
  children: React.ReactNode;
}) {
  if (loading) {
    return (
      <div className="p-4 sm:p-6" role="status" aria-live="polite" aria-busy="true">
        <span className="sr-only">Carregando painel da demonstração…</span>
        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
        <Skeleton className="mb-4 h-10 w-full max-w-md" />
        <Skeleton className="h-[280px] w-full rounded-nangell-lg" />
      </div>
    );
  }

  return children;
}

export function trackDemoInteraction(
  demoId: string,
  action: string,
  metadata?: Record<string, string | number | boolean>,
) {
  trackEvent("demo_interaction", { demoId, action, metadata });
}

export function trackDemoFinish(
  demoId: string,
  action: string,
  label?: string,
) {
  trackEvent("finish_demo_interaction", { demoId, action, label });
}
