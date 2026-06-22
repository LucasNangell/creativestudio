import { DemoPageFrame } from "@/components/seo/demo-page-frame";
import { OsDemoClient } from "@/components/demos/client-only-demos";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Demo Gestão de OS",
  description:
    "Gerenciador de ordens de serviço com kanban, timeline, filtros e notificações simuladas.",
  path: "/demo/gestao-os",
  keywords: ["gestão OS", "ordem de serviço", "operações demo", "Nangell"],
});

export default function GestaoOsDemoPage() {
  return (
    <DemoPageFrame
      name="Demo Gestão de OS"
      description="Gerenciador de ordens de serviço com fluxo operacional simulado."
      path="/demo/gestao-os"
      genre="BusinessApplication"
    >
      <OsDemoClient />
    </DemoPageFrame>
  );
}
