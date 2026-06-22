import Link from "next/link";
import Image from "next/image";

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
  sobreEquipe,
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

          <Reveal>
            <ol className="relative mx-auto mt-12 max-w-2xl">
              <div
                className="absolute top-0 bottom-0 left-[19px] w-0.5 bg-gradient-to-b from-nangell-cyan via-nangell-blue to-nangell-violet sm:left-1/2 sm:-translate-x-px"
                aria-hidden
              />
              {sobreHistoria.milestones.map((milestone, index) => (
                <li
                  key={milestone.year}
                  className={cn(
                    "relative pb-10 last:pb-0",
                    index % 2 === 0 ? "sm:pr-[calc(50%+2rem)] sm:text-right" : "sm:pl-[calc(50%+2rem)]",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-1 left-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-nangell-cyan bg-nangell-dark font-mono text-[10px] font-bold text-nangell-cyan sm:left-1/2 sm:-translate-x-1/2",
                    )}
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div
                    className={cn(
                      "ml-14 sm:ml-0",
                      index % 2 === 0 ? "sm:mr-0" : "sm:ml-0",
                    )}
                  >
                    <p className="font-mono text-xs tracking-widest text-nangell-cyan uppercase">
                      {milestone.year}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-nangell-muted sm:text-base">
                      {milestone.label}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
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

      <Section className="bg-nangell-surface/30">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Pessoas"
              title="Nossa equipe"
              description="Profissionais que unem engenharia rigorosa e visão de produto em cada entrega."
            />
          </Reveal>

          <StaggerContainer className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
            {sobreEquipe.map((member) => (
              <StaggerItem key={member.name}>
                <div className="glass-card flex h-full flex-col items-center p-6 text-center sm:p-8">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-nangell-cyan/30 bg-nangell-dark">
                    <Image
                      src={member.avatar}
                      alt={`Avatar de ${member.name}`}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold text-nangell-text">
                    {member.name}
                  </h3>
                  <p className="mt-1 font-mono text-xs tracking-widest text-nangell-cyan uppercase">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-nangell-muted">
                    {member.specialty}
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
