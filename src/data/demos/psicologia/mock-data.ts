export const PSICOLOGIA_POSTS = [
  {
    id: "post-001",
    title: "Quando procurar uma psicóloga?",
    category: "Saúde Mental",
    excerpt:
      "Reconhecer o momento de buscar apoio psicológico nem sempre é simples. Entenda sinais e benefícios da terapia.",
    readTime: 7,
    date: "10/02/2026",
  },
  {
    id: "post-002",
    title: "Como a TCC pode ajudar na ansiedade",
    category: "TCC",
    excerpt:
      "A Terapia Cognitivo-Comportamental oferece ferramentas práticas para compreender e manejar a ansiedade no dia a dia.",
    readTime: 8,
    date: "18/02/2026",
  },
  {
    id: "post-003",
    title: "Terapia Cognitivo-Sexual: um espaço seguro",
    category: "Sexualidade",
    excerpt:
      "Ambiente profissional e sigiloso para falar sobre sexualidade com ética, acolhimento e sem julgamentos.",
    readTime: 6,
    date: "05/03/2026",
  },
  {
    id: "post-004",
    title: "Autoestima e relacionamentos saudáveis",
    category: "Relacionamentos",
    excerpt:
      "Como a terapia pode ajudar a construir limites, autoconhecimento e vínculos mais equilibrados.",
    readTime: 5,
    date: "12/03/2026",
  },
  {
    id: "post-005",
    title: "Terapia online: o que esperar da primeira sessão",
    category: "Saúde Mental",
    excerpt:
      "Entenda como funciona o atendimento por videochamada e o que levar para a consulta inicial.",
    readTime: 4,
    date: "20/03/2026",
  },
] as const;

export const PSICOLOGIA_APPOINTMENTS = [
  {
    id: "a1",
    name: "João Demo Silva",
    email: "joao.demo@exemplo.com",
    phone: "(00) 90001-0001",
    status: "novo",
    date: "23/06/2026",
    time: "09:30",
    type: "Online",
  },
  {
    id: "a2",
    name: "Maria Exemplo Santos",
    email: "maria.exemplo@empresa-demo.com",
    phone: "(00) 90002-0002",
    status: "em_analise",
    date: "25/06/2026",
    time: "14:00",
    type: "Presencial",
  },
  {
    id: "a3",
    name: "Carlos Demonstração Lima",
    email: "carlos.demo@exemplo.com",
    phone: "(00) 90003-0003",
    status: "confirmado",
    date: "24/06/2026",
    time: "11:00",
    type: "Online",
  },
  {
    id: "a4",
    name: "Ana Demonstração",
    email: "ana.demo@exemplo.com",
    phone: "(00) 90004-0004",
    status: "confirmado",
    date: "27/06/2026",
    time: "10:00",
    type: "Presencial",
  },
  {
    id: "a5",
    name: "Pedro Exemplo",
    email: "pedro.exemplo@empresa-demo.com",
    phone: "(00) 90005-0005",
    status: "cancelado",
    date: "20/06/2026",
    time: "16:30",
    type: "Online",
  },
] as const;

export type PsicologiaAppointment = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  date: string;
  time: string;
  type: string;
};

export const PSICOLOGIA_FAQ = [
  {
    q: "Como funciona a primeira consulta?",
    a: "É um momento de acolhimento para entender sua demanda, tirar dúvidas e combinar a continuidade do processo.",
  },
  {
    q: "Atende online e presencial?",
    a: "Sim. Você escolhe a modalidade mais confortável. Todos os dados desta demo são fictícios.",
  },
  {
    q: "Quanto tempo dura cada sessão?",
    a: "Em geral, 50 minutos, respeitando o tempo acordado entre profissional e paciente.",
  },
] as const;

export const TIME_SLOTS = ["09:00", "09:30", "10:00", "11:00", "14:00", "15:30", "16:00", "17:30"] as const;

export const STATUS_LABELS: Record<string, string> = {
  novo: "Novo",
  em_analise: "Em análise",
  confirmado: "Confirmado",
  cancelado: "Cancelado",
};
