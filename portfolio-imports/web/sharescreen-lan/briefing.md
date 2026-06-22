# ShareScreen LAN

## Descrição simples

O **ShareScreen LAN** é um sistema que permite compartilhar a tela de um computador com vários outros na mesma rede local — como em salas de reunião, treinamentos ou operações internas.

Um operador usa o **painel Host** para escolher qual computador será exibido para todos. Cada participante abre uma página no navegador e compartilha sua tela quando solicitado. Tudo funciona **sem internet e sem nuvem**: os dados ficam na rede da empresa.

Ideal para empresas que precisam mostrar telas em tempo real em ambientes controlados, com baixa latência e sem depender de serviços externos como Zoom ou Teams.

## Problema que o sistema resolve

Em ambientes corporativos ou institucionais, é comum precisar que **várias pessoas vejam a mesma tela ao mesmo tempo** — durante treinamentos, reuniões técnicas ou acompanhamento de operações.

Soluções em nuvem exigem internet estável, contas pagas e podem ter latência alta. Compartilhar tela de um PC para outro manualmente não escala quando são 5, 8 ou 10 computadores.

O ShareScreen LAN resolve isso com infraestrutura **local**, **rápida** e **sob controle da organização**.

## Solução apresentada

O sistema instala um servidor na rede local. Cada computador acessa uma página web:

- O **Host** vê todos os computadores conectados e escolhe qual tela transmitir.
- Os **Clients** compartilham suas telas pelo navegador (Chrome/Edge).
- O servidor usa tecnologia **WebRTC** com arquitetura **SFU** para encaminhar o vídeo sem sobrecarregar a rede.

Resultado: uma única fonte de vídeo distribuída para todos, com controle centralizado e latência baixa na LAN.

## Principais funcionalidades

- Painel host com lista de fontes de transmissão conectadas
- Seleção em um clique de qual tela exibir para todos
- Suporte a até 10 computadores simultâneos
- Transmissão em Full HD quando a rede permite
- Áudio do sistema e microfone opcionais
- Controles de pausar, retomar e limpar transmissão
- Gravação da sessão ativa
- Reconexão automática em caso de queda
- Log de eventos em tempo real no painel host
- Identificação personalizada de cada computador (ex.: "Sala 1", "Recepção")

## Fluxo de demonstração recomendado

1. Abrir a página inicial da demo e escolher **Painel Host**.
2. Visualizar a lista de computadores fictícios conectados.
3. Clicar em **PC Sala Reunião A** para selecionar como fonte ativa.
4. Observar a prévia simulada da transmissão em tela cheia.
5. Testar **Pausar** e **Retomar** a transmissão.
6. Abrir a tela **Client** e simular identificação de um computador.
7. Concluir entendendo o valor: controle centralizado, múltiplas fontes, zero nuvem.

**Tempo estimado:** 2 a 4 minutos.

## Telas importantes

### 1. Landing da demo (`build/index.html`)

- **O que mostra:** Escolha entre Painel Host e Tela Client.
- **Por que é importante:** Primeiro contato do visitante com o sistema.
- **Ações na demo:** Navegar para Host ou Client.

### 2. Painel Host (`build/host/index.html`)

- **O que mostra:** Prévia em tela cheia, sidebar com fontes, controles e log.
- **Por que é importante:** É o coração do sistema — onde o operador controla tudo.
- **Ações na demo:** Selecionar fonte, pausar/retomar, gravar (simulado), ajustar volume, ver log.

### 3. Tela Client (`build/client/index.html`)

- **O que mostra:** Modal de identificação, visualização da transmissão, banner quando selecionado.
- **Por que é importante:** Mostra a experiência do participante que compartilha a tela.
- **Ações na demo:** Preencher nome, salvar, ver transmissão simulada, editar nome.

## Interações que devem funcionar

1. **Selecionar fonte de transmissão** — clicar em um client na lista do host.
2. **Pausar e retomar** — botões no painel host alteram estado visual.
3. **Ajustar volume** — slider funcional na demo estática.
4. **Identificar computador** — modal do client com nome fictício.
5. **Ver log de eventos** — painel expansível com histórico simulado.

## Dados fictícios necessários

- Computadores conectados (5 peers demo)
- Agentes de automação (4 máquinas fictícias)
- Configuração do servidor (IP, portas, codecs)
- Log de eventos com timestamps
- Resposta de gravação simulada

## Stack técnica

Node.js, Express, mediasoup (SFU WebRTC), WebSocket, esbuild, nginx — tudo rodando em Windows na rede local.

## Texto curto para card do portfólio

Compartilhe telas entre até 10 PCs na rede local, com painel de controle central e baixa latência — sem nuvem, sem internet, 100% na sua infraestrutura.

## Texto para página do case

### Contexto

Empresas e instituições que operam em redes locais frequentemente precisam exibir a tela de um computador para vários participantes ao mesmo tempo — em treinamentos, salas de controle ou reuniões técnicas.

### Problema

Soluções em nuvem dependem de internet, introduzem latência e fogem do controle interno. Compartilhar tela manualmente não escala para múltiplos destinos.

### Solução

Desenvolvemos o **ShareScreen LAN**: um sistema web que roda inteiramente na rede local. Um painel Host centraliza o controle; cada participante usa o navegador para compartilhar sua tela. A arquitetura SFU com mediasoup garante eficiência — cada PC envia apenas um stream, e o servidor distribui para todos.

### Principais recursos

Painel host com seleção de fontes, suporte a 10 clients, Full HD, áudio opcional, gravação, reconexão automática e logs em tempo real.

### Benefícios

Operação 100% local, baixa latência, sem custos de nuvem, controle total da infraestrutura e interface simples baseada em navegador.

## Sugestão de título comercial

**Compartilhamento de tela em rede local com painel de controle centralizado**

## Sugestão de subtítulo

Transmita qualquer tela para até 10 computadores — sem nuvem, sem latência de internet.

## Benefícios comerciais

- Mais controle sobre quem transmite e quem assiste
- Menos dependência de serviços externos
- Informações e vídeo centralizados na rede da empresa
- Atendimento mais rápido em treinamentos e suporte remoto local
- Redução de sobrecarga de rede (arquitetura SFU vs mesh)
- Operação previsível em ambientes sem internet

## Observações para integração no site

1. **Não usar IFRAME** para demo com WebRTC — recriar UI em React (NATIVE).
2. A pasta `build/` serve como **referência visual** e pode ser exibida em iframe apenas para mostrar a interface (sem captura de tela real).
3. Incluir **vídeo walkthrough** gravado com 2 PCs na mesma rede para mostrar o fluxo completo.
4. Usar `mock-data/clientes-conectados.json` como base para estado inicial da recriação React.
5. Rotas sugeridas: `/cases/sharescreen-lan` (página do case) e `/demo/sharescreen-lan` (UI interativa mock).
6. Badge "Demonstração" visível em todas as telas mock.
