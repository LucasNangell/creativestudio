const DATE_TIME_ZONE = "America/Sao_Paulo";

/**
 * Formata datas de forma consistente entre Node (SSR) e browser,
 * evitando hydration mismatch por locale/fuso do servidor.
 */
export function formatDatePtBR(
  iso: string | null | undefined,
  options: { fallback?: string; dateStyle?: "long" | "short" | "medium" } = {},
): string {
  const { fallback = "", dateStyle = "long" } = options;

  if (!iso) return fallback;

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle,
    timeZone: DATE_TIME_ZONE,
  }).format(new Date(iso));
}

export function formatDateTimePtBR(iso: string | Date): string {
  const value = typeof iso === "string" ? new Date(iso) : iso;

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: DATE_TIME_ZONE,
  }).format(value);
}

export function formatTimePtBR(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: DATE_TIME_ZONE,
  }).format(date);
}
