"use client";

import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  if (process.env.NODE_ENV === "development") {
    console.error("[app-error]", error);
  }

  return (
    <main className="relative min-h-[60vh] bg-noise-overlay">
      <Section className="pt-16">
        <Container className="max-w-lg text-center">
          <h1 className="font-heading text-2xl font-bold text-nangell-text">
            Algo deu errado
          </h1>
          <p className="mt-3 text-nangell-muted">
            Não foi possível carregar esta página. Tente novamente ou volte para a
            home.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={reset}
              className={cn(buttonVariants({ variant: "primary" }))}
            >
              Tentar novamente
            </button>
            <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
              Ir para a home
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
