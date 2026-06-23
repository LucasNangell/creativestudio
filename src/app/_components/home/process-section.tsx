import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/stagger-container";
import { homeProcessSteps } from "@/data/home";

import { SectionHeading } from "./section-heading";

export function ProcessSection() {
  return (
    <Section id="processo">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Como trabalhamos"
            title="Metodologia clara em 6 etapas"
            description="Do primeiro contato à evolução contínua, transparência total em cada fase do projeto."
          />
        </Reveal>

        <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homeProcessSteps.map((step) => (
            <StaggerItem key={step.step}>
              <div className="glass-card h-full p-5 sm:p-6">
                <span className="font-mono text-2xl font-bold text-nangell-cyan/40">
                  {String(step.step).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-heading text-lg font-semibold text-nangell-text">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-nangell-muted">
                  {step.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal className="mt-10 text-center">
          <Link
            href="/processo"
            className="text-sm font-medium text-nangell-cyan hover:text-nangell-blue"
          >
            Ver metodologia completa →
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}
