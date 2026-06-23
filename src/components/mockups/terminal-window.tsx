import { cn } from "@/lib/utils";

type TerminalWindowProps = {
  title?: string;
  lines: string[];
  className?: string;
  prompt?: string;
};

export function TerminalWindow({
  title = "terminal, nangell",
  lines,
  className,
  prompt = "$",
}: TerminalWindowProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-nangell-xl border border-glass-border bg-[#0a0e14] shadow-glass",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-glass-border px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        </div>
        <span className="font-mono text-xs text-nangell-muted">{title}</span>
        <span className="w-10" aria-hidden />
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed sm:text-sm">
        <code>
          {lines.map((line, index) => (
            <span key={index} className="block">
              {line.startsWith(prompt) ? (
                <>
                  <span className="text-nangell-cyan">{prompt}</span>
                  <span className="text-nangell-text">
                    {line.slice(prompt.length)}
                  </span>
                </>
              ) : (
                <span
                  className={
                    line.startsWith("✓")
                      ? "text-emerald-400"
                      : line.startsWith("→")
                        ? "text-nangell-blue"
                        : "text-nangell-muted"
                  }
                >
                  {line}
                </span>
              )}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
