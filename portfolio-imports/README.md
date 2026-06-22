# Pasta de importação — sistemas para o portfólio

Esta pasta é o **ponto de entrega** dos seus sistemas antes da integração no site.

Leia o plano completo em: **[PLANO_IMPLEMENTACAO_PORTFOLIO_SISTEMAS.md](../PLANO_IMPLEMENTACAO_PORTFOLIO_SISTEMAS.md)**

## Estrutura rápida

```
portfolio-imports/
├── _template/          ← copie esta pasta para cada novo sistema
├── web/                ← coloque aqui sistemas web
│   └── {slug-do-sistema}/
└── desktop/            ← coloque aqui sistemas desktop
    └── {slug-do-sistema}/
```

Não coloque senhas, `.env`, dumps de banco com dados reais nem código que dependa de APIs privadas sem mock.
