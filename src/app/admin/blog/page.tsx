import type { Metadata } from "next";

import { PostsAdminPanel } from "@/app/_components/admin/posts-admin-panel";
import { AdminLayoutShell } from "@/components/admin/admin-layout";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Blog",
  description: "Gerenciamento de artigos do blog.",
  path: "/admin/blog",
});

export default function AdminBlogPage() {
  return (
    <AdminLayoutShell>
      <PostsAdminPanel />
    </AdminLayoutShell>
  );
}
