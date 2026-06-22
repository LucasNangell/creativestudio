import { describe, expect, it } from "vitest";

import {
  normalizeEmail,
  normalizePhone,
  sanitizeOptionalText,
  sanitizeText,
} from "@/lib/sanitize";

describe("sanitize utilities", () => {
  it("removes HTML tags and trims text", () => {
    expect(sanitizeText("  <b>Olá</b> mundo  ")).toBe("Olá mundo");
  });

  it("returns empty string for nullish values", () => {
    expect(sanitizeText(null)).toBe("");
    expect(sanitizeOptionalText(undefined)).toBeNull();
  });

  it("normalizes phone digits", () => {
    expect(normalizePhone("(61) 98201-5585")).toBe("61982015585");
  });

  it("normalizes email to lowercase", () => {
    expect(normalizeEmail("  Contato@NANGELL.com.br ")).toBe("contato@nangell.com.br");
  });
});
