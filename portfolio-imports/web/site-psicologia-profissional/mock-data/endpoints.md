# Mapeamento de persistência — Site Psicologia Profissional

Este sistema **não possui API REST**. A persistência é feita via arquivos JSON no servidor PHP.

## Arquivos de dados

| Operação | Arquivo | Método |
|----------|---------|--------|
| Listar agendamentos | `data/agendamentos.json` | Leitura PHP (`readJsonFile`) |
| Criar agendamento | `data/agendamentos.json` | POST `processa-agendamento.php` |
| Atualizar status | `data/agendamentos.json` | POST `admin/agendamento.php` |
| Excluir agendamento | `data/agendamentos.json` | POST `admin/agendamento.php` |
| Listar posts | `data/posts.json` | Leitura PHP |
| Criar/editar post | `data/posts.json` | POST `admin/post-form.php` |
| Excluir post | `data/posts.json` | POST `admin/post-delete.php` |

## Equivalência para integração NATIVE (futuro)

Se o case for recriado em React no site do portfólio, use estes mapeamentos:

| Endpoint simulado | Arquivo mock | Comportamento |
|-------------------|--------------|---------------|
| `GET /api/agendamentos` | `agendamentos.json` | Retorna lista de agendamentos |
| `POST /api/agendamentos` | — | Simular criação local (localStorage ou estado) |
| `PATCH /api/agendamentos/:id` | — | Simular alteração de status localmente |
| `GET /api/posts` | `posts.json` | Retorna artigos do blog |
| `GET /api/posts/:slug` | `posts.json` | Filtrar por slug |
| `GET /api/dashboard` | `dashboard-stats.json` | Indicadores do painel |

## Integrações externas (não implementadas)

| Serviço | Status na demo |
|---------|----------------|
| Google Calendar | Stub — slots simulados em `getCalendarAvailability()` |
| E-mail | Não envia |
| WhatsApp | Link `wa.me` com número fictício `(00) 90000-0000` |
| Banco de dados | Não utilizado |

## Autenticação admin

| Operação | Endpoint | Credenciais demo |
|----------|----------|------------------|
| Login | `POST /admin/login` | `demo` / `demo2026` |
| Logout | `GET /admin/logout` | — |
