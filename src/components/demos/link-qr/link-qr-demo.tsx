"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Check, Copy, Link2, Smartphone } from "lucide-react";

import {
  DemoShell,
  trackDemoFinish,
  trackDemoInteraction,
} from "@/components/demos/demo-shell";
import { DemoKpiCard } from "@/components/demos/demo-kpi-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  LINK_QR_STORAGE_KEY,
  generateShortUrl,
  simulateClickStats,
  type LinkDevice,
  type LinkSource,
  type ShortLinkRecord,
} from "@/data/demos/link-qr-mock";

const DEMO_ID = "link-qr";

function loadHistory(): ShortLinkRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = sessionStorage.getItem(LINK_QR_STORAGE_KEY);
    if (stored) return JSON.parse(stored) as ShortLinkRecord[];
  } catch {
    /* ignore */
  }
  return [];
}

export function LinkQrDemo() {
  const [url, setUrl] = useState("https://nangell.com.br/solucoes");
  const [slug, setSlug] = useState("campanha-demo");
  const [utmSource, setUtmSource] = useState("newsletter");
  const [utmMedium, setUtmMedium] = useState("email");
  const [utmCampaign, setUtmCampaign] = useState("q2-2026");
  const [generated, setGenerated] = useState<ShortLinkRecord | null>(null);
  const [history, setHistory] = useState<ShortLinkRecord[]>([]);
  const [copied, setCopied] = useState(false);
  const [deviceFilter, setDeviceFilter] = useState<LinkDevice | "all">("all");
  const [sourceFilter, setSourceFilter] = useState<LinkSource | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const persistHistory = useCallback((records: ShortLinkRecord[]) => {
    setHistory(records);
    sessionStorage.setItem(LINK_QR_STORAGE_KEY, JSON.stringify(records));
  }, []);

  const selected = useMemo(
    () => history.find((r) => r.id === selectedId) ?? generated,
    [history, selectedId, generated],
  );

  const stats = useMemo(() => {
    if (!selected) return null;
    let clicks = selected.clicks;
    if (deviceFilter !== "all") {
      clicks = selected.clicksByDevice[deviceFilter];
    }
    if (sourceFilter !== "all") {
      clicks = Math.min(clicks, selected.clicksBySource[sourceFilter]);
    }
    return {
      total: selected.clicks,
      filtered: clicks,
      devices: selected.clicksByDevice,
      sources: selected.clicksBySource,
    };
  }, [selected, deviceFilter, sourceFilter]);

  const handleGenerate = () => {
    const shortUrl = generateShortUrl(slug);
    const statsData = simulateClickStats();
    const record: ShortLinkRecord = {
      id: `link-${Date.now()}`,
      originalUrl: url,
      slug,
      shortUrl,
      utmSource,
      utmMedium,
      utmCampaign,
      createdAt: new Date().toLocaleString("pt-BR"),
      ...statsData,
    };
    setGenerated(record);
    setSelectedId(record.id);
    const next = [record, ...history].slice(0, 10);
    persistHistory(next);
    trackDemoFinish(DEMO_ID, "link_generated", slug);
  };

  const handleCopy = async () => {
    if (!selected) return;
    try {
      await navigator.clipboard.writeText(selected.shortUrl);
      setCopied(true);
      trackDemoInteraction(DEMO_ID, "copy_link");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const fullUrlWithUtm = useMemo(() => {
    const params = new URLSearchParams();
    if (utmSource) params.set("utm_source", utmSource);
    if (utmMedium) params.set("utm_medium", utmMedium);
    if (utmCampaign) params.set("utm_campaign", utmCampaign);
    return `${url}${url.includes("?") ? "&" : "?"}${params.toString()}`;
  }, [url, utmSource, utmMedium, utmCampaign]);

  return (
    <DemoShell
      demoId={DEMO_ID}
      title="Link + QR Code"
      subtitle="Encurtador fictício com UTM, QR Code real no frontend e dashboard de cliques simulados."
      ctaLabel="Quero desenvolver um SaaS"
    >
      <div className="p-4 sm:p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <Input
              label="URL de destino"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://seusite.com/pagina"
            />
            <Input
              label="Slug personalizado"
              value={slug}
              onChange={(e) => setSlug(e.target.value.replace(/\s+/g, "-").toLowerCase())}
              hint="Será usado em nangell.link/{slug}"
            />
            <div className="grid gap-3 sm:grid-cols-3">
              <Input
                label="UTM Source"
                value={utmSource}
                onChange={(e) => setUtmSource(e.target.value)}
              />
              <Input
                label="UTM Medium"
                value={utmMedium}
                onChange={(e) => setUtmMedium(e.target.value)}
              />
              <Input
                label="UTM Campaign"
                value={utmCampaign}
                onChange={(e) => setUtmCampaign(e.target.value)}
              />
            </div>
            <Button onClick={handleGenerate}>
              <Link2 className="h-4 w-4" aria-hidden />
              Gerar link curto fictício
            </Button>
          </div>

          <div className="rounded-nangell border border-glass-border bg-nangell-dark/40 p-6">
            {generated || selected ? (
              <div className="flex flex-col items-center gap-4">
                <QRCodeSVG
                  value={fullUrlWithUtm}
                  size={180}
                  bgColor="#0B0F1A"
                  fgColor="#00C2FC"
                  level="M"
                  includeMargin
                />
                <p className="break-all text-center font-mono text-sm text-nangell-cyan">
                  {(selected ?? generated)?.shortUrl}
                </p>
                <Button variant="secondary" size="sm" onClick={handleCopy}>
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" aria-hidden />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" aria-hidden />
                      Copiar link
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="flex min-h-[240px] flex-col items-center justify-center text-center text-sm text-nangell-muted">
                <Smartphone className="mb-3 h-10 w-10 text-nangell-cyan/50" aria-hidden />
                Gere um link para visualizar o QR Code
              </div>
            )}
          </div>
        </div>

        {stats ? (
          <div className="mt-8">
            <h3 className="mb-4 text-sm font-medium text-nangell-text">Dashboard de cliques (simulado)</h3>
            <div className="mb-4 flex flex-wrap gap-3">
              <Select
                label="Dispositivo"
                value={deviceFilter}
                onChange={(e) => {
                  setDeviceFilter(e.target.value as LinkDevice | "all");
                  trackDemoInteraction(DEMO_ID, "filter_device", { value: e.target.value });
                }}
                options={[
                  { label: "Todos", value: "all" },
                  { label: "Mobile", value: "mobile" },
                  { label: "Desktop", value: "desktop" },
                  { label: "Tablet", value: "tablet" },
                ]}
                className="w-[160px]"
              />
              <Select
                label="Origem"
                value={sourceFilter}
                onChange={(e) => {
                  setSourceFilter(e.target.value as LinkSource | "all");
                  trackDemoInteraction(DEMO_ID, "filter_source", { value: e.target.value });
                }}
                options={[
                  { label: "Todas", value: "all" },
                  { label: "Direto", value: "direct" },
                  { label: "E-mail", value: "email" },
                  { label: "Social", value: "social" },
                  { label: "Ads", value: "ads" },
                ]}
                className="w-[160px]"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <DemoKpiCard label="Total de cliques" value={String(stats.total)} trend="up" change="Simulado" />
              <DemoKpiCard label="Cliques filtrados" value={String(stats.filtered)} trend="neutral" />
              <DemoKpiCard label="Mobile" value={String(stats.devices.mobile)} trend="neutral" />
              <DemoKpiCard label="Desktop" value={String(stats.devices.desktop)} trend="neutral" />
            </div>
          </div>
        ) : null}

        {history.length > 0 ? (
          <div className="mt-8">
            <h3 className="mb-3 text-sm font-medium text-nangell-text">Histórico da sessão</h3>
            <ul className="space-y-2">
              {history.map((record) => (
                <li key={record.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedId(record.id);
                      setGenerated(record);
                      trackDemoInteraction(DEMO_ID, "select_history", { id: record.id });
                    }}
                    className="flex w-full flex-wrap items-center justify-between gap-2 rounded-nangell border border-glass-border bg-nangell-dark/30 px-4 py-3 text-left text-sm hover:border-nangell-cyan/30"
                  >
                    <span className="font-mono text-nangell-cyan">{record.shortUrl}</span>
                    <div className="flex gap-2">
                      <Badge variant="muted">{record.clicks} cliques</Badge>
                      <span className="text-xs text-nangell-muted">{record.createdAt}</span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </DemoShell>
  );
}
