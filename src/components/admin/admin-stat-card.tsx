import { cn } from "@/lib/utils";

type AdminStatCardProps = {
  label: string;
  value: string | number;
  hint?: string;
  className?: string;
};

export function AdminStatCard({
  label,
  value,
  hint,
  className,
}: AdminStatCardProps) {
  return (
    <div
      className={cn(
        "rounded-nangell-xl border border-glass-border bg-nangell-surface/80 p-5 shadow-glass",
        className,
      )}
    >
      <p className="text-xs text-nangell-muted">{label}</p>
      <p className="mt-2 font-heading text-3xl font-bold text-nangell-text">{value}</p>
      {hint ? (
        <p className="mt-1 font-mono text-[10px] text-nangell-cyan">{hint}</p>
      ) : null}
    </div>
  );
}
