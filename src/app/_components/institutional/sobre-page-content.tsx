import Link from "next/link";

import { SectionHeading } from "@/app/_components/home/section-heading";
import { TechMarquee } from "@/app/_components/home/tech-marquee";
import { Container } from "@/components/layout/container";
import { CtaSection } from "@/components/layout/cta-section";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/stagger-container";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import {
  sobreCta,
  sobreDiferenciaisTecnicos,
  sobreHero,
  sobreHistoria,
  sobreManifesto,
  sobreMissao,
  sobreNaoSomosCodificadores,
  sobreValores,
  sobreVisao,
} from "@/data/institutional/sobre";
import { cn } from "@/lib/utils";

export function SobrePageContent() {
  return (
    <>
      <Section className="pt-8 sm:pt-12">
        <Container>
          <PageHero
            eyebrow={sobreHero.eyebrow}
            title={sobreHero.title}
            description={sobreHero.description}
          >
            <Link
              href="/diagnostico"
              className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
            >
              Solicitar diagnóstico
            </Link>
            <Link
              href="/processo"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Conhecer processo
            </Link>
          </PageHero>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <SectionHeading
                align="left"
                title={sobreHistoria.title}
                className="mx-0 max-w-none"
              />
              <div className="mt-6 space-y-4">
                {sobreHistoria.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-base leading-relaxed text-nangell-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>

          <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sobreHistoria.milestones.map((milestone) => (
              <StaggerItem key={milestone.year}>
                <div className="glass-card h-full p-5">
                  <p className="font-mono text-xs tracking-widest text-nangell-cyan uppercase">
                    {milestone.year}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-nangell-muted">
                    {milestone.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      <Section className="bg-nangell-surface/30">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <SectionHeading
                title={sobreManifesto.title}
                className="max-w-none"
              />
              <blockquote className="mt-8 border-l-2 border-nangell-cyan pl-6 text-left font-heading text-xl font-medium leading-relaxed text-nangell-text sm:text-2xl">
                &ldquo;{sobreManifesto.quote}&rdquo;
              </blockquote>
              <ul className="mt-8 space-y-4 text-left">
                {sobreManifesto.principles.map((principle) => (
                  <li
                    key={principle.slice(0, 30)}
                    className="flex gap-3 text-base leading-relaxed text-nangell-muted"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-nangell-cyan" aria-hidden />
                    {principle}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Propósito"
              title="Missão, visão e valores"
              description="O que nos move e como tomamos decisões em cada projeto."
            />
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <Card variant="gradient" padding="lg" className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl">{sobreMissao.title}</CardTitle>
                </CardHeader>
                <CardDescription className="text-base">
                  {sobreMissao.description}
                </CardDescription>
              </Card>
            </Reveal>
            <Reveal>
              <Card variant="gradient" padding="lg" className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl">{sobreVisao.title}</CardTitle>
                </CardHeader>
                <CardDescription className="text-base">
                  {sobreVisao.description}
                </CardDescription>
              </Card>
            </Reveal>
          </div>

          <StaggerContainer className="mt-8 grid gap-4 sm:grid-cols-2">
            {sobreValores.map((valor) => {
              const Icon = valor.icon;
              return (
                <StaggerItem key={valor.title}>
                  <Card className="h-full">
                    <CardHeader>
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-nangell bg-nangell-gradient-subtle">
                        <Icon className="h-5 w-5 text-nangell-cyan" aria-hidden />
                      </div>
                      <CardTitle>{valor.title}</CardTitle>
                      <CardDescription>{valor.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Engenharia"
              title="Diferenciais técnicos"
              description="Competências que sustentam cada entrega — do diagnóstico ao deploy."
            />
          </Reveal>

          <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sobreDiferenciaisTecnicos.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.title}>
                  <div className="glass-card h-full p-5 sm:p-6">
                    <Icon className="h-6 w-6 text-nangell-cyan" aria-hidden />
                    <h3 className="mt-3 font-heading text-lg font-semibold text-nangell-text">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-nangell-muted">
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </Section>

      <Section className="bg-nangell-surface/30">
        <Container>
          <Reveal>
            <SectionHeading
              title={sobreNaoSomosCodificadores.title}
              description={sobreNaoSomosCodificadores.description}
            />
          </Reveal>

          <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2">
            {sobreNaoSomosCodificadores.points.map((point) => (
              <StaggerItem key={point.title}>
                <div className="glass-card h-full p-5 sm:p-6">
                  <h3 className="font-heading text-lg font-semibold text-nangell-text">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-nangell-muted">
                    {point.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      <TechMarquee />

      <CtaSection
        title={sobreCta.title}
        description={sobreCta.description}
        variant="gradient"
      >
        <Link
          href={sobreCta.primaryCta.href}
          className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
        >
          {sobreCta.primaryCta.label}
        </Link>
        <Link
          href={sobreCta.secondaryCta.href}
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          {sobreCta.secondaryCta.label}
        </Link>
      </CtaSection>
    </>
  );
}
