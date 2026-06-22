# Dados fictícios — Gestão de Produção Gráfica (demo)

Esta pasta contém exemplos de respostas JSON usados pela versão demonstrativa do sistema. Todos os dados são **fictícios** e seguros para exibição pública.

## Arquivos

| Arquivo | Descrição |
|---------|-----------|
| `auth-me.json` | Usuário logado na sessão demo (Maria Exemplo) |
| `permissions.json` | Permissões completas para navegar todas as telas |
| `config-public.json` | Configuração pública do app (modo senha, nome do sistema) |
| `os-search.json` | Listagem de ordens de serviço para a tela inicial |
| `os-details.json` | Detalhes técnicos de OS selecionadas |
| `os-history.json` | Histórico de andamentos de uma OS |
| `pcp-queue.json` | Filas do kanban PCP por setor |
| `aux-data.json` | Dados auxiliares (setores, situações, máquinas, produtos) |
| `dashboard-setor.json` | Indicadores do painel por setor |
| `notifications.json` | Notificações in-app simuladas |
| `endpoints.md` | Mapeamento de endpoints mockados |

## Uso

Os mesmos dados estão embutidos em `source/apps/web/src/demo/mock-data.ts` para o build estático funcionar sem backend.

Para alterar os dados da demo, edite os JSON desta pasta **e** sincronize com `mock-data.ts` antes de gerar novo build.

## Segurança

Nenhum arquivo desta pasta contém dados reais, credenciais ou informações de clientes.
