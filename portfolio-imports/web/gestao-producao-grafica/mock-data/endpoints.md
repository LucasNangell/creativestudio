# Mapeamento de endpoints — modo demonstração

Todos os endpoints abaixo são **simulados localmente** no frontend via interceptação de `fetch`. Não há chamadas a servidores reais.

## Autenticação

| Método | Endpoint | Resposta mock |
|--------|----------|---------------|
| GET | `/api/auth/me` | `auth-me.json` (se sessão ativa) ou 401 |
| GET | `/api/auth/user-name/:ponto` | Nome fictício do usuário demo |
| POST | `/api/auth/session` | Sessão demo criada |
| POST | `/api/auth/login` | Sessão demo criada (aceita `demo`/`demo`) |
| POST | `/api/auth/logout` | Encerra sessão demo |
| GET | `/api/permissions` | `permissions.json` |
| GET | `/api/config/public` | `config-public.json` |

## Ordens de serviço

| Método | Endpoint | Resposta mock |
|--------|----------|---------------|
| GET | `/api/os/search` | `os-search.json` (com filtros locais) |
| GET | `/api/os/filter-options/years` | `[2025, 2026]` |
| GET | `/api/os/filter-options/products` | Derivado de `os-search.json` |
| GET | `/api/os/filter-options/requesters` | Derivado de `os-search.json` |
| GET | `/api/os/:ano/:id/details` | `os-details.json` |
| GET | `/api/os/:ano/:id/history` | `os-history.json` |
| GET | `/api/os/:ano/:id/audit-log` | Log fictício |
| POST | `/api/os/*` | Simulado — retorna `{ status: "ok" }` |

## PCP (planejamento)

| Método | Endpoint | Resposta mock |
|--------|----------|---------------|
| GET | `/api/pcp/queue?setor=` | `pcp-queue.json` |
| POST | `/api/pcp/queue/reorder` | Simulado localmente |

## Dados auxiliares

| Método | Endpoint | Resposta mock |
|--------|----------|---------------|
| GET | `/api/aux/setores` | `aux-data.json` → setores |
| GET | `/api/aux/situacoes` | `aux-data.json` → situacoes |
| GET | `/api/aux/maquinas` | `aux-data.json` → maquinas |
| GET | `/api/aux/produtos` | `aux-data.json` → produtos |
| GET | `/api/aux/andamentos` | `aux-data.json` → andamentos |

## Papelaria (Corel + mockup 3D)

| Método | Endpoint | Resposta mock |
|--------|----------|---------------|
| GET | `/api/papelaria/os/:ano/:nro/contexto` | `papelaria-contexto.json` |
| GET | `/api/papelaria/modelos` | Lista de modelos Corel |
| GET | `/api/papelaria/modelos/:id` | Modelo com preview e mockup 3D |
| GET | `/api/papelaria/modelos/:id/preview-base/:face` | SVG da face (frente/verso) |
| GET | `/api/papelaria/os/:ano/:nro/jobs` | `papelaria-job.json` |
| GET | `/api/papelaria/jobs/:id` | Job concluído com PDF/CDR |
| GET | `/api/papelaria/jobs/:id/preview-pages` | Páginas para mockup 3D |
| GET | `/api/papelaria/jobs/:id/preview-pages/:n.png` | Imagem SVG da página |
| GET | `/api/papelaria/jobs/:id/arquivo/pdf` | PDF mínimo válido |
| POST | `/api/papelaria/jobs` | Simula novo job Corel |

**OS demo papelaria:** `5485/2026` (cartão de visita)

## Análise técnica

| Método | Endpoint | Resposta mock |
|--------|----------|---------------|
| GET | `/api/analise/problemas-padrao` | `analise-problemas-padrao.json` |
| GET | `/api/analise/:ano/:id/full` | `analise-full.json` |
| GET | `/api/os/:ano/:id/versions` | v1 e v2 fictícias |
| GET | `/api/os/:ano/:id/ultimo-andamento` | Status Recebido (SEFOC) |
| GET | `/api/analise/pre-analise/checks` | 5 verificações automáticas |
| POST | `/api/analise/:ano/:id/pre-analise/estimate` | Estimativa de tempo |
| GET | `/api/analise/:ano/:id/pre-analise/snapshots` | Índice de snapshots |
| POST | `/api/analise/:ano/:id/pre-analise/snapshot` | `pre-analise-snapshot.json` |
| POST | `/api/analise/:ano/:id/pre-analise/run-all/stream` | Stream NDJSON com resultados |
| GET | `/api/files/list` | PDFs fictícios na pasta |
| GET | `/api/files/serve` | PDF mínimo para contagem de páginas |

**OS demo análise:** `4521/2026` (folder institucional) — abre automaticamente em `/analise`

## Outros

| Método | Endpoint | Resposta mock |
|--------|----------|---------------|
| GET | `/api/notifications` | `notifications.json` |
| GET/PUT | `/api/settings/preferences/*` | `null` / ok |
| GET | `/api/painel/*`, `/api/dashboard/*` | `dashboard-setor.json` |
| GET | `/api/email/*`, `/api/papelaria/*`, etc. | Array vazio ou stub |
| POST/PUT/DELETE | Qualquer outro | `{ status: "ok" }` simulado |

## WebSocket

Conexões WebSocket são **desabilitadas** em modo demo. A interface funciona com dados estáticos; indicadores de tempo real ficam desconectados (sem erro).

## Credenciais demo

- **Usuário:** `demo`
- **Senha:** `demo`

Ou use o botão **"Entrar na demonstração"** na tela de login.
