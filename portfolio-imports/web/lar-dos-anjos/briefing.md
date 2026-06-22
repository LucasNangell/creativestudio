# Plataforma Lar dos Anjos — Doações e gestão para abrigos

## Descrição simples

O **Lar dos Anjos** é uma plataforma digital feita para abrigos de animais e ONGs que precisam arrecadar recursos, mostrar transparência e manter doadores engajados.

Ela reúne em um só lugar: site institucional, doações (Pix e mensalidades), campanhas, portal de transparência, galeria de animais para adoção e uma área exclusiva para quem apoia a causa.

**Para quem serve:** abrigos, ONGs, protetores independentes e equipes que precisam profissionalizar a arrecadação.

**Problema que resolve:** dispersão de informações, falta de confiança dos doadores e processos manuais de cobrança e prestação de contas.

**Ganho para a ONG:** mais doações recorrentes, mais confiança pública e menos trabalho operacional.

---

## Problema que o sistema resolve

Abrigos de animais enfrentam desafios diários:

- Dificuldade em transformar visitantes do site em doadores recorrentes
- Falta de transparência sobre para onde vai o dinheiro
- Controle manual de Pix, assinaturas e campanhas
- Pouca visibilidade dos animais disponíveis para adoção
- Doadores sem acompanhamento do próprio impacto

Sem um sistema integrado, a equipe perde tempo com planilhas, comprovantes soltos e respostas repetidas — enquanto a confiança do público diminui.

---

## Solução apresentada

A plataforma centraliza arrecadação, comunicação e gestão em uma experiência moderna:

- Site acolhedor que convida à doação
- Fluxos de Pix e assinatura mensal
- Portal público de transparência com gráficos
- Campanhas com meta e progresso
- Área do doador com histórico, selos e carteirinha digital
- Painel administrativo (no sistema completo) para equipe financeira e conteúdo

Na demonstração do portfólio, o visitante experimenta o site e a área do doador com dados fictícios, sem risco de pagamento real.

---

## Principais funcionalidades

- Cadastro e gestão de planos de doação mensal
- Doação única via Pix com QR Code e comprovante
- Checkout de cartão e boleto (integração Asaas no sistema real)
- Portal de transparência com receitas, despesas e evolução mensal
- Campanhas de arrecadação vinculadas a animais ou causas
- Mural de apoiadores com consentimento LGPD
- Galeria de animais com filtros e formulário de interesse em adoção
- Área do doador: impacto, doações, assinatura, privacidade
- Carteirinha digital com validação pública por QR Code
- PWA instalável (no sistema de produção)
- Painel admin: financeiro, animais, campanhas, conciliação (case complementar)

---

## Fluxo de demonstração recomendado (3–5 min)

1. **Home** — Ver indicadores, planos e animais em destaque
2. **Transparência** — Explorar gráficos de receitas e despesas fictícias
3. **Animais** — Filtrar por espécie e abrir a ficha do Simba
4. **Doar única** — Simular Pix de R$ 50 (sem pagamento real)
5. **Entrar** — Clicar em “Entrar na demonstração”
6. **Dashboard** — Ver impacto, selos e carteirinha digital

---

## Telas importantes

### Home
- **Mostra:** hero, KPIs, planos, animais, campanhas, mural
- **Importância:** primeira impressão comercial
- **Demo:** navegação e links funcionais

### Portal de transparência
- **Mostra:** metas, gráficos, despesas por categoria
- **Importância:** prova de confiança e diferencial competitivo
- **Demo:** scroll e visualização de dados mock

### Animais
- **Mostra:** grid filtrável e detalhes com história
- **Importância:** conexão emocional e adoção
- **Demo:** filtros, detalhe, formulário de interesse

### Doação Pix
- **Mostra:** valor, QR fictício, fluxo de comprovante
- **Importância:** core business de arrecadação
- **Demo:** gerar Pix, marcar pago, simular upload

### Área do doador
- **Mostra:** impacto, doações, assinatura, carteirinha
- **Importância:** retenção e pertencimento
- **Demo:** login automático, navegação entre abas

---

## Interações que devem funcionar

1. Filtrar animais por espécie, porte ou status
2. Abrir campanha e ver barra de progresso
3. Simular doação Pix completa
4. Login demo e visualizar dashboard do doador
5. Exportar/visualizar carteirinha digital

---

## Dados fictícios necessários

- Planos de assinatura (6 níveis)
- Animais resgatados (6 registros)
- Campanhas ativas (3)
- Mural de apoiadores (5)
- Transparência financeira completa
- Perfil e histórico do doador demo
- Configurações Pix simuladas

---

## Stack técnica

Frontend em **Next.js** e **React**, design system compartilhado em **Tailwind**, backend **NestJS** com **Prisma/MySQL**, filas **Redis**, pagamentos via **Asaas**, deploy em ambiente Node compartilhado. A demo do portfólio usa apenas o frontend com mock local.

---

## Texto curto para card do portfólio

Plataforma completa para abrigos: doações Pix e mensais, transparência em tempo real, campanhas, adoção e área do doador com carteirinha digital.

*(148 caracteres)*

---

## Texto para página do case

**Contexto:** ONGs de proteção animal precisam arrecadar continuamente enquanto demonstram seriedade ao público.

**Problema:** Ferramentas dispersas, processos manuais e pouca visibilidade geram desconfiança e perda de doadores.

**Solução:** Plataforma full stack que integra site, pagamentos, transparência, campanhas e portal do doador — com painel administrativo para a equipe.

**Recursos:** Pix interno, assinaturas, portal de transparência, campanhas, mural LGPD, galeria de adoção, carteirinha digital, PWA.

**Benefícios:** Mais recorrência, mais confiança, menos retrabalho operacional e imagem profissional para captar apoio.

---

## Sugestão de título comercial

**Plataforma de doações e transparência para abrigos de animais**

---

## Sugestão de subtítulo

Transforme visitantes em apoiadores recorrentes — com confiança, clareza e tecnologia profissional.

---

## Benefícios comerciais

- Mais organização financeira e operacional
- Menos retrabalho com comprovantes e planilhas
- Mais controle sobre campanhas e metas
- Melhor tomada de decisão com indicadores visuais
- Atendimento mais rápido ao doador (área self-service)
- Informações centralizadas para equipe e público
- Redução de erros manuais na conciliação
- Imagem profissional que aumenta conversão

---

## Observações para integração no site

1. Use a pasta `build/` em `/public/demo/lar-dos-anjos/`
2. Embutir via iframe (estratégia IFRAME)
3. Login demo: botão na tela `/entrar` ou credenciais em `mock-data/donor.json`
4. Admin não está no build — mencionar no case como escopo adicional
5. Capturar screenshots listadas em `screenshots/README.md`
6. Metadados prontos em `demo-config.json`
