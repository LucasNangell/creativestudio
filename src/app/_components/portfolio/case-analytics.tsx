"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

type CaseViewTrackerProps = {
  slug: string;
  title: string;
};

export function CaseViewTracker({ slug, title }: CaseViewTrackerProps) {
  useEffect(() => {
    trackEvent("view_case", { caseSlug: slug, label: title });
  }, [slug, title]);

  return null;
}

export function trackCaseCta(
  slug: string,
  action: string,
  label?: string,
): void {
  trackEvent("click_case_cta", {
    caseSlug: slug,
    action,
    label,
  });
}
