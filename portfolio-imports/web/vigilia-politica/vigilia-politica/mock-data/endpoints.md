# Mapeamento de endpoints (modo demo)

Na versão de portfólio, **não há backend real**. As chamadas abaixo são simuladas localmente.

| Endpoint original | Substituto na demo | Comportamento |
|-------------------|-------------------|---------------|
| `GET /api/news?limit=5000` | `./data/news.json` | Carrega feed estático de notícias fictícias |
| `GET /api/news/ws` | *(desativado)* | Atualização periódica simulada a cada 60s |
| `GET /api/portals` | `localStorage` + seed de `portals.json` | Lista portais demo; cadastro grava em `vp_demo_portals` |
| `POST /api/portals` | `localStorage` | Adiciona domínio fictício localmente |
| `GET /api/topics/trending` | `./data/topics-trending.json` | Retorna temas simulados |
| `GET /api/topics/:id/news` | `./data/news.json` (subset) | Retorna IDs fictícios por cluster |

## Autenticação

| Endpoint original | Substituto na demo |
|-------------------|-------------------|
| Login real | Qualquer e-mail/senha — acesso imediato após 700ms |
| Sessão | `localStorage` chave `vp_authenticated` |

## Motor de inteligência (simulação)

Dashboard, alertas, narrativas, adversários, territórios, briefing, tarefas e relatórios usam o **motor de simulação client-side** (`src/lib/simulation/*`) — sem API externa.

## Lead de fundadores

| Endpoint futuro | Demo atual |
|-----------------|------------|
| `POST /api/founder-leads` | Simulação com delay de 1,4s (`submitFounderLead.ts`) |
