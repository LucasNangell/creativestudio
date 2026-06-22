import Link from "next/link";
import { ExternalLink, Play, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buildWhatsAppUrl } from "@/data/navigation";
import { cn } from "@/lib/utils";
import type { ProjectListItem } from "@/types/projects";

import { ProjectCover } from "./project-cover";

type ProjectCardProps = {
  project: ProjectListItem;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const whatsappMessage = `Olá! Vi o case "${project.title}" no portfólio e gostaria de algo parecido.`;

  return (
    <Card variant="elevated" padding="none" className="flex h-full flex-col overflow-hidden">
      <div className="p-4 pb-0">
        <ProjectCover
          src={project.coverImage}
          alt={`Mockup do projeto ${project.title}`}
          title={project.title}
        />
      </div>

      <CardHeader className="px-4 pt-4">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge variant="outline">{project.category}</Badge>
          {project.hasDemo ? (
            <Badge variant="default" className="gap-1">
              <Sparkles className="h-3 w-3" aria-hidden />
              Demo interativa
            </Badge>
          ) : null}
        </div>
        <CardTitle className="text-lg">{project.title}</CardTitle>
        <CardDescription>{project.shortDescription}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 px-4">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="muted">
              {tech}
            </Badge>
          ))}
          {project.stack.length > 4 ? (
            <Badge variant="muted">+{project.stack.length - 4}</Badge>
          ) : null}
        </div>

        {project.badges.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.badges
              .filter((badge) => badge !== "Demo interativa")
              .map((badge) => (
                <Badge key={badge} variant="outline" className="text-xs">
                  {badge}
                </Badge>
              ))}
          </div>
        ) : null}

        {project.primaryMetric ? (
          <div
            className="mt-4 rounded-nangell border border-glass-border bg-nangell-dark/40 p-3"
            aria-label={`Métrica: ${project.primaryMetric.label}`}
          >
            <p className="font-mono text-xs text-nangell-muted uppercase">
              {project.primaryMetric.label}
            </p>
            <p className="font-heading text-2xl font-bold text-nangell-cyan">
              {project.primaryMetric.value}
            </p>
            {project.primaryMetric.description ? (
              <p className="mt-1 text-xs text-nangell-muted">
                {project.primaryMetric.description}
              </p>
            ) : null}
          </div>
        ) : null}
      </CardContent>

      <CardFooter className="flex-col gap-2 border-t border-glass-border px-4 pt-4 sm:flex-row">
        <Link
          href={`/cases/${project.slug}`}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "w-full sm:flex-1",
          )}
        >
          Ver case
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </Link>
        {project.hasDemo && project.demoRoute ? (
          <Link
            href={project.demoRoute}
            className={cn(
              buttonVariants({ variant: "primary", size: "sm" }),
              "w-full sm:flex-1",
            )}
          >
            <Play className="h-3.5 w-3.5" aria-hidden />
            Abrir demo
          </Link>
        ) : null}
        <a
          href={buildWhatsAppUrl(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "w-full text-nangell-cyan sm:flex-1",
          )}
        >
          Quero algo parecido
        </a>
      </CardFooter>
    </Card>
  );
}
