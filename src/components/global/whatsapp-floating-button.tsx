"use client";

import { buildWhatsAppUrl } from "@/data/navigation";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

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
        "fixed z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nangell-electric motion-reduce:transition-none motion-reduce:hover:scale-100",
        "right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] sm:right-6 sm:bottom-6",
        className,
      )}
      onClick={() =>
        trackEvent("click_whatsapp", {
          location: "floating_button",
        })
      }
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
