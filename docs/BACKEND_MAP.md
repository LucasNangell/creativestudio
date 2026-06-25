# BACKEND MAP — Nangell Creative Studio

Este mapa serve para orientar o desenvolvimento e manutenção das APIs, lógica de negócios, autenticação, segurança, middlewares e serviços de persistência da aplicação.

---

## 1. Stack do Backend e APIs

- **Base:** Next.js Route Handlers (App Router)
- **ORM:** Prisma Client (interagindo com MySQL 8)
- **Autenticação:** Cookies de Sessão (HTTP-Only) criptografados com HMAC (Web Crypto API)
- **Validação de Entrada:** Zod Schemas
- **Segurança:** Headers customizados de CSP/HSTS, rate limiting e sanitização de HTML contra XSS.

---

## 2. Inicialização da Aplicação

Antes de iniciar o Next.js, o script [`scripts/ensure-admin-user.mjs`](file:///e:/Creative%20Studio/creative%20studio/creativesite/scripts/ensure-admin-user.mjs) é executado para garantir a existência de pelo menos um usuário administrador inicial no MySQL (com credenciais do seed ou do `.env`).

---

## 3. Endpoints de API (Route Handlers)

### APIs Públicas

| Endpoint           | Método | Arquivo de Rota                                                                                                                    | Função / Comportamento                                                 |
| :----------------- | :----- | :--------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| `/api/health`      | `GET`  | [`src/app/api/health/route.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/api/health/route.ts)           | Health check rápido para monitorar integridade da aplicação            |
| `/api/demo-health` | `GET`  | [`src/app/api/demo-health/route.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/api/demo-health/route.ts) | Status de conexões das demos                                           |
| `/api/leads`       | `POST` | [`src/app/api/leads/route.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/api/leads/route.ts)             | Criação de leads de diagnóstico ou contato (com honeypot + rate limit) |
| `/api/escopo`      | `POST` | [`src/app/api/escopo/route.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/api/escopo/route.ts)           | Geração de escopo integrando com o Gemini (modelo gemini-3.5-flash)    |

| `/api/analytics/events` | `POST` | [`src/app/api/analytics/events/route.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/api/analytics/events/route.ts) | Rastreamento interno de cliques de conversão e eventos |
| `/api/analytics/pageview` | `POST` | [`src/app/api/analytics/pageview/route.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/api/analytics/pageview/route.ts) | Rastreamento interno de visualizações de página (GeoIP parsing) |

### APIs Administrativas (Privadas — Exigem Autenticação)

Todas estas rotas estão localizadas sob a subpasta [`src/app/api/admin/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/api/admin) e verificam cookies do admin.

| Endpoint                  | Métodos                        | Arquivo / Pasta                                                                                                    | Função Principal                                                      |
| :------------------------ | :----------------------------- | :----------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------- |
| `/api/admin/login`        | `POST`                         | [`login/route.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/api/admin/login/route.ts)   | Validação de credenciais e login de admin (lockout após 5 tentativas) |
| `/api/admin/logout`       | `POST`                         | [`logout/route.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/api/admin/logout/route.ts) | Limpeza do cookie de sessão do administrador                          |
| `/api/admin/leads`        | `GET`, `PUT`, `DELETE`         | [`leads/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/api/admin/leads)                    | Gerenciamento de leads capturados                                     |
| `/api/admin/projects`     | `GET`, `POST`, `PUT`, `DELETE` | [`projects/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/api/admin/projects)              | CRUD do portfólio                                                     |
| `/api/admin/services`     | `GET`, `POST`, `PUT`, `DELETE` | [`services/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/api/admin/services)              | CRUD dos serviços prestados                                           |
| `/api/admin/testimonials` | `GET`, `POST`, `PUT`, `DELETE` | [`testimonials/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/api/admin/testimonials)      | CRUD de avaliações dos clientes                                       |
| `/api/admin/posts`        | `GET`, `POST`, `PUT`, `DELETE` | [`posts/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/api/admin/posts)                    | CRUD do blog (salva conteúdo em markdown)                             |
| `/api/admin/settings`     | `GET`, `PUT`                   | [`settings/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/app/api/admin/settings)              | Parâmetros e variáveis chave do site                                  |

---

## 4. Middlewares e Segurança

- **Middleware de Rotas:** [`src/middleware.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/middleware.ts) intercepta rotas iniciadas com `/admin` (exceto `/admin/login`) e `/adm` para verificar se o cookie de sessão está ativo.
- **Validação de Sessão:** [`src/lib/auth/middleware-utils.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/lib/auth/middleware-utils.ts) implementa `verifySessionFromRequest` para decodificar e checar o hash HMAC do cookie.
- **Segurança de Mutação (APIs):** [`src/lib/auth/require-admin-api.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/lib/auth/require-admin-api.ts) é um wrapper que protege handlers das rotas de API administrativas, retornando `401 Unauthorized` em chamadas não assinadas.
- **Limitação de Rate Limit:** [`src/lib/rate-limit.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/lib/rate-limit.ts) é um limitador simples em memória para evitar bots ou ataques de spam nos formulários de diagnóstico.
- **Sanitização de XSS:** [`src/lib/sanitize.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/lib/sanitize.ts) limpa strings recebidas no payload dos leads.

---

## 5. Validações de Dados (Zod Schemas)

Localizados em [`src/lib/validations/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/lib/validations):

- [`lead.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/lib/validations/lead.ts) — Validação de formulários de contato e diagnóstico (telefone, e-mail, tipos de projeto).
- [`admin-auth.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/lib/validations/admin-auth.ts) — E-mail e senha de login.
- [`lead-admin.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/lib/validations/lead-admin.ts) — Edição interna de notas de leads e status de follow-up.
- [`project.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/lib/validations/project.ts) — Schema para criação/atualização de portfólio.
- [`service.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/lib/validations/service.ts) — Schema para os serviços.
- [`settings.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/lib/validations/settings.ts) — Edição dos parâmetros de controle.
- [`post.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/lib/validations/post.ts) — Validação para artigos do blog.

---

## 6. Camada de Serviços (Regras de Negócio e Acesso ao Banco)

Os serviços em [`src/services/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/services) abstraem as operações do Prisma ORM e implementam fallbacks estáticos offline para quando o MySQL está inacessível:

- **Gestão de Leads:** [`leads-service.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/services/leads-service.ts) persistência dos dados enviados.
- **Projetos/Cases:** [`projects-service.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/services/projects-service.ts) busca do banco e fallback para [`src/data/projects/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/data/projects) se MySQL falhar.
- **Serviços/Soluções:** [`services-service.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/services/services-service.ts) consulta com fallback para [`src/data/services/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/data/services).
- **Blog/Posts:** [`posts-service.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/services/posts-service.ts) processamento de conteúdo em markdown com fallback para [`src/data/blog/`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/data/blog).
- **Analytics do Painel `/adm`:** [`adm-analytics-service.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/services/adm-analytics-service.ts) calcula taxas de conversão de leads, visualizações por país e volume de acessos ao longo de 7d, 30d ou 90d.

---

## 7. Integrações Externas

- **WhatsApp Link Helper:** [`src/lib/whatsapp.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/lib/whatsapp.ts) limpa e formata o link direto para atendimento.
- **GeoIP Parsing:** [`src/lib/geoip.ts`](file:///e:/Creative%20Studio/creative%20studio/creativesite/src/lib/geoip.ts) analisa headers como `x-vercel-ip-country` ou faz fallback geográfico para rastreamento no painel de visualizações.
