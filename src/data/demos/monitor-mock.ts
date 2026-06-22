export type MonitorSeverity = "info" | "warning" | "critical";

export type MonitorSentiment = "positive" | "neutral" | "negative";

export type MonitorEvent = {
  id: string;
  timestamp: string;
  source: string;
  keyword: string;
  message: string;
  severity: MonitorSeverity;
  sentiment: MonitorSentiment;
};

export const MONITOR_KEYWORDS = [
  "Nangell",
  "CRM",
  "dashboard",
  "integração",
  "suporte",
  "bug",
  "lançamento",
];

export const MONITOR_SOURCES = [
  "Twitter/X",
  "LinkedIn",
  "News API",
  "RSS Tech",
  "Fórum Dev",
  "Reddit",
];

export const MONITOR_MESSAGES = [
  "Cliente elogiou a integração do novo dashboard em tempo real.",
  "Menção negativa sobre tempo de resposta do suporte técnico.",
  "Discussão sobre lançamento de feature de automação comercial.",
  "Comparativo positivo entre CRM Nangell e concorrentes.",
  "Alerta: possível bug reportado em ambiente de staging.",
  "Artigo destacando metodologia de discovery da Nangell.",
  "Reclamação sobre documentação de API desatualizada.",
  "Feedback neutro sobre pricing do plano enterprise.",
];

export function createRandomEvent(id: number): MonitorEvent {
  const keyword = MONITOR_KEYWORDS[Math.floor(Math.random() * MONITOR_KEYWORDS.length)]!;
  const message = MONITOR_MESSAGES[Math.floor(Math.random() * MONITOR_MESSAGES.length)]!;
  const severities: MonitorSeverity[] = ["info", "info", "warning", "critical"];
  const sentiments: MonitorSentiment[] = ["positive", "neutral", "negative", "neutral"];
  const now = new Date();

  return {
    id: `evt-${id}-${now.getTime()}`,
    timestamp: now.toLocaleTimeString("pt-BR"),
    source: MONITOR_SOURCES[Math.floor(Math.random() * MONITOR_SOURCES.length)]!,
    keyword,
    message,
    severity: severities[Math.floor(Math.random() * severities.length)]!,
    sentiment: sentiments[Math.floor(Math.random() * sentiments.length)]!,
  };
}
