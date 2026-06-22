"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { Button, buttonVariants } from "@/components/ui/button";
import { mainNavLinks } from "@/data/navigation";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLElement>(null);

  useFocusTrap(open, panelRef);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] lg:hidden">
      <button
        type="button"
        aria-label="Fechar menu"
        className="absolute inset-0 bg-nangell-dark/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <nav
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-glass-border bg-nangell-surface/95 p-6 shadow-glass backdrop-blur-md",
          "animate-fade-in motion-reduce:animate-none",
        )}
      >
        <div className="flex items-center justify-between">
          <BrandLogo variant="icon" theme="dark" className="h-10 w-10" />
          <Button
            variant="ghost"
            size="sm"
            aria-label="Fechar menu de navegação"
            onClick={onClose}
            className="h-10 w-10 p-0"
          >
            <X className="h-5 w-5" aria-hidden />
          </Button>
        </div>

        <ul className="mt-10 flex flex-col gap-1">
          {mainNavLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="block rounded-nangell px-3 py-3 font-heading text-lg font-medium text-nangell-text transition-colors hover:bg-white/5 hover:text-nangell-cyan"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-3 pt-8">
          <Link
            href="/diagnostico"
            onClick={onClose}
            className={cn(buttonVariants({ variant: "primary", size: "lg" }), "w-full")}
          >
            Solicitar diagnóstico
          </Link>
          <Link
            href="/contato"
            onClick={onClose}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full")}
          >
            Contato
          </Link>
        </div>
      </nav>
    </div>
  );
}
