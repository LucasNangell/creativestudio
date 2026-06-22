import Link from "next/link";
import { ExternalLink, Play } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/stagger-container";
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
import { homeDemos } from "@/data/home";
import { cn } from "@/lib/utils";

import { SectionHeading } from "./section-heading";

export function DemosSection() {
  return (
    <Section id="demos" className="bg-nangell-surface/30">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Experimente antes de contratar"
            title="7 demos dos sistemas que desenvolvemos"
            description="Abra as demonstrações reais do portfólio — doações, produção gráfica, vídeo corporativo, automação, sharescreen, site clínico e inteligência política."
          />
        </Reveal>

        <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {homeDemos.map((demo) => (
            <StaggerItem key={demo.id}>
              <Card variant="default" padding="md" className="flex h-full flex-col">
                <CardHeader>
                  <Badge variant="outline" className="mb-3 w-fit">
                    {demo.category}
                  </Badge>
                  <CardTitle>{demo.title}</CardTitle>
                  <CardDescription>{demo.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex flex-wrap gap-1.5">
                    {demo.stack.map((tech) => (
                      <Badge key={tech} variant="muted">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex-col gap-2 border-t-0 pt-0 sm:flex-row">
                  <Link
                    href={demo.demoHref}
                    className={cn(
                      buttonVariants({ variant: "primary", size: "sm" }),
                      "w-full sm:flex-1",
                    )}
                  >
                    <Play className="h-3.5 w-3.5" aria-hidden />
                    Abrir demo
                  </Link>
                  <Link
                    href={demo.caseHref}
                    className={cn(
                      buttonVariants({ variant: "outline", size: "sm" }),
                      "w-full sm:flex-1",
                    )}
                  >
                    Ver case
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </CardFooter>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
