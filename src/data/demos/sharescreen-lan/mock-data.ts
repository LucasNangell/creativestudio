export type SharescreenClient = {
  peerId: string;
  name: string;
  role: "host" | "client";
  hasVideo: boolean;
  ip: string;
  online: boolean;
};

export type SharescreenLogEntry = {
  id: string;
  time: string;
  level: "info" | "warn" | "success";
  message: string;
};

export const SERVER_INFO = {
  host: "192.168.100.10",
  httpsPort: 3443,
  maxClients: 10,
  codec: "H.264",
  resolution: "1920×1080",
  fps: 30,
  sfu: "mediasoup",
} as const;

export const INITIAL_CLIENTS: SharescreenClient[] = [
  {
    peerId: "peer-demo-host-001",
    name: "Painel Host (este computador)",
    role: "host",
    hasVideo: true,
    ip: "192.168.100.10",
    online: true,
  },
  {
    peerId: "peer-demo-abc12345",
    name: "PC Sala Reunião A",
    role: "client",
    hasVideo: true,
    ip: "192.168.100.21",
    online: true,
  },
  {
    peerId: "peer-demo-def67890",
    name: "PC Recepção",
    role: "client",
    hasVideo: true,
    ip: "192.168.100.22",
    online: true,
  },
  {
    peerId: "peer-demo-ghi11223",
    name: "Estação Treinamento 3",
    role: "client",
    hasVideo: false,
    ip: "192.168.100.23",
    online: true,
  },
  {
    peerId: "peer-demo-jkl44556",
    name: "Notebook Auditoria",
    role: "client",
    hasVideo: true,
    ip: "192.168.100.24",
    online: false,
  },
];

export const INITIAL_LOGS: SharescreenLogEntry[] = [
  { id: "log-1", time: "14:28:01", level: "info", message: "Servidor iniciado, modo demonstração" },
  { id: "log-2", time: "14:28:03", level: "info", message: "Host conectado: Painel Host (este computador)" },
  { id: "log-3", time: "14:28:15", level: "info", message: "Client entrou: PC Sala Reunião A" },
  { id: "log-4", time: "14:28:22", level: "info", message: "Client entrou: PC Recepção" },
  { id: "log-5", time: "14:28:45", level: "info", message: "Client entrou: Estação Treinamento 3" },
  { id: "log-6", time: "14:29:01", level: "warn", message: "Estação Treinamento 3 sem vídeo publicado" },
  { id: "log-7", time: "14:29:18", level: "info", message: "Host selecionou: PC Sala Reunião A" },
  { id: "log-8", time: "14:30:02", level: "success", message: "Transmissão ativa, H.264 1920×1080 @ 30fps" },
];

export const LIVE_LOG_TICKS: Omit<SharescreenLogEntry, "id" | "time">[] = [
  { level: "info", message: "Heartbeat SFU, latência média 42 ms na LAN" },
  { level: "info", message: "Client entrou: Notebook Auditoria" },
  { level: "warn", message: "Notebook Auditoria reconectando…" },
  { level: "success", message: "Gravação simulada, arquivo .webm gerado localmente" },
  { level: "info", message: "Bitrate adaptativo: 4.2 Mbps → 5.8 Mbps" },
  { level: "info", message: "Host alternou fonte para PC Recepção" },
];
