import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProjectCard } from "@/app/_components/portfolio/project-card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/stagger-container";
import { buttonVariants } from "@/components/ui/button";
import { homeDemos } from "@/data/home-demos";
import { portfolioPageContent } from "@/data/projects/enriched-content";
import { cn } from "@/lib/utils";
import { getPublishedProjects } from "@/services/projects-service";

import { SectionHeading } from "./section-heading";

export async function DemosSection() {
  const projects = (await getPublishedProjects()).filter((project) => project.hasDemo);
  const demoCount = projects.length || homeDemos.length;

  return (
    <Section id="demos" className="bg-nangell-surface/30">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Experimente antes de contratar"
            title="Cases reais com demonstração interativa no site"
            description="Os mesmos projetos do portfólio — com mockups, métricas e demonstrações que você abre aqui, sem cadastro. Mostre, não conte."
          />
        </Reveal>

        <StaggerContainer className="mt-12 grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <StaggerItem key={project.slug} className="h-full">
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
            <Link
              href="/portfolio"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Ver portfólio completo
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <p className="max-w-xl text-sm text-nangell-muted">
              {demoCount} sistemas com estudo de caso, stack documentada e{" "}
              {portfolioPageContent.showDontTell.highlights[0].toLowerCase()}.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
