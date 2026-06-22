/** HT Monitor — SPA principal com atualização ao vivo */
(() => {
  "use strict";

  const LIVE_MS = window.HTMONITOR_CONFIG?.livePollMs || 500;
  const API_CHECK_MS = window.HTMONITOR_CONFIG?.refreshMs || 2000;

  const state = {
    view: "dashboard",
    settings: null,
    patterns: [],
    selectedPatternId: null,
    renameBuiltin: [],
    customVars: [],
    moveRules: [],
    moveFilenameVars: [],
    dragId: null,
    liveBusy: false,
    modalOpen: false,
    preventBackdropClose: false,
  };

  const sig = { renameHist: "", moveHist: "", dashRenameHist: "", dashMoveHist: "", errors: "", dashboard: "", monFolders: "", renameFolders: "", moveRules: "" };

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  function toast(msg, type = "success") {
    const stack = $("#toasts");
    const el = document.createElement("div");
    el.className = `toast ${type}`;
    el.textContent = msg;
    stack.appendChild(el);
    setTimeout(() => el.remove(), 4500);
  }

  async function safe(fn, okMsg) {
    try {
      const r = await fn();
      if (okMsg) toast(okMsg);
      return r;
    } catch (e) {
      toast(e.message || "Erro desconhecido", "error");
      throw e;
    }
  }

  /** Ação do usuário: executa API e atualiza a UI na hora */
  async function mutate(fn, okMsg) {
    const r = await safe(fn, okMsg);
    await flushRefresh();
    return r;
  }

  async function flushRefresh() {
    await Promise.all([loadDashboard(true), refreshView(state.view, true)]);
  }

  async function refreshView(viewId, silent = false) {
    const loaders = {
      dashboard: () => loadDashboard(true),
      monitor: () => loadMonitor(true),
      rename: () => loadRename(true),
      move: () => loadMove(true),
      errors: () => loadErrors(true),
    };
    const fn = loaders[viewId];
    if (!fn) return;
    if (silent) {
      try { await fn(); } catch (_) { }
    } else {
      await safe(fn);
    }
  }

  function isTabActive(tabId) {
    return $(`#${tabId}`)?.classList.contains("active") ?? false;
  }

  function openModal(title, bodyHtml, footHtml = "", opts = {}) {
    state.modalOpen = true;
    state.preventBackdropClose = !!opts.preventBackdropClose;
    $("#modal").classList.toggle("modal--wide", !!opts.wide);
    $("#modal-title").innerHTML = title;
    $("#modal-body").innerHTML = bodyHtml;
    $("#modal-foot").innerHTML = footHtml;
    $("#modal").hidden = false;
  }
  function closeModal() {
    state.modalOpen = false;
    state.preventBackdropClose = false;
    $("#modal").classList.remove("modal--wide");
    $("#modal").hidden = true;
  }
  $("#modal-close").onclick = closeModal;
  $(".modal__backdrop").onclick = () => {
    if (!state.preventBackdropClose) {
      closeModal();
    }
  };

  function promptPath(title, hint) {
    return new Promise((resolve) => {
      openModal(
        title,
        HTForms.pathPromptHtml(title, hint),
        `<button class="btn btn--ghost modal-cancel">Cancelar</button><button class="btn btn--primary modal-ok">Confirmar</button>`
      );
      const input = $("#modal-input");
      input.focus();
      $(".modal-cancel").onclick = () => { closeModal(); resolve(null); };
      $(".modal-ok").onclick = () => { const v = input.value.trim(); closeModal(); resolve(v || null); };
      input.onkeydown = (e) => { if (e.key === "Enter") $(".modal-ok").click(); };
    });
  }

  function updatePatternPreview() {
    const f = $("#form-pattern");
    const box = $("#pattern-preview");
    if (!f?.pattern || !box) return;
    box.textContent = HTForms.previewRenamePattern(f.pattern.value, state.customVars);
  }

  function renderBuiltinVars(items) {
    const list = items?.length ? items : state.renameBuiltin;
    renderRenameVarPopover();

    const ul = $("#builtin-vars");
    if (!ul) return;
    ul.innerHTML = (list || []).map(([key, desc]) => {
      const varName = String(key).replace(/^\{|\}$/g, "");
      const token = `{${varName}}`;
      return `<li data-var="${esc(varName)}" title="Clique para inserir na expressão"><code>${esc(token)}</code><span>${esc(desc)}</span></li>`;
    }).join("");
    ul.querySelectorAll("li[data-var]").forEach((li) => {
      li.onclick = () => {
        const ta = $("#form-pattern")?.pattern;
        if (!ta) return;
        const token = `{${li.dataset.var}}`;
        const pos = ta.selectionStart ?? ta.value.length;
        ta.value = ta.value.slice(0, pos) + token + ta.value.slice(pos);
        ta.focus();
        updatePatternPreview();
      };
    });
  }

  function esc(s) {
    return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  }

  const titles = { dashboard: "Dashboard", monitor: "Banco de Dados", rename: "Renomeador", move: "Movimentações", errors: "Log de Erros" };

  function switchView(id) {
    state.view = id;
    $$(".nav-item").forEach((b) => b.classList.toggle("active", b.dataset.view === id));
    $$(".view").forEach((v) => v.classList.toggle("view--active", v.id === `view-${id}`));
    $("#page-title").textContent = titles[id] || id;
    $("#sidebar").classList.remove("open");
    $("#sidebar-overlay").classList.remove("open");
    refreshView(id, true);
  }

  $$("#nav .nav-item").forEach((b) => b.addEventListener("click", () => switchView(b.dataset.view)));
  $("#menu-toggle").onclick = () => { $("#sidebar").classList.toggle("open"); $("#sidebar-overlay").classList.toggle("open"); };
  $("#sidebar-overlay").onclick = () => { $("#sidebar").classList.remove("open"); $("#sidebar-overlay").classList.remove("open"); };

  $$(".tabs .tab").forEach((t) => t.addEventListener("click", () => {
    const parent = t.closest(".view");
    parent.querySelectorAll(".tab").forEach((x) => x.classList.remove("active"));
    parent.querySelectorAll(".tab-panel").forEach((x) => x.classList.remove("active"));
    t.classList.add("active");
    parent.querySelector(`#${t.dataset.tab}`)?.classList.add("active");
    liveTick();
  }));

  async function loadDashboard(silent = false) {
    const [st, renameFolders] = await Promise.all([
      silent ? HTApi.status().catch(() => null) : safe(() => HTApi.status()),
      HTApi.renameFolders().catch(() => [])
    ]);
    if (!st) return;
    const seen = new Set();
    const uniqueRenameCount = (renameFolders || []).filter((f) => {
      const norm = f.path?.replace(/[\\/]+/g, "\\").toLowerCase().trim();
      if (!norm || seen.has(norm)) return false;
      seen.add(norm);
      return true;
    }).length;
    const key = JSON.stringify({ st, uniqueRenameCount });
    if (silent && key === sig.dashboard) return;
    sig.dashboard = key;

    const cardsHtml = `
      <div class="stat-card stat-card--split" style="display: flex; flex-direction: column; gap: 16px;">
        <div class="stat-card__label" style="font-weight: 700; border-bottom: 1px solid var(--border); padding-bottom: 8px;">${_t("card_banco_dados")}</div>
        <div style="display: flex; justify-content: space-between; gap: 20px;">
          <div style="flex: 1;">
            <div class="stat-card__label" style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 8px;">${_t("lbl_monitoramento")}</div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="stat-card__badge ${st.monitor?.active ? "on" : "off"}" style="font-size: 0.82rem; padding: 4px 12px; margin-top: 0; display: inline-flex; align-items: center;">
                <span class="status-dot ${st.monitor?.active ? "on" : "off"}"></span>
                ${st.monitor?.active ? _t("status_ativo") : _t("status_parado")}
              </span>
              <span style="font-size: 0.82rem; color: var(--text-muted);">${st.monitor?.folders === 1 ? `1 ${_t("status_pasta", "pasta")}` : `${st.monitor?.folders || 0} ${_t("status_pastas", "pastas")}`}</span>
            </div>
            ${!st.monitor?.active ? `<button class="btn btn--ghost btn--sm stat-card__restart" style="margin-top: 10px; width: 100%;" data-restart="restartMonitor">${_t("btn_reestabelecer")}</button>` : ""}
          </div>
          <div style="flex: 1; border-left: 1px solid var(--border); padding-left: 20px;">
            <div class="stat-card__label" style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 8px;">${_t("lbl_conexao")}</div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="stat-card__badge ${st.database?.connected ? "on" : "off"}" style="font-size: 0.82rem; padding: 4px 12px; margin-top: 0; display: inline-flex; align-items: center;">
                <span class="status-dot ${st.database?.connected ? "on" : "off"}"></span>
                ${st.database?.connected ? _t("status_ativa") : _t("status_inativa")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="stat-card" style="display: flex; flex-direction: column; gap: 16px;">
        <div class="stat-card__label" style="font-weight: 700; border-bottom: 1px solid var(--border); padding-bottom: 8px;">${_t("card_renomeador")}</div>
        <div style="display: flex; flex-direction: column;">
          <div class="stat-card__label" style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 8px;">${_t("lbl_monitoramento")}</div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="stat-card__badge ${st.rename?.active ? "on" : "off"}" style="font-size: 0.82rem; padding: 4px 12px; margin-top: 0; display: inline-flex; align-items: center;">
              <span class="status-dot ${st.rename?.active ? "on" : "off"}"></span>
              ${st.rename?.active ? _t("status_ativo") : _t("status_parado")}
            </span>
            <span style="font-size: 0.82rem; color: var(--text-muted);">${uniqueRenameCount === 1 ? `1 ${_t("status_pasta", "pasta")}` : `${uniqueRenameCount} ${_t("status_pastas", "pastas")}`}</span>
          </div>
          ${!st.rename?.active ? `<button class="btn btn--ghost btn--sm stat-card__restart" style="margin-top: 10px; width: 100%;" data-restart="restartRename">${_t("btn_reestabelecer")}</button>` : ""}
        </div>
      </div>

      <div class="stat-card" style="display: flex; flex-direction: column; gap: 16px;">
        <div class="stat-card__label" style="font-weight: 700; border-bottom: 1px solid var(--border); padding-bottom: 8px;">${_t("card_movimentacoes")}</div>
        <div style="display: flex; flex-direction: column;">
          <div class="stat-card__label" style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 8px;">${_t("lbl_monitoramento")}</div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="stat-card__badge ${st.move?.active ? "on" : "off"}" style="font-size: 0.82rem; padding: 4px 12px; margin-top: 0; display: inline-flex; align-items: center;">
              <span class="status-dot ${st.move?.active ? "on" : "off"}"></span>
              ${st.move?.active ? _t("status_ativo") : _t("status_parado")}
            </span>
            <span style="font-size: 0.82rem; color: var(--text-muted);">${st.move?.rules === 1 ? `1 ${_t("status_regra_ativa", "regra ativa")}` : `${st.move?.rules || 0} ${_t("status_regras_ativas", "regras ativas")}`}</span>
          </div>
          ${!st.move?.active ? `<button class="btn btn--ghost btn--sm stat-card__restart" style="margin-top: 10px; width: 100%;" data-restart="restartMove">${_t("btn_reestabelecer")}</button>` : ""}
        </div>
      </div>
    `;

    $("#status-cards").innerHTML = cardsHtml;

    $$(".stat-card__restart").forEach((b) => {
      b.onclick = () => {
        const fn = { restartMonitor: HTApi.restartMonitor, restartRename: HTApi.restartRename, restartMove: HTApi.restartMove }[b.dataset.restart];
        if (fn) mutate(fn, "Serviço reiniciando");
      };
    });
    await loadDashboardHistories(silent);
  }

  async function loadDashboardHistories(silent = false) {
    const [rename, move] = await Promise.all([
      silent ? HTApi.renameHistory().catch(() => null) : safe(() => HTApi.renameHistory()),
      silent ? HTApi.moveHistory().catch(() => null) : safe(() => HTApi.moveHistory()),
    ]);
    if (rename != null) {
      renderRenameHistory(rename, silent, {
        target: "#dashboard-rename-hist-table tbody",
        sigKey: "dashRenameHist",
        limit: 30,
      });
    }
    if (move != null) {
      renderMoveHistory(move, silent, {
        target: "#dashboard-move-hist-table tbody",
        sigKey: "dashMoveHist",
        limit: 30,
      });
    }
  }

  // ---------- Monitor ----------
  async function loadMonitor(silent = false) {
    const settings = silent
      ? await HTApi.settings().catch(() => null)
      : await safe(() => HTApi.settings());
    if (!settings) return;
    state.settings = settings;
    const m = settings.mysql || {};
    const f = $("#form-mysql");
    if (document.activeElement?.closest("#form-mysql") == null) {
      f.host.value = m.host || "";
      f.user.value = m.user || "";
      f.password.value = m.password === "********" ? "" : (m.password || "");
      f.database.value = m.database || "";
    }
    const api = settings.monitor?.api || {};
    const af = $("#form-api");
    if (document.activeElement?.closest("#form-api") == null) {
      af.enabled.checked = api.enabled !== false;
      af.host.value = api.host || "127.0.0.1";
      af.port.value = api.port || 8787;
    }
    renderMonFolders(settings.monitor?.folders || [], silent);
    updateMonitorStatusHint(silent);
  }

  async function updateMonitorStatusHint(silent = false) {
    const st = silent ? await HTApi.status().catch(() => null) : await safe(() => HTApi.status());
    const el = $("#monitor-status-hint");
    if (!el || !st) return;
    const mon = st.monitor || {};
    if (!mon.folders) {
      el.textContent = "Nenhuma pasta configurada — adicione pastas acima para iniciar o monitoramento.";
    } else if (mon.active) {
      el.textContent = `Monitoramento ativo em ${mon.folders} pasta(s).`;
    } else {
      el.textContent = `Monitoramento parado (${mon.folders} pasta(s) configuradas). Use «Reestabelecer monitoramento» ou ↻ Reiniciar no topo.`;
    }
  }

  function renderMonFolders(folders, silent = false) {
    const key = JSON.stringify(folders);
    if (silent && key === sig.monFolders) return;
    sig.monFolders = key;
    const ul = $("#mon-folder-list");
    if (!folders.length) { ul.innerHTML = '<li class="empty-state">Nenhuma pasta configurada</li>'; return; }
    ul.innerHTML = folders.map((p) => `
      <li><span>${esc(p)}</span><button class="btn btn--ghost btn--sm" data-path="${esc(p)}" data-del-mon>Remover</button></li>`).join("");
    ul.querySelectorAll("[data-del-mon]").forEach((b) =>
      b.onclick = () => mutate(() => HTApi.removeMonitorFolder(b.dataset.path), "Removida"));
  }

  $("#btn-save-mysql").onclick = () => mutate(async () => {
    const f = $("#form-mysql");
    await HTApi.saveMysql({ host: f.host.value, user: f.user.value, password: f.password.value, database: f.database.value });
  }, "MySQL salvo");

  $("#btn-test-mysql").onclick = () => safe(async () => {
    const f = $("#form-mysql");
    await HTApi.testMysql({ host: f.host.value, user: f.user.value, password: f.password.value, database: f.database.value });
  }, "Conexão OK");

  $("#btn-save-api").onclick = () => mutate(async () => {
    const af = $("#form-api");
    await HTApi.saveMonitorApi({ enabled: af.enabled.checked, host: af.host.value, port: +af.port.value });
  }, "API salva");

  $("#btn-add-mon-folder").onclick = async () => {
    const p = await promptPath(
      "Adicionar pasta de sync",
      "Informe o caminho UNC ou local. O serviço varrerá PDFs recursivamente e registrará no MySQL."
    );
    if (p) await mutate(() => HTApi.addMonitorFolder(p), "Pasta adicionada");
  };

  $("#btn-sync").onclick = () => mutate(() => HTApi.syncMonitor(), "Sincronização solicitada");

  $("#btn-restart-monitor").onclick = () => mutate(() => HTApi.restartMonitor(), "Monitoramento reiniciando");

  // ---------- Rename ----------
  async function loadRename(silent = false) {
    const data = silent
      ? await HTApi.renamePatterns().catch(() => null)
      : await safe(() => HTApi.renamePatterns());
    if (!data) return;
    state.patterns = (data?.patterns || []).map((p) => ({
      ...p,
      pattern: HTForms.toFrontendPattern(p.pattern),
    }));
    const rawBuiltin = data?.builtin || [];
    const mapped = [];
    const seen = new Set();
    rawBuiltin.forEach(([key, desc]) => {
      let k = key.toUpperCase();
      let d = desc;
      if (k === "{MARCADOR}" || k === "MARCADOR") {
        k = "{PART}";
        d = "Capa ou Miolo (ou vazio)";
      }
      if (k === "{MARCADOR_STR}" || k === "MARCADOR_STR") {
        k = "{PART}";
        d = "Capa ou Miolo (ou vazio)";
      }
      const normKey = k.replace(/^\{|\}$/g, "");
      if (!seen.has(normKey)) {
        seen.add(normKey);
        mapped.push([`{${normKey}}`, d]);
      }
    });
    state.renameBuiltin = mapped;
    renderBuiltinVars(state.renameBuiltin);
    renderPatternList();
    if (state.patterns.length && !state.selectedPatternId) {
      state.selectedPatternId = state.patterns[0].id;
      selectPattern(state.selectedPatternId);
    }
    const vars = silent
      ? await HTApi.renameVariables().catch(() => [])
      : await HTApi.renameVariables();
    state.customVars = vars || [];
    renderVars(vars);
    const folders = silent
      ? await HTApi.renameFolders().catch(() => [])
      : await HTApi.renameFolders();
    renderRenameFolders(folders, silent);
    await loadRenameErrorPolicy(silent);
    await loadRenameHistory(silent);
  }

  async function loadRenameErrorPolicy(silent = false) {
    const pol = silent
      ? await HTApi.renameErrorPolicy().catch(() => null)
      : await safe(() => HTApi.renameErrorPolicy());
    if (!pol) return;
    const f = $("#form-rename-errors");
    if (!f || document.activeElement?.closest("#form-rename-errors")) return;
    f.on_db_missing.value = pol.on_db_missing || "log";
    f.on_file_error.value = pol.on_file_error || "log";
    f.on_db_error.value = pol.on_db_error || "retry";
    f.retry_delay_sec.value = pol.retry_delay_sec ?? 30;
  }

  async function loadRenameHistory(silent = false) {
    const rows = silent
      ? await HTApi.renameHistory().catch(() => null)
      : await safe(() => HTApi.renameHistory());
    if (rows == null) return;
    renderRenameHistory(rows, silent);
  }

  function renderPatternList() {
    const ul = $("#pattern-list");
    ul.innerHTML = state.patterns.map((p) =>
      `<li class="${p.id === state.selectedPatternId ? "active" : ""}" data-id="${esc(p.id)}">${esc(p.name)}</li>`
    ).join("") || '<li class="empty-state">Nenhum padrão</li>';
    ul.querySelectorAll("li[data-id]").forEach((li) => li.onclick = () => {
      state.selectedPatternId = li.dataset.id;
      selectPattern(li.dataset.id);
      renderPatternList();
    });
  }

  function selectPattern(id) {
    const p = state.patterns.find((x) => x.id === id);
    if (!p) return;
    const f = $("#form-pattern");
    if (document.activeElement?.closest("#form-pattern") == null) {
      f.name.value = p.name;
      f.pattern.value = p.pattern;
    }
    updatePatternPreview();
  }

  function renderVars(vars) {
    state.customVars = vars || [];
    updatePatternPreview();
    renderRenameVarPopover();

    const ul = $("#var-list");
    if (!ul) return;
    ul.innerHTML = state.customVars.map((v) =>
      `<li><span>{${esc(v.key)}} = ${esc(v.value)}</span><button data-key="${esc(v.key)}" data-del-var>×</button></li>`
    ).join("");
    ul.querySelectorAll("[data-del-var]").forEach((b) =>
      b.onclick = () => mutate(() => HTApi.deleteVariable(b.dataset.key), "Removida"));
  }

  function renderRenameVarPopover() {
    const renamePopover = $("#rename-var-popover");
    if (!renamePopover) return;
    const list = state.renameBuiltin || [];
    const customList = state.customVars || [];
    const allVars = [
      ...list.map(([key, desc]) => {
        const varName = String(key).replace(/^\{|\}$/g, "");
        return [varName, desc];
      }),
      ...customList.map(v => [v.key, `Variável personalizada: ${v.value}`])
    ];
    renamePopover.innerHTML = allVars.map(([key, desc]) =>
      `<div class="var-popover-item" data-var="${esc(key)}">
        <code>{${esc(key)}}</code>
        <span>${esc(desc)}</span>
      </div>`
    ).join("");
  }

  function renderRenameFolders(folders, silent = false) {
    const seen = new Set();
    const uniqueFolders = (folders || []).filter((f) => {
      const norm = f.path?.replace(/[\\/]+/g, "\\").toLowerCase().trim();
      if (!norm || seen.has(norm)) return false;
      seen.add(norm);
      return true;
    });
    const key = JSON.stringify(uniqueFolders);
    if (silent && key === sig.renameFolders) return;
    sig.renameFolders = key;
    const el = $("#rename-folder-list");
    if (!uniqueFolders.length) { el.innerHTML = '<div class="empty-state">Nenhuma pasta</div>'; return; }
    el.innerHTML = uniqueFolders.map((f) => {
      const ignoredText = f.ignored_subfolders && f.ignored_subfolders.length 
        ? `<span style="font-size: 0.85em; color: rgba(255,255,255,0.45); margin-left: 8px;" title="Subpastas ignoradas: ${esc(f.ignored_subfolders.join(', '))}">[ignora: ${esc(f.ignored_subfolders.join(', '))}]</span>`
        : '';
      return `
      <div class="folder-row">
        <span>${esc(f.path)} ${ignoredText}</span>
        <select data-path="${esc(f.path)}" class="pattern-select">
          ${state.patterns.map((p) => `<option value="${esc(p.id)}" ${p.id === f.pattern_id ? "selected" : ""}>${esc(p.name)}</option>`).join("")}
        </select>
        <button class="btn btn--ghost btn--sm" data-rm-ren="${esc(f.path)}">Remover</button>
      </div>`;
    }).join("");
    el.querySelectorAll(".pattern-select").forEach((s) =>
      s.onchange = () => mutate(() => HTApi.assignPattern(s.dataset.path, s.value)));
    el.querySelectorAll("[data-rm-ren]").forEach((b) =>
      b.onclick = () => mutate(() => HTApi.removeRenameFolder(b.dataset.rmRen), "Removida"));
  }

  function renderRenameHistory(rows, silent = false, opts = {}) {
    const target = opts.target || "#rename-hist-table tbody";
    const sigKey = opts.sigKey || "renameHist";
    const limit = opts.limit || 50;
    const slice = (rows || []).slice(0, limit);
    const key = JSON.stringify(slice);
    if (silent && key === sig[sigKey]) return;
    sig[sigKey] = key;
    const tb = $(target);
    if (!tb) return;
    tb.innerHTML = slice.map((r) => `
      <tr><td>${esc((r.timestamp || "").split(" ")[1] || r.timestamp)}</td><td>${esc(r.original_name)}</td><td>${esc(r.new_name)}</td>
      <td class="${(r.status || "").startsWith("Erro") || (r.status || "").startsWith("Falha") ? "badge-err" : "badge-ok"}">${esc(r.status)}</td></tr>`).join("") || '<tr><td colspan="4" class="empty-state">Sem registros</td></tr>';
  }

  $("#btn-new-pattern").onclick = () => {
    state.selectedPatternId = null;
    $("#form-pattern").reset();
    renderPatternList();
    updatePatternPreview();
  };
  $("#btn-save-pattern").onclick = () => mutate(async () => {
    const f = $("#form-pattern");
    const body = { name: f.name.value, pattern: HTForms.toBackendPattern(f.pattern.value) };
    if (state.selectedPatternId) await HTApi.updatePattern(state.selectedPatternId, body);
    else {
      const r = await HTApi.createPattern(body);
      state.selectedPatternId = r?.find?.((p) => p.name === body.name)?.id || r?.[r.length - 1]?.id;
    }
  }, "Padrão salvo");

  $("#btn-del-pattern").onclick = () => {
    if (!state.selectedPatternId) return;
    mutate(() => HTApi.deletePattern(state.selectedPatternId), "Excluído");
  };

  const btnAddVar = $("#btn-add-var");
  if (btnAddVar) {
    btnAddVar.onclick = () => mutate(async () => {
      await HTApi.saveVariable({ key: $("#var-key").value, value: $("#var-value").value });
      $("#var-key").value = "";
      $("#var-value").value = "";
    }, "Variável salva");
  }

  function promptRenameFolder(title, hint) {
    return new Promise((resolve) => {
      openModal(
        title,
        HTForms.renameFolderPromptHtml(title, hint),
        `<button class="btn btn--ghost modal-cancel">Cancelar</button><button class="btn btn--primary modal-ok">Confirmar</button>`
      );
      const input = $("#modal-input");
      const ignoredInput = $("#modal-ignored");
      input.focus();
      $(".modal-cancel").onclick = () => { closeModal(); resolve(null); };
      $(".modal-ok").onclick = () => {
        const pathVal = input.value.trim();
        const ignoredVal = ignoredInput.value.trim();
        closeModal();
        if (!pathVal) resolve(null);
        else resolve({ path: pathVal, ignored: ignoredVal });
      };
      input.onkeydown = (e) => { if (e.key === "Enter") $(".modal-ok").click(); };
      ignoredInput.onkeydown = (e) => { if (e.key === "Enter") $(".modal-ok").click(); };
    });
  }

  $("#btn-add-ren-folder").onclick = async () => {
    const res = await promptRenameFolder(
      "Pasta de renomeação",
      "PDFs nesta pasta serão renomeados automaticamente conforme o padrão associado."
    );
    if (res && res.path) {
      const pid = state.selectedPatternId || state.patterns[0]?.id || "default";
      const ignored_list = res.ignored ? res.ignored.split(",").map(x => x.trim()).filter(Boolean) : [];
      await mutate(() => HTApi.addRenameFolder(res.path, pid, ignored_list), "Adicionada");
    }
  };

  $("#btn-clear-ren-hist").onclick = () => mutate(() => HTApi.clearRenameHistory(), "Limpo");

  $("#btn-save-rename-errors").onclick = () => mutate(async () => {
    const f = $("#form-rename-errors");
    await HTApi.saveRenameErrorPolicy({
      on_db_missing: f.on_db_missing.value,
      on_file_error: f.on_file_error.value,
      on_db_error: f.on_db_error.value,
      retry_delay_sec: +f.retry_delay_sec.value || 30,
    });
  }, "Política salva");

  // ---------- Move ----------
  async function loadMove(silent = false) {
    const rules = silent
      ? await HTApi.moveRules().catch(() => null)
      : await safe(() => HTApi.moveRules());
    if (rules == null) return;
    state.moveRules = rules;
    const varsData = silent
      ? await HTApi.moveFilenameVariables().catch(() => null)
      : await safe(() => HTApi.moveFilenameVariables());
    if (varsData?.builtin) state.moveFilenameVars = varsData.builtin;
    renderMoveRules(silent);
    await loadMoveErrorPolicy(silent);
    await loadMoveHistory(silent);
  }

  async function loadMoveErrorPolicy(silent = false) {
    const pol = silent
      ? await HTApi.moveErrorPolicy().catch(() => null)
      : await safe(() => HTApi.moveErrorPolicy());
    if (!pol) return;
    const f = $("#form-move-errors");
    if (!f || document.activeElement?.closest("#form-move-errors")) return;
    f.on_file_error.value = pol.on_file_error || "log";
    f.on_db_missing.value = pol.on_db_missing || "log";
    f.on_db_error.value = pol.on_db_error || "retry";
    f.retry_delay_sec.value = pol.retry_delay_sec ?? 30;
  }

  async function loadMoveHistory(silent = false) {
    const rows = silent
      ? await HTApi.moveHistory().catch(() => null)
      : await safe(() => HTApi.moveHistory());
    if (rows == null) return;
    renderMoveHistory(rows, silent);
  }

  function ruleDisplayName(r) {
    const n = String(r?.name ?? "").trim();
    return n || r?.id || "Regra";
  }

  function renderMoveRules(silent = false) {
    const key = JSON.stringify(state.moveRules);
    if (silent && key === sig.moveRules) return;
    sig.moveRules = key;
    const ul = $("#move-rules-list");
    if (!state.moveRules?.length) { ul.innerHTML = '<li class="empty-state">Nenhuma regra — clique em Nova regra</li>'; return; }
    ul.innerHTML = state.moveRules.map((r) => {
      const label = ruleDisplayName(r);
      return `
      <li class="drag-item" draggable="true" data-id="${esc(r.id)}">
        <span class="drag-handle">⠿</span>
        <div class="drag-item__body">
          <div class="drag-item__title">${r.enabled !== false ? "●" : "○"} ${esc(label)} <span class="drag-item__mode">${esc(r.mode)}</span></div>
          <div class="drag-item__meta">${esc(r.source_dir)} → ${esc(r.base_rede)} / ${esc(r.default_subfolder)}</div>
        </div>
        <div class="drag-item__actions">
          <button class="btn btn--ghost btn--sm" data-edit="${esc(r.id)}" title="Editar regra">Editar</button>
          <button class="btn btn--ghost btn--sm" data-dup="${esc(r.id)}" title="Duplicar configurações">Duplicar</button>
          <button class="btn btn--ghost btn--sm" data-del="${esc(r.id)}" title="Excluir regra">Excluir</button>
        </div>
      </li>`;
    }).join("");

    ul.querySelectorAll(".drag-item").forEach(bindDrag);
    ul.querySelectorAll("[data-edit]").forEach((b) => b.onclick = () => openRuleModal(b.dataset.edit));
    ul.querySelectorAll("[data-dup]").forEach((b) => b.onclick = () => duplicateRule(b.dataset.dup));
    ul.querySelectorAll("[data-del]").forEach((b) => b.onclick = () =>
      mutate(() => HTApi.deleteRule(b.dataset.del), "Regra removida"));
  }

  function bindDrag(el) {
    el.addEventListener("dragstart", (e) => { state.dragId = el.dataset.id; el.classList.add("dragging"); e.dataTransfer.effectAllowed = "move"; });
    el.addEventListener("dragend", () => { el.classList.remove("dragging"); $$(".drag-over").forEach((x) => x.classList.remove("drag-over")); });
    el.addEventListener("dragover", (e) => { e.preventDefault(); el.classList.add("drag-over"); });
    el.addEventListener("dragleave", () => el.classList.remove("drag-over"));
    el.addEventListener("drop", async (e) => {
      e.preventDefault();
      el.classList.remove("drag-over");
      const targetId = el.dataset.id;
      if (!state.dragId || state.dragId === targetId) return;
      const ids = state.moveRules.map((r) => r.id);
      const from = ids.indexOf(state.dragId);
      const to = ids.indexOf(targetId);
      ids.splice(from, 1);
      ids.splice(to, 0, state.dragId);
      await mutate(() => HTApi.reorderRules(ids), "Ordem atualizada");
    });
  }

  function duplicateRule(id) {
    const r = state.moveRules.find((x) => x.id === id);
    if (!r) return;
    mutate(async () => {
      await HTApi.createRule({
        name: `${ruleDisplayName(r)} (cópia)`,
        enabled: r.enabled !== false,
        source_dir: r.source_dir,
        base_rede: r.base_rede,
        default_subfolder: r.default_subfolder || "Sefoc",
        mode: r.mode || "default",
        auto_subdir: r.auto_subdir || "",
        filename_override: r.filename_override || "",
        filename_pattern: r.filename_pattern || "",
        include_version: r.include_version !== false,
        rename_to: r.rename_to || "",
        name_append: r.name_append || "",
        sufixo: r.sufixo || "",
        keep_old: r.keep_old !== false,
        dest_pattern: r.dest_pattern || "",
        source_filename_pattern: r.source_filename_pattern || "",
      });
    }, "Regra duplicada");
  }

  function openRuleModal(id) {
    const r = id ? state.moveRules.find((x) => x.id === id) : {};
    const titleHtml = id
      ? window._t("move_rule_edit_title_prefix", "Mover Arquivo: Editar regra — ") + `<span class="no-translate">${ruleDisplayName(r)}</span>`
      : window._t("move_rule_new_title", "Mover Arquivo: Nova regra de movimentação");

    openModal(
      titleHtml,
      HTForms.ruleFormHtml(r || {}),
      `<button class="btn btn--ghost modal-cancel">Cancelar</button><button class="btn btn--primary modal-save">Salvar</button>`,
      { wide: true, preventBackdropClose: true }
    );
    HTForms.bindMoveRulePreview(state.moveFilenameVars);
    $(".modal-cancel").onclick = closeModal;
    $(".modal-save").onclick = () => mutate(async () => {
      const f = $("#rule-form");
      const nameMode = f.querySelector("#name-mode-value")?.value || "fields";
      const includeVersion = nameMode === "fields"
        ? f.include_version_fields.checked
        : true;
      const destMode = f.dest_mode.value;
      const isAuto = destMode === "auto";
      const isManual = destMode === "manual";
      const body = {
        name: f.name.value.trim(),
        enabled: f.enabled.checked,
        source_dir: f.source_dir.value.trim(),
        base_rede: destMode === "default" ? f.base_rede.value.trim() : "",
        default_subfolder: destMode === "default" ? f.default_subfolder.value.trim() : "Sefoc",
        mode: isAuto ? "auto" : "default",
        auto_subdir: isAuto ? f.auto_subdir.value.trim() : "",
        filename_pattern: nameMode === "pattern" ? f.filename_pattern.value.trim() : "",
        include_version: includeVersion,
        filename_override: nameMode === "fields" ? f.filename_override.value.trim() : "",
        rename_to: nameMode === "fields" ? f.rename_to.value.trim() : "",
        name_append: nameMode === "fields" ? f.name_append.value.trim() : "",
        sufixo: nameMode === "fields" ? f.sufixo.value.trim() : "",
        keep_old: f.keep_old.checked,
        dest_pattern: isManual ? (f.dest_pattern?.value.trim() || "") : "",
        source_filename_pattern: isManual ? (f.source_filename_pattern?.value.trim() || "") : "",
      };
      if (id) await HTApi.updateRule(id, body);
      else await HTApi.createRule(body);
      closeModal();
    }, "Regra salva");
  }

  $("#btn-add-rule").onclick = () => openRuleModal(null);
  $("#btn-run-move").onclick = () => mutate(() => HTApi.runMove(), "Processamento iniciado");

  $("#btn-save-move-errors").onclick = () => mutate(async () => {
    const f = $("#form-move-errors");
    await HTApi.saveMoveErrorPolicy({
      on_file_error: f.on_file_error.value,
      on_db_missing: f.on_db_missing.value,
      on_db_error: f.on_db_error.value,
      retry_delay_sec: +f.retry_delay_sec.value || 30,
    });
  }, "Política salva");

  function renderMoveHistory(rows, silent = false, opts = {}) {
    const target = opts.target || "#move-hist-table tbody";
    const sigKey = opts.sigKey || "moveHist";
    const limit = opts.limit || 50;
    const slice = (rows || []).slice(0, limit);
    const key = JSON.stringify(slice);
    if (silent && key === sig[sigKey]) return;
    sig[sigKey] = key;
    const tb = $(target);
    if (!tb) return;
    tb.innerHTML = slice.map((r) => `
      <tr><td>${esc((r.timestamp || "").split(" ")[1] || r.timestamp)}</td><td>${esc(r.file_name)}</td><td>${esc(r.dest_path)}</td>
      <td class="${(r.status || "").startsWith("Erro") || (r.status || "").startsWith("Falha") ? "badge-err" : "badge-ok"}">${esc(r.status)}</td></tr>`).join("") || '<tr><td colspan="4" class="empty-state">Sem registros</td></tr>';
  }

  $("#btn-clear-move-hist").onclick = () => mutate(() => HTApi.clearMoveHistory(), "Limpo");

  // ---------- Errors ----------
  async function loadErrors(silent = false) {
    const rows = silent
      ? await HTApi.errors().catch(() => null)
      : await safe(() => HTApi.errors());
    if (rows == null) return;
    renderErrors(rows, silent);
  }

  function renderErrors(rows, silent = false) {
    const key = JSON.stringify(rows || []);
    if (silent && key === sig.errors) return;
    sig.errors = key;
    const tb = $("#errors-table tbody");
    tb.innerHTML = (rows || []).map((r) => `
      <tr><td>${esc(r.timestamp)}</td><td>${esc(r.source)}</td><td>${esc(r.error_msg)}</td></tr>`
    ).join("") || '<tr><td colspan="3" class="empty-state">Nenhum erro registrado</td></tr>';
  }

  $("#btn-clear-errors").onclick = () => mutate(() => HTApi.clearErrors(), "Log limpo");

  // ---------- Global ----------
  $("#btn-restart").onclick = () => mutate(() => HTApi.restartServices(), "Serviços reiniciando");

  async function checkApi() {
    const pill = $("#api-status");
    try {
      await HTApi.health();
      pill.className = "status-pill online";
      pill.innerHTML = '<span class="dot"></span>main_monitor conectado';
    } catch {
      pill.className = "status-pill offline";
      pill.innerHTML = '<span class="dot"></span>main_monitor offline';
    }
  }

  /** Atualização contínua — reflete mudanças do exe sem recarregar a página */
  async function liveTick() {
    if (state.liveBusy || state.modalOpen) return;
    state.liveBusy = true;
    try {
      await loadDashboard(true);

      if (state.view === "dashboard") {
        /* cards já atualizados */
      } else if (state.view === "monitor") {
        await loadMonitor(true);
      } else if (state.view === "rename") {
        if (isTabActive("rename-history")) await loadRenameHistory(true);
        else if (isTabActive("rename-folders")) {
          const folders = await HTApi.renameFolders().catch(() => null);
          if (folders) renderRenameFolders(folders, true);
        } else if (isTabActive("rename-patterns")) {
          /* padrões só mudam por ação do usuário */
        }
      } else if (state.view === "move") {
        await loadMoveHistory(true);
      } else if (state.view === "errors") {
        await loadErrors(true);
      }
    } finally {
      state.liveBusy = false;
    }
  }

  async function init() {
    if (window.HTLoadTranslations) await window.HTLoadTranslations();
    await checkApi();
    $("#form-pattern")?.pattern?.addEventListener("input", updatePatternPreview);

    // Bind popover for renamer pattern expression
    const formPattern = $("#form-pattern");
    if (formPattern) {
      const btn = formPattern.querySelector(".var-popover-btn");
      const menu = formPattern.querySelector(".var-popover-menu");
      if (btn && menu) {
        btn.onclick = (e) => {
          e.stopPropagation();
          $$(".var-popover-menu").forEach((m) => {
            if (m !== menu) m.classList.remove("is-active");
          });
          menu.classList.toggle("is-active");
        };

        menu.onclick = (e) => {
          const item = e.target.closest(".var-popover-item");
          if (!item) return;
          e.stopPropagation();

          const key = item.dataset.var;
          const targetInputName = btn.dataset.target;
          const inp = formPattern[targetInputName];

          if (inp && key) {
            const token = `{${key}}`;
            const pos = inp.selectionStart ?? inp.value.length;
            inp.value = inp.value.slice(0, pos) + token + inp.value.slice(pos);
            inp.focus();
            inp.selectionStart = inp.selectionEnd = pos + token.length;
          }

          menu.classList.remove("is-active");
          updatePatternPreview();
        };
      }
    }

    // Document click to close all popovers
    document.addEventListener("click", () => {
      $$(".var-popover-menu").forEach((m) => {
        m.classList.remove("is-active");
      });
    });

    switchView("dashboard");
    setInterval(checkApi, API_CHECK_MS);
    setInterval(liveTick, LIVE_MS);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) flushRefresh();
    });
  }

  init();
})();
