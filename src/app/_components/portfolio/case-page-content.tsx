import Link from "next/link";
import { ArrowRight, CheckCircle2, Play } from "lucide-react";

import { SectionHeading } from "@/app/_components/home/section-heading";
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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buildWhatsAppUrl } from "@/data/navigation";
import { cn } from "@/lib/utils";
import type { ProjectDetail, ProjectListItem } from "@/types/projects";

import { CaseHeroActions } from "./case-hero-actions";
import { CaseViewTracker } from "./case-analytics";
import { ProjectCard } from "./project-card";
import { ProjectCover } from "./project-cover";

type CasePageContentProps = {
  project: ProjectDetail;
  relatedProjects: ProjectListItem[];
};

export function CasePageContent({
  project,
  relatedProjects,
}: CasePageContentProps) {
  const whatsappMessage = `Olá! Li o case "${project.title}" e gostaria de iniciar um projeto similar.`;

  return (
    <>
      <CaseViewTracker slug={project.slug} title={project.title} />
      <Section className="pt-8 sm:pt-12">
        <Container>
          <PageHero
            eyebrow="Estudo de caso"
            title={project.title}
            description={project.shortDescription}
            align="left"
          >
            <CaseHeroActions
              slug={project.slug}
              title={project.title}
              hasDemo={project.hasDemo}
              demoRoute={project.demoRoute}
              whatsappMessage={whatsappMessage}
            />
          </PageHero>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-2">
              <Badge variant="outline">{project.category}</Badge>
              {project.badges.map((badge) => (
                <Badge key={badge} variant="muted">{badge}</Badge>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Badge key={tech} variant="outline">{tech}</Badge>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-10">
            <ProjectCover
              src={project.coverImage}
              alt={`Capa do case ${project.title}`}
              title={project.title}
              priority
            />
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="glass-card p-6 sm:p-8">
                <h2 className="font-heading text-xl font-bold text-nangell-text sm:text-2xl">
                  O problema
                </h2>
                <p className="mt-4 text-base leading-relaxed text-nangell-muted">
                  {project.problem}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="glass-card p-6 sm:p-8">
                <h2 className="font-heading text-xl font-bold text-nangell-text sm:text-2xl">
                  A solução
                </h2>
                <p className="mt-4 text-base leading-relaxed text-nangell-muted">
                  {project.solution}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="mt-8">
            <p className="max-w-3xl text-base leading-relaxed text-nangell-muted sm:text-lg">
              {project.fullDescription}
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section className="bg-nangell-surface/30">
        <Container>
          <Reveal>
            <SectionHeading
              align="left"
              title="Funcionalidades principais"
              className="mx-0 max-w-none"
            />
          </Reveal>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-3 rounded-nangell border border-glass-border bg-nangell-surface/50 p-4"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-nangell-cyan"
                  aria-hidden
                />
                <span className="text-sm text-nangell-text sm:text-base">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {project.architecture.length > 0 ? (
        <Section>
          <Container>
            <Reveal>
              <SectionHeading
                align="left"
                title="Arquitetura conceitual"
                description="Camadas e responsabilidades do sistema desenvolvido."
                className="mx-0 max-w-none"
              />
            </Reveal>
            <StaggerContainer className="mt-10 grid gap-5 sm:grid-cols-2">
              {project.architecture.map((layer) => (
                <StaggerItem key={layer.name}>
                  <Card variant="elevated" padding="md" className="h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">{layer.name}</CardTitle>
                      <CardDescription>{layer.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </Container>
        </Section>
      ) : null}

      {project.metrics.length > 0 ? (
        <Section className="bg-nangell-surface/30">
          <Container>
            <Reveal>
              <SectionHeading
                align="left"
                title="Resultados e métricas"
                description="Indicadores de impacto — fictícios para demos ou reais quando autorizados pelo cliente."
                className="mx-0 max-w-none"
              />
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-nangell-xl border border-glass-border bg-nangell-surface/80 p-6 shadow-glass"
                >
                  <p className="font-mono text-xs tracking-wide text-nangell-muted uppercase">
                    {metric.label}
                  </p>
                  <p className="mt-2 font-heading text-3xl font-bold text-nangell-cyan">
                    {metric.value}
                  </p>
                  {metric.description ? (
                    <p className="mt-2 text-sm text-nangell-muted">
                      {metric.description}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {project.gallery.length > 0 ? (
        <Section>
          <Container>
            <Reveal>
              <SectionHeading
                align="left"
                title="Galeria e mockups"
                className="mx-0 max-w-none"
              />
            </Reveal>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {project.gallery.map((image, index) => (
                <Reveal key={`${image}-${index}`} delay={index * 0.05}>
                  <ProjectCover
                    src={image}
                    alt={`Mockup ${index + 1} — ${project.title}`}
                    title={project.title}
                  />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {project.hasDemo && project.demoRoute ? (
        <Section className="bg-nangell-surface/30">
          <Container>
            <CtaSection
              title="Experimente a demo interativa"
              description="Navegue pelo sistema simulado no navegador — sem cadastro, com dados fictícios."
              variant="gradient"
              className="!py-0"
            >
              <Link
                href={project.demoRoute}
                className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
              >
                <Play className="h-4 w-4" aria-hidden />
                Abrir demo
              </Link>
              <Link
                href="/portfolio"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                Ver mais cases
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </CtaSection>
          </Container>
        </Section>
      ) : null}

      {relatedProjects.length > 0 ? (
        <Section>
          <Container>
            <Reveal>
              <SectionHeading
                align="left"
                title="Cases relacionados"
                description="Outros projetos com stack, categoria ou objetivo de negócio semelhante."
                className="mx-0 max-w-none"
              />
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((related) => (
                <ProjectCard key={related.slug} project={related} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <CtaSection
        title={`Pronto para um projeto como ${project.title}?`}
        description="Agende um diagnóstico gratuito e receba um roadmap técnico alinhado ao seu processo."
        variant="gradient"
      >
        <Link
          href="/diagnostico"
          className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
        >
          Solicitar diagnóstico
        </Link>
        <a
          href={buildWhatsAppUrl(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          Falar no WhatsApp
        </a>
      </CtaSection>
    </>
  );
}
