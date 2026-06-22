# Lar dos Anjos — Pacote de demonstração para portfólio

Pacote preparado pela **Nangell Creative Studio** para integração no site de portfólio. Contém a versão demonstrativa segura do sistema **Lar dos Anjos Pet** (plataforma de doações e gestão para abrigos de animais).

## O que é esta pasta

Versão autocontida do frontend público (site + área do doador) com:

- Dados fictícios e mock de API
- Build estático pronto para iframe
- Código-fonte demo em `source/`
- Documentação comercial em `briefing.md`

## Estratégia de demo: **IFRAME**

Foi gerado um **build estático** (`build/`) que funciona sem backend, sem banco e sem credenciais reais. Ideal para embed no site do portfólio.

**Motivo:** Next.js permite export estático; a camada `mock-handler` substitui toda a API NestJS em tempo de build e no browser.

## Como copiar para o site do portfólio

```text
portfolio-imports/web/lar-dos-anjos/
  → copiar build/ para public/demo/lar-dos-anjos/ no site Nangell
  → copiar briefing.md, demo-config.json e screenshots/ para CMS ou repo do portfólio
```

Exemplo de iframe:

```html
<iframe
  src="/demo/lar-dos-anjos/index.html"
  title="Demo Lar dos Anjos"
  style="width:100%;min-height:820px;border:0;border-radius:12px"
  loading="lazy"
></iframe>
```

## Rodar localmente

### Opção A — Apenas o build (mais rápido)

```bash
cd portfolio-imports/web/lar-dos-anjos
npx serve build -p 4173
```

Abra `http://localhost:4173`

### Opção B — Desenvolvimento com hot reload

```bash
cd portfolio-imports/web/lar-dos-anjos/source
copy apps\web\.env.demo apps\web\.env.local   # Windows
pnpm install
pnpm dev
```

Abra `http://localhost:3000`

## Regenerar o build

Windows:

```bat
cd portfolio-imports\web\lar-dos-anjos
build-demo.bat
```

Manual:

```bash
cd source
cp apps/web/.env.demo apps/web/.env.local
pnpm install
pnpm build:demo
cp -r apps/web/out ../build
```

Para servir em subpasta (ex.: `/demo/lar-dos-anjos`), defina antes do build:

```env
NEXT_PUBLIC_BASE_PATH=/demo/lar-dos-anjos
```

## Limitações da demo

- **Sem painel admin** — apenas site público + área do doador
- **Pagamentos simulados** — Pix, cartão e boleto não processam valores reais
- **Sem upload persistente** — comprovantes não são armazenados
- **Sem e-mail/WhatsApp** — formulários de contato abrem mailto fictício
- **PWA/Service Worker** desativados na demo
- Textos institucionais ainda mencionam “Asaas” como integração de referência (nome do gateway, não credencial)

## Arquivos importantes

| Caminho | Descrição |
|---------|-----------|
| `build/` | Site estático pronto para deploy |
| `source/` | Monorepo reduzido com modo demo |
| `mock-data/` | JSON de referência dos endpoints |
| `demo-config.json` | Metadados para o CMS do portfólio |
| `briefing.md` | Texto comercial para o case |
| `CHECKLIST-POR-SISTEMA.md` | Validação de entrega |

## Segurança aplicada

- Removidos/neutralizados: URLs `lardosanjos.online`, e-mails reais, `.env` de produção
- API interceptada por `NEXT_PUBLIC_DEMO_MODE=true`
- Credenciais demo visíveis e fictícias
- `node_modules`, `.next` e `.env.local` **não** incluídos na entrega (gerados no build)
- Monorepo original **não foi alterado** — mudanças apenas em `portfolio-imports/`

## Testes realizados

- [x] Build estático gerado com sucesso (45 rotas)
- [x] `build/index.html` presente
- [x] Projeto original intacto
- [ ] Screenshots — pendente captura manual (ver `screenshots/README.md`)
- [ ] Teste visual completo no iframe do site final — pendente integração

## Slug

`lar-dos-anjos`
