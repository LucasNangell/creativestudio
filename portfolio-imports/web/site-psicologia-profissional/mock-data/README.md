# Dados mock — Site Psicologia Profissional

Esta pasta contém exemplos de dados fictícios usados na versão demonstrativa do portfólio.

## Arquivos

| Arquivo | Descrição |
|---------|-----------|
| `agendamentos.json` | Solicitações de agendamento com status variados (novo, em análise, confirmado, cancelado) |
| `posts.json` | Artigos do blog com conteúdo educativo sobre saúde mental |
| `dashboard-stats.json` | Resumo de indicadores exibidos no painel administrativo (referência) |

## Origem dos dados

Os arquivos `agendamentos.json` e `posts.json` são cópias dos dados ativos em `source/data/`. Na demonstração, o PHP lê e grava diretamente nesses arquivos JSON — não há API REST separada.

## Dados fictícios

Todos os registros usam nomes, e-mails e telefones claramente simulados:

- João Demo Silva — `joao.demo@exemplo.com`
- Maria Exemplo Santos — `maria.exemplo@empresa-demo.com`
- Carlos Demonstração Lima — `carlos.demo@exemplo.com`
- Ana Cliente Fictícia — `ana.ficticia@empresa-demo.com`
- Pedro Teste Oliveira — `pedro.teste@exemplo.com`

## Reset da demonstração

Para restaurar o estado inicial da demo, copie novamente os arquivos desta pasta para `source/data/`:

```bash
cp mock-data/agendamentos.json source/data/agendamentos.json
cp mock-data/posts.json source/data/posts.json
```

No Windows (PowerShell):

```powershell
Copy-Item mock-data\agendamentos.json source\data\agendamentos.json -Force
Copy-Item mock-data\posts.json source\data\posts.json -Force
```
