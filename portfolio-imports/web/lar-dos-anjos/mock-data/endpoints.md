# Mapeamento de endpoints (modo demonstração)

Na versão demo, **nenhuma chamada sai para produção**. O arquivo `source/apps/web/src/lib/demo/mock-handler.ts` intercepta as rotas abaixo e responde com JSON local.

## Público

| Método | Endpoint | Arquivo / comportamento |
|--------|----------|-------------------------|
| GET | `/public/plans` | `plans.json` |
| GET | `/public/animals` | `animals.json` (filtros: species, size, status) |
| GET | `/public/animals/:id` | item em `animals.json` |
| POST | `/public/animals/:id/adoption-interest` | simulado — mensagem de sucesso |
| GET | `/public/campaigns` | `campaigns.json` |
| GET | `/public/campaigns/:slug` | item em `campaigns.json` |
| GET | `/public/mural` | `mural.json` (sort, limit) |
| GET | `/public/transparency` | `transparency.json` |
| GET | `/public/transparency/expenses` | `transparency.public_expenses` |
| GET | `/public/pix/settings` | `pix-settings.json` |
| POST | `/public/donations/pix` | Pix fictício gerado em memória |
| POST | `/public/donations/pix/:id/mark-as-paid` | simulado |
| POST | `/public/donations/pix/:id/upload-receipt` | simulado |
| GET | `/public/donations/pix/:id/status` | simulado |
| POST | `/public/donations/onetime` | checkout simulado |
| POST | `/public/donations/subscription` | assinatura simulada |
| POST | `/public/lgpd/consent` | simulado |
| GET | `/public/cards/:cardNumber` | `donor.publicCardValidation` |

## Doador (requer token demo após login)

| Método | Endpoint | Arquivo / comportamento |
|--------|----------|-------------------------|
| POST | `/auth/donor/login` | `donor.loginResponse` |
| POST | `/auth/logout` | simulado |
| GET | `/donor/profile` | `donor.profile` |
| PUT | `/donor/profile` | merge simulado |
| GET | `/donor/donations` | `donor.donations` |
| GET | `/donor/impact` | `donor.impact` |
| PUT | `/donor/privacy-preferences` | simulado |
| GET | `/donor/subscription` | `donor.subscription` |
| POST | `/donor/subscription/change-plan` | simulado |
| POST | `/donor/subscription/update-payment` | simulado |
| POST | `/donor/subscription/cancel` | simulado |
| GET | `/donor/card` | `donor.card` |
| POST | `/donor/card/generate` | `donor.card` |

## Painel admin

O painel administrativo (`apps/admin` do monorepo original) **não está incluído** neste build estático. Está documentado no briefing para futura recriação NATIVE ou demo separada.
