# Dados mock — Vigília Política (demo)

Arquivos JSON fictícios usados pela versão demonstrativa do portfólio **Nangell Creative Studio**.

## Arquivos

| Arquivo | Descrição |
|---------|-----------|
| `news.json` | Feed de notícias simuladas (15 matérias) exibidas em `/feed` |
| `portals.json` | Portais monitorados iniciais em Configurações |
| `topics-trending.json` | Temas em alta para componentes de tópicos/narrativas |

## Origem na demo

Na build estática (`build/`), estes arquivos ficam em `data/` e são carregados via fetch relativo (`./data/*.json`).

No código-fonte demo (`source/public/data/`), os mesmos arquivos alimentam o modo `VITE_DEMO_MODE=true`.

## Observações

- Todos os títulos, URLs e fontes são **fictícios** (`exemplo-demo.local`, `*-demo.com.br`).
- Nenhum dado real de clientes, mandatos ou produção foi incluído.
- Alterações em portais na tela Configurações são persistidas apenas em `localStorage` do navegador.
