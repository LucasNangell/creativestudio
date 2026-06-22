# Mapeamento de endpoints — ShareScreen LAN (demo)

| Método | Endpoint | Arquivo mock | Observação |
|--------|----------|--------------|------------|
| GET | `/api/info` | `info.json` | IP, portas e limites do servidor |
| GET | `/api/diagnostico` | `diagnostico.json` | Codecs, bitrate e FPS configurados |
| GET | `/api/agentes` | `agentes.json` | Lista de PCs com agente (integração opcional) |
| POST | `/api/gravacao` | `gravacao-resposta.json` | Simulado localmente na demo estática |
| WS | `/ws` | — | Sinalização WebRTC — requer servidor Node.js real |

## Mensagens WebSocket (referência)

Estas mensagens não possuem arquivo JSON estático — o fluxo real depende do servidor mediasoup:

| Mensagem | Direção | Descrição |
|----------|---------|-----------|
| `entrar` | Client → Server | Registra peer com papel e nome |
| `entrou` | Server → Client | Confirma peerId e rtpCapabilities |
| `criarTransporte` | Bidirecional | Cria transporte send/recv WebRTC |
| `produzir` | Client → Server | Publica track de vídeo/áudio |
| `selecionarClient` | Host → Server | Define qual fonte transmitir |
| `transmissaoAtiva` | Server → Todos | Notifica mudança de fonte |
| `consumir` | Client → Server | Consome stream selecionado |
| `pausarTransmissao` | Host → Server | Pausa transmissão global |
| `retomarTransmissao` | Host → Server | Retoma transmissão |

Na demo estática (`build/`), essas ações são simuladas visualmente sem WebSocket.
