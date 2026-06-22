export type AnalyticsEventName =
  | "click_cta_hero"
  | "click_whatsapp"
  | "open_demo"
  | "demo_interaction"
  | "demo_cta_click"
  | "submit_diagnostico"
  | "submit_contato"
  | "view_case"
  | "click_case_cta"
  | "filter_portfolio"
  | "finish_demo_interaction";

export type AnalyticsEventPayload = {
  page?: string;
  label?: string;
  value?: string | number;
  demoId?: string;
  action?: string;
  caseSlug?: string;
  filterType?: string;
  filterValue?: string;
  location?: string;
  metadata?: Record<string, string | number | boolean>;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

const isDev = process.env.NODE_ENV === "development";
const INTERNAL_EVENTS_ENDPOINT = "/api/analytics/events";

const ALLOWED_INTERNAL_EVENTS = new Set<AnalyticsEventName>([
  "click_cta_hero",
  "click_whatsapp",
  "open_demo",
  "demo_interaction",
  "demo_cta_click",
  "submit_diagnostico",
  "submit_contato",
  "view_case",
  "click_case_cta",
  "filter_portfolio",
]);

function isAdminPath(): boolean {
  if (typeof window === "undefined") return false;
  const path = window.location.pathname;
  return path.startsWith("/admin") || path.startsWith("/adm");
}

function getCurrentPage(fallback?: string): string {
  if (fallback) return fallback;
  if (typeof window === "undefined") return "";
  return window.location.pathname;
}

function pushToDataLayer(eventName: AnalyticsEventName, event: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(event);

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      event_category: "nangell_site",
      event_label: event.label,
      page_path: event.page,
      demo_id: event.demoId,
      case_slug: event.caseSlug,
      filter_type: event.filterType,
      filter_value: event.filterValue,
      location: event.location,
      value: event.value,
    });
  }
}

function persistInternalEvent(
  eventName: AnalyticsEventName,
  payload: AnalyticsEventPayload,
): void {
  if (!ALLOWED_INTERNAL_EVENTS.has(eventName)) return;
  if (typeof window === "undefined") return;

  const body = JSON.stringify({
    eventName,
    page: getCurrentPage(payload.page),
    demoSlug: payload.demoId,
    metadata: {
      ...(payload.action ? { action: payload.action } : {}),
      ...(payload.label ? { label: payload.label } : {}),
      ...(payload.caseSlug ? { caseSlug: payload.caseSlug } : {}),
      ...(payload.filterType ? { filterType: payload.filterType } : {}),
      ...(payload.filterValue ? { filterValue: payload.filterValue } : {}),
      ...(payload.location ? { location: payload.location } : {}),
      ...(payload.value !== undefined ? { value: payload.value } : {}),
      ...payload.metadata,
    },
  });

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(INTERNAL_EVENTS_ENDPOINT, blob);
      return;
    }
  } catch {
    /* fall through to fetch */
  }

  fetch(INTERNAL_EVENTS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {
    /* non-blocking */
  });
}

export function trackEvent(
  eventName: AnalyticsEventName,
  payload: AnalyticsEventPayload = {},
): void {
  if (isAdminPath()) return;

  const event = {
    event: eventName,
    timestamp: new Date().toISOString(),
    page: getCurrentPage(payload.page),
    ...payload,
  };

  if (isDev) {
    console.info("[Analytics]", eventName, event);
  }

  pushToDataLayer(eventName, event);
  persistInternalEvent(eventName, payload);
}
