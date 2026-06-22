const HTML_TAG_REGEX = /<[^>]*>/g;
const CONTROL_CHARS_REGEX = /[\u0000-\u001F\u007F]/g;

export function sanitizeText(value: string | null | undefined, maxLength = 5000): string {
  if (!value) return "";

  return value
    .replace(HTML_TAG_REGEX, "")
    .replace(CONTROL_CHARS_REGEX, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function sanitizeOptionalText(
  value: string | null | undefined,
  maxLength = 255,
): string | null {
  const sanitized = sanitizeText(value, maxLength);
  return sanitized.length > 0 ? sanitized : null;
}

export function normalizePhone(value: string): string {
  return value.replace(/\D/g, "").slice(0, 15);
}

export function normalizeEmail(value: string): string {
  return sanitizeText(value, 255).toLowerCase();
}
