"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  MessageSquareQuote,
  Newspaper,
  Settings,
  Users,
  Wrench,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/projetos", label: "Projetos", icon: Wrench },
  { href: "/admin/servicos", label: "Serviços", icon: Layers },
  { href: "/admin/depoimentos", label: "Depoimentos", icon: MessageSquareQuote },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/configuracoes", label: "Configurações", icon: Settings },
];

type AdminSidebarProps = {
  open?: boolean;
  onNavigate?: () => void;
  className?: string;
};

export function AdminSidebar({ open = true, onNavigate, className }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "w-64 shrink-0 border-r border-glass-border bg-nangell-dark/80 backdrop-blur-md",
        !open && "hidden lg:block",
        open && "block",
        className,
      )}
      aria-label="Menu administrativo"
    >
      <div className="flex h-16 items-center border-b border-glass-border px-5">
        <Link href="/admin" className="font-heading text-sm font-semibold text-nangell-text">
          Nangell <span className="text-nangell-cyan">Admin</span>
        </Link>
      </div>

      <nav className="p-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-3 rounded-nangell px-3 py-2.5 text-sm transition-colors",
                    isActive
                      ? "bg-nangell-gradient-subtle font-medium text-nangell-cyan"
                      : "text-nangell-muted hover:bg-white/5 hover:text-nangell-text",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
