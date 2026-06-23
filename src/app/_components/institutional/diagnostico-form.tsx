"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Loader2, Save } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toast, useToast } from "@/components/ui/toast";
import {
  DIAGNOSTIC_DRAFT_STORAGE_KEY,
  diagnosticoSteps,
  LEAD_API_ENDPOINT,
  LEAD_SUCCESS_STORAGE_KEY,
} from "@/data/institutional/diagnostico";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import {
  BUDGET_RANGE_OPTIONS,
  DIAGNOSTIC_STEP_FIELDS,
  DIAGNOSTIC_STEP_SCHEMAS,
  PAIN_CATEGORY_OPTIONS,
  PREFERRED_CONTACT_OPTIONS,
  PROJECT_MOMENT_OPTIONS,
  PROJECT_TYPE_OPTIONS,
  URGENCY_OPTIONS,
  diagnosticLeadSchema,
  getProjectTypeLabel,
  type DiagnosticLeadInput,
} from "@/lib/validations/lead";

const defaultValues: Partial<DiagnosticLeadInput> = {
  name: "",
  email: "",
  phone: "",
  company: "",
  website: "",
  projectType: undefined,
  challengeDescription: "",
  painCategory: undefined,
  projectMoment: undefined,
  urgency: undefined,
  desiredDeadline: "",
  budgetRange: undefined,
  bestTime: "",
  preferredContact: undefined,
  consent: undefined,
  source_page: "/diagnostico",
  website_url: "",
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-1.5 text-xs text-red-400">
      {message}
    </p>
  );
}

export function DiagnosticoForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const { toast, showToast, dismiss } = useToast();

  const form = useForm<DiagnosticLeadInput>({
    resolver: zodResolver(diagnosticLeadSchema),
    defaultValues,
    mode: "onTouched",
  });

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = form;

  useEffect(() => {
    const utmSource = searchParams.get("utm_source");
    const utmMedium = searchParams.get("utm_medium");
    const utmCampaign = searchParams.get("utm_campaign");
    const sourceDemo = searchParams.get("demo") ?? searchParams.get("source_demo");

    if (utmSource) setValue("utm_source", utmSource);
    if (utmMedium) setValue("utm_medium", utmMedium);
    if (utmCampaign) setValue("utm_campaign", utmCampaign);
    if (sourceDemo) setValue("source_demo", sourceDemo);

    try {
      const draft = localStorage.getItem(DIAGNOSTIC_DRAFT_STORAGE_KEY);
      if (draft) {
        const parsed = JSON.parse(draft) as Partial<DiagnosticLeadInput>;
        reset({ ...defaultValues, ...parsed, source_page: "/diagnostico" });
      }
    } catch {
      /* ignore */
    }
  }, [searchParams, reset, setValue]);

  const saveDraft = useCallback(() => {
    try {
      localStorage.setItem(
        DIAGNOSTIC_DRAFT_STORAGE_KEY,
        JSON.stringify(getValues()),
      );
      setDraftSaved(true);
      showToast("Rascunho salvo neste navegador.", "success");
      setTimeout(() => setDraftSaved(false), 2000);
      trackEvent("demo_interaction", {
        demoId: "diagnostico",
        action: "save_draft",
      });
    } catch {
      showToast("Não foi possível salvar o rascunho.", "error");
    }
  }, [getValues, showToast]);

  const goNext = async () => {
    const fields = DIAGNOSTIC_STEP_FIELDS[step];
    const valid = await trigger(fields);
    if (!valid) {
      showToast("Revise os campos destacados antes de continuar.", "error");
      return;
    }
    setStep((s) => Math.min(s + 1, diagnosticoSteps.length - 1));
    trackEvent("demo_interaction", {
      demoId: "diagnostico",
      action: "step_next",
      value: step + 1,
    });
  };

  const goBack = () => {
    setStep((s) => Math.max(s - 1, 0));
    trackEvent("demo_interaction", {
      demoId: "diagnostico",
      action: "step_back",
      value: step,
    });
  };

  const onSubmit = async (data: DiagnosticLeadInput) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(LEAD_API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          consent: true,
          source_page: "/diagnostico",
        }),
      });

      const result = (await response.json()) as {
        success?: boolean;
        error?: string;
        id?: string;
      };

      if (!response.ok || !result.success) {
        showToast(
          result.error ?? "Não foi possível enviar. Tente novamente.",
          "error",
        );
        return;
      }

      localStorage.removeItem(DIAGNOSTIC_DRAFT_STORAGE_KEY);
      sessionStorage.setItem(
        LEAD_SUCCESS_STORAGE_KEY,
        JSON.stringify({
          type: "diagnostico",
          name: data.name,
          company: data.company,
          projectType: getProjectTypeLabel(data.projectType),
        }),
      );

      trackEvent("submit_diagnostico", {
        page: "/diagnostico",
        label: data.projectType,
        action: "submit_success",
      });

      showToast("Diagnóstico enviado com sucesso!", "success");
      router.push("/obrigado");
    } catch {
      showToast("Erro de conexão. Verifique sua internet e tente novamente.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((step + 1) / diagnosticoSteps.length) * 100;
  const currentStepMeta = diagnosticoSteps[step]!;

  return (
    <>
      <Toast toast={toast} onDismiss={dismiss} />

      <div className="glass-card p-6 sm:p-8">
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="font-medium text-nangell-text">
              Etapa {step + 1} de {diagnosticoSteps.length}
            </span>
            <span className="text-nangell-muted">{Math.round(progress)}%</span>
          </div>
          <div
            className="h-2 overflow-hidden rounded-full bg-nangell-surface"
            role="progressbar"
            aria-valuenow={step + 1}
            aria-valuemin={1}
            aria-valuemax={diagnosticoSteps.length}
            aria-label="Progresso do formulário"
          >
            <div
              className="h-full rounded-full bg-nangell-gradient transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-4 hidden gap-2 sm:flex">
            {diagnosticoSteps.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors",
                  index <= step ? "bg-nangell-cyan" : "bg-nangell-surface",
                )}
                aria-hidden
              />
            ))}
          </div>
          <h2 className="mt-4 font-heading text-xl font-semibold text-nangell-text">
            {currentStepMeta.title}
          </h2>
          <p className="mt-1 text-sm text-nangell-muted">{currentStepMeta.description}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
            {...register("website_url")}
          />

          {step === 0 ? (
            <div className="space-y-5">
              <div>
                <Input
                  label="Nome completo *"
                  autoComplete="name"
                  error={errors.name?.message}
                  disabled={isSubmitting}
                  {...register("name")}
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Input
                    label="E-mail *"
                    type="email"
                    autoComplete="email"
                    error={errors.email?.message}
                    disabled={isSubmitting}
                    {...register("email")}
                  />
                </div>
                <div>
                  <Input
                    label="WhatsApp *"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(61) 98201-5585"
                    error={errors.phone?.message}
                    disabled={isSubmitting}
                    {...register("phone")}
                  />
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Input
                    label="Empresa *"
                    autoComplete="organization"
                    error={errors.company?.message}
                    disabled={isSubmitting}
                    {...register("company")}
                  />
                </div>
                <div>
                  <Input
                    label="Site ou Instagram"
                    placeholder="https:// ou @usuario"
                    hint="Opcional, ajuda a entender seu contexto"
                    error={errors.website?.message}
                    disabled={isSubmitting}
                    {...register("website")}
                  />
                </div>
              </div>
            </div>
          ) : null}

          {step === 1 ? (
            <fieldset className="space-y-3">
              <legend className="sr-only">Tipo de projeto</legend>
              {PROJECT_TYPE_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-nangell border px-4 py-3 transition-colors",
                    watch("projectType") === option.value
                      ? "border-nangell-cyan/50 bg-nangell-gradient-subtle"
                      : "border-glass-border hover:border-nangell-electric/30",
                  )}
                >
                  <input
                    type="radio"
                    value={option.value}
                    className="accent-nangell-cyan"
                    disabled={isSubmitting}
                    {...register("projectType")}
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
              <FieldError message={errors.projectType?.message} />
            </fieldset>
          ) : null}

          {step === 2 ? (
            <div className="space-y-5">
              <Textarea
                label="Descrição do problema *"
                rows={5}
                placeholder="Conte o que acontece hoje, o que trava sua operação ou o que você quer automatizar..."
                error={errors.challengeDescription?.message}
                disabled={isSubmitting}
                {...register("challengeDescription")}
              />
              <Select
                label="Categoria da dor *"
                options={PAIN_CATEGORY_OPTIONS.map((o) => ({
                  label: o.label,
                  value: o.value,
                }))}
                placeholder="Selecione..."
                error={errors.painCategory?.message}
                disabled={isSubmitting}
                {...register("painCategory")}
              />
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-5">
              <fieldset className="space-y-3">
                <legend className="mb-2 block text-sm font-medium text-nangell-text">
                  Momento do projeto *
                </legend>
                {PROJECT_MOMENT_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-nangell border px-4 py-3",
                      watch("projectMoment") === option.value
                        ? "border-nangell-cyan/50 bg-nangell-gradient-subtle"
                        : "border-glass-border",
                    )}
                  >
                    <input
                      type="radio"
                      value={option.value}
                      className="accent-nangell-cyan"
                      disabled={isSubmitting}
                      {...register("projectMoment")}
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
                <FieldError message={errors.projectMoment?.message} />
              </fieldset>
              <Select
                label="Urgência *"
                options={URGENCY_OPTIONS.map((o) => ({
                  label: o.label,
                  value: o.value,
                }))}
                placeholder="Selecione..."
                error={errors.urgency?.message}
                disabled={isSubmitting}
                {...register("urgency")}
              />
              <Input
                label="Prazo desejado *"
                placeholder="Ex.: até setembro, Q3, 60 dias..."
                error={errors.desiredDeadline?.message}
                disabled={isSubmitting}
                {...register("desiredDeadline")}
              />
            </div>
          ) : null}

          {step === 4 ? (
            <fieldset className="space-y-3">
              <legend className="mb-2 block text-sm font-medium text-nangell-text">
                Faixa de investimento estimada *
              </legend>
              {BUDGET_RANGE_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-nangell border px-4 py-3",
                    watch("budgetRange") === option.value
                      ? "border-nangell-cyan/50 bg-nangell-gradient-subtle"
                      : "border-glass-border",
                  )}
                >
                  <input
                    type="radio"
                    value={option.value}
                    className="accent-nangell-cyan"
                    disabled={isSubmitting}
                    {...register("budgetRange")}
                  />
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
              <FieldError message={errors.budgetRange?.message} />
            </fieldset>
          ) : null}

          {step === 5 ? (
            <div className="space-y-5">
              <Input
                label="Melhor horário para contato *"
                placeholder="Ex.: manhãs, após 18h, terças e quintas..."
                error={errors.bestTime?.message}
                disabled={isSubmitting}
                {...register("bestTime")}
              />
              <Select
                label="Preferência de contato *"
                options={PREFERRED_CONTACT_OPTIONS.map((o) => ({
                  label: o.label,
                  value: o.value,
                }))}
                placeholder="Selecione..."
                error={errors.preferredContact?.message}
                disabled={isSubmitting}
                {...register("preferredContact")}
              />
              <div>
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 accent-nangell-cyan"
                    disabled={isSubmitting}
                    {...register("consent")}
                  />
                  <span className="text-sm leading-relaxed text-nangell-muted">
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
                </label>
                <FieldError message={errors.consent?.message} />
              </div>
            </div>
          ) : null}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {step > 0 ? (
                <Button type="button" variant="outline" onClick={goBack} disabled={isSubmitting}>
                  <ArrowLeft className="h-4 w-4" aria-hidden />
                  Voltar
                </Button>
              ) : null}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={saveDraft}
                disabled={isSubmitting}
              >
                <Save className="h-4 w-4" aria-hidden />
                {draftSaved ? "Salvo!" : "Salvar rascunho"}
              </Button>
            </div>

            {step < diagnosticoSteps.length - 1 ? (
              <Button type="button" onClick={goNext} disabled={isSubmitting}>
                Avançar
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    Enviando diagnóstico...
                  </>
                ) : (
                  "Enviar diagnóstico"
                )}
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
