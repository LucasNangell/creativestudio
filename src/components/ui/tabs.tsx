"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

type TabItem = {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
};

type TabsProps = {
  items: TabItem[];
  defaultTab?: string;
  className?: string;
  ariaLabel?: string;
};

export function Tabs({
  items,
  defaultTab,
  className,
  ariaLabel = "Abas de conteúdo",
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(
    defaultTab ?? items.find((item) => !item.disabled)?.id ?? items[0]?.id,
  );

  const activeItem = items.find((item) => item.id === activeTab);

  return (
    <div className={cn("w-full", className)}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="flex flex-wrap gap-1 rounded-nangell border border-glass-border bg-nangell-surface/50 p-1"
      >
        {items.map((item) => {
          const isActive = item.id === activeTab;

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              disabled={item.disabled}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "rounded-nangell px-4 py-2 text-sm font-medium transition-colors",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nangell-electric",
                "disabled:cursor-not-allowed disabled:opacity-50",
                isActive
                  ? "bg-nangell-gradient text-nangell-dark shadow-glow-soft"
                  : "text-nangell-muted hover:bg-white/5 hover:text-nangell-text",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {activeItem ? (
        <div
          role="tabpanel"
          id={`panel-${activeItem.id}`}
          aria-labelledby={`tab-${activeItem.id}`}
          tabIndex={0}
          className="mt-4 rounded-nangell-lg border border-glass-border bg-nangell-surface/80 p-5 backdrop-blur-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nangell-electric"
        >
          {activeItem.content}
        </div>
      ) : null}
    </div>
  );
}
