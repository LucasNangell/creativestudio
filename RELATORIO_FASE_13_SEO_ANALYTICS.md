# Relatório — Fase 13: SEO Técnico, Sitemap, Robots, Schema.org, Analytics e Tracking

**Projeto:** Nangell Creative Studio — Site Institucional e Comercial  
**Data/hora:** 2026-06-21  
**Responsável:** AGENT — SEO e Analytics

---

## 1. Resumo executivo

A Fase 13 consolidou a camada de SEO técnico e rastreamento de conversões: metadata global enriquecida, sitemap/robots dinâmicos, utilitários Schema.org reutilizáveis, scripts condicionais GTM/GA4 e eventos de analytics padronizados com persistência opcional no banco (`AnalyticsEvent`).

**Build:** ✅ Sucesso (55 rotas, incluindo `/sitemap.xml` e `/robots.txt`)  
**Admin:** `robots: noindex` via layout dedicado; eventos bloqueados em `/admin/*`

---

## 2. Metadata global (`src/app/layout.tsx`)

| Campo | Implementação |
|-------|----------------|
| `metadataBase` | `NEXT_PUBLIC_SITE_URL` via `siteConfig.url` |
| `title` | Default + template `%s \| Nangell Creative Studio` |
| `description` | Descrição institucional centralizada |
| `keywords` | Palavras-chave de `homeSeo` |
| `authors` / `creator` / `publisher` | Nangell Creative Studio |
| Open Graph | `website`, locale `pt_BR`, imagem padrão da marca |
| Twitter Card | `summary_large_image` |
| JSON-LD global | `Organization` + `WebSite` |

**Config central:** `src/lib/seo/site.ts`

---

## 3. Metadata por página

Todas as páginas principais já usavam `createPageMetadata` / `createArticleMetadata`, agora enriquecidas com:

- Imagem OG absoluta (capa do case/post ou logo padrão)
- Canonical relativo (resolvido por `metadataBase`)
- `robots: index, follow` (público)

| Página | Arquivo | Status |
|--------|---------|--------|
| Home | `src/app/page.tsx` | ✅ `createPageMetadata` |
| Soluções (lista + slug) | `solucoes/page.tsx`, `solucoes/[slug]/page.tsx` | ✅ |
| Portfólio | `portfolio/page.tsx` | ✅ |
| Cases | `cases/[slug]/page.tsx` | ✅ + OG da capa |
| Demos (6) | `demo/*/page.tsx` | ✅ + CreativeWork JSON-LD |
| Sobre / Processo | `sobre/page.tsx`, `processo/page.tsx` | ✅ |
| Diagnóstico / Contato | `diagnostico/page.tsx`, `contato/page.tsx` | ✅ |
| Blog (lista + post) | `blog/page.tsx`, `blog/[slug]/page.tsx` | ✅ Article metadata |
| Admin | `admin/layout.tsx` | ✅ `noindex, nofollow` |

---

## 4. Sitemap (`src/app/sitemap.ts`)

Rota gerada: **`/sitemap.xml`** (estática no build)

### Rotas incluídas

| Grupo | Paths |
|-------|-------|
| Estáticas | `/`, `/solucoes`, `/portfolio`, `/blog`, `/sobre`, `/processo`, `/diagnostico`, `/contato`, legal |
| Serviços | `/solucoes/{slug}` — Prisma ou fallback |
| Cases | `/cases/{slug}` — projetos publicados |
| Blog | `/blog/{slug}` — posts `PUBLISHED` |
| Demos | `/demo/*` — 6 demos interativas |

Prioridades: home `1.0`, conversão (`/diagnostico`) `0.85`, cases/posts `0.7–0.75`.

---

## 5. Robots (`src/app/robots.ts`)

Rota gerada: **`/robots.txt`**

```txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: {NEXT_PUBLIC_SITE_URL}/sitemap.xml
Host: {NEXT_PUBLIC_SITE_URL}
```

---

## 6. Schema.org

### Utilitários — `src/lib/seo/schema.ts`

| Schema | Uso |
|--------|-----|
| `Organization` | Layout global |
| `WebSite` | Layout global |
| `BreadcrumbList` | Cases e posts do blog |
| `BlogPosting` | Posts (`buildArticleSchema`) |
| `SoftwareApplication` | Cases de portfólio |
| `CreativeWork` | Páginas de demo |

### Componente — `src/components/seo/json-ld.tsx`

Renderiza um ou mais blocos `<script type="application/ld+json">`.

### Demos — `src/components/seo/demo-page-frame.tsx`

Wrapper server-side que injeta `CreativeWork` em cada rota `/demo/*`.

---

## 7. Analytics e tracking

### Variáveis de ambiente (`.env.example`)

```env
NEXT_PUBLIC_GTM_ID=""
NEXT_PUBLIC_GA4_ID=""
NEXT_PUBLIC_SITE_URL=""
```

### Scripts — `src/components/seo/analytics-scripts.tsx`

| Condição | Comportamento |
|----------|----------------|
| IDs vazios | Nenhum script carregado |
| `GTM_ID` definido | GTM + noscript iframe |
| Só `GA4_ID` (sem GTM) | gtag.js direto com `anonymize_ip` |
| Ambos definidos | Apenas GTM (GA4 via container) |

Estratégia: `afterInteractive` — sem bloquear render estático.

### Biblioteca — `src/lib/analytics.ts`

- Push para `dataLayer` + `gtag('event')` quando disponível
- Ignora rotas `/admin/*`
- Log em dev (`console.info`)
- Persistência opcional via `sendBeacon` / `fetch` (non-blocking)

### Eventos implementados

| Evento | Onde dispara |
|--------|----------------|
| `click_cta_hero` | CTAs primário/secundário do hero (`hero-section.tsx`) |
| `click_whatsapp` | Hero WhatsApp + botão flutuante |
| `open_demo` | `DemoShell` ao carregar demo |
| `demo_interaction` | Interações dentro das demos / steps do diagnóstico |
| `demo_cta_click` | CTA “solicitar similar” nas demos |
| `submit_diagnostico` | Envio do formulário + confirmação em `/obrigado` |
| `submit_contato` | Envio do formulário de contato + `/obrigado` |
| `view_case` | Visualização de case (`CaseViewTracker`) |
| `click_case_cta` | Demo ou WhatsApp no hero do case |
| `filter_portfolio` | Alteração de filtros no portfólio |
| `finish_demo_interaction` | Mantido para compatibilidade com fluxos anteriores |

### API interna — `POST /api/analytics/events`

- Allowlist de eventos (sem PII)
- Rate limit por IP (mesmo utilitário de leads)
- Rejeita páginas `/admin`
- Falha silenciosa (`202`) — não bloqueia o site
- Grava em `AnalyticsEvent` (Prisma)

---

## 8. Arquivos criados/alterados

```
src/lib/seo/site.ts
src/lib/seo/schema.ts
src/lib/page-metadata.ts
src/lib/analytics.ts
src/components/seo/json-ld.tsx
src/components/seo/analytics-scripts.tsx
src/components/seo/demo-page-frame.tsx
src/app/sitemap.ts
src/app/robots.ts
src/app/layout.tsx
src/app/admin/layout.tsx
src/app/api/analytics/events/route.ts
src/app/page.tsx
src/app/cases/[slug]/page.tsx
src/app/blog/[slug]/page.tsx
src/app/demo/*/page.tsx (×6)
src/app/_components/home/hero-section.tsx
src/app/_components/portfolio/portfolio-filters-grid.tsx
src/app/_components/portfolio/case-analytics.tsx
src/app/_components/portfolio/case-hero-actions.tsx
src/app/_components/portfolio/case-page-content.tsx
src/app/_components/institutional/contact-form.tsx
src/app/_components/institutional/diagnostico-form.tsx
src/app/_components/institutional/conversion-tracking.tsx
src/components/global/whatsapp-floating-button.tsx
```

---

## 9. Validações

### Build

```bash
npm run build
```

| Métrica | Resultado |
|---------|-----------|
| Status | ✅ Sucesso |
| Rotas | 55 |
| `/sitemap.xml` | ○ Static |
| `/robots.txt` | ○ Static |
| `/api/analytics/events` | ƒ Dynamic |

### Checklist manual

1. Com IDs vazios: inspecionar HTML — sem scripts GTM/gtag.
2. Definir `NEXT_PUBLIC_GTM_ID` ou `NEXT_PUBLIC_GA4_ID` e rebuild — scripts presentes.
3. Acessar `/sitemap.xml` — URLs absolutas com slugs dinâmicos.
4. Acessar `/robots.txt` — bloqueio de `/admin/` e link do sitemap.
5. View Source em `/` — JSON-LD Organization + WebSite.
6. Case e post — BreadcrumbList + schema específico.
7. Enviar evento no console: `trackEvent('click_whatsapp', { location: 'test' })` — dataLayer populado.

---

## 10. Cuidados aplicados

- Build estático preservado (sitemap/robots como rotas metadata do Next.js)
- Sem scripts quando IDs estão vazios
- Admin excluído de indexação e tracking
- API de analytics não expõe dados sensíveis (sem e-mail, nome, telefone)
- Persistência interna fire-and-forget — falha não impacta UX
- Performance: scripts `afterInteractive`, beacon assíncrono

---

## 11. Próximos passos opcionais

- Configurar tags/conversões no painel GTM apontando para os eventos do `dataLayer`
- `opengraph-image.tsx` dinâmico por rota
- RSS do blog no sitemap alternates
- Dashboard admin para consultar `AnalyticsEvent`

---

**Fase 13 concluída.**
