import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProjectCard } from "@/app/_components/portfolio/project-card";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ParallaxLayer } from "@/components/motion/parallax-layer";
import { Reveal } from "@/components/motion/reveal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/stagger-container";
import { buttonVariants } from "@/components/ui/button";
import { homeDemos } from "@/data/home-demos";
import { cn } from "@/lib/utils";
import { getPublishedProjects } from "@/services/projects-service";

import { SectionHeading } from "./section-heading";

export async function DemosSection() {
  const projects = (await getPublishedProjects()).filter(
    (project) => project.hasDemo,
  );
  const demoCount = projects.length || homeDemos.length;

  return (
    <Section id="demos" className="relative overflow-hidden bg-nangell-surface/30">
      <ParallaxLayer
        speed={0.1}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <div className="absolute top-1/4 -left-24 h-64 w-64 rounded-full bg-nangell-violet/5 blur-3xl" />
      </ParallaxLayer>

      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="Demonstrações"
            title="Cases com demonstração interativa"
            description="Abra o sistema no navegador, sem cadastro. Cada case tem mockup, stack e fluxo documentado."
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
              {demoCount} sistemas com estudo de caso e demonstração no site.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
