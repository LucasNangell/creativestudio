"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, LogOut } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

type AdmTopbarProps = {
  userName: string;
  userEmail: string;
};

export function AdmTopbar({ userName, userEmail }: AdmTopbarProps) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login?redirect=/adm");
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-glass-border bg-nangell-surface/60 px-4 backdrop-blur-md sm:px-6">
      <div>
        <p className="font-heading text-sm font-semibold text-nangell-text">
          Estatísticas do site
        </p>
        <p className="text-xs text-nangell-muted">
          {userName} · {userEmail}
        </p>
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
        <Button variant="outline" size="sm" onClick={handleLogout} disabled={loggingOut}>
          <LogOut className="h-4 w-4" aria-hidden />
          {loggingOut ? "Saindo..." : "Sair"}
        </Button>
      </div>
    </header>
  );
}
