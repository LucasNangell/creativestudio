# ShareScreen LAN — Pacote para Portfólio

Pacote demonstrativo do sistema **ShareScreen LAN**, preparado pela **Nangell Creative Studio** para integração no site de portfólio comercial.

## O que é esta pasta

Versão sanitizada e documentada do ShareScreen LAN — sistema de compartilhamento de tela em rede local com WebRTC e SFU mediasoup. Contém código-fonte demo, dados fictícios, build estático interativo da interface e documentação comercial.

## Sistema representado

**ShareScreen LAN** permite que até 10 computadores na mesma rede compartilhem telas com baixa latência. Um painel **Host** seleciona qual tela transmitir para todos; cada **Client** captura sua tela via navegador. Não depende de nuvem nem internet em tempo de execução.

## Como copiar para o site do portfólio

```text
portfolio-imports/web/sharescreen-lan/  →  [site]/imports/web/sharescreen-lan/
```

Arquivos principais para integração:

- `demo-config.json` — metadados do case
- `briefing.md` — textos comerciais prontos
- `build/` — demo estática da interface (pode abrir direto no navegador)
- `mock-data/` — JSONs fictícios para recriação NATIVE

## Estratégia de demonstração: **NATIVE**

IFRAME com funcionalidade completa **não é viável** porque:

- WebRTC e mediasoup exigem servidor Node.js ativo
- `getDisplayMedia` (captura de tela) não funciona em iframe cross-origin
- RTP/UDP não passa por hospedagem estática

**Recomendação:** recriar a interface no site em React com dados mock (`mock-data/`), usando a demo estática em `build/` como referência visual. Complementar com vídeo walkthrough do sistema real rodando em LAN.

## Como rodar a demo localmente

### Opção A — Demo estática (sem instalar nada)

Abra no navegador:

```text
build/index.html
```

Ou sirva com qualquer servidor HTTP local:

```powershell
cd portfolio-imports\web\sharescreen-lan\build
npx --yes serve .
```

### Opção B — Sistema completo com WebRTC (2+ navegadores)

```powershell
cd portfolio-imports\web\sharescreen-lan\source
npm install
npm run build
npm run cert
$env:DEMO_MODE="true"
npm start
```

Acesse `https://192.168.x.x:3443/host` e `/client` em máquinas na mesma rede. Aceite o certificado autoassinado.

## Como gerar novamente o build

A demo estática está em `build/` e foi criada manualmente (HTML/CSS/JS autocontido). Para regenerar a partir do source real:

```powershell
cd source
npm install
npm run build
# Copiar public/host e public/client para build/ e adaptar com demo-showcase.js
```

O bundle WebRTC original (`app.bundle.js`) não funciona sem servidor — use os arquivos `demo-*.html` e `demo-*.js` em `build/`.

## Limitações da versão demonstrativa

| Limitação | Motivo |
|-----------|--------|
| Sem transmissão de vídeo real na demo estática | WebRTC requer servidor mediasoup |
| Sem captura de tela no iframe do portfólio | Restrição de segurança dos navegadores |
| Gravação simulada (toast de sucesso) | Sem backend de arquivos na demo estática |
| Agentes remotos desativados | Dependiam de infraestrutura interna do cliente |
| Certificado autoassinado no modo completo | Necessário para HTTPS em LAN |

## Arquivos importantes

| Arquivo/Pasta | Função |
|---------------|--------|
| `demo-config.json` | Configuração para o CMS do portfólio |
| `briefing.md` | Textos comerciais para o case |
| `CHECKLIST-POR-SISTEMA.md` | Verificação de entrega |
| `build/` | Demo estática interativa |
| `mock-data/` | Dados fictícios |
| `source/` | Código-fonte sanitizado com modo demo |
| `screenshots/` | Lista de capturas necessárias |

## Cuidados de segurança aplicados

- IPs reais (`10.1.1.73`, `10.120.1.12`) → `192.168.100.10`
- Hostname `cgrafsysvm` → `sharescreen-demo.local`
- Caminhos UNC de gravação e SQLite removidos
- `certs/server.key` e `server.crt` **não incluídos**
- `config.json` com URLs de produção **não incluído**
- Pacotes `pacote-servidor*` e `node_modules` **não copiados**
- Nenhum dado pessoal, CPF, CNPJ ou e-mail real

## Testes realizados

- [x] Projeto original não foi alterado (alterações apenas em `portfolio-imports/`)
- [x] Demo estática abre sem erros de console (exceto fetch se abrir via `file://` — usar servidor HTTP)
- [x] Dados mock são claramente fictícios
- [x] Documentação completa
- [ ] Screenshots reais — ver `screenshots/README.md` (captura manual necessária)
- [ ] Demo WebRTC completa — requer `npm install` + 2 navegadores (teste manual)

## Desenvolvido por

**Nangell Creative Studio** — versão demonstrativa para portfólio comercial.
