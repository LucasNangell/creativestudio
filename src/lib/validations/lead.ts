import { z } from "zod";

export const PROJECT_TYPE_OPTIONS = [
  { value: "sistema_web", label: "Sistema web" },
  { value: "app_mobile", label: "App mobile" },
  { value: "sistema_desktop", label: "Sistema desktop" },
  { value: "automacao", label: "Automação" },
  { value: "dashboard_bi", label: "Dashboard / BI" },
  { value: "site_institucional", label: "Site institucional" },
  { value: "landing_page", label: "Landing page" },
  { value: "saas", label: "SaaS" },
  { value: "crm", label: "CRM" },
  { value: "plataforma_educacional", label: "Plataforma educacional" },
  { value: "nao_sei", label: "Ainda não sei exatamente" },
] as const;

export const PAIN_CATEGORY_OPTIONS = [
  { value: "processo_manual", label: "Processo manual" },
  { value: "falta_controle", label: "Falta de controle" },
  { value: "sistema_antigo", label: "Sistema antigo" },
  { value: "baixa_conversao", label: "Baixa conversão" },
  { value: "falta_dados", label: "Falta de dados" },
  { value: "atendimento_desorganizado", label: "Atendimento desorganizado" },
  { value: "produto_digital", label: "Produto digital" },
  { value: "outro", label: "Outro" },
] as const;

export const PROJECT_MOMENT_OPTIONS = [
  { value: "ideia", label: "Tenho uma ideia inicial" },
  { value: "melhoria", label: "Quero melhorar algo existente" },
  { value: "sistema_existente", label: "Já tenho sistema e preciso evoluir" },
] as const;

export const URGENCY_OPTIONS = [
  { value: "baixa", label: "Baixa — posso aguardar" },
  { value: "media", label: "Média — próximos 2–3 meses" },
  { value: "alta", label: "Alta — preciso resolver logo" },
  { value: "critica", label: "Crítica — impacto operacional imediato" },
] as const;

export const BUDGET_RANGE_OPTIONS = [
  { value: "ate_2000", label: "Até R$ 2.000" },
  { value: "2000_5000", label: "R$ 2.000 a R$ 5.000" },
  { value: "5000_10000", label: "R$ 5.000 a R$ 10.000" },
  { value: "10000_25000", label: "R$ 10.000 a R$ 25.000" },
  { value: "acima_25000", label: "Acima de R$ 25.000" },
  { value: "nao_sei", label: "Ainda não sei" },
] as const;

export const PREFERRED_CONTACT_OPTIONS = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "E-mail" },
  { value: "telefone", label: "Telefone" },
] as const;

const phoneSchema = z
  .string()
  .min(1, "Informe seu WhatsApp.")
  .refine((value) => value.replace(/\D/g, "").length >= 10, {
    message: "Informe um número válido com DDD.",
  });

const emailSchema = z
  .string()
  .min(1, "Informe seu e-mail.")
  .email("Informe um e-mail válido.");

export const diagnosticStep1Schema = z.object({
  name: z
    .string()
    .min(1, "Informe seu nome completo.")
    .min(2, "Nome deve ter pelo menos 2 caracteres.")
    .max(255),
  email: emailSchema,
  phone: phoneSchema,
  company: z
    .string()
    .min(1, "Informe o nome da empresa.")
    .min(2, "Empresa deve ter pelo menos 2 caracteres.")
    .max(255),
  website: z.string().max(255).optional().or(z.literal("")),
});

export const diagnosticStep2Schema = z.object({
  projectType: z.enum(
    PROJECT_TYPE_OPTIONS.map((o) => o.value) as [
      (typeof PROJECT_TYPE_OPTIONS)[number]["value"],
      ...(typeof PROJECT_TYPE_OPTIONS)[number]["value"][],
    ],
    { message: "Selecione o tipo de projeto." },
  ),
});

export const diagnosticStep3Schema = z.object({
  challengeDescription: z
    .string()
    .min(1, "Descreva o desafio.")
    .min(20, "Descreva com pelo menos 20 caracteres.")
    .max(5000),
  painCategory: z.enum(
    PAIN_CATEGORY_OPTIONS.map((o) => o.value) as [
      (typeof PAIN_CATEGORY_OPTIONS)[number]["value"],
      ...(typeof PAIN_CATEGORY_OPTIONS)[number]["value"][],
    ],
    { message: "Selecione a categoria da dor." },
  ),
});

export const diagnosticStep4Schema = z.object({
  projectMoment: z.enum(
    PROJECT_MOMENT_OPTIONS.map((o) => o.value) as [
      (typeof PROJECT_MOMENT_OPTIONS)[number]["value"],
      ...(typeof PROJECT_MOMENT_OPTIONS)[number]["value"][],
    ],
    { message: "Selecione o momento do projeto." },
  ),
  urgency: z.enum(
    URGENCY_OPTIONS.map((o) => o.value) as [
      (typeof URGENCY_OPTIONS)[number]["value"],
      ...(typeof URGENCY_OPTIONS)[number]["value"][],
    ],
    { message: "Selecione a urgência." },
  ),
  desiredDeadline: z
    .string()
    .min(1, "Informe o prazo desejado.")
    .max(255),
});

export const diagnosticStep5Schema = z.object({
  budgetRange: z.enum(
    BUDGET_RANGE_OPTIONS.map((o) => o.value) as [
      (typeof BUDGET_RANGE_OPTIONS)[number]["value"],
      ...(typeof BUDGET_RANGE_OPTIONS)[number]["value"][],
    ],
    { message: "Selecione a faixa de investimento." },
  ),
});

export const diagnosticStep6Schema = z.object({
  bestTime: z
    .string()
    .min(1, "Informe o melhor horário para contato.")
    .max(255),
  preferredContact: z.enum(
    PREFERRED_CONTACT_OPTIONS.map((o) => o.value) as [
      (typeof PREFERRED_CONTACT_OPTIONS)[number]["value"],
      ...(typeof PREFERRED_CONTACT_OPTIONS)[number]["value"][],
    ],
    { message: "Selecione a preferência de contato." },
  ),
  consent: z
    .boolean()
    .refine((value) => value === true, {
      message: "É necessário aceitar a Política de Privacidade.",
    }),
});

export const diagnosticLeadSchema = diagnosticStep1Schema
  .merge(diagnosticStep2Schema)
  .merge(diagnosticStep3Schema)
  .merge(diagnosticStep4Schema)
  .merge(diagnosticStep5Schema)
  .merge(diagnosticStep6Schema)
  .extend({
    source_page: z.literal("/diagnostico"),
    source_demo: z.string().max(255).optional().nullable(),
    utm_source: z.string().max(255).optional().nullable(),
    utm_medium: z.string().max(255).optional().nullable(),
    utm_campaign: z.string().max(255).optional().nullable(),
    website_url: z.string().max(0).optional().or(z.literal("")),
  });

export type DiagnosticLeadInput = z.infer<typeof diagnosticLeadSchema>;

export const contactLeadSchema = z.object({
  name: z.string().min(2, "Informe seu nome completo.").max(255),
  email: emailSchema,
  phone: phoneSchema,
  company: z.string().max(255).optional().nullable(),
  message: z
    .string()
    .min(10, "Descreva sua mensagem com pelo menos 10 caracteres.")
    .max(5000),
  consent: z
    .boolean()
    .refine((value) => value === true, {
      message: "É necessário aceitar a Política de Privacidade.",
    }),
  source_page: z.literal("/contato"),
  source_demo: z.string().max(255).optional().nullable(),
  utm_source: z.string().max(255).optional().nullable(),
  utm_medium: z.string().max(255).optional().nullable(),
  utm_campaign: z.string().max(255).optional().nullable(),
  website_url: z.string().max(0).optional().or(z.literal("")),
});

export type ContactLeadInput = z.infer<typeof contactLeadSchema>;

export const leadApiPayloadSchema = z.discriminatedUnion("source_page", [
  diagnosticLeadSchema,
  contactLeadSchema,
]);

export type LeadApiPayload = z.infer<typeof leadApiPayloadSchema>;

export const DIAGNOSTIC_STEP_SCHEMAS = [
  diagnosticStep1Schema,
  diagnosticStep2Schema,
  diagnosticStep3Schema,
  diagnosticStep4Schema,
  diagnosticStep5Schema,
  diagnosticStep6Schema,
] as const;

export const DIAGNOSTIC_STEP_FIELDS: (keyof DiagnosticLeadInput)[][] = [
  ["name", "email", "phone", "company", "website"],
  ["projectType"],
  ["challengeDescription", "painCategory"],
  ["projectMoment", "urgency", "desiredDeadline"],
  ["budgetRange"],
  ["bestTime", "preferredContact", "consent"],
];

export function getOptionLabel<T extends { value: string; label: string }>(
  options: readonly T[],
  value: string,
): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

export function buildDiagnosticChallengeText(data: DiagnosticLeadInput): string {
  return [
    data.challengeDescription.trim(),
    "",
    `Categoria da dor: ${getOptionLabel(PAIN_CATEGORY_OPTIONS, data.painCategory)}`,
    `Momento do projeto: ${getOptionLabel(PROJECT_MOMENT_OPTIONS, data.projectMoment)}`,
    `Prazo desejado: ${data.desiredDeadline.trim()}`,
    `Melhor horário: ${data.bestTime.trim()}`,
  ].join("\n");
}

export function getProjectTypeLabel(value: string): string {
  return getOptionLabel(PROJECT_TYPE_OPTIONS, value);
}

export function getBudgetRangeLabel(value: string): string {
  return getOptionLabel(BUDGET_RANGE_OPTIONS, value);
}

export function getUrgencyLabel(value: string): string {
  return getOptionLabel(URGENCY_OPTIONS, value);
}
