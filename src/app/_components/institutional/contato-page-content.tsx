import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";

import { ContactForm } from "@/app/_components/institutional/contact-form";
import { Container } from "@/components/layout/container";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { contatoHero, contatoInfo } from "@/data/institutional/contato";
import { buildWhatsAppUrl } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function ContatoPageContent() {
  return (
    <>
      <Section className="pt-8 sm:pt-12">
        <Container>
          <PageHero
            eyebrow={contatoHero.eyebrow}
            title={contatoHero.title}
            description={contatoHero.description}
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
            <aside className="lg:col-span-2">
              <Reveal>
                <h2 className="font-heading text-xl font-bold text-nangell-text">
                  Canais de contato
                </h2>
                <p className="mt-2 text-sm text-nangell-muted">
                  {contatoInfo.horario}
                </p>

                <div className="mt-8 space-y-4">
                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-card flex items-start gap-4 p-5 transition-colors hover:border-nangell-cyan/30"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-nangell bg-nangell-gradient-subtle">
                      <MessageCircle className="h-5 w-5 text-nangell-cyan" aria-hidden />
                    </span>
                    <span>
                      <span className="block font-heading font-semibold text-nangell-text">
                        {contatoInfo.whatsappLabel}
                      </span>
                      <span className="mt-1 block text-sm text-nangell-muted">
                        {contatoInfo.whatsappHint}
                      </span>
                    </span>
                  </a>

                  <a
                    href={`mailto:${contatoInfo.email}`}
                    className="glass-card flex items-start gap-4 p-5 transition-colors hover:border-nangell-cyan/30"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-nangell bg-nangell-gradient-subtle">
                      <Mail className="h-5 w-5 text-nangell-cyan" aria-hidden />
                    </span>
                    <span>
                      <span className="block font-heading font-semibold text-nangell-text">
                        {contatoInfo.emailLabel}
                      </span>
                      <span className="mt-1 block text-sm text-nangell-muted">
                        {contatoInfo.email}
                      </span>
                    </span>
                  </a>
                </div>

                <div className="mt-8 flex flex-col gap-3">
                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({ variant: "primary", size: "lg" }),
                      "gap-2",
                    )}
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    Chamar no WhatsApp
                  </a>
                  <Link
                    href="/diagnostico"
                    className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
                  >
                    Solicitar diagnóstico completo
                  </Link>
                </div>
              </Reveal>
            </aside>

            <div className="lg:col-span-3">
              <Reveal>
                <div className="glass-card p-6 sm:p-8">
                  <h2 className="font-heading text-xl font-bold text-nangell-text">
                    Envie uma mensagem
                  </h2>
                  <p className="mt-2 text-sm text-nangell-muted">
                    Preencha o formulário e retornaremos em até 1 dia útil.
                  </p>
                  <div className="mt-6">
                    <ContactForm />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
