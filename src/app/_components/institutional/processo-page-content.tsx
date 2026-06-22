import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { SectionHeading } from "@/app/_components/home/section-heading";
import { FaqAccordion } from "@/app/_components/institutional/faq-accordion";
import { ProcessStepCard } from "@/app/_components/institutional/process-step-card";
import { Container } from "@/components/layout/container";
import { CtaSection } from "@/components/layout/cta-section";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import {
  processoCta,
  processoEtapas,
  processoFaq,
  processoHero,
} from "@/data/institutional/processo";
import { buildWhatsAppUrl } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function ProcessoPageContent() {
  return (
    <>
      <Section className="pt-8 sm:pt-12">
        <Container>
          <PageHero
            eyebrow={processoHero.eyebrow}
            title={processoHero.title}
            description={processoHero.description}
          >
            <Link
              href="/diagnostico"
              className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
            >
              Agendar diagnóstico
            </Link>
            <Link
              href="/sobre"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Sobre a Nangell
            </Link>
          </PageHero>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="6 etapas"
              title="Metodologia detalhada"
              description="Cada fase tem entregáveis definidos, benefícios claros para você e critérios objetivos de conclusão."
            />
          </Reveal>

          <nav
            aria-label="Etapas do processo"
            className="mt-8 flex flex-wrap justify-center gap-2"
          >
            {processoEtapas.map((etapa) => (
              <a
                key={etapa.step}
                href={`#etapa-${etapa.step}`}
                className="rounded-nangell border border-glass-border bg-nangell-surface/60 px-3 py-1.5 font-mono text-xs text-nangell-muted transition-colors hover:border-nangell-cyan/40 hover:text-nangell-cyan"
              >
                {String(etapa.step).padStart(2, "0")}. {etapa.title}
              </a>
            ))}
          </nav>

          <div className="mt-12 space-y-8">
            {processoEtapas.map((etapa) => (
              <Reveal key={etapa.step}>
                <ProcessStepCard etapa={etapa} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-nangell-surface/30">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="FAQ"
              title="Perguntas frequentes sobre o processo"
              description="Respostas diretas para as dúvidas mais comuns antes de iniciar um projeto."
            />
          </Reveal>

          <Reveal className="mx-auto mt-12 max-w-3xl">
            <FaqAccordion items={processoFaq} />
          </Reveal>
        </Container>
      </Section>

      <CtaSection
        title={processoCta.title}
        description={processoCta.description}
        variant="gradient"
      >
        <Link
          href={processoCta.primaryCta.href}
          className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
        >
          {processoCta.primaryCta.label}
        </Link>
        <a
          href={buildWhatsAppUrl(
            "Olá! Gostaria de entender como a metodologia da Nangell se aplica ao meu projeto.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "gap-2",
          )}
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          {processoCta.secondaryCta.label}
        </a>
      </CtaSection>
    </>
  );
}
