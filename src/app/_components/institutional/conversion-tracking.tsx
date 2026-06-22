"use client";

import { useEffect, useState } from "react";

import { trackEvent } from "@/lib/analytics";

type LeadSuccessContext = {
  type?: "diagnostico" | "contato";
  name?: string;
  company?: string;
  projectType?: string;
};

/**
 * Dispara evento de conversão preparado para GA4/GTM.
 */
export function ConversionTracking() {
  useEffect(() => {
    let context: LeadSuccessContext = {};

    try {
      const stored = sessionStorage.getItem("nangell-lead-success");
      if (stored) {
        context = JSON.parse(stored) as LeadSuccessContext;
      }
    } catch {
      /* ignore */
    }

    const conversionEvent =
      context.type === "diagnostico" ? "submit_diagnostico" : "submit_contato";

    trackEvent(conversionEvent, {
      page: "/obrigado",
      label: context.projectType ?? context.type ?? "conversion",
      action: "conversion_confirmed",
      metadata: {
        hasCompany: Boolean(context.company),
      },
    });

    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "generate_lead", {
        event_category: "lead_capture",
        event_label: context.type ?? "obrigado",
      });
    }
  }, []);

  return null;
}

export function useLeadSuccessContext(): LeadSuccessContext {
  const [context, setContext] = useState<LeadSuccessContext>({});

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("nangell-lead-success");
      if (stored) {
        setContext(JSON.parse(stored) as LeadSuccessContext);
      }
    } catch {
      /* ignore */
    }
  }, []);

  return context;
}
