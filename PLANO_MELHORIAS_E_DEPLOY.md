# Plano de Implementação: Melhorias e Deploy Hostinger — Nangell Creative Studio

Este plano de implementação descreve as alterações necessárias no código-fonte e na infraestrutura do site **Nangell Creative Studio** para aplicar as melhorias de design, usabilidade, interatividade, acessibilidade, SEO e performance detalhadas no documento [Analise site.md](file:///e:/Creative%20Studio/creative%20studio/creativesite/Analise%20site.md), bem como as diretrizes operacionais para o deploy seguro e sem erros no servidor **Hostinger Business Web Hosting**.

---

## 1. Visão Geral do Estado Atual
O site possui uma base moderna construída em **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS 4** e **Prisma ORM**. Diversos componentes base e lógicas já estão implementados (incluindo 6 demonstrações interativas rodando no frontend e testes unitários com Vitest).

As melhorias propostas consistem em refinar interações nas demos (Kanban comercial e BI), otimizar performance (compressão de logos grandes), adicionar timelines e fluxogramas visuais, aprimorar a acessibilidade (aria-labels, foco de teclado, animações acessíveis de FAQ) e garantir a validação de formulários como a calculadora.

---

## 2. Requisitos Críticos de Deploy na Hostinger
Como o site é hospedado na Hostinger sob um plano de **Node.js Web App** (SSR com API Routes), existem requisitos específicos para garantir o funcionamento correto do banco de dados e rotas:

1. **Versão do Node.js:** O hPanel deve ser configurado com **Node.js 20 LTS** (mínimo exigido pelas especificações do `package.json`).
2. **Variáveis de Ambiente:** Devem ser cadastradas diretamente no hPanel (**Node.js Web App → Environment Variables**), nunca commitadas no GitHub:
   - `NODE_ENV=production`
   - `DATABASE_URL` (Conexão MySQL)
   - `NEXT_PUBLIC_SITE_URL` (URL pública com HTTPS, ex: `https://nangellcreativestudio.online`)
   - `ADMIN_SESSION_SECRET` (Mínimo de 32 caracteres aleatórios para segurança de cookies httpOnly do painel)
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` (Somente dígitos com DDI)
3. **Escapamento do Banco de Dados (DATABASE_URL):** A Hostinger utiliza MySQL 8. Caracteres especiais na senha do usuário MySQL devem ser codificados em formato URL (exemplo: `@` → `%40`).
   ```txt
   mysql://usuario:senha_codificada@localhost:3306/nome_do_banco?charset=utf8mb4
   ```
4. **Importação do Schema MySQL:** O banco de dados deve ser criado no hPanel e a estrutura de tabelas importada usando o arquivo `database/schema.sql` via phpMyAdmin ou executando as migrações remotamente:
   ```bash
   DATABASE_URL="mysql://..." npx prisma migrate deploy
   ```
5. **Carga de Dados (Seed):** Executar o seed inicial localmente direcionando ao banco da Hostinger para popular serviços, posts do blog e o usuário administrador inicial:
   ```bash
   DATABASE_URL="mysql://..." npm run db:seed
   ```
6. **Mecanismo de Startup:** A Hostinger gerencia as portas automaticamente via variável de ambiente `PORT`. O comando de start no painel deve ser configurado como `npm start`, o qual executa `next start -H 0.0.0.0` (o Next.js lê a porta injetada automaticamente). Não é necessário arquivo `.htaccess` manual.

---

## 3. User Review Required

Documentamos abaixo as decisões de design e otimização que requerem validação ou fornecimento de assets:

> [!IMPORTANT]
> **Otimização Crítica de Assets (Brand Logos):**
> Os arquivos em [brand/](file:///e:/Creative%20Studio/creative%20studio/creativesite/public/assets/brand) como `icon-gradient.png` e `logo-horizontal-dark.png` estão com tamanhos próximos a **900KB** cada. Propomos compactar esses arquivos e gerar versões em formato **WebP** e **SVG** (vetorizado), reduzindo o tamanho de cada asset para menos de **50KB**, o que reduzirá drasticamente o tempo de carregamento inicial e melhorará o índice LCP do Lighthouse.

> [!TIP]
> **Substituição de Mockups Placeholder:**
> Atualmente, a pasta [mockups/](file:///e:/Creative%20Studio/creative%20studio/creativesite/public/assets/mockups) está vazia, o que ativa o fallback automático "Mockup em preparação" em cases de portfólio e posts de blog. Propomos criar e incluir imagens explicativas reais ou mocks visuais (resolução recomendada: 640x360 em formato WebP) para substituir esses placeholders.

---

## 4. Open Questions

> [!IMPORTANT]
> **Questão 1:** O cliente prefere que utilizemos imagens vetoriais abstratas/tecnológicas para os posts do blog e cases de portfólio, ou serão fornecidas capturas de tela reais de dashboards/sistemas desenvolvidos previamente pela marca?
>
> **Questão 2:** A estimativa média de tempo no FAQ do processo (ex. 6 a 12 semanas para MVPs) deve ser parametrizada de forma dinâmica no banco de dados ou mantida como conteúdo estático revisado no arquivo de tradução/dados?

---

## 5. Proposed Changes

Para aplicar as melhorias propostas mantendo a robustez e integridade da aplicação, as alterações serão estruturadas em módulos lógicos descritos a seguir:

---

### Módulo A: Otimização de Assets e Performance

Otimização de imagens da marca para web e provisão de mockups para mitigar alertas de carregamento lento.

#### [MODIFY] [public/assets/brand/](file:///e:/Creative%20Studio/creative%20studio/creativesite/public/assets/brand)
- Compactar os arquivos de imagem de branding (`.png`) e exportá-los em formato `.webp` com compressão de 80% ou formato `.svg` sempre que possível.

#### [NEW] [public/assets/mockups/](file:///e:/Creative%20Studio/creative%20studio/creativesite/public/assets/mockups)
- Adicionar imagens de mockup otimizadas em formato `.webp` (ex.: `crm-inteligente.webp`, `dashboard-bi.webp`, `post-demo.webp`, `post-architecture.webp`, `post-diagnostico.webp`) correspondentes aos caminhos utilizados nos arquivos de fallback do blog e portfólio.

---

### Módulo B: Demos Interativas (CRM & BI)

Melhorar as demos para que sejam funcionais de forma simulada no frontend completo ao mudar de abas na barra lateral, e adicionar loader de inicialização.

#### [MODIFY] [crm-demo.tsx](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/components/demos/crm/crm-demo.tsx)
- Implementar a renderização condicional baseada no estado `activeNav`:
  - **Pipeline (padrão):** Renderiza o funil Kanban com colunas e cards arrastáveis.
  - **Dashboard:** Renderiza cartões de performance comercial detalhados, uma visualização simplificada de gráficos de pizza ou barras com KPIs da simulação.
  - **Relatórios:** Exibe uma listagem tabulada de contatos simulados com opções de filtro e um botão para exportação fictícia em formato CSV.
- Adicionar estados de feedback e loader skeleton ao realizar ações como arrastar cards ou disparar propostas comerciais.

#### [MODIFY] [bi-demo.tsx](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/components/demos/dashboard-bi/bi-demo.tsx)
- Implementar a renderização condicional baseada no estado `activeNav`:
  - **Overview:** Exibe cartões de KPIs macro (Receita, Margem, Clientes, Ticket) e gráficos de faturamento (Receita vs Meta, Mix por categoria).
  - **Sales:** Exibe o ranking de clientes, dados transacionais detalhados e o gráfico de faturamento operacional (Receita vs Custo).
  - **Alerts:** Renderiza a lista estruturada de alertas inteligentes gerados pela simulação.

#### [MODIFY] [demo-shell.tsx](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/components/demos/demo-shell.tsx)
- Incluir uma nota de rodapé estilizada ou um banner no topo informando explicitamente: *"Ambiente de simulação com dados fictícios para fins de demonstração técnica."*
- Adicionar suporte a transições de loading ao alternar de aba ou redefinir filtros da demonstração.

---

### Módulo C: Formulários & Calculadora de Oportunidades

Adicionar placeholders, botões de reset e validações de input à calculadora de economia.

#### [MODIFY] [opportunity-calculator.tsx](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/_components/solutions/opportunity-calculator.tsx)
- Adicionar atributos `placeholder` inteligentes em todos os campos numéricos.
- Implementar lógica de validação nos eventos `onChange`:
  - Horas por semana: deve estar entre 1 e 168.
  - Custo por hora: deve estar entre 1 e 10.000.
  - Pessoas envolvidas: deve estar entre 1 e 1.000.
  - Exibir avisos de erro em cor vermelha e desabilitar cálculos caso os dados sejam inválidos.
- Adicionar um botão **"Resetar parâmetros"** que redefina os estados da calculadora para as configurações padrão (`hoursPerWeek: 12`, `hourlyCost: 45`, `people: 2`).

---

### Módulo D: Página de Metodologia e Processo

Melhorar o design do fluxo do processo, duração de etapas e acessibilidade no FAQ.

#### [MODIFY] [processo.ts](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/data/institutional/processo.ts)
- Adicionar campo `duration` (ex.: `duration: "1 a 2 semanas"`) e links internos sugeridos (`caseSlug?: string`, `blogSlug?: string`) em cada objeto de etapa.

#### [MODIFY] [process-step-card.tsx](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/_components/institutional/process-step-card.tsx)
- Renderizar a propriedade de duração estimada ao lado do título ou como uma Badge informativa.
- Renderizar links contextuais ao final do card de processo que apontem para estudos de caso ou artigos relacionados ao tema (exemplo: na etapa de "Prototipação", linkar para o post sobre design/protótipo).

#### [MODIFY] [processo-page-content.tsx](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/_components/institutional/processo-page-content.tsx)
- Adicionar um componente de fluxo gráfico estilizado (infográfico minimalista utilizando linhas SVG dinâmicas ou conectores CSS) que demonstre visualmente a transição sequencial entre as 6 etapas.

#### [MODIFY] [faq-accordion.tsx](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/_components/institutional/faq-accordion.tsx)
- Substituir a estrutura pura de `<details>`/`<summary>` por um controle de estado local do React.
- Utilizar `framer-motion` (através de `AnimatePresence` e `motion.div`) para animar suavemente a abertura e o fechamento do painel de resposta.
- Adicionar tags HTML e propriedades de acessibilidade completas: `aria-expanded`, `aria-controls`, `role="button"`, `tabIndex={0}` no elemento clicável e manipulador de eventos de teclado `onKeyDown` para suporte a Enter/Espaço.

---

### Módulo E: Página Sobre (Timeline & Equipe)

Otimizar visualmente o manifesto e a história, adicionando timeline e seção de equipe.

#### [MODIFY] [sobre.ts](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/data/institutional/sobre.ts)
- Adicionar um array estático de dados da equipe contendo nome, cargo, foto (avatar) e breve especialidade dos fundadores/membros principais.

#### [MODIFY] [sobre-page-content.tsx](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/_components/institutional/sobre-page-content.tsx)
- Substituir a visualização simples de cartões de marcos históricos (`milestones`) por um componente de **Timeline Gráfica Vertical** estilizado com uma linha conectora central em gradiente e marcadores circulares ativos.
- Criar uma seção **"Nossa Equipe"** na parte inferior da página, renderizando os cartões de perfil dos profissionais com design moderno.

---

### Módulo F: Blog e SEO

#### [MODIFY] [blog-page-content.tsx](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/_components/blog/blog-page-content.tsx)
- Adicionar controles simples de paginação na parte inferior do grid de posts caso o volume de posts ultrapasse 6 unidades.

#### [MODIFY] [fallback-posts.ts](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/data/blog/fallback-posts.ts)
- Revisar a estrutura dos conteúdos Markdown para incluir subtítulos `## H2` e `### H3` contendo palavras-chave e configurar meta-descrições amigáveis a motores de busca.

---

### Módulo G: Ajustes Globais, Contraste e Acessibilidade

#### [MODIFY] [globals.css](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/globals.css)
- Revisar e ajustar a taxa de contraste das cores do design system (como textos em ciano ou azul claro) quando aplicados sob fundos com gradientes roxos e azuis escuros para atender à diretriz WCAG 2.2 AA.
- Assegurar a classe de estilo para estados de foco (`:focus-visible`) em todos os elementos interativos como botões de demos e links de navegação.

---

## 6. Verification Plan

Após a criação do plano e aprovação do usuário, a validação das melhorias ocorrerá de acordo com as etapas descritas a seguir:

### Automated Tests
Para garantir que as novas interações de estado e validações não quebrem as lógicas e utilitários existentes:
- Executar os testes unitários da aplicação:
  ```bash
  npm test
  ```
- Executar linting estático para verificar conformidade sintática e de tipos:
  ```bash
  npm run lint
  ```
- Validar a compilação de produção local antes do deploy na Hostinger:
  ```bash
  npm run build
  ```

### Manual Verification
1. **Otimização de Assets:** Analisar a aba Network do DevTools do navegador para confirmar que os logos de branding ocupam menos de 50KB e carregam sob o formato ideal WebP/SVG.
2. **Demos Interativas:**
   - Acessar `/demo/crm-inteligente`, alternar entre as abas da barra lateral (Pipeline, Dashboard, Relatórios) e testar a funcionalidade de arrastar leads.
   - Acessar `/demo/dashboard-bi` e alternar as abas confirmando que os gráficos mudam de layout adequadamente.
3. **Calculadora:** Digitar valores como `-5` ou `99999` nos campos da calculadora em `/solucoes` e confirmar que as mensagens de erro são mostradas e o cálculo é interrompido. Clicar em "Resetar" e validar o retorno para o estado padrão.
4. **FAQ Accordion:** Testar a expansão das perguntas frequentes em `/processo` utilizando apenas o teclado (Tab + Espaço/Enter) e confirmar a transição suave de abertura.
5. **Timeline e Equipe:** Acessar `/sobre` e verificar a responsividade em telas mobile da linha do tempo e seção de time.
6. **Deploy Hostinger:** Testar o endpoint `/api/health` em produção e validar que as páginas consultam dados estáticos de fallback quando não houver conexão com o banco MySQL ou quando a rota estiver sob carregamento inicial.
