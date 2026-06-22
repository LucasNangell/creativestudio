"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Toast, useToast } from "@/components/ui/toast";
import {
  LEAD_API_ENDPOINT,
  LEAD_SUCCESS_STORAGE_KEY,
} from "@/data/institutional/diagnostico";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { contactLeadSchema, type ContactLeadInput } from "@/lib/validations/lead";

export function ContactForm() {
  const router = useRouter();
  const { toast, showToast, dismiss } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactLeadInput>({
    resolver: zodResolver(contactLeadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      consent: false,
      source_page: "/contato",
      website_url: "",
    },
  });

  async function onSubmit(data: ContactLeadInput) {
    setIsSubmitting(true);

    try {
      const response = await fetch(LEAD_API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          consent: true,
          source_page: "/contato",
        }),
      });

      const result = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || !result.success) {
        showToast(
          result.error ?? "Não foi possível enviar sua mensagem. Tente novamente.",
          "error",
        );
        return;
      }

      sessionStorage.setItem(
        LEAD_SUCCESS_STORAGE_KEY,
        JSON.stringify({
          type: "contato",
          name: data.name,
          company: data.company ?? undefined,
        }),
      );

      trackEvent("submit_contato", {
        page: "/contato",
        label: "contact_form",
        action: "submit_success",
      });

      showToast("Mensagem enviada com sucesso!", "success");
      reset();
      router.push("/obrigado");
    } catch {
      showToast(
        "Erro de conexão. Utilize WhatsApp ou e-mail para contato imediato.",
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Toast toast={toast} onDismiss={dismiss} />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5" aria-busy={isSubmitting}>
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
          {...register("website_url")}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Nome *"
            autoComplete="name"
            error={errors.name?.message}
            disabled={isSubmitting}
            {...register("name")}
          />
          <Input
            label="E-mail *"
            type="email"
            autoComplete="email"
            error={errors.email?.message}
            disabled={isSubmitting}
            {...register("email")}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Telefone / WhatsApp *"
            type="tel"
            autoComplete="tel"
            placeholder="(61) 99999-9999"
            error={errors.phone?.message}
            disabled={isSubmitting}
            {...register("phone")}
          />
          <Input
            label="Empresa"
            autoComplete="organization"
            disabled={isSubmitting}
            {...register("company")}
          />
        </div>

        <Textarea
          label="Mensagem *"
          rows={5}
          placeholder="Conte sobre seu projeto, processo ou desafio operacional..."
          error={errors.message?.message}
          disabled={isSubmitting}
          {...register("message")}
        />

        <div>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              disabled={isSubmitting}
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? "consent-error" : "consent-hint"}
              className={cn(
                "mt-1 h-4 w-4 shrink-0 rounded border-glass-border bg-nangell-surface accent-nangell-cyan",
                errors.consent && "border-red-500/50",
              )}
              {...register("consent")}
            />
            <span className="text-sm leading-relaxed text-nangell-muted">
              <span id="consent-hint">
                Autorizo o tratamento dos meus dados conforme a{" "}
                <Link
                  href="/politica-de-privacidade"
                  className="font-medium text-nangell-cyan underline-offset-2 hover:underline"
                  target="_blank"
                >
                  Política de Privacidade
                </Link>{" "}
                (LGPD). *
              </span>
            </span>
          </label>
          {errors.consent ? (
            <p id="consent-error" role="alert" className="mt-1.5 text-xs text-red-400">
              {errors.consent.message}
            </p>
          ) : null}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Enviando...
            </>
          ) : (
            "Enviar mensagem"
          )}
        </Button>
      </form>
    </>
  );
}
