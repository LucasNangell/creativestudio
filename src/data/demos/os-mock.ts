export type OsStatus = "aberta" | "em_andamento" | "aguardando" | "concluida";

export type OsPriority = "baixa" | "media" | "alta" | "critica";

export type OsTimelineEntry = {
  id: string;
  author: string;
  message: string;
  date: string;
};

export type ServiceOrder = {
  id: string;
  codigo: string;
  titulo: string;
  cliente: string;
  tecnico: string;
  status: OsStatus;
  prioridade: OsPriority;
  endereco: string;
  prazo: string;
  descricao: string;
  timeline: OsTimelineEntry[];
};

export const OS_COLUMNS: { id: OsStatus; label: string }[] = [
  { id: "aberta", label: "Abertas" },
  { id: "em_andamento", label: "Em andamento" },
  { id: "aguardando", label: "Aguardando" },
  { id: "concluida", label: "Concluídas" },
];

export const OS_MOCK_ORDERS: ServiceOrder[] = [
  {
    id: "os-1",
    codigo: "OS-2026-0142",
    titulo: "Manutenção preventiva, ar condicionado",
    cliente: "Hotel Aurora",
    tecnico: "João Pereira",
    status: "aberta",
    prioridade: "media",
    endereco: "Av. Paulista, 1200, São Paulo",
    prazo: "22/06/2026",
    descricao: "Inspeção trimestral das unidades do 3º ao 8º andar.",
    timeline: [
      { id: "t1", author: "Sistema", message: "OS criada automaticamente pelo contrato.", date: "21/06 08:00" },
    ],
  },
  {
    id: "os-2",
    codigo: "OS-2026-0138",
    titulo: "Substituição de compressor industrial",
    cliente: "MetalForm Indústria",
    tecnico: "Carla Mendes",
    status: "em_andamento",
    prioridade: "alta",
    endereco: "Rod. BR-381, km 420, Betim",
    prazo: "21/06/2026",
    descricao: "Compressor linha B parou, produção impactada.",
    timeline: [
      { id: "t2", author: "Carla Mendes", message: "Técnica no local, diagnóstico iniciado.", date: "21/06 07:30" },
      { id: "t3", author: "Carla Mendes", message: "Peça reserva confirmada no estoque.", date: "21/06 09:15" },
    ],
  },
  {
    id: "os-3",
    codigo: "OS-2026-0135",
    titulo: "Instalação de sensores IoT",
    cliente: "AgroTech Sul",
    tecnico: "Rafael Costa",
    status: "aguardando",
    prioridade: "baixa",
    endereco: "Fazenda Horizonte, Pelotas",
    prazo: "25/06/2026",
    descricao: "Aguardando liberação de acesso ao galpão B.",
    timeline: [
      { id: "t4", author: "Rafael Costa", message: "Cliente solicitou reagendamento.", date: "20/06 16:40" },
    ],
  },
  {
    id: "os-4",
    codigo: "OS-2026-0129",
    titulo: "Calibração de equipamentos lab",
    cliente: "HealthPlus Labs",
    tecnico: "Ana Beatriz",
    status: "concluida",
    prioridade: "media",
    endereco: "Rua das Flores, 88, Campinas",
    prazo: "19/06/2026",
    descricao: "Calibração anual, 12 equipamentos.",
    timeline: [
      { id: "t5", author: "Ana Beatriz", message: "Relatório entregue ao cliente.", date: "19/06 17:00" },
    ],
  },
  {
    id: "os-5",
    codigo: "OS-2026-0140",
    titulo: "Emergência, vazamento hidráulico",
    cliente: "Shopping Plaza Norte",
    tecnico: "João Pereira",
    status: "em_andamento",
    prioridade: "critica",
    endereco: "Av. Norte, 500, São Paulo",
    prazo: "21/06/2026",
    descricao: "Vazamento no subsolo, risco operacional.",
    timeline: [
      { id: "t6", author: "Central", message: "OS escalada para prioridade crítica.", date: "21/06 06:00" },
    ],
  },
  {
    id: "os-6",
    codigo: "OS-2026-0131",
    titulo: "Upgrade sistema de refrigeração",
    cliente: "FastRetail E-commerce",
    tecnico: "Rafael Costa",
    status: "aberta",
    prioridade: "alta",
    endereco: "CD Guarulhos, SP",
    prazo: "23/06/2026",
    descricao: "Substituir controladores legacy por versão smart.",
    timeline: [
      { id: "t7", author: "Sistema", message: "Aguardando alocação de técnico.", date: "20/06 11:00" },
    ],
  },
];

export const OS_NOTIFICATIONS = [
  { id: "n1", message: "OS-2026-0140 escalada para crítica", time: "Agora" },
  { id: "n2", message: "Carla Mendes registrou andamento", time: "Há 15 min" },
  { id: "n3", message: "OS-2026-0129 concluída com sucesso", time: "Há 2 h" },
];
