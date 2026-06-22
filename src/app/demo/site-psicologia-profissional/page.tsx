import { DemoPageFrame } from "@/components/seo/demo-page-frame";
import { PsicologiaDemoClient } from "@/components/demos/client-only-demos";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Demo Site Profissional para Psicóloga",
  description:
    "Site institucional com agendamento, blog e painel admin — demonstração com dados fictícios.",
  path: "/demo/site-psicologia-profissional",
  keywords: ["site psicóloga", "agendamento online", "TCC", "LGPD"],
});

export default function PsicologiaDemoPage() {
  return (
    <DemoPageFrame
      name="Demo Site para Psicóloga"
      description="Agendamento, blog e admin simulados para profissionais de saúde mental."
      path="/demo/site-psicologia-profissional"
      genre="BusinessApplication"
    >
      <PsicologiaDemoClient />
    </DemoPageFrame>
  );
}
