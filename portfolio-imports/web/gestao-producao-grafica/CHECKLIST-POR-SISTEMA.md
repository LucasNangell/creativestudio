# Checklist — Gestão de Produção Gráfica

- [x] Slug definido em kebab-case: `gestao-producao-grafica`
- [x] Tipo do sistema identificado: Web fullstack (SPA React + FastAPI/MySQL)
- [x] Estratégia de demonstração escolhida: **IFRAME**
- [x] Dados reais removidos
- [x] Credenciais removidas
- [x] URLs de produção removidas ou neutralizadas
- [x] Dados mock criados (10 arquivos JSON + mock-data.ts embutido)
- [x] Funcionalidades principais documentadas
- [x] Telas principais documentadas
- [x] Build estático gerado (`build/index.html` + assets)
- [x] Instruções de execução documentadas
- [ ] Demo testada visualmente no navegador (build servido via HTTP)
- [x] Pasta pronta para copiar para o site
- [x] Nenhum arquivo sensível incluído
- [x] Nenhum dump de produção incluído
- [x] Nenhum `.env` real incluído

## Detalhes adicionais

### Arquivos sensíveis removidos/ignorados na cópia

- `config/.env` (senhas reais de DB, Exchange, workers)
- `config/gdrive/` (OAuth Google Drive)
- `config/vapid.json`, `config/vapid_dev.json`
- `config/config.json` (IPs internos, UNC paths)
- `backups/` (snapshots de release)
- `app/backend/` (não necessário para demo estática)
- `worker/` (worker CorelDRAW)
- `node_modules/`, `dist/` antigos

### Modificações na cópia source (não no projeto original)

- `src/demo/` — camada de mock API
- `src/main.tsx` — instalação do fetch mock
- `src/hooks/useSagraWebSocket.ts` — WS desabilitado em demo
- `src/routes/login.index.tsx` — banner e botão de demo
- `src/lib/api.ts` — remoção de logs de debug
- `config/.env.demo` — variáveis de demo

### Pendências

1. Capturar screenshots (ver `screenshots/README.md`)
2. Testar iframe no site do portfólio em staging
3. Telas secundárias (e-mail, papelaria, análise) com dados vazios — aceitável para v1 da demo
