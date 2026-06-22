import type { Metadata } from "next";

import { LeadsAdminPanel } from "@/app/_components/admin/leads-admin-panel";
import { AdminLayoutShell } from "@/components/admin/admin-layout";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Leads",
  description: "Gerenciamento de leads captados.",
  path: "/admin/leads",
});

export default function AdminLeadsPage() {
  return (
    <AdminLayoutShell>
      <LeadsAdminPanel />
    </AdminLayoutShell>
  );
}
