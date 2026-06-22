"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, LogOut, Menu, X } from "lucide-react";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AdminTopbarProps = {
  userName: string;
  userEmail: string;
};

export function AdminTopbar({ userName, userEmail }: AdminTopbarProps) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b border-glass-border bg-nangell-surface/60 px-4 backdrop-blur-md sm:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-nangell p-2 text-nangell-muted hover:bg-white/5 lg:hidden"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div>
            <p className="text-sm font-medium text-nangell-text">{userName}</p>
            <p className="text-xs text-nangell-muted">{userEmail}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            target="_blank"
            className="hidden items-center gap-1 text-xs text-nangell-muted hover:text-nangell-cyan sm:inline-flex"
          >
            Ver site
            <ExternalLink className="h-3 w-3" aria-hidden />
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            disabled={loggingOut}
          >
            <LogOut className="h-4 w-4" aria-hidden />
            {loggingOut ? "Saindo..." : "Sair"}
          </Button>
        </div>
      </header>

      {mobileOpen ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-nangell-dark/80"
            aria-label="Fechar menu"
            onClick={() => setMobileOpen(false)}
          />
          <AdminSidebar
            open
            onNavigate={() => setMobileOpen(false)}
            className={cn("absolute left-0 top-0 z-50 h-full shadow-glass")}
          />
        </div>
      ) : null}
    </>
  );
}
