# Mapeamento de endpoints (modo demonstracao)

Todas as operacoes sao interceptadas por source/src/lib/demo/mock-store.ts.

| Metodo | Endpoint | Fonte |
|--------|----------|-------|
| GET | /api/videos | videos.json |
| GET | /api/videos/:id | videos.json |
| PATCH | /api/videos/:id | mock-store (localStorage) |
| POST | /api/reindex | simulado |
| GET/POST/PATCH/DELETE | marcadores | markers.json + mock-store |
| GET/POST/DELETE | /api/groups | groups.json + mock-store |
| GET | /api/folders | folders.json |
| GET | /media/* | public/demo-media/ |
| GET | /thumbnails/* | public/demo-thumbnails/ |
| POST | /api/videos/:id/watch | IP ficticio 192.168.0.demo |
