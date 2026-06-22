# Checklist — Site Psicologia Profissional

Checklist de preparação da versão demonstrativa para o portfólio Nangell Creative Studio.

- [x] Slug definido em kebab-case: `site-psicologia-profissional`
- [x] Tipo do sistema identificado: Web fullstack PHP (server-rendered)
- [x] Estratégia de demonstração escolhida: IFRAME (hospedagem PHP em subdomínio)
- [x] Dados reais removidos
- [x] Credenciais reais removidas (substituídas por demo/demo2026)
- [x] URLs de produção removidas ou neutralizadas
- [x] Dados mock criados (agendamentos, posts, dashboard-stats)
- [x] Funcionalidades principais documentadas
- [x] Telas principais documentadas
- [ ] Build estático gerado — **não aplicável** (PHP requer servidor; documentado em `build/README.md`)
- [x] Instruções de execução documentadas
- [x] Demo testada localmente (PHP built-in server)
- [x] Pasta pronta para copiar para o site
- [x] Nenhum arquivo sensível incluído
- [x] Nenhum dump de produção incluído
- [x] Nenhum `.env` real incluído

## Pendências antes de publicar no portfólio

- [ ] Gerar screenshots conforme `screenshots/README.md`
- [ ] Adicionar imagens de profissional e certificados em `source/assets/img/` (opcional, melhora apresentação)
- [ ] Adicionar fontes WOFF2 em `source/assets/fonts/` (opcional; fallback do sistema funciona)
- [ ] Publicar `source/` em subdomínio de demonstração
- [ ] Configurar iframe no site do portfólio apontando para URL publicada
- [ ] Criar mockup de capa (`site-psicologia-profissional.webp`) para o card do case

## Arquivos sensíveis removidos ou neutralizados

| Item original | Ação |
|---------------|------|
| Senha `gessica@terapia2026` no README | Não incluída na versão demo |
| Hash bcrypt original em `admin/config.php` | Substituído por hash de `demo2026` |
| E-mail `contato@gessicanoronha.com.br` | `contato@clinica-demo.com` |
| Telefone `(34) 99999-0000` | `(00) 90000-0000` |
| Instagram/LinkedIn reais | Links neutros `#` |
| Agendamento `maria@teste.com` | Dados fictícios completos em mock |
| Referências Hostinger no README da source | README substituído por versão demo |
