# Vigília Política — Pacote de demonstração para portfólio

Pacote preparado pela **Nangell Creative Studio** para integração no site comercial. Contém build estático, código-fonte demo, dados fictícios e documentação.

## O que é esta pasta

Versão demonstrativa do **Vigília Política** — plataforma de inteligência política preventiva (War Room) para mandatos, assessorias e equipes de comunicação.

## Estrutura

```
vigilia-politica/
├── README.md                 ← este arquivo
├── briefing.md               ← texto comercial para o case
├── CHECKLIST-POR-SISTEMA.md  ← checklist de entrega
├── demo-config.json          ← metadados para integração no site
├── build/                    ← build estático pronto para iframe
├── source/                   ← código-fonte com modo demo
├── mock-data/                ← JSON fictícios de referência
└── screenshots/              ← instruções de capturas
```

## Estratégia de demo: IFRAME

Foi gerado um **build estático autocontido** em `build/`, servível via iframe ou hospedagem estática. Não requer MySQL, Express, Gemini ou credenciais.

**Motivo:** O sistema original é React/Vite com simulação client-side robusta; apenas o pipeline de notícias dependia de backend. Na demo, esse pipeline foi substituído por JSON local.

## Como copiar para o site do portfólio

1. Copie `portfolio-imports/web/vigilia-politica/` para o repositório do site.
2. Publique `build/` em `/demo/vigilia-politica/` (ou caminho equivalente).
3. Configure iframe apontando para `build/index.html`.
4. Use `briefing.md` e `demo-config.json` para montar a página do case.

## Rodar localmente

### Opção A — Build pronto (mais rápido)

```bash
cd build
npx serve .
# ou: python -m http.server 8080
```

Acesse `http://localhost:3000` (serve) ou `http://localhost:8080`.

### Opção B — Desenvolvimento / rebuild

```bash
cd source
npm install
npm run dev:demo      # desenvolvimento
npm run build:demo    # gera source/dist/
npm run preview:demo  # preview do build
```

Após `build:demo`, copie `source/dist/` para `build/`.

## Login na demo

- Rota: `/login`
- Use **qualquer e-mail e senha** (ex.: `demo@empresa-demo.com` / `demo123`)
- Ou acesse diretamente `/dashboard` após login em sessão anterior

## Regenerar o build

```bash
cd source
npm install
npm run build:demo
xcopy /E /I /Y dist ..\build   # Windows
# cp -r dist/* ../build/     # Linux/macOS
```

## Limitações da versão demonstrativa

- Notícias são fictícias (15 matérias simuladas), não RSS real
- Cadastro de portais persiste só no navegador (`localStorage`)
- Lead da landing `/fundadores` não envia dados a servidor
- Motor de inteligência usa simulação — indicadores variam de forma sintética
- Exportação PDF em Configurações é simulada
- Links externos (WhatsApp, notícias) apontam para URLs demo ou `#`

## Arquivos importantes

| Arquivo | Função |
|---------|--------|
| `build/index.html` | Entrada da demo estática |
| `build/data/news.json` | Feed de notícias fictícias |
| `source/.env.demo` | Ativa `VITE_DEMO_MODE=true` |
| `source/src/config/demoMode.ts` | Flag central do modo demo |
| `demo-config.json` | Metadados para o site do portfólio |
| `briefing.md` | Copy comercial do case |

## Segurança aplicada

Removidos ou neutralizados:

- `.env` real (MySQL, Gemini API key)
- Referências Hostinger (`u456568047_*`)
- Pasta `_hostinger_deploy_staging`
- Scripts de deploy e coleta RSS em produção
- `node_modules`, `dist`, logs e dumps
- Notícias reais de portais externos

Substituídos por dados claramente simulados (Empresa Demo, João Demo, Maria Exemplo, domínios `*-demo.com.br`).

## Testes realizados

| Teste | Resultado |
|-------|-----------|
| Projeto original intacto | OK — alterações apenas em `portfolio-imports/` |
| Build estático gerado | OK |
| Preview HTTP 200 | OK |
| `data/news.json` acessível | OK (15 itens) |
| Chamadas `/api/*` no bundle demo | Substituídas por `./data/*` e localStorage |

## Contato técnico

Para dúvidas de integração, consulte `demo-config.json` e `mock-data/endpoints.md`.
