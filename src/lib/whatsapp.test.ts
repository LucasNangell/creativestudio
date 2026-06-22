import { describe, expect, it } from "vitest";

import {
  WHATSAPP_NUMBER,
  buildContextualWhatsAppMessage,
  buildContextualWhatsAppUrl,
  buildWhatsAppUrl,
  defaultWhatsAppMessage,
} from "@/lib/whatsapp";

describe("whatsapp utilities", () => {
  it("builds default wa.me URL with encoded message", () => {
    const url = buildWhatsAppUrl();
    expect(url).toContain(`https://wa.me/${WHATSAPP_NUMBER}`);
    expect(url).toContain("text=");
    expect(decodeURIComponent(url.split("text=")[1] ?? "")).toBe(
      defaultWhatsAppMessage(),
    );
  });

  it("builds contextual diagnostic message", () => {
    const message = buildContextualWhatsAppMessage({
      name: "Ana",
      company: "Acme",
      source: "diagnostico",
      projectType: "Sistema web",
    });

    expect(message).toContain("Ana");
    expect(message).toContain("Acme");
    expect(message).toContain("diagnóstico");
  });

  it("builds contextual URL from context", () => {
    const url = buildContextualWhatsAppUrl({ source: "demo" });
    expect(url).toContain(WHATSAPP_NUMBER);
    expect(decodeURIComponent(url)).toContain("demonstração interativa");
  });
});
