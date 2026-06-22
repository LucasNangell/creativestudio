import type { Metadata } from "next";
import { Suspense } from "react";

import { AdminLoginForm } from "@/app/_components/admin/admin-login-form";
import { createPageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Login administrativo",
  description: "Acesso restrito ao painel administrativo da Nangell Creative Studio.",
  path: "/admin/login",
});

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-nangell-dark px-4 py-16">
      <Suspense fallback={null}>
        <AdminLoginForm />
      </Suspense>
    </main>
  );
}
