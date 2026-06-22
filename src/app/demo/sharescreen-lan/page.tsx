import { SharescreenLanDemoClient } from "@/components/demos/client-only-demos";
import { createNativeDemoPage } from "@/lib/demos/create-native-demo-page";

const { metadata, Page } = createNativeDemoPage({
  slug: "sharescreen-lan",
  keywords: ["WebRTC", "LAN", "compartilhamento de tela", "mediasoup"],
  renderDemo: () => <SharescreenLanDemoClient />,
});

export { metadata };
export default Page;
