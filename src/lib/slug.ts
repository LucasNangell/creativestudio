export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 255);
}

export function parseJsonStringArray(value: string): string[] {
  const trimmed = value.trim();
  if (!trimmed) return [];

  try {
    const parsed = JSON.parse(trimmed) as unknown;
    if (Array.isArray(parsed)) {
      return parsed.map(String).filter(Boolean);
    }
  } catch {
    /* fall through */
  }

  return trimmed
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function stringifyJsonArray(values: string[]): string {
  return values.join("\n");
}
