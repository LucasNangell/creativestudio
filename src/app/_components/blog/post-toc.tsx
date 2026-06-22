import type { MarkdownHeading } from "@/lib/markdown/toc";
import { cn } from "@/lib/utils";

type PostTocProps = {
  headings: MarkdownHeading[];
  className?: string;
};

export function PostToc({ headings, className }: PostTocProps) {
  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Índice do artigo"
      className={cn(
        "rounded-nangell border border-glass-border bg-nangell-surface/50 p-4",
        className,
      )}
    >
      <p className="mb-3 text-sm font-medium text-nangell-text">Neste artigo</p>
      <ul className="space-y-2 text-sm">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "pl-3" : undefined}>
            <a
              href={`#${heading.id}`}
              className="text-nangell-muted transition-colors hover:text-nangell-cyan"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
