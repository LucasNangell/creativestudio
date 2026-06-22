# Guia de Deploy — Nangell Creative Studio

## Pré-requisitos comuns

1. Node.js 20+
2. MySQL 8+ (local ou nuvem)
3. Variáveis do `.env.example` configuradas
4. Build local validado: `npm run build && npm test`

---

## Opção A — Deploy local (homologação)

```bash
# 1. Banco
npm run db:generate
npm run db:migrate
npm run db:seed

# 2. Build
npm run build

# 3. Servir
npm start
# http://localhost:3000
```

Para homologação em rede local, use `NEXT_PUBLIC_SITE_URL=http://<ip>:3000`.

---

## Opção B — Vercel (recomendado para Next.js)

### 1. Repositório

Conecte o repositório Git à Vercel.

### 2. Variáveis de ambiente

No painel Vercel → Settings → Environment Variables:

| Variável | Ambiente |
|----------|----------|
| `DATABASE_URL` | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | Production (= domínio final) |
| `ADMIN_SESSION_SECRET` | Production |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | All |
| `NEXT_PUBLIC_GTM_ID` | Production |
| `NEXT_PUBLIC_GA4_ID` | Production (se sem GTM) |

### 3. Banco MySQL na nuvem

Opções: PlanetScale (MySQL compatível), Railway, AWS RDS, DigitalOcean.

- Libere IP ou use connection pooling compatível com serverless
- Execute migrations a partir da máquina local ou CI:

```bash
DATABASE_URL="mysql://..." npx prisma migrate deploy
DATABASE_URL="mysql://..." npm run db:seed
```

### 4. Deploy

```bash
vercel --prod
```

Ou push na branch `main` com integração contínua.

### 5. Domínio

Vercel → Domains → adicionar `nangell.com.br` e configurar DNS.

---

## Opção C — VPS (Linux)

Exemplo: Ubuntu 22.04 + Nginx + PM2 + MySQL local.

### 1. Servidor

```bash
sudo apt update && sudo apt install -y nodejs npm nginx mysql-server
sudo npm i -g pm2
```

### 2. Aplicação

```bash
git clone <repo> /var/www/nangell
cd /var/www/nangell
npm ci
cp .env.example .env
# editar .env
npm run db:generate
npm run db:migrate
npm run db:seed
npm run build
pm2 start npm --name nangell -- start
pm2 save
```

### 3. Nginx (reverse proxy)

```nginx
server {
  listen 443 ssl http2;
  server_name nangell.com.br;

  ssl_certificate     /etc/letsencrypt/live/nangell.com.br/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/nangell.com.br/privkey.pem;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

```bash
sudo certbot --nginx -d nangell.com.br
```

### 4. Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

---

## Migração de banco

```bash
# Desenvolvimento → nova migration
npm run db:migrate

# Produção (aplica migrations pendentes)
npx prisma migrate deploy
```

Nunca use `migrate dev` em produção.

---

## Rollback

### Código

- **Vercel:** Promover deployment anterior no dashboard
- **VPS:** `git checkout <tag-anterior>`, `npm ci`, `npm run build`, `pm2 restart nangell`

### Banco

1. Restaurar dump MySQL anterior:

```bash
mysql -u user -p nangell_creative_studio < backup-YYYY-MM-DD.sql
```

2. Se migration irreversível, restaurar backup é a única opção segura.

### Checklist pós-rollback

- [ ] Site responde 200
- [ ] Admin login OK
- [ ] Formulários salvam leads
- [ ] `NEXT_PUBLIC_SITE_URL` consistente

---

## Comandos úteis

| Comando | Uso |
|---------|-----|
| `npm run build` | Build produção |
| `npm start` | Servidor produção |
| `npm run db:studio` | Inspecionar banco (dev) |
| `npx prisma migrate deploy` | Migrations em prod |
| `pm2 logs nangell` | Logs VPS |
