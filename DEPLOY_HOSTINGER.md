# Deploy na Hostinger — Nangell Creative Studio

Guia de deploy para **Business Web Hosting** com **Node.js Web App** (sem VPS, sem PM2/Nginx manual).

---

## 1. Tipo de aplicação detectada

**Fullstack Next.js com SSR e API Routes** — o servidor Node.js executa o Next.js em produção (`next start`). Não é site estático puro.

## 2. Framework detectado

- **Next.js 16** (App Router) + **TypeScript**
- **Prisma ORM** + **MySQL 8**
- **Tailwind CSS 4**

## 3. Versão Node recomendada

**Node.js 20 LTS** (mínimo 20.x conforme `engines` no `package.json`).

## 4. Branch GitHub

`main`

## 5. Root directory

`.` (raiz do repositório — onde está o `package.json`)

## 6. Install command

```bash
npm install
```

## 7. Build command

```bash
npm run build
```

Executa `prisma generate` + `next build`. A saída fica em `.next/`.

## 8. Start command

```bash
npm start
```

Equivale a `next start -H 0.0.0.0`. A Hostinger define `PORT` automaticamente; o Next.js a utiliza.

## 9. Output directory

`.next/` (gerada no build — **não commitar**)

Para app Node.js SSR, a Hostinger não usa output estático como `dist/`. O runtime serve via `next start`.

## 10. Entry file

Não há entry file manual. O hPanel deve usar o **Start command** `npm start` (ou `next start -H 0.0.0.0`).

## 11. Variáveis de ambiente obrigatórias

Configure no **hPanel → Node.js Web App → Environment Variables** (nunca no GitHub):

| Variável | Obrigatória | Descrição |
|----------|-------------|-----------|
| `NODE_ENV` | Sim | `production` |
| `PORT` | Sim* | Definida pela Hostinger automaticamente |
| `DATABASE_URL` | Sim | Conexão MySQL (Prisma) |
| `NEXT_PUBLIC_SITE_URL` | Sim | URL pública (`https://seudominio.com`) |
| `ADMIN_SESSION_SECRET` | Sim | Segredo HMAC da sessão admin (32+ chars) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Sim | WhatsApp com DDI (somente dígitos) |
| `NEXT_PUBLIC_GTM_ID` | Não | Google Tag Manager |
| `NEXT_PUBLIC_GA4_ID` | Não | Google Analytics 4 |

\* A Hostinger injeta `PORT`; não fixe manualmente salvo orientação do suporte.

Modelo completo: `.env.example`

## 12. Banco de dados

**MySQL 8** via Prisma.

### Criar banco no hPanel

1. hPanel → **Bancos de dados MySQL** → criar banco e usuário.
2. Anote host, nome do banco, usuário e senha.
3. Monte `DATABASE_URL`:

```txt
mysql://USUARIO:SENHA_CODIFICADA@localhost:3306/NOME_DO_BANCO?charset=utf8mb4
```

Codifique caracteres especiais na senha (`@` → `%40`, etc.).

### Importar schema

**Opção A — phpMyAdmin (recomendado na primeira vez):**

1. hPanel → phpMyAdmin → selecione o banco.
2. Aba **Importar** → escolha `database/schema.sql`.
3. Execute.

**Opção B — Prisma migrate (a partir da sua máquina local):**

```bash
DATABASE_URL="mysql://..." npx prisma migrate deploy
```

### Seed inicial (opcional)

```bash
DATABASE_URL="mysql://..." npm run db:seed
```

> **Importante:** altere a senha do admin seed após o primeiro login.

## 13. Local do schema.sql

`database/schema.sql`

## 14. Explicação sobre public_html

Na Hostinger com **Node.js Web App**, o app roda como processo Node gerenciado pelo hPanel. **Não** use `public_html` como raiz do backend Next.js.

O tráfego HTTP é roteado pelo painel para o processo Node na porta `PORT`. Não copie manualmente arquivos para `public_html` para este app.

## 15. Precisa de .htaccess manual?

**Não.** O roteamento é feito pelo Node.js Web App do hPanel. Não configure Apache/Nginx manualmente.

## 16. Como fazer deploy pelo GitHub na Hostinger

1. Faça push do código para `https://github.com/LucasNangell/creativestudio` (branch `main`).
2. hPanel → **Websites** → seu domínio → **Node.js Web App** (ou **Deploy**).
3. Conecte o repositório GitHub e autorize acesso.
4. Selecione repositório `LucasNangell/creativestudio`, branch `main`.
5. Preencha os campos conforme a seção **CONFIGURAÇÃO RECOMENDADA** abaixo.
6. Cadastre todas as variáveis de ambiente.
7. Crie/importe o banco MySQL antes do primeiro deploy.
8. Clique em **Deploy** / **Create**.

## 17. Como fazer redeploy no hPanel

1. hPanel → Node.js Web App → seu app.
2. **Redeploy** ou **Deploy again** (dispara novo build a partir do GitHub).
3. Para forçar rebuild após push: alguns planos redeployam automaticamente; caso contrário, use o botão manual.

## 18. Onde verificar build logs

hPanel → Node.js Web App → **Deployments** / **Build logs** (ou **Logs** durante o build).

Procure erros em `prisma generate`, `next build` ou dependências.

## 19. Onde verificar runtime logs

hPanel → Node.js Web App → **Application logs** / **Runtime logs**.

Teste healthcheck: `https://seudominio.com/api/health` → deve retornar `{"status":"ok",...}`.

## 20. Checklist final de produção

- [ ] Banco MySQL criado e `database/schema.sql` importado
- [ ] `DATABASE_URL` configurada no hPanel
- [ ] `ADMIN_SESSION_SECRET` com 32+ caracteres aleatórios
- [ ] `NEXT_PUBLIC_SITE_URL` com HTTPS e domínio final
- [ ] Build concluiu sem erro
- [ ] `/api/health` responde 200
- [ ] Homepage carrega
- [ ] Formulário de contato/diagnóstico salva leads
- [ ] `/admin/login` acessível e senha seed alterada
- [ ] `.env` **não** está no repositório

---

## CONFIGURAÇÃO RECOMENDADA NO HPANEL HOSTINGER

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
Output directory: .next/ (gerado no build; runtime via next start)
Cache HTML: após deploy, aguarde ~1 min ou limpe cache CDN no hPanel se estilos não carregarem
NEXT_PUBLIC_SITE_URL: https://nangellcreativestudio.online (obrigatório — nunca localhost em produção)
Entry file: (não aplicável — usar Start command npm start)
Variáveis de ambiente obrigatórias: NODE_ENV, DATABASE_URL, NEXT_PUBLIC_SITE_URL, ADMIN_SESSION_SECRET, NEXT_PUBLIC_WHATSAPP_NUMBER
Banco de dados: MySQL 8 — criar no hPanel e importar database/schema.sql
Local do schema.sql: database/schema.sql
Precisa de public_html manual? Não
Precisa de .htaccess manual? Não
Como reiniciar/redeployar: hPanel → Node.js Web App → Redeploy
Onde ver logs de build: hPanel → Node.js Web App → Deployments / Build logs
Onde ver logs de runtime: hPanel → Node.js Web App → Application logs
Observações críticas:
  - Configure DATABASE_URL antes do primeiro deploy.
  - O build executa prisma generate automaticamente.
  - Next.js escuta em 0.0.0.0 e usa process.env.PORT da Hostinger.
  - Não commite .env nem node_modules.
  - Altere credenciais do admin seed após go-live.
```

---

## Falhas comuns

| Sintoma | Causa provável | Solução |
|---------|----------------|---------|
| Build falha em `prisma generate` | Node < 20 ou deps incompletas | Use Node 20; confirme `npm install` |
| App sobe mas páginas admin quebram | `ADMIN_SESSION_SECRET` ausente | Cadastre no hPanel |
| Erro de conexão MySQL | `DATABASE_URL` incorreta | Verifique usuário, senha codificada, host `localhost` |
| Site mostra conteúdo fallback | Banco vazio ou inacessível | Importe schema e rode seed |
| 502 / app não responde | Build falhou ou start incorreto | Verifique logs; use `npm start` |
| Links/SEO errados | `NEXT_PUBLIC_SITE_URL` incorreta | Atualize para domínio HTTPS final |
