import Link from "next/link";
import { ArrowRight, FilePlus, FolderKanban, Users } from "lucide-react";

import { AdminStatCard } from "@/components/admin/admin-stat-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { getAdminDashboardStats } from "@/services/admin-dashboard-service";
import { cn } from "@/lib/utils";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

const statusLabels: Record<string, string> = {
  NOVO: "Novo",
  CONTATO: "Contato",
  REUNIAO: "Reunião",
  PROPOSTA: "Proposta",
  FECHADO: "Fechado",
  PERDIDO: "Perdido",
};

export async function AdminDashboardContent() {
  const stats = await getAdminDashboardStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-nangell-text sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-nangell-muted">
          Visão geral de leads, conteúdo e demos publicadas.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <AdminStatCard label="Total de leads" value={stats.totalLeads} />
        <AdminStatCard
          label="Leads novos"
          value={stats.newLeads}
          hint="Status NOVO"
        />
        <AdminStatCard label="Projetos publicados" value={stats.publishedProjects} />
        <AdminStatCard label="Posts publicados" value={stats.publishedPosts} />
        <AdminStatCard
          label="Cases com demonstração"
          value={stats.demoCases}
          hint="Portfólio interativo"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Link
          href="/admin/leads"
          className={cn(
            buttonVariants({ variant: "secondary", size: "lg" }),
            "h-auto flex-col items-start gap-2 p-5 text-left",
          )}
        >
          <Users className="h-5 w-5 text-nangell-cyan" aria-hidden />
          <span className="font-heading font-semibold">Gerenciar leads</span>
          <span className="text-xs font-normal text-nangell-muted">
            Acompanhe diagnósticos e contatos captados
          </span>
          <ArrowRight className="mt-1 h-4 w-4" aria-hidden />
        </Link>

        <Link
          href="/admin/projetos"
          className={cn(
            buttonVariants({ variant: "secondary", size: "lg" }),
            "h-auto flex-col items-start gap-2 p-5 text-left",
          )}
        >
          <FolderKanban className="h-5 w-5 text-nangell-cyan" aria-hidden />
          <span className="font-heading font-semibold">Gerenciar portfólio</span>
          <span className="text-xs font-normal text-nangell-muted">
            Cases, demos e métricas de projetos
          </span>
          <ArrowRight className="mt-1 h-4 w-4" aria-hidden />
        </Link>

        <Link
          href="/admin/blog"
          className={cn(
            buttonVariants({ variant: "secondary", size: "lg" }),
            "h-auto flex-col items-start gap-2 p-5 text-left",
          )}
        >
          <FilePlus className="h-5 w-5 text-nangell-cyan" aria-hidden />
          <span className="font-heading font-semibold">Criar artigo</span>
          <span className="text-xs font-normal text-nangell-muted">
            Publicações e conteúdo estratégico do blog
          </span>
          <ArrowRight className="mt-1 h-4 w-4" aria-hidden />
        </Link>
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="font-heading text-lg font-semibold text-nangell-text">
            Últimos leads
          </h2>
          <Link href="/admin/leads" className="text-sm text-nangell-cyan hover:underline">
            Ver todos
          </Link>
        </div>

        <div className="overflow-x-auto rounded-nangell-xl border border-glass-border">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-glass-border bg-nangell-surface/80">
              <tr>
                <th className="px-4 py-3 font-medium text-nangell-muted">Nome</th>
                <th className="px-4 py-3 font-medium text-nangell-muted">Empresa</th>
                <th className="px-4 py-3 font-medium text-nangell-muted">Projeto</th>
                <th className="px-4 py-3 font-medium text-nangell-muted">Status</th>
                <th className="px-4 py-3 font-medium text-nangell-muted">Data</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-nangell-muted">
                    Nenhum lead captado ainda.
                  </td>
                </tr>
              ) : (
                stats.recentLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-glass-border/50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-nangell-text">{lead.name}</p>
                      <p className="text-xs text-nangell-muted">{lead.email}</p>
                    </td>
                    <td className="px-4 py-3 text-nangell-muted">{lead.company}</td>
                    <td className="px-4 py-3 text-nangell-muted">{lead.projectType}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline">
                        {statusLabels[lead.status] ?? lead.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-nangell-muted">
                      {formatDate(lead.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
