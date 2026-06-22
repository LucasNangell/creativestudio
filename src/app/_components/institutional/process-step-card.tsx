import Link from "next/link";
import { ArrowRight, BookOpen, FolderKanban } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { ProcessoEtapa } from "@/data/institutional/processo";

type ProcessStepCardProps = {
  etapa: ProcessoEtapa;
};

export function ProcessStepCard({ etapa }: ProcessStepCardProps) {
  return (
    <article
      id={`etapa-${etapa.step}`}
      className="glass-card scroll-mt-24 p-6 sm:p-8"
    >
      <div className="flex items-start gap-4">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-nangell bg-nangell-gradient font-mono text-lg font-bold text-nangell-dark"
          aria-hidden
        >
          {String(etapa.step).padStart(2, "0")}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-heading text-xl font-bold text-nangell-text sm:text-2xl">
              {etapa.title}
            </h2>
            <Badge variant="outline">{etapa.duration}</Badge>
          </div>
          <p className="mt-3 text-base leading-relaxed text-nangell-muted">
            {etapa.description}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div>
          <h3 className="font-mono text-xs tracking-widest text-nangell-cyan uppercase">
            Entregáveis
          </h3>
          <ul className="mt-3 space-y-2">
            {etapa.deliverables.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm leading-relaxed text-nangell-muted"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-nangell-cyan" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs tracking-widest text-nangell-cyan uppercase">
            O que você recebe
          </h3>
          <ul className="mt-3 space-y-2">
            {etapa.clientReceives.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm leading-relaxed text-nangell-muted"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-nangell-blue" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs tracking-widest text-nangell-cyan uppercase">
            Critérios de sucesso
          </h3>
          <ul className="mt-3 space-y-2">
            {etapa.successCriteria.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-sm leading-relaxed text-nangell-muted"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-nangell-violet" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {etapa.caseSlug || etapa.blogSlug ? (
        <div className="mt-6 flex flex-wrap gap-3 border-t border-glass-border pt-5">
          {etapa.caseSlug ? (
            <Link
              href={`/portfolio/${etapa.caseSlug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-nangell-cyan hover:text-nangell-blue"
            >
              <FolderKanban className="h-4 w-4" aria-hidden />
              Ver case relacionado
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          ) : null}
          {etapa.blogSlug ? (
            <Link
              href={`/blog/${etapa.blogSlug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-nangell-cyan hover:text-nangell-blue"
            >
              <BookOpen className="h-4 w-4" aria-hidden />
              Ler artigo relacionado
              <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </Link>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
