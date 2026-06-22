# Checklist — ShareScreen LAN

- [x] Slug definido em kebab-case: `sharescreen-lan`
- [x] Tipo do sistema identificado: Web fullstack (Node.js + WebRTC SFU)
- [x] Estratégia de demonstração escolhida: **NATIVE** (IFRAME inviável por WebRTC)
- [x] Dados reais removidos
- [x] Credenciais removidas
- [x] URLs de produção removidas ou neutralizadas
- [x] Dados mock criados (6 arquivos JSON + endpoints.md)
- [x] Funcionalidades principais documentadas
- [x] Telas principais documentadas
- [x] Build estático gerado (demo UI interativa em `build/`)
- [x] Instruções de execução documentadas
- [ ] Demo testada localmente com WebRTC completo (requer npm install + 2 navegadores — pendente do integrador)
- [x] Pasta pronta para copiar para o site
- [x] Nenhum arquivo sensível incluído
- [x] Nenhum dump de produção incluído
- [x] Nenhum `.env` real incluído

## Pendências antes de publicar no site

- [ ] Capturar screenshots reais (ver `screenshots/README.md`)
- [ ] Gravar vídeo walkthrough de 2–4 minutos com sistema real
- [ ] Criar mockup de capa (`sharescreen-lan.webp`)
- [ ] Recriar componentes React no site do portfólio (estratégia NATIVE)

## Itens sensíveis removidos na cópia source/

| Item | Ação |
|------|------|
| `10.1.1.73`, `10.120.1.12` | Substituído por `192.168.100.10` |
| `cgrafsysvm` | Substituído por `sharescreen-demo.local` |
| `\\cgrafsysvm\ApogeeFiles\...` | Substituído por `./recordings` |
| `\\redecamara\dfsdata\...` | Desativado em modo demo |
| `certs/server.key`, `server.crt` | Não copiados |
| `config.json` | Não copiado |
| `pacote-servidor*` | Não copiados |
| `node_modules` | Não copiado |
