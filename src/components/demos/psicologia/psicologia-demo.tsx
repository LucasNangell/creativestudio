"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  FileText,
  Heart,
  Home,
  LayoutDashboard,
  LogIn,
  Menu,
  Search,
  Shield,
  X,
} from "lucide-react";

import { DemoShell, trackDemoInteraction } from "@/components/demos/demo-shell";
import {
  PSICOLOGIA_APPOINTMENTS,
  PSICOLOGIA_FAQ,
  PSICOLOGIA_POSTS,
  STATUS_LABELS,
  TIME_SLOTS,
  type PsicologiaAppointment,
} from "@/data/demos/psicologia/mock-data";
import { cn } from "@/lib/utils";

const DEMO_ID = "site-psicologia-profissional";

type Tab = "home" | "agenda" | "blog" | "admin";

const SPECIALTIES = [
  { title: "Ansiedade", desc: "Estratégias práticas para o dia a dia" },
  { title: "Autoestima", desc: "Autoconhecimento e vínculos saudáveis" },
  { title: "Sexualidade", desc: "Escuta sigilosa e sem julgamentos" },
  { title: "TCC", desc: "Abordagem estruturada e baseada em evidências" },
];

function buildCalendarDays() {
  const days: { label: string; date: string; disabled?: boolean }[] = [];
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  for (let i = 0; i < 42; i += 1) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const iso = d.toISOString().slice(0, 10);
    const isSunday = d.getDay() === 0;
    days.push({
      label: String(d.getDate()),
      date: iso,
      disabled: isSunday,
    });
  }
  return days;
}

export function PsicologiaDemo() {
  const [tab, setTab] = useState<Tab>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [blogQuery, setBlogQuery] = useState("");
  const [blogCategory, setBlogCategory] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [appointments, setAppointments] = useState<PsicologiaAppointment[]>(() =>
    PSICOLOGIA_APPOINTMENTS.map((a) => ({ ...a })),
  );

  const calendarDays = useMemo(() => buildCalendarDays(), []);

  const filteredPosts = useMemo(() => {
    return PSICOLOGIA_POSTS.filter((post) => {
      const matchCat = blogCategory === "all" || post.category === blogCategory;
      const q = blogQuery.trim().toLowerCase();
      const matchQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [blogCategory, blogQuery]);

  const stats = useMemo(
    () => ({
      novos: appointments.filter((a) => a.status === "novo").length,
      confirmados: appointments.filter((a) => a.status === "confirmado").length,
      posts: PSICOLOGIA_POSTS.length,
    }),
    [appointments],
  );

  const navItems: { id: Tab; label: string; icon: typeof Home }[] = [
    { id: "home", label: "Início", icon: Home },
    { id: "agenda", label: "Agendamento", icon: CalendarDays },
    { id: "blog", label: "Blog", icon: FileText },
    { id: "admin", label: "Admin", icon: LogIn },
  ];

  const goTo = (next: Tab) => {
    setTab(next);
    setMenuOpen(false);
    trackDemoInteraction(DEMO_ID, "tab_change", { tab: next });
  };

  return (
    <DemoShell
      demoId={DEMO_ID}
      title="Site Profissional para Psicóloga"
      subtitle="Site institucional, agendamento online, blog e painel admin — demonstração com dados fictícios."
      ctaLabel="Quero um site parecido"
      fullBleed
      className="!border-0 !bg-transparent !shadow-none"
    >
      <div className="min-h-[760px] overflow-hidden rounded-b-nangell-xl bg-[#FAF8F5] font-sans text-[#3D4F5F]">
        <header className="border-b border-[#E2DDD6] bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
            <div>
              <p className="text-lg font-semibold text-[#5B6FD8]">Dra. Maria Exemplo</p>
              <p className="text-xs text-[#7A8B99]">Psicóloga · CRP 00/00000 · Cidade Exemplo</p>
            </div>
            <nav className="hidden items-center gap-1 md:flex" aria-label="Menu principal">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => goTo(id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm transition-colors",
                    tab === id
                      ? "bg-[#5B6FD8] text-white"
                      : "text-[#5A6B7A] hover:bg-[#EEF1FB] hover:text-[#5B6FD8]",
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {label}
                </button>
              ))}
            </nav>
            <button
              type="button"
              className="rounded-lg p-2 text-[#5A6B7A] md:hidden"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
          {menuOpen ? (
            <nav className="border-t border-[#E2DDD6] px-4 py-3 md:hidden" aria-label="Menu mobile">
              <div className="flex flex-col gap-1">
                {navItems.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => goTo(id)}
                    className={cn(
                      "rounded-lg px-3 py-2 text-left text-sm",
                      tab === id ? "bg-[#EEF1FB] font-medium text-[#5B6FD8]" : "text-[#5A6B7A]",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </nav>
          ) : null}
        </header>

        {tab === "home" ? (
          <>
            <section className="bg-gradient-to-br from-[#EEF1FB] via-[#FAF8F5] to-[#E8F4F8] px-4 py-12 sm:px-6 sm:py-16">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-sm font-medium uppercase tracking-wider text-[#7C9885]">
                  Saúde mental com acolhimento
                </p>
                <h1 className="mt-3 text-3xl font-semibold leading-tight text-[#2D3748] sm:text-4xl">
                  Cuidado emocional profissional, no seu ritmo
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#5A6B7A]">
                  Atendimento presencial e online com Terapia Cognitivo-Comportamental. Espaço
                  seguro para ansiedade, autoestima, sexualidade e autoconhecimento — demo com
                  dados fictícios.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => goTo("agenda")}
                    className="rounded-full bg-[#5B6FD8] px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-[#4A5CC4]"
                  >
                    Agendar consulta
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo("blog")}
                    className="rounded-full border border-[#C5CBD8] bg-white px-6 py-3 text-sm font-medium text-[#3D4F5F] hover:border-[#5B6FD8] hover:text-[#5B6FD8]"
                  >
                    Ler artigos
                  </button>
                </div>
              </div>
            </section>

            <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
              <h2 className="text-center text-xl font-semibold text-[#2D3748]">Especialidades</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {SPECIALTIES.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-[#E2DDD6] bg-white p-5 shadow-sm"
                  >
                    <Heart className="h-5 w-5 text-[#7C9885]" aria-hidden />
                    <h3 className="mt-3 font-semibold text-[#2D3748]">{item.title}</h3>
                    <p className="mt-1 text-sm text-[#5A6B7A]">{item.desc}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="border-y border-[#E2DDD6] bg-white px-4 py-10 sm:px-6">
              <div className="mx-auto flex max-w-5xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-[#2D3748]">Blog educativo</h2>
                  <p className="mt-2 max-w-lg text-sm text-[#5A6B7A]">
                    Conteúdos sobre saúde mental, TCC e bem-estar emocional com foco em SEO e
                    linguagem acessível.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => goTo("blog")}
                  className="shrink-0 rounded-full border border-[#5B6FD8] px-5 py-2.5 text-sm font-medium text-[#5B6FD8] hover:bg-[#EEF1FB]"
                >
                  Ver todos os artigos
                </button>
              </div>
              <div className="mx-auto mt-6 grid max-w-5xl gap-4 md:grid-cols-3">
                {PSICOLOGIA_POSTS.slice(0, 3).map((post) => (
                  <article
                    key={post.id}
                    className="rounded-2xl border border-[#E2DDD6] bg-[#FAF8F5] p-5"
                  >
                    <span className="rounded-full bg-[#EEF1FB] px-2.5 py-1 text-xs font-medium text-[#5B6FD8]">
                      {post.category}
                    </span>
                    <h3 className="mt-3 font-semibold text-[#2D3748]">{post.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-[#5A6B7A]">{post.excerpt}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
              <h2 className="text-center text-xl font-semibold text-[#2D3748]">Perguntas frequentes</h2>
              <ul className="mt-6 space-y-3">
                {PSICOLOGIA_FAQ.map((item, index) => (
                  <li key={item.q} className="overflow-hidden rounded-2xl border border-[#E2DDD6] bg-white">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                      aria-expanded={openFaq === index}
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                      <span className="font-medium text-[#2D3748]">{item.q}</span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 shrink-0 text-[#5B6FD8] transition-transform",
                          openFaq === index && "rotate-180",
                        )}
                        aria-hidden
                      />
                    </button>
                    {openFaq === index ? (
                      <p className="border-t border-[#E2DDD6] px-5 py-4 text-sm leading-relaxed text-[#5A6B7A]">
                        {item.a}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          </>
        ) : null}

        {tab === "agenda" ? (
          <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
            <h2 className="text-2xl font-semibold text-[#2D3748]">Agendamento online</h2>
            <p className="mt-2 text-sm text-[#5A6B7A]">
              Selecione data e horário disponíveis. Todos os campos usam dados fictícios.
            </p>

            {formSent ? (
              <div
                className="mt-8 rounded-2xl border border-[#7C9885]/30 bg-[#E8F4F0] p-6 text-center"
                role="status"
              >
                <p className="font-semibold text-[#2D3748]">Solicitação enviada com sucesso!</p>
                <p className="mt-2 text-sm text-[#5A6B7A]">
                  Em produção, a profissional receberia um e-mail e veria o pedido no painel admin.
                </p>
              </div>
            ) : (
              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-[#7A8B99]">
                    Calendário — próximas 6 semanas
                  </h3>
                  <div className="mt-3 grid grid-cols-7 gap-1.5">
                    {calendarDays.map((day) => (
                      <button
                        key={day.date}
                        type="button"
                        disabled={day.disabled}
                        onClick={() => {
                          setSelectedDate(day.date);
                          setSelectedTime(null);
                          trackDemoInteraction(DEMO_ID, "calendar_date", { date: day.date });
                        }}
                        className={cn(
                          "aspect-square rounded-lg text-sm transition-colors",
                          day.disabled && "cursor-not-allowed opacity-30",
                          selectedDate === day.date
                            ? "bg-[#5B6FD8] font-semibold text-white"
                            : "bg-white border border-[#E2DDD6] hover:border-[#5B6FD8]",
                        )}
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>
                  {selectedDate ? (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-[#2D3748]">Horários disponíveis</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {TIME_SLOTS.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => {
                              setSelectedTime(slot);
                              trackDemoInteraction(DEMO_ID, "time_select", { time: slot });
                            }}
                            className={cn(
                              "rounded-full px-3 py-1.5 text-sm",
                              selectedTime === slot
                                ? "bg-[#7C9885] text-white"
                                : "border border-[#C5CBD8] bg-white hover:border-[#7C9885]",
                            )}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>

                <form
                  className="space-y-4 rounded-2xl border border-[#E2DDD6] bg-white p-6 shadow-sm"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSent(true);
                    trackDemoInteraction(DEMO_ID, "appointment_submit");
                  }}
                >
                  <Field label="Nome completo" id="nome" placeholder="Seu nome fictício" required />
                  <Field label="E-mail" id="email" type="email" placeholder="email@exemplo.com" required />
                  <Field label="Telefone" id="telefone" placeholder="(00) 90000-0000" required />
                  <label className="block text-sm">
                    <span className="mb-1.5 block font-medium text-[#2D3748]">Tipo de atendimento</span>
                    <select className="h-11 w-full rounded-xl border border-[#C5CBD8] bg-white px-3 text-sm">
                      <option>Presencial</option>
                      <option>Online</option>
                    </select>
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1.5 block font-medium text-[#2D3748]">Especialidade</span>
                    <select className="h-11 w-full rounded-xl border border-[#C5CBD8] bg-white px-3 text-sm">
                      <option>Ansiedade</option>
                      <option>Autoestima</option>
                      <option>Sexualidade</option>
                      <option>TCC</option>
                    </select>
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1.5 block font-medium text-[#2D3748]">Mensagem (opcional)</span>
                    <textarea
                      rows={3}
                      className="w-full rounded-xl border border-[#C5CBD8] px-3 py-2 text-sm"
                      placeholder="Conte brevemente o que gostaria de trabalhar..."
                    />
                  </label>
                  <label className="flex items-start gap-2 text-xs text-[#5A6B7A]">
                    <input type="checkbox" required className="mt-0.5" defaultChecked />
                    <span>
                      Concordo com a política de privacidade (LGPD) e confirmo que não se trata de
                      emergência.
                    </span>
                  </label>
                  <button
                    type="submit"
                    disabled={!selectedDate || !selectedTime}
                    className="w-full rounded-full bg-[#5B6FD8] py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Enviar solicitação
                  </button>
                </form>
              </div>
            )}
          </div>
        ) : null}

        {tab === "blog" ? (
          <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
            <h2 className="text-2xl font-semibold text-[#2D3748]">Blog</h2>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7A8B99]" />
                <input
                  type="search"
                  value={blogQuery}
                  onChange={(e) => setBlogQuery(e.target.value)}
                  placeholder="Buscar artigos..."
                  className="h-11 w-full rounded-xl border border-[#C5CBD8] bg-white pl-10 pr-3 text-sm"
                />
              </div>
              <select
                value={blogCategory}
                onChange={(e) => setBlogCategory(e.target.value)}
                className="h-11 rounded-xl border border-[#C5CBD8] bg-white px-3 text-sm"
                aria-label="Filtrar por categoria"
              >
                <option value="all">Todas as categorias</option>
                {[...new Set(PSICOLOGIA_POSTS.map((p) => p.category))].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <ul className="mt-6 space-y-4">
              {filteredPosts.map((post) => (
                <li
                  key={post.id}
                  className="rounded-2xl border border-[#E2DDD6] bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#7A8B99]">
                    <span className="rounded-full bg-[#EEF1FB] px-2.5 py-1 font-medium text-[#5B6FD8]">
                      {post.category}
                    </span>
                    <span>{post.date}</span>
                    <span>· {post.readTime} min de leitura</span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-[#2D3748]">{post.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5A6B7A]">{post.excerpt}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {tab === "admin" ? (
          <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
            {!loggedIn ? (
              <div className="mx-auto max-w-md rounded-2xl border border-[#E2DDD6] bg-white p-8 shadow-sm">
                <div className="flex items-center gap-2 text-[#5B6FD8]">
                  <Shield className="h-5 w-5" aria-hidden />
                  <h2 className="text-lg font-semibold text-[#2D3748]">Painel administrativo</h2>
                </div>
                <p className="mt-3 rounded-xl bg-[#FFF8E6] px-4 py-3 text-sm text-[#7A6B4A]">
                  Credenciais demo: <strong>demo</strong> / <strong>demo2026</strong>
                </p>
                <div className="mt-6 space-y-4">
                  <Field label="Usuário" id="admin-user" defaultValue="demo" />
                  <Field label="Senha" id="admin-pass" type="password" defaultValue="demo2026" />
                  <button
                    type="button"
                    onClick={() => {
                      setLoggedIn(true);
                      trackDemoInteraction(DEMO_ID, "admin_login");
                    }}
                    className="w-full rounded-full bg-[#5B6FD8] py-3 text-sm font-medium text-white"
                  >
                    Entrar
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
                <aside className="rounded-2xl border border-[#E2DDD6] bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#7A8B99]">Menu</p>
                  <ul className="mt-3 space-y-1 text-sm">
                    <li className="flex items-center gap-2 rounded-lg bg-[#EEF1FB] px-3 py-2 font-medium text-[#5B6FD8]">
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </li>
                    <li className="px-3 py-2 text-[#5A6B7A]">Agendamentos</li>
                    <li className="px-3 py-2 text-[#5A6B7A]">Blog</li>
                  </ul>
                </aside>
                <div className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <StatCard label="Novos" value={stats.novos} />
                    <StatCard label="Confirmados" value={stats.confirmados} />
                    <StatCard label="Artigos" value={stats.posts} />
                  </div>
                  <div className="rounded-2xl border border-[#E2DDD6] bg-white p-5">
                    <h3 className="font-semibold text-[#2D3748]">Agendamentos recentes</h3>
                    <ul className="mt-4 space-y-3">
                      {appointments.map((apt) => (
                        <li
                          key={apt.id}
                          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#E2DDD6] px-4 py-3"
                        >
                          <div>
                            <p className="font-medium text-[#2D3748]">{apt.name}</p>
                            <p className="text-xs text-[#7A8B99]">
                              {apt.date} às {apt.time} · {apt.type}
                            </p>
                          </div>
                          <select
                            value={apt.status}
                            onChange={(e) => {
                              const status = e.target.value;
                              setAppointments((prev) =>
                                prev.map((a) => (a.id === apt.id ? { ...a, status } : a)),
                              );
                              trackDemoInteraction(DEMO_ID, "status_change", { status });
                            }}
                            className="rounded-lg border border-[#C5CBD8] bg-white px-2 py-1.5 text-xs"
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
                </div>
              </div>
            )}
          </div>
        ) : null}

        <footer className="mt-auto border-t border-[#E2DDD6] bg-white px-4 py-6 text-center text-xs text-[#7A8B99] sm:px-6">
          Demo fictícia · Dados de contato: contato@clinica-demo.com · (00) 90000-0000
        </footer>
      </div>
    </DemoShell>
  );
}

function Field({
  label,
  id,
  type = "text",
  placeholder,
  defaultValue,
  required,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={id} className="block text-sm">
      <span className="mb-1.5 block font-medium text-[#2D3748]">{label}</span>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
        className="h-11 w-full rounded-xl border border-[#C5CBD8] bg-white px-3 text-sm text-[#3D4F5F] placeholder:text-[#A0AEBB]"
      />
    </label>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-[#E2DDD6] bg-white p-4">
      <p className="text-xs uppercase tracking-wide text-[#7A8B99]">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-[#5B6FD8]">{value}</p>
    </div>
  );
}
