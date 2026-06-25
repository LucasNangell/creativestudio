# FRONTEND MAP — Nangell Creative Studio

Este mapa serve para orientar o desenvolvimento e manutenção da interface do usuário (UI), estilos, páginas, componentes e fluxos visuais.

---

## 1. Stack do Frontend

- **Base:** React 19 + Next.js 16 (App Router)
- **Estilização:** Tailwind CSS v4 + PostCSS
- **Animações:** Framer Motion (para transições de estado, micro-animações e modais) + GSAP (para animações complexas, scroll e efeitos premium de entrada)
- **Ícones:** Lucide React
- **Gráficos:** Recharts (utilizado nas demonstrações do Dashboard de BI)
- **Metadados:** API de Metadata nativa do Next.js + SEO schemas estruturados

---

## 2. Mapa de Rotas e Páginas (Públicas e Privadas)

| Rota do Navegador  | Arquivo de Entrada (Page)                                                                                                          | Descrição / Função                                        |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------- |
| `/` (Home)         | [`src/app/page.tsx`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/page.tsx)                                 | Landing Page principal premium da agência                 |
| `/sobre`           | [`src/app/sobre/page.tsx`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/sobre/page.tsx)                     | Página institucional "Sobre Nós"                          |
| `/processo`        | [`src/app/processo/page.tsx`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/processo/page.tsx)               | Metodologia de trabalho e etapas do projeto               |
| `/solucoes`        | [`src/app/solucoes/page.tsx`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/solucoes/page.tsx)               | Catálogo de serviços prestados                            |
| `/solucoes/[slug]` | [`src/app/solucoes/[slug]/page.tsx`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/solucoes/[slug]/page.tsx) | Detalhe específico de um serviço (geração dinâmica)       |
| `/portfolio`       | [`src/app/portfolio/page.tsx`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/portfolio/page.tsx)             | Galeria de cases e projetos                               |
| `/cases/[slug]`    | [`src/app/cases/[slug]/page.tsx`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/cases/[slug]/page.tsx)       | Detalhe de um case de sucesso (geração dinâmica)          |
| `/blog`            | [`src/app/blog/page.tsx`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/blog/page.tsx)                       | Listagem do blog de marketing e tecnologia                |
| `/blog/[slug]`     | [`src/app/blog/[slug]/page.tsx`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/blog/[slug]/page.tsx)         | Leitura de post individual (renderiza Markdown)           |
| `/demo/[slug]`     | [`src/app/demo/[slug]/page.tsx`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/demo/[slug]/page.tsx)         | Wrapper das 6 demonstrações interativas                   |
| `/diagnostico`     | [`src/app/diagnostico/page.tsx`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/diagnostico/page.tsx)         | Formulário interativo para captação qualificada (Wizard)  |
| `/contato`         | [`src/app/contato/page.tsx`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/contato/page.tsx)                 | Formulário simples de contato e dúvidas                   |
| `/obrigado`        | [`src/app/obrigado/page.tsx`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/obrigado/page.tsx)               | Página de sucesso exibida pós-conversão                   |
| `/admin/login`     | [`src/app/admin/login/page.tsx`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/admin/login/page.tsx)         | Login da administração                                    |
| `/admin/*`         | [`src/app/admin/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/admin)                                      | Módulos de gerenciamento CRUD do painel                   |
| `/adm`             | [`src/app/adm/page.tsx`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/adm/page.tsx)                         | Estatísticas privadas e monitoramento de leads            |
| `/escopo`          | [`src/app/escopo/page.tsx`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/escopo/page.tsx)                   | Gerador de Escopo de Sistemas por Inteligência Artificial |

---

## 3. Estrutura de Componentes

### Componentes Globais / Layout

- [`src/components/layout/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/components/layout) — Cabeçalho, rodapé, navegação e contêineres globais.
- [`src/components/ui/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/components/ui) — Biblioteca de componentes atômicos (botões, inputs, modais, cards).
- [`src/components/brand/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/components/brand) — Componentes que renderizam logos ou variações visuais da marca.
- [`src/components/seo/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/components/seo) — Tags de microdados JSON-LD estruturados.

### Componentes Específicos por Rota

Armazenados em [`src/app/_components/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/_components) para otimizar imports:

- [`src/app/_components/home/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/_components/home) — Seções Hero, Demos, Cases, Depoimentos e CTA da Home.
- [`src/app/_components/solutions/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/_components/solutions) — Filtros, cards e listas de serviços da página `/solucoes`.
- [`src/app/_components/portfolio/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/_components/portfolio) — Galeria filtrável da página `/portfolio`.
- [`src/app/_components/blog/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/_components/blog) — Listagem com filtros, tags e cards de artigos da página `/blog`.
- [`src/app/_components/admin/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/_components/admin) — Formulários de edição e tabelas de dados do painel `/admin`.
- [`src/app/_components/adm/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/_components/adm) — Gráficos e painéis de dados analíticos do painel `/adm`.

### Componentes de Demos Interativas

Localizados em [`src/components/demos/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/components/demos) e mockups em [`src/components/mockups/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/components/mockups):

- `CrmDemo` — Kanban interativo de vendas.
- `BiDemo` — Gráficos interativos financeiros e de vendas.
- `OsDemo` — Formulário e fluxo de ordens de serviço.
- `EduDemo` — Dashboard de cursos e progresso LMS.
- `LinkQrDemo` — Criador dinâmico de links e códigos QR.
- `MonitoringDemo` — Painel de telemetria com geração simulada de dados em tempo real.

---

## 4. Estilos e Configurações Visuais

- **Configuração de Design:** [`tailwind.config.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/tailwind.config.ts). Controla fontes (Inter/Outfit), cores customizadas (gradientes premium, cinzas escuros no modo dark), sombras e bordas com blur de vidro.
- **Estilos Globais:** [`src/app/globals.css`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/globals.css). Importa o Tailwind CSS v4, define fontes customizadas e animações chave do GSAP.

---

## 5. Fluxos Importantes do Frontend

### Fluxo: Envio do Diagnóstico (Wizard Lead)

Arquivos envolvidos:

- [`src/app/diagnostico/page.tsx`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/diagnostico/page.tsx) (Entrada e container)
- [`src/app/_components/institutional/diagnostic-wizard.tsx`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/_components/institutional/diagnostic-wizard.tsx) (Lógica do formulário multistep)
- [`src/lib/validations/lead.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/lib/validations/lead.ts) (Schemas do Zod por etapa e final)
- [`src/app/api/leads/route.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/api/leads/route.ts) (Submissão final da API)

Passos:

1. O usuário avança por 6 etapas selecionando opções (Escopo, Budget, Urgência, etc.).
2. Validação local do Zod por step garante o preenchimento correto antes de avançar.
3. No último step, validação de e-mail, nome, telefone e honeypot contra bots.
4. Envio assíncrono para `/api/leads`. Sucesso salva dados em `sessionStorage` e redireciona para `/obrigado`.

### Fluxo: Carregamento de Demos Interativas (Code-Splitting)

Arquivos envolvidos:

- [`src/app/demo/[slug]/page.tsx`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/demo/[slug]/page.tsx)
- [`src/components/demos/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/components/demos) (crm-demo, bi-demo, etc.)

Passos:

1. A rota recebe o slug correspondente à demonstração.
2. Componentes em `src/components/demos/` são importados dinamicamente com `next/dynamic` com SSR desabilitado (`ssr: false`) para evitar descompasso de hidratação (hydration mismatch) devido ao uso de dados gerados no cliente.
3. Lógica interna da demo inicializa estados temporários usando sessionStorage para garantir persistência durante a navegação interna.

---

## 6. Onde fazer Alterações Visuais e Textuais?

- **Modificar Layout de Páginas:** Modifique o arquivo `page.tsx` correspondente dentro de [`src/app/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app).
- **Modificar Textos Estáticos (Fallbacks):** Arquivos em [`src/data/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/data), como [`src/data/home.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/data/home.ts), [`src/data/services/enriched-content.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/data/services/enriched-content.ts) ou [`src/data/blog/fallback-posts.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/data/blog/fallback-posts.ts).
- **Modificar Formulários (Diagnóstico/Contato):** [`src/app/_components/institutional/diagnostic-wizard.tsx`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/_components/institutional/diagnostic-wizard.tsx) ou [`src/app/contato/page.tsx`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/contato/page.tsx).
- **Modificar Estilos, Cores ou Espaçamentos:** [`src/app/globals.css`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/globals.css) para regras CSS nativas ou [`tailwind.config.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/tailwind.config.ts) para as diretivas e tokens Tailwind.
