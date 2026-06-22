import { cn } from "@/lib/utils";

type DemoKpiCardProps = {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  className?: string;
};

export function DemoKpiCard({
  label,
  value,
  change,
  trend = "neutral",
  className,
}: DemoKpiCardProps) {
  return (
    <div
      className={cn(
        "rounded-nangell border border-glass-border bg-nangell-dark/40 p-4",
        className,
      )}
    >
      <p className="text-xs text-nangell-muted">{label}</p>
      <p className="mt-1 font-heading text-xl font-semibold text-nangell-text sm:text-2xl">
        {value}
      </p>
      {change ? (
        <p
          className={cn(
            "mt-1 font-mono text-[10px]",
            trend === "up" && "text-emerald-400",
            trend === "down" && "text-red-400",
            trend === "neutral" && "text-nangell-muted",
          )}
        >
          {change}
        </p>
      ) : null}
    </div>
  );
}
