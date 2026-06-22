"use client";

import { MessageCircle } from "lucide-react";

import { buildWhatsAppUrl } from "@/data/navigation";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type WhatsAppFloatingButtonProps = {
  className?: string;
  message?: string;
};

export function WhatsAppFloatingButton({
  className,
  message,
}: WhatsAppFloatingButtonProps) {
  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Nangell no WhatsApp"
      className={cn(
        "fixed right-4 bottom-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nangell-electric motion-reduce:transition-none motion-reduce:hover:scale-100 sm:right-6 sm:bottom-6",
        className,
      )}
      onClick={() =>
        trackEvent("click_whatsapp", {
          location: "floating_button",
        })
      }
    >
      <MessageCircle className="h-7 w-7" aria-hidden />
    </a>
  );
}
