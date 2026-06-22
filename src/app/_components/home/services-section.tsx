import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/stagger-container";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { homeServices } from "@/data/home";
import { cn } from "@/lib/utils";

import { SectionHeading } from "./section-heading";

export function ServicesSection() {
  return (
    <Section id="solucoes">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="O que construímos"
            title="Software sob medida para cada desafio de negócio"
            description="Do MVP ao sistema enterprise — entregamos soluções completas com engenharia, design e estratégia comercial integrados."
          />
        </Reveal>

        <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {homeServices.map((service) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={service.id}>
                <Card variant="elevated" padding="md" className="flex h-full flex-col">
                  <CardHeader>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-nangell bg-nangell-gradient-subtle">
                      <Icon className="h-5 w-5 text-nangell-cyan" aria-hidden />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-2">
                      {service.benefits.map((benefit) => (
                        <li
                          key={benefit}
                          className="flex items-start gap-2 text-sm text-nangell-muted"
                        >
                          <span
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-nangell-cyan"
                            aria-hidden
                          />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="border-t-0 pt-0">
                    <Link
                      href={service.cta.href}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "sm" }),
                        "px-0 text-nangell-cyan hover:bg-transparent hover:text-nangell-blue",
                      )}
                    >
                      {service.cta.label}
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
