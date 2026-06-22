"use client";

import { useState } from "react";
import { Monitor, Pause, Play, Radio, Volume2 } from "lucide-react";

import { DemoShell, trackDemoInteraction } from "@/components/demos/demo-shell";
import { DemoSystemOverview } from "@/components/demos/demo-system-overview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getDemoPageContentOrThrow } from "@/lib/demos/get-demo-content";

const DEMO_ID = "sharescreen-lan";
const demoContent = getDemoPageContentOrThrow(DEMO_ID);

const CLIENTS = [
  { id: "peer-demo-abc12345", name: "PC Sala Reunião A", hasVideo: true },
  { id: "peer-demo-def67890", name: "PC Recepção", hasVideo: true },
  { id: "peer-demo-ghi11223", name: "Estação Treinamento 3", hasVideo: false },
  { id: "peer-demo-jkl44556", name: "Notebook Auditoria", hasVideo: true },
];

const LOG_EVENTS = [
  "Cliente conectado: PC Sala Reunião A",
  "Transmissão iniciada — Full HD",
  "Fonte selecionada: PC Sala Reunião A",
  "Gravação simulada iniciada",
];

export function SharescreenLanDemo() {
  const [view, setView] = useState<"host" | "client">("host");
  const [selectedId, setSelectedId] = useState(CLIENTS[0].id);
  const [paused, setPaused] = useState(false);
  const [volume, setVolume] = useState(80);
  const [clientName, setClientName] = useState("Estação Simulação 01");
  const [logs, setLogs] = useState(LOG_EVENTS);

  const selected = CLIENTS.find((c) => c.id === selectedId) ?? CLIENTS[0];

  const addLog = (msg: string) => {
    setLogs((prev) => [msg, ...prev].slice(0, 8));
    trackDemoInteraction(DEMO_ID, "log_event", { message: msg });
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
        <div className="mb-4 flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={view === "host" ? "primary" : "secondary"}
            onClick={() => {
              setView("host");
              trackDemoInteraction(DEMO_ID, "view_host");
            }}
          >
            Painel Host
          </Button>
          <Button
            size="sm"
            variant={view === "client" ? "primary" : "secondary"}
            onClick={() => {
              setView("client");
              trackDemoInteraction(DEMO_ID, "view_client");
            }}
          >
            Tela Client
          </Button>
        </div>

        {view === "host" ? (
          <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
            <aside className="rounded-nangell border border-glass-border bg-nangell-dark/40 p-4">
              <h3 className="mb-3 text-sm font-medium text-nangell-text">Fontes conectadas</h3>
              <ul className="space-y-2">
                {CLIENTS.map((client) => (
                  <li key={client.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedId(client.id);
                        addLog(`Fonte selecionada: ${client.name}`);
                      }}
                      className={cn(
                        "w-full rounded-nangell border px-3 py-2 text-left text-sm transition-colors",
                        selectedId === client.id
                          ? "border-nangell-cyan/50 bg-nangell-cyan/10 text-nangell-text"
                          : "border-glass-border text-nangell-muted hover:border-nangell-cyan/30",
                      )}
                    >
                      <span className="font-medium">{client.name}</span>
                      {!client.hasVideo ? (
                        <Badge variant="muted" className="ml-2">
                          Sem vídeo
                        </Badge>
                      ) : null}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="space-y-4">
              <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-nangell border border-glass-border bg-nangell-dark/60">
                <Monitor className="h-16 w-16 text-nangell-cyan/40" aria-hidden />
                <p className="absolute bottom-4 left-4 text-sm text-nangell-muted">
                  Prévia simulada — {selected.name}
                </p>
                {paused ? (
                  <Badge variant="warning" className="absolute right-4 top-4">
                    Pausado
                  </Badge>
                ) : (
                  <Badge variant="success" className="absolute right-4 top-4">
                    Ao vivo
                  </Badge>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setPaused((p) => !p);
                    addLog(paused ? "Transmissão retomada" : "Transmissão pausada");
                  }}
                >
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
                  Log de eventos
                </h4>
                <ul className="max-h-32 space-y-1 overflow-y-auto font-mono text-xs text-nangell-muted">
                  {logs.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-lg space-y-4">
            <div className="rounded-nangell border border-glass-border bg-nangell-dark/40 p-5">
              <label htmlFor="client-name" className="mb-2 block text-sm font-medium text-nangell-text">
                Identifique este computador
              </label>
              <input
                id="client-name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full rounded-nangell border border-glass-border bg-nangell-surface px-3 py-2 text-sm text-nangell-text"
                placeholder="Ex.: Sala Reunião B"
              />
              <Button
                size="sm"
                className="mt-3"
                onClick={() => {
                  addLog(`Client identificado: ${clientName}`);
                  trackDemoInteraction(DEMO_ID, "client_identify", { name: clientName });
                }}
              >
                Salvar identificação
              </Button>
            </div>
            <div className="flex aspect-video items-center justify-center rounded-nangell border border-dashed border-nangell-cyan/30 bg-nangell-cyan/5">
              <p className="text-center text-sm text-nangell-muted">
                Transmissão simulada do host
                <br />
                <span className="text-nangell-cyan">{selected.name}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
