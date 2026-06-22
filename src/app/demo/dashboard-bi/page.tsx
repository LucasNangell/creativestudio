import { DemoPageFrame } from "@/components/seo/demo-page-frame";
import { BiDemoClient } from "@/components/demos/client-only-demos";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Demo Dashboard BI",
  description:
    "Painel BI interativo com KPIs, gráficos, filtros e alertas inteligentes simulados.",
  path: "/demo/dashboard-bi",
  keywords: ["dashboard BI", "KPIs", "business intelligence demo", "Nangell"],
});

export default function DashboardBiDemoPage() {
  return (
    <DemoPageFrame
      name="Demo Dashboard BI"
      description="Painel de business intelligence com KPIs e gráficos interativos simulados."
      path="/demo/dashboard-bi"
      genre="BusinessApplication"
    >
      <BiDemoClient />
    </DemoPageFrame>
  );
}
