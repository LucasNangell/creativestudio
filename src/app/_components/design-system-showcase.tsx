"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Layers,
  Sparkles,
} from "lucide-react";

import { Container } from "@/components/layout/container";
import { CtaSection } from "@/components/layout/cta-section";
import { PageHero } from "@/components/layout/page-hero";
import { Section } from "@/components/layout/section";
import {
  DashboardNavItem,
  DashboardShell,
  DashboardStat,
} from "@/components/mockups/dashboard-shell";
import { BrowserWindow } from "@/components/mockups/browser-window";
import { TerminalWindow } from "@/components/mockups/terminal-window";
import { Reveal } from "@/components/motion/reveal";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/stagger-container";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import { Skeleton, SkeletonCard } from "@/components/ui/skeleton";
import { Tabs } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const designCards = [
  {
    title: "Header & Footer",
    description: "Navegação global com blur, menu mobile e rodapé estruturado.",
    badge: "Global",
  },
  {
    title: "UI Base",
    description: "Botões, inputs, cards, badges, tabs e estados vazios/erro.",
    badge: "UI",
  },
  {
    title: "Mockups",
    description: "Browser, terminal e shell de dashboard para demos e heros.",
    badge: "Mockup",
  },
  {
    title: "Motion",
    description: "Reveal e stagger com suporte a prefers-reduced-motion.",
    badge: "Motion",
  },
];

export function DesignSystemShowcase() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Section className="relative pt-8 sm:pt-12">
        <Container>
          <PageHero
            eyebrow="Fase 3 — Design System"
            title={
              <>
                Componentes globais para{" "}
                <span className="text-gradient-brand">software premium</span>
              </>
            }
            description="Página temporária para validar o design system definitivo — header, footer, UI base, mockups e padrões visuais dark tech."
          >
            <Button size="lg">Solicitar diagnóstico</Button>
            <Button variant="outline" size="lg" onClick={() => setModalOpen(true)}>
              Abrir modal de teste
            </Button>
          </PageHero>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container>
          <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {designCards.map((card) => (
              <StaggerItem key={card.title}>
                <Card variant="elevated" padding="md" className="h-full">
                  <CardHeader>
                    <Badge variant="outline">{card.badge}</Badge>
                    <CardTitle className="mt-3">{card.title}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="border-0 pt-0">
                    <CheckCircle2
                      className="h-4 w-4 text-nangell-cyan"
                      aria-hidden
                    />
                    <span className="text-xs text-nangell-muted">Validado</span>
                  </CardFooter>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <h2 className="font-heading text-2xl font-bold text-nangell-text">
              UI Base
            </h2>
            <p className="mt-2 text-sm text-nangell-muted">
              Formulários, badges e variantes de botão com foco acessível.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <Reveal delay={0.05}>
              <Card padding="lg">
                <CardTitle>Formulário</CardTitle>
                <CardContent className="mt-4 space-y-4">
                  <Input label="Nome" placeholder="Seu nome" />
                  <Select
                    label="Tipo de projeto"
                    placeholder="Selecione..."
                    options={[
                      { label: "Sistema web / SaaS", value: "web" },
                      { label: "App mobile", value: "mobile" },
                      { label: "Automação", value: "automation" },
                    ]}
                  />
                  <Textarea
                    label="Desafio principal"
                    placeholder="Descreva o que precisa resolver..."
                  />
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={0.1}>
              <Card padding="lg">
                <CardTitle>Botões & Badges</CardTitle>
                <CardContent className="mt-4 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Button>Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="outline">Outline</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Default</Badge>
                    <Badge variant="outline">Stack</Badge>
                    <Badge variant="success">Ativo</Badge>
                    <Badge variant="warning">Beta</Badge>
                  </div>
                  <Tabs
                    items={[
                      {
                        id: "web",
                        label: "Web",
                        content: (
                          <p className="text-sm text-nangell-muted">
                            Sistemas web, SaaS e plataformas sob medida.
                          </p>
                        ),
                      },
                      {
                        id: "mobile",
                        label: "Mobile",
                        content: (
                          <p className="text-sm text-nangell-muted">
                            Apps nativos, PWAs e experiências mobile.
                          </p>
                        ),
                      },
                      {
                        id: "bi",
                        label: "BI",
                        content: (
                          <p className="text-sm text-nangell-muted">
                            Dashboards e indicadores gerenciais inteligentes.
                          </p>
                        ),
                      },
                    ]}
                  />
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="bg-grid-subtle">
        <Container>
          <Reveal>
            <h2 className="font-heading text-2xl font-bold text-nangell-text">
              Mockups interativos
            </h2>
            <p className="mt-2 text-sm text-nangell-muted">
              Componentes visuais para heros, portfólio e demos.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Reveal delay={0.05}>
              <BrowserWindow url="nangell.com.br/demo/crm">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-nangell-cyan" aria-hidden />
                  <div>
                    <p className="font-heading text-sm font-semibold">
                      CRM Inteligente
                    </p>
                    <p className="text-xs text-nangell-muted">
                      Funil Kanban com simulação de WhatsApp
                    </p>
                  </div>
                </div>
              </BrowserWindow>
            </Reveal>

            <Reveal delay={0.1}>
              <TerminalWindow
                lines={[
                  "$ nangell deploy --env production",
                  "→ Building optimized bundle...",
                  "→ Running type checks...",
                  "✓ Deploy concluído em 42s",
                  "→ https://app.cliente.com.br",
                ]}
              />
            </Reveal>

            <Reveal delay={0.15} className="lg:col-span-2">
              <DashboardShell
                title="Painel BI"
                sidebar={
                  <div className="space-y-1">
                    <DashboardNavItem label="Visão geral" active />
                    <DashboardNavItem label="Vendas" />
                    <DashboardNavItem label="Financeiro" />
                    <DashboardNavItem label="Alertas" />
                  </div>
                }
                header={
                  <div className="flex items-center justify-between">
                    <p className="font-heading text-sm font-semibold">
                      Indicadores em tempo real
                    </p>
                    <Badge variant="success">Live</Badge>
                  </div>
                }
              >
                <div className="grid gap-3 sm:grid-cols-3">
                  <DashboardStat label="Receita" value="R$ 284k" trend="+12.4%" />
                  <DashboardStat label="Leads" value="1.847" trend="+8.1%" />
                  <DashboardStat label="Conversão" value="23.6%" trend="+2.3%" />
                </div>
              </DashboardShell>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <h2 className="font-heading text-2xl font-bold text-nangell-text">
              Estados de interface
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            <SkeletonCard />
            <EmptyState
              title="Nenhum case encontrado"
              description="Ajuste os filtros ou explore todo o portfólio."
              action={
                <Button variant="outline" size="sm">
                  Ver portfólio
                </Button>
              }
            />
            <ErrorState
              action={
                <Button variant="secondary" size="sm">
                  Tentar novamente
                </Button>
              }
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-48" variant="text" />
            <Skeleton className="h-10 w-10" variant="circular" />
          </div>
        </Container>
      </Section>

      <CtaSection
        variant="gradient"
        title="Pronto para validar a Home premium?"
        description="Esta página será substituída na Fase 4. O design system já está integrado ao layout global."
      >
        <Button size="lg">
          Solicitar diagnóstico
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Button>
        <Link
          href="/portfolio"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          <Layers className="h-4 w-4" aria-hidden />
          Ver portfólio
        </Link>
      </CtaSection>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Modal acessível"
        description="Dialog nativo com backdrop blur, escape para fechar e foco gerenciado."
      >
        <p className="text-sm text-nangell-muted">
          Componente pronto para formulários, confirmações e previews de demos.
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setModalOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={() => setModalOpen(false)}>Confirmar</Button>
        </div>
      </Modal>
    </>
  );
}
