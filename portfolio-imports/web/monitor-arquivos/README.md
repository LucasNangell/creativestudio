# HT Monitor — Pacote de demonstração para portfólio

Pacote preparado pela **Nangell Creative Studio** para integração no site de portfólio. Contém uma versão demonstrativa segura do **HT Monitor**, sistema de monitoramento, renomeação e movimentação automática de arquivos PDF.

## O que é esta pasta

Esta pasta representa o case **monitor-arquivos** e pode ser copiada diretamente para a estrutura do site:

```
portfolio-imports/web/monitor-arquivos/
```

## Sistema representado

**HT Monitor** — painel web + serviço desktop para automação de fluxo de arquivos PDF em ambientes de pré-impressão. O sistema monitora pastas de rede, sincroniza metadados com MySQL, renomeia arquivos com padrões configuráveis e move arquivos processados para destinos corretos.

**Tipo:** Web fullstack (SPA vanilla JS + backend Python/FastAPI no produto real). A demo usa apenas o frontend com API simulada.

## Estratégia de demonstração

**IFRAME** — build estático autocontido em `build/` pronto para embed no site.

## Como copiar para o site

1. Copie a pasta `monitor-arquivos/` para `portfolio-imports/web/` do site.
2. Sirva `build/` como arquivos estáticos (ex.: `/demo/monitor-arquivos/`).
3. Embeda via iframe:

```html
<iframe
  src="/demo/monitor-arquivos/index.html"
  title="HT Monitor — Demonstração"
  width="100%"
  height="800"
  style="border:0;border-radius:12px;"
  loading="lazy"
></iframe>
```

4. Use `demo-config.json`, `briefing.md` e `screenshots/` para montar a página do case.

## Como rodar localmente

### Opção 1 — Servidor HTTP simples (recomendado)

```powershell
cd portfolio-imports\web\monitor-arquivos\build
python -m http.server 8080
```

Acesse: http://localhost:8080/

### Opção 2 — Abrir direto no navegador

Abra `build/index.html` no navegador. Alguns recursos podem funcionar, mas o servidor local é preferível.

### Regenerar o build

Após alterar arquivos em `source/`:

```powershell
Remove-Item -Recurse -Force portfolio-imports\web\monitor-arquivos\build\*
Copy-Item -Recurse portfolio-imports\web\monitor-arquivos\source\* portfolio-imports\web\monitor-arquivos\build\
```

## Limitações da versão demonstrativa

- Não conecta a MySQL, pastas de rede ou serviços reais.
- Renomeação e movimentação de arquivos são simuladas (sem efeito em disco).
- Alterações persistem apenas no `localStorage` do navegador do visitante.
- O serviço desktop (`main_monitor.py` / PyInstaller) não está incluído no build iframe.
- Screenshots ainda precisam ser capturadas manualmente (ver `screenshots/README.md`).

## Arquivos importantes

| Arquivo/Pasta | Função |
|---------------|--------|
| `build/` | Demo estática pronta para iframe |
| `source/` | Código-fonte da demo (frontend + mock) |
| `mock-data/` | JSON de referência dos dados fictícios |
| `demo-config.json` | Metadados para integração no CMS/site |
| `briefing.md` | Texto comercial para o case |
| `CHECKLIST-POR-SISTEMA.md` | Checklist de validação |

## Cuidados de segurança aplicados

- Credenciais MySQL reais **removidas** (substituídas por `demo_monitor` / `demo-mysql.empresa-demo.local`).
- Caminhos UNC de produção **substituídos** por `\\servidor-demo\...`.
- URLs de servidores internos (apogee, redecamara, cgraf.online) **removidas**.
- Senha real `sefoc_2018` e IP `10.1.1.73` **não incluídos** na demo.
- Backend Python, `.env`, logs e dumps **excluídos** do pacote.
- Scripts de deploy de produção **não copiados**.

## Arquivos sensíveis ignorados (projeto original)

- `config/settings.json` — credenciais MySQL e caminhos reais
- `config/main_monitor_settings.json` — credenciais e paths UNC
- `HTmonitor/config/main_monitor_settings.json` — credenciais e paths UNC
- `HTmonitor/deploy_production.ps1` — URLs de deploy interno
- `HTmonitor/backend/` — API com acesso a MySQL e filesystem
- `dist/`, `build/` (PyInstaller) — executáveis pesados
- `config/main_monitor_error_log.json` — paths locais reais
- `node_modules/`, logs, cache

## Testes realizados

- [x] Projeto original não modificado (alterações apenas em `portfolio-imports/`)
- [x] Cópia em `source/` sem arquivos sensíveis
- [x] Build gerado em `build/`
- [x] Demo testada via servidor HTTP local (status 200)
- [x] Documentação completa

## Pendências antes de publicar

1. Capturar screenshots listadas em `screenshots/README.md`
2. Criar mockup de capa (`/assets/mockups/monitor-arquivos.webp`)
3. Testar iframe no ambiente final do site (CSP, altura, responsivo)
