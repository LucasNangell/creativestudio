import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";

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
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import {
  sobreCta,
  sobreFundador,
  sobreHero,
  sobreHistoria,
  sobreProcesso,
  sobrePublico,
  sobreValores,
} from "@/data/institutional/sobre";
import { cn } from "@/lib/utils";

export function SobrePageContent() {
  const initials = sobreFundador.member.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <Section spacing="hero">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <PageHero
                eyebrow={sobreHero.eyebrow}
                title={sobreHero.title}
                description={sobreHero.description}
                align="left"
              >
                <Link
                  href={sobreHero.primaryCta.href}
                  className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
                >
                  {sobreHero.primaryCta.label}
                </Link>
                <Link
                  href={sobreHero.secondaryCta.href}
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
                >
                  {sobreHero.secondaryCta.label}
                </Link>
              </PageHero>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <div className="glass-card relative overflow-hidden p-6 sm:p-8">
                <div
                  aria-hidden
                  className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-nangell-gradient opacity-20 blur-2xl"
                />
                <h2 className="font-heading text-xl font-semibold text-nangell-text">
                  {sobreHero.card.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-nangell-muted sm:text-base">
                  {sobreHero.card.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {sobreHero.card.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-nangell-text"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-nangell-cyan"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <SectionHeading title={sobreHistoria.title} align="left" className="mx-0" />
            <div className="mt-6 max-w-3xl space-y-4">
              {sobreHistoria.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-nangell-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <StaggerContainer className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sobreHistoria.milestones.map((milestone) => (
              <StaggerItem key={milestone.year}>
                <Card variant="elevated" padding="md" className="h-full">
                  <CardHeader>
                    <CardTitle className="font-mono text-sm text-nangell-cyan">
                      {milestone.year}
                    </CardTitle>
                    <CardDescription>{milestone.label}</CardDescription>
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
            <SectionHeading
              title={sobreProcesso.title}
              description={sobreProcesso.description}
              align="left"
              className="mx-0"
            />
          </Reveal>
          <StaggerContainer className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sobreProcesso.steps.map((step) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={step.step}>
                  <Card variant="elevated" padding="md" className="h-full">
                    <CardHeader>
                      <div className="mb-3 flex items-center gap-3">
                        <span className="font-mono text-xs text-nangell-cyan">
                          {step.step}
                        </span>
                        <Icon className="h-5 w-5 text-nangell-cyan" aria-hidden />
                      </div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                      <CardDescription>{step.description}</CardDescription>
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
          <div className="grid items-start gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <Reveal>
              <SectionHeading
                title={sobreFundador.title}
                align="left"
                className="mx-0"
              />
              <div className="mt-6 space-y-4">
                {sobreFundador.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-relaxed text-nangell-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <blockquote className="mt-6 border-l-2 border-nangell-cyan pl-4 text-base text-nangell-text italic">
                {sobreFundador.quote}
              </blockquote>
            </Reveal>

            <Reveal delay={0.05}>
              <div className="glass-card p-6 sm:p-8">
                <div
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-nangell-gradient font-heading text-xl font-bold text-nangell-dark"
                  aria-hidden
                >
                  {initials}
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold text-nangell-text">
                  {sobreFundador.member.name}
                </h3>
                <p className="text-sm text-nangell-cyan">{sobreFundador.member.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-nangell-muted">
                  {sobreFundador.member.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {sobreFundador.member.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-nangell border border-glass-border px-2.5 py-1 text-xs text-nangell-muted"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="bg-nangell-surface/30">
        <Container>
          <Reveal>
            <SectionHeading title={sobreValores.title} />
          </Reveal>
          <StaggerContainer className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sobreValores.valores.map((valor) => {
              const Icon = valor.icon;
              return (
                <StaggerItem key={valor.title}>
                  <Card variant="elevated" padding="md" className="h-full">
                    <CardHeader>
                      <Icon className="mb-3 h-5 w-5 text-nangell-cyan" aria-hidden />
                      <CardTitle className="text-lg">{valor.title}</CardTitle>
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
            <SectionHeading title={sobrePublico.title} />
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="glass-card p-6">
              <h3 className="font-heading text-base font-semibold text-nangell-text">
                Ideal para
              </h3>
              <ul className="mt-4 space-y-3">
                {sobrePublico.idealFor.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-nangell-muted">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-nangell-cyan"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-6">
              <h3 className="font-heading text-base font-semibold text-nangell-text">
                Ainda não para
              </h3>
              <ul className="mt-4 space-y-3">
                {sobrePublico.notYetFor.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-nangell-muted">
                    <XCircle
                      className="mt-0.5 h-4 w-4 shrink-0 text-nangell-muted"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

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
