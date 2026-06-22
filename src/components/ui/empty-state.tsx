import { Inbox } from "lucide-react";

import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-center justify-center rounded-nangell-lg border border-dashed border-glass-border bg-nangell-surface/40 px-6 py-12 text-center",
        className,
      )}
    >
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-nangell-gradient-subtle text-nangell-cyan"
        aria-hidden
      >
        {icon ?? <Inbox className="h-6 w-6" />}
      </div>
      <h3 className="font-heading text-base font-semibold text-nangell-text">
        {title}
      </h3>
      {description ? (
        <p className="mt-2 max-w-sm text-sm text-nangell-muted">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
