import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { Container } from "@/components/layout/container";
import {
  buildWhatsAppUrl,
  footerLegalLinks,
  footerNavLinks,
  siteContact,
} from "@/data/navigation";

export function SiteFooter() {
  return (
    <footer className="border-t border-glass-border bg-nangell-surface/50 pb-24 sm:pb-0">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <BrandLogo variant="horizontal" theme="dark" className="h-12 w-auto sm:h-14" />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-nangell-muted">
              Engenharia criativa para softwares sob medida — sistemas web,
              mobile, desktop, automações, dashboards e SaaS para empresas que
              querem crescer com tecnologia.
            </p>
          </div>

          <nav aria-label="Links do site">
            <h2 className="font-heading text-sm font-semibold text-nangell-text">
              Navegação
            </h2>
            <ul className="mt-4 space-y-2">
              {footerNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-nangell-muted transition-colors hover:text-nangell-cyan"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-heading text-sm font-semibold text-nangell-text">
              Contato
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${siteContact.email}`}
                  className="inline-flex items-center gap-2 text-sm text-nangell-muted transition-colors hover:text-nangell-cyan"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden />
                  {siteContact.email}
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-nangell-muted transition-colors hover:text-nangell-cyan"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#25D366]" />
                  WhatsApp comercial
                </a>
              </li>
              <li className="inline-flex items-start gap-2 text-sm text-nangell-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                Brasília, DF — atendimento remoto em todo o Brasil
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-glass-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-nangell-muted">
            <p>
              ©{" "}
              <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
              Nangell Creative Studio. Todos os direitos reservados.
            </p>
            <p className="mt-1">CNPJ {siteContact.cnpj}</p>
          </div>
          <nav aria-label="Links legais" className="flex flex-wrap gap-4">
            {footerLegalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-nangell-muted transition-colors hover:text-nangell-cyan"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
