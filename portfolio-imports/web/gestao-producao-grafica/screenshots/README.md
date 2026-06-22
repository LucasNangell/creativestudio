# Capturas de tela — Gestão de Produção Gráfica

As capturas abaixo devem ser geradas manualmente após rodar a demo localmente ou abrir o build estático.

## Lista recomendada

| Arquivo | Tela | Descrição |
|---------|------|-----------|
| `01-login.png` | Login | Tela de login com banner de modo demonstração e botão "Entrar na demonstração" |
| `02-dashboard.png` | Início (/) | Listagem de ordens de serviço com filtros e painel de detalhes |
| `03-pcp.png` | PCP (/pcp) | Kanban de fila de produção com drag-and-drop |
| `04-painel-setor.png` | Painel setor (/painel/setor) | Dashboard em tela cheia com gráficos |
| `05-detalhes-os.png` | Detalhes OS | Painel lateral com histórico de andamentos |

## Como capturar

1. Abra a demo: `cd source && pnpm install && pnpm dev:demo`
2. Acesse `http://127.0.0.1:5173/`
3. Clique em **Entrar na demonstração**
4. Navegue pelas telas e capture em resolução 1440×900 ou 1920×1080
5. Salve os arquivos nesta pasta com os nomes indicados

## Formato sugerido

- Formato: PNG ou WebP
- Proporção: 16:9
- Sem dados reais visíveis (a demo já usa dados fictícios)

## Uso no portfólio

As imagens serão referenciadas em:

- Card do case: `coverImageSuggestion` em `demo-config.json`
- Página do case: galeria de telas
- Thumbnail: converter `02-dashboard.png` para WebP como capa
