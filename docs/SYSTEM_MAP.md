# SYSTEM MAP — Nangell Creative Studio

Este mapa serve como o ponto de partida e o índice principal de navegação para desenvolvedores e IAs. Ele fornece uma visão unificada da arquitetura do projeto.

---

## 1. Identificação & Stack Principal

- **Nome do Projeto:** Nangell Creative Studio (Site Institucional e Portfólio)
- **Framework:** [Next.js 16 (App Router)](file:///e:/Creative%20Studio/creative%20studio/creativesite/package.json)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS v4 + Design System Customizado
- **Persistência:** Prisma ORM + MySQL 8
- **Animações/Interatividade:** GSAP, Framer Motion, @dnd-kit (Demos), Recharts (BI)
- **Validações:** Zod + React Hook Form

---

## 2. Visão Geral da Arquitetura

O sistema é estruturado como uma aplicação Next.js Fullstack (Server-Side Rendering, Static Site Generation e API Routes):

```
Visitante / Admin
       │
       ▼
Next.js App Router
├── Server Components (páginas públicas, SEO, sitemap, dados estáticos)
├── Client Components (interatividade, formulários, painel admin, animações)
├── API Routes (/api/leads, /api/admin/*, /api/analytics/events)
└── Middleware (autenticação e proteção das rotas /admin e /adm)
       │
       ▼
Prisma ORM (Acesso ao MySQL)
```

---

## 3. Estrutura Principal de Pastas

- [`prisma/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/prisma) — Schemas de banco de dados, migrações e seed scripts.
- [`database/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/database) — Arquivos SQL brutos/dumps de banco de dados.
- [`public/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/public) — Assets estáticos, mockups, logos e imagens da marca.
- [`scripts/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/scripts) — Scripts utilitários de build, importação, screenshots e otimização.
- [`src/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src) — Código-fonte da aplicação:
  - [`src/app/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app) — Roteamento do Next.js (App Router) e rotas de API.
  - [`src/components/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/components) — Componentes de interface do usuário, reutilizáveis e globais.
  - [`src/data/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/data) — Dados estáticos, fallbacks offline e mockups locais de conteúdo.
  - [`src/hooks/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/hooks) — Custom React hooks.
  - [`src/lib/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/lib) — Configurações compartilhadas (banco de dados, autenticação, analytics, segurança).
  - [`src/services/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/services) — Camada de acesso a dados/banco de dados e regras de negócio.
  - [`src/styles/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/styles) — Estilos globais e fontes.
  - [`src/types/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/types) — Definições de tipos TypeScript compartilhadas.
  - [`src/test/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/test) — Arquivos de configuração de teste.

---

## 4. Índice Técnico de Navegação

| Área do Sistema         | Pasta / Arquivo Principal                                                                                  | Função Principal                        | Quando Alterar                                                 |
| :---------------------- | :--------------------------------------------------------------------------------------------------------- | :-------------------------------------- | :------------------------------------------------------------- |
| **Páginas Públicas**    | [`src/app/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app)                          | Roteamento do portal                    | Para adicionar/modificar páginas públicas e layouts            |
| **Área Admin (CRUD)**   | [`src/app/admin/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/admin)              | Painel administrativo de CRUDs          | Para alterar a gestão de depoimentos, posts, etc.              |
| **Área Adm (Stats)**    | [`src/app/adm/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/adm)                  | Dashboard privado de leads e visitas    | Para alterar métricas ou gráficos de conversão                 |
| **API Endpoints**       | [`src/app/api/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/api)                  | Endpoints de requisição assíncrona      | Para criar ou mudar lógica de endpoints REST                   |
| **Modelos de Banco**    | [`prisma/schema.prisma`](file:///e:/Creative%20Studio/creative%20studio/creativesite/prisma/schema.prisma) | Definição do schema do MySQL            | Para alterar a estrutura de tabelas ou enums                   |
| **Dados Estáticos**     | [`src/data/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/data)                        | Fallbacks de posts, projetos e serviços | Para atualizar textos estáticos sem depender do MySQL          |
| **Regras de Negócio**   | [`src/services/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/services)                | Serviços de consulta ao banco/fallbacks | Para alterar a lógica de busca/persistência de dados           |
| **Configuração Deploy** | [`package.json`](file:///e:/Creative%20Studio/creative%20studio/creativesite/package.json)                 | Scripts de build e engines              | Para atualizar scripts de pipeline ou configurações de runtime |

---

## 5. Mapas Técnicos Complementares

- [**FRONTEND MAP** (docs/FRONTEND_MAP.md)](file:///e:/Creative%20Studio/creative%20studio/creativesite/docs/FRONTEND_MAP.md) — Focado em layouts, páginas, componentes visuais, animações e rotas do cliente.
- [**BACKEND MAP** (docs/BACKEND_MAP.md)](file:///e:/Creative%20Studio/creative%20studio/creativesite/docs/BACKEND_MAP.md) — Focado em APIs, segurança, middlewares, validações Zod e regras de negócio.
- [**DATABASE MAP** (docs/DATABASE_MAP.md)](file:///e:/Creative%20Studio/creative%20studio/creativesite/docs/DATABASE_MAP.md) — Focado no schema Prisma, migrações MySQL, dados e lógica de seeds.
- [**DEPLOY MAP** (docs/DEPLOY_MAP.md)](file:///e:/Creative%20Studio/creative%20studio/creativesite/docs/DEPLOY_MAP.md) — Focado nos ambientes de execução, comandos de build, configurações da Hostinger e variáveis de ambiente.

---

## 6. Regras para Futuras IAs

> [!IMPORTANT]
> **Antes de usar busca global, `@codebase` ou varrer o projeto inteiro, consulte primeiro este arquivo e o mapa específico da área afetada.**
> Abra apenas os arquivos indicados nos mapas. Se precisar consultar um arquivo fora do mapa, explique o motivo ao usuário antes de prosseguir.
> **Após alterar a estrutura, rotas, endpoints, banco, configuração, comandos, deploy ou a responsabilidade de arquivos, atualize o mapa correspondente.**

---

## 7. Áreas Sensíveis & Cuidados

- **Autenticação Admin:** Gerenciada por cookie seguro HMAC em [`src/middleware.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/middleware.ts). Qualquer mudança pode bloquear o acesso ao painel.
- **Fallbacks Offline:** O sistema é projetado para fazer build e iniciar mesmo com banco de dados MySQL offline através dos arquivos localizados em [`src/data/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/data). Certifique-se de que alterações nos serviços mantêm a lógica de fallback funcional.
- **Integridade das Demos:** As demonstrações interativas utilizam dados simulados no lado do cliente. Mantenha os patches descritos em [`scripts/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/scripts) intocados.

---

## 8. Convenções Importantes

- **Estilos:** Tailwind CSS v4 importado via `@import "tailwindcss";` no arquivo [`src/app/globals.css`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/globals.css).
- **Organização de Importações:** Imports agrupados com `@/...` apontando para o diretório raiz `src`.
- **Metadados e SEO:** Toda página pública deve usar a API de Metadados do Next.js via funções utilitárias definidas no diretório [`src/lib/seo/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/lib/seo).

---

## 9. Histórico de Criação

- **2026-06-25:** Criação inicial dos mapas técnicos por Antigravity para suporte rápido de IAs parceiras.
