import { DemoPageFrame } from "@/components/seo/demo-page-frame";
import { MonitoringDemoClient } from "@/components/demos/client-only-demos";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Demo Monitoramento em Tempo Real",
  description:
    "Feed simulado de eventos, alertas, sentimento fictício e gráfico de volume por minuto.",
  path: "/demo/monitoramento-tempo-real",
  keywords: ["monitoramento", "tempo real", "alertas", "observabilidade demo"],
});

export default function MonitoramentoTempoRealDemoPage() {
  return (
    <DemoPageFrame
      name="Demo Monitoramento em Tempo Real"
      description="Feed de eventos e alertas simulados para observabilidade operacional."
      path="/demo/monitoramento-tempo-real"
      genre="BusinessApplication"
    >
      <MonitoringDemoClient />
    </DemoPageFrame>
  );
}
