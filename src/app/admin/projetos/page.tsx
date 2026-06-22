import type { Metadata } from "next";

import { ProjectsAdminPanel } from "@/app/_components/admin/projects-admin-panel";
import { AdminLayoutShell } from "@/components/admin/admin-layout";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Projetos",
  description: "Gerenciamento de cases do portfólio.",
  path: "/admin/projetos",
});

export default function AdminProjetosPage() {
  return (
    <AdminLayoutShell>
      <ProjectsAdminPanel />
    </AdminLayoutShell>
  );
}
