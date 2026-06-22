"use client";

import { cn } from "@/lib/utils";

type DemoSidebarItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
};

type DemoSidebarProps = {
  title?: string;
  items: DemoSidebarItem[];
  className?: string;
};

export function DemoSidebar({ title = "Menu", items, className }: DemoSidebarProps) {
  return (
    <aside
      aria-label="Navegação da demo"
      className={cn(
        "hidden w-48 shrink-0 border-r border-glass-border bg-nangell-dark/60 p-3 lg:block",
        className,
      )}
    >
      <p className="mb-3 px-2 font-mono text-[10px] tracking-widest text-nangell-cyan uppercase">
        {title}
      </p>
      <nav className="space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={item.onClick}
            className={cn(
              "flex w-full items-center gap-2 rounded-nangell px-2 py-2 text-left text-xs transition-colors",
              item.active
                ? "bg-nangell-gradient-subtle font-medium text-nangell-cyan"
                : "text-nangell-muted hover:bg-white/5 hover:text-nangell-text",
            )}
            aria-current={item.active ? "page" : undefined}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
