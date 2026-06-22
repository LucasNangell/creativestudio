"use client";

import { Suspense, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const SKIP_PREFIXES = ["/admin", "/adm", "/api", "/_next"];

function PageViewTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || SKIP_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
      return;
    }

    const key = `${pathname}?${searchParams.toString()}`;
    if (lastTracked.current === key) return;
    lastTracked.current = key;

    const body = JSON.stringify({
      path: pathname,
      referrer: typeof document !== "undefined" ? document.referrer || undefined : undefined,
      utmSource: searchParams.get("utm_source") ?? undefined,
      utmMedium: searchParams.get("utm_medium") ?? undefined,
      utmCampaign: searchParams.get("utm_campaign") ?? undefined,
    });

    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([body], { type: "application/json" });
        navigator.sendBeacon("/api/analytics/pageview", blob);
        return;
      }
    } catch {
      /* fall through */
    }

    fetch("/api/analytics/pageview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {
      /* non-blocking */
    });
  }, [pathname, searchParams]);

  return null;
}

export function PageViewTracker() {
  return (
    <Suspense fallback={null}>
      <PageViewTrackerInner />
    </Suspense>
  );
}
