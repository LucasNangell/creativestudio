"use client";

import { useCallback, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import type { ProcessoFaq } from "@/data/institutional/processo";
import { cn } from "@/lib/utils";

type FaqAccordionProps = {
  items: ProcessoFaq[];
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const baseId = useId();
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback((index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, index: number) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle(index);
      }
    },
    [toggle],
  );

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-faq-${index}`;
        const panelId = `${baseId}-faq-panel-${index}`;

        return (
          <div key={item.question} className="glass-card overflow-hidden">
            <button
              type="button"
              id={buttonId}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={cn(
                "flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left font-heading text-base font-semibold text-nangell-text sm:p-6 sm:text-lg",
                "focus-ring",
              )}
            >
              <span>{item.question}</span>
              <span
                aria-hidden
                className={cn(
                  "shrink-0 font-mono text-nangell-cyan transition-transform duration-200",
                  isOpen && "rotate-45",
                )}
              >
                +
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-glass-border px-5 pb-5 sm:px-6 sm:pb-6">
                    <p className="pt-4 text-sm leading-relaxed text-nangell-muted sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
