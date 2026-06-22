"use client";

import { homeTechnologies } from "@/data/home";

export function TechMarquee() {
  const items = [...homeTechnologies, ...homeTechnologies];

  return (
    <section
      aria-label="Tecnologias utilizadas"
      className="relative border-y border-glass-border bg-nangell-surface/40 py-4"
    >
      <p className="sr-only">{homeTechnologies.join(", ")}</p>
      <div className="overflow-hidden" aria-hidden="true">
        <div className="flex w-max animate-marquee motion-reduce:animate-none">
          {items.map((tech, index) => (
            <span
              key={`${tech}-${index}`}
              className="mx-6 shrink-0 font-mono text-sm text-nangell-muted sm:text-base"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
