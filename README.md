# Nangell Creative Studio — Site Institucional

Site comercial e institucional da **Nangell Creative Studio**: vitrine de soluções, portfólio com demos interativas, captura de leads, blog e painel administrativo.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS 4** + design system próprio
- **Prisma** + **MySQL**
- **React Hook Form** + **Zod**
- **react-markdown** (blog)
- **Recharts**, **@dnd-kit** (demos)

## Requisitos

- Node.js 20+
- MySQL 8+

## Instalação

```bash
git clone <repo>
cd creativesite
npm install
cp .env.example .env
```

Configure `DATABASE_URL` e demais variáveis no `.env`.

## Banco de dados

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

O seed cria admin, serviços, projetos, posts, depoimentos e configurações iniciais.

## Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Build e produção

```bash
npm run build
npm start
```

## Testes e qualidade

```bash
npm test          # Vitest (unitários)
npm run lint      # ESLint
npx prisma validate
```

## Variáveis de ambiente

| Variável | Descrição |
|----------|-----------|
| `DATABASE_URL` | Conexão MySQL (Prisma) |
| `NEXT_PUBLIC_SITE_URL` | URL pública do site (SEO, sitemap) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número WhatsApp (somente dígitos) |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager (opcional) |
| `NEXT_PUBLIC_GA4_ID` | GA4 direto se não usar GTM (opcional) |
| `ADMIN_SESSION_SECRET` | Segredo HMAC da sessão admin (32+ chars em prod) |

Veja `.env.example` para o modelo completo.

## Admin

- **URL:** `/admin/login`
- **Credenciais seed (altere em produção):**
  - E-mail: `admin@nangell.com.br`
  - Senha: `NangellAdmin@2026`

Módulos: leads, projetos, serviços, depoimentos, blog, configurações.

## Rotas principais

| Área | Rotas |
|------|-------|
| Institucional | `/`, `/sobre`, `/processo` |
| Soluções | `/solucoes`, `/solucoes/[slug]` |
| Portfólio | `/portfolio`, `/cases/[slug]` |
| Demos | `/demo/*` (6 demos interativas) |
| Conversão | `/diagnostico`, `/contato`, `/obrigado` |
| Blog | `/blog`, `/blog/[slug]` |
| Legal | `/politica-de-privacidade`, `/termos-de-uso` |
| Admin | `/admin/*` |
| SEO | `/sitemap.xml`, `/robots.txt` |

## Documentação adicional

- [DOCUMENTACAO_TECNICA.md](./DOCUMENTACAO_TECNICA.md) — arquitetura e detalhes técnicos
- [CHECKLIST_PRODUCAO.md](./CHECKLIST_PRODUCAO.md) — checklist antes do go-live
- [GUIA_DEPLOY.md](./GUIA_DEPLOY.md) — deploy local, Vercel e VPS
- [GUIA_MANUTENCAO.md](./GUIA_MANUTENCAO.md) — operação do dia a dia
- Relatórios de fase: `RELATORIO_FASE_*.md`

## Licença

Projeto privado — Nangell Creative Studio.
