# PLANO DE IMPLEMENTAÇÃO: NANGELL CREATIVE STUDIO

Este documento apresenta o plano de implementação técnico e estratégico para o desenvolvimento do site institucional e comercial da **Nangell Creative Studio**. O objetivo é guiar o desenvolvimento do zero até a produção de forma lógica, organizada e incremental.

---

## 1. Visão Geral do Projeto

A **Nangell Creative Studio** posiciona-se como um estúdio de engenharia criativa especializado no desenvolvimento de softwares sob medida (sistemas web, mobile, desktop, automações, dashboards e SaaS). O site institucional e comercial atuará como o maior case técnico e comercial do estúdio. 

### Diferencial Competitivo ("Show, Don't Tell")
Em vez de apresentar apenas capturas de tela estáticas e descrições textuais, o site integrará **demonstrações interativas simuladas** no próprio domínio (sob a rota `/demo/*`). O visitante poderá experimentar o funcionamento, a usabilidade e a inteligência de diferentes soluções de software em tempo real, gerando valor tangível e demonstrando competência técnica antes mesmo de iniciar o contato comercial.

---

## 2. Diagnóstico do Estado Atual

### 2.1. Estrutura e Arquivos Encontrados
Após a varredura do diretório do projeto, foi identificada a seguinte estrutura mínima:
* **Diretório:** `g:\Meu Drive\creative studio\creativesite`
* **Arquivos Identificados:**
  * [escopo.md](file:///g:/Meu%20Drive/creative%20studio/creativesite/escopo.md) (Contendo o escopo estratégico, especificações de design system, banco de dados e detalhamento de rotas e demos).

### 2.2. Situação do Framework e Configurações
* **Framework:** Não há código-fonte, configurações de framework (`package.json`), ou estrutura inicial configurada no momento. O projeto está em estado inicial absoluto ("Greenfield").
* **Banco de Dados:** Sem banco local configurado ou esquemas de banco presentes na estrutura física.
* **Assets:** A logo mencionada no escopo não está presente no diretório atual de arquivos. Será necessário solicitar o arquivo da logo para incorporação nos assets de imagem ou utilizar representações vetorizadas baseadas na paleta de cores.

### 2.3. Riscos Técnicos e Pontos de Atenção
* **Ausência de Código Inicial:** Iniciar o projeto exige a instalação limpa do Next.js com App Router, TypeScript, ESLint, Prettier e Tailwind CSS.
* **Configuração de Conexão com o MySQL:** Configurar o ORM Prisma apontando para o MySQL local com a senha contendo caracteres especiais (`CreativeStudio@2026`), exigindo codificação da URL de conexão (`CreativeStudio%402026`).
* **Segurança e Isolamento das Demos:** Garantir que as demonstrações interativas operem exclusivamente no frontend (com dados mockados na sessão ou cookies), impedindo vazamento de dados ou gargalos de conexões com o banco de dados principal.

---

## 3. Arquitetura Final Esperada

O projeto adotará a arquitetura do **Next.js App Router** com TypeScript, estruturado de forma escalável e limpa.

```mermaid
graph TD
    User([Visitante / Admin]) --> Router[Next.js Router]
    Router --> SSR[Server Components / Static Pages]
    Router --> CSR[Client Components - Demos/Admin Forms]
    Router --> ServerActions[API Routes / Server Actions]
    ServerActions --> Prisma[Prisma ORM]
    Prisma --> MySQL[(MySQL Local)]
    CSR --> SessionStorage[(Session Storage - Demos)]
```

### 3.1. Organização de Pastas do Projeto
A estrutura de pastas recomendada segue os padrões modernos do Next.js com foco em modularidade:

```txt
/
├── prisma/                 # Schema do Prisma e Migrations
│   ├── schema.prisma
│   └── seed.ts             # Scripts de carga inicial de dados
├── public/                 # Assets estáticos (imagens, ícones, logo)
│   └── assets/
│       ├── brand/          # Logo e materiais de marca
│       └── mockups/        # Imagens de cases e portfólio
├── src/
│   ├── app/                # Estrutura do App Router
│   │   ├── (public)/       # Grupo de rotas públicas
│   │   │   ├── solutions/  # /solucoes e subpáginas
│   │   │   ├── portfolio/  # /portfolio
│   │   │   ├── cases/      # /cases/[slug]
│   │   │   ├── demo/       # /demo/[slug] (CRM, BI, OS, etc.)
│   │   │   ├── diagnostic/ # /diagnostico (Formulário leads)
│   │   │   └── blog/       # /blog e /blog/[slug]
│   │   ├── admin/          # Grupo de rotas da área administrativa
│   │   │   ├── login/
│   │   │   ├── leads/
│   │   │   ├── projects/
│   │   │   └── ...
│   │   ├── api/            # Endpoints da API REST
│   │   ├── layout.tsx      # Layout raiz
│   │   └── page.tsx        # Home do site
│   ├── components/         # Componentes compartilhados
│   │   ├── ui/             # Componentes base (shadcn/ui/Radix UI)
│   │   ├── global/         # Header, Footer, Menu Mobile, WhatsApp
│   │   ├── layout/         # Containers, Sections, Grids
│   │   └── mockups/        # Mockup de Navegador, Terminal, Dashboard
│   ├── contexts/           # Contextos globais do React (Theme, Auth)
│   ├── hooks/              # Custom hooks reaproveitáveis
│   ├── lib/                # Configurações de bibliotecas (prisma.ts, utils.ts)
│   ├── services/           # Regras de negócio e comunicação com APIs/Banco
│   └── types/              # Definições de tipos globais do TypeScript
├── .env                    # Variáveis de ambiente locais (não versionado)
├── .env.example            # Modelo de variáveis de ambiente
├── tailwind.config.ts      # Configuração detalhada do design system
└── tsconfig.json
```

---

## 4. Mapa Completo de Rotas

Todas as rotas devem ser criadas com SEO técnico nativo (Metadata API), responsividade móvel impecável e acessibilidade WCAG 2.2.

| Rota | Objetivo | Componentes Principais | Dados Utilizados | CTAs Principais | Critérios de Aceite |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/` | Home comercial e institucional | Hero, Marquee, Demos Grid, Processo, Testemunhos, CTA Final | Projetos em destaque, Serviços e Depoimentos | "Ver sistemas em ação", "Solicitar diagnóstico" | Carregamento LCP < 2.5s, animações otimizadas. |
| `/solucoes` | Catálogo geral de soluções oferecidas | Grid de Soluções, Cards de Benefícios, Tech Stack | Lista de serviços cadastrados no banco | "Solicitar proposta", "Agendar reunião" | Filtros rápidos e carregamento assíncrono. |
| `/solucoes/desenvolvimento-web` | Página de nicho para Sistemas e SaaS | Hero específico, Arquitetura base, Cases vinculados | Detalhes do serviço (Banco/Seed) | "Falar com especialista" | SEO focado em "desenvolvimento de sistemas sob medida". |
| `/solucoes/apps-mobile` | Página de nicho para Aplicativos e PWAs | Mockups mobile interativos, Recursos nativos (câmera, GPS) | Detalhes do serviço (Banco/Seed) | "Solicitar orçamento de app" | Demonstração visual de responsividade. |
| `/solucoes/sistemas-desktop` | Sistemas e automações locais (Windows/ERPs) | Terminal interativo, Benefícios de performance | Detalhes do serviço (Banco/Seed) | "Automatizar processos locais" | Foco em robustez operacional. |
| `/solucoes/automacoes` | Scripts, bots, scrapers e fluxos automatizados | Diagrama de fluxo animado, Calculadora de ROI | Casos de sucesso de automações | "Calcular economia operacional" | Calculadora funcional no client-side. |
| `/solucoes/dashboards-bi` | Painéis e indicadores gerenciais inteligentes | Mockup de BI interativo, Alertas e KPIs fictícios | Detalhes do serviço (Banco/Seed) | "Ver dados em tempo real" | Visualização impecável no mobile e desktop. |
| `/solucoes/sites-landing-pages` | Landing pages de conversão e sites premium | Grid de conversão, Seção de tracking (GTM, GA4) | Detalhes do serviço (Banco/Seed) | "Criar página de alta conversão" | Pontuação Lighthouse Performance > 95. |
| `/portfolio` | Vitrine de cases com filtros dinâmicos | Filtros por categoria/stack/objetivo, Grid de cases | Projetos (tabela `projects`) | "Abrir demo", "Ver case", "Quero parecido" | Filtros fluidos sem recarregar a página. |
| `/cases/[slug]` | Estudo de caso detalhado de um projeto | Hero do case, Problem/Solution, Tech Stack, Galeria | Projeto específico por Slug (Banco) | "Iniciar projeto similar" | URLs amigáveis, dados estruturados Schema.org. |
| `/demo/crm-inteligente` | Demo: CRM com funil Kanban interativo | Kanban, Gráficos de vendas, WhatsApp Simulator | Dados mockados (Sessão / Cookies) | "Solicitar orçamento para CRM" | Simular drag-and-drop de leads de forma responsiva. |
| `/demo/dashboard-bi` | Demo: Painel BI financeiro e de vendas | Gráficos de linha/barra, Filtros temporais, Alertas | Dados mockados de BI (Sessão) | "Quero um painel para minha empresa" | Gráficos dinâmicos com animações fluidas. |
| `/demo/gestao-os` | Demo: Gerenciador de Ordens de Serviço | Fila de OS, Linha do tempo, Modais de andamento | Dados mockados de OS (Sessão) | "Preciso organizar minha operação" | Simular fluxo completo de alteração de status. |
| `/demo/plataforma-educacional`| Demo: Ambiente do aluno (LMS) | Dashboard do aluno, Player de vídeo, Quiz | Dados mockados de cursos (Sessão) | "Criar minha plataforma educacional"| Progresso dinâmico e quiz interativo. |
| `/demo/link-qr` | Demo: Encurtador de links e QR code | Inputs de URL/UTM, QR Code Generator | Dados locais (Session Storage) | "Quero desenvolver um SaaS" | Geração real de QR Code no frontend. |
| `/demo/monitoramento-tempo-real` | Demo: Feed crítico de logs e eventos | Stream simulado de eventos, Alertas sonoros/visuais| Eventos fictícios gerados via intervalo | "Quero monitorar dados" | Feed fluido com possibilidade de pausar a fila. |
| `/processo` | Metodologia detalhada de engenharia da Nangell| Infográfico interativo em 6 passos, FAQ | Conteúdo fixo estruturado | "Agendar diagnóstico inicial" | Transições suaves baseadas em Scroll. |
| `/sobre` | Valores, história e cultura técnica da marca | Linha do tempo, Manifesto de código, Stacks | Dados estáticos institucionais | "Trabalhar conosco" | Textos otimizados para leitura (Sora/Inter). |
| `/diagnostico` | Captação de briefings qualificados | Formulário multi-etapas estilo Typeform | Estado temporário e gravação na tabela `leads` | "Enviar diagnóstico" | Validação rigorosa com Zod + React Hook Form. |
| `/contato` | Contato rápido e direto | Formulário simples, E-mail, WhatsApp link | Dados enviados para `leads` e API | "Enviar mensagem", "Chamar no WhatsApp" | Envio assíncrono com Toasts informativos. |
| `/blog` | Portal de conteúdos sobre tecnologia e negócios | Grid de artigos, Busca, Categorias | Artigos (tabela `posts`) | "Assinar newsletter" | Paginação ou scroll infinito otimizado para SEO. |
| `/blog/[slug]` | Leitura de artigo estratégico | Renderizador de texto, Artigos relacionados | Post por Slug (Banco) | "Quero um diagnóstico gratuito" | Meta tags dinâmicas e dados estruturados de Artigo. |
| `/obrigado` | Confirmação de recebimento de leads | Mensagem de sucesso, Link para WhatsApp | Dados do lead recente | "Abrir conversa no WhatsApp" | Pixel de conversão GA4 disparado no carregamento. |
| `/politica-de-privacidade` | Políticas de privacidade (LGPD) | Texto legal | Dados estáticos | N/A | Totalmente acessível e legível por leitores de tela. |
| `/termos-de-uso` | Termos de uso das soluções e demos | Texto legal | Dados estáticos | N/A | Legibilidade premium. |
| `/admin/login` | Login administrativo | Form de autenticação com limite de tentativas | Credenciais de usuário (tabela `users`) | "Entrar no painel" | HTTPS obrigatório, proteção contra força bruta. |
| `/admin` | Dashboard interno da Nangell | Gráficos de leads/médias de conversão | Métricas do banco (leads, posts, analytics)| N/A | Área estritamente logada (Middlewares). |
| `/admin/leads` | Listagem e gerenciamento de leads captados | Tabela interativa, Filtros, Histórico, Notas | Leads (tabela `leads`) | "Exportar CSV", "Contatar via WhatsApp"| Alteração de status em lote, busca por texto. |
| `/admin/projetos` | Cadastro e edição de cases do portfólio | Form de upload de imagens, Rich text editor | Projetos (tabela `projects`) | "Salvar projeto", "Publicar" | Upload seguro e sanitização dos campos de texto. |
| `/admin/servicos` | Gerenciamento de serviços e páginas dinâmicas | Editor de serviços | Serviços (tabela `services`) | "Atualizar serviço" | Atualização dinâmica na base de dados. |
| `/admin/depoimentos` | Cadastro de depoimentos de clientes | CRUD simples de avaliações | Depoimentos (tabela `testimonials`)| "Salvar depoimento" | Validação do formato de imagem (avatar). |
| `/admin/blog` | Editor de publicações para o blog | Editor Markdown/MDX, upload de capas | Posts (tabela `posts`) | "Publicar artigo", "Salvar rascunho"| Auto-save automático e geração automática de slug. |
| `/admin/configuracoes` | Parâmetros gerais do site | Form de configurações (e-mail, redes, offline) | site_settings (tabela `site_settings`) | "Salvar configurações" | Atualização de cache das configurações. |

---

## 5. Design System Premium

O visual deve ser limpo, corporativo, altamente tecnológico e voltado para a conversão de empresas de médio a grande porte.

### 5.1. Paleta de Cores
* **Cores de Destaque e Tecnologia (Baseadas na Logo):**
  * Ciano Principal: `#00C2FC` (Foco em links, termos importantes, botões primários)
  * Azul Tecnológico: `#058FF7` (Gradientes e estados de hover)
  * Azul Elétrico: `#3061FA` (Bordas de foco, acentos em cards)
  * Roxo/Violeta: `#6139FA` (Gradientes profundos em fundos e heros)
* **Fundo (Dark Mode):**
  * Principal: `#05070D` (Páginas e seções principais)
  * Secundário: `#0B0F1A` (Cards, cabeçalhos, formulários)
* **Tipografia e Bordas:**
  * Texto Claro: `#F8FAFC`
  * Texto Suave: `#94A3B8`
  * Bordas Translúcidas: `rgba(255, 255, 255, 0.08)` para o visual glassmorphism.

### 5.2. Tipografia
* **Títulos e Subtítulos:** **Space Grotesk** ou **Sora** (importadas via Google Fonts de forma otimizada para evitar flashes de fontes não estilizadas).
* **Corpo do Texto:** **Inter** ou **Geist Sans** (alta legibilidade em telas de qualquer tamanho).
* **Elementos Técnicos (Terminais, Tags de Stack, Código):** **JetBrains Mono** (look hacker/engenharia).

### 5.3. Estilo e Efeitos Visuais
* **Glassmorphism:** Cards com fundo `#0B0F1A` com opacidade de 80%, filtro `backdrop-blur-md` e borda de `1px solid rgba(255, 255, 255, 0.08)`.
* **Microinterações:**
  * Botões principais com gradiente animado no background (`bg-gradient-to-r` transitando as posições dos azuis ao passar o mouse).
  * Efeito Spotlight: Cards em grids que exibem um glow radial acompanhando o movimento do cursor do usuário (usando Javascript Client-Side leve).
  * Scroll Indicator no topo da página.

### 5.4. Acessibilidade (WCAG 2.2 AA)
* **Contraste:** Garantir razão de contraste mínima de 4.5:1 para textos em relação ao fundo escuro.
* **Navegação por Teclado:** Estados de foco (`outline`) bem definidos em azul elétrico para acessibilidade total sem mouse.
* **Redução de Movimentos:** Desabilitar animações pesadas do Framer Motion e GSAP caso o navegador sinalize `prefers-reduced-motion: reduce`.

---

## 6. Plano de Banco de Dados (MySQL Local)

O projeto utilizará **Prisma ORM** como interface de banco de dados MySQL local.

### 6.1. Configuração do Ambiente (`.env`)
O arquivo `.env` local será configurado com o usuário e a senha contendo caractere especial `@` codificado como `%40` na string de conexão:

```env
# URL de conexão do Prisma (com caractere especial "@" escapado)
DATABASE_URL="mysql://root:CreativeStudio%402026@localhost:3306/nangell_creative_studio?charset=utf8mb4&collation=utf8mb4_unicode_ci"

# Parâmetros brutos de conexão para scripts locais adicionais
MYSQL_HOST="localhost"
MYSQL_PORT="3306"
MYSQL_USER="root"
MYSQL_PASSWORD="CreativeStudio@2026"
MYSQL_DATABASE="nangell_creative_studio"
```

### 6.2. Modelagem das Tabelas (Schema Prisma)

#### Tabela: `users`
* **Finalidade:** Cadastro de administradores e editores do painel interno.
* **Campos:** `id` (VARCHAR 36 - UUID), `name` (VARCHAR), `email` (VARCHAR - UNIQUE), `password_hash` (VARCHAR), `role` (ENUM: ADMIN, EDITOR), `created_at` (DATETIME), `updated_at` (DATETIME).
* **Segurança:** Sem armazenamento de senhas puras. Utilizar hash do bcrypt com fator de custo de 12.
* **Índices:** Index no campo `email`.

#### Tabela: `leads`
* **Finalidade:** Armazenar dados captados no formulário de diagnóstico e contato.
* **Campos:** `id` (UUID), `name` (VARCHAR), `email` (VARCHAR), `phone` (VARCHAR), `company` (VARCHAR), `website` (VARCHAR, NULL), `project_type` (VARCHAR), `challenge` (TEXT), `budget_range` (VARCHAR), `urgency` (VARCHAR), `preferred_contact` (VARCHAR), `message` (TEXT, NULL), `source_page` (VARCHAR), `source_demo` (VARCHAR, NULL), `utm_source` (VARCHAR, NULL), `utm_medium` (VARCHAR, NULL), `utm_campaign` (VARCHAR, NULL), `consent` (BOOLEAN), `status` (ENUM: NOVO, CONTATO, REUNIAO, PROPOSTA, FECHADO, PERDIDO), `internal_notes` (TEXT, NULL), `created_at` (DATETIME), `updated_at` (DATETIME).
* **Segurança:** Sanitização de todos os campos de texto antes de salvar. Restrição de leitura restrita à rota `/admin`.
* **Índices:** Index em `created_at`, `status`.

#### Tabela: `projects`
* **Finalidade:** Informações dinâmicas dos cases de portfólio do estúdio.
* **Campos:** `id` (UUID), `title` (VARCHAR), `slug` (VARCHAR - UNIQUE), `category` (VARCHAR), `short_description` (TEXT), `full_description` (TEXT), `problem` (TEXT), `solution` (TEXT), `features` (JSON - Array de strings), `stack` (JSON - Array de tecnologias), `cover_image` (VARCHAR), `gallery` (JSON - Array de URLs de mockups), `metrics` (JSON - Métricas de resultados fictícias ou reais), `demo_type` (ENUM: NONE, NATIVE, IFRAME, EXTERNAL), `demo_route` (VARCHAR, NULL), `is_featured` (BOOLEAN), `status` (ENUM: DRAFT, PUBLISHED, HIDDEN), `seo_title` (VARCHAR), `seo_description` (VARCHAR), `sort_order` (INT), `created_at` (DATETIME), `updated_at` (DATETIME).
* **Índices:** Index em `slug`, `status`.

#### Tabela: `services`
* **Finalidade:** Detalhes de cada serviço exibido nas subpáginas de `/solucoes`.
* **Campos:** `id` (UUID), `title` (VARCHAR), `slug` (VARCHAR - UNIQUE), `headline` (VARCHAR), `description` (TEXT), `problem_solved` (TEXT), `deliverables` (JSON - Entregas da Nangell), `technologies` (JSON - Stack recomendada), `target_audience` (TEXT), `cta_label` (VARCHAR), `seo_title` (VARCHAR), `seo_description` (VARCHAR), `status` (ENUM: ACTIVE, INACTIVE), `created_at` (DATETIME), `updated_at` (DATETIME).

#### Tabela: `testimonials`
* **Finalidade:** Depoimentos e avaliações de clientes exibidos no site.
* **Campos:** `id` (UUID), `client_name` (VARCHAR), `client_role` (VARCHAR), `company` (VARCHAR), `content` (TEXT), `rating` (INT - default 5), `image` (VARCHAR), `status` (ENUM: APPROVED, PENDING), `created_at` (DATETIME).

#### Tabela: `posts`
* **Finalidade:** Publicações e artigos no blog.
* **Campos:** `id` (UUID), `title` (VARCHAR), `slug` (VARCHAR - UNIQUE), `excerpt` (TEXT), `content` (LONGTEXT), `cover_image` (VARCHAR), `category` (VARCHAR), `tags` (JSON - Array de strings), `author` (VARCHAR), `status` (ENUM: DRAFT, PUBLISHED), `seo_title` (VARCHAR), `seo_description` (VARCHAR), `published_at` (DATETIME, NULL), `created_at` (DATETIME), `updated_at` (DATETIME).
* **Índices:** Index em `slug`, `status`, `published_at`.

#### Tabela: `site_settings`
* **Finalidade:** Parâmetros globais que podem ser alterados no admin (telefone do WhatsApp, e-mail administrativo, etc.).
* **Campos:** `id` (UUID), `key` (VARCHAR - UNIQUE), `value` (TEXT), `updated_at` (DATETIME).

#### Tabela: `analytics_events`
* **Finalidade:** Armazenar eventos críticos de tracking internamente para otimização de campanhas (auxiliar ao GA4).
* **Campos:** `id` (UUID), `event_name` (VARCHAR), `page` (VARCHAR), `demo_slug` (VARCHAR, NULL), `lead_id` (UUID, NULL), `metadata` (JSON), `created_at` (DATETIME).

---

## 7. Plano de Implementação por Fases

O projeto está dividido em **16 fases incrementais** estruturadas de forma que cada entrega seja testável de maneira independente.

---

### Fase 0 — Auditoria Inicial e Preparação
* **Objetivo:** Mapeamento minucioso do ambiente de desenvolvimento local, garantindo integridade dos arquivos e verificação de dependências instaladas.
* **Dependências:** Nenhuma.
* **Arquivos/Pastas Envolvidos:** `g:\Meu Drive\creative studio\creativesite/*`.
* **Funcionalidades a Implementar:** Varredura detalhada e criação do checklist base de arquivos.
* **Critérios de Aceite:** Relatório completo sem alteração ou deleção de qualquer arquivo pré-existente.
* **Testes Manuais:** Executar validação de caminhos absolutos no console local.

---

### Fase 1 — Fundação do Projeto
* **Objetivo:** Inicializar o projeto Next.js com TypeScript, Tailwind CSS, configurações de qualidade (ESLint/Prettier) e estrutura de pastas global.
* **Dependências:** Node.js v18+.
* **Arquivos/Pastas Envolvidos:** `/package.json`, `/tsconfig.json`, `/tailwind.config.ts`, `/src/app/layout.tsx`.
* **Funcionalidades a Implementar:** Inicialização via terminal, configuração dos aliases (`@/*`), criação do tema de cores no Tailwind e definição de fontes (Sora e Inter).
* **Critérios de Aceite:** O projeto deve compilar localmente sem erros e exibir a página raiz do Next.js sem estilos corrompidos.
* **Testes Automatizados:** `npm run build` deve rodar com sucesso.

---

### Fase 2 — Banco de Dados MySQL e Prisma
* **Objetivo:** Estabelecer a conexão e criar as tabelas estruturais no banco de dados MySQL local.
* **Dependências:** MySQL rodando localmente na porta 3306.
* **Arquivos/Pastas Envolvidos:** `/prisma/schema.prisma`, `/prisma/seed.ts`, `/.env`.
* **Funcionalidades a Implementar:** Executar migrações iniciais do Prisma, criar dados fictícios estruturados (Seeds) para projetos, posts do blog e o usuário inicial administrador (`admin@nangell.com.br`).
* **Critérios de Aceite:** Banco criado com sucesso com todas as tabelas descritas, populado com os dados mockados via seed.
* **Comandos:**
  ```bash
  npx prisma migrate dev --name init
  npx prisma db seed
  ```

---

### Fase 3 — Design System e Componentes Globais
* **Objetivo:** Criar e disponibilizar os componentes reutilizáveis e estruturais que garantem a harmonia visual.
* **Dependências:** Tailwind CSS, Radix UI/shadcn.
* **Componentes a Criar:**
  * `Header`: Navegação com blur de fundo (`backdrop-blur-md`) e links de rotas públicas.
  * `Footer`: Links estruturais, redes e dados da empresa.
  * `Menu Mobile`: Navegação em overlay fullscreen suave.
  * `Botões & Inputs`: Estilização base com foco visível.
  * `Browser Mockup`: Janela simuladora de navegador para heros e portfólio.
* **Critérios de Aceite:** Todos os componentes testados em tela com suporte a navegação por teclado e sem layout shifts (CLS = 0).

---

### Fase 4 — Home Premium
* **Objetivo:** Implementar a Home com design sofisticado e alta taxa de conversão.
* **Dependências:** Fase 3 concluída, Framer Motion/GSAP.
* **Funcionalidades a Implementar:** Hero principal com headline animada, marquee com as linguagens/stacks de autoridade, grid das 6 soluções e CTA final integrado com redirecionamento ao WhatsApp e formulário de diagnóstico.
* **Critérios de Aceite:** Visual idêntico aos padrões dark tech premium, com animações suaves e desempenho Lighthouse em desktop > 90.

---

### Fase 5 — Páginas Institucionais
* **Objetivo:** Criar as páginas estáticas e de apoio institucional.
* **Dependências:** Fase 3 concluída.
* **Rotas Envolvidas:** `/sobre`, `/processo`, `/politica-de-privacidade`, `/termos-de-uso`, `/obrigado`.
* **Funcionalidades a Implementar:**
  * `/sobre`: Timeline histórica da empresa e manifesto de qualidade.
  * `/processo`: O fluxograma interativo em 6 etapas da Nangell.
  * `/obrigado`: Confirmação com links imediatos de contato no WhatsApp.
* **Critérios de Aceite:** Páginas com SEO configurado e responsivas em aparelhos mobile de 320px de largura.

---

### Fase 6 — Soluções e Páginas de Serviços
* **Objetivo:** Criar o painel e as subpáginas de explicação dos serviços de software.
* **Dependências:** Conexão com banco/seed ativa.
* **Rotas Envolvidas:** `/solucoes` e subpáginas (ex: `/solucoes/desenvolvimento-web`, `/solucoes/apps-mobile`, etc.).
* **Funcionalidades a Implementar:** Renderizar dinamicamente os detalhes do banco (problemas que resolve, stack recomendada, entregáveis e CTA direcionado).
* **Critérios de Aceite:** Links funcionando, tags de stack renderizadas por ícones de tecnologia e indexação pronta para motores de busca.

---

### Fase 7 — Portfólio e Cases
* **Objetivo:** Criar a página centralizadora de cases comerciais e as páginas internas de estudos.
* **Dependências:** Fase 2 (Prisma) e Fase 3.
* **Rotas Envolvidas:** `/portfolio`, `/cases/[slug]`.
* **Funcionalidades a Implementar:** Filtro dinâmico rápido no frontend por Stacks ou Objetivos de negócio. Exibição de métricas de sucesso em destaque e galeria de mockups do case.
* **Critérios de Aceite:** Navegar entre filtros de forma instantânea sem recarregar a página.

---

### Fase 8 — Demos Interativas
* **Objetivo:** Desenvolver as 6 demonstrações interativas rodando no frontend com dados simulados locais para provar competência de engenharia.
* **Dependências:** Fase 3.
* **Especificações das Demos:**
  1. **CRM Inteligente (`/demo/crm-inteligente`):** Funil de leads interativo (drag-and-drop), simulação de envio de WhatsApp na timeline de contatos.
  2. **Dashboard BI (`/demo/dashboard-bi`):** Filtros temporais atualizando gráficos de faturamento simulados e alertas automáticos de inteligência comercial.
  3. **Gestão de OS (`/demo/gestao-os`):** Criação e alteração de status de Ordens de Serviço fictícias com timeline de andamento do processo.
  4. **Plataforma Educacional (`/demo/plataforma-educacional`):** Área do aluno funcional contendo quiz com feedback imediato e simulador de progressão de módulo.
  5. **Encurtador de Links (`/demo/link-qr`):** Gerador local de QR codes e visualizador de cliques em UTMs simulados salvos na sessão local.
  6. **Monitoramento em Tempo Real (`/demo/monitoramento-tempo-real`):** Stream de logs simulados de servidores e disparador de alertas sonoros/visuais configuráveis.
* **Restrições Críticas:** Sem conexão direta com o banco de dados MySQL para dados dinâmicos da simulação para segurança e velocidade. Cada demo terá um CTA persistente "Gostaria de um sistema parecido?" linkando para o diagnóstico.

---

### Fase 9 — Formulário de Diagnóstico e Captura de Leads
* **Objetivo:** Criar o fluxo de captação de briefings no estilo multi-etapas.
* **Dependências:** React Hook Form, Zod, Prisma (Fase 2).
* **Rotas Envolvidas:** `/diagnostico`.
* **Funcionalidades a Implementar:** Formulário em 6 etapas com indicador visual de progresso. Ao final, salvar os dados na tabela `leads` no banco e redirecionar para `/obrigado`.
* **Critérios de Aceite:** Validação de formato de WhatsApp/Email em tempo real, proteção contra spam (limitação de submissões na rota da API) e salvamento completo no MySQL local.

---

### Fase 10 — Área Administrativa (Login e Dashboard)
* **Objetivo:** Criar a interface interna de administração do site.
* **Dependências:** NextAuth.js ou lógica de cookies e sessão segura, bcrypt.
* **Rotas Envolvidas:** `/admin/login`, `/admin`.
* **Funcionalidades a Implementar:** Rota de login com proteção de rota via middleware Next.js. Painel de controle resumindo número de leads captados, demos mais acessadas e taxa de preenchimento dos formulários.
* **Critérios de Aceite:** Bloqueio rígido de usuários não autenticados a qualquer rota `/admin/*`.

---

### Fase 11 — Área Administrativa (Gestão de Conteúdo e Leads)
* **Objetivo:** Desenvolver as telas de CRUD para leads, projetos, posts do blog e depoimentos.
* **Dependências:** Fase 10 concluída.
* **Rotas Envolvidas:** `/admin/leads`, `/admin/projetos`, `/admin/blog`, `/admin/depoimentos`.
* **Funcionalidades a Implementar:** Tabela de leads com ordenação e campo para salvar notas internas de acompanhamento. Editor de texto rico (Markdown/MDX) para publicação no blog e upload de imagens de capa.
* **Critérios de Aceite:** Funcionalidades de criar, editar e ocultar registros sincronizando instantaneamente com o banco local.

---

### Fase 12 — Blog e Conteúdo Estratégico
* **Objetivo:** Exibir os artigos e publicações para atração orgânica e SEO.
* **Dependências:** Fase 11 concluída.
* **Rotas Envolvidas:** `/blog`, `/blog/[slug]`.
* **Funcionalidades a Implementar:** Grid de busca de artigos, renderização HTML segura do conteúdo Markdown gravado no banco de dados e cards de artigos sugeridos ao final do texto.
* **Critérios de Aceite:** Otimização para leitura mobile, carregamento de imagens em lazy loading e links para compartilhamento rápido.

---

### Fase 13 — SEO Técnico, Analytics e Tracking
* **Objetivo:** Otimização absoluta para indexadores e configuração de tags de conversão.
* **Dependências:** Fase 5 e Fase 9 concluídas.
* **Funcionalidades a Implementar:** Geração automática do `sitemap.xml` e `robots.txt`. Configuração da tag de cabeçalho do Google Tag Manager (GTM) e Google Analytics (GA4) com rastreamento específico de abertura de demos e envio de formulários.
* **Critérios de Aceite:** Verificação no Lighthouse SEO com nota superior a 95 e validação de disparo de eventos na extensão Tag Assistant.

---

### Fase 14 — Performance, Acessibilidade e Hardening
* **Objetivo:** Otimizar recursos e blindar o sistema contra vulnerabilidades.
* **Dependências:** Conclusão do desenvolvimento de rotas.
* **Funcionalidades a Implementar:** Configurar Headers de Segurança (CSP, Frame-Options), habilitar Rate Limit nas APIs de envio de leads, compactar dinamicamente assets de imagem para `.webp` ou `.avif` e auditar elementos sem atributos de acessibilidade (ARIA).
* **Critérios de Aceite:** Pontuação Core Web Vitals no percentil ideal (LCP < 2.5s, CLS < 0.1). Zero erros de segurança crítica em ferramentas de scan estático.

---

### Fase 15 — QA Final e Produção
* **Objetivo:** Homologação total do site simulando o ambiente final de hospedagem.
* **Dependências:** Todas as fases anteriores concluídas.
* **Funcionalidades a Implementar:** Executar testes ponta a ponta (E2E), rodar build final de produção em ambiente local (`npm run build`), exportar documentação de suporte técnico e configurar a Vercel com banco local tunelado ou migrado para nuvem.
* **Critérios de Aceite:** Construção limpa de produção, sem variáveis de ambiente expostas e fluxo de captação de leads operando perfeitamente.

---

## 8. Prompts Futuros Recomendados

Abaixo está o mapeamento dos prompts que deverão ser gerados nas próximas etapas de desenvolvimento para que o assistente AI execute cada fase de forma cirúrgica.

```mermaid
graph LR
    P1[Prompt 1: Fundações] --> P2[Prompt 2: Banco & Prisma]
    P2 --> P3[Prompt 3: UI Globais]
    P3 --> P4[Prompt 4: Demos & Forms]
    P4 --> P5[Prompt 5: Admin & QA]
```

### 1. Prompt de Fundação do Projeto (Fases 0 e 1)
* **Título:** `Setup Inicial e Fundação do Next.js + Tailwind`
* **Objetivo:** Criar e configurar o esqueleto do projeto Next.js com as configurações de qualidade e variáveis de ambiente iniciais.
* **Nível de Risco:** Baixo.
* **Entregáveis:** `package.json` configurado, arquivos de linting, aliases no `tsconfig.json` e o arquivo global de estilização contendo a paleta de cores.

### 2. Prompt de Configuração de Banco de Dados (Fase 2)
* **Título:** `Configuração do Prisma ORM e Modelagem do Banco MySQL`
* **Objetivo:** Escrever o schema Prisma final, gerar as migrações locais e rodar as seeds necessárias.
* **Nível de Risco:** Médio (caracteres especiais na senha e conectividade).
* **Entregáveis:** `schema.prisma` funcional, migrations executadas no MySQL local e script `seed.ts` populando a base.

### 3. Prompt de UI e Componentes Globais (Fase 3 e 4)
* **Título:** `Desenvolvimento de Componentes Globais e Home Premium`
* **Objetivo:** Criar os componentes estruturais do design system (Header, Footer, Glassmorphism Cards) e a página principal de forma estática.
* **Nível de Risco:** Baixo.
* **Entregáveis:** Componentes na pasta `/src/components` e a rota `/` desenvolvida com animações básicas.

### 4. Prompt de Criação das Demos Interativas (Fase 8)
* **Título:** `Implementação de Simuladores Frontend (Demos Interativas)`
* **Objetivo:** Codificar as 6 interfaces de simulação frontend contidas na rota `/demo/*`.
* **Nível de Risco:** Médio (complexidade lógica de estados).
* **Entregáveis:** Páginas interativas operando em memória local no navegador com dados realistas simulados.

### 5. Prompt de Captação e Área Admin (Fases 9, 10 e 11)
* **Título:** `Desenvolvimento do Formulário Multi-etapas e Dashboard Admin`
* **Objetivo:** Implementar o formulário `/diagnostico` com persistência de dados no MySQL e a interface fechada de gerenciamento administrativo.
* **Nível de Risco:** Alto (fluxo de autenticação e validação no servidor).
* **Entregáveis:** Middleware de autenticação ativo, tabelas CRUD funcionando e processamento Zod das submissões.

---

## 9. Checklist Final de Produção

Utilize esta lista para auditoria final antes de oficializar o deploy do sistema:

- [ ] **Build:** Comando `npm run build` executa sem erros ou warnings críticos.
- [ ] **Banco de Dados:** Conexão MySQL ativa e migrações totalmente sincronizadas.
- [ ] **Segurança das Credenciais:** Senha `CreativeStudio@2026` não exposta em nenhum repositório git público (arquivo `.env` devidamente incluído no `.gitignore`).
- [ ] **Diagnóstico de Leads:** Formulário `/diagnostico` valida os campos, salva no banco e redireciona para `/obrigado`.
- [ ] **WhatsApp Link:** Clique no botão WhatsApp gera URL formatada com mensagem contendo o nome e empresa do lead.
- [ ] **Demos:** Todas as 6 rotas `/demo/*` abrem, operam sem erros no console e não persistem dados sensíveis no backend.
- [ ] **SEO:** Tags de Open Graph, metadados exclusivos por página, arquivo `sitemap.xml` gerado e estruturação Schema.org Organization ativa.
- [ ] **Acessibilidade:** Navegação completa por teclado ativa nas demos e formulários, contraste adequado e suporte a `prefers-reduced-motion`.
- [ ] **Performance:** Imagens comprimidas, Lighthouse com pontuação mínima de 90 em Performance em dispositivos móveis.
- [ ] **Hardening:** Validação Zod no Client e Server e proteção anti-força bruta no login do painel administrativo.
- [ ] **Rollback:** Script ou instrução rápida mapeada caso ocorram falhas de conexão de banco após subida de código.
