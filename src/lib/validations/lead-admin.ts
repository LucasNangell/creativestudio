import { LeadStatus } from "@prisma/client";
import { z } from "zod";

export const leadUpdateSchema = z.object({
  status: z.nativeEnum(LeadStatus).optional(),
  internalNotes: z.string().max(10000).optional().nullable(),
});

export type LeadUpdateInput = z.infer<typeof leadUpdateSchema>;

export const LEAD_STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: LeadStatus.NOVO, label: "Novo" },
  { value: LeadStatus.CONTATO, label: "Contato" },
  { value: LeadStatus.REUNIAO, label: "Reunião" },
  { value: LeadStatus.PROPOSTA, label: "Proposta" },
  { value: LeadStatus.FECHADO, label: "Fechado" },
  { value: LeadStatus.PERDIDO, label: "Perdido" },
];
