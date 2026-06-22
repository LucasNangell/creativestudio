# Mapeamento de endpoints — HT Monitor Demo

Na versão de portfólio, **nenhuma chamada HTTP real** é feita. Todas as rotas abaixo são simuladas por `demo-api.js`.

## Health e status

| Método | Endpoint | Mock |
|--------|----------|------|
| GET | `/api/health` | Resposta fixa `{ status: "up", app: "HT Monitor Demo" }` |
| GET | `/api/status` | `status.json` |
| POST | `/api/services/restart` | Simulado — reativa todos os serviços |
| POST | `/api/services/monitor/restart` | Simulado |
| POST | `/api/services/rename/restart` | Simulado |
| POST | `/api/services/move/restart` | Simulado |

## Configurações

| Método | Endpoint | Mock |
|--------|----------|------|
| GET | `/api/settings` | `settings.json` (senha mascarada) |
| PUT | `/api/settings/mysql` | Atualiza state local |
| POST | `/api/settings/mysql/test` | Sempre retorna sucesso |
| PUT | `/api/settings/monitor/api` | Atualiza state local |

## Monitoramento (banco de dados)

| Método | Endpoint | Mock |
|--------|----------|------|
| GET | `/api/monitor/folders` | Lista de pastas em `settings.json` |
| POST | `/api/monitor/folders` | Adiciona pasta fictícia |
| DELETE | `/api/monitor/folders?path=...` | Remove pasta |
| POST | `/api/monitor/sync` | Simulado — mensagem de sucesso |

## Renomeador

| Método | Endpoint | Mock |
|--------|----------|------|
| GET | `/api/rename/patterns` | `rename-patterns.json` |
| POST/PUT/DELETE | `/api/rename/patterns/*` | CRUD local |
| GET | `/api/rename/variables` | Variáveis customizadas |
| POST/DELETE | `/api/rename/variables/*` | CRUD local |
| GET | `/api/rename/folders` | Pastas monitoradas |
| POST/PUT/DELETE | `/api/rename/folders/*` | CRUD local |
| GET | `/api/rename/history` | `rename-history.json` |
| DELETE | `/api/rename/history` | Limpa histórico local |
| GET/PUT | `/api/rename/error-policy` | Política padrão simulada |

## Movimentações

| Método | Endpoint | Mock |
|--------|----------|------|
| GET | `/api/move/rules` | `move-rules.json` |
| POST/PUT/DELETE | `/api/move/rules/*` | CRUD local |
| PUT | `/api/move/rules/reorder` | Reordena regras localmente |
| POST | `/api/move/run` | Adiciona entrada simulada ao histórico |
| GET | `/api/move/history` | `move-history.json` |
| DELETE | `/api/move/history` | Limpa histórico local |
| GET | `/api/move/filename-variables` | Variáveis built-in fixas |
| GET/PUT | `/api/move/error-policy` | Política padrão simulada |

## Erros

| Método | Endpoint | Mock |
|--------|----------|------|
| GET | `/api/errors` | `errors.json` |
| DELETE | `/api/errors` | Limpa log local |
