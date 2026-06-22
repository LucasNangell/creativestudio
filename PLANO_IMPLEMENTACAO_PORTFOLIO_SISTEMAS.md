# Plano de Implementação — Portfólio com Demos de Sistemas Reais

Este documento descreve **como você deve trazer seus sistemas web e desktop** para o site Nangell Creative Studio, de forma que visitantes cliquem no portfólio e naveguem por uma **simulação funcional** com dados fictícios — sem expor dados reais, credenciais ou infraestrutura de produção.

**Escopo deste plano:** orientar a **entrega dos arquivos** e a **estrutura de pastas**. A integração no código do site será feita em uma fase posterior, seguindo este roteiro.

---

## 1. Como o site funciona hoje

O fluxo já existente é:

```
/portfolio  →  lista de cases
     ↓
/cases/{slug}  →  página do case (problema, solução, stack, métricas)
     ↓
/demo/{slug}  →  demonstração interativa com dados mock
```

Cada projeto no banco (ou em `src/data/projects/fallback-projects.ts`) possui:

| Campo | Função |
|-------|--------|
| `slug` | URL do case: `/cases/{slug}` |
| `demoType` | Como a demo é exibida (ver seção 3) |
| `demoRoute` | URL da demo: ex. `/demo/crm-inteligente` |
| `coverImage` | Capa em `public/assets/mockups/{slug}.webp` |

As 6 demos atuais seguem o padrão **NATIVE**: componentes React em `src/components/demos/`, dados em `src/data/demos/`, rota em `src/app/demo/{slug}/page.tsx`.

---

## 2. Onde você coloca os arquivos dos seus sistemas

Foi criada a pasta de staging na raiz do repositório:

```
creativesite/
└── portfolio-imports/          ← VOCÊ ENTREGA OS MATERIAIS AQUI
    ├── README.md
    ├── _template/              ← modelo para copiar por sistema
    │   ├── CHECKLIST-POR-SISTEMA.md
    │   ├── web/
    │   │   └── briefing.md
    │   └── desktop/
    │       └── briefing.md
    ├── web/                    ← um subdiretório por sistema web
    │   └── {slug-do-sistema}/
    └── desktop/                ← um subdiretório por sistema desktop
        └── {slug-do-sistema}/
```

### Por que esta pasta e não `src/` ou `public/`?

| Pasta | Uso |
|-------|-----|
| `portfolio-imports/` | **Entrada bruta** — código, prints, mocks, vídeos, notas. Não vai direto para produção. |
| `src/components/demos/` | **Destino final (web nativo)** — demos já integradas e otimizadas. |
| `public/demos/` | **Destino final (iframe)** — builds estáticos exportados servidos pelo Next.js. |
| `public/assets/mockups/` | Imagens de capa dos cases (640×360 WebP). |

Você **não precisa** colocar nada em `src/` agora. Primeiro organize em `portfolio-imports/`; na fase de integração, o material será movido/adaptado.

---

## 3. Estratégias de integração (escolha uma por sistema)

O site suporta quatro modos (`DemoType` no Prisma):

### 3.1 NATIVE — Recomendado para a melhor experiência

**O que é:** Telas principais do sistema **recriadas em React** dentro do site, com `DemoShell`, sidebar, KPIs e dados 100% fictícios em JSON.

**Quando usar:**
- Sistema web com fluxos claros (CRUD, dashboards, kanban, formulários)
- Desktop cujas telas podem ser reproduzidas na web
- Quando você quer performance, SEO e controle total no Hostinger

**Referência no projeto:** `src/components/demos/crm/crm-demo.tsx` + `src/data/demos/crm-mock.ts`

**O que você deve trazer:**
- Screenshots de **todas** as telas que o visitante deve ver
- Lista de ações clicáveis (ex.: “arrastar card”, “filtrar por status”, “exportar CSV”)
- JSON de dados fictícios (clientes, pedidos, usuários — nomes e valores inventados)
- Descrição dos fluxos em `briefing.md`

---

### 3.2 IFRAME — Bom para SPAs já prontas

**O que é:** Seu frontend exportado como **site estático** (`npm run build` → pasta `dist/` ou `out/`) é colocado em `public/demos/{slug}/` e exibido dentro de um iframe na rota `/demo/{slug}`.

**Quando usar:**
- SPA React/Vue/Angular que já roda só no frontend
- Sistema que você consegue apontar para **API mock** ou **JSON local**
- Quando reconstruir em React nativo seria muito trabalhoso

**Restrições Hostinger:**
- O build estático deve ser **self-contained** (HTML, JS, CSS, assets)
- APIs externas de produção **não** devem ser chamadas — use mock local ou desative chamadas
- Tamanho total recomendado: **&lt; 15 MB** por demo (build comprimido)

**O que você deve trazer em `portfolio-imports/web/{slug}/`:**
```
{slug}/
├── briefing.md
├── screenshots/
├── mock-data/              ← JSON que substitui respostas de API
├── source/                 ← repositório ou zip do frontend
│   └── (código-fonte completo)
└── build/                  ← OPCIONAL: se já tiver o export pronto
    └── index.html + assets
```

**Destino após integração:** `public/demos/{slug}/index.html`

---

### 3.3 EXTERNAL — Link para ambiente externo

**O que é:** O botão “Ver demo” abre URL externa (ex.: `https://demo.seudominio.com`).

**Quando usar:**
- Demo já hospedada em subdomínio dedicado
- Sistema que não pode ser embutido (política de segurança, WebSocket complexo, etc.)

**O que você deve trazer:**
- URL pública da demo com dados fictícios
- Credenciais de teste **apenas** para documentação interna (não commitar)
- Confirmação de que o ambiente está isolado de produção

---

### 3.4 NONE — Apenas case, sem navegação interativa

**O que é:** Página `/cases/{slug}` com galeria, vídeo e texto — sem `/demo/`.

**Quando usar:**
- Desktop sem versão web viável
- Sistema legado difícil de simular
- Material apenas visual (vídeo walkthrough)

---

## 4. Como trazer cada tipo de sistema

### 4.1 Sistema web (SPA ou fullstack)

**Passo a passo para você:**

1. **Copie o template:**
   ```bash
   cp -r portfolio-imports/_template portfolio-imports/web/meu-sistema
   ```
   No Windows (PowerShell):
   ```powershell
   Copy-Item -Recurse portfolio-imports\_template portfolio-imports\web\meu-sistema
   ```

2. **Defina o slug** (kebab-case, sem acentos):  
   Ex.: `gestao-clinica`, `erp-logistica`, `portal-rh`

3. **Preencha** `briefing.md` e `CHECKLIST-POR-SISTEMA.md`

4. **Organize a pasta assim:**
   ```
   portfolio-imports/web/meu-sistema/
   ├── CHECKLIST-POR-SISTEMA.md
   ├── briefing.md
   ├── screenshots/
   │   ├── 01-login.png
   │   ├── 02-dashboard.png
   │   └── 03-relatorios.png
   ├── fluxos/
   │   └── jornada-principal.pdf   (opcional)
   ├── mock-data/
   │   ├── users.json
   │   ├── orders.json
   │   └── README.md               ← explica cada arquivo
   └── source/
       └── (zip ou clone do repo)
   ```

5. **Regras para `mock-data/`:**
   - Nomes fictícios: “Empresa Alpha”, “João Demo”
   - CPF/CNPJ/e-mails inventados
   - Valores financeiros claramente simulados
   - Nenhum dado de cliente real

6. **Se for fullstack com API:**
   - Exporte exemplos de resposta JSON dos endpoints principais
   - Documente em `mock-data/endpoints.md`:
     ```md
     GET /api/orders → orders.json
     GET /api/users → users.json
     ```
   - Na integração, a demo usará esses JSON em vez do backend real

7. **Se for SPA pronta para iframe:**
   - Gere build de produção com variável apontando para mock
   - Coloque em `build/` dentro da pasta do sistema
   - Confirme que abre offline ou só com arquivos locais

---

### 4.2 Sistema desktop (WPF, WinForms, Electron, Tauri, etc.)

Desktop **não roda diretamente** no Hostinger (Node.js + Next.js). A demo no site será sempre uma **representação web**. Três caminhos:

| Caminho | Esforço | Experiência do visitante |
|---------|---------|---------------------------|
| **A — Demo nativa** | Alto | Navegação real no site, melhor conversão |
| **B — Iframe** (se Electron/Tauri com build web) | Médio | SPA embutida |
| **C — Case + vídeo** | Baixo | Assistir walkthrough, sem cliques |

**Passo a passo para você:**

1. Copie template para `portfolio-imports/desktop/{slug}/`

2. **Screenshots obrigatórios** (PNG ou WebP, mín. 1280×720):
   - Tela inicial / login
   - Tela principal (dashboard ou workspace)
   - 2–4 telas de funcionalidades distintas
   - Tela de relatório ou saída (PDF, impressão, export)

3. **Gravação de tela** (opcional mas recomendado):
   - MP4, até 90 segundos, sem áudio sensível
   - Salvar em `screen-recording/demo-walkthrough.mp4`

4. **Para caminho A (demo nativa):** no `briefing.md`, liste:
   - Botões que devem funcionar
   - Campos editáveis vs. somente leitura
   - Mensagens de sucesso/erro simuladas

5. **Para Electron/Tauri com export web:** inclua `source/` + `build/` como sistema web

6. **Não inclua:**
   - Instaladores `.exe` / `.msi` no Git (muito pesado; use link externo se necessário)
   - Licenças ou chaves de ativação
   - Bancos SQLite de produção

---

## 5. Estrutura final no site (após integração — referência)

Quando cada sistema for integrado, a estrutura no projeto ficará assim:

```
# Demo NATIVE (padrão atual)
src/app/demo/{slug}/page.tsx
src/components/demos/{slug}/{slug}-demo.tsx
src/data/demos/{slug}-mock.ts

# Demo IFRAME
public/demos/{slug}/index.html
src/app/demo/{slug}/page.tsx          ← wrapper com iframe + DemoShell

# Case no portfólio
public/assets/mockups/{slug}.webp
Registro em admin → Projetos OU fallback-projects.ts
```

Fluxo do visitante (inalterado):

1. Acessa `/portfolio`
2. Clica no card → `/cases/{slug}`
3. Clica em **“Ver demo interativa”** → `/demo/{slug}`
4. Navega pelo sistema simulado; banner informa dados fictícios

---

## 6. Cadastro do case (admin ou seed)

Após a demo existir, cada sistema precisa de um registro com:

| Campo | Exemplo |
|-------|---------|
| `title` | ERP Logística |
| `slug` | `erp-logistica` |
| `category` | Logística |
| `shortDescription` | Uma linha comercial |
| `problem` / `solution` | Texto do case |
| `features` | JSON array de bullets |
| `stack` | `["React", "Node.js", "PostgreSQL"]` |
| `coverImage` | `/assets/mockups/erp-logistica.webp` |
| `demoType` | `NATIVE` / `IFRAME` / `EXTERNAL` / `NONE` |
| `demoRoute` | `/demo/erp-logistica` |
| `status` | `PUBLISHED` |

Isso pode ser feito pelo painel `/admin/projetos` em produção.

---

## 7. Critérios de qualidade da demo

Antes de considerar um sistema “pronto para integrar”, verifique:

- [ ] Visitante entende que é simulação (banner já existe no `DemoShell`)
- [ ] Nenhum dado real de cliente ou empresa
- [ ] Fluxo principal completável em **2–5 minutos**
- [ ] Funciona em mobile (layout responsivo ou aviso “melhor em desktop”)
- [ ] Não chama APIs de produção
- [ ] Build do site (`npm run build`) continua passando após integração
- [ ] Lighthouse da página da demo aceitável (evitar assets &gt; 500 KB sem otimizar)

---

## 8. Priorização sugerida

Ordem recomendada para trazer seus sistemas:

| Fase | Ação | Responsável |
|------|------|-------------|
| **1** | Escolher 1 sistema piloto (web, fluxo simples) | Você |
| **2** | Montar pasta em `portfolio-imports/web/{slug}/` completa | Você |
| **3** | Definir estratégia: NATIVE vs IFRAME vs EXTERNAL | Você + revisão técnica |
| **4** | Integrar demo + case no código | Desenvolvimento |
| **5** | Cadastrar no admin, publicar, testar em produção Hostinger | Você |
| **6** | Repetir para os demais sistemas | Você |

**Sugestão de piloto:** o sistema web com telas mais parecidas com as demos já existentes (dashboard + listagem + detalhe).

---

## 9. O que NÃO enviar

| Item | Motivo |
|------|--------|
| `.env`, senhas, tokens | Segurança |
| Dump MySQL/PostgreSQL de produção | LGPD e tamanho |
| Código com URLs hardcoded de API real | Quebra demo e expõe infra |
| Binários grandes (&gt; 50 MB) | Deploy Hostinger e Git |
| Dependências não documentadas | Impede build reproduzível |
| Dados de clientes reais em JSON | LGPD |

---

## 10. Checklist rápido por sistema

Use ao finalizar cada pasta em `portfolio-imports/`:

```
[ ] Pasta criada: portfolio-imports/{web|desktop}/{slug}/
[ ] briefing.md preenchido
[ ] CHECKLIST-POR-SISTEMA.md preenchido
[ ] Slug definido (kebab-case, único)
[ ] Screenshots das telas principais
[ ] mock-data/ com JSON fictício (se aplicável)
[ ] Estratégia escolhida: NATIVE / IFRAME / EXTERNAL / NONE
[ ] source/ ou build/ incluído (se web)
[ ] Nenhum segredo ou dado real no pacote
[ ] Lista de 3–5 interações que o visitante deve poder fazer
```

---

## 11. Exemplo concreto

**Sistema:** Portal de gestão de clínicas (web, React + API REST)

```
portfolio-imports/web/gestao-clinica/
├── CHECKLIST-POR-SISTEMA.md
├── briefing.md
├── screenshots/
│   ├── agenda.png
│   ├── pacientes.png
│   └── financeiro.png
├── mock-data/
│   ├── pacientes.json      (10 registros fictícios)
│   ├── consultas.json
│   └── endpoints.md
└── source/
    └── gestao-clinica-front.zip
```

**Decisão:** NATIVE — recriar agenda + lista de pacientes + modal de consulta.

**Após integração:**
- Case: `/cases/gestao-clinica`
- Demo: `/demo/gestao-clinica`
- Capa: `public/assets/mockups/gestao-clinica.webp`

---

## 12. Próximo passo imediato (para você)

1. Liste todos os seus sistemas (nome, tipo web/desktop, complexidade).
2. Escolha **um** piloto.
3. Copie `portfolio-imports/_template` para `portfolio-imports/web/{slug}` ou `desktop/{slug}`.
4. Preencha briefings, screenshots e mocks.
5. Avise quando a pasta estiver pronta para iniciar a **fase de integração no código** (sem alterar este plano).

---

## Referências no projeto

| Documento | Conteúdo |
|-----------|----------|
| `GUIA_MANUTENCAO.md` | Cadastro de cases e `demoRoute` no admin |
| `RELATORIO_FASE_08_DEMOS_INTERATIVAS.md` | Padrão das 6 demos atuais |
| `RELATORIO_FASE_07_PORTFOLIO_CASES.md` | Estrutura das páginas de case |
| `DEPLOY_HOSTINGER.md` | Restrições de deploy (Node 20, sem backend separado por demo) |
| `portfolio-imports/README.md` | Atalho para esta pasta de entrega |
