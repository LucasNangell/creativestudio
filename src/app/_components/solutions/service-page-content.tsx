import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { SectionHeading } from "@/app/_components/home/section-heading";
import { FaqAccordion } from "@/app/_components/institutional/faq-accordion";
import { Container } from "@/components/layout/container";
import { CtaSection } from "@/components/layout/cta-section";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/stagger-container";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buildWhatsAppUrl } from "@/data/navigation";
import { cn } from "@/lib/utils";
import type { RelatedProjectCard, ServiceDetail } from "@/types/services";

type ServicePageContentProps = {
  service: ServiceDetail;
  relatedProjects: RelatedProjectCard[];
};

export function ServicePageContent({
  service,
  relatedProjects,
}: ServicePageContentProps) {
  const Icon = service.icon;
  const whatsappMessage = `Olá! Vim pela página de ${service.title} e gostaria de conversar sobre um projeto.`;

  return (
    <>
      <Section className="pt-8 sm:pt-12">
        <Container>
          <PageHero
            eyebrow="Solução"
            title={service.title}
            description={service.headline}
            align="left"
          >
            <Link
              href="/diagnostico"
              className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
            >
              {service.ctaLabel}
            </Link>
            <a
              href={buildWhatsAppUrl(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Falar no WhatsApp
            </a>
          </PageHero>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-3xl text-base leading-relaxed text-nangell-muted sm:text-lg">
              {service.description}
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="glass-card p-6 sm:p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-nangell bg-nangell-gradient-subtle">
                  <Icon className="h-6 w-6 text-nangell-cyan" aria-hidden />
                </div>
                <h2 className="font-heading text-xl font-bold text-nangell-text sm:text-2xl">
                  Problema que resolve
                </h2>
                <p className="mt-4 text-base leading-relaxed text-nangell-muted">
                  {service.problemSolved}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="glass-card p-6 sm:p-8">
                <h2 className="font-heading text-xl font-bold text-nangell-text sm:text-2xl">
                  Para quem é indicado
                </h2>
                <p className="mt-4 text-base leading-relaxed text-nangell-muted">
                  {service.targetAudience}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {service.focusAreas.map((area) => (
                    <Badge key={area}>{area}</Badge>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="bg-nangell-surface/30">
        <Container>
          <Reveal>
            <SectionHeading
              align="left"
              title="Entregáveis"
              description="Escopo típico de um projeto nesta frente, ajustado após discovery."
              className="mx-0 max-w-none"
            />
          </Reveal>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {service.deliverables.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-nangell border border-glass-border bg-nangell-surface/50 p-4"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-nangell-cyan"
                  aria-hidden
                />
                <span className="text-sm text-nangell-text sm:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <SectionHeading title="Tecnologias" description="Stack recomendada conforme volume, integrações e roadmap." />
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-2">
            {service.technologies.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <SectionHeading title="Diferenciais Nangell" />
          </Reveal>
          <StaggerContainer className="mt-10 grid gap-5 sm:grid-cols-2">
            {service.differentials.map((item) => (
              <StaggerItem key={item.title}>
                <Card variant="elevated" padding="md" className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      <Section className="bg-nangell-surface/30">
        <Container>
          <Reveal>
            <SectionHeading title="Exemplos de funcionalidades" />
          </Reveal>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((feature) => (
              <li
                key={feature}
                className="glass-card p-4 text-sm text-nangell-muted sm:text-base"
              >
                {feature}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {relatedProjects.length > 0 ? (
        <Section>
          <Container>
            <Reveal>
              <SectionHeading
                title="Cases e demonstrações relacionados"
                description="Experimente soluções similares em funcionamento no nosso site."
              />
            </Reveal>
            <StaggerContainer className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((project) => (
                <StaggerItem key={project.slug}>
                  <Card variant="elevated" padding="md" className="flex h-full flex-col">
                    <CardHeader>
                      <Badge variant="muted" className="w-fit">
                        {project.category}
                      </Badge>
                      <CardTitle className="mt-3">{project.title}</CardTitle>
                      <CardDescription>{project.shortDescription}</CardDescription>
                    </CardHeader>
                    <CardContent className="mt-auto flex flex-wrap gap-2 pt-0">
                      {project.demoRoute ? (
                        <Link
                          href={project.demoRoute}
                          className={cn(
                            buttonVariants({ variant: "secondary", size: "sm" }),
                          )}
                        >
                          Abrir demonstração
                        </Link>
                      ) : null}
                      <Link
                        href={project.caseHref}
                        className={cn(
                          buttonVariants({ variant: "ghost", size: "sm" }),
                          "text-nangell-cyan",
                        )}
                      >
                        Ver case
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                      </Link>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Container>
        </Section>
      ) : null}

      <Section>
        <Container>
          <Reveal>
            <SectionHeading title="Perguntas frequentes" />
          </Reveal>
          <div className="mt-8">
            <FaqAccordion items={service.faq} />
          </div>
        </Container>
      </Section>

      <CtaSection
        title={`Pronto para avançar com ${service.title.toLowerCase()}?`}
        description="Agende um diagnóstico gratuito e receba um roadmap técnico alinhado ao seu processo."
        variant="gradient"
      >
        <Link
          href="/diagnostico"
          className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
        >
          {service.ctaLabel}
        </Link>
        <Link
          href="/solucoes"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          Ver todas as soluções
        </Link>
      </CtaSection>
    </>
  );
}
