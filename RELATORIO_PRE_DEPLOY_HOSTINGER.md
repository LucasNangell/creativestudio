# Relatório Pré-Deploy — Hostinger

**Projeto:** Nangell Creative Studio  
**Data:** 21/06/2026  
**Repositório:** https://github.com/LucasNangell/creativestudio

---

## 1. Resumo do diagnóstico

| Item | Resultado |
|------|-----------|
| **Tipo** | Fullstack (Next.js SSR + API Routes + Admin) |
| **Framework** | Next.js 16, React 19, TypeScript, Tailwind CSS 4 |
| **ORM / Banco** | Prisma + MySQL 8 |
| **Estrutura** | Monorepo simples na raiz (`src/app`, `prisma/`, `database/`) |
| **Frontend** | App Router em `src/app/` |
| **Backend** | API Routes em `src/app/api/` |
| **Banco de dados** | Sim — MySQL com migrations Prisma |
| **Uploads locais** | Não detectados |
| **Caminhos absolutos Windows** | Não detectados no código de produção |
| **Credenciais hardcoded** | Não no código; `.env` local existe e está no `.gitignore` |
| **Testes automatizados** | Sim — Vitest (19 testes) |
| **Documentação prévia** | README, GUIA_DEPLOY (Vercel/VPS), sem guia Hostinger |

**Cenário aplicado:** **E — Next.js SSR** (com Prisma/MySQL).

---

## 2. Arquivos alterados

| Arquivo | Motivo |
|---------|--------|
| `package.json` | Scripts `build`/`start`/`postinstall` para Hostinger; `engines.node >= 20` |
| `src/app/api/health/route.ts` | Healthcheck `/api/health` para monitoramento |
| `database/schema.sql` | Schema MySQL exportado da migration Prisma para import no hPanel |
| `.env.example` | Placeholders completos incluindo `NODE_ENV` e `PORT` |
| `.gitignore` | Padronizado (`node_modules/`, `dist/`, `coverage/`, etc.) |
| `DEPLOY_HOSTINGER.md` | Documentação completa de deploy no hPanel |
| `RELATORIO_PRE_DEPLOY_HOSTINGER.md` | Este relatório |

**Arquivos não alterados (já adequados):**

- `next.config.ts` — sem `output: 'export'` (correto para SSR)
- `prisma/schema.prisma` — usa `env("DATABASE_URL")`
- Serviços com fallback quando DB indisponível

---

## 3. Comandos executados

```bash
npm install          # OK — postinstall prisma generate
npm run build        # OK — prisma generate + next build
npm start            # OK — next start -H 0.0.0.0, Ready em ~309ms
npm test             # OK — 7 arquivos, 19 testes passando
GET /api/health      # OK — 200 {"status":"ok",...}
```

---

## 4. Resultado dos testes

| Comando | Resultado |
|---------|-----------|
| `npm install` | ✅ Sucesso |
| `npm run build` | ✅ Sucesso (55 páginas geradas) |
| `npm start` | ✅ Servidor pronto em `0.0.0.0:3000` |
| `npm test` | ✅ 19/19 testes passando |
| Healthcheck | ✅ `/api/health` → 200 |

---

## 5. Pendências que dependem do hPanel

1. Criar banco MySQL no hPanel e importar `database/schema.sql`
2. Configurar variáveis de ambiente (ver seção 6)
3. Conectar repositório GitHub e executar primeiro deploy
4. (Opcional) Rodar seed: `DATABASE_URL=... npm run db:seed` localmente apontando ao banco Hostinger
5. Alterar senha do admin após primeiro login
6. Configurar domínio e SSL no hPanel

---

## 6. Variáveis para cadastrar na Hostinger

| Variável | Valor sugerido |
|----------|----------------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | `mysql://USER:SENHA@localhost:3306/DB?charset=utf8mb4` |
| `NEXT_PUBLIC_SITE_URL` | `https://seudominio.com` |
| `ADMIN_SESSION_SECRET` | String aleatória com 32+ caracteres |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Ex.: `5561982015585` |
| `NEXT_PUBLIC_GTM_ID` | (opcional) |
| `NEXT_PUBLIC_GA4_ID` | (opcional) |

> `PORT` é definida automaticamente pela Hostinger. Não fixe manualmente.

---

## 7. Configuração final recomendada para o hPanel

```txt
Tipo de aplicação: Fullstack Next.js (SSR + API Routes)
Framework: Next.js 16 + TypeScript + Prisma + MySQL
Node.js version: 20.x
GitHub repository: https://github.com/LucasNangell/creativestudio
Branch: main
Root directory: .
Install command: npm install
Build command: npm run build
Start command: npm start
Output directory: .next/
Entry file: (usar Start command)
Variáveis de ambiente obrigatórias: NODE_ENV, DATABASE_URL, NEXT_PUBLIC_SITE_URL, ADMIN_SESSION_SECRET, NEXT_PUBLIC_WHATSAPP_NUMBER
Banco de dados: MySQL 8
Local do schema.sql: database/schema.sql
Precisa de public_html manual? Não
Precisa de .htaccess manual? Não
```

---

## 8. Instruções para falhas comuns

### Build falha em `prisma generate`

- Confirme Node.js 20 no hPanel.
- Verifique se `npm install` instalou devDependencies (Prisma CLI está em `devDependencies`).

### Erro de conexão MySQL em runtime

- Valide `DATABASE_URL` com senha URL-encoded.
- Host na Hostinger geralmente é `localhost`.
- Importe `database/schema.sql` antes de subir o app.

### Admin não faz login

- Confirme `ADMIN_SESSION_SECRET` definido.
- Rode seed ou crie usuário manualmente no banco.

### Site exibe conteúdo fallback (sem dados do banco)

- Banco vazio ou inacessível — importe schema e execute seed.
- Serviços têm fallback estático intencional para resiliência.

### 502 Bad Gateway

- Verifique Application logs no hPanel.
- Confirme Start command: `npm start` (não `npm run dev`).

---

## 9. Scripts finais do package.json

```json
{
  "engines": { "node": ">=20" },
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "postinstall": "prisma generate",
    "start": "next start -H 0.0.0.0",
    "lint": "eslint .",
    "test": "vitest run"
  }
}
```

---

## 10. Observações de segurança

- `.env` com credenciais locais **não** foi commitado.
- `.env.example` contém apenas placeholders.
- README menciona credenciais seed de demonstração — altere em produção.
