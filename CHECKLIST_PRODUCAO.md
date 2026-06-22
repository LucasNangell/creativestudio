# Checklist de Produção — Nangell Creative Studio

Use este checklist antes e depois do go-live.

## Build e código

- [ ] `npm run build` sem erros
- [ ] `npm test` — 19 testes passando
- [ ] `npx prisma validate`
- [ ] `npm run lint` — revisar erros restantes (admin panels)
- [ ] Versão commitada e tag/release criada

## Variáveis de ambiente

- [ ] `.env` **não** versionado (confirmar `.gitignore`)
- [ ] `DATABASE_URL` apontando para MySQL de produção
- [ ] `NEXT_PUBLIC_SITE_URL` = URL final (`https://nangell.com.br`)
- [ ] `ADMIN_SESSION_SECRET` com 32+ caracteres aleatórios
- [ ] `NEXT_PUBLIC_GTM_ID` / `NEXT_PUBLIC_GA4_ID` configurados
- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER` correto
- [ ] Senha do admin **alterada** após seed

## Banco de dados

- [ ] MySQL acessível pela aplicação
- [ ] `npm run db:migrate` executado em produção
- [ ] `npm run db:seed` (primeira vez) ou dados já migrados
- [ ] Backup inicial realizado
- [ ] Usuário DB com privilégios mínimos necessários

## Domínio e SSL

- [ ] DNS apontando para host correto
- [ ] Certificado SSL ativo (HTTPS)
- [ ] Redirect HTTP → HTTPS
- [ ] `NEXT_PUBLIC_SITE_URL` com HTTPS

## SEO

- [ ] `/sitemap.xml` acessível e URLs absolutas corretas
- [ ] `/robots.txt` bloqueia `/admin/` e `/api/`
- [ ] Open Graph testado (Facebook Debugger / LinkedIn)
- [ ] Titles e descriptions das páginas principais revisados
- [ ] JSON-LD validado (Rich Results Test)

## Analytics

- [ ] GTM publicado ou GA4 recebendo pageviews
- [ ] Eventos customizados mapeados no GTM (dataLayer)
- [ ] Conversão `generate_lead` / `submit_diagnostico` configurada

## Performance

- [ ] Lighthouse Performance > 90 (página home e /diagnostico)
- [ ] LCP < 2.5s em mobile
- [ ] CLS < 0.1
- [ ] Imagens em `public/assets/` presentes no servidor

## Acessibilidade

- [ ] Skip link funcional
- [ ] Navegação por teclado (header, menu mobile, modais)
- [ ] Lighthouse Accessibility > 95
- [ ] Formulários com labels e erros anunciados

## Funcional

- [ ] Formulário diagnóstico → banco → `/obrigado`
- [ ] Formulário contato → banco → `/obrigado`
- [ ] WhatsApp flutuante e CTAs
- [ ] 6 demos abrem sem erro crítico no console
- [ ] Filtros do portfólio
- [ ] Blog lista e posts publicados (não drafts)
- [ ] Admin login/logout e CRUD básico

## Segurança

- [ ] `/admin` exige login
- [ ] Cookies httpOnly + secure
- [ ] Headers de segurança (CSP, X-Frame-Options) via `curl -I`
- [ ] Rate limit em `/api/leads`
- [ ] Nenhuma senha/credencial no repositório

## Backup e rollback

- [ ] Procedimento de backup documentado (MySQL dump)
- [ ] Tag git ou artefato de deploy anterior guardado
- [ ] Rollback testado em staging (reverter deploy + restore DB se necessário)

## Pós-deploy

- [ ] Monitorar logs de erro 24–48h
- [ ] Verificar leads chegando no admin
- [ ] Submeter sitemap no Google Search Console
- [ ] Confirmar e-mail/WhatsApp de contato funcionando
