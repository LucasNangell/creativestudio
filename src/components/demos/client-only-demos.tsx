"use client";

import dynamic from "next/dynamic";

import { DemoLoadingSkeleton } from "@/components/demos/demo-loading-skeleton";

function clientDemo<T extends React.ComponentType<object>>(
  factory: () => Promise<{ [key: string]: T }>,
  exportName: string,
  title: string,
) {
  return dynamic(() => factory().then((mod) => mod[exportName]), {
    ssr: false,
    loading: () => <DemoLoadingSkeleton title={title} />,
  });
}

export const SharescreenLanDemoClient = clientDemo(
  () => import("@/components/demos/sharescreen-lan/sharescreen-lan-demo"),
  "SharescreenLanDemo",
  "ShareScreen LAN",
);

export const PsicologiaDemoClient = clientDemo(
  () => import("@/components/demos/psicologia/psicologia-demo"),
  "PsicologiaDemo",
  "Site Psicologia",
);
