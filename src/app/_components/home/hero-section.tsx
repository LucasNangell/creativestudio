"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import {
  DashboardNavItem,
  DashboardShell,
  DashboardStat,
} from "@/components/mockups/dashboard-shell";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { homeHero } from "@/data/home";
import { buildWhatsAppUrl } from "@/data/navigation";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <Section className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-subtle opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-nangell-violet/20 blur-[120px] animate-pulse-glow motion-reduce:animate-none"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-32 h-64 w-64 rounded-full bg-nangell-cyan/10 blur-[80px]"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <BrandLogo
                variant="horizontal"
                theme="dark"
                priority
                className="mb-6 h-10 w-auto max-w-[min(100%,240px)] sm:h-11"
              />
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="font-heading text-3xl font-bold leading-tight tracking-tight text-nangell-text sm:text-4xl lg:text-5xl">
                Sistemas sob medida que{" "}
                <span className="text-gradient-brand">
                  transformam operação em crescimento.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-nangell-muted sm:text-lg">
                {homeHero.subheadline}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={homeHero.primaryCta.href}
                  className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
                  onClick={() =>
                    trackEvent("click_cta_hero", {
                      location: "home_hero",
                      label: homeHero.primaryCta.label,
                      action: "primary",
                    })
                  }
                >
                  {homeHero.primaryCta.label}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href={homeHero.secondaryCta.href}
                  className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
                  onClick={() =>
                    trackEvent("click_cta_hero", {
                      location: "home_hero",
                      label: homeHero.secondaryCta.label,
                      action: "secondary",
                    })
                  }
                >
                  {homeHero.secondaryCta.label}
                </Link>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "secondary", size: "lg" }),
                    "gap-2",
                  )}
                  onClick={() =>
                    trackEvent("click_whatsapp", {
                      location: "home_hero",
                      label: homeHero.whatsappCta.label,
                    })
                  }
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  {homeHero.whatsappCta.label}
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.1}>
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-4 rounded-nangell-xl bg-nangell-gradient opacity-10 blur-2xl"
              />
              <DashboardShell
                title="Nangell OS"
                className="relative shadow-glow-violet"
                sidebar={
                  <div className="space-y-1">
                    <DashboardNavItem label="Dashboard" active />
                    <DashboardNavItem label="Clientes" />
                    <DashboardNavItem label="Projetos" />
                    <DashboardNavItem label="Relatórios" />
                    <DashboardNavItem label="Configurações" />
                  </div>
                }
                header={
                  <div className="flex items-center justify-between">
                    <p className="font-heading text-sm font-semibold text-nangell-text">
                      Visão geral
                    </p>
                    <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
                      ● Online
                    </span>
                  </div>
                }
              >
                <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-3">
                  <DashboardStat
                    label="Receita mensal"
                    value="R$ 284k"
                    trend="+18,4%"
                  />
                  <DashboardStat
                    label="Projetos ativos"
                    value="12"
                    trend="+3 novos"
                  />
                  <DashboardStat
                    label="Conversão"
                    value="38,2%"
                    trend="+5,1%"
                  />
                </div>
                <div className="mt-4 space-y-2">
                  {[1, 2, 3].map((row) => (
                    <div
                      key={row}
                      className="flex items-center gap-3 rounded-nangell border border-glass-border bg-nangell-dark/40 px-3 py-2"
                    >
                      <div className="h-2 w-2 rounded-full bg-nangell-cyan" />
                      <div className="h-2 flex-1 rounded bg-white/5">
                        <div
                          className="h-full rounded bg-nangell-gradient"
                          style={{ width: `${70 - row * 12}%` }}
                        />
                      </div>
                      <span className="font-mono text-[10px] text-nangell-muted">
                        {row === 1 ? "CRM" : row === 2 ? "BI" : "OS"}
                      </span>
                    </div>
                  ))}
                </div>
              </DashboardShell>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
