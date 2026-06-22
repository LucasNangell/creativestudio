import { DemoPageFrame } from "@/components/seo/demo-page-frame";
import { LinkQrDemoClient } from "@/components/demos/client-only-demos";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Demo Link + QR Code",
  description:
    "Encurtador fictício com UTM, QR Code real no frontend e dashboard de cliques simulados.",
  path: "/demo/link-qr",
  keywords: ["encurtador link", "QR code", "SaaS demo", "Nangell"],
});

export default function LinkQrDemoPage() {
  return (
    <DemoPageFrame
      name="Demo Link + QR Code"
      description="Encurtador de links com UTM, QR codes e analytics simulados."
      path="/demo/link-qr"
      genre="WebApplication"
    >
      <LinkQrDemoClient />
    </DemoPageFrame>
  );
}
