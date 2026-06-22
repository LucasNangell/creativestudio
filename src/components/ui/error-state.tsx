import { AlertTriangle } from "lucide-react";

import { cn } from "@/lib/utils";

type ErrorStateProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

export function ErrorState({
  title = "Algo deu errado",
  description = "Não foi possível carregar este conteúdo. Tente novamente em instantes.",
  action,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center rounded-nangell-lg border border-red-500/30 bg-red-500/5 px-6 py-12 text-center",
        className,
      )}
    >
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400"
        aria-hidden
      >
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h3 className="font-heading text-base font-semibold text-nangell-text">
        {title}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-nangell-muted">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
