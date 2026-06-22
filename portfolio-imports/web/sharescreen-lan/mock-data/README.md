# Dados fictícios — ShareScreen LAN

Todos os arquivos desta pasta contêm dados **100% fictícios** para demonstração no portfólio da Nangell Creative Studio.

## Arquivos

| Arquivo | Representa |
|---------|------------|
| `info.json` | Resposta de `GET /api/info` — configuração do servidor |
| `diagnostico.json` | Resposta de `GET /api/diagnostico` — parâmetros de qualidade |
| `agentes.json` | Resposta de `GET /api/agentes` — PCs com agente de automação |
| `clientes-conectados.json` | Estado simulado da sala — peers conectados e fonte ativa |
| `eventos-log.json` | Log de eventos exibido no painel host |
| `gravacao-resposta.json` | Resposta simulada de `POST /api/gravacao` |
| `endpoints.md` | Mapeamento endpoint → arquivo mock |

## Uso na demo estática

A demo em `build/` carrega `clientes-conectados.json` e `eventos-log.json` via `fetch` relativo. Os demais arquivos servem como referência para recriação NATIVE no site do portfólio.

## Uso no source/ (modo demo)

O arquivo `source/config/default.demo.js` aponta gravações para `./recordings` e desativa integração com banco de agentes real. O servidor em modo demo retorna `agentes.json` quando `DEMO_MODE=true`.
