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

export const LinkQrDemoClient = clientDemo(
  () => import("@/components/demos/link-qr/link-qr-demo"),
  "LinkQrDemo",
  "Link + QR Code",
);

export const BiDemoClient = clientDemo(
  () => import("@/components/demos/dashboard-bi/bi-demo"),
  "BiDemo",
  "Dashboard BI",
);

export const CrmDemoClient = clientDemo(
  () => import("@/components/demos/crm/crm-demo"),
  "CrmDemo",
  "CRM Inteligente",
);

export const OsDemoClient = clientDemo(
  () => import("@/components/demos/gestao-os/os-demo"),
  "OsDemo",
  "Gestão de OS",
);

export const MonitoringDemoClient = clientDemo(
  () => import("@/components/demos/monitoramento/monitoring-demo"),
  "MonitoringDemo",
  "Monitoramento",
);

export const EduDemoClient = clientDemo(
  () => import("@/components/demos/educacional/edu-demo"),
  "EduDemo",
  "Plataforma Educacional",
);

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
