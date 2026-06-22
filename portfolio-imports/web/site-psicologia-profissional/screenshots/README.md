# Screenshots — Site Psicologia Profissional

As capturas de tela não foram geradas automaticamente neste pacote. Use esta lista como guia para produzir as imagens do case no portfólio.

## Capturas recomendadas

| Arquivo | Tela | O que mostrar |
|---------|------|---------------|
| `01-home.png` | Página inicial | Hero, especialidades, CTA de agendamento, banner demo |
| `02-agendamento.png` | Agendamento | Calendário interativo + formulário lateral |
| `03-blog.png` | Blog | Listagem com busca e filtros por categoria |
| `04-admin-dashboard.png` | Painel admin | Dashboard com contadores e últimos agendamentos |
| `05-admin-agendamentos.png` | Gestão de agendamentos | Lista filtrada por status |
| `06-post.png` | Artigo do blog | Página de post individual com conteúdo |

## Como capturar

1. Inicie a demo localmente:

```bash
cd source
php -S localhost:8080
```

2. Acesse as URLs:
   - `http://localhost:8080/index.php`
   - `http://localhost:8080/agendamento.php`
   - `http://localhost:8080/blog.php`
   - `http://localhost:8080/admin/login.php` (login: `demo` / `demo2026`)
   - `http://localhost:8080/admin/dashboard.php`
   - `http://localhost:8080/post.php?slug=tcc-ajuda-ansiedade`

3. Use resolução **1440×900** ou **1280×800** para consistência.
4. Salve os arquivos nesta pasta com os nomes indicados acima.

## Observações

- O banner superior "Demonstração Nangell Creative Studio" deve aparecer nas capturas do site público.
- Imagens de profissional e certificados podem aparecer quebradas se os arquivos PNG não estiverem em `source/assets/img/` — isso não impede a captura das telas principais.
- Para mockups do card do portfólio, use `01-home.png` ou `02-agendamento.png` como base.
