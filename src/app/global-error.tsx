"use client";

import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-nangell-dark text-nangell-text antialiased">
        <main>
          <Section className="pt-16">
            <Container className="max-w-lg text-center">
              <h1 className="font-heading text-2xl font-bold">Erro inesperado</h1>
              <p className="mt-3 text-nangell-muted">
                Ocorreu um problema ao processar sua solicitação.
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
      </body>
    </html>
  );
}
