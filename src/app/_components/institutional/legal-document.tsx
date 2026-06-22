import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import type { LegalSection } from "@/data/institutional/legal";

type LegalDocumentProps = {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
  intro?: string;
};

export function LegalDocument({
  title,
  lastUpdated,
  sections,
  intro,
}: LegalDocumentProps) {
  return (
    <main className="relative min-h-screen bg-noise-overlay">
      <Section className="pt-8 sm:pt-12">
        <Container className="max-w-3xl">
          <header className="border-b border-glass-border pb-8">
            <p className="font-mono text-xs tracking-widest text-nangell-cyan uppercase">
              Documento legal
            </p>
            <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-nangell-text sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 text-sm text-nangell-muted">
              Última atualização: {lastUpdated}
            </p>
            {intro ? (
              <p className="mt-4 text-base leading-relaxed text-nangell-muted">
                {intro}
              </p>
            ) : null}
          </header>

          <nav
            aria-label="Índice do documento"
            className="mt-8 rounded-nangell-lg border border-glass-border bg-nangell-surface/60 p-5"
          >
            <h2 className="font-heading text-sm font-semibold text-nangell-text">
              Índice
            </h2>
            <ol className="mt-3 space-y-1.5">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-sm text-nangell-muted hover:text-nangell-cyan"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="prose-nangell mt-10 space-y-10 pb-16">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="font-heading text-xl font-semibold text-nangell-text sm:text-2xl">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-3">
                  {section.content.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base leading-relaxed text-nangell-muted"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </article>

          <footer className="border-t border-glass-border py-8">
            <p className="text-sm text-nangell-muted">
              Dúvidas?{" "}
              <Link href="/contato" className="font-medium">
                Entre em contato
              </Link>{" "}
              ou consulte nossa{" "}
              <Link href="/politica-de-privacidade" className="font-medium">
                Política de Privacidade
              </Link>
              .
            </p>
          </footer>
        </Container>
      </Section>
    </main>
  );
}
