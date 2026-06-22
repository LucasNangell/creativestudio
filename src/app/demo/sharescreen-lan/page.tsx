import { DemoPageFrame } from "@/components/seo/demo-page-frame";
import { SharescreenLanDemoClient } from "@/components/demos/client-only-demos";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Demo ShareScreen LAN",
  description:
    "Compartilhamento de tela em rede local — interface simulada do painel host e client.",
  path: "/demo/sharescreen-lan",
  keywords: ["WebRTC", "LAN", "compartilhamento de tela", "mediasoup"],
});

export default function SharescreenLanDemoPage() {
  return (
    <DemoPageFrame
      name="Demo ShareScreen LAN"
      description="Painel host e client simulados para rede local sem nuvem."
      path="/demo/sharescreen-lan"
      genre="BusinessApplication"
    >
      <SharescreenLanDemoClient />
    </DemoPageFrame>
  );
}
