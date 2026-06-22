import type { Metadata } from "next";

import { DemosSection } from "@/app/_components/home/demos-section";
import { DifferentialsSection } from "@/app/_components/home/differentials-section";
import { FinalCtaSection } from "@/app/_components/home/final-cta-section";
import { HeroSection } from "@/app/_components/home/hero-section";
import { ProcessSection } from "@/app/_components/home/process-section";
import { ServicesSection } from "@/app/_components/home/services-section";
import { TechMarquee } from "@/app/_components/home/tech-marquee";
import { VisualProofSection } from "@/app/_components/home/visual-proof-section";
import { homeSeo } from "@/data/home";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: homeSeo.title.split(" | ")[0] ?? homeSeo.title,
  description: homeSeo.description,
  path: "/",
  keywords: [...homeSeo.keywords],
});

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-noise-overlay">
      <HeroSection />
      <TechMarquee />
      <ServicesSection />
      <DemosSection />
      <VisualProofSection />
      <DifferentialsSection />
      <ProcessSection />
      <FinalCtaSection />
    </main>
  );
}
