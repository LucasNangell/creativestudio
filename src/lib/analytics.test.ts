import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { trackEvent } from "@/lib/analytics";

describe("trackEvent", () => {
  beforeEach(() => {
    window.dataLayer = [];
    window.gtag = vi.fn();
    Object.defineProperty(window, "location", {
      value: { pathname: "/portfolio" },
      writable: true,
      configurable: true,
    });
    Object.defineProperty(navigator, "sendBeacon", {
      value: vi.fn().mockReturnValue(true),
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("pushes event to dataLayer on public routes", () => {
    trackEvent("filter_portfolio", {
      filterType: "category",
      filterValue: "CRM",
      value: 2,
    });

    expect(window.dataLayer?.length).toBeGreaterThan(0);
    expect(window.dataLayer?.[0]).toMatchObject({
      event: "filter_portfolio",
      filterType: "category",
    });
  });

  it("does not track events on admin routes", () => {
    Object.defineProperty(window, "location", {
      value: { pathname: "/admin/leads" },
      writable: true,
    });

    trackEvent("click_whatsapp", { location: "test" });

    expect(window.dataLayer).toHaveLength(0);
  });

  it("calls gtag when available", () => {
    trackEvent("click_cta_hero", { label: "Solicitar diagnóstico" });
    expect(window.gtag).toHaveBeenCalled();
  });
});
