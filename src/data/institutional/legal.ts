export const politicaPrivacidadeSeo = {
  title: "Política de Privacidade",
  description:
    "Política de privacidade da Nangell Creative Studio em conformidade com a LGPD. Saiba como coletamos, usamos e protegemos seus dados pessoais.",
  keywords: ["LGPD", "política de privacidade", "dados pessoais", "Nangell Creative Studio"],
} as const;

export const termosUsoSeo = {
  title: "Termos de Uso",
  description:
    "Termos de uso do site, demonstrações interativas e serviços da Nangell Creative Studio. Leia as condições de utilização antes de navegar ou utilizar nossas demonstrações.",
  keywords: ["termos de uso", "condições de uso", "demonstrações", "Nangell Creative Studio"],
} as const;

export type LegalSection = {
  id: string;
  title: string;
  content: string[];
};

export const politicaPrivacidadeSections: LegalSection[] = [
  {
    id: "introducao",
    title: "1. Introdução",
    content: [
      "A Nangell Creative Studio (“Nangell”, “nós” ou “nosso”) respeita a privacidade dos visitantes, clientes e usuários de nosso site institucional (nangell.com.br e domínios associados).",
      "Esta Política de Privacidade descreve como coletamos, utilizamos, armazenamos e protegemos seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).",
      "Ao utilizar nosso site, formulários ou demonstrações interativas, você declara ter lido e compreendido esta política.",
    ],
  },
  {
    id: "dados-coletados",
    title: "2. Dados coletados",
    content: [
      "Dados de identificação e contato: nome, e-mail, telefone, empresa e mensagem — fornecidos voluntariamente em formulários de contato, diagnóstico ou newsletter.",
      "Dados de navegação: endereço IP, tipo de navegador, páginas visitadas, tempo de permanência e origem de tráfego — coletados automaticamente via cookies e ferramentas de analytics.",
      "Dados de interação com demonstrações: ações realizadas nas demonstrações interativas (ex.: movimentação de cards, filtros aplicados) — armazenados localmente no navegador (session storage) e não vinculados a identificação pessoal.",
      "Dados de campanha: parâmetros UTM (utm_source, utm_medium, utm_campaign) quando presentes na URL de acesso.",
    ],
  },
  {
    id: "finalidade",
    title: "3. Finalidade do tratamento",
    content: [
      "Responder solicitações de contato, orçamento e diagnóstico comercial.",
      "Enviar propostas, follow-ups e comunicações relacionadas ao serviço solicitado.",
      "Melhorar a experiência do site, medir conversões e otimizar campanhas de marketing.",
      "Cumprir obrigações legais e regulatórias aplicáveis.",
      "Garantir segurança do site e prevenir fraudes ou abusos em formulários.",
    ],
  },
  {
    id: "base-legal",
    title: "4. Base legal",
    content: [
      "Consentimento: quando você marca a opção de consentimento LGPD em formulários.",
      "Execução de contrato ou procedimentos preliminares: quando o tratamento é necessário para atender sua solicitação comercial.",
      "Legítimo interesse: para analytics agregados, segurança e melhoria contínua do site — sempre respeitando seus direitos.",
      "Obrigação legal: quando exigido por autoridade competente.",
    ],
  },
  {
    id: "armazenamento",
    title: "5. Armazenamento e retenção",
    content: [
      "Dados de leads são armazenados em banco de dados seguro (MySQL) em servidores com acesso restrito.",
      "Retemos dados de contato pelo tempo necessário para atender sua solicitação e, posteriormente, por até 5 anos para fins de histórico comercial e obrigações legais — salvo solicitação de exclusão antecipada.",
      "Dados de analytics são retidos conforme políticas do Google Analytics (GA4), tipicamente por 14 meses.",
      "Dados de demonstrações interativas permanecem apenas no seu navegador e são apagados ao encerrar a sessão ou limpar o cache.",
    ],
  },
  {
    id: "compartilhamento",
    title: "6. Compartilhamento de dados",
    content: [
      "Não vendemos, alugamos ou comercializamos seus dados pessoais.",
      "Podemos compartilhar dados com prestadores de serviço essenciais (hospedagem, e-mail transacional, analytics) sob contratos que garantem confidencialidade e conformidade com a LGPD.",
      "Compartilhamento com autoridades públicas ocorre apenas quando exigido por lei ou ordem judicial.",
    ],
  },
  {
    id: "cookies",
    title: "7. Cookies e tecnologias de rastreamento",
    content: [
      "Utilizamos cookies essenciais para funcionamento do site e cookies analíticos (Google Analytics 4 / Google Tag Manager) para medir tráfego e conversões.",
      "Cookies de sessão nas demonstrações interativas armazenam estado local da simulação — sem identificação pessoal.",
      "Você pode gerenciar cookies nas configurações do seu navegador. A desativação de cookies analíticos não impede o uso do site, mas limita nossa capacidade de melhorar a experiência com base em dados.",
    ],
  },
  {
    id: "direitos",
    title: "8. Direitos do titular (LGPD)",
    content: [
      "Confirmação da existência de tratamento e acesso aos seus dados.",
      "Correção de dados incompletos, inexatos ou desatualizados.",
      "Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade.",
      "Portabilidade dos dados a outro fornecedor, quando aplicável.",
      "Eliminação dos dados tratados com base no consentimento.",
      "Informação sobre compartilhamento e revogação do consentimento.",
      "Para exercer seus direitos, entre em contato pelo e-mail contato@nangell.com.br. Responderemos em até 15 dias úteis.",
    ],
  },
  {
    id: "seguranca",
    title: "9. Segurança",
    content: [
      "Adotamos medidas técnicas e organizacionais: criptografia em trânsito (HTTPS/TLS), controle de acesso, sanitização de inputs, rate limiting em formulários e backups regulares.",
      "Nenhum sistema é 100% seguro. Em caso de incidente que afete seus dados, notificaremos você e a ANPD conforme exigido pela LGPD.",
    ],
  },
  {
    id: "contato-dpo",
    title: "10. Contato",
    content: [
      "Controlador de dados: Nangell Creative Studio.",
      "E-mail para privacidade e LGPD: contato@nangell.com.br.",
      "Encarregado (DPO): disponível pelo mesmo canal de contato.",
    ],
  },
  {
    id: "atualizacao",
    title: "11. Atualização desta política",
    content: [
      "Esta política pode ser atualizada periodicamente. A data da última revisão será indicada no topo desta página.",
      "Alterações relevantes serão comunicadas por aviso no site. Recomendamos revisitar esta página regularmente.",
      "Última atualização: junho de 2026.",
    ],
  },
];

export const termosUsoSections: LegalSection[] = [
  {
    id: "aceitacao",
    title: "1. Aceitação dos termos",
    content: [
      "Ao acessar e utilizar o site da Nangell Creative Studio, você concorda com estes Termos de Uso. Se não concordar, interrompa o uso imediatamente.",
      "Estes termos aplicam-se a todas as páginas públicas, demonstrações interativas, formulários e conteúdos disponibilizados no domínio nangell.com.br e subdomínios associados.",
    ],
  },
  {
    id: "uso-do-site",
    title: "2. Uso do site",
    content: [
      "O site destina-se a apresentar serviços, portfólio, demonstrações técnicas e captar leads comerciais.",
      "É proibido utilizar o site para fins ilícitos, enviar spam, tentar acessar áreas restritas sem autorização ou realizar engenharia reversa de componentes proprietários.",
      "Reservamo-nos o direito de bloquear acessos que violem estes termos ou representem risco à infraestrutura.",
    ],
  },
  {
    id: "demonstracoes",
    title: "3. Uso das demonstrações interativas",
    content: [
      "As demonstrações em /demo/* são simulações frontend com dados fictícios, destinadas a ilustrar capacidades técnicas — não constituem produtos finais ou contratos de prestação de serviço.",
      "O comportamento, dados e funcionalidades das demonstrações podem ser alterados, atualizados ou descontinuados sem aviso prévio.",
      "É vedado utilizar dados reais de terceiros, informações sensíveis ou conteúdo protegido por direitos autorais dentro das simulações.",
    ],
  },
  {
    id: "dados-mockados",
    title: "4. Dados mockados",
    content: [
      "Todos os dados exibidos nas demonstrações (nomes, empresas, valores financeiros, logs, leads fictícios) são inteiramente simulados e não representam informações reais.",
      "Dados inseridos por você durante a interação com demonstrações são armazenados apenas localmente no seu navegador (session storage) e não são transmitidos ao nosso servidor.",
      "Ao limpar o cache ou encerrar a sessão, esses dados são removidos automaticamente.",
    ],
  },
  {
    id: "limitacoes",
    title: "5. Limitações de responsabilidade",
    content: [
      "O site e as demonstrações são fornecidos “como estão”, sem garantias expressas ou implícitas de disponibilidade ininterrupta ou adequação a finalidade específica.",
      "A Nangell não se responsabiliza por decisões de negócio tomadas com base exclusivamente em dados ou comportamentos das simulações.",
      "Links para sites de terceiros são informativos; não nos responsabilizamos pelo conteúdo ou práticas de privacidade de sites externos.",
    ],
  },
  {
    id: "propriedade-intelectual",
    title: "6. Propriedade intelectual",
    content: [
      "Todo o conteúdo do site — textos, design, código-fonte, logotipos, mockups, demonstrações e documentação — é propriedade da Nangell Creative Studio ou licenciado para uso exclusivo.",
      "É proibida a reprodução, distribuição, modificação ou uso comercial de qualquer material sem autorização prévia por escrito.",
      "Marcas, nomes comerciais e logotipos de terceiros exibidos em cases ou referências pertencem aos respectivos titulares.",
    ],
  },
  {
    id: "formularios",
    title: "7. Formulários e comunicações",
    content: [
      "Ao enviar dados por formulários de contato ou diagnóstico, você declara que as informações são verdadeiras e autoriza o contato comercial conforme a Política de Privacidade.",
      "Reservamo-nos o direito de recusar ou ignorar submissões abusivas, repetitivas ou com conteúdo inadequado.",
    ],
  },
  {
    id: "contato",
    title: "8. Contato",
    content: [
      "Dúvidas sobre estes Termos de Uso: contato@nangell.com.br.",
      "WhatsApp comercial: disponível na página de contato do site.",
    ],
  },
  {
    id: "alteracoes",
    title: "9. Alterações dos termos",
    content: [
      "Podemos atualizar estes Termos de Uso a qualquer momento. A versão vigente estará sempre disponível nesta página, com a data da última revisão.",
      "O uso continuado do site após alterações constitui aceitação dos novos termos.",
      "Última atualização: junho de 2026.",
    ],
  },
];
