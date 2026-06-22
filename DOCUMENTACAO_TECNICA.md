# Documentação Técnica — Nangell Creative Studio

## 1. Arquitetura

```
Visitante / Admin
       │
       ▼
Next.js App Router
├── Server Components (páginas, SEO, dados)
├── Client Components (demos, formulários, admin)
├── API Routes (/api/leads, /api/admin/*, /api/analytics/events)
└── Middleware (proteção /admin)
       │
       ▼
Prisma ORM → MySQL
```

Demos usam **dados mockados** no browser (sessionStorage/localStorage). Não persistem no banco principal.

## 2. Estrutura de pastas

```txt
prisma/           schema, migrations, seed
public/assets/    brand, mockups
src/
  app/            rotas App Router + APIs
  components/     UI global, demos, SEO, layout
  data/           conteúdo estático enriquecido + fallbacks
  hooks/          hooks reutilizáveis
  lib/            prisma, auth, analytics, SEO, validações
  services/       regras de negócio + acesso ao banco
  types/          tipos compartilhados
  test/           setup Vitest
```

## 3. Banco de dados (Prisma)

### Models principais

| Model | Uso |
|-------|-----|
| `User` | Admin (login bcrypt) |
| `Lead` | Diagnóstico e contato |
| `Project` | Cases do portfólio |
| `Service` | Páginas de soluções |
| `Testimonial` | Depoimentos |
| `Post` | Blog (Markdown) |
| `SiteSetting` | Configurações key-value |
| `AnalyticsEvent` | Eventos de tracking internos |
| `DemoSession` / `DemoInteraction` | Reservado para evolução |

### Enums relevantes

- `LeadStatus`: NOVO → PERDIDO
- `ProjectStatus`: DRAFT, PUBLISHED, HIDDEN
- `PostStatus`: DRAFT, PUBLISHED
- `ServiceStatus`: ACTIVE, INACTIVE

## 4. Rotas

### Públicas (SSG/SSR)

- Home, institucional, soluções, portfólio, cases, demos, blog, legal
- `generateStaticParams` em `/cases/[slug]`, `/solucoes/[slug]`, `/blog/[slug]`

### APIs públicas

| Endpoint | Função |
|----------|--------|
| `POST /api/leads` | Diagnóstico e contato (Zod, honeypot, rate limit) |
| `POST /api/analytics/events` | Persistência opcional de eventos |

### Admin

| Endpoint | Auth |
|----------|------|
| `POST /api/admin/login` | Público (rate limit + lockout) |
| `POST /api/admin/logout` | Sessão |
| `/api/admin/*` | Cookie `nangell_admin_session` |

## 5. Autenticação admin

- Cookie **httpOnly**, `secure` em produção, `sameSite: lax`
- Token HMAC-SHA256 (Web Crypto) via `ADMIN_SESSION_SECRET`
- Middleware em `/admin/*` exceto `/admin/login`
- Layout admin com `robots: noindex`

## 6. Formulários e leads

- **Diagnóstico:** 6 etapas, validação por step + schema final `diagnosticLeadSchema`
- **Contato:** `contactLeadSchema`
- Honeypot: campo `website_url` (bots)
- Rate limit: 5 envios / 15 min por IP+e-mail
- Sanitização: `src/lib/sanitize.ts`
- Sucesso → `sessionStorage` + redirect `/obrigado`

## 7. Demos interativas

| Rota | Componente | Dados |
|------|------------|-------|
| `/demo/crm-inteligente` | CrmDemo | Mock Kanban |
| `/demo/dashboard-bi` | BiDemo | Recharts |
| `/demo/gestao-os` | OsDemo | Mock OS |
| `/demo/plataforma-educacional` | EduDemo | Mock LMS |
| `/demo/link-qr` | LinkQrDemo | sessionStorage |
| `/demo/monitoramento-tempo-real` | MonitoringDemo | Interval mock |

Carregamento via `next/dynamic` (code-splitting). Tracking: `open_demo`, `demo_interaction`, `demo_cta_click`.

## 8. SEO

- Metadata API (`createPageMetadata`, `createArticleMetadata`)
- `metadataBase` + canonical
- `sitemap.ts`, `robots.ts`
- JSON-LD: Organization, WebSite, Article, SoftwareApplication, CreativeWork, BreadcrumbList
- Ver `src/lib/seo/`

## 9. Tracking

- GTM / GA4 condicionais (`NEXT_PUBLIC_*`)
- `trackEvent()` → dataLayer + gtag + beacon `/api/analytics/events`
- Eventos: CTAs, WhatsApp, demos, formulários, portfólio, cases
- Admin excluído do tracking

## 10. Segurança

- Headers em `next.config.ts` (CSP, HSTS prod, X-Frame-Options, etc.)
- Validação Zod em todas as APIs de mutação
- Erros genéricos em produção (`error.tsx`, logger)
- `.env` no `.gitignore`

## 11. Testes automatizados

**Vitest** + Testing Library:

- `src/lib/whatsapp.test.ts`
- `src/lib/sanitize.test.ts`
- `src/lib/validations/lead.test.ts`
- `src/lib/analytics.test.ts`
- `src/lib/api/route-utils.test.ts`
- `src/lib/auth/middleware-utils.test.ts`
- `src/components/global/skip-link.test.tsx`

**E2E:** não configurado nesta fase. Playwright seria indicado para fluxos de diagnóstico e login admin; custo de manutenção maior — priorizamos unitários para utilitários críticos.

## 12. Fallback offline

Serviços em `src/services/*` usam dados de fallback quando o MySQL está indisponível (build e dev sem banco).
