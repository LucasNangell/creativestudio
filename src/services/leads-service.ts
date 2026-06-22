import { LeadStatus } from "@prisma/client";

import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import {
  normalizeEmail,
  normalizePhone,
  sanitizeOptionalText,
  sanitizeText,
} from "@/lib/sanitize";
import {
  buildDiagnosticChallengeText,
  getBudgetRangeLabel,
  getProjectTypeLabel,
  getUrgencyLabel,
  type ContactLeadInput,
  type DiagnosticLeadInput,
} from "@/lib/validations/lead";

export type CreateLeadResult =
  | { success: true; id: string }
  | { success: false; error: string };

export async function createDiagnosticLead(
  data: DiagnosticLeadInput,
): Promise<CreateLeadResult> {
  try {
    const lead = await prisma.lead.create({
      data: {
        name: sanitizeText(data.name, 255),
        email: normalizeEmail(data.email),
        phone: normalizePhone(data.phone),
        company: sanitizeText(data.company, 255),
        website: sanitizeOptionalText(data.website),
        projectType: getProjectTypeLabel(data.projectType),
        challenge: buildDiagnosticChallengeText(data),
        budgetRange: getBudgetRangeLabel(data.budgetRange),
        urgency: getUrgencyLabel(data.urgency),
        preferredContact: sanitizeText(data.preferredContact, 50),
        message: sanitizeOptionalText(
          `Melhor horário: ${data.bestTime}`,
          500,
        ),
        sourcePage: "/diagnostico",
        sourceDemo: sanitizeOptionalText(data.source_demo ?? undefined),
        utmSource: sanitizeOptionalText(data.utm_source ?? undefined),
        utmMedium: sanitizeOptionalText(data.utm_medium ?? undefined),
        utmCampaign: sanitizeOptionalText(data.utm_campaign ?? undefined),
        consent: true,
        status: LeadStatus.NOVO,
      },
    });

    return { success: true, id: lead.id };
  } catch (error) {
    logger.error("[leads-service] createDiagnosticLead", error);
    return {
      success: false,
      error: "Não foi possível salvar seu diagnóstico. Tente novamente em instantes.",
    };
  }
}

export async function createContactLead(
  data: ContactLeadInput,
): Promise<CreateLeadResult> {
  try {
    const lead = await prisma.lead.create({
      data: {
        name: sanitizeText(data.name, 255),
        email: normalizeEmail(data.email),
        phone: normalizePhone(data.phone),
        company: sanitizeText(data.company ?? "Não informado", 255),
        website: null,
        projectType: "Contato rápido",
        challenge: sanitizeText(data.message, 5000),
        budgetRange: "Não informado",
        urgency: "Não informado",
        preferredContact: "whatsapp",
        message: sanitizeText(data.message, 5000),
        sourcePage: "/contato",
        sourceDemo: sanitizeOptionalText(data.source_demo ?? undefined),
        utmSource: sanitizeOptionalText(data.utm_source ?? undefined),
        utmMedium: sanitizeOptionalText(data.utm_medium ?? undefined),
        utmCampaign: sanitizeOptionalText(data.utm_campaign ?? undefined),
        consent: true,
        status: LeadStatus.NOVO,
      },
    });

    return { success: true, id: lead.id };
  } catch (error) {
    logger.error("[leads-service] createContactLead", error);
    return {
      success: false,
      error: "Não foi possível enviar sua mensagem. Tente novamente em instantes.",
    };
  }
}
