"use client";

import Link from "next/link";
import { Play } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/data/navigation";
import { cn } from "@/lib/utils";

import { trackCaseCta } from "./case-analytics";

type CaseHeroActionsProps = {
  slug: string;
  title: string;
  hasDemo: boolean;
  demoRoute: string | null;
  whatsappMessage: string;
};

export function CaseHeroActions({
  slug,
  title,
  hasDemo,
  demoRoute,
  whatsappMessage,
}: CaseHeroActionsProps) {
  return (
    <>
      {hasDemo && demoRoute ? (
        <Link
          href={demoRoute}
          className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
          onClick={() => trackCaseCta(slug, "open_demo", title)}
        >
          <Play className="h-4 w-4" aria-hidden />
          Abrir demonstração interativa
        </Link>
      ) : null}
      <a
        href={buildWhatsAppUrl(whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        onClick={() => trackCaseCta(slug, "whatsapp_similar", "Iniciar projeto similar")}
      >
        Iniciar projeto similar
      </a>
    </>
  );
}
