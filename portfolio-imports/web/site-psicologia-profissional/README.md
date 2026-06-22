# Site Psicologia Profissional — Pacote de Portfólio

Versão demonstrativa preparada para integração no portfólio da **Nangell Creative Studio**.

## O que é esta pasta

Pacote completo de um case de desenvolvimento web: site profissional para psicóloga com agendamento online, blog educativo e painel administrativo. Todos os dados são fictícios e seguros para exibição pública.

**Slug:** `site-psicologia-profissional`  
**Tipo:** Web fullstack PHP (server-rendered, persistência JSON)  
**Estratégia de demo:** IFRAME (hospedagem PHP em subdomínio)

## Como copiar para o site do portfólio

1. Copie a pasta inteira `site-psicologia-profissional/` para o repositório do site Nangell.
2. Publique o conteúdo de `source/` em um servidor PHP (subdomínio de demo).
3. Configure o iframe na rota `/demo/site-psicologia-profissional` apontando para a URL publicada.
4. Use `briefing.md` e `demo-config.json` para montar a página do case em `/cases/site-psicologia-profissional`.
5. Gere screenshots conforme `screenshots/README.md`.

## Estrutura da pasta

```
site-psicologia-profissional/
├── README.md                 ← Este arquivo
├── briefing.md               ← Texto comercial para o case
├── CHECKLIST-POR-SISTEMA.md  ← Checklist de preparação
├── demo-config.json          ← Metadados para integração automatizada
├── screenshots/              ← Capturas (gerar manualmente)
├── mock-data/                ← Dados fictícios de referência
├── source/                   ← Código da demo (publicar no servidor PHP)
└── build/                    ← Não aplicável (ver README interno)
```

## Como rodar a demo localmente

```bash
cd source
php -S localhost:8080
```

Acesse:

| URL | Descrição |
|-----|-----------|
| http://localhost:8080/index.php | Página inicial |
| http://localhost:8080/agendamento.php | Agendamento com calendário |
| http://localhost:8080/blog.php | Blog |
| http://localhost:8080/admin/login.php | Painel admin |

**Login demo:** usuário `demo` / senha `demo2026` (exibidos na tela de login).

> O servidor embutido do PHP não processa `.htaccess`. Use URLs com `.php` ou Apache local (Laragon, XAMPP) para URLs amigáveis.

## Como republicar a demo

Não há build estático. Para atualizar:

1. Edite arquivos em `source/`.
2. Copie `source/` para o servidor de demonstração.
3. Para resetar dados: copie `mock-data/*.json` para `source/data/`.

## Limitações da versão demonstrativa

- Requer servidor PHP 8.0+ (não roda como HTML estático puro).
- Persistência em JSON — adequada para demo, não para alto volume em produção.
- Google Calendar e envio de e-mail não implementados (stubs).
- Imagens de profissional, certificados e fontes podem estar ausentes (placeholders).
- Links de WhatsApp usam número fictício.
- URLs amigáveis (`/sobre`, `/blog/slug`) exigem Apache com `mod_rewrite`.

## Arquivos importantes

| Arquivo | Função |
|---------|--------|
| `source/includes/config.php` | Identidade, contato e modo demo |
| `source/admin/config.php` | Credenciais do painel |
| `source/data/agendamentos.json` | Dados de agendamentos |
| `source/data/posts.json` | Artigos do blog |
| `mock-data/` | Backup dos dados iniciais da demo |
| `demo-config.json` | Metadados para o site do portfólio |
| `briefing.md` | Textos comerciais do case |

## Segurança aplicada

- Nenhuma senha, token ou chave de API real.
- Nenhum `.env` ou credencial de banco.
- Contatos e endereços fictícios.
- Redes sociais desativadas (links `#`).
- Credenciais admin visíveis apenas para demo (`demo`/`demo2026`).
- Banner indicando versão demonstrativa em todas as páginas públicas.

## Testes realizados

- [x] Projeto original não alterado (modificações apenas em `portfolio-imports/`)
- [x] Cópia em `source/` sem node_modules, vendor ou arquivos temporários
- [x] PHP responde corretamente no servidor local
- [x] Sem referências a Hostinger ou URLs de produção na versão demo
- [x] Documentação completa para integração

## Testes não executados automaticamente

- Screenshots (requer captura manual)
- Deploy em servidor Apache de produção
- Validação de fontes e imagens ausentes
