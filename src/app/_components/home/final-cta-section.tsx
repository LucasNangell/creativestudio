import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { CtaSection } from "@/components/layout/cta-section";
import { buttonVariants } from "@/components/ui/button";
import { homeFinalCta } from "@/data/home";
import { buildWhatsAppUrl } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function FinalCtaSection() {
  return (
    <CtaSection
      title={homeFinalCta.title}
      description={homeFinalCta.description}
      variant="gradient"
    >
      <Link
        href={homeFinalCta.primaryCta.href}
        className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
      >
        {homeFinalCta.primaryCta.label}
      </Link>
      <a
        href={buildWhatsAppUrl(
          "Olá! Tenho uma ideia ou processo que gostaria de transformar em software.",
        )}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          buttonVariants({ variant: "outline", size: "lg" }),
          "gap-2",
        )}
      >
        <MessageCircle className="h-4 w-4" aria-hidden />
        {homeFinalCta.whatsappCta.label}
      </a>
    </CtaSection>
  );
}
