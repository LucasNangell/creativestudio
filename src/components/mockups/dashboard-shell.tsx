import { cn } from "@/lib/utils";

type DashboardShellProps = {
  title?: string;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function DashboardShell({
  title = "Dashboard",
  sidebar,
  header,
  children,
  className,
}: DashboardShellProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-nangell-xl border border-glass-border bg-nangell-surface shadow-glass",
        className,
      )}
    >
      <div className="flex min-h-[280px]">
        {sidebar ? (
          <aside
            aria-label="Menu lateral"
            className="hidden w-44 shrink-0 border-r border-glass-border bg-nangell-dark/60 p-3 sm:block"
          >
            <p className="mb-3 px-2 font-mono text-[10px] tracking-widest text-nangell-cyan uppercase">
              {title}
            </p>
            {sidebar}
          </aside>
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col">
          {header ? (
            <header className="border-b border-glass-border bg-nangell-dark/40 px-4 py-3">
              {header}
            </header>
          ) : null}
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
    </div>
  );
}

type DashboardNavItemProps = {
  label: string;
  active?: boolean;
};

export function DashboardNavItem({ label, active }: DashboardNavItemProps) {
  return (
    <div
      className={cn(
        "rounded-nangell px-2 py-1.5 text-xs transition-colors",
        active
          ? "bg-nangell-gradient-subtle font-medium text-nangell-cyan"
          : "text-nangell-muted",
      )}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </div>
  );
}

type DashboardStatProps = {
  label: string;
  value: string;
  trend?: string;
};

export function DashboardStat({ label, value, trend }: DashboardStatProps) {
  return (
    <div className="rounded-nangell border border-glass-border bg-nangell-dark/40 p-3">
      <p className="text-xs text-nangell-muted">{label}</p>
      <p className="mt-1 font-heading text-lg font-semibold text-nangell-text">
        {value}
      </p>
      {trend ? (
        <p className="mt-0.5 font-mono text-[10px] text-emerald-400">{trend}</p>
      ) : null}
    </div>
  );
}
