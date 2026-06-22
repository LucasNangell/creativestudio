import { INTERACTIVE_DEMO_LABEL } from "@/data/demos/labels";
import type { DemoPageContent } from "@/lib/demos/get-demo-content";

type DemoSystemOverviewProps = {
  content: DemoPageContent;
};

export function DemoSystemOverview({ content }: DemoSystemOverviewProps) {
  return (
    <section
      aria-labelledby="demo-system-overview-title"
      className="mt-6 rounded-nangell-xl border border-glass-border bg-nangell-surface/70 p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-nangell-cyan">
            Sobre o sistema
          </p>
          <h2
            id="demo-system-overview-title"
            className="mt-1 font-display text-xl font-semibold text-nangell-text sm:text-2xl"
          >
            {content.title}
          </h2>
          <p className="mt-1 text-sm text-nangell-muted">{content.category}</p>
        </div>
        <Badge variant="outline" className="shrink-0">
          {INTERACTIVE_DEMO_LABEL}
        </Badge>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-nangell-text/90 sm:text-base">
        {content.fullDescription}
      </p>

      {content.demoHint ? (
        <p className="mt-4 rounded-nangell border border-nangell-electric/20 bg-nangell-electric/5 px-4 py-3 text-sm text-nangell-text/90">
          <span className="font-medium text-nangell-cyan">Como testar: </span>
          {content.demoHint}
        </p>
      ) : null}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold text-nangell-text">Para que serve</h3>
          <p className="mt-2 text-sm leading-relaxed text-nangell-muted">
            {content.shortDescription}
          </p>
          <h3 className="mt-5 text-sm font-semibold text-nangell-text">Problema que resolve</h3>
          <p className="mt-2 text-sm leading-relaxed text-nangell-muted">{content.problem}</p>
          <h3 className="mt-5 text-sm font-semibold text-nangell-text">Solução entregue</h3>
          <p className="mt-2 text-sm leading-relaxed text-nangell-muted">{content.solution}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-nangell-text">Funcionalidades principais</h3>
          <ul className="mt-3 space-y-2">
            {content.features.map((feature) => (
              <li
                key={feature}
                className="flex gap-2 text-sm text-nangell-text/90 before:mt-2 before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-nangell-cyan before:content-['']"
              >
                {feature}
              </li>
            ))}
          </ul>

          <h3 className="mt-5 text-sm font-semibold text-nangell-text">Stack utilizada</h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {content.stack.map((tech) => (
              <Badge key={tech} variant="muted">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
