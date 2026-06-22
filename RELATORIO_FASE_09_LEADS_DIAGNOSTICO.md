# Relatório — Fase 9: Leads, Diagnóstico e Captação

**Projeto:** Nangell Creative Studio — Site Institucional e Comercial  
**Data/hora:** 2026-06-21  
**Responsável:** AGENT — Formulários e Leads

---

## 1. Resumo executivo

A Fase 9 implementou o fluxo completo de captação de leads: formulário multi-etapas em `/diagnostico`, integração do `/contato` ao mesmo endpoint, API REST `POST /api/leads`, validação Zod client/server, antispam básico, utilitário WhatsApp contextual e página `/obrigado` aprimorada.

**Build:** ✅ Sucesso (31 rotas — incluindo `ƒ /api/leads`)  
**Banco:** Persistência via Prisma → tabela `leads` com status inicial `NOVO`

---

## 2. Rotas implementadas

| Rota | Arquivo | Função |
|------|---------|--------|
| `/diagnostico` | `src/app/diagnostico/page.tsx` | Formulário 6 etapas |
| `/contato` | `src/app/contato/page.tsx` | Formulário rápido (atualizado) |
| `/obrigado` | `src/app/obrigado/page.tsx` | Confirmação + tracking |
| `POST /api/leads` | `src/app/api/leads/route.ts` | API unificada de leads |

---

## 3. Formulário `/diagnostico` — 6 etapas

| Etapa | Campos |
|-------|--------|
| 1 — Identificação | nome, e-mail, WhatsApp, empresa, site/Instagram |
| 2 — Tipo de projeto | 11 opções (Sistema web … Ainda não sei) |
| 3 — Desafio | descrição do problema, categoria da dor (8 opções) |
| 4 — Momento | momento do projeto, urgência, prazo desejado |
| 5 — Investimento | faixa de budget (6 opções) |
| 6 — Finalização | melhor horário, preferência de contato, consentimento LGPD |

### UX implementada

- Indicador de progresso (% + barra + segmentos desktop)
- Botões Voltar / Avançar / Enviar
- Validação por etapa (`trigger` nos campos da etapa)
- Loading no envio
- Toast de sucesso/erro (`src/components/ui/toast.tsx`)
- Rascunho opcional em `localStorage` (`nangell-diagnostico-draft`)
- Captura UTM e `?demo=` da URL
- Honeypot `website_url` (campo oculto)
- Responsivo e navegável por teclado

---

## 4. Formulário `/contato`

- Migrado para **React Hook Form + Zod**
- Mesmo endpoint `POST /api/leads` com `source_page: "/contato"`
- `project_type` salvo como **"Contato rápido"**
- Mensagem gravada em `challenge` e `message`
- Honeypot, toast, consentimento LGPD e redirecionamento para `/obrigado`

---

## 5. Validação Zod

**Arquivo:** `src/lib/validations/lead.ts`

| Schema | Uso |
|--------|-----|
| `diagnosticStep1Schema` … `diagnosticStep6Schema` | Validação por etapa |
| `diagnosticLeadSchema` | Payload completo do diagnóstico |
| `contactLeadSchema` | Formulário de contato |
| `leadApiPayloadSchema` | Union discriminada por `source_page` |

Validações principais:

- Nome ≥ 2 caracteres
- E-mail válido
- Telefone/WhatsApp ≥ 10 dígitos
- Descrição do desafio ≥ 20 caracteres (diagnóstico)
- Mensagem ≥ 10 caracteres (contato)
- Enums para tipo de projeto, dor, urgência, budget, contato
- Consentimento LGPD obrigatório (`consent === true`)
- Honeypot `website_url` deve permanecer vazio

---

## 6. API `POST /api/leads`

**Arquivo:** `src/app/api/leads/route.ts`

### Fluxo

1. Parse JSON
2. Honeypot — retorna sucesso silencioso se preenchido (anti-bot)
3. Rate limit em memória (IP + e-mail)
4. Validação Zod conforme `source_page`
5. Sanitização + persistência via `leads-service`
6. Resposta JSON

### Respostas

| Status | Situação |
|--------|----------|
| 200 | Lead criado (`success: true`, `id`) |
| 400 | Payload inválido |
| 422 | Erros de validação (`issues`) |
| 429 | Rate limit (`Retry-After`) |
| 500 | Erro ao salvar no banco |

### Campos capturados no banco

| Campo Prisma | Origem |
|--------------|--------|
| `name`, `email`, `phone`, `company`, `website` | Etapa 1 / contato |
| `projectType` | Etapa 2 ou "Contato rápido" |
| `challenge` | Texto estruturado (diagnóstico) ou mensagem |
| `budgetRange`, `urgency`, `preferredContact` | Etapas 4–6 |
| `message` | Melhor horário (diagnóstico) ou mensagem (contato) |
| `sourcePage` | `/diagnostico` ou `/contato` |
| `sourceDemo`, `utmSource`, `utmMedium`, `utmCampaign` | Query string / payload |
| `consent` | `true` |
| `status` | `NOVO` |

---

## 7. Antispam

| Mecanismo | Implementação |
|-----------|---------------|
| Honeypot | Campo `website_url` oculto — bots preenchem, humanos não |
| Rate limit | `src/lib/rate-limit.ts` — máx. 5 req / 15 min por IP+e-mail |
| Intervalo mínimo | 30 segundos entre envios do mesmo par IP+e-mail |
| Consentimento | Bloqueio server-side se `consent !== true` |

> Rate limit em memória — adequado para desenvolvimento; em produção recomenda-se Redis ou edge rate limiting.

---

## 8. Sanitização

**Arquivo:** `src/lib/sanitize.ts`

- Remoção de tags HTML e caracteres de controle
- Normalização de e-mail (lowercase)
- Normalização de telefone (apenas dígitos)
- Limite de tamanho por campo

---

## 9. WhatsApp

**Arquivo:** `src/lib/whatsapp.ts`

- Número: `5561982015585`
- `buildWhatsAppUrl(message?)`
- `buildContextualWhatsAppMessage({ name, company, source, projectType })`
- `buildContextualWhatsAppUrl(context)`

Contextos: `diagnostico`, `contato`, `obrigado`, `demo`, `geral`

`src/data/navigation.ts` reexporta funções para compatibilidade com componentes existentes.

---

## 10. Página `/obrigado`

Melhorias:

- Copy contextual (diagnóstico vs contato) via `sessionStorage`
- Exibição de nome/empresa quando disponível
- WhatsApp com mensagem pré-preenchida contextual
- Links: portfólio, demos, novo diagnóstico
- Tracking GA4/GTM preparado (`lead_form_success`, `generate_lead`)

**Arquivos:** `obrigado-page-content.tsx`, `conversion-tracking.tsx`

---

## 11. Bibliotecas instaladas

```json
"react-hook-form": "^7.x",
"zod": "^4.4.3",
"@hookform/resolvers": "^5.x"
```

---

## 12. Arquivos criados/alterados

```
src/
├── app/
│   ├── api/leads/route.ts
│   ├── diagnostico/page.tsx
│   └── _components/institutional/
│       ├── diagnostico-form.tsx
│       ├── contact-form.tsx          (refatorado)
│       ├── obrigado-page-content.tsx (melhorado)
│       └── conversion-tracking.tsx   (melhorado)
├── components/ui/toast.tsx
├── data/institutional/
│   ├── diagnostico.ts
│   └── contato.ts                    (atualizado)
├── lib/
│   ├── validations/lead.ts
│   ├── sanitize.ts
│   ├── rate-limit.ts
│   └── whatsapp.ts
└── services/leads-service.ts
```

---

## 13. Resultado do build

```
npm run build
✓ Compiled successfully
✓ Generating static pages (31/31)

ƒ /api/leads          (Dynamic)
○ /diagnostico
○ /contato
○ /obrigado
```

---

## 14. Testes manuais recomendados

| Teste | Como validar |
|-------|--------------|
| Formulário completo | Preencher 6 etapas → redirect `/obrigado` |
| Erros de validação | Avançar sem preencher → mensagens por campo + toast |
| Envio duplicado | Enviar 2x em < 30s → HTTP 429 |
| Honeypot | Preencher campo oculto via DevTools → resposta silenciosa |
| Salvamento no banco | `npx prisma studio` → tabela `leads` com status `NOVO` |
| Contato rápido | `/contato` → lead com `projectType: Contato rápido` |
| WhatsApp contextual | `/obrigado` após envio → mensagem com nome/empresa |
| Rascunho | Salvar rascunho → recarregar → dados restaurados |

---

## 15. Limitações conhecidas

| Limitação | Detalhe |
|-----------|---------|
| Rate limit | Em memória — reinicia a cada deploy/restart |
| Rascunho | Apenas `localStorage` local — não sincroniza entre dispositivos |
| Banco offline | API retorna 500 — build não exige MySQL ativo |
| Blog | Rota `/blog` ainda não implementada (nav referencia) |
| E-mail transacional | Não envia confirmação por e-mail nesta fase |

---

## 16. Integração com demos (Fase 8)

CTAs das demos em `/diagnostico` agora resolvem corretamente. Parâmetros suportados:

- `?utm_source=&utm_medium=&utm_campaign=`
- `?demo=crm-inteligente` → gravado em `source_demo`

---

**Fase 9 concluída.** Fluxo de diagnóstico operacional com validação dupla, antispam básico, persistência MySQL e conversão rastreada.
