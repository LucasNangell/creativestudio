import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, XCircle } from "lucide-react";

import { SectionHeading } from "@/app/_components/home/section-heading";
import { Container } from "@/components/layout/container";
import { CtaSection } from "@/components/layout/cta-section";
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
  sobreDiferenciais,
  sobreFundador,
  sobreHero,
  sobreHistoria,
  sobreMissaoVisao,
  sobreProcesso,
  sobreProblemas,
  sobreProposito,
  sobrePublico,
} from "@/data/institutional/sobre";
import { cn } from "@/lib/utils";

export function SobrePageContent() {
  return (
    <>
      <Section className="pt-8 sm:pt-12">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div>
                <p className="font-mono text-xs tracking-widest text-nangell-cyan uppercase">
                  {sobreHero.eyebrow}
                </p>
                <h1 className="mt-4 font-heading text-3xl font-bold leading-tight text-nangell-text sm:text-4xl lg:text-[2.5rem]">
                  {sobreHero.title}
                </h1>
                <p className="mt-5 text-base leading-relaxed text-nangell-muted sm:text-lg">
                  {sobreHero.description}
                </p>
                <p className="mt-4 text-base leading-relaxed text-nangell-muted">
                  {sobreHero.complement}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
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
                </div>
              </div>
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
                    <li key={item} className="flex items-start gap-2.5 text-sm text-nangell-muted">
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
                  <div className="ml-14 sm:ml-0">
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
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div>
                <SectionHeading
                  align="left"
                  title={sobreProblemas.title}
                  className="mx-0 max-w-none"
                />
                <div className="mt-6 space-y-4">
                  {sobreProblemas.paragraphs.map((paragraph) => (
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

            <StaggerContainer className="grid gap-4 sm:grid-cols-2">
              {sobreProblemas.cards.map((card) => {
                const Icon = card.icon;
                return (
                  <StaggerItem key={card.title}>
                    <Card className="h-full">
                      <CardHeader>
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-nangell bg-nangell-gradient-subtle">
                          <Icon className="h-5 w-5 text-nangell-cyan" aria-hidden />
                        </div>
                        <CardTitle className="text-base">{card.title}</CardTitle>
                        <CardDescription>{card.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <SectionHeading title={sobreProposito.title} className="max-w-none" />
              <div className="mt-8 space-y-4 text-left">
                {sobreProposito.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-base leading-relaxed text-nangell-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
              <blockquote className="mt-8 border-l-2 border-nangell-cyan pl-6 text-left font-heading text-xl font-medium leading-relaxed text-nangell-text sm:text-2xl">
                &ldquo;{sobreProposito.quote}&rdquo;
              </blockquote>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section className="bg-nangell-surface/30">
        <Container>
          <Reveal>
            <SectionHeading
              title={sobreProcesso.title}
              description={sobreProcesso.description}
            />
          </Reveal>

          <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sobreProcesso.steps.map((step) => {
              const Icon = step.icon;
              return (
                <StaggerItem key={step.step}>
                  <div className="glass-card h-full p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-nangell-cyan">
                        {step.step}
                      </span>
                      <Icon className="h-5 w-5 text-nangell-cyan" aria-hidden />
                    </div>
                    <h3 className="mt-3 font-heading text-lg font-semibold text-nangell-text">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-nangell-muted">
                      {step.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div>
                <SectionHeading
                  align="left"
                  title={sobreFundador.title}
                  className="mx-0 max-w-none"
                />
                <div className="mt-6 space-y-4">
                  {sobreFundador.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="text-base leading-relaxed text-nangell-muted"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                <blockquote className="mt-8 border-l-2 border-nangell-cyan pl-6 text-base font-medium leading-relaxed text-nangell-text sm:text-lg">
                  &ldquo;{sobreFundador.quote}&rdquo;
                </blockquote>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <div className="glass-card flex flex-col items-center p-6 text-center sm:p-8">
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-nangell-cyan/30 bg-nangell-dark">
                  <Image
                    src={sobreFundador.member.avatar}
                    alt={`Foto de ${sobreFundador.member.name}`}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-5 font-heading text-xl font-semibold text-nangell-text">
                  {sobreFundador.member.name}
                </h3>
                <p className="mt-1 font-mono text-xs tracking-widest text-nangell-cyan uppercase">
                  {sobreFundador.member.role}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-nangell-muted">
                  {sobreFundador.member.description}
                </p>
                <ul className="mt-6 flex flex-wrap justify-center gap-2">
                  {sobreFundador.member.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-nangell-cyan/20 bg-nangell-dark/50 px-3 py-1 text-xs text-nangell-muted"
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
            <SectionHeading title={sobreMissaoVisao.title} />
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[sobreMissaoVisao.missao, sobreMissaoVisao.visao, sobreMissaoVisao.posicionamento].map(
              (item) => (
                <Reveal key={item.title}>
                  <Card variant="gradient" padding="lg" className="h-full">
                    <CardHeader>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                    </CardHeader>
                    <CardDescription className="text-base">{item.description}</CardDescription>
                  </Card>
                </Reveal>
              ),
            )}
          </div>

          <StaggerContainer className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sobreMissaoVisao.valores.map((valor) => {
              const Icon = valor.icon;
              return (
                <StaggerItem key={valor.title}>
                  <Card className="h-full">
                    <CardHeader>
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-nangell bg-nangell-gradient-subtle">
                        <Icon className="h-5 w-5 text-nangell-cyan" aria-hidden />
                      </div>
                      <CardTitle className="text-base">{valor.title}</CardTitle>
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
              title={sobreDiferenciais.title}
              description={sobreDiferenciais.description}
            />
          </Reveal>

          <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sobreDiferenciais.items.map((item) => {
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
            <SectionHeading title={sobrePublico.title} />
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="glass-card h-full p-6 sm:p-8">
                <h3 className="font-heading text-lg font-semibold text-nangell-text">
                  A Nangell é ideal para
                </h3>
                <ul className="mt-5 space-y-3">
                  {sobrePublico.idealFor.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-nangell-muted">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="glass-card h-full p-6 sm:p-8">
                <h3 className="font-heading text-lg font-semibold text-nangell-text">
                  Talvez ainda não seja o momento se
                </h3>
                <ul className="mt-5 space-y-3">
                  {sobrePublico.notYetFor.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-nangell-muted">
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400/80" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-relaxed text-nangell-muted">
              {sobrePublico.complement}
            </p>
          </Reveal>
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
