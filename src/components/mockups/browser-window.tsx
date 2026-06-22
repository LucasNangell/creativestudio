import { cn } from "@/lib/utils";

type BrowserWindowProps = {
  title?: string;
  url?: string;
  children: React.ReactNode;
  className?: string;
};

export function BrowserWindow({
  title = "Nangell Creative Studio",
  url = "nangell.com.br",
  children,
  className,
}: BrowserWindowProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-nangell-xl border border-glass-border bg-nangell-surface shadow-glass",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-glass-border bg-nangell-dark/60 px-4 py-3">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-amber-400/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        </div>
        <div className="mx-auto flex max-w-xs flex-1 items-center rounded-md border border-glass-border bg-nangell-surface/80 px-3 py-1">
          <span className="truncate font-mono text-xs text-nangell-muted">
            {url}
          </span>
        </div>
        <span className="sr-only">{title}</span>
      </div>
      <div className="relative bg-nangell-dark/40 p-4 sm:p-6">{children}</div>
    </div>
  );
}
