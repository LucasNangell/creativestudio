"use client";

import { useMemo, useState } from "react";
import { Calendar, FileText, LayoutDashboard, LogIn } from "lucide-react";

import { DemoShell, trackDemoInteraction } from "@/components/demos/demo-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DEMO_ID = "site-psicologia-profissional";

const POSTS = [
  {
    title: "Quando procurar uma psicóloga?",
    category: "Saúde Mental",
    excerpt: "Reconhecer o momento de buscar apoio psicológico nem sempre é simples.",
  },
  {
    title: "TCC e ansiedade: como funciona",
    category: "TCC",
    excerpt: "Abordagem prática para compreender e manejar a ansiedade no dia a dia.",
  },
  {
    title: "Terapia Cognitivo-Sexual",
    category: "Sexualidade",
    excerpt: "Espaço seguro e sigiloso para falar sobre sexualidade com profissionalismo.",
  },
];

const APPOINTMENTS = [
  { name: "João Demo Silva", status: "novo", date: "23/06/2026 09:30" },
  { name: "Maria Exemplo Santos", status: "em_analise", date: "25/06/2026 14:00" },
  { name: "Ana Demonstração", status: "confirmado", date: "27/06/2026 10:00" },
];

const STATUS_LABELS: Record<string, string> = {
  novo: "Novo",
  em_analise: "Em análise",
  confirmado: "Confirmado",
  cancelado: "Cancelado",
};

export function PsicologiaDemo() {
  const [tab, setTab] = useState<"home" | "agenda" | "blog" | "admin">("home");
  const [formSent, setFormSent] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [appointments, setAppointments] = useState(APPOINTMENTS);

  const stats = useMemo(
    () => ({
      novos: appointments.filter((a) => a.status === "novo").length,
      confirmados: appointments.filter((a) => a.status === "confirmado").length,
    }),
    [appointments],
  );

  return (
    <DemoShell
      demoId={DEMO_ID}
      title="Site Profissional para Psicóloga"
      subtitle="Site institucional, agendamento, blog e painel admin — simulação com dados fictícios."
      ctaLabel="Quero um site parecido"
    >
      <div className="border-b border-glass-border bg-nangell-surface/50 px-4 py-2">
        <nav className="flex flex-wrap gap-2" aria-label="Navegação da demo">
          {(
            [
              { id: "home", label: "Início", icon: LayoutDashboard },
              { id: "agenda", label: "Agendamento", icon: Calendar },
              { id: "blog", label: "Blog", icon: FileText },
              { id: "admin", label: "Admin", icon: LogIn },
            ] as const
          ).map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              size="sm"
              variant={tab === id ? "primary" : "ghost"}
              onClick={() => {
                setTab(id);
                trackDemoInteraction(DEMO_ID, "tab_change", { tab: id });
              }}
            >
              <Icon className="h-4 w-4" aria-hidden />
              {label}
            </Button>
          ))}
        </nav>
      </div>

      <div className="p-4 sm:p-6">
        {tab === "home" ? (
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-2xl font-bold text-nangell-text">
              Cuidado emocional com acolhimento profissional
            </h2>
            <p className="mt-3 text-nangell-muted">
              Site demonstrativo para psicólogas — atendimento presencial e online, blog educativo e
              agendamento integrado. Todos os dados são fictícios.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["Ansiedade", "Autoestima", "Sexualidade"].map((spec) => (
                <div key={spec} className="glass-card p-4 text-sm text-nangell-muted">
                  {spec}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {tab === "agenda" ? (
          <div className="mx-auto max-w-md space-y-4">
            {formSent ? (
              <p className="rounded-nangell border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-400" role="status">
                Solicitação enviada com sucesso! (simulação)
              </p>
            ) : (
              <>
                <Input label="Nome" placeholder="Seu nome fictício" id="demo-name" />
                <Input label="E-mail" type="email" placeholder="email@exemplo.com" id="demo-email" />
                <Input label="Data preferida" type="date" id="demo-date" />
                <Input label="Horário" placeholder="Ex.: 09:30" id="demo-time" />
                <Button
                  onClick={() => {
                    setFormSent(true);
                    trackDemoInteraction(DEMO_ID, "appointment_submit");
                  }}
                >
                  Enviar solicitação
                </Button>
              </>
            )}
          </div>
        ) : null}

        {tab === "blog" ? (
          <ul className="mx-auto grid max-w-2xl gap-4">
            {POSTS.map((post) => (
              <li key={post.title} className="glass-card p-5">
                <Badge variant="outline">{post.category}</Badge>
                <h3 className="mt-2 font-heading text-lg font-semibold text-nangell-text">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-nangell-muted">{post.excerpt}</p>
              </li>
            ))}
          </ul>
        ) : null}

        {tab === "admin" ? (
          <div className="mx-auto max-w-2xl">
            {!loggedIn ? (
              <div className="glass-card mx-auto max-w-sm space-y-4 p-6">
                <p className="text-sm text-nangell-muted">
                  Credenciais demo: <strong className="text-nangell-text">demo</strong> /{" "}
                  <strong className="text-nangell-text">demo2026</strong>
                </p>
                <Input label="Usuário" defaultValue="demo" id="admin-user" />
                <Input label="Senha" type="password" defaultValue="demo2026" id="admin-pass" />
                <Button
                  className="w-full"
                  onClick={() => {
                    setLoggedIn(true);
                    trackDemoInteraction(DEMO_ID, "admin_login");
                  }}
                >
                  Entrar
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="glass-card p-4">
                    <p className="text-xs text-nangell-muted">Novos</p>
                    <p className="font-heading text-2xl font-bold text-nangell-cyan">{stats.novos}</p>
                  </div>
                  <div className="glass-card p-4">
                    <p className="text-xs text-nangell-muted">Confirmados</p>
                    <p className="font-heading text-2xl font-bold text-nangell-text">
                      {stats.confirmados}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {appointments.map((apt) => (
                    <li
                      key={apt.name}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-nangell border border-glass-border px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-medium text-nangell-text">{apt.name}</p>
                        <p className="text-xs text-nangell-muted">{apt.date}</p>
                      </div>
                      <select
                        value={apt.status}
                        onChange={(e) => {
                          const status = e.target.value;
                          setAppointments((prev) =>
                            prev.map((a) => (a.name === apt.name ? { ...a, status } : a)),
                          );
                          trackDemoInteraction(DEMO_ID, "status_change", { status });
                        }}
                        className="rounded-nangell border border-glass-border bg-nangell-surface px-2 py-1 text-xs text-nangell-text"
                        aria-label={`Status de ${apt.name}`}
                      >
                        {Object.entries(STATUS_LABELS).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </DemoShell>
  );
}
