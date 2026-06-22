import { describe, expect, it } from "vitest";

import { contactLeadSchema, diagnosticLeadSchema } from "@/lib/validations/lead";

const validDiagnostic = {
  name: "Maria Silva",
  email: "maria@empresa.com.br",
  phone: "61982015585",
  company: "Empresa Teste",
  website: "",
  projectType: "sistema_web",
  challengeDescription: "Precisamos automatizar nosso processo comercial com um CRM sob medida.",
  painCategory: "processo_manual",
  projectMoment: "ideia",
  urgency: "media",
  desiredDeadline: "3 meses",
  budgetRange: "5000_10000",
  bestTime: "Manhã",
  preferredContact: "whatsapp",
  consent: true,
  source_page: "/diagnostico",
  website_url: "",
} as const;

describe("lead validation schemas", () => {
  it("accepts valid diagnostic payload", () => {
    const result = diagnosticLeadSchema.safeParse(validDiagnostic);
    expect(result.success).toBe(true);
  });

  it("rejects diagnostic without consent", () => {
    const result = diagnosticLeadSchema.safeParse({
      ...validDiagnostic,
      consent: false,
    });
    expect(result.success).toBe(false);
  });

  it("rejects contact with short message", () => {
    const result = contactLeadSchema.safeParse({
      name: "João",
      email: "joao@test.com",
      phone: "61999998888",
      message: "Oi",
      consent: true,
      source_page: "/contato",
      website_url: "",
    });
    expect(result.success).toBe(false);
  });

  it("accepts valid contact payload", () => {
    const result = contactLeadSchema.safeParse({
      name: "João Souza",
      email: "joao@test.com",
      phone: "61999998888",
      company: "Startup",
      message: "Gostaria de conversar sobre um sistema web.",
      consent: true,
      source_page: "/contato",
      website_url: "",
    });
    expect(result.success).toBe(true);
  });
});
