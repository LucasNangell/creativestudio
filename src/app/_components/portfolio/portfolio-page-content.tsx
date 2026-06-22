import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { SectionHeading } from "@/app/_components/home/section-heading";
import { Container } from "@/components/layout/container";
import { CtaSection } from "@/components/layout/cta-section";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { portfolioPageContent } from "@/data/projects/enriched-content";
import { buildWhatsAppUrl } from "@/data/navigation";
import { cn } from "@/lib/utils";
import type { ProjectDetail } from "@/types/projects";

import { PortfolioFiltersGrid } from "./portfolio-filters-grid";

type PortfolioPageContentProps = {
  projects: ProjectDetail[];
};

export function PortfolioPageContent({ projects }: PortfolioPageContentProps) {
  const { hero, showDontTell, filters, cta } = portfolioPageContent;

  return (
    <>
      <Section className="pt-8 sm:pt-12">
        <Container>
          <PageHero
            eyebrow={hero.eyebrow}
            title={hero.title}
            description={hero.description}
            align="left"
          >
            <Link
              href={hero.primaryCta.href}
              className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              {hero.secondaryCta.label}
            </Link>
          </PageHero>
        </Container>
      </Section>

      <Section className="bg-nangell-surface/30">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <SectionHeading
                align="left"
                title={showDontTell.title}
                description={showDontTell.description}
                className="mx-0 max-w-none"
              />
            </Reveal>
            <Reveal delay={0.05}>
              <ul className="space-y-3">
                {showDontTell.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-3 rounded-nangell border border-glass-border bg-nangell-surface/50 p-4"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-nangell-cyan"
                      aria-hidden
                    />
                    <span className="text-sm text-nangell-text sm:text-base">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              align="left"
              title={filters.title}
              description={filters.description}
              className="mx-0 max-w-none"
            />
          </Reveal>
          <div className="mt-10">
            <PortfolioFiltersGrid projects={projects} />
          </div>
        </Container>
      </Section>

      <CtaSection
        title={cta.title}
        description={cta.description}
        variant="gradient"
      >
        <Link
          href={cta.primaryCta.href}
          className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
        >
          {cta.primaryCta.label}
        </Link>
        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          {cta.whatsappCta.label}
        </a>
      </CtaSection>
    </>
  );
}
