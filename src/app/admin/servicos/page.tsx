import type { Metadata } from "next";

import { ServicesAdminPanel } from "@/app/_components/admin/services-admin-panel";
import { AdminLayoutShell } from "@/components/admin/admin-layout";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Serviços",
  description: "Gerenciamento de serviços e soluções.",
  path: "/admin/servicos",
});

export default function AdminServicosPage() {
  return (
    <AdminLayoutShell>
      <ServicesAdminPanel />
    </AdminLayoutShell>
  );
}
