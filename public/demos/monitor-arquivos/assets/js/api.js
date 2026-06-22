/** Cliente HTTP — em modo simulação delega para HTDemoApi (dados fictícios locais). */
const HTApi = (() => {
  const isDemo = () => !!window.HTMONITOR_CONFIG?.demoMode;

  async function demoCall(fn, ...args) {
    try {
      return await fn(...args);
    } catch (err) {
      throw new Error(err.message || "Operação falhou na demonstração.");
    }
  }

  const base = () => {
    if (window.HTMONITOR_CONFIG?.apiBase) return window.HTMONITOR_CONFIG.apiBase;
    const parts = window.location.pathname.split("/").filter(Boolean);
    const ctx = parts.length ? "/" + parts[0] : "";
    if (ctx) return (window.location.origin + ctx + "/api").replace(/\/$/, "");
    const port = localStorage.getItem("htmonitor_api_port") || "8787";
    return `http://127.0.0.1:${port}/api`;
  };

  async function request(method, path, body) {
    const url = `${base()}${path}`;
    const opts = {
      method,
      headers: { "Content-Type": "application/json", Accept: "application/json" },
    };
    if (body !== undefined) opts.body = JSON.stringify(body);

    let res;
    try {
      res = await fetch(url, opts);
    } catch (err) {
      throw new Error(`Serviço indisponível (${base()}). (${err.message})`);
    }

    let payload;
    try {
      payload = await res.json();
    } catch {
      throw new Error(`Resposta inválida do servidor (${res.status}).`);
    }

    if (!res.ok) {
      const msg = payload?.detail?.message || payload?.detail || payload?.message || `Erro HTTP ${res.status}`;
      throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
    }
    if (payload.success === false) {
      throw new Error(payload.message || "Operação falhou.");
    }
    return payload.data !== undefined ? payload.data : payload;
  }

  const D = () => window.HTDemoApi;

  return {
    get: (p) => (isDemo() ? demoCall(() => Promise.resolve(null)) : request("GET", p)),
    post: (p, b) => (isDemo() ? demoCall(() => Promise.resolve(null)) : request("POST", p, b)),
    put: (p, b) => (isDemo() ? demoCall(() => Promise.resolve(null)) : request("PUT", p, b)),
    delete: (p) => (isDemo() ? demoCall(() => Promise.resolve(null)) : request("DELETE", p)),
    health: () => (isDemo() ? demoCall(D().health) : request("GET", "/health")),
    status: () => (isDemo() ? demoCall(D().status) : request("GET", "/status")),
    settings: () => (isDemo() ? demoCall(D().settings) : request("GET", "/settings")),
    restartServices: () => (isDemo() ? demoCall(D().restartServices) : request("POST", "/services/restart")),
    restartMonitor: () => (isDemo() ? demoCall(D().restartMonitor) : request("POST", "/services/monitor/restart")),
    restartRename: () => (isDemo() ? demoCall(D().restartRename) : request("POST", "/services/rename/restart")),
    restartMove: () => (isDemo() ? demoCall(D().restartMove) : request("POST", "/services/move/restart")),
    testMysql: (cfg) => (isDemo() ? demoCall(D().testMysql, cfg) : request("POST", "/settings/mysql/test", cfg)),
    saveMysql: (cfg) => (isDemo() ? demoCall(D().saveMysql, cfg) : request("PUT", "/settings/mysql", cfg)),
    saveMonitorApi: (cfg) => (isDemo() ? demoCall(D().saveMonitorApi, cfg) : request("PUT", "/settings/monitor/api", cfg)),
    monitorFolders: () => (isDemo() ? demoCall(D().monitorFolders) : request("GET", "/monitor/folders")),
    addMonitorFolder: (path) => (isDemo() ? demoCall(D().addMonitorFolder, path) : request("POST", "/monitor/folders", { path })),
    removeMonitorFolder: (path) => (isDemo() ? demoCall(D().removeMonitorFolder, path) : request("DELETE", `/monitor/folders?path=${encodeURIComponent(path)}`)),
    syncMonitor: () => (isDemo() ? demoCall(D().syncMonitor) : request("POST", "/monitor/sync")),
    renamePatterns: () => (isDemo() ? demoCall(D().renamePatterns) : request("GET", "/rename/patterns")),
    createPattern: (p) => (isDemo() ? demoCall(D().createPattern, p) : request("POST", "/rename/patterns", p)),
    updatePattern: (id, p) => (isDemo() ? demoCall(D().updatePattern, id, p) : request("PUT", `/rename/patterns/${id}`, p)),
    deletePattern: (id) => (isDemo() ? demoCall(D().deletePattern, id) : request("DELETE", `/rename/patterns/${id}`)),
    renameVariables: () => (isDemo() ? demoCall(D().renameVariables) : request("GET", "/rename/variables")),
    saveVariable: (v) => (isDemo() ? demoCall(D().saveVariable, v) : request("POST", "/rename/variables", v)),
    deleteVariable: (key) => (isDemo() ? demoCall(D().deleteVariable, key) : request("DELETE", `/rename/variables/${encodeURIComponent(key)}`)),
    renameFolders: () => (isDemo() ? demoCall(D().renameFolders) : request("GET", "/rename/folders")),
    addRenameFolder: (path, pattern_id, ignored_subfolders) => (isDemo() ? demoCall(D().addRenameFolder, path, pattern_id, ignored_subfolders) : request("POST", "/rename/folders", { path, pattern_id, ignored_subfolders })),
    assignPattern: (path, pattern_id) => (isDemo() ? demoCall(D().assignPattern, path, pattern_id) : request("PUT", `/rename/folders/pattern?path=${encodeURIComponent(path)}`, { pattern_id })),
    removeRenameFolder: (path) => (isDemo() ? demoCall(D().removeRenameFolder, path) : request("DELETE", `/rename/folders?path=${encodeURIComponent(path)}`)),
    renameHistory: () => (isDemo() ? demoCall(D().renameHistory) : request("GET", "/rename/history")),
    renameErrorPolicy: () => (isDemo() ? demoCall(D().renameErrorPolicy) : request("GET", "/rename/error-policy")),
    saveRenameErrorPolicy: (p) => (isDemo() ? demoCall(D().saveRenameErrorPolicy, p) : request("PUT", "/rename/error-policy", p)),
    clearRenameHistory: () => (isDemo() ? demoCall(D().clearRenameHistory) : request("DELETE", "/rename/history")),
    moveRules: () => (isDemo() ? demoCall(D().moveRules) : request("GET", "/move/rules")),
    moveFilenameVariables: () => (isDemo() ? demoCall(D().moveFilenameVariables) : request("GET", "/move/filename-variables")),
    moveErrorPolicy: () => (isDemo() ? demoCall(D().moveErrorPolicy) : request("GET", "/move/error-policy")),
    saveMoveErrorPolicy: (p) => (isDemo() ? demoCall(D().saveMoveErrorPolicy, p) : request("PUT", "/move/error-policy", p)),
    createRule: (r) => (isDemo() ? demoCall(D().createRule, r) : request("POST", "/move/rules", r)),
    updateRule: (id, r) => (isDemo() ? demoCall(D().updateRule, id, r) : request("PUT", `/move/rules/${id}`, r)),
    deleteRule: (id) => (isDemo() ? demoCall(D().deleteRule, id) : request("DELETE", `/move/rules/${id}`)),
    reorderRules: (ids) => (isDemo() ? demoCall(D().reorderRules, ids) : request("PUT", "/move/rules/reorder", { ids })),
    runMove: () => (isDemo() ? demoCall(D().runMove) : request("POST", "/move/run")),
    moveHistory: () => (isDemo() ? demoCall(D().moveHistory) : request("GET", "/move/history")),
    clearMoveHistory: () => (isDemo() ? demoCall(D().clearMoveHistory) : request("DELETE", "/move/history")),
    errors: () => (isDemo() ? demoCall(D().errors) : request("GET", "/errors")),
    clearErrors: () => (isDemo() ? demoCall(D().clearErrors) : request("DELETE", "/errors")),
  };
})();
