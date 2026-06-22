/**
 * Configuração do painel web HT Monitor — versão demonstrativa.
 * Modo demo ativo: todas as chamadas de API são simuladas localmente.
 */
(function () {
  window.HTMONITOR_CONFIG = {
    demoMode: true,
    apiBase: null,
    refreshMs: 2000,
    livePollMs: 500,
  };
})();
