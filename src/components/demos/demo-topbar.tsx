"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="font-heading text-2xl font-bold text-nangell-text sm:text-3xl">
            {title}
          </h1>
          <Badge variant="outline">Demo interativa</Badge>
        </div>
        {subtitle ? (
          <p className="mt-1 max-w-2xl text-sm text-nangell-muted">{subtitle}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link href="/portfolio" className="inline-flex">
          <Button variant="outline" size="sm" type="button">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Voltar ao portfólio
          </Button>
        </Link>
        <Link href="/diagnostico" className="inline-flex" onClick={onCtaClick}>
          <Button size="sm" type="button">
            {ctaLabel}
            <ExternalLink className="h-4 w-4" aria-hidden />
          </Button>
        </Link>
      </div>
    </div>
  );
}
