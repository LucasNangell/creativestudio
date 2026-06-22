import type { Metadata } from "next";

import { TestimonialsAdminPanel } from "@/app/_components/admin/testimonials-admin-panel";
import { AdminLayoutShell } from "@/components/admin/admin-layout";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Depoimentos",
  description: "Gerenciamento de depoimentos de clientes.",
  path: "/admin/depoimentos",
});

export default function AdminDepoimentosPage() {
  return (
    <AdminLayoutShell>
      <TestimonialsAdminPanel />
    </AdminLayoutShell>
  );
}
