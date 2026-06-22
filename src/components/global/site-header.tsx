"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { MobileMenu } from "@/components/global/mobile-menu";
import { Container } from "@/components/layout/container";
import { Button, buttonVariants } from "@/components/ui/button";
import { mainNavLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-glass-border bg-nangell-dark/80 backdrop-blur-md">
        <Container as="div">
          <div className="flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
            <Link
              href="/"
              aria-label="Nangell Creative Studio — página inicial"
              className="max-w-[min(100%,11rem)] shrink-0 rounded-nangell focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nangell-electric sm:max-w-none"
            >
              <BrandLogo
                variant="horizontal"
                theme="dark"
                priority
                className="h-8 w-auto max-w-full sm:h-9"
              />
            </Link>

            <nav
              aria-label="Navegação principal"
              className="hidden items-center gap-1 lg:flex"
            >
              {mainNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-nangell px-3 py-2 text-sm font-medium text-nangell-muted transition-colors hover:text-nangell-cyan"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/diagnostico"
                className={cn(
                  buttonVariants({ variant: "primary", size: "sm" }),
                  "hidden sm:inline-flex",
                )}
              >
                Solicitar diagnóstico
              </Link>

              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                aria-label="Abrir menu de navegação"
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="h-5 w-5" aria-hidden />
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <div id="mobile-menu-root">
        <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      </div>
    </>
  );
}
