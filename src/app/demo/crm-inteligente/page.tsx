import { DemoPageFrame } from "@/components/seo/demo-page-frame";
import { CrmDemoClient } from "@/components/demos/client-only-demos";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Demo CRM Inteligente",
  description:
    "Pipeline comercial simulado com kanban drag-and-drop, filtros, WhatsApp e proposta fictícia.",
  path: "/demo/crm-inteligente",
  keywords: ["CRM demo", "pipeline vendas", "kanban comercial", "Nangell"],
});

export default function CrmInteligenteDemoPage() {
  return (
    <DemoPageFrame
      name="Demo CRM Inteligente"
      description="Pipeline comercial com kanban, filtros e interações simuladas."
      path="/demo/crm-inteligente"
      genre="BusinessApplication"
    >
      <CrmDemoClient />
    </DemoPageFrame>
  );
}
