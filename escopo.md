Escopo completo — Site da Nangell Creative Studio
1. Direção estratégica do projeto

O site da Nangell Creative Studio não deve ser apenas um site institucional. Ele deve funcionar como o maior case da própria empresa: uma vitrine técnica, comercial e interativa que prova, na prática, a capacidade de criar sistemas web, desktop, mobile, automações, dashboards e plataformas sob medida.

A pesquisa de mercado mostra que agências digitais de alto nível não se posicionam apenas como “desenvolvedoras de sites”, mas como parceiras de estratégia, design, tecnologia e impacto de negócio. A Work & Co, por exemplo, se apresenta como agência de produtos digitais focada em estratégia, design e desenvolvimento de plataformas; a Monks se posiciona unindo conteúdo, dados, mídia, tecnologia, IA e experiências digitais.

A Nangell deve se posicionar como:

Um estúdio de engenharia criativa que transforma ideias, processos e negócios em softwares sob medida, bonitos, escaláveis e orientados a resultado.

O diferencial central será o conceito de “show, don’t tell”: em vez de apenas mostrar prints de sistemas, o visitante poderá experimentar sistemas simulados dentro do próprio site, com dados fictícios, em rotas próprias como /demo/crm-inteligente, /demo/dashboard-bi, /demo/gestao-os, /demo/plataforma-educacional e outras.

2. Posicionamento de marca
2.1. Personalidade da marca

A Nangell Creative Studio deve transmitir:

Tecnologia premium, com visual escuro, gradientes azul/roxo da logo, efeitos sutis, animações fluidas e sensação de produto SaaS moderno.

Confiança empresarial, deixando claro que a empresa não faz apenas telas bonitas, mas sistemas com arquitetura, segurança, organização, rastreamento, documentação e visão de crescimento.

Criatividade técnica, unindo design, automação, dados, IA, integrações, dashboards e desenvolvimento sob demanda.

Prova tangível, permitindo que o cliente use demonstrações interativas antes mesmo de entrar em contato.

2.2. Mensagem principal

Sugestão de headline para a Home:

Sistemas sob medida que transformam operação em crescimento.

Subheadline:

Desenvolvemos softwares web, desktop e mobile, automações, dashboards e plataformas digitais com design premium, performance e estratégia de negócio desde a primeira linha de código.

CTAs principais:

Ver sistemas em ação
Solicitar diagnóstico do meu projeto
2.3. Paleta visual baseada na logo

A logo anexada trabalha muito bem com uma identidade dark tech premium. A paleta recomendada:

Azul ciano principal: #00C2FC
Azul tecnológico: #058FF7
Azul elétrico: #3061FA
Roxo/violeta: #6139FA
Fundo dark principal: #05070D
Fundo secundário: #0B0F1A
Texto branco: #F8FAFC
Texto cinza sofisticado: #94A3B8
Bordas translúcidas: rgba(255,255,255,0.10)

A identidade deve evitar visual “template comum”. O ideal é um layout com aparência de produto digital premium: cards glassmorphism, sombras suaves, gradientes radiais, linhas finas, grid técnico, partículas discretas e microinterações.

3. Arquitetura geral do site
3.1. Rotas públicas
/
Home principal

/solucoes
Visão geral dos serviços

/solucoes/desenvolvimento-web
Sistemas web, SaaS, portais, plataformas

/solucoes/apps-mobile
Apps mobile, PWA, interfaces responsivas

/solucoes/sistemas-desktop
Aplicações desktop, automações locais, integrações com arquivos e ERPs

/solucoes/automacoes
Scripts, robôs, integrações, redução de tarefas manuais

/solucoes/dashboards-bi
Dashboards, data storytelling, indicadores e inteligência de dados

/solucoes/sites-landing-pages
Sites institucionais, landing pages e páginas de conversão

/portfolio
Lista de projetos e demonstrações interativas

/cases/[slug]
Página detalhada de cada case

/demo/[slug]
Ambiente interativo simulando o sistema

/processo
Metodologia de trabalho da Nangell

/sobre
História, visão, diferenciais e cultura técnica

/diagnostico
Formulário multi-etapas para captação de briefing

/contato
Contato direto, WhatsApp, e-mail e formulário rápido

/blog
Conteúdos estratégicos sobre tecnologia, automação, dados e negócios

/blog/[slug]
Artigo individual

/obrigado
Página pós-envio de formulário

/politica-de-privacidade
Política LGPD

/termos-de-uso
Termos de uso do site e das demos
3.2. Rotas administrativas
/admin/login
Login administrativo

/admin
Dashboard interno

/admin/leads
Lista de leads recebidos

/admin/projetos
Cadastro e edição de projetos/cases

/admin/servicos
Cadastro e edição de serviços

/admin/depoimentos
Cadastro de depoimentos

/admin/blog
Cadastro de artigos

/admin/configuracoes
Configurações gerais do site
4. Stack tecnológica recomendada

A stack principal deve ser:

Next.js + TypeScript, usando App Router, Server Components, rotas dinâmicas, SSR/SSG e API Routes/Server Actions.
Tailwind CSS, para design system consistente, responsivo e rápido de manter.
Radix UI ou shadcn/ui, para componentes acessíveis e personalizáveis.
Motion/Framer Motion, para microinterações, transições e animações de interface.
GSAP + ScrollTrigger, para animações avançadas de scroll, hero imersivo e efeitos premium.
PostgreSQL + Prisma, para leads, projetos, serviços, posts e configurações.
React Hook Form + Zod, para formulários performáticos e validação forte.
Vercel, para deploy inicial rápido, preview por branch e excelente integração com Next.js.
Cloudflare, opcional, para DNS, proteção, cache e regras de segurança.

Essa recomendação é compatível com o estado atual do ecossistema: Next.js é um framework React com recursos modernos de server/client rendering; Tailwind é utility-first e facilita responsividade; Radix fornece primitives acessíveis e sem estilo imposto; Motion é uma biblioteca de animação para React/JS; GSAP/ScrollTrigger é indicado para animações avançadas baseadas em scroll.

Para SEO e performance, o site deve evitar depender apenas de renderização client-side. O Google mantém documentação específica para JavaScript SEO e considera dynamic rendering apenas um workaround, não a solução preferencial para novos projetos. Por isso, páginas comerciais, serviços, cases e blog devem ser renderizados via SSR/SSG sempre que possível.

5. Design system
5.1. Estilo visual

O layout deve ser predominantemente dark mode, com opção futura de light mode. A Home deve abrir com fundo escuro, glow azul/roxo e elementos tecnológicos discretos.

Elementos visuais recomendados:

Fundo com grid técnico sutil.
Gradientes radiais em azul/roxo.
Cards com glassmorphism.
Botões com borda luminosa.
Microinterações em hover.
Efeito “spotlight” seguindo o mouse em cards.
Scroll progress no topo.
Transições suaves entre páginas.
Ícones lineares modernos.
Tipografia forte, limpa e tecnológica.
Mockups de sistemas em janelas de navegador estilizadas.
5.2. Tipografia

Sugestão:

Títulos: Sora, Space Grotesk ou Manrope.
Corpo: Inter ou Geist Sans.
Código/tecnologia: JetBrains Mono.
5.3. Componentes globais

O site deve possuir:

Header fixo com efeito blur.
Menu desktop.
Menu mobile fullscreen.
Botão flutuante de WhatsApp.
Botão “Agendar diagnóstico”.
Footer completo.
Cards de serviço.
Cards de case.
Cards de tecnologia.
Badge de stack.
Modal de vídeo/demo.
Componente de terminal animado.
Componente de janela de navegador.
Componente de dashboard mockado.
Componente de depoimento.
Componente de FAQ.
Formulário multi-etapas.
Toasts de sucesso/erro.
Skeleton loaders.
Estado vazio.
Estado de erro.
Banner LGPD/cookies.
6. Página Home

A Home deve ser a página mais forte do site.

6.1. Hero section

Conteúdo:

Logo da Nangell.
Headline forte.
Subheadline orientada a negócios.
CTA primário: Ver sistemas em ação.
CTA secundário: Solicitar diagnóstico.
Texto de confiança: “Softwares web, desktop e mobile sob medida para empresas que querem escalar com tecnologia.”
Background animado com partículas, grid ou shader leve.

Animações:

Entrada progressiva da headline.
Gradiente animado nos termos-chave.
Cards flutuantes simulando sistemas.
Mouse parallax leve.
Redução automática de animações quando prefers-reduced-motion estiver ativo.
6.2. Faixa de autoridade técnica

Uma faixa em marquee com tecnologias e competências:

React • Next.js • Python • Node.js • FastAPI • PostgreSQL • MySQL • Docker • APIs • Dashboards • IA • Automação • Web Apps • Mobile • Desktop • SaaS • CRM • BI • Integrações WhatsApp
6.3. Seção “O que construímos”

Cards principais:

Sistemas Web e SaaS
Portais, CRMs, ERPs, dashboards, plataformas educacionais e sistemas multiusuário.
Apps Mobile e PWA
Interfaces responsivas, aplicativos instaláveis, experiências mobile-first e integrações com APIs.
Sistemas Desktop
Aplicações locais, automações para Windows, integração com arquivos, planilhas, bancos locais e rotinas internas.
Automações Inteligentes
Scripts, robôs, web scraping autorizado, integrações, rotinas agendadas, processamento de documentos.
Dashboards e Dados
Painéis gerenciais, indicadores, relatórios, data storytelling e visualização de performance.
Sites e Landing Pages
Sites institucionais premium, páginas de venda, funis, rastreamento e otimização para conversão.
6.4. Seção “Experimente antes de contratar”

Essa seção deve apresentar o diferencial central:

Não mostramos apenas prints. Criamos experiências interativas para você testar como um sistema real funciona.

Cards de demos:

CRM inteligente.
Dashboard BI.
Plataforma educacional.
Gestão operacional.
Encurtador de links/QR Code.
Monitoramento em tempo real.

Cada card terá botão:

Abrir demo
Ver case
Solicitar algo parecido
6.5. Seção “Como trabalhamos”

Fluxo em 6 etapas:

Diagnóstico do problema.
Levantamento de requisitos.
Prototipação visual.
Desenvolvimento incremental.
Testes, segurança e performance.
Deploy, treinamento e evolução.
6.6. Seção “Por que escolher a Nangell”

Diferenciais:

Desenvolvimento sob medida.
Design premium.
Arquitetura pensada para crescimento.
Sistemas com rastreamento e métricas.
Demos interativas.
Integração com automações e IA.
Entrega orientada ao resultado do negócio.
Documentação e manutenção evolutiva.
6.7. CTA final

Texto:

Tem uma ideia, processo manual ou sistema travando seu crescimento?

Botões:

Quero transformar isso em software
Falar no WhatsApp
7. Página de Portfólio Interativo

A área de portfólio deve ser o principal diferencial do site. Nielsen Norman Group destaca que sites B2B precisam de provas de benefício, estudos de caso, CTAs fortes e caminhos claros de contato para converter visitantes em leads. Por isso, o portfólio da Nangell deve combinar case comercial, prova visual e experiência prática.

7.1. Filtros

Filtros por categoria:

Todos.
Sistemas Web.
SaaS.
Mobile.
Desktop.
Automações.
Dashboards.
Landing Pages.
IA e Dados.
Gestão Operacional.
Educação.

Filtros por stack:

React.
Next.js.
Python.
Node.js.
PostgreSQL.
MySQL.
Power BI.
APIs.
Docker.
WhatsApp.
IA.

Filtros por objetivo de negócio:

Vender mais.
Automatizar processos.
Controlar operação.
Reduzir custos.
Visualizar dados.
Criar produto digital.
Melhorar atendimento.
Captar leads.
7.2. Card de projeto

Cada card deve conter:

Nome do projeto.
Categoria.
Descrição curta.
Problema resolvido.
Stack principal.
Badge “Demo interativa” quando houver.
Imagem/mockup.
Métrica fictícia ou real autorizada.
Botões:
Ver case
Abrir demo
Quero algo parecido
7.3. Página individual do case

Campos:

Nome do projeto.
Segmento.
Tipo de solução.
Contexto do problema.
Desafio do cliente.
Solução criada.
Principais funcionalidades.
Stack utilizada.
Fluxo de telas.
Resultado obtido ou resultado simulado.
Prints/mockups.
Link da demo.
CTA contextual.

Estrutura:

Hero do case
Resumo do problema
O que foi desenvolvido
Funcionalidades principais
Arquitetura técnica
Galeria visual
Demo interativa
Resultados
CTA final
8. Demos interativas dentro do site

As demos devem usar dados 100% fictícios, sem dados reais de clientes. Devem ser suficientemente funcionais para o visitante sentir que está usando um sistema real.

Awwwards destaca experiências web interativas e 3D como referências importantes de inspiração visual; porém, no caso da Nangell, os efeitos devem servir à venda e à clareza, não apenas ao impacto visual.

8.1. Demo 1 — CRM Inteligente com funil de vendas

Rota:

/demo/crm-inteligente

Objetivo:

Mostrar domínio em sistemas comerciais, gestão de leads, funil, automação e dashboards.

Funcionalidades simuladas:

Dashboard com cards:
Leads recebidos.
Taxa de conversão.
Receita estimada.
Propostas enviadas.
Kanban de oportunidades:
Novo lead.
Em atendimento.
Proposta enviada.
Negociação.
Fechado.
Cadastro de lead fictício.
Filtros por status, origem e valor.
Simulação de envio de mensagem WhatsApp.
Timeline de interações.
Gráfico de conversão por canal.
Botão “Criar proposta”.
Botão “Automatizar follow-up”.

Campos mockados:

Nome do lead.
Empresa.
Telefone.
E-mail.
Origem.
Interesse.
Valor estimado.
Responsável.
Status.
Última interação.

CTA dentro da demo:

Gostaria de um CRM parecido para sua empresa?

Botão:

Solicitar orçamento para CRM
8.2. Demo 2 — Dashboard BI / Data Storytelling

Rota:

/demo/dashboard-bi

Objetivo:

Mostrar capacidade de transformar dados em decisão.

Funcionalidades simuladas:

Indicadores de faturamento.
Filtro por período.
Filtro por região.
Filtro por produto/serviço.
Gráfico de linha de crescimento.
Gráfico de barras por canal.
Ranking de clientes.
Mapa ou heatmap fictício.
Alertas inteligentes:
“Queda de 12% no canal orgânico.”
“A região Centro-Oeste cresceu 28%.”
Exportação simulada de relatório.
Alternância entre visão executiva e visão operacional.

Campos mockados:

Receita.
Ticket médio.
Novos clientes.
Churn.
Custo operacional.
Margem estimada.
Conversão por origem.

CTA:

Quero um painel para minha empresa
8.3. Demo 3 — Gestão de Ordens de Serviço / Produção

Rota:

/demo/gestao-os

Objetivo:

Mostrar domínio em sistemas operacionais complexos, filas, status, histórico e gestão de processos.

Funcionalidades simuladas:

Lista de ordens de serviço.
Busca por número, cliente, status e prazo.
Painel Kanban por andamento.
Timeline de cada OS.
Indicadores:
Em produção.
Atrasadas.
Aguardando aprovação.
Finalizadas.
Modal de detalhes da OS.
Registro de novo andamento.
Simulação de anexos.
Painel de produtividade por setor.
Notificações em tempo real simuladas.

Campos mockados:

Número da OS.
Cliente.
Serviço.
Status.
Responsável.
Setor atual.
Prazo.
Prioridade.
Histórico de andamentos.
Observações.

CTA:

Preciso organizar minha operação
8.4. Demo 4 — Plataforma Educacional / Área do Aluno

Rota:

/demo/plataforma-educacional

Objetivo:

Mostrar capacidade de criar ambientes educacionais, cursos, progressos e produtos digitais.

Funcionalidades simuladas:

Login fake por botão “Entrar como aluno demo”.
Dashboard do aluno.
Lista de cursos/módulos.
Progresso animado.
Player de aula fictício.
Materiais em PDF simulados.
Checklist de estudos.
Quiz interativo.
Geração simulada de mapa mental.
Certificado fictício.
Área administrativa resumida.

Campos mockados:

Nome do aluno.
Curso.
Módulo.
Aula.
Progresso.
Nota do quiz.
Material vinculado.

CTA:

Quero criar minha plataforma educacional
8.5. Demo 5 — SaaS de Encurtamento de Links e QR Code

Rota:

/demo/link-qr

Objetivo:

Mostrar domínio de produto SaaS simples, geração dinâmica, dashboard e experiência self-service.

Funcionalidades simuladas:

Campo para inserir URL.
Botão “Gerar link curto”.
Geração de link fictício.
Geração de QR Code.
Dashboard com cliques simulados.
Filtro por dispositivo.
Filtro por origem.
Botão copiar.
Histórico local da sessão.
Simulação de plano gratuito/premium.

Campos:

URL original.
Slug personalizado.
Título da campanha.
UTM source.
UTM medium.
UTM campaign.

CTA:

Quero desenvolver um SaaS
8.6. Demo 6 — Monitoramento em Tempo Real

Rota:

/demo/monitoramento-tempo-real

Objetivo:

Mostrar capacidade em automações, robôs, alertas, streaming de dados e sistemas em tempo real.

Funcionalidades simuladas:

Feed de mensagens em tempo real.
Filtros por palavra-chave.
Alertas automáticos.
Gráfico de volume por minuto.
Classificação por sentimento fictícia.
Cards de eventos críticos.
Botão “Criar alerta”.
Simulação de integração Telegram/WhatsApp/e-mail.

Campos mockados:

Canal.
Mensagem.
Horário.
Palavra-chave.
Severidade.
Status do alerta.

CTA:

Quero monitorar dados automaticamente
9. Página Soluções

A página /solucoes deve apresentar todos os serviços com linguagem orientada ao cliente.

Cada serviço deve responder:

Que problema resolve?
Para quem é indicado?
O que a Nangell entrega?
Quais tecnologias podem ser usadas?
Quais resultados o cliente pode esperar?
Qual é o próximo passo?
Serviços principais
Desenvolvimento de Sistemas Web

Para empresas que precisam sair de planilhas, sistemas improvisados ou processos manuais.

Entregas:

Sistemas administrativos.
CRMs.
ERPs personalizados.
Portais de cliente.
Áreas logadas.
Dashboards.
SaaS.
Sistemas multiusuário.
APIs.
Integrações externas.
Aplicativos Mobile e PWA

Para negócios que precisam entregar experiência mobile, app de campo, app para cliente ou ferramenta interna.

Entregas:

Apps responsivos.
PWA instalável.
Interfaces mobile-first.
Integração com câmera, arquivos, notificações e APIs.
Painel administrativo web.
Sistemas Desktop

Para empresas que precisam de aplicações locais, integração com Windows, arquivos, bancos legados ou rotinas internas.

Entregas:

Aplicações desktop.
Leitura/processamento de arquivos.
Integração com planilhas.
Automação de tarefas repetitivas.
Rotinas agendadas.
Ferramentas internas sob medida.
Automações e Robôs

Para reduzir trabalho manual e erros operacionais.

Entregas:

Scripts Python.
Integrações API.
Processamento de PDFs/planilhas.
Web scraping quando permitido.
Robôs de monitoramento.
Envio automático de relatórios.
Integrações com WhatsApp, e-mail e sistemas internos.
Dashboards e BI

Para empresas que precisam enxergar dados de forma clara.

Entregas:

Dashboards executivos.
Painéis operacionais.
Indicadores por setor.
Data storytelling.
Consolidação de fontes.
Relatórios automáticos.
Alertas baseados em métricas.
Sites Premium e Landing Pages

Para empresas que precisam vender, captar leads e transmitir autoridade.

Entregas:

Sites institucionais.
Landing pages de conversão.
Páginas de lançamento.
SEO técnico.
Tracking com GTM/GA4.
Pixel Meta/Google.
Integração com CRM.
10. Página Processo

A página /processo deve mostrar que a Nangell trabalha com método.

Etapas
Diagnóstico
Entendimento do problema.
Objetivo de negócio.
Público.
Restrições técnicas.
Prioridades.
Mapeamento
Fluxos atuais.
Regras de negócio.
Usuários.
Permissões.
Dados.
Integrações.
Prototipação
Wireframes.
Jornada do usuário.
UI inicial.
Aprovação visual.
Desenvolvimento
Backend.
Frontend.
Banco de dados.
APIs.
Autenticação.
Componentes.
Testes
Testes funcionais.
Testes responsivos.
Testes de performance.
Testes de segurança.
Testes de acessibilidade.
Deploy
Ambiente de produção.
Domínio.
SSL.
Monitoramento.
Backup.
Treinamento e evolução
Manual.
Treinamento.
Ajustes.
Suporte.
Manutenção evolutiva.
11. Página Sobre

A página /sobre deve humanizar a empresa sem perder sofisticação.

Conteúdo sugerido:

A Nangell Creative Studio nasceu para unir criatividade, engenharia de software e visão de negócio. Desenvolvemos sistemas sob medida para empresas que precisam de soluções reais — não templates genéricos.

Blocos:

Origem da empresa.
Missão.
Visão.
Valores.
Diferenciais.
Forma de trabalho.
Compromisso com qualidade.
Stack dominada.
CTA para diagnóstico.

Valores:

Clareza.
Performance.
Segurança.
Criatividade.
Responsabilidade técnica.
Foco em resultado.
Evolução contínua.
12. Formulário de diagnóstico

A captação de leads deve ser feita por um formulário multi-etapas, estilo Typeform, mas nativo no site.

Etapa 1 — Identificação

Campos:

Nome completo.
E-mail.
WhatsApp.
Nome da empresa.
Site ou Instagram da empresa.
Etapa 2 — Tipo de projeto

Campo: “O que você precisa desenvolver?”

Opções:

Sistema web.
Aplicativo mobile.
Sistema desktop.
Automação.
Dashboard/BI.
Site institucional.
Landing page.
SaaS.
CRM.
Plataforma educacional.
Ainda não sei exatamente.
Etapa 3 — Desafio atual

Campo texto:

“Descreva o problema que você quer resolver.”

Dropdown complementar:

Processo manual.
Falta de controle.
Sistema antigo.
Baixa conversão.
Falta de dados.
Atendimento desorganizado.
Quero lançar um produto digital.
Outro.
Etapa 4 — Momento do projeto

Campos:

O projeto é uma ideia, melhoria ou sistema já existente?
Existe urgência?
Prazo desejado.
Já possui orçamento aprovado?
Etapa 5 — Faixa de investimento

Opções:

Até R$ 2.000.
R$ 2.000 a R$ 5.000.
R$ 5.000 a R$ 10.000.
R$ 10.000 a R$ 25.000.
Acima de R$ 25.000.
Ainda não sei.
Etapa 6 — Finalização

Campos:

Melhor horário para contato.
Preferência de contato:
WhatsApp.
E-mail.
Reunião online.
Aceite da política de privacidade.
Botão: Enviar diagnóstico

Após envio:

Salvar lead no banco.
Enviar e-mail para a Nangell.
Redirecionar para /obrigado.
Disparar evento de conversão.
Exibir botão direto para WhatsApp.

A LGPD se aplica ao tratamento de dados pessoais em meios digitais por pessoas físicas ou jurídicas, então o formulário deve ter consentimento claro, política de privacidade e finalidade explícita de contato comercial.

13. Área administrativa

A área admin permitirá atualizar o site sem alterar código.

13.1. Login

Campos:

E-mail.
Senha.
Lembrar acesso.
Recuperar senha.

Funcionalidades:

Autenticação segura.
Proteção de rotas.
Logout.
Controle de sessão.
13.2. Dashboard admin

Indicadores:

Leads recebidos.
Leads da semana.
Projetos publicados.
Demos ativas.
Artigos publicados.
Taxa de conversão dos formulários.
Demos mais acessadas.
13.3. Gestão de leads

Campos:

Nome.
E-mail.
WhatsApp.
Empresa.
Tipo de projeto.
Orçamento.
Urgência.
Origem.
UTM source.
UTM medium.
UTM campaign.
Demo visitada antes do envio.
Status:
Novo.
Em contato.
Reunião marcada.
Proposta enviada.
Fechado.
Perdido.
Observações internas.

Funcionalidades:

Filtrar por status.
Buscar por nome/empresa.
Alterar status.
Adicionar observação.
Exportar CSV.
Abrir WhatsApp com mensagem pré-preenchida.
Ver histórico de páginas visitadas quando disponível.
13.4. Gestão de projetos/cases

Campos:

Título.
Slug.
Categoria.
Descrição curta.
Descrição completa.
Problema.
Solução.
Funcionalidades.
Stack.
Imagem de capa.
Galeria.
Métricas.
Tipo de demo:
Sem demo.
Demo nativa.
Iframe interno.
Link externo.
Rota da demo.
Status:
Rascunho.
Publicado.
Oculto.
SEO title.
SEO description.
Ordem de exibição.
13.5. Gestão de serviços

Campos:

Nome.
Slug.
Headline.
Problema que resolve.
Descrição.
Entregas.
Tecnologias.
Público ideal.
CTA.
SEO title.
SEO description.
13.6. Gestão de blog

Campos:

Título.
Slug.
Categoria.
Tags.
Resumo.
Conteúdo em editor Markdown/MDX.
Imagem de capa.
Autor.
Status.
SEO title.
SEO description.
14. SEO e arquitetura de conversão

O site deve nascer pronto para SEO técnico, rastreamento e campanhas.

14.1. SEO técnico

Implementar:

Metadados por página.
Open Graph.
Twitter Cards.
Sitemap.xml.
Robots.txt.
URLs amigáveis.
Schema.org Organization.
Schema.org SoftwareApplication nos cases/demos quando fizer sentido.
Breadcrumbs.
Canonical URLs.
Páginas renderizadas no servidor sempre que possível.
Blog com artigos otimizados.

Google possui documentação para dados estruturados de organização, e Schema.org possui tipo específico para SoftwareApplication, o que permite estruturar melhor as informações sobre a empresa e seus produtos/demonstrações.

14.2. Palavras-chave estratégicas

Páginas devem ser pensadas para termos como:

Desenvolvimento de sistemas sob medida.
Software house em Brasília.
Desenvolvimento web em Brasília.
Criação de SaaS.
Desenvolvimento de aplicativo sob medida.
Automação Python para empresas.
Dashboard empresarial.
Sistema web personalizado.
CRM personalizado.
Plataforma educacional personalizada.
Landing page de alta conversão.
Desenvolvimento de software para pequenas empresas.
14.3. Eventos de analytics

Implementar Google Tag Manager e GA4 com eventos:

click_cta_hero
click_whatsapp
open_demo
finish_demo_interaction
submit_diagnostico
submit_contato
view_case
click_case_cta
filter_portfolio
download_material
copy_demo_link

O Google Tag Manager possui recursos de acionadores para submissão de formulário, o que permite estruturar eventos de conversão sem depender de alterações manuais em todas as páginas.

15. Performance, acessibilidade e qualidade

O site deve buscar excelência técnica. Core Web Vitals medem carregamento, interatividade e estabilidade visual; os limites considerados bons são LCP até 2,5s, INP até 200ms e CLS até 0,1 no percentil 75.

Critérios mínimos:

Lighthouse Performance acima de 90.
Acessibilidade acima de 95.
SEO acima de 95.
Best Practices acima de 95.
Imagens otimizadas.
Lazy loading.
Code splitting.
Fontes otimizadas.
Animações com fallback.
Sem layout shift relevante.
Mobile-first.
Teste em Chrome, Edge, Firefox e Safari.
Teste em desktop, tablet e celular.

Acessibilidade:

Seguir WCAG 2.2 AA.
Contraste adequado.
Navegação por teclado.
Foco visível.
Labels em formulários.
aria-* quando necessário.
Respeitar prefers-reduced-motion.
Componentes acessíveis via Radix/shadcn.

WCAG 2.2 é a recomendação do W3C para tornar conteúdo web mais acessível, cobrindo uma ampla gama de critérios para pessoas com diferentes necessidades.

16. Segurança e privacidade

Implementar:

HTTPS obrigatório.
Proteção de rotas admin.
Hash seguro de senhas.
Rate limit nos formulários.
Validação com Zod no client e no server.
Sanitização de inputs.
Proteção contra spam.
CAPTCHA discreto se necessário.
Logs de erro.
Política de privacidade.
Termos de uso.
Consentimento para contato.
Não armazenar dados sensíveis desnecessários.
Backups do banco.
Variáveis de ambiente seguras.
17. Banco de dados sugerido

Tabelas principais:

users
- id
- name
- email
- password_hash
- role
- created_at
- updated_at

leads
- id
- name
- email
- phone
- company
- website
- project_type
- challenge
- budget_range
- urgency
- preferred_contact
- message
- source_page
- source_demo
- utm_source
- utm_medium
- utm_campaign
- consent
- status
- internal_notes
- created_at
- updated_at

projects
- id
- title
- slug
- category
- short_description
- full_description
- problem
- solution
- features
- stack
- cover_image
- gallery
- metrics
- demo_type
- demo_route
- is_featured
- status
- seo_title
- seo_description
- sort_order
- created_at
- updated_at

services
- id
- title
- slug
- headline
- description
- problem_solved
- deliverables
- technologies
- target_audience
- cta_label
- seo_title
- seo_description
- status
- created_at
- updated_at

testimonials
- id
- client_name
- client_role
- company
- content
- rating
- image
- status
- created_at

posts
- id
- title
- slug
- excerpt
- content
- cover_image
- category
- tags
- author
- status
- seo_title
- seo_description
- published_at
- created_at
- updated_at

site_settings
- id
- key
- value
- updated_at

analytics_events
- id
- event_name
- page
- demo_slug
- lead_id
- metadata
- created_at
18. Roadmap de implementação
Fase 1 — Fundação do projeto

Entregas:

Criar projeto Next.js + TypeScript.
Configurar Tailwind.
Configurar ESLint/Prettier.
Criar tema visual da Nangell.
Configurar fontes.
Criar tokens de cor.
Criar layout base.
Criar header, footer e menu mobile.
Configurar rotas principais.
Configurar SEO base.
Configurar deploy inicial na Vercel.
Fase 2 — Home premium

Entregas:

Hero animado.
CTAs.
Marquee de tecnologias.
Cards de serviços.
Seção de demos.
Seção de processo.
Seção de diferenciais.
CTA final.
Responsividade completa.
Animações com Motion/GSAP.
Fase 3 — Páginas institucionais

Entregas:

/solucoes
Páginas individuais de serviço.
/processo
/sobre
/contato
/politica-de-privacidade
/termos-de-uso
Fase 4 — Portfólio e cases

Entregas:

Página /portfolio.
Filtros.
Cards de projeto.
Página /cases/[slug].
Estrutura dinâmica via banco ou arquivo seed.
Galeria.
CTAs contextuais.
Fase 5 — Demos interativas

Entregas:

/demo/crm-inteligente
/demo/dashboard-bi
/demo/gestao-os
/demo/plataforma-educacional
/demo/link-qr
/demo/monitoramento-tempo-real

Cada demo deve ter:

Layout próprio.
Dados mockados.
Interações reais no frontend.
Estado local.
Botão de CTA.
Evento de analytics.
Fase 6 — Formulário de diagnóstico e leads

Entregas:

Formulário multi-etapas.
Validação.
Salvamento no banco.
E-mail de notificação.
Página /obrigado.
Integração com WhatsApp.
Eventos GTM/GA4.
Proteção antispam.
Fase 7 — Admin

Entregas:

Login.
Dashboard.
CRUD de projetos.
CRUD de serviços.
CRUD de blog.
Gestão de leads.
Gestão de depoimentos.
Configurações gerais.
Fase 8 — Blog e conteúdo

Entregas:

Página /blog.
Página /blog/[slug].
Categorias.
Tags.
Artigos iniciais:
“Quando vale a pena criar um sistema sob medida?”
“Como automações reduzem custos operacionais.”
“O que um CRM personalizado pode fazer por uma pequena empresa.”
“Dashboard bonito não basta: dados precisam contar uma história.”
“SaaS sob medida: da ideia ao MVP.”
Fase 9 — SEO, tracking e otimização

Entregas:

Sitemap.
Robots.
Schema.org.
Open Graph.
GTM.
GA4.
Eventos de conversão.
Testes de Core Web Vitals.
Otimização de imagens.
Otimização de bundle.
Auditoria mobile.
Fase 10 — QA e produção

Entregas:

Testes funcionais.
Testes responsivos.
Testes de formulário.
Testes de admin.
Testes das demos.
Testes de segurança.
Revisão de conteúdo.
Deploy final.
Checklist de produção.
Documentação do projeto.
19. Critérios de aceite

O projeto só deve ser considerado pronto quando:

Todas as rotas públicas estiverem funcionando.
Todas as páginas forem responsivas.
A Home tiver impacto visual premium.
O portfólio permitir filtrar projetos.
As demos funcionarem com dados mockados.
O formulário salvar leads corretamente.
O admin permitir gerenciar conteúdo.
O WhatsApp abrir com mensagem pré-preenchida.
O SEO técnico estiver implementado.
GTM/GA4 estiverem configurados.
A política de privacidade estiver publicada.
O site passar em auditoria de performance e acessibilidade.
Não houver erro visual em mobile.
Não houver dados reais expostos nas demos.
Todas as imagens estiverem otimizadas.
O deploy em produção estiver documentado.
20. Diferenciais extras recomendados

Para destacar ainda mais a Nangell:

Calculadora de ROI
O visitante informa horas gastas manualmente, custo por hora e frequência.
O site calcula quanto a automação poderia economizar.
Diagnóstico inteligente
Após o formulário, exibir uma recomendação automática:
“Seu projeto parece ser um CRM personalizado.”
“Seu caso parece exigir automação + dashboard.”
“Seu projeto pode começar por um MVP.”
Modo apresentação
Botão “Apresentar portfólio” que abre uma experiência fullscreen, útil em reuniões comerciais.
Comparativo “Template x Sob Medida”
Mostrar por que um sistema próprio é melhor quando há regras específicas, integrações e crescimento.
Página “Ideias que podemos construir”
Lista de produtos que a Nangell pode desenvolver:
CRM para clínicas.
Sistema para controle de OS.
Plataforma de cursos.
SaaS de assinatura.
Sistema de agendamento.
Dashboard financeiro.
Robô de relatórios.
Portal do cliente.
21. Resultado esperado

Ao final, a Nangell Creative Studio terá um site que:

Transmite profissionalismo real.
Demonstra domínio técnico.
Diferencia a empresa de freelancers e agências comuns.
Capta leads qualificados.
Mostra sistemas funcionando dentro do próprio site.
Serve como portfólio, landing page, funil de vendas e prova técnica.
Está preparado para SEO, campanhas, tráfego pago, WhatsApp e crescimento comercial.

A essência do projeto deve ser:

A Nangell não promete tecnologia. Ela deixa o cliente experimentar.