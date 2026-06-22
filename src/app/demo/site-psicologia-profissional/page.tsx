import { PsicologiaDemoClient } from "@/components/demos/client-only-demos";
import { createNativeDemoPage } from "@/lib/demos/create-native-demo-page";

const { metadata, Page } = createNativeDemoPage({
  slug: "site-psicologia-profissional",
  keywords: ["site psicóloga", "agendamento online", "TCC", "LGPD"],
  renderDemo: () => <PsicologiaDemoClient />,
});

export { metadata };
export default Page;
