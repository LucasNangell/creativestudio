# Guia de Manutenção — Nangell Creative Studio

Operação do site via **painel admin** (`/admin`) e tarefas técnicas recorrentes.

## Acesso admin

1. Acesse `/admin/login`
2. Use credenciais de produção (não as do seed em ambiente real)
3. Após login: dashboard com atalhos e leads recentes

---

## Leads

**Menu:** `/admin/leads`

- Visualizar, filtrar e buscar leads
- Atualizar status (NOVO → FECHADO / PERDIDO)
- Adicionar notas internas
- Exportar CSV
- Link WhatsApp contextual por lead

Leads vêm de:

- `/diagnostico` — briefing completo
- `/contato` — mensagem rápida

---

## Projetos (portfólio / cases)

**Menu:** `/admin/projetos`

| Ação | Como |
|------|------|
| Criar case | Novo projeto → preencher slug único |
| Publicar | Status `PUBLISHED` |
| Ocultar | Status `HIDDEN` (soft delete) |
| Demo | Definir `demoRoute` (ex.: `/demo/crm-inteligente`) |
| SEO | `seoTitle`, `seoDescription` |
| Destaque | `isFeatured`, `sortOrder` |

Cases públicos: `/cases/{slug}`  
Listagem: `/portfolio`

---

## Serviços (soluções)

**Menu:** `/admin/servicos`

- Editar título, descrições, deliverables, tecnologias
- Ativar/inativar (`ACTIVE` / `INACTIVE`)
- Slug deve corresponder ao conteúdo enriquecido em `src/data/services/enriched-content.ts`

Páginas: `/solucoes/{slug}`

---

## Depoimentos

**Menu:** `/admin/depoimentos`

- Criar/editar depoimentos
- Aprovar (`APPROVED`) ou deixar pendente
- Aparecem na home quando aprovados

---

## Blog

**Menu:** `/admin/blog`

| Ação | Detalhe |
|------|---------|
| Rascunho | `DRAFT` — não aparece no site |
| Publicar | `PUBLISHED` + `publishedAt` |
| Conteúdo | Markdown no editor |
| SEO | `seoTitle`, `seoDescription` |
| Slug | URL `/blog/{slug}` |

Após publicar, o post entra no sitemap no próximo build/redeploy.

---

## Configurações do site

**Menu:** `/admin/configuracoes`

Edite pares chave-valor (hero, contatos, textos institucionais conforme seed).

---

## Logos e imagens

### Logos da marca

Arquivos em `public/assets/brand/`:

- `logo-horizontal-dark.png`
- `logo-horizontal-light.png`
- `icon-gradient.png`
- etc.

Referência em `src/data/brand-assets.ts`. Após trocar arquivos, faça redeploy.

### Mockups de projetos/posts

- `public/assets/mockups/`
- URLs nos registros de projetos/posts no admin (`coverImage`)

---

## Backup do banco

### Manual (MySQL)

```bash
mysqldump -u root -p nangell_creative_studio > backup-$(date +%F).sql
```

### Restaurar

```bash
mysql -u root -p nangell_creative_studio < backup-2026-06-21.sql
```

**Recomendação:** backup diário automatizado (cron + armazenamento externo).

---

## Erros comuns

| Problema | Solução |
|----------|---------|
| Site sem dados | Verificar `DATABASE_URL`; serviços usam fallback se DB falhar |
| Admin não loga | Conferir `ADMIN_SESSION_SECRET`; cookie secure exige HTTPS em prod |
| Formulário 429 | Rate limit — aguardar 15 min |
| Build falha Prisma | `npm run db:generate` |
| Imagens quebradas | Verificar path em `public/assets/` e URL no admin |
| Sitemap desatualizado | Redeploy após publicar conteúdo novo |
| GTM não dispara | Conferir `NEXT_PUBLIC_GTM_ID` e CSP |

---

## Atualização de dependências

```bash
npm outdated
npm update
npm run build && npm test
```

Teste demos e formulários após updates maiores (Next, Prisma, Recharts).

---

## Suporte técnico

Documentação completa: [DOCUMENTACAO_TECNICA.md](./DOCUMENTACAO_TECNICA.md)  
Deploy: [GUIA_DEPLOY.md](./GUIA_DEPLOY.md)  
Checklist go-live: [CHECKLIST_PRODUCAO.md](./CHECKLIST_PRODUCAO.md)
