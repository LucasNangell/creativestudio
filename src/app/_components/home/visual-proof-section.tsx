import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import {
  DashboardNavItem,
  DashboardShell,
  DashboardStat,
} from "@/components/mockups/dashboard-shell";
import { BrowserWindow } from "@/components/mockups/browser-window";
import { TerminalWindow } from "@/components/mockups/terminal-window";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";

import { SectionHeading } from "./section-heading";

export function VisualProofSection() {
  return (
    <Section id="prova-visual">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Prova visual"
            title="Interfaces que transmitem autoridade técnica"
            description="Mockups simulados de navegador, dashboard e terminal — o mesmo padrão visual aplicado em cada entrega."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal direction="up">
            <BrowserWindow url="nangell.com.br/demo/crm-inteligente">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="font-heading text-sm font-semibold text-nangell-text">
                    Funil comercial
                  </p>
                  <Badge variant="success">8 leads ativos</Badge>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {["Prospecção", "Qualificação", "Proposta", "Fechado"].map(
                    (col, i) => (
                      <div
                        key={col}
                        className="rounded-nangell border border-glass-border bg-nangell-surface/60 p-2"
                      >
                        <p className="font-mono text-[9px] text-nangell-muted uppercase">
                          {col}
                        </p>
                        <div className="mt-2 space-y-1">
                          {Array.from({ length: 3 - i }).map((_, j) => (
                            <div
                              key={j}
                              className="h-6 rounded border border-glass-border bg-nangell-dark/60"
                            />
                          ))}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </BrowserWindow>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <DashboardShell
              title="Analytics"
              sidebar={
                <div className="space-y-1">
                  <DashboardNavItem label="Overview" active />
                  <DashboardNavItem label="Vendas" />
                  <DashboardNavItem label="Financeiro" />
                </div>
              }
              header={
                <p className="font-heading text-sm font-semibold text-nangell-text">
                  KPIs executivos
                </p>
              }
            >
              <div className="grid grid-cols-2 gap-2">
                <DashboardStat label="MRR" value="R$ 42k" trend="+12%" />
                <DashboardStat label="Churn" value="2,1%" trend="-0,4%" />
              </div>
              <div className="mt-3 flex h-24 items-end gap-1">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-nangell-gradient opacity-80"
                    style={{ height: `${h}%` }}
                    aria-hidden
                  />
                ))}
              </div>
            </DashboardShell>
          </Reveal>

          <Reveal direction="up" delay={0.15} className="lg:col-span-2">
            <TerminalWindow
              title="deploy — nangell-cli"
              lines={[
                "$ nangell deploy --env production",
                "→ Building Next.js application...",
                "→ Running type checks and lint...",
                "✓ Compiled successfully in 4.2s",
                "→ Deploying to edge network...",
                "✓ Deploy complete — https://app.nangell.com.br",
                "→ Health check: all systems operational",
              ]}
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
