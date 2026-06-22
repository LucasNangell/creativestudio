/** Inicialização da demonstraçãonstraçãonstração de portfólio */
(() => {
  "use strict";

  document.getElementById("demo-reset")?.addEventListener("click", () => {
    if (!window.confirm("Restaurar todos os dados da demonstraçãonstraçãonstração ao estado inicial?")) return;
    window.HTDemoApi?.reset?.();
    window.location.reload();
  });

  const pill = document.getElementById("api-status");
  if (pill) {
    pill.innerHTML = '<span class="dot"></span>Demo ativa';
    pill.classList.add("online");
  }
})();
