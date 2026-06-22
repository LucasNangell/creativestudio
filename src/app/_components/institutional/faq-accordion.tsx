import type { ProcessoFaq } from "@/data/institutional/processo";

type FaqAccordionProps = {
  items: ProcessoFaq[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <details
          key={item.question}
          className="group glass-card overflow-hidden"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-heading text-base font-semibold text-nangell-text marker:content-none sm:p-6 sm:text-lg [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <span
              aria-hidden
              className="shrink-0 font-mono text-nangell-cyan transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div
            id={`faq-answer-${index}`}
            className="border-t border-glass-border px-5 pb-5 sm:px-6 sm:pb-6"
          >
            <p className="pt-4 text-sm leading-relaxed text-nangell-muted sm:text-base">
              {item.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
