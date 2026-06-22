import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/stagger-container";
import { homeDifferentials } from "@/data/home";

import { SectionHeading } from "./section-heading";

export function DifferentialsSection() {
  return (
    <Section className="bg-nangell-surface/30">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Diferenciais"
            title="Por que empresas escolhem a Nangell"
            description="Engenharia de ponta aliada a visão comercial — cada entrega é um case de competência técnica."
          />
        </Reveal>

        <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homeDifferentials.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.id}>
                <div className="glass-card h-full p-5 sm:p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-nangell border border-nangell-electric/20 bg-nangell-gradient-subtle">
                    <Icon className="h-5 w-5 text-nangell-cyan" aria-hidden />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-nangell-text sm:text-lg">
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
  );
}
