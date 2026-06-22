# Vigília Política

## Descrição simples

O **Vigília Política** é uma central de inteligência para mandatos políticos, assessorias e equipes de comunicação. Ele reúne em um único painel o que está acontecendo no ambiente político — notícias, alertas, narrativas e riscos — para que a equipe possa **agir antes que um problema vire crise**.

Serve para **parlamentares, gabinetes, prefeitos, secretários e consultorias políticas** que precisam monitorar reputação, temas sensíveis e movimentações de adversários com rapidez.

## Problema que o sistema resolve

Equipes políticas recebem informação de dezenas de fontes ao mesmo tempo: portais de notícia, redes sociais, grupos, diário oficial e dados legislativos. Sem uma central unificada, surgem atrasos na resposta, perda de contexto, retrabalho entre assessores e decisões tomadas com informação incompleta.

## Solução apresentada

O Vigília Política centraliza o monitoramento em um **War Room digital**: painel com indicadores, feed multicanal, alertas prioritários, narrativas em alta e briefings executivos prontos para compartilhar com a liderança.

## Principais funcionalidades

- **War Room (Dashboard)** — visão geral com KPIs, gráficos e simulação em tempo real
- **Feed de Inteligência** — notícias e menções consolidadas com filtros por canal, risco e sentimento
- **Alertas críticos** — detecção de situações de alto impacto com ações de resposta
- **Briefing executivo** — resumo estratégico gerado automaticamente para decisão rápida
- **Narrativas e tendências** — acompanhamento de temas que ganham tração
- **Territórios e adversários** — monitoramento regional e comparativo
- **Providências (tarefas)** — transformação de alertas em ações com responsáveis
- **Palavras-chave** — vigilância de termos estratégicos
- **Configurações** — gestão de portais monitorados e exportação de dados
- **Landing de fundadores** — página comercial para captação de interessados

## Fluxo de demonstração recomendado

1. Acessar `/login` e entrar com qualquer e-mail/senha
2. Explorar o **Dashboard** — observar KPIs e simulação ao vivo
3. Abrir o **Feed de Inteligência** — filtrar por risco ou canal
4. Ir em **Alertas** — resolver um alerta e criar providência
5. Abrir **Briefing** — copiar resumo executivo
6. Visitar **Configurações** — ver portais demo e simular exportação

Tempo estimado: **3 a 5 minutos**.

## Telas importantes

### Login (`/login`)
- **Mostra:** Tela de acesso institucional com aviso de ambiente demonstrativo
- **Importância:** Prime Ministerial e profissional; primeira impressão do case
- **Ações na demo:** login com qualquer credencial

### War Room / Dashboard (`/dashboard`)
- **Mostra:** KPIs, gráficos, preview de alertas, controle de simulação
- **Importância:** demonstra valor gerencial imediato
- **Ações na demo:** pausar/retomar simulação, navegar para alertas

### Feed de Inteligência (`/feed`)
- **Mostra:** notícias fictícias consolidadas com filtros avançados
- **Importância:** core do produto — monitoramento multicanal
- **Ações na demo:** filtrar, buscar, criar providência a partir de item

### Alertas (`/alerts`)
- **Mostra:** alertas por criticidade com ações de resolução
- **Importância:** mostra capacidade de resposta a crises
- **Ações na demo:** marcar como lido, resolver, criar tarefa

### Briefing (`/briefing`)
- **Mostra:** resumo executivo consolidado
- **Importância:** entrega valor para tomada de decisão
- **Ações na demo:** copiar texto, regenerar briefing

### Configurações (`/settings`)
- **Mostra:** portais monitorados, exportações, logout
- **Importância:** demonstra operação e personalização
- **Ações na demo:** adicionar portal fictício, exportar CSV/JSON

## Interações que devem funcionar

1. **Filtrar o feed** por canal, risco, sentimento e busca textual
2. **Resolver alertas** e converter em providências/tarefas
3. **Pausar e retomar** a simulação no dashboard
4. **Copiar briefing** para área de transferência
5. **Cadastrar portal demo** em Configurações (persiste no navegador)

## Dados fictícios necessários

- Notícias simuladas (15 matérias)
- Portais de mídia demo (5 domínios)
- Temas em alta (5 clusters)
- Alertas, narrativas, adversários e territórios (motor de simulação)
- Indicadores de dashboard e valor entregue (simulação contínua)
- Perfil de mandato genérico ("Mandato — Configure em Configurações")

## Stack técnica

React, TypeScript, Vite, Tailwind CSS, Framer Motion, Recharts e React Router. Backend original (MySQL + Express + WebSocket) foi **substituído por mocks locais** na versão de portfólio.

## Texto curto para card do portfólio

Central de inteligência política com alertas, feed multicanal e briefings estratégicos — para mandatos que precisam agir antes da crise.

*(148 caracteres)*

## Texto para página do case

Mandatos e assessorias políticas enfrentam um volume crescente de informação dispersa em portais, redes sociais, diários oficiais e canais regionais. Sem uma central de monitoramento, equipes perdem tempo reunindo dados manualmente e correm o risco de reagir tarde demais a narrativas adversárias ou crises reputacionais.

O **Vigília Política** resolve isso com um War Room digital que consolida indicadores, feed multicanal, alertas prioritários e briefings executivos. A plataforma permite filtrar menções por risco e sentimento, acompanhar temas em alta, monitorar territórios e adversários, e transformar alertas em providências concretas para a equipe.

Desenvolvido com interface moderna e responsiva, o sistema combina visualização em tempo real simulado com fluxos operacionais pensados para gabinetes que precisam de **velocidade, clareza e controle** na gestão da informação política.

## Sugestão de título comercial

**Inteligência política preventiva com War Room em tempo real**

## Sugestão de subtítulo

Monitore narrativas, alertas e riscos reputacionais antes que virem crise.

## Benefícios comerciais

- Mais organização na rotina de monitoramento
- Menos retrabalho na consolidação de informações
- Mais controle sobre temas sensíveis e adversários
- Melhor tomada de decisão com briefings prontos
- Resposta mais rápida a alertas críticos
- Informações centralizadas em um único painel
- Redução de erros por monitoramento manual disperso

## Observações para integração no site

- Publicar a pasta `build/` como demo estática em `/demo/vigilia-politica`
- Embutir via **iframe** com altura mínima de 720px
- Configurar fallback SPA (`index.html` para rotas internas)
- Login automático não é necessário — visitante usa qualquer credencial
- Screenshots devem ser capturadas conforme `screenshots/README.md`
- Metadados técnicos em `demo-config.json`
