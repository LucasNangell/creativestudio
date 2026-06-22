import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { slugifyHeadingText } from "@/lib/markdown/toc";
import { cn } from "@/lib/utils";

type MarkdownContentProps = {
  content: string;
  className?: string;
};

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div
      className={cn(
        "prose-nangell space-y-4 text-base leading-relaxed text-nangell-text",
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h2 className="font-heading text-2xl font-bold text-nangell-text">{children}</h2>
          ),
          h2: ({ children }) => {
            const text = String(children);
            return (
              <h2
                id={slugifyHeadingText(text)}
                className="scroll-mt-28 font-heading text-xl font-semibold text-nangell-text"
              >
                {children}
              </h2>
            );
          },
          h3: ({ children }) => {
            const text = String(children);
            return (
              <h3
                id={slugifyHeadingText(text)}
                className="scroll-mt-28 font-heading text-lg font-semibold text-nangell-text"
              >
                {children}
              </h3>
            );
          },
          p: ({ children }) => (
            <p className="text-nangell-muted leading-relaxed">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc space-y-2 pl-5 text-nangell-muted">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal space-y-2 pl-5 text-nangell-muted">{children}</ol>
          ),
          li: ({ children }) => <li>{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-nangell-cyan underline-offset-2 hover:underline"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-nangell-cyan/40 pl-4 italic text-nangell-muted">
              {children}
            </blockquote>
          ),
          code: ({ className: codeClassName, children }) => {
            const isBlock = codeClassName?.includes("language-");
            if (isBlock) {
              return (
                <code className="block overflow-x-auto rounded-nangell bg-nangell-dark p-4 font-mono text-sm text-nangell-cyan">
                  {children}
                </code>
              );
            }
            return (
              <code className="rounded bg-nangell-dark px-1.5 py-0.5 font-mono text-sm text-nangell-cyan">
                {children}
              </code>
            );
          },
          pre: ({ children }) => <pre className="overflow-x-auto">{children}</pre>,
          strong: ({ children }) => (
            <strong className="font-semibold text-nangell-text">{children}</strong>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
