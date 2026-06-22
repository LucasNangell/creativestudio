# Player de Video com Marcadores — Pacote de Portfolio

Pacote demonstrativo do sistema **LAN Video Player** para o portfolio da **Nangell Creative Studio**.

## O que e esta pasta

Versao segura e autocontida do sistema, pronta para integracao no site do portfolio. Inclui codigo-fonte adaptado, dados ficticios, build estatico e documentacao comercial.

## Sistema representado

Player web corporativo para biblioteca de videos em rede local, com:

- Catalogo por pastas e busca
- Player avancado (Video.js)
- Marcadores com navegacao por tempo
- Grupos de marcadores com drag-and-drop
- Metadados editaveis (titulo/descricao)
- Indicador de quem esta assistindo

**Slug:** `player-video-marcadores`

## Estrategia de demo: IFRAME

Build estatico em `build/` com mock completo no frontend. Nao requer Node.js, API nem pasta de videos no servidor do portfolio.

## Como copiar para o site

```text
portfolio-imports/web/player-video-marcadores/build/
  -> /demo/player-video-marcadores/   (no site)
```

Arquivos de case: `briefing.md`, `demo-config.json`, `screenshots/`.

## Rodar localmente

### Demo estatica (build)

```powershell
cd portfolio-imports/web/player-video-marcadores/build
npx serve . -p 8080
# Abra http://localhost:8080
```

### Desenvolvimento (source)

```powershell
cd portfolio-imports/web/player-video-marcadores/source
copy .env.demo.example .env.local
npm install
$env:NEXT_PUBLIC_DEMO_MODE = "true"
npm run dev
# http://localhost:3010
```

## Regenerar o build

```powershell
cd portfolio-imports/web/player-video-marcadores
powershell -ExecutionPolicy Bypass -File .\scripts\build-demo.ps1
```

Ou manualmente a partir da raiz do monorepo original:

```powershell
cd D:\Antigravity\Backup\VideoPlayer
$env:NEXT_PUBLIC_DEMO_MODE = "true"
node .\node_modules\next\dist\bin\next build .\portfolio-imports\web\player-video-marcadores\source
robocopy .\portfolio-imports\web\player-video-marcadores\source\out .\portfolio-imports\web\player-video-marcadores\build /E
robocopy .\portfolio-imports\web\player-video-marcadores\source\public .\portfolio-imports\web\player-video-marcadores\build /E
```

## Limitacoes da demo

- Videos sao clipes CC0 repetidos (nao sao conteudos reais distintos)
- Reindexar apenas simula a operacao
- Upload de capa nao persiste arquivo real
- Busca por transcricao (Python) nao incluida
- Alteracoes persistem so no localStorage do navegador
- HLS nao demonstrado (apenas MP4)

## Arquivos importantes

| Caminho | Funcao |
|---------|--------|
| build/ | Demo estatica para IFRAME |
| source/ | Codigo Next.js com mock |
| mock-data/ | JSON inicial da demo |
| briefing.md | Texto comercial |
| demo-config.json | Metadados para o site |
| CHECKLIST-POR-SISTEMA.md | Verificacao de entrega |

## Seguranca aplicada

- Removidos: IP `10.1.1.73`, pasta `G:\Administracao\Videos`, prefixo `/apogee`, nome de cliente **Apogee**
- Sem `.env` real, credenciais, tokens ou banco de producao
- Dados 100% ficticios (Empresa Alpha, colaboradores demo)
- Sem dependencia de backend em runtime na demo

## Testes realizados

- [x] Build estatico gerado com sucesso
- [x] Projeto original nao alterado (mudancas apenas em portfolio-imports/)
- [x] Mock API cobre endpoints usados pela UI
- [ ] Screenshots automaticas (pendente — ver screenshots/README.md)
- [ ] Teste visual no navegador nesta sessao (recomendado antes de publicar)
