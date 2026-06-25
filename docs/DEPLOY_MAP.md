# DEPLOY MAP — Nangell Creative Studio

Este mapa serve para orientar o processo de empacotamento (build), publicação (deploy) e configuração de infraestrutura nos ambientes de desenvolvimento, homologação e produção.

---

## 1. Comandos de Build e Execução

### Ambiente de Desenvolvimento (Local)

- **Instalação:** `npm install`
- **Executar Localmente:** `npm run dev` (Servidor inicia em `http://localhost:3000`)
- **Testes Unitários:** `npm test` (Executa o Vitest)
- **Linter de Qualidade:** `npm run lint` (Executa ESLint)

### Preparação para Produção (Build)

- **Comando de Compilação:** `npm run build`
  Este comando executa a pipeline de build descrita em [`package.json`](file:///e:/Creative%20Studio/creative%20studio/creativesite/package.json):
  1. `node scripts/sync-brand-assets.mjs` — Sincroniza logotipos e recursos de marca.
  2. `prisma generate` — Cria os types atualizados do banco.
  3. `node scripts/integrate-portfolio-demos.mjs` — Prepara assets e rotas das demonstrações interativas.
  4. `node scripts/integrate-encurtou-marketing.mjs` — Vincula módulos de conversão/links.
  5. `next build` — Compila a aplicação Next.js gerando arquivos estáticos e otimizados em `.next/`.
  6. `node scripts/verify-demo-assets.mjs` — Verifica se todos os arquivos das demos foram gerados.
- **Comando de Inicialização:** `npm start`
  Executa `node scripts/ensure-admin-user.mjs` (para validar ou criar o usuário admin no banco de dados) e sobe o servidor Next.js em produção (`next start -H 0.0.0.0`).

---

## 2. Variáveis de Ambiente Necessárias (Template)

As seguintes variáveis devem ser criadas no painel da plataforma de deploy de produção. **Nunca copie dados reais ou credenciais para o repositório git.**

| Nome da Variável              | Tipo        | Exemplo de Uso                         | Descrição                                                         |
| :---------------------------- | :---------- | :------------------------------------- | :---------------------------------------------------------------- |
| `NODE_ENV`                    | Sistema     | `production`                           | Define o modo de runtime do Node.js                               |
| `DATABASE_URL`                | Sensível    | `mysql://user:pass@host:3306/db`       | String de conexão segura com o MySQL                              |
| `ADMIN_SESSION_SECRET`        | Sensível    | `c9bdf6...32+chars...`                 | Chave de assinatura criptográfica HMAC da sessão do painel        |
| `NEXT_PUBLIC_SITE_URL`        | Pública     | `https://nangellcreativestudio.online` | URL principal com protocolo HTTPS para geração de SEO/Sitemaps    |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Pública     | `5511999999999`                        | Telefone de contato (DDI + DDD + Número apenas com dígitos)       |
| `ADMIN_BOOTSTRAP_EMAIL`       | Recomendado | `admin@nangell.com.br`                 | Email padrão para bootstrapping do primeiro acesso admin          |
| `ADMIN_BOOTSTRAP_PASSWORD`    | Recomendado | `SenhaSegura2026`                      | Senha padrão do bootstrap (deve ser trocada após login inicial)   |
| `GEMINI_API_KEY`              | Sensível    | `AIzaSy...`                            | Chave secreta de autenticação na API do Gemini (usada em /escopo) |

| `NEXT_PUBLIC_GTM_ID` | Opcional | `GTM-XXXXXXX` | Identificador do Google Tag Manager |
| `NEXT_PUBLIC_GA4_ID` | Opcional | `G-XXXXXXXXXX` | Identificador do Google Analytics 4 (usado se GTM estiver ausente) |

---

## 3. Ambientes de Deploy Suportados

### Opção A: Vercel (Recomendado para Next.js)

1. Conecte o repositório GitHub ao painel da Vercel.
2. Defina as variáveis de ambiente na aba **Settings → Environment Variables**.
3. Como a Vercel é Serverless, o banco de dados MySQL deve estar em um provedor cloud (RDS, Railway, PlanetScale).
4. Aplique as migrações no banco remoto antes de subir a versão final:
   `DATABASE_URL="mysql://..." npx prisma migrate deploy`

### Opção B: VPS Linux (Ubuntu + Nginx + PM2)

1. Instale o Node.js 20, MySQL 8, PM2 e Nginx.
2. Clone o repositório na pasta desejada (ex: `/var/www/nangell`).
3. Crie e configure o arquivo `.env` local com dados de produção.
4. Execute `npm install`, `npm run build` e rode a migração do banco.
5. Inicie com PM2: `pm2 start npm --name nangell -- start`.
6. Configure o Nginx como Proxy Reverso apontando para `http://127.0.0.1:3000` conforme descrito em [GUIA_DEPLOY.md](file:///e:/Creative%20Studio/creative%20studio/creativesite/GUIA_DEPLOY.md#L104-L125).

### Opção C: Hostinger (Business Web Hosting - Node.js Web App)

Deploy sem PM2 ou Nginx manuais (usando controle de processos nativo da Hostinger):

1. **Node.js Web App:** Crie uma aplicação Node no painel Hostinger (hPanel) apontando para a raiz `.`.
2. **Banco de Dados:** Crie o banco MySQL no hPanel, importe a estrutura usando [`database/schema.sql`](file:///e:/Creative%20Studio/creative%20studio/creativesite/database/schema.sql) através do phpMyAdmin ou execute a migration da sua máquina para o host remoto.
3. **Variáveis:** Configure as variáveis direto na interface de variáveis de ambiente no hPanel.
4. **Comandos de Execução:** Configure a versão do Node para `20.x`, o install command como `npm install`, build command como `npm run build` e start command como `npm start`.
5. **CDN Cache:** Após finalizar deploys visuais, se novos estilos ou scripts parecerem desatualizados, faça um flush no cache da CDN no painel Hostinger.

---

## 4. Cuidados e Restrições Críticas

> [!WARNING]
>
> - **Otimização de Imagens na Hostinger:** A Hostinger bloqueia ou limita o otimizador nativo do Next.js `/_next/image` retornando o código de erro `503 Service Unavailable`. No arquivo [`next.config.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/next.config.ts), garanta que a propriedade `images.unoptimized` esteja definida como `true`, ou faça o deploy de assets visuais estáticos no diretório `/assets/mockups/` servindo diretamente.
> - **Troca de Senha Seed:** Sempre altere a senha padrão gerada no script de bootstrap/seed no primeiro acesso após a conclusão do deploy da aplicação.
> - **Exclusão do .env:** Verifique sempre se o arquivo `.env` local consta no `.gitignore` antes de fazer qualquer push para o repositório Git público ou privado.
