import type { Metadata } from "next";

import { SettingsAdminPanel } from "@/app/_components/admin/settings-admin-panel";
import { AdminLayoutShell } from "@/components/admin/admin-layout";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Configurações",
  description: "Parâmetros gerais do site.",
  path: "/admin/configuracoes",
});

export default function AdminConfiguracoesPage() {
  return (
    <AdminLayoutShell>
      <SettingsAdminPanel />
    </AdminLayoutShell>
  );
}
