# Relatório — Fase 14: Performance, Acessibilidade, Segurança e Hardening

**Projeto:** Nangell Creative Studio — Site Institucional e Comercial  
**Data/hora:** 2026-06-21  
**Responsável:** AGENT — Performance, A11y e Segurança

---

## 1. Resumo executivo

A Fase 14 aplicou hardening de produção: headers HTTP de segurança, CSP básica compatível com GTM/GA4, lazy loading de demos pesadas, melhorias de acessibilidade (skip link, focus trap, ARIA) e reforço das APIs públicas (405, rate limit, erros seguros, logs sem PII).

**Build:** ✅ Sucesso (55 rotas)  
**Lint:** ⚠️ `npm run lint` executado — 9 erros pré-existentes em painéis admin/demos (regra `react-hooks/set-state-in-effect`); 1 erro corrigido (`contact-form`); warnings menores documentados abaixo.

---

## 2. Problemas encontrados

### Performance

| Problema | Impacto |
|----------|---------|
| Demos importavam Recharts/DnD no bundle inicial da rota | LCP e TTI maiores |
| Imagens de capa sem `sizes` / `loading="lazy"` | Bytes extras, possível CLS |
| `ResponsiveContainer` com `height="100%"` no SSG | Warnings no build, dimensões -1 |
| `gsap` no `package.json` sem uso no código | Dependência morta (~peso de install) |
| Marquee duplicado lido por leitores de tela | Ruído em a11y (indireto em UX) |

### Acessibilidade

| Problema | Impacto |
|----------|---------|
| Ausência de skip link | Navegação por teclado lenta |
| Modal/menu mobile sem focus trap | Foco escapa do diálogo |
| Links de capa do blog sem nome acessível | Botões/links genéricos |
| Marquee animado sem texto alternativo estático | WCAG perceivable |

### Segurança

| Problema | Impacto |
|----------|---------|
| `next.config` sem headers de segurança | XSS/clickjacking/MIME sniffing |
| Login admin expunha contador `attempts` | Enumeração de brute-force |
| APIs públicas sem resposta 405 explícita | Superfície HTTP confusa |
| Analytics compartilhava rate limit de leads (5/15min) | Bloqueio prematuro de eventos |
| `console.error` com possível contexto sensível | Vazamento em logs |
| Erros de página sem boundary seguro | Stack trace potencial no client |
| `window.location.href` no contato | Anti-pattern React + lint error |

---

## 3. Correções realizadas

### Performance

- **`next.config.ts`:** `compress`, `poweredByHeader: false`, imagens AVIF/WebP, cache TTL 30 dias.
- **Demos (6 rotas):** `next/dynamic` + `DemoLoadingSkeleton` — code-splitting de Recharts, DnD, etc.
- **`ProjectCover`:** `sizes`, `loading="lazy"` quando não prioritário.
- **Recharts:** altura fixa (`height={260|160}`) + `minWidth={0}` — elimina warnings SSG.

### Acessibilidade

- **`SkipLink`** + `#main-content` no layout.
- **`.sr-only`** em `globals.css`.
- **`useFocusTrap`** em `Modal` e `MobileMenu`.
- **`TechMarquee`:** lista estática `.sr-only` + marquee visual `aria-hidden`.
- **`post-card`:** `aria-label` nos links de capa.
- **`prefers-reduced-motion`:** já existia globalmente; mantido em animações (`motion-reduce:`).

### Segurança

- **Headers:** `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `CSP`, `HSTS` (produção).
- **`src/lib/api/route-utils.ts`:** `methodNotAllowed`, `parseJsonBody`, `assertJsonObject`.
- **`src/lib/logger.ts`:** logs redigidos em dev; produção sem detalhes sensíveis.
- **`src/lib/rate-limit.ts`:** `checkAnalyticsRateLimit` (120 req/15min).
- **APIs:** GET → 405 em `/api/leads`, `/api/analytics/events`, login/logout admin.
- **Login:** `attempts` só em `development`.
- **`error.tsx` / `global-error.tsx`:** mensagens genéricas, sem stack em produção.
- **`contact-form`:** `router.push` em vez de `window.location`.

---

## 4. Arquivos alterados

```
next.config.ts
src/app/layout.tsx
src/app/globals.css
src/app/error.tsx
src/app/global-error.tsx
src/app/sitemap.ts
src/lib/logger.ts
src/lib/rate-limit.ts
src/lib/api/route-utils.ts
src/hooks/use-focus-trap.ts
src/components/global/skip-link.tsx
src/components/global/mobile-menu.tsx
src/components/global/site-header.tsx
src/components/ui/modal.tsx
src/components/demos/demo-loading-skeleton.tsx
src/components/demos/dashboard-bi/bi-demo.tsx
src/components/demos/monitoramento/monitoring-demo.tsx
src/app/demo/*/page.tsx (×6)
src/app/_components/portfolio/project-cover.tsx
src/app/_components/home/tech-marquee.tsx
src/app/_components/blog/post-card.tsx
src/app/_components/portfolio/case-page-content.tsx
src/app/_components/institutional/contact-form.tsx
src/app/api/leads/route.ts
src/app/api/analytics/events/route.ts
src/app/api/admin/login/route.ts
src/app/api/admin/logout/route.ts
src/services/leads-service.ts
```

---

## 5. Validação

### Build

```bash
npm run build
```

| Métrica | Resultado |
|---------|-----------|
| Status | ✅ Sucesso |
| Rotas | 55 |
| TypeScript | Sem erros |

### Lint

```bash
npm run lint
```

| Resultado | Detalhe |
|-----------|---------|
| Exit code 1 | 9 erros em painéis admin + `link-qr-demo` + `conversion-tracking` (padrão fetch-on-mount) |
| Corrigido nesta fase | `contact-form` (`window.location`) |
| Warnings | imports não usados (admin, sitemap corrigido) |

### Testes manuais sugeridos

- [ ] Formulários contato/diagnóstico → `/obrigado`
- [ ] Login/logout admin + cookie httpOnly
- [ ] Demos carregam skeleton → conteúdo interativo
- [ ] Menu mobile: Tab preso no painel, Escape fecha
- [ ] Modal admin: focus trap e botão fechar
- [ ] Skip link: Tab na carga → conteúdo principal
- [ ] Headers: inspecionar `curl -I` em produção

---

## 6. Checklist de acessibilidade (WCAG 2.2 AA)

| Critério | Status |
|----------|--------|
| Skip navigation | ✅ |
| Foco visível (`:focus-visible`) | ✅ (base CSS) |
| Labels em inputs (`Input`, `Select`, `Textarea`) | ✅ (já existente) |
| Modais com título, `aria-modal`, fechar nomeado | ✅ |
| Menu mobile `role="dialog"` + trap | ✅ |
| `prefers-reduced-motion` | ✅ |
| Imagens com `alt` (`BrandLogo`, `ProjectCover`) | ✅ |
| Links/icon buttons com `aria-label` | ✅ (header, WhatsApp, blog) |
| Formulários com `aria-invalid` / `role="alert"` | ✅ |
| Contraste paleta escura | ⚠️ Validar manualmente em textos `muted` |
| Demos complexas (Kanban, charts) | ⚠️ Revisar labels dinâmicos por widget |

**Meta Lighthouse Accessibility > 95:** depende de auditoria no ambiente deployado; base estrutural implementada.

---

## 7. Checklist de segurança

| Item | Status |
|------|--------|
| CSP básica (self + GTM/GA4) | ✅ |
| X-Frame-Options DENY | ✅ |
| X-Content-Type-Options nosniff | ✅ |
| Referrer-Policy | ✅ |
| Permissions-Policy | ✅ |
| HSTS (produção) | ✅ |
| Admin middleware + sessão HMAC | ✅ (fases anteriores) |
| Cookie httpOnly + secure (prod) | ✅ |
| Rate limit leads | ✅ |
| Rate limit analytics | ✅ (limite dedicado) |
| Honeypot leads | ✅ |
| Validação Zod server-side | ✅ |
| Admin `noindex` | ✅ (fase 13) |
| Erros sem stack em produção | ✅ |
| `/admin` bloqueado em robots | ✅ |

---

## 8. Riscos remanescentes

1. **CSP com `'unsafe-inline'` / `'unsafe-eval'`** — necessário para Next.js e GTM; endurecer com nonces exige pipeline adicional.
2. **Rate limit in-memory** — não compartilha entre instâncias serverless; usar Redis em produção multi-node.
3. **Lint admin panels** — padrão `useEffect + fetch` viola regra React Compiler; refatorar para Server Actions ou SWR.
4. **`gsap` não utilizado** — remover do `package.json` reduz dependências.
5. **Lighthouse Performance > 90** — requer medição real (CDN, imagens em `public/assets`, HTTP/2); lazy demos ajudam mas não garantem score.
6. **Charts no SSG** — altura fixa aplicada; interação client-side ainda carrega Recharts (~pesado).
7. **Contraste WCAG** — alguns textos `nangell-muted` (#94a3b8) sobre `#05070d` devem ser validados com ferramenta de contraste.

---

## 9. Objetivos Core Web Vitals (orientação)

| Métrica | Meta | Ações desta fase |
|---------|------|------------------|
| LCP | < 2.5s | Fontes `display: swap`, imagens otimizadas, demos lazy |
| CLS | < 0.1 | `aspect-video` em capas, charts com altura fixa |
| INP | Bom | Menos JS inicial nas rotas institucionais |

Medição final recomendada: PageSpeed Insights ou Lighthouse CI no deploy de produção.

---

**Fase 14 concluída.**
