import type { Metadata } from "next";

import { AdminDashboardContent } from "@/app/_components/admin/admin-dashboard-content";
import { AdminLayoutShell } from "@/components/admin/admin-layout";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Dashboard administrativo",
  description: "Painel interno da Nangell Creative Studio.",
  path: "/admin",
});

export default function AdminDashboardPage() {
  return (
    <AdminLayoutShell>
      <AdminDashboardContent />
    </AdminLayoutShell>
  );
}
