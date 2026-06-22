# HT Monitor

## Descrição simples

O **HT Monitor** é um sistema que automatiza o trabalho com arquivos PDF em empresas de pré-impressão e produção gráfica. Ele monitora pastas de entrada, renomeia arquivos com a nomenclatura correta e move os documentos processados para o destino certo — tudo sem intervenção manual do operador.

**Para quem serve:** equipes de pré-impressão, operadores de fluxo contínuo (DF) e gestores de TI que precisam controlar automações de arquivos.

**Problema que resolve:** operadores gastavam tempo corrigindo nomes de arquivos e movendo PDFs manualmente entre pastas de rede.

**Ganho para a empresa:** menos retrabalho, menos erros de identificação de trabalhos e mais previsibilidade no fluxo de produção.

---

## Problema que o sistema resolve

Em ambientes de alta produção gráfica, cada arquivo PDF precisa chegar ao destino com o nome correto (ano, número da OP, cliente, versão). Quando isso não acontece automaticamente:

- Operadores param a produção para renomear arquivos manualmente.
- Jobs são criados com dados errados no RIP/workflow.
- Arquivos ficam perdidos em pastas temporárias.
- Não há visibilidade centralizada do que foi processado ou falhou.

---

## Solução apresentada

O HT Monitor funciona como um serviço contínuo (24/7) com painel web de configuração. Ele:

1. **Monitora** pastas de rede e sincroniza informações com banco MySQL.
2. **Renomeia** PDFs automaticamente usando padrões configuráveis e variáveis dinâmicas.
3. **Move** arquivos processados para pastas de clientes seguindo regras origem → destino.
4. **Centraliza** históricos e erros em um único painel administrativo.

---

## Principais funcionalidades

- Dashboard com status em tempo real dos serviços.
- Monitoramento de pastas com sincronização forçada ao banco.
- Configuração de conexão MySQL e API.
- Editor de padrões de renomeação com variáveis built-in e customizadas.
- Associação de padrões por pasta monitorada.
- Regras de movimentação com drag-and-drop para prioridade.
- Histórico de renomeações e movimentações.
- Log centralizado de erros por módulo.
- Interface web moderna, responsiva e traduzível.

---

## Fluxo de demonstração recomendado (2–5 min)

1. **Dashboard** — Veja os cards de status e os históricos recentes.
2. **Banco de dados** — Explore pastas monitoradas e simule adicionar uma pasta fictícia.
3. **Renomeador → Padrões** — Edite um padrão de nomenclatura e insira variáveis.
4. **Movimentações → Regras** — Abra uma regra existente ou crie uma nova.
5. **Movimentações → Executar** — Clique em "Executar agora" e veja o histórico atualizar.
6. **Log de Erros** — Visualize erros simulados de diferentes módulos.

---

## Telas importantes

### Dashboard
- **Mostra:** status dos 4 módulos, históricos resumidos, explicação do fluxo.
- **Importância:** primeira impressão — prova que o sistema está vivo e organizado.
- **Ações na demo:** navegação, visualização de históricos, botão reiniciar serviços.

### Banco de dados (Monitor)
- **Mostra:** config MySQL, pastas monitoradas, sincronização.
- **Importância:** demonstra integração com infraestrutura corporativa.
- **Ações na demo:** adicionar/remover pasta, testar conexão, sincronizar.

### Renomeador
- **Mostra:** padrões, variáveis, pastas, histórico, política de erros.
- **Importância:** core do valor — automação inteligente de nomenclatura.
- **Ações na demo:** criar/editar padrão, inserir variáveis, associar padrão a pasta.

### Movimentações
- **Mostra:** regras CRUD, reordenação, execução manual, histórico.
- **Importância:** completa o fluxo automatizado origem → destino.
- **Ações na demo:** editar regra, reordenar, executar, ver histórico.

### Log de Erros
- **Mostra:** erros centralizados com timestamp e origem.
- **Importância:** confiabilidade e rastreabilidade operacional.
- **Ações na demo:** filtrar visualmente, limpar log.

---

## Interações que devem funcionar

1. Filtrar/navegar entre abas (Padrões, Pastas, Histórico).
2. Adicionar pasta fictícia de monitoramento.
3. Criar ou editar padrão de renomeação.
4. Criar ou editar regra de movimentação.
5. Executar movimentação manual e ver toast de sucesso.

---

## Dados fictícios necessários

- Configuração MySQL demo.
- Pastas de rede simuladas (`\\servidor-demo\...`).
- Clientes: Alpha, Beta, Gamma.
- Padrões de renomeação (2 padrões).
- Regras de movimentação (2 regras).
- Histórico de renomeações (5 registros).
- Histórico de movimentações (3 registros).
- Log de erros (3 entradas).
- Status de serviços (todos ativos).

---

## Stack técnica

- Frontend: HTML5, CSS3, JavaScript (SPA vanilla)
- Backend (produto real): Python, FastAPI, MySQL, Watchdog
- Desktop (produto real): Python, Tkinter, PyInstaller, system tray
- Deploy (produto real): Apache Tomcat + serviço Windows

---

## Texto curto para card do portfólio

Automatize renomeação e movimentação de PDFs com painel web em tempo real. Menos retrabalho, mais controle no fluxo de pré-impressão.

*(147 caracteres)*

---

## Texto para página do case

### Contexto

Empresas de pré-impressão processam centenas de arquivos PDF por dia. Cada documento precisa seguir um padrão rigoroso de nomenclatura e ser encaminhado automaticamente para a pasta correta do cliente.

### Problema

O processo manual de renomear e mover arquivos consumia tempo dos operadores, gerava erros de identificação e dificultava o rastreamento de falhas.

### Solução

Desenvolvemos o HT Monitor: um serviço contínuo com painel web que monitora pastas de rede, sincroniza metadados com MySQL, aplica padrões de renomeação configuráveis e executa regras de movimentação automática.

### Principais recursos

Dashboard operacional, editor de padrões com variáveis dinâmicas, regras de movimentação com prioridade, históricos completos e log centralizado de erros.

### Benefícios

Operação mais rápida, menos erros manuais, rastreabilidade total e configuração centralizada sem acessar o servidor diretamente.

---

## Sugestão de título comercial

**Automação de arquivos PDF com painel web em tempo real**

## Sugestão de subtítulo

Controle total sobre renomeação, movimentação e monitoramento — sem intervenção manual.

---

## Benefícios comerciais

- Mais organização no fluxo de arquivos.
- Menos retrabalho dos operadores.
- Mais controle sobre nomenclatura e destinos.
- Melhor tomada de decisão com históricos e logs.
- Atendimento mais rápido a falhas.
- Informações centralizadas em um único painel.
- Redução de erros manuais de nomenclatura.

---

## Observações para integração no site

- Usar estratégia **IFRAME** com conteúdo de `build/`.
- Altura recomendada do iframe: **800px** (mínimo 700px).
- O banner verde "Demonstração interativa" identifica a versão demo — manter visível.
- Botão "Reiniciar demo" limpa `localStorage` e restaura dados iniciais.
- Não expor `source/` publicamente se quiser ocultar implementação do mock.
- Fontes Google (DM Sans, JetBrains Mono) requerem conexão externa — considerar self-host se CSP restritiva.
- Slug: `monitor-arquivos`
- Rotas sugeridas: `/demo/monitor-arquivos` e `/cases/monitor-arquivos`

---

## Versão desktop (referência)

O produto completo inclui também aplicação desktop (`main_monitor.py`) com bandeja do sistema e executável PyInstaller. Esta versão **não está no iframe** — documentada para futura recriação NATIVE de telas específicas se necessário.

Telas desktop equivalentes: abas Monitor, Renomear, Mover, Log — mesma lógica do painel web.
