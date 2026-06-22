"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { FormSection } from "@/components/admin/form-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Toast, useToast } from "@/components/ui/toast";
import {
  SITE_SETTING_KEYS,
  type SiteSettingsFormInput,
} from "@/lib/validations/settings";

const SETTING_LABELS: Record<(typeof SITE_SETTING_KEYS)[number], string> = {
  site_name: "Nome do site",
  site_tagline: "Tagline",
  contact_email: "E-mail de contato",
  contact_phone: "Telefone",
  whatsapp_number: "WhatsApp",
  address: "Endereço",
  social_linkedin: "LinkedIn",
  social_instagram: "Instagram",
  social_github: "GitHub",
  default_seo_title: "SEO — título padrão",
  default_seo_description: "SEO — descrição padrão",
  maintenance_mode: "Modo manutenção",
};

const SETTING_HINTS: Partial<Record<(typeof SITE_SETTING_KEYS)[number], string>> = {
  social_linkedin: "Deixe em branco se não houver",
  social_instagram: "Deixe em branco se não houver",
  social_github: "Deixe em branco se não houver",
  whatsapp_number: "Somente números, com DDI (ex: 5561982015585)",
};

function emptySettings(): SiteSettingsFormInput {
  return {
    site_name: "",
    site_tagline: "",
    contact_email: "",
    contact_phone: "",
    whatsapp_number: "",
    address: "",
    social_linkedin: "",
    social_instagram: "",
    social_github: "",
    default_seo_title: "",
    default_seo_description: "",
    maintenance_mode: "false",
  };
}

export function SettingsAdminPanel() {
  const { toast, showToast, dismiss } = useToast();

  const [form, setForm] = useState<SiteSettingsFormInput>(emptySettings());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/settings");
      if (!response.ok) throw new Error("fetch_failed");
      const data = (await response.json()) as SiteSettingsFormInput;
      setForm({ ...emptySettings(), ...data });
    } catch {
      showToast("Não foi possível carregar as configurações.", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    void fetchSettings();
  }, [fetchSettings]);

  function updateField<K extends keyof SiteSettingsFormInput>(
    key: K,
    value: SiteSettingsFormInput[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function saveSettings() {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || !result.success) {
        showToast(result.error ?? "Erro ao salvar configurações.", "error");
        return;
      }

      showToast("Configurações salvas com sucesso.");
    } catch {
      showToast("Não foi possível salvar as configurações.", "error");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-nangell-cyan" aria-hidden />
        <span className="sr-only">Carregando configurações...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-nangell-text sm:text-3xl">
          Configurações
        </h1>
        <p className="mt-1 text-sm text-nangell-muted">
          Parâmetros globais do site Nangell Creative Studio.
        </p>
      </div>

      <FormSection title="Identidade">
        <Input
          label={SETTING_LABELS.site_name}
          value={form.site_name}
          onChange={(event) => updateField("site_name", event.target.value)}
        />
        <Input
          label={SETTING_LABELS.site_tagline}
          value={form.site_tagline}
          onChange={(event) => updateField("site_tagline", event.target.value)}
        />
      </FormSection>

      <FormSection title="Contato">
        <Input
          label={SETTING_LABELS.contact_email}
          type="email"
          value={form.contact_email}
          onChange={(event) => updateField("contact_email", event.target.value)}
        />
        <Input
          label={SETTING_LABELS.contact_phone}
          value={form.contact_phone}
          onChange={(event) => updateField("contact_phone", event.target.value)}
        />
        <Input
          label={SETTING_LABELS.whatsapp_number}
          value={form.whatsapp_number}
          onChange={(event) => updateField("whatsapp_number", event.target.value)}
          hint={SETTING_HINTS.whatsapp_number}
        />
        <Textarea
          label={SETTING_LABELS.address}
          value={form.address}
          onChange={(event) => updateField("address", event.target.value)}
        />
      </FormSection>

      <FormSection title="Redes sociais">
        {(["social_linkedin", "social_instagram", "social_github"] as const).map((key) => (
          <Input
            key={key}
            label={SETTING_LABELS[key]}
            type="url"
            value={form[key]}
            onChange={(event) => updateField(key, event.target.value)}
            hint={SETTING_HINTS[key]}
          />
        ))}
      </FormSection>

      <FormSection title="SEO padrão">
        <Input
          label={SETTING_LABELS.default_seo_title}
          value={form.default_seo_title}
          onChange={(event) => updateField("default_seo_title", event.target.value)}
        />
        <Textarea
          label={SETTING_LABELS.default_seo_description}
          value={form.default_seo_description}
          onChange={(event) => updateField("default_seo_description", event.target.value)}
        />
      </FormSection>

      <FormSection title="Sistema">
        <Select
          label={SETTING_LABELS.maintenance_mode}
          value={form.maintenance_mode}
          onChange={(event) =>
            updateField("maintenance_mode", event.target.value as "true" | "false")
          }
          options={[
            { label: "Desativado", value: "false" },
            { label: "Ativado", value: "true" },
          ]}
          hint="Quando ativado, visitantes veem página de manutenção"
        />
      </FormSection>

      <div className="flex justify-end">
        <Button variant="primary" onClick={() => void saveSettings()} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Salvando...
            </>
          ) : (
            "Salvar configurações"
          )}
        </Button>
      </div>

      <Toast toast={toast} onDismiss={dismiss} />
    </div>
  );
}
