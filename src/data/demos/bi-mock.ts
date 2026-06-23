export type BiPeriod = "7d" | "30d" | "90d" | "12m";

export type BiRegion = "all" | "sudeste" | "sul" | "nordeste" | "centro-oeste";

export type BiProduct = "all" | "saas" | "consultoria" | "licencas";

export type BiAlert = {
  id: string;
  severity: "info" | "warning" | "critical";
  title: string;
  description: string;
};

export type BiClientRank = {
  id: string;
  name: string;
  revenue: number;
  growth: number;
};

export type BiChartPoint = {
  label: string;
  receita: number;
  custo: number;
  meta: number;
};

export type BiCategoryPoint = {
  name: string;
  value: number;
};

export const BI_ALERTS: BiAlert[] = [
  {
    id: "a1",
    severity: "critical",
    title: "Queda de 12% na região Sul",
    description: "Receita abaixo da meta nos últimos 7 dias, revisar campanha Q2.",
  },
  {
    id: "a2",
    severity: "warning",
    title: "Churn acima do limite",
    description: "3 contas enterprise com risco de cancelamento identificado pelo CS.",
  },
  {
    id: "a3",
    severity: "info",
    title: "Meta mensal atingida",
    description: "Sudeste superou meta de receita em 8%, oportunidade de upsell.",
  },
];

export const BI_CLIENT_RANKING: BiClientRank[] = [
  { id: "c1", name: "NovaTech Solutions", revenue: 284000, growth: 18 },
  { id: "c2", name: "Grupo Horizonte", revenue: 221500, growth: 12 },
  { id: "c3", name: "DataFlow Corp", revenue: 198300, growth: -3 },
  { id: "c4", name: "PrimeLogistics", revenue: 176800, growth: 24 },
  { id: "c5", name: "EduMaster SA", revenue: 154200, growth: 9 },
];

export const BI_LINE_DATA: Record<BiPeriod, BiChartPoint[]> = {
  "7d": [
    { label: "Seg", receita: 42000, custo: 28000, meta: 40000 },
    { label: "Ter", receita: 38000, custo: 26000, meta: 40000 },
    { label: "Qua", receita: 51000, custo: 31000, meta: 42000 },
    { label: "Qui", receita: 47000, custo: 29000, meta: 42000 },
    { label: "Sex", receita: 62000, custo: 35000, meta: 45000 },
    { label: "Sáb", receita: 18000, custo: 12000, meta: 15000 },
    { label: "Dom", receita: 12000, custo: 8000, meta: 10000 },
  ],
  "30d": [
    { label: "Sem 1", receita: 180000, custo: 112000, meta: 170000 },
    { label: "Sem 2", receita: 195000, custo: 118000, meta: 175000 },
    { label: "Sem 3", receita: 210000, custo: 125000, meta: 180000 },
    { label: "Sem 4", receita: 228000, custo: 132000, meta: 185000 },
  ],
  "90d": [
    { label: "Abr", receita: 620000, custo: 380000, meta: 600000 },
    { label: "Mai", receita: 680000, custo: 410000, meta: 630000 },
    { label: "Jun", receita: 740000, custo: 440000, meta: 660000 },
  ],
  "12m": [
    { label: "Jul", receita: 520000, custo: 340000, meta: 500000 },
    { label: "Ago", receita: 548000, custo: 352000, meta: 520000 },
    { label: "Set", receita: 571000, custo: 361000, meta: 540000 },
    { label: "Out", receita: 598000, custo: 375000, meta: 560000 },
    { label: "Nov", receita: 624000, custo: 388000, meta: 580000 },
    { label: "Dez", receita: 710000, custo: 420000, meta: 650000 },
    { label: "Jan", receita: 612000, custo: 395000, meta: 600000 },
    { label: "Fev", receita: 635000, custo: 402000, meta: 610000 },
    { label: "Mar", receita: 658000, custo: 415000, meta: 620000 },
    { label: "Abr", receita: 682000, custo: 428000, meta: 640000 },
    { label: "Mai", receita: 705000, custo: 438000, meta: 660000 },
    { label: "Jun", receita: 740000, custo: 450000, meta: 680000 },
  ],
};

export const BI_CATEGORY_DATA: Record<BiProduct, BiCategoryPoint[]> = {
  all: [
    { name: "SaaS", value: 45 },
    { name: "Consultoria", value: 28 },
    { name: "Licenças", value: 18 },
    { name: "Suporte", value: 9 },
  ],
  saas: [
    { name: "Enterprise", value: 52 },
    { name: "Pro", value: 31 },
    { name: "Starter", value: 17 },
  ],
  consultoria: [
    { name: "Discovery", value: 35 },
    { name: "Implementação", value: 40 },
    { name: "Treinamento", value: 25 },
  ],
  licencas: [
    { name: "Anual", value: 60 },
    { name: "Mensal", value: 40 },
  ],
};

export function getBiKpis(period: BiPeriod, region: BiRegion, product: BiProduct) {
  const multiplier =
    (region === "all" ? 1 : region === "sudeste" ? 1.12 : region === "sul" ? 0.88 : 1.05) *
    (product === "all" ? 1 : product === "saas" ? 1.15 : product === "consultoria" ? 0.92 : 0.78);

  const base = period === "7d" ? 1 : period === "30d" ? 4.2 : period === "90d" ? 12 : 48;

  return {
    receita: Math.round(270000 * base * multiplier),
    margem: Math.round(34 + (multiplier - 1) * 10),
    clientesAtivos: Math.round(128 * multiplier),
    ticketMedio: Math.round(4200 * multiplier),
  };
}
