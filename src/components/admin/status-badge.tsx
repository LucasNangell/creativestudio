import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  label: string;
  tone?: "default" | "success" | "warning" | "muted";
  className?: string;
};

const toneMap = {
  default: "default" as const,
  success: "success" as const,
  warning: "warning" as const,
  muted: "muted" as const,
};

export function StatusBadge({ label, tone = "default", className }: StatusBadgeProps) {
  return (
    <Badge variant={toneMap[tone]} className={cn("normal-case", className)}>
      {label}
    </Badge>
  );
}

export function leadStatusTone(status: string): StatusBadgeProps["tone"] {
  switch (status) {
    case "NOVO":
      return "default";
    case "CONTATO":
    case "REUNIAO":
      return "warning";
    case "PROPOSTA":
      return "default";
    case "FECHADO":
      return "success";
    case "PERDIDO":
      return "muted";
    default:
      return "muted";
  }
}

export function projectStatusTone(status: string): StatusBadgeProps["tone"] {
  switch (status) {
    case "PUBLISHED":
      return "success";
    case "DRAFT":
      return "warning";
    case "HIDDEN":
      return "muted";
    default:
      return "muted";
  }
}
