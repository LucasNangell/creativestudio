"use client";

import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";

import {
  ConversionTracking,
  useLeadSuccessContext,
} from "@/app/_components/institutional/conversion-tracking";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { obrigadoContent } from "@/data/institutional/contato";
import { buildContextualWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function ObrigadoPageContent() {
  const leadContext = useLeadSuccessContext();
  const isDiagnostic = leadContext.type === "diagnostico";

  const title = isDiagnostic
    ? obrigadoContent.diagnosticTitle
    : leadContext.type === "contato"
      ? obrigadoContent.contactTitle
      : obrigadoContent.title;

  const description = isDiagnostic
    ? obrigadoContent.diagnosticDescription
    : leadContext.type === "contato"
      ? obrigadoContent.contactDescription
      : obrigadoContent.description;

  const whatsappUrl = buildContextualWhatsAppUrl({
    name: leadContext.name,
    company: leadContext.company,
    projectType: leadContext.projectType,
    source: isDiagnostic ? "diagnostico" : "obrigado",
  });

  return (
    <>
      <ConversionTracking />

      <Section className="pt-16 sm:pt-24">
        <Container className="max-w-2xl">
          <Reveal>
            <div className="text-center">
              <CheckCircle2
                className="mx-auto h-16 w-16 text-nangell-cyan"
                aria-hidden
              />
              <h1 className="mt-6 font-heading text-3xl font-bold tracking-tight text-nangell-text sm:text-4xl">
                {title}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-nangell-muted sm:text-lg">
                {description}
              </p>
              {leadContext.name ? (
                <p className="mt-3 text-sm text-nangell-cyan">
                  {leadContext.name}
                  {leadContext.company ? ` · ${leadContext.company}` : ""}
                </p>
              ) : null}
            </div>
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="font-heading text-lg font-semibold text-nangell-text">
              Próximos passos
            </h2>
            <ol className="mt-6 space-y-4">
              {obrigadoContent.nextSteps.map((step) => (
                <li
                  key={step.step}
                  className="glass-card flex gap-4 p-5 sm:p-6"
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-nangell-gradient font-mono text-sm font-bold text-nangell-dark"
                    aria-hidden
                  >
                    {step.step}
                  </span>
                  <div>
                    <h3 className="font-heading font-semibold text-nangell-text">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-nangell-muted">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "primary", size: "lg" }),
                "gap-2",
              )}
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              Abrir conversa no WhatsApp
            </a>
            <Link
              href={obrigadoContent.portfolioCta.href}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              {obrigadoContent.portfolioCta.label}
            </Link>
            <Link
              href={obrigadoContent.demosCta.href}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              {obrigadoContent.demosCta.label}
            </Link>
            <Link
              href={obrigadoContent.diagnosticoCta.href}
              className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}
            >
              {obrigadoContent.diagnosticoCta.label}
            </Link>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
