# Relatório de Integração — Portfólio & Hostinger

**Data:** 22/06/2026  
**Projeto:** Nangell Creative Studio (`creativesite`)  
**Branch:** `main`

---

## 1. Sistemas encontrados em `portfolio-imports/`

### `portfolio-imports/web/` (7 sistemas)

| Slug | Nome | Build estático | Estratégia aplicada |
|------|------|----------------|---------------------|
| `lar-dos-anjos` | Plataforma de Doações para Abrigos | Sim (`build/out/`) | **IFRAME** |
| `player-video-marcadores` | Player de Vídeo Corporativo | Sim (`build/`) | **IFRAME** |
| `monitor-arquivos` | HT Monitor — Automação de PDFs | Sim (`build/`) | **IFRAME** |
| `gestao-producao-grafica` | Gestão de Produção Gráfica | Sim (`build/`) | **IFRAME** |
| `vigilia-politica` | Vigília Política | Sim (`vigilia-politica/build/`) | **IFRAME** |
| `sharescreen-lan` | ShareScreen LAN | Não (build vazio) | **NATIVE** |
| `site-psicologia-profissional` | Site Profissional para Psicóloga | Não | **NATIVE** |

### `portfolio-imports/desktop/`

Nenhum sistema encontrado.

---

## 2. Sistemas integrados

Todos os 7 sistemas web foram integrados ao portfólio:

- Cards em `/portfolio`
- Cases em `/cases/{slug}`
- Demos em `/demo/{slug}` (quando aplicável)
- Capas WebP em `/assets/mockups/{slug}.webp`
- Dados fictícios em todas as demos

---

## 3. Sistemas não integrados

Nenhum sistema válido ficou de fora.  
`vigilia-politica` estava em subpasta aninhada (`vigilia-politica/vigilia-politica/`) e foi integrado na etapa final.

---

## 4. Estratégia por sistema

| Slug | Estratégia | Detalhes |
|------|------------|----------|
| `lar-dos-anjos` | IFRAME | Build Next export em `public/demos/lar-dos-anjos/`; paths `/_next/` reescritos |
| `player-video-marcadores` | IFRAME | Build em `public/demos/player-video-marcadores/`; paths reescritos |
| `monitor-arquivos` | IFRAME | Build autocontido com paths relativos |
| `gestao-producao-grafica` | IFRAME | Build Vite com `./assets/` relativos |
| `vigilia-politica` | IFRAME | Build Vite SPA; `.htaccess` **não** copiado |
| `sharescreen-lan` | NATIVE | Demo React simulando painel host WebRTC LAN |
| `site-psicologia-profissional` | NATIVE | Demo React com agendamento, blog e painel admin fictícios |

---

## 5. Rotas criadas

### Demos

- `/demo/lar-dos-anjos`
- `/demo/player-video-marcadores`
- `/demo/monitor-arquivos`
- `/demo/gestao-producao-grafica`
- `/demo/vigilia-politica`
- `/demo/sharescreen-lan`
- `/demo/site-psicologia-profissional`

### Cases (via fallback + seed)

- `/cases/lar-dos-anjos`
- `/cases/player-video-marcadores`
- `/cases/monitor-arquivos`
- `/cases/gestao-producao-grafica`
- `/cases/vigilia-politica`
- `/cases/sharescreen-lan`
- `/cases/site-psicologia-profissional`

---

## 6. Arquivos criados

### Scripts

- `scripts/integrate-portfolio-demos.mjs` — copia builds e reescreve paths absolutos

### Dados e configuração

- `src/data/projects/imported-portfolio-projects.ts`
- `src/data/demos/iframe-demos.ts`

### Componentes e libs

- `src/components/demos/iframe-portfolio-demo.tsx`
- `src/lib/demos/create-iframe-demo-page.tsx`
- `src/components/demos/sharescreen-lan/sharescreen-lan-demo.tsx`
- `src/components/demos/psicologia/psicologia-demo.tsx`

### Páginas demo

- `src/app/demo/lar-dos-anjos/page.tsx`
- `src/app/demo/player-video-marcadores/page.tsx`
- `src/app/demo/monitor-arquivos/page.tsx`
- `src/app/demo/gestao-producao-grafica/page.tsx`
- `src/app/demo/vigilia-politica/page.tsx`
- `src/app/demo/sharescreen-lan/page.tsx`
- `src/app/demo/site-psicologia-profissional/page.tsx`

### Assets de produção

- `public/demos/{slug}/` — builds estáticos (5 sistemas IFRAME)
- `public/assets/mockups/*.webp` — 7 capas novas

### Documentação

- `PLANO_IMPLEMENTACAO_PORTFOLIO_SISTEMAS.md`
- `RELATORIO_INTEGRACAO_PORTFOLIO_HOSTINGER.md` (este arquivo)
- Documentação leve em `portfolio-imports/` (README, briefing, demo-config, mock-data)

---

## 7. Arquivos modificados

- `.gitignore` — ignora staging bruto em `portfolio-imports/**`
- `eslint.config.mjs` — ignora `portfolio-imports/**` e `public/demos/**`
- `tsconfig.json` — exclui `portfolio-imports` do typecheck
- `next.config.ts` — CSP `frame-src 'self'`; headers relaxados para `/demos/*`
- `prisma/seed.ts` — inclui projetos importados
- `scripts/optimize-assets.mjs` — mockups dos 7 sistemas
- `src/data/projects/fallback-projects.ts` — slugs + merge de cases
- `src/data/projects/enriched-content.ts` — conteúdo enriquecido dos cases
- `src/components/demos/client-only-demos.tsx` — registro das demos nativas

---

## 8. Arquivos ignorados (não versionados)

Via `.gitignore`:

- `portfolio-imports/**/source/`
- `portfolio-imports/**/build/`
- `portfolio-imports/**/node_modules/`
- `portfolio-imports/**/.next/`
- `portfolio-imports/**/*.env*`
- `portfolio-imports/**/*.db`, `*.sqlite`, `*.exe`, `*.msi`
- `.next/`, `node_modules/`, `.env`

---

## 9. Dados mock utilizados

- **IFRAME:** dados embutidos nos builds estáticos (JSON/JS local, localStorage simulado)
- **ShareScreen LAN:** agentes, sessão e log fictícios em componente React
- **Site Psicologia:** pacientes, agendamentos e artigos fictícios em componente React
- **Vigília Política:** notícias, portais e alertas fictícios no build SPA

Nenhuma demo chama API de produção real.

---

## 10. Ajustes de segurança

| Item | Ação |
|------|------|
| `.htaccess` em vigilia build | **Não copiado** para `public/demos/` |
| `.env` em portfolio-imports | Ignorado pelo Git; não integrado |
| `source/` bruto | Não copiado para produção |
| Builds Next com paths absolutos | Reescritos para `/demos/{slug}/` |
| Credenciais/API keys | Não encontradas nos arquivos commitados |
| `portfolio-imports` no TypeScript/ESLint | Excluído para evitar vazamento acidental |

---

## 11. Arquivos sensíveis removidos ou bloqueados

- `.htaccess` do build Vigília Política (filtro no script de integração)
- Pastas `source/`, `node_modules/`, `.next/` dentro de `portfolio-imports/`
- Arquivos `.env*` dentro de `portfolio-imports/`

---

## 12. Prisma, seed e schema.sql

- **Schema Prisma:** não alterado
- **Migration:** não necessária
- **`database/schema.sql`:** não alterado
- **`prisma/seed.ts`:** adicionado spread de `IMPORTED_PORTFOLIO_PROJECTS` (7 cases)

---

## 13. Compatibilidade com Hostinger

| Critério | Status |
|----------|--------|
| Node.js 20.x (`engines: >=20`) | ✅ |
| `npm install` | ✅ |
| `npm run build` → `.next/` | ✅ |
| `npm start` → `next start -H 0.0.0.0` | ✅ |
| `process.env.PORT` automático | ✅ |
| SSR + API Routes (sem `output: "export"`) | ✅ |
| Demos servidas pelo próprio Next.js em `public/demos/` | ✅ |
| Sem `public_html` como raiz | ✅ |
| Sem `.htaccess` no app principal | ✅ |
| Sem PM2/Nginx/Apache manual | ✅ |
| `/api/health` | ✅ mantido |
| `/admin/login` | ✅ mantido |

---

## 14–17. Confirmações de deploy

- **Não usa `public_html`** como raiz do app
- **Não usa `.htaccess`** no projeto Next.js
- **Output de produção:** `.next/` via `next build`
- **`npm start` compatível** com Node.js Web App da Hostinger

---

## 18. Testes executados

| Comando | Resultado |
|---------|-----------|
| `npm install` | ✅ (ambiente local) |
| `npm run lint` | ⚠️ 12 erros pré-existentes em painéis admin/demos legadas (`react-hooks/set-state-in-effect`); nenhum erro novo nos arquivos de integração |
| `npm test` | ✅ 19 testes passando |
| `npm run build` | ✅ **Sucesso** (62 rotas geradas) |

---

## 19. Resultado de `npm run build`

```
✓ Compiled successfully
✓ Generating static pages (62/62)
✓ Build concluído sem erros TypeScript
```

Rotas de demo confirmadas: 13 demos (6 legadas + 7 importadas).

---

## 20. Pendências

1. **Lint legado:** erros `set-state-in-effect` em componentes admin e demos antigas — não bloqueiam build; corrigir em sprint futuro.
2. **IFRAME Next export (`lar-dos-anjos`, `player-video-marcadores`):** paths reescritos automaticamente; validar visualmente no navegador após deploy.
3. **Capas WebP:** geradas como placeholders SVG otimizados; substituir por screenshots reais quando disponíveis.
4. **Banco em produção:** rodar `npm run db:seed` na Hostinger após importar `database/schema.sql` para popular os 7 cases no MySQL (fallback local já cobre ausência de banco).
5. **`generateStaticParams` de cases:** usa slugs do banco quando disponível; com DB parcial, cases extras funcionam via SSR dinâmico/fallback.

---

## 21. Recomendações para próximos sistemas

1. Preferir builds com **paths relativos** (`./assets/`) para reduzir pós-processamento.
2. Incluir `demo-config.json` e `briefing.md` padronizados na pasta `_template/`.
3. Executar `node scripts/integrate-portfolio-demos.mjs` após cada novo build IFRAME.
4. Adicionar entrada em `imported-portfolio-projects.ts` + `enriched-content.ts` + mockup em `optimize-assets.mjs`.
5. Nunca commitar `source/`, `.env` ou builds brutos em `portfolio-imports/`.

---

## 22. Instruções para redeploy na Hostinger

1. Push na branch `main` dispara deploy automático (GitHub → Node.js Web App).
2. Variáveis obrigatórias no hPanel:
   - `NODE_ENV=production`
   - `DATABASE_URL=mysql://...`
   - `NEXT_PUBLIC_SITE_URL=https://seudominio.com.br`
   - `ADMIN_SESSION_SECRET=<segredo-forte>`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999`
3. Importar banco: `database/schema.sql` no MySQL 8.
4. Opcional pós-deploy: `npm run db:seed` via SSH ou painel para popular cases.
5. Verificar:
   - `https://seudominio.com.br/api/health`
   - `https://seudominio.com.br/portfolio`
   - Demos IFRAME em `/demo/{slug}`

---

## Configuração esperada no hPanel

| Campo | Valor |
|-------|-------|
| Tipo de aplicação | Fullstack Next.js SSR + API Routes |
| Node.js version | 20.x |
| Repository | https://github.com/LucasNangell/creativestudio |
| Branch | `main` |
| Root directory | `.` |
| Install command | `npm install` |
| Build command | `npm run build` |
| Start command | `npm start` |
| Output directory | `.next/` |
| Entry file | não aplicável |
| Banco | MySQL 8 |
| Schema | `database/schema.sql` |
| Variáveis obrigatórias | `NODE_ENV`, `DATABASE_URL`, `NEXT_PUBLIC_SITE_URL`, `ADMIN_SESSION_SECRET`, `NEXT_PUBLIC_WHATSAPP_NUMBER` |
| Variáveis opcionais | `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GA4_ID` |
| Deploy | GitHub → Node.js Web App |

---

*Relatório gerado após integração completa dos sistemas de `portfolio-imports/web/`.*
