import json, pathlib
base = pathlib.Path(r"d:/Antigravity/Backup/VideoPlayer/portfolio-imports/web/player-video-marcadores")

(base / "mock-data/README.md").write_text("""# Dados ficticios - Player de Video com Marcadores

Estado inicial da demonstracao. Copia espelhada em `source/src/lib/demo/seed/`.

| Arquivo | Conteudo |
|---------|----------|
| videos.json | 6 videos em 3 pastas |
| markers.json | 8 marcadores com grupos |
| groups.json | 6 grupos |
| folders.json | Pastas da barra lateral |
| endpoints.md | Mapeamento API -> mock |
""", encoding="utf-8")

(base / "screenshots/README.md").write_text("""# Screenshots recomendadas

Capturar manualmente apos abrir `build/index.html` ou rodar `npm run dev` em `source/`.

| Arquivo | Tela |
|---------|------|
| 01-biblioteca.png | Grade de videos com sidebars |
| 02-busca.png | Busca ativa na biblioteca |
| 03-player.png | Player com marcadores |
| 04-marcador.png | Modal de criacao de marcador |
| 05-grupos.png | Sidebar de grupos e drag-and-drop |
| 06-tema-escuro.png | Interface em dark mode |
""", encoding="utf-8")

(base / "build/README.md").write_text("""# Build estatico

Conteudo gerado para exibicao via IFRAME no site do portfolio.

- Abra `index.html` via servidor HTTP local (ex.: `npx serve . -p 8080`)
- Para integracao: copie esta pasta para `/demo/player-video-marcadores/` no site
- Regenere com `scripts/build-demo.ps1`
""", encoding="utf-8")

demo_config = {
  "title": "Player de Video Corporativo com Marcadores",
  "slug": "player-video-marcadores",
  "category": "midia-interna",
  "systemType": "web-fullstack-demo-static",
  "recommendedDemoType": "IFRAME",
  "demoRoute": "/demo/player-video-marcadores",
  "caseRoute": "/cases/player-video-marcadores",
  "coverImageSuggestion": "/assets/mockups/player-video-marcadores.webp",
  "shortDescription": "Biblioteca de videos corporativos com player avancado, marcadores, grupos e busca — demonstracao interativa sem backend.",
  "stack": ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Video.js", "Fastify (original)", "SQLite (original)"],
  "mainFeatures": [
    "Biblioteca de videos por pastas",
    "Player com suporte MP4",
    "Marcadores com seek e play",
    "Grupos e organizacao drag-and-drop",
    "Busca na biblioteca e nos marcadores",
    "Edicao de titulo e descricao",
    "Indicador de visualizacao simultanea",
    "Tema claro e escuro"
  ],
  "demoInteractions": [
    "Buscar videos por titulo",
    "Navegar entre pastas",
    "Abrir video e reproduzir",
    "Criar e editar marcador",
    "Mover marcador entre grupos",
    "Alternar tema claro/escuro"
  ],
  "mockDataFiles": ["videos.json", "markers.json", "groups.json", "folders.json"],
  "hasStaticBuild": True,
  "buildEntryPoint": "build/index.html",
  "requiresBackend": False,
  "backendWasMocked": True,
  "securityNotes": [
    "Nomes de cliente Apogee e IP 10.1.1.73 removidos",
    "Sem .env real, sem SQLite de producao",
    "Sem chamadas a API externa em runtime",
    "Videos sao clipes CC0 locais",
    "IPs de watchers sao ficticios (192.168.0.demo)"
  ],
  "integrationNotes": [
    "Copiar pasta build/ para rota /demo/player-video-marcadores",
    "Servir via HTTP estatico; nao abrir index.html via file://",
    "IFRAME recomendado com altura minima 720px",
    "Botao Restaurar dados iniciais limpa localStorage"
  ]
}
(base / "demo-config.json").write_text(json.dumps(demo_config, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("docs partial ok")
