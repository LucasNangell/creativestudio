"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Circle,
  Disc,
  Laptop,
  Monitor,
  Pause,
  Play,
  Radio,
  RefreshCw,
  Server,
  Square,
  Users,
  Volume2,
  Wifi,
} from "lucide-react";

import { DemoShell, trackDemoInteraction } from "@/components/demos/demo-shell";
import { DemoSystemOverview } from "@/components/demos/demo-system-overview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  INITIAL_CLIENTS,
  INITIAL_LOGS,
  LIVE_LOG_TICKS,
  SERVER_INFO,
  type SharescreenClient,
  type SharescreenLogEntry,
} from "@/data/demos/sharescreen-lan/mock-data";
import { getDemoPageContentOrThrow } from "@/lib/demos/get-demo-content";
import { cn } from "@/lib/utils";

const DEMO_ID = "sharescreen-lan";

type View = "landing" | "host" | "client";

function formatTime(date: Date) {
  return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function logLevelClass(level: SharescreenLogEntry["level"]) {
  if (level === "warn") return "text-amber-400";
  if (level === "success") return "text-emerald-400";
  return "text-nangell-muted";
}

export function SharescreenLanDemo() {
  const demoContent = useMemo(() => getDemoPageContentOrThrow(DEMO_ID), []);

  const [view, setView] = useState<View>("landing");
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [selectedId, setSelectedId] = useState("peer-demo-abc12345");
  const [paused, setPaused] = useState(false);
  const [recording, setRecording] = useState(false);
  const [volume, setVolume] = useState(80);
  const [clientName, setClientName] = useState("Estação Simulação 01");
  const [clientSharing, setClientSharing] = useState(false);
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const tickRef = useRef(0);

  const selectableClients = useMemo(
    () => clients.filter((c) => c.role === "client"),
    [clients],
  );
  const selected = clients.find((c) => c.peerId === selectedId) ?? selectableClients[0];
  const onlineCount = clients.filter((c) => c.online && c.role === "client").length;

  const addLog = useCallback(
    (message: string, level: SharescreenLogEntry["level"] = "info") => {
      const entry: SharescreenLogEntry = {
        id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        time: formatTime(new Date()),
        level,
        message,
      };
      setLogs((prev) => [entry, ...prev].slice(0, 12));
      trackDemoInteraction(DEMO_ID, "log_event", { message, level });
    },
    [],
  );

  useEffect(() => {
    if (view !== "host") return;

    const timer = window.setInterval(() => {
      const tick = LIVE_LOG_TICKS[tickRef.current % LIVE_LOG_TICKS.length];
      tickRef.current += 1;
      addLog(tick.message, tick.level);

      if (tick.message.includes("Notebook Auditoria")) {
        setClients((prev) =>
          prev.map((c) =>
            c.peerId === "peer-demo-jkl44556" ? { ...c, online: true } : c,
          ),
        );
      }
    }, 9000);

    return () => window.clearInterval(timer);
  }, [view, addLog]);

  const selectSource = (client: SharescreenClient) => {
    if (!client.hasVideo) {
      addLog(`${client.name} ainda não publicou vídeo`, "warn");
      return;
    }
    setSelectedId(client.peerId);
    addLog(`Host selecionou: ${client.name}`, "info");
    trackDemoInteraction(DEMO_ID, "select_source", { peerId: client.peerId });
  };

  const togglePause = () => {
    setPaused((p) => {
      addLog(p ? "Transmissão retomada" : "Transmissão pausada", p ? "success" : "warn");
      return !p;
    });
  };

  const toggleRecording = () => {
    setRecording((r) => {
      if (r) {
        addLog("Gravação finalizada, arquivo salvo no servidor local", "success");
      } else {
        addLog("Gravação simulada iniciada", "info");
      }
      trackDemoInteraction(DEMO_ID, "toggle_recording", { active: !r });
      return !r;
    });
  };

  const clearTransmission = () => {
    setPaused(false);
    setRecording(false);
    addLog("Transmissão encerrada pelo host", "warn");
    trackDemoInteraction(DEMO_ID, "clear_transmission");
  };

  return (
    <DemoShell
      demoId={DEMO_ID}
      title={demoContent.title}
      subtitle={demoContent.shortDescription}
      ctaLabel="Quero um sistema parecido"
      overview={<DemoSystemOverview content={demoContent} />}
    >
      <div className="p-4 sm:p-6">
        {view === "landing" ? (
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <div className="rounded-nangell-xl border border-glass-border bg-nangell-dark/50 p-8">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-nangell-cyan/10">
                <Wifi className="h-7 w-7 text-nangell-cyan" aria-hidden />
              </div>
              <h2 className="font-display text-xl font-semibold text-nangell-text sm:text-2xl">
                ShareScreen LAN, Rede local
              </h2>
              <p className="mx-auto mt-2 max-w-lg text-sm text-nangell-muted">
                Simulação do compartilhamento de tela entre computadores na mesma LAN, sem
                internet, sem nuvem. Escolha o ponto de vista:
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => {
                    setView("host");
                    trackDemoInteraction(DEMO_ID, "view_host");
                  }}
                  className="group rounded-nangell-lg border border-glass-border bg-nangell-surface/60 p-6 text-left transition-colors hover:border-nangell-cyan/40 hover:bg-nangell-cyan/5"
                >
                  <Monitor className="mb-3 h-8 w-8 text-nangell-cyan" aria-hidden />
                  <p className="font-medium text-nangell-text">Painel Host</p>
                  <p className="mt-1 text-sm text-nangell-muted">
                    Controle central: selecione qual tela transmitir, pause, grave e acompanhe o
                    log.
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setView("client");
                    trackDemoInteraction(DEMO_ID, "view_client");
                  }}
                  className="group rounded-nangell-lg border border-glass-border bg-nangell-surface/60 p-6 text-left transition-colors hover:border-nangell-cyan/40 hover:bg-nangell-cyan/5"
                >
                  <Laptop className="mb-3 h-8 w-8 text-nangell-blue" aria-hidden />
                  <p className="font-medium text-nangell-text">Tela Client</p>
                  <p className="mt-1 text-sm text-nangell-muted">
                    Experiência do participante: identifique o PC e veja a transmissão recebida.
                  </p>
                </button>
              </div>
            </div>
            <p className="text-xs text-nangell-muted">
              Servidor simulado em {SERVER_INFO.host}:{SERVER_INFO.httpsPort} · WebRTC SFU · até{" "}
              {SERVER_INFO.maxClients} clients
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={view === "host" ? "primary" : "secondary"}
                  onClick={() => setView("host")}
                >
                  Painel Host
                </Button>
                <Button
                  size="sm"
                  variant={view === "client" ? "primary" : "secondary"}
                  onClick={() => setView("client")}
                >
                  Tela Client
                </Button>
              </div>
              <Button size="sm" variant="outline" onClick={() => setView("landing")}>
                Voltar ao início
              </Button>
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-3 rounded-nangell border border-glass-border bg-nangell-dark/40 px-4 py-3 text-xs text-nangell-muted">
              <span className="flex items-center gap-1.5">
                <Server className="h-3.5 w-3.5 text-nangell-cyan" aria-hidden />
                SFU {SERVER_INFO.host}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" aria-hidden />
                {onlineCount}/{SERVER_INFO.maxClients} clients online
              </span>
              <span>
                {SERVER_INFO.codec} · {SERVER_INFO.resolution} @ {SERVER_INFO.fps}fps
              </span>
              <Badge variant="success" className="ml-auto normal-case">
                LAN ativa
              </Badge>
            </div>

            {view === "host" ? (
              <div className="grid gap-4 lg:grid-cols-[300px_1fr]">
                <aside className="rounded-nangell border border-glass-border bg-nangell-dark/40 p-4">
                  <h3 className="mb-3 text-sm font-medium text-nangell-text">Fontes conectadas</h3>
                  <ul className="space-y-2">
                    {selectableClients.map((client) => (
                      <li key={client.peerId}>
                        <button
                          type="button"
                          onClick={() => selectSource(client)}
                          className={cn(
                            "w-full rounded-nangell border px-3 py-2.5 text-left text-sm transition-colors",
                            selectedId === client.peerId
                              ? "border-nangell-cyan/50 bg-nangell-cyan/10 text-nangell-text"
                              : "border-glass-border text-nangell-muted hover:border-nangell-cyan/30",
                          )}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-medium">{client.name}</span>
                            <Circle
                              className={cn(
                                "h-2 w-2 shrink-0 fill-current",
                                client.online ? "text-emerald-400" : "text-nangell-muted",
                              )}
                              aria-hidden
                            />
                          </div>
                          <p className="mt-0.5 font-mono text-[10px] text-nangell-muted">
                            {client.ip}
                          </p>
                          {!client.hasVideo ? (
                            <Badge variant="warning" className="mt-1.5 normal-case">
                              Sem vídeo
                            </Badge>
                          ) : null}
                          {!client.online ? (
                            <Badge variant="muted" className="mt-1.5 normal-case">
                              Offline
                            </Badge>
                          ) : null}
                        </button>
                      </li>
                    ))}
                  </ul>
                </aside>

                <div className="space-y-4">
                  <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-nangell border border-glass-border bg-nangell-dark/60">
                    {!paused && selected?.hasVideo ? (
                      <div
                        className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,194,252,0.08)_0%,rgba(48,97,250,0.12)_50%,rgba(97,57,250,0.08)_100%)] motion-safe:animate-pulse"
                        aria-hidden
                      />
                    ) : null}
                    <Monitor className="relative h-16 w-16 text-nangell-cyan/40" aria-hidden />
                    <p className="absolute bottom-4 left-4 text-sm text-nangell-muted">
                      Prévia simulada, {selected?.name ?? "Nenhuma fonte"}
                    </p>
                    {paused ? (
                      <Badge variant="warning" className="absolute right-4 top-4">
                        Pausado
                      </Badge>
                    ) : recording ? (
                      <Badge variant="warning" className="absolute right-4 top-4 gap-1">
                        <Disc className="h-3 w-3 animate-pulse fill-current" aria-hidden />
                        Gravando
                      </Badge>
                    ) : (
                      <Badge variant="success" className="absolute right-4 top-4">
                        Ao vivo
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm" variant="secondary" onClick={togglePause}>
                      {paused ? (
                        <>
                          <Play className="h-4 w-4" aria-hidden /> Retomar
                        </>
                      ) : (
                        <>
                          <Pause className="h-4 w-4" aria-hidden /> Pausar
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant={recording ? "primary" : "secondary"}
                      onClick={toggleRecording}
                    >
                      <Disc className="h-4 w-4" aria-hidden />
                      {recording ? "Parar gravação" : "Gravar sessão"}
                    </Button>
                    <Button size="sm" variant="outline" onClick={clearTransmission}>
                      <Square className="h-4 w-4" aria-hidden />
                      Limpar transmissão
                    </Button>
                    <label className="flex items-center gap-2 text-sm text-nangell-muted">
                      <Volume2 className="h-4 w-4" aria-hidden />
                      Volume
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="accent-nangell-cyan"
                        aria-label="Volume da transmissão"
                      />
                      <span className="font-mono text-xs">{volume}%</span>
                    </label>
                  </div>

                  <div className="rounded-nangell border border-glass-border bg-nangell-dark/30 p-3">
                    <h4 className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-nangell-muted">
                      <Radio className="h-3.5 w-3.5" aria-hidden />
                      Log de eventos (tempo real simulado)
                    </h4>
                    <ul className="max-h-36 space-y-1 overflow-y-auto font-mono text-xs">
                      {logs.map((entry) => (
                        <li key={entry.id} className={logLevelClass(entry.level)}>
                          <span className="text-nangell-muted/70">{entry.time}</span> {entry.message}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mx-auto max-w-2xl space-y-4">
                <div className="rounded-nangell border border-glass-border bg-nangell-dark/40 p-5">
                  <label htmlFor="client-name" className="mb-2 block text-sm font-medium text-nangell-text">
                    Identifique este computador na rede
                  </label>
                  <input
                    id="client-name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full rounded-nangell border border-glass-border bg-nangell-surface px-3 py-2 text-sm text-nangell-text"
                    placeholder="Ex.: Sala Reunião B"
                  />
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        addLog(`Client identificado: ${clientName}`, "info");
                        trackDemoInteraction(DEMO_ID, "client_identify", { name: clientName });
                      }}
                    >
                      Salvar identificação
                    </Button>
                    <Button
                      size="sm"
                      variant={clientSharing ? "primary" : "secondary"}
                      onClick={() => {
                        setClientSharing((s) => {
                          addLog(
                            s
                              ? `${clientName} parou de compartilhar a tela`
                              : `${clientName} iniciou compartilhamento de tela (simulado)`,
                            s ? "warn" : "success",
                          );
                          trackDemoInteraction(DEMO_ID, "client_share", { active: !s });
                          return !s;
                        });
                      }}
                    >
                      <RefreshCw className="h-4 w-4" aria-hidden />
                      {clientSharing ? "Parar compartilhamento" : "Compartilhar minha tela"}
                    </Button>
                  </div>
                </div>

                {selected?.name === clientName && clientSharing ? (
                  <div className="rounded-nangell border border-nangell-cyan/40 bg-nangell-cyan/10 px-4 py-3 text-sm text-nangell-cyan">
                    Você está sendo transmitido para todos os clients conectados.
                  </div>
                ) : null}

                <div className="relative flex aspect-video flex-col items-center justify-center gap-2 overflow-hidden rounded-nangell border border-dashed border-nangell-cyan/30 bg-nangell-cyan/5">
                  {!paused && selected?.hasVideo ? (
                    <div
                      className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,194,252,0.06))] motion-safe:animate-pulse"
                      aria-hidden
                    />
                  ) : null}
                  <Monitor className="relative h-10 w-10 text-nangell-cyan/50" aria-hidden />
                  <p className="relative text-center text-sm text-nangell-muted">
                    {paused ? "Transmissão pausada pelo host" : "Transmissão recebida do host"}
                    <br />
                    <span className="text-nangell-cyan">{selected?.name ?? "-"}</span>
                  </p>
                  <p className="relative font-mono text-[10px] text-nangell-muted">
                    {SERVER_INFO.codec} · latência simulada ~45 ms
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </DemoShell>
  );
}
