import Link from "next/link";

import { SectionHeading } from "@/app/_components/home/section-heading";
import { OpportunityCalculator } from "@/app/_components/solutions/opportunity-calculator";
import { ServicesGrid } from "@/app/_components/solutions/services-grid";
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
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { solucoesPageContent } from "@/data/services/enriched-content";
import { buildWhatsAppUrl } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { toServiceListItem } from "@/services/services-service";
import type { ServiceDetail } from "@/types/services";

type SolutionsPageContentProps = {
  services: ServiceDetail[];
};

export function SolutionsPageContent({ services }: SolutionsPageContentProps) {
  const listItems = services.map(toServiceListItem);
  const { hero, momentFit, comparison, painCards, cta } = solucoesPageContent;

  return (
    <>
      <Section className="pt-8 sm:pt-12">
        <Container>
          <PageHero
            eyebrow={hero.eyebrow}
            title={hero.title}
            description={hero.description}
          >
            <Link
              href="/diagnostico"
              className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
            >
              Solicitar diagnóstico
            </Link>
            <Link
              href="#catalogo"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Ver catálogo
            </Link>
          </PageHero>
        </Container>
      </Section>

      <ServicesGrid services={listItems} />

      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              title={momentFit.title}
              description={momentFit.description}
            />
          </Reveal>

          <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {momentFit.scenarios.map((scenario) => (
              <StaggerItem key={scenario.id}>
                <Link href={scenario.href} className="group block h-full">
                  <Card variant="elevated" padding="md" className="h-full transition-colors group-hover:border-nangell-cyan/30">
                    <CardHeader>
                      <Badge variant="outline" className="w-fit">
                        {scenario.recommendation}
                      </Badge>
                      <CardTitle className="mt-3">{scenario.title}</CardTitle>
                      <CardDescription>{scenario.signal}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      <Section className="bg-nangell-surface/30">
        <Container>
          <Reveal>
            <SectionHeading
              title={comparison.title}
              description={comparison.description}
            />
          </Reveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal delay={0.05}>
              <div className="glass-card h-full p-6 sm:p-8">
                <h3 className="font-heading text-lg font-semibold text-nangell-muted">
                  {comparison.template.label}
                </h3>
                <ul className="mt-6 space-y-3">
                  {comparison.template.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-nangell-muted"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-nangell-muted/50"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="glass-card h-full border-nangell-cyan/20 bg-nangell-gradient-subtle p-6 sm:p-8">
                <h3 className="font-heading text-lg font-semibold text-nangell-cyan">
                  {comparison.custom.label}
                </h3>
                <ul className="mt-6 space-y-3">
                  {comparison.custom.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-nangell-text"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-nangell-cyan"
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
            <SectionHeading title={painCards.title} />
          </Reveal>
          <StaggerContainer className="mt-10 grid gap-4 sm:grid-cols-2">
            {painCards.items.map((item) => (
              <StaggerItem key={item.pain}>
                <Link href={item.href} className="group block">
                  <div className="glass-card flex h-full flex-col justify-between p-6 transition-colors group-hover:border-nangell-cyan/30">
                    <p className="font-heading text-base font-semibold text-nangell-text">
                      {item.pain}
                    </p>
                    <p className="mt-3 text-sm text-nangell-cyan">
                      → {item.solution}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      <OpportunityCalculator />

      <CtaSection title={cta.title} description={cta.description} variant="gradient">
        <Link
          href={cta.primaryHref}
          className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
        >
          {cta.primaryLabel}
        </Link>
        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          {cta.secondaryLabel}
        </a>
      </CtaSection>
    </>
  );
}
