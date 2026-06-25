# DATABASE MAP — Nangell Creative Studio

Este mapa serve para orientar o gerenciamento do banco de dados MySQL, o mapeamento objeto-relacional (ORM) usando o Prisma, sementes (seeds) e comandos utilitários de manutenção do banco.

---

## 1. Stack e Conexão

- **SGBD:** MySQL 8+
- **ORM:** [Prisma Client](file:///e:/Creative%20Studio/creative%20studio/creativesite/prisma/schema.prisma)
- **String de Conexão (Ambiente):** Definida no `.env` via variável `DATABASE_URL` no formato:
  `mysql://USUARIO:SENHA@HOST:3306/NOME_DO_BANCO?charset=utf8mb4`

---

## 2. Arquivos de Controle do Banco

- **Schema Principal:** [`prisma/schema.prisma`](file:///e:/Creative%20Studio/creative%20studio/creativesite/prisma/schema.prisma) — Onde todas as tabelas, tipos de dados e relações são descritos em sintaxe declarativa Prisma.
- **Script de Seed:** [`prisma/seed.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/prisma/seed.ts) — Semeia o banco com o usuário administrador padrão (`admin@nangell.com.br`), depoimentos, serviços, posts iniciais e parametrizações básicas.
- **Migrações SQL:** Localizadas na pasta [`prisma/migrations/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/prisma/migrations). Contém o histórico incremental de scripts SQL gerados para atualizar o banco.
- **Estrutura SQL Bruta:** [`database/schema.sql`](file:///e:/Creative%20Studio/creative%20studio/creativesite/database/schema.sql) — Arquivo SQL completo e estático usado para restaurar ou importar o banco inicial via CLI ou painéis como phpMyAdmin.

---

## 3. Entidades / Tabelas do Banco de Dados

| Tabela (MySQL)      | Model (Prisma)    | Função Principal                                                 | Campos Chave / Relações                                                    |
| :------------------ | :---------------- | :--------------------------------------------------------------- | :------------------------------------------------------------------------- |
| `users`             | `User`            | Usuários administrativos e editores do painel                    | `id`, `email` (único), `passwordHash`, `role` (enum)                       |
| `leads`             | `Lead`            | Leads qualificados capturados em contatos ou diagnósticos        | `id`, `name`, `email`, `phone`, `status` (enum), `internalNotes`           |
| `projects`          | `Project`         | Cases de portfólio exibidos no portal                            | `id`, `slug` (único), `status` (enum), `stack` (JSON), `features` (JSON)   |
| `services`          | `Service`         | Catálogo de serviços prestados                                   | `id`, `slug` (único), `deliverables` (JSON), `status` (enum)               |
| `testimonials`      | `Testimonial`     | Avaliações e depoimentos de clientes                             | `id`, `clientName`, `rating` (Int, default 5), `status` (enum)             |
| `posts`             | `Post`            | Artigos publicados no blog                                       | `id`, `slug` (único), `content` (LongText), `tags` (JSON), `status` (enum) |
| `site_settings`     | `SiteSetting`     | Chaves de configuração configuráveis no painel admin             | `id`, `key` (único), `value` (Text)                                        |
| `analytics_events`  | `AnalyticsEvent`  | Rastreamento interno de cliques em CTAs e interações             | `id`, `eventName`, `leadId` (nulo ou relacionado a `Lead`)                 |
| `demo_sessions`     | `DemoSession`     | Sessões criadas ao interagir com as demos                        | `id`, `demoSlug`, `sessionToken` (único)                                   |
| `demo_interactions` | `DemoInteraction` | Cliques, inserções e ações efetuadas dentro de uma demo          | `id`, `sessionId` (relação Cascade com `DemoSession`), `eventType`         |
| `page_visits`       | `PageVisit`       | Registro individual de pageviews para compor os dados de acessos | `id`, `path`, `ipAddress`, `country`, `city`, `utmSource`                  |

---

## 4. Enums e Tipos Especiais

- **`UserRole`**: `ADMIN`, `EDITOR` (Nível de privilégios de acesso)
- **`LeadStatus`**: `NOVO`, `CONTATO`, `REUNIAO`, `PROPOSTA`, `FECHADO`, `PERDIDO`
- **`ProjectStatus`**: `DRAFT`, `PUBLISHED`, `HIDDEN`
- **`DemoType`**: `NONE`, `NATIVE`, `IFRAME`, `EXTERNAL` (Configuração de como renderizar a demo no portfólio)
- **`ServiceStatus`**: `ACTIVE`, `INACTIVE`
- **`TestimonialStatus`**: `APPROVED`, `PENDING`
- **`PostStatus`**: `DRAFT`, `PUBLISHED`

---

## 5. Comandos de Gerenciamento do Banco

### Em Desenvolvimento (Local)

- **Gerar Cliente Prisma:** `npm run db:generate` (Roda `prisma generate` para atualizar a tipagem do TypeScript).
- **Criar e Aplicar Migration:** `npm run db:migrate` (Roda `prisma migrate dev` para sincronizar alterações feitas no `schema.prisma` com o banco local).
- **Alimentar Banco (Seed):** `npm run db:seed` (Roda o script `prisma/seed.ts` para criar registros iniciais de desenvolvimento).
- **Interface Gráfica (Studio):** `npm run db:studio` (Abre o Prisma Studio em `http://localhost:5555` para ver/editar dados diretamente).

### Em Produção / CI-CD

- **Validar Schema:** `npx prisma validate`
- **Aplicar Migrações Pendentes:** `npx prisma migrate deploy` (Aplica migrations pendentes com segurança sem destruir dados ou rodar fluxo interativo de desenvolvimento).

---

## 6. Cuidados ao Alterar o Schema

> [!CAUTION]
>
> 1. **Nunca execute `prisma migrate dev` em produção**, pois isso pode gerar comandos destrutivos. Utilize sempre `prisma migrate deploy`.
> 2. **Backup Prévio:** Antes de aplicar qualquer nova migração estrutural, faça um backup dump do banco de dados em produção usando ferramentas de CLI ou phpMyAdmin.
> 3. **Modificações de Enums:** Adicionar um novo valor em enums como `LeadStatus` ou `UserRole` requer regenerar os types do Prisma localmente para evitar erros de compilação em builds de produção.
