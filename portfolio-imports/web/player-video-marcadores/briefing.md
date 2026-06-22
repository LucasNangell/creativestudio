# Player de Vídeo Corporativo com Marcadores

## Descrição simples

Este sistema é uma **biblioteca de vídeos corporativos** pensada para empresas que precisam organizar, reproduzir e navegar conteúdos em vídeo dentro da rede — treinamentos, apresentações, onboarding e materiais internos.

Em vez de procurar arquivos em pastas dispersas ou perder tempo avançando manualmente até um trecho importante, a equipe acessa tudo em uma interface web moderna, com **marcadores** que funcionam como pontos de referência dentro de cada vídeo.

**Para quem serve:** RH, treinamento, operações, comunicação interna e times que produzem ou consomem vídeos corporativos.

**Problema que resolve:** desorganização de vídeos, dificuldade de encontrar trechos específicos e falta de padronização na consulta de materiais internos.

**Ganho para a empresa:** mais agilidade no treinamento, menos retrabalho e melhor aproveitamento do acervo audiovisual.

---

## Problema que o sistema resolve

Empresas acumulam dezenas ou centenas de vídeos em pastas de rede. Sem uma camada de organização:

- Colaboradores não sabem o que existe ou onde está
- Encontrar um trecho específico exige assistir ou adivinhar o minuto certo
- Treinamentos e apresentações ficam difíceis de reutilizar
- Não há visão centralizada de quem está consumindo cada conteúdo

---

## Solução apresentada

O sistema indexa automaticamente os vídeos de uma pasta configurada e oferece uma **biblioteca visual** com busca, filtros por pasta e player integrado. Cada vídeo pode receber **marcadores nomeados** em pontos exatos da linha do tempo — clique e o player vai direto ao trecho.

Grupos organizam marcadores por tema (ex.: Introdução, Segurança, Indicadores). Títulos e descrições podem ser editados sem alterar o arquivo original.

---

## Principais funcionalidades

- Biblioteca de vídeos com thumbnails e metadados
- Organização por pastas (Treinamentos, Apresentações, Onboarding)
- Busca rápida por título, caminho ou descrição
- Player com controles avançados e atalhos de teclado
- Marcadores: criar, editar, remover e navegar com um clique
- Grupos de marcadores com drag-and-drop
- Sidebar global de marcadores em toda a biblioteca
- Edição de título e descrição exibidos
- Indicador de visualização simultânea
- Tema claro e escuro
- Importação em lote de marcadores (planilha)

---

## Fluxo de demonstração recomendado (3–5 min)

1. Abrir a biblioteca e observar os vídeos fictícios da Empresa Alpha
2. Usar a busca ou trocar de pasta na barra lateral
3. Abrir **Introdução à Plataforma**
4. Clicar em um marcador e ver o seek automático
5. Criar um novo marcador no tempo atual
6. Voltar à biblioteca e filtrar marcadores por grupo
7. Alternar para tema escuro

---

## Telas importantes

### Biblioteca principal
- **Mostra:** grade de vídeos, pastas, grupos e marcadores globais
- **Importância:** primeira impressão — organização e escala do acervo
- **Ações na demo:** buscar, trocar pasta, abrir vídeo, ver indicador "Assistindo"

### Player de vídeo
- **Mostra:** reprodução, lista de marcadores, grupos, edição de metadados
- **Importância:** demonstra o valor central do produto
- **Ações na demo:** play, seek por marcador, criar/editar marcador, fullscreen

### Sidebars (pastas, grupos, marcadores)
- **Mostra:** estrutura hierárquica e organização
- **Importância:** diferencial para empresas com muito conteúdo
- **Ações na demo:** filtrar grupo, arrastar marcador entre grupos

---

## Interações que devem funcionar

1. Buscar vídeos por palavra-chave
2. Reproduzir vídeo e navegar por marcador
3. Criar marcador com título e grupo
4. Mover marcador entre grupos (drag-and-drop)
5. Editar título/descrição do vídeo
6. Alternar tema claro/escuro

---

## Dados fictícios necessários

- 6 vídeos em 3 pastas
- 8 marcadores com grupos e palavras-chave
- 6 grupos de marcadores
- Metadados simulados (duração, tamanho, descrições)
- IP fictício de visualização (`192.168.0.demo`)

---

## Stack técnica

- Frontend: Next.js, React, TypeScript, Tailwind CSS, Video.js
- Backend original: Node.js, Fastify, SQLite, indexador de arquivos
- Demo: export estático com mock no frontend (sem backend)

---

## Texto curto para card do portfólio

Biblioteca corporativa de vídeos com player avançado, marcadores inteligentes e organização por pastas — tudo em interface web moderna.

---

## Texto para página do case

A Empresa Alpha precisava centralizar vídeos de treinamento e apresentações espalhados em pastas de rede. O Player de Vídeo Corporativo transforma esse acervo em uma biblioteca navegável, com busca, thumbnails e marcadores que levam o usuário direto ao trecho certo.

Desenvolvido com Next.js e Video.js no frontend e API Fastify com SQLite no backend, o sistema indexa automaticamente novos arquivos, suporta MP4 e HLS, e permite organizar marcadores em grupos temáticos.

O resultado é menos tempo procurando conteúdo, treinamentos mais objetivos e uma experiência profissional para equipes internas.

---

## Sugestão de título comercial

**Player corporativo de vídeos com marcadores e biblioteca inteligente**

## Sugestão de subtítulo

Organize, reproduza e navegue seu acervo de vídeos internos com precisão de segundos.

---

## Benefícios comerciais

- Mais organização do acervo audiovisual
- Menos retrabalho para encontrar trechos
- Treinamentos mais rápidos e objetivos
- Navegação precisa por marcadores
- Informações centralizadas em uma interface
- Experiência profissional para colaboradores

---

## Observações para integração no site

- Servir `build/` via HTTP estático na rota `/demo/player-video-marcadores`
- Usar IFRAME com altura mínima de 720px
- Não depender de backend — demo 100% client-side
- `demo-config.json` contém metadados para cards e rotas
- Screenshots pendentes — ver `screenshots/README.md`
