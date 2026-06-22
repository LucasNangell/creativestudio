import { DemoPageFrame } from "@/components/seo/demo-page-frame";
import { EduDemoClient } from "@/components/demos/client-only-demos";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Demo Plataforma Educacional",
  description:
    "Ambiente LMS simulado com módulos, player, quiz interativo, mapa mental e certificado fictício.",
  path: "/demo/plataforma-educacional",
  keywords: ["LMS demo", "plataforma educacional", "EdTech", "Nangell"],
});

export default function PlataformaEducacionalDemoPage() {
  return (
    <DemoPageFrame
      name="Demo Plataforma Educacional"
      description="Ambiente LMS simulado com módulos, quiz e progresso do aluno."
      path="/demo/plataforma-educacional"
      genre="EducationalApplication"
    >
      <EduDemoClient />
    </DemoPageFrame>
  );
}
