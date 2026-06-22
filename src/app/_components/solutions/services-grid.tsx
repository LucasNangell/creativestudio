import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/app/_components/home/section-heading";
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
import { cn } from "@/lib/utils";
import type { ServiceListItem } from "@/types/services";

type ServicesGridProps = {
  services: ServiceListItem[];
  showHeading?: boolean;
};

export function ServicesGrid({ services, showHeading = true }: ServicesGridProps) {
  return (
    <Section id="catalogo">
      <Container>
        {showHeading ? (
          <Reveal>
            <SectionHeading
              eyebrow="Catálogo"
              title="Seis frentes de engenharia para escalar sua operação"
              description="Cada solução combina discovery, arquitetura, UX premium e entrega documentada — com demos interativas quando aplicável."
            />
          </Reveal>
        ) : null}

        <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={service.id}>
                <Card variant="elevated" padding="md" className="flex h-full flex-col">
                  <CardHeader>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-nangell bg-nangell-gradient-subtle">
                      <Icon className="h-5 w-5 text-nangell-cyan" aria-hidden />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.headline}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <p className="text-sm leading-relaxed text-nangell-muted">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.focusAreas.slice(0, 4).map((area) => (
                        <Badge key={area} variant="muted">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t-0 pt-0">
                    <Link
                      href={`/solucoes/${service.slug}`}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "sm" }),
                        "px-0 text-nangell-cyan hover:bg-transparent hover:text-nangell-blue",
                      )}
                    >
                      {service.ctaLabel}
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </Link>
                  </CardFooter>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Container>
    </Section>
  );
}
