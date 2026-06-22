"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { INTERACTIVE_DEMO_LABEL } from "@/data/demos/labels";

type DemoTopbarProps = {
  title: string;
  subtitle?: string;
  ctaLabel: string;
  onCtaClick?: () => void;
};

export function DemoTopbar({
  title,
  subtitle,
  ctaLabel,
  onCtaClick,
}: DemoTopbarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="font-heading text-2xl font-bold text-nangell-text sm:text-3xl">
            {title}
          </h1>
          <Badge variant="outline">{INTERACTIVE_DEMO_LABEL}</Badge>
        </div>
        {subtitle ? (
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-nangell-muted">{subtitle}</p>
        ) : null}
      </div>

      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
        <Link href="/portfolio" className="inline-flex w-full sm:w-auto">
          <Button variant="outline" size="sm" type="button" className="w-full sm:w-auto">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Voltar ao portfólio
          </Button>
        </Link>
        <Link href="/diagnostico" className="inline-flex w-full sm:w-auto" onClick={onCtaClick}>
          <Button size="sm" type="button" className="w-full sm:w-auto">
            {ctaLabel}
            <ExternalLink className="h-4 w-4" aria-hidden />
          </Button>
        </Link>
      </div>
    </div>
  );
}
