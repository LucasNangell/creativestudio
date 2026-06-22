import type { Prisma } from "@prisma/client";

export function parseProjectMetrics(value: unknown): Prisma.InputJsonValue {
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return [];

    try {
      return JSON.parse(trimmed) as Prisma.InputJsonValue;
    } catch {
      return [];
    }
  }

  if (value === undefined || value === null) {
    return [];
  }

  return value as Prisma.InputJsonValue;
}
