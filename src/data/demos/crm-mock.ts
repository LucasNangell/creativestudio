export type CrmLeadStatus =
  | "novo"
  | "qualificado"
  | "proposta"
  | "negociacao"
  | "fechado";

export type CrmLeadOrigin =
  | "Site"
  | "WhatsApp"
  | "Indicação"
  | "LinkedIn"
  | "Evento";

export type CrmInteraction = {
  id: string;
  type: "email" | "call" | "whatsapp" | "meeting" | "note";
  message: string;
  date: string;
};

export type CrmLead = {
  id: string;
  nome: string;
  empresa: string;
  telefone: string;
  email: string;
  origem: CrmLeadOrigin;
  interesse: string;
  valorEstimado: number;
  status: CrmLeadStatus;
  responsavel: string;
  ultimaInteracao: string;
  interactions: CrmInteraction[];
};

export const CRM_COLUMNS: { id: CrmLeadStatus; label: string }[] = [
  { id: "novo", label: "Novos" },
  { id: "qualificado", label: "Qualificados" },
  { id: "proposta", label: "Proposta" },
  { id: "negociacao", label: "Negociação" },
  { id: "fechado", label: "Fechados" },
];

export const CRM_MOCK_LEADS: CrmLead[] = [
  {
    id: "lead-1",
    nome: "Mariana Costa",
    empresa: "LogiPrime Transportes",
    telefone: "(11) 98765-4321",
    email: "mariana.costa@logiprime.demo",
    origem: "Site",
    interesse: "CRM + automação comercial",
    valorEstimado: 48000,
    status: "novo",
    responsavel: "Ana Souza",
    ultimaInteracao: "Há 2 horas",
    interactions: [
      { id: "i1", type: "email", message: "Formulário preenchido no site.", date: "21/06 09:12" },
    ],
  },
  {
    id: "lead-2",
    nome: "Ricardo Mendes",
    empresa: "Clínica Vida Plena",
    telefone: "(21) 99876-5432",
    email: "ricardo.m@vidaplena.demo",
    origem: "WhatsApp",
    interesse: "Gestão de pacientes e follow-up",
    valorEstimado: 32000,
    status: "qualificado",
    responsavel: "Bruno Lima",
    ultimaInteracao: "Ontem",
    interactions: [
      { id: "i2", type: "whatsapp", message: "Demonstrou interesse em integração WhatsApp.", date: "20/06 14:30" },
      { id: "i3", type: "call", message: "Call de discovery — 45 min.", date: "20/06 16:00" },
    ],
  },
  {
    id: "lead-3",
    nome: "Fernanda Alves",
    empresa: "AgroTech Sul",
    telefone: "(51) 99123-4567",
    email: "fernanda@agrotechsul.demo",
    origem: "Indicação",
    interesse: "Dashboard operacional + CRM",
    valorEstimado: 95000,
    status: "proposta",
    responsavel: "Ana Souza",
    ultimaInteracao: "Há 3 dias",
    interactions: [
      { id: "i4", type: "meeting", message: "Apresentação da proposta comercial.", date: "18/06 10:00" },
    ],
  },
  {
    id: "lead-4",
    nome: "Paulo Henrique",
    empresa: "MetalForm Indústria",
    telefone: "(31) 98888-7777",
    email: "paulo.h@metalform.demo",
    origem: "LinkedIn",
    interesse: "ERP integrado ao funil",
    valorEstimado: 120000,
    status: "negociacao",
    responsavel: "Carla Dias",
    ultimaInteracao: "Há 1 semana",
    interactions: [
      { id: "i5", type: "note", message: "Aguardando aprovação do board.", date: "14/06 11:20" },
    ],
  },
  {
    id: "lead-5",
    nome: "Juliana Rocha",
    empresa: "EduPrime Cursos",
    telefone: "(41) 97777-6666",
    email: "juliana@eduprime.demo",
    origem: "Evento",
    interesse: "Plataforma educacional + CRM",
    valorEstimado: 67000,
    status: "fechado",
    responsavel: "Bruno Lima",
    ultimaInteracao: "Há 2 semanas",
    interactions: [
      { id: "i6", type: "email", message: "Contrato assinado — kickoff agendado.", date: "07/06 09:00" },
    ],
  },
  {
    id: "lead-6",
    nome: "Eduardo Silva",
    empresa: "FastRetail E-commerce",
    telefone: "(11) 91234-5678",
    email: "eduardo@fastretail.demo",
    origem: "Site",
    interesse: "Automação de vendas B2B",
    valorEstimado: 54000,
    status: "novo",
    responsavel: "Carla Dias",
    ultimaInteracao: "Há 30 min",
    interactions: [
      { id: "i7", type: "whatsapp", message: "Solicitou demonstração personalizada.", date: "21/06 11:45" },
    ],
  },
  {
    id: "lead-7",
    nome: "Beatriz Nunes",
    empresa: "SolarGrid Energia",
    telefone: "(85) 98888-1111",
    email: "beatriz@solargrid.demo",
    origem: "LinkedIn",
    interesse: "CRM para equipe de campo",
    valorEstimado: 78000,
    status: "qualificado",
    responsavel: "Ana Souza",
    ultimaInteracao: "Há 2 dias",
    interactions: [
      { id: "i8", type: "call", message: "Validou escopo técnico.", date: "19/06 15:30" },
    ],
  },
  {
    id: "lead-8",
    nome: "Lucas Ferreira",
    empresa: "HealthPlus Labs",
    telefone: "(19) 97777-2222",
    email: "lucas@healthplus.demo",
    origem: "Indicação",
    interesse: "Integração laboratorial",
    valorEstimado: 41000,
    status: "proposta",
    responsavel: "Bruno Lima",
    ultimaInteracao: "Há 4 dias",
    interactions: [
      { id: "i9", type: "meeting", message: "Revisão de escopo e cronograma.", date: "17/06 14:00" },
    ],
  },
];

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}
