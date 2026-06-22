import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Play } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { BrowserWindow } from "@/components/mockups/browser-window";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getPublishedProjects } from "@/services/projects-service";
import type { ProjectListItem } from "@/types/projects";

import { SectionHeading } from "./section-heading";

function VisualProofCard({ project }: { project: ProjectListItem }) {
  const demoHref = project.demoRoute ?? `/cases/${project.slug}`;

  return (
    <BrowserWindow
      title={project.title}
      url={`nangell.com.br${demoHref}`}
      className="h-full"
    >
      <Link href={demoHref} className="group block">
        <div className="-mx-4 -mt-4 overflow-hidden sm:-mx-6 sm:-mt-6">
          <Image
            src={project.coverImage}
            alt={`Interface do case ${project.title}`}
            width={640}
            height={360}
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
            className="aspect-video w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{project.category}</Badge>
            {project.hasDemo ? (
              <Badge variant="default" className="gap-1">
                <Play className="h-3 w-3" aria-hidden />
                Demonstração
              </Badge>
            ) : null}
          </div>

          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-heading text-base font-semibold text-nangell-text sm:text-lg">
                {project.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-sm text-nangell-muted">
                {project.shortDescription}
              </p>
            </div>
            <ArrowUpRight
              className="mt-1 h-4 w-4 shrink-0 text-nangell-cyan opacity-0 transition-opacity group-hover:opacity-100"
              aria-hidden
            />
          </div>

          {project.primaryMetric ? (
            <div className="rounded-nangell border border-glass-border bg-nangell-dark/40 p-3">
              <p className="font-mono text-[10px] text-nangell-muted uppercase">
                {project.primaryMetric.label}
              </p>
              <p className="font-heading text-xl font-bold text-nangell-cyan">
                {project.primaryMetric.value}
              </p>
            </div>
          ) : null}
        </div>
      </Link>
    </BrowserWindow>
  );
}

export async function VisualProofSection() {
  const featuredProjects = (await getPublishedProjects()).filter(
    (project) => project.isFeatured && project.coverImage,
  );

  return (
    <Section id="prova-visual">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Prova visual"
            title="Telas reais dos cases em destaque"
            description="Capturas das demonstrações do portfólio — cada interface abaixo corresponde a um sistema que você pode testar na seção anterior."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <Reveal key={project.slug} direction="up" delay={index * 0.05}>
              <VisualProofCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex justify-center">
            <Link href="#demos" className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}>
              Ver todos os cases com demonstração
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
