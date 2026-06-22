import type { Metadata } from "next";
import { Suspense } from "react";

import { DiagnosticoForm } from "@/app/_components/institutional/diagnostico-form";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { Skeleton } from "@/components/ui/skeleton";
import { diagnosticoHero, diagnosticoSeo } from "@/data/institutional/diagnostico";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: diagnosticoSeo.title,
  description: diagnosticoSeo.description,
  path: "/diagnostico",
  keywords: [...diagnosticoSeo.keywords],
});

function DiagnosticoFormFallback() {
  return (
    <div className="glass-card space-y-4 p-8">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-2 w-full" />
      <Skeleton className="h-11 w-full" />
      <Skeleton className="h-11 w-full" />
      <Skeleton className="h-11 w-full" />
    </div>
  );
}

export default function DiagnosticoPage() {
  return (
    <main className="relative min-h-screen bg-noise-overlay">
      <PageHero
        eyebrow={diagnosticoHero.eyebrow}
        title={diagnosticoHero.title}
        description={diagnosticoHero.description}
        className="pb-8 sm:pb-10"
      />

      <Section className="pt-0">
        <Container className="max-w-3xl">
          <Reveal>
            <Suspense fallback={<DiagnosticoFormFallback />}>
              <DiagnosticoForm />
            </Suspense>
          </Reveal>

          <p className="mt-6 text-center text-xs text-nangell-muted">
            Seus dados são tratados conforme a LGPD e usados apenas para retorno comercial da
            Nangell Creative Studio.
          </p>
        </Container>
      </Section>
    </main>
  );
}
