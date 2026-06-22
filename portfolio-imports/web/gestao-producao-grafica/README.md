# Gestão de Produção Gráfica — Pacote para Portfólio

Versão demonstrativa preparada pela **Nangell Creative Studio** para integração no site de portfólio comercial.

## O que é esta pasta

Pacote completo de um sistema real de gestão de produção gráfica, adaptado para demonstração pública. Contém código-fonte demo, build estático, dados fictícios e documentação para integração.

**Sistema original:** SAGRA Web (Sistema de Acompanhamento Gráfico)  
**Slug do portfólio:** `gestao-producao-grafica`  
**Tipo:** Web fullstack (SPA React + API Python/FastAPI no sistema original)

## Estratégia de demonstração

**IFRAME** — build estático autocontido com API mockada no frontend.

O build em `build/` pode ser servido como arquivos estáticos e embutido em um iframe no site do portfólio. Não requer backend, banco de dados nem credenciais.

## Como copiar para o site do portfólio

```text
portfolio-site/
└── public/
    └── demo/
        └── gestao-producao-grafica/   ← copiar conteúdo de build/
```

No React do portfólio:

```html
<iframe
  src="/demo/gestao-producao-grafica/index.html"
  title="Gestão de Produção Gráfica — Demo"
  sandbox="allow-scripts allow-same-origin allow-forms"
  style="width:100%;height:80vh;border:0;border-radius:8px"
/>
```

## Como rodar a demo localmente

### Opção 1 — Build estático (produção)

```powershell
cd source
pnpm install
pnpm build:demo
# Abrir build/index.html via servidor local (não abrir file:// diretamente)
npx serve ../build
```

### Opção 2 — Modo desenvolvimento (hot reload)

```powershell
cd source
pnpm install
pnpm dev:demo
# Acessar http://127.0.0.1:5173/
```

### Login na demo

- Clique em **"Entrar na demonstração"**, ou
- Usuário: `demo` / Senha: `demo`

## Como gerar novamente o build

```powershell
cd portfolio-imports/web/gestao-producao-grafica/source
pnpm install
pnpm build:demo
# Copiar apps/web/dist/ para ../build/
```

## Limitações da versão demonstrativa

| Área | Comportamento na demo |
|------|----------------------|
| Autenticação | Simulada localmente (sem servidor) |
| WebSocket / tempo real | Desabilitado — sem erros, mas sem atualizações live |
| E-mail (Exchange) | Tela acessível, dados vazios |
| Papelaria / Corel | Tela acessível, fila simulada vazia |
| Análise técnica PDF | Tela acessível, sem PDF real |
| Upload de arquivos | Simulado — não persiste |
| Exportação XLSX | Pode falhar silenciosamente (sem backend) |
| Portal do cliente | Não incluído no fluxo principal da demo |
| Banco MySQL / MDB | Não utilizado |

**Telas com melhor experiência:** Início (OS), PCP, Painéis.

## Arquivos importantes

| Arquivo/Pasta | Função |
|---------------|--------|
| `demo-config.json` | Metadados para integração automática no site |
| `briefing.md` | Texto comercial para o case |
| `CHECKLIST-POR-SISTEMA.md` | Checklist de validação |
| `mock-data/` | JSONs de exemplo e mapeamento de endpoints |
| `source/` | Código-fonte da versão demo (monorepo React) |
| `build/` | Build estático pronto para iframe |
| `screenshots/` | Instruções para capturas de tela |

## Cuidados de segurança aplicados

- Nenhum arquivo `.env` real incluído
- Credenciais de banco, Exchange e workers removidas
- URLs de produção e IPs internos neutralizados
- Dados de clientes substituídos por registros fictícios (Empresa Alpha, João Demo, etc.)
- Integrações externas desabilitadas (Google Drive, EWS, zrok, Cloudflare)
- Logs de debug para `127.0.0.1:7558` removidos do código demo
- `node_modules`, `backups/`, `config/gdrive/` e dumps não copiados

## Testes realizados

- [x] Build estático gerado com sucesso (`pnpm build:demo`)
- [x] Nenhuma URL de produção encontrada no build
- [x] Projeto original não foi alterado (modificações apenas em `portfolio-imports/`)
- [ ] Teste visual no navegador — recomendado antes de publicar (servir `build/` com `npx serve`)

## Pendências antes de publicar

1. Gerar screenshots conforme `screenshots/README.md`
2. Testar iframe no site do portfólio em ambiente de staging
3. Converter `02-dashboard.png` para WebP como capa do card
4. Revisar textos do `briefing.md` com equipe comercial

---

**Preparado por:** Nangell Creative Studio  
**Data:** Junho 2026
