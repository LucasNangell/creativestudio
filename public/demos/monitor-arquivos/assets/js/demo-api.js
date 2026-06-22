/**
 * HT Monitor — API simulada para demonstração de portfólio.
 * Substitui chamadas HTTP por dados fictícios com persistência em localStorage.
 */
(() => {
  "use strict";

  const STORAGE_KEY = "htmonitor_demo_state_v1";
  const DEMO_DELAY_MS = 180;

  const BUILTIN_RENAME = [
    ["{yyyy}", "Ano da operação (extraído do banco/caminho)"],
    ["{opnum}", "Número da OP com 5 dígitos"],
    ["{nome_pasta}", "Nome da pasta anterior ao diretório base"],
    ["{PART}", "Capa ou Miolo (ou vazio)"],
  ];

  const DEFAULT_ERROR_POLICY = {
    on_file_error: "log",
    on_db_missing: "log",
    on_db_error: "retry",
    retry_delay_sec: 30,
  };

  const MOVE_FILENAME_VARS = {
    builtin: [
      ["OPNUM", "Número da OP (5 dígitos extraídos do arquivo)"],
      ["YYYY", "Ano (4 dígitos) extraído do nome do arquivo"],
      ["DBPATH", "Nome da pasta do cliente no destino"],
      ["PART", "Capa ou Miolo (páginas do PDF ou nome do arquivo)"],
      ["VERSAO", "Número da versão (vN)"],
      ["SUFIXO", "Sufixo configurado na regra"],
      ["ARQUIVO", "Nome original do PDF sem extensão"],
      ["NAME_APPEND", "Texto adicional da regra"],
      ["SHEETFMT", "Formato da folha do PDF (largura x altura em mm)"],
    ],
    sample: {
      OPNUM: "10482",
      YYYY: "2026",
      DBPATH: "10482-Cliente Alpha",
      PART: "Capa",
      VERSAO: "2",
      SUFIXO: "Rev",
      ARQUIVO: "10482-Exemplo v1",
      NAME_APPEND: "_BaseDemo",
      SHEETFMT: "210x297mm",
    },
  };

  function defaultState() {
    return {
      services: {
        monitor: { active: true },
        rename: { active: true },
        move: { active: true },
        database: { connected: true },
      },
      settings: {
        mysql: {
          host: "demo-mysql.empresa-demo.local",
          user: "demo_monitor",
          password: "demo_senha_segura",
          database: "file_monitor_demo",
        },
        monitor: {
          folders: [
            "\\\\servidor-demo\\Arquivos\\Entrada\\2026",
            "\\\\servidor-demo\\Arquivos\\Entrada\\Portal",
            "\\\\servidor-demo\\Arquivos\\Temp\\Processamento",
          ],
          api: { enabled: true, host: "127.0.0.1", port: 8787 },
        },
        rename: {
          naming_pattern: "{yyyy}#{opnum}#{nome_pasta}{PART}.pdf",
          naming_patterns: [
            { id: "default", name: "Padrão Original", pattern: "{yyyy}#{opnum}#{nome_pasta}{PART}.pdf" },
            { id: "pattern_capa", name: "Capa Simplificada", pattern: "{yyyy}_{opnum}_Capa.pdf" },
          ],
          custom_variables: [
            { key: "cliente_tag", value: "DEMO" },
          ],
          monitored_folders: [
            { path: "\\\\servidor-demo\\Renomear\\Entrada", pattern_id: "default", ignored_subfolders: ["_temp"] },
            { path: "\\\\servidor-demo\\Renomear\\HotFolder", pattern_id: "pattern_capa", ignored_subfolders: [] },
          ],
          error_policy: { ...DEFAULT_ERROR_POLICY },
        },
        move: {
          rules: [
            {
              id: "rule_demo_1",
              enabled: true,
              source_dir: "\\\\servidor-demo\\Mover\\Origem",
              base_rede: "\\\\servidor-demo\\Arquivos\\Clientes",
              default_subfolder: "Producao",
              auto_subdir: "",
              rename_to: "",
              filename_override: "",
              filename_pattern: "{OPNUM}-{DBPATH} v{VERSAO}.pdf",
              include_version: true,
              name_append: "",
              sufixo: "",
              keep_old: false,
              mode: "default",
            },
            {
              id: "rule_demo_2",
              enabled: true,
              source_dir: "\\\\servidor-demo\\Mover\\Saida-Temp",
              base_rede: "\\\\servidor-demo\\Arquivos\\Arquivo",
              default_subfolder: "Finalizados",
              auto_subdir: "",
              rename_to: "",
              filename_override: "",
              filename_pattern: "",
              include_version: true,
              name_append: "_Final",
              sufixo: "",
              keep_old: true,
              mode: "default",
            },
          ],
          error_policy: { ...DEFAULT_ERROR_POLICY },
        },
      },
      renameHistory: [
        { timestamp: "2026-06-20 09:15:02", original_name: "original_10482.pdf", new_name: "2026#10482#Cliente Alpha.pdf", status: "Sucesso" },
        { timestamp: "2026-06-20 09:14:48", original_name: "trabalho_22001.pdf", new_name: "2026#22001#Cliente Beta.pdf", status: "Sucesso" },
        { timestamp: "2026-06-20 09:12:11", original_name: "sem_op.pdf", new_name: "—", status: "Erro (OP não encontrada)" },
        { timestamp: "2026-06-20 08:55:33", original_name: "10482_capa_v2.pdf", new_name: "2026_10482_Capa.pdf", status: "Sucesso" },
        { timestamp: "2026-06-20 08:40:01", original_name: "lote_manha_003.pdf", new_name: "2026#33001#Cliente Gamma.pdf", status: "Sucesso" },
      ],
      moveHistory: [
        { timestamp: "2026-06-20 09:16:10", file_name: "2026#10482#Cliente Alpha.pdf", dest_path: "\\\\servidor-demo\\Arquivos\\Clientes\\10482-Cliente Alpha\\2026#10482#Cliente Alpha v2.pdf", status: "Sucesso", error_msg: "" },
        { timestamp: "2026-06-20 09:10:22", file_name: "2026#22001#Cliente Beta.pdf", dest_path: "\\\\servidor-demo\\Arquivos\\Clientes\\22001-Cliente Beta\\2026#22001#Cliente Beta v1.pdf", status: "Sucesso", error_msg: "" },
        { timestamp: "2026-06-20 08:58:05", file_name: "arquivo_vazio.pdf", dest_path: "\\\\servidor-demo\\Arquivos\\Clientes\\33001-Cliente Gamma\\", status: "Erro (Preservado)", error_msg: "Arquivo de origem vazio — movimentação cancelada com segurança." },
      ],
      errors: [
        { timestamp: "2026-06-20 08:58:05", source: "Mover", error_msg: "Validação prévia: arquivo de origem com tamanho zero." },
        { timestamp: "2026-06-20 09:12:11", source: "Renomear", error_msg: "Número da OP não encontrado no caminho do arquivo sem_op.pdf" },
        { timestamp: "2026-06-19 17:45:00", source: "Monitoramento", error_msg: "Sincronização concluída: 142 arquivos indexados no banco demo." },
      ],
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (_) {}
    return defaultState();
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_) {}
  }

  let state = loadState();

  function delay(data) {
    return new Promise((resolve) => setTimeout(() => resolve(data), DEMO_DELAY_MS));
  }

  function now() {
    return new Date().toISOString().slice(0, 19).replace("T", " ");
  }

  function uid(prefix) {
    return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
  }

  function maskSettings(cfg) {
    const out = JSON.parse(JSON.stringify(cfg));
    if (out.mysql?.password) out.mysql.password = "********";
    return out;
  }

  function getStatus() {
    const s = state.settings;
    return {
      monitor: { active: state.services.monitor.active, folders: (s.monitor?.folders || []).length },
      rename: { active: state.services.rename.active, folders: (s.rename?.monitored_folders || []).length },
      move: { active: state.services.move.active, rules: (s.move?.rules || []).filter((r) => r.enabled !== false).length },
      database: { connected: state.services.database.connected },
    };
  }

  function resetDemoState() {
    state = defaultState();
    saveState(state);
  }

  window.HTDemoApi = {
    reset: resetDemoState,

    health: () => delay({ status: "up", app: "HT Monitor Demo" }),

    status: () => delay(getStatus()),

    settings: () => delay(maskSettings(state.settings)),

    restartServices: () => {
      state.services = { monitor: { active: true }, rename: { active: true }, move: { active: true }, database: { connected: true } };
      saveState(state);
      return delay("OK");
    },

    restartMonitor: () => {
      state.services.monitor.active = true;
      saveState(state);
      return delay("OK");
    },

    restartRename: () => {
      state.services.rename.active = true;
      saveState(state);
      return delay("OK");
    },

    restartMove: () => {
      state.services.move.active = true;
      saveState(state);
      return delay("OK");
    },

    testMysql: () => delay("OK"),
    saveMysql: (cfg) => {
      state.settings.mysql = { ...cfg };
      saveState(state);
      return delay("OK");
    },
    saveMonitorApi: (cfg) => {
      state.settings.monitor.api = { ...state.settings.monitor.api, ...cfg };
      saveState(state);
      return delay("OK");
    },

    monitorFolders: () => delay([...(state.settings.monitor.folders || [])]),

    addMonitorFolder: (path) => {
      const folders = state.settings.monitor.folders;
      if (folders.includes(path)) throw new Error("Pasta já monitorada.");
      folders.push(path);
      saveState(state);
      return delay(folders);
    },

    removeMonitorFolder: (path) => {
      state.settings.monitor.folders = state.settings.monitor.folders.filter((p) => p !== path);
      saveState(state);
      return delay(state.settings.monitor.folders);
    },

    syncMonitor: () => delay("OK"),

    renamePatterns: () => delay({ patterns: state.settings.rename.naming_patterns, builtin: BUILTIN_RENAME }),

    createPattern: (p) => {
      const patterns = state.settings.rename.naming_patterns;
      const newId = p.id || uid("pattern");
      patterns.push({ id: newId, name: p.name.trim(), pattern: p.pattern.trim() });
      saveState(state);
      return delay(patterns);
    },

    updatePattern: (id, p) => {
      const patterns = state.settings.rename.naming_patterns;
      const found = patterns.find((x) => x.id === id);
      if (!found) throw new Error("Padrão não encontrado.");
      found.name = p.name.trim();
      found.pattern = p.pattern.trim();
      saveState(state);
      return delay(patterns);
    },

    deletePattern: (id) => {
      if (id === "default") throw new Error("O padrão original não pode ser excluído.");
      const patterns = state.settings.rename.naming_patterns;
      if (patterns.length <= 1) throw new Error("É necessário manter ao menos um padrão.");
      state.settings.rename.naming_patterns = patterns.filter((p) => p.id !== id);
      state.settings.rename.monitored_folders.forEach((f) => {
        if (f.pattern_id === id) f.pattern_id = "default";
      });
      saveState(state);
      return delay("OK");
    },

    renameVariables: () => delay([...state.settings.rename.custom_variables]),

    saveVariable: (v) => {
      const vars = state.settings.rename.custom_variables;
      const existing = vars.find((x) => x.key === v.key);
      if (existing) existing.value = v.value;
      else vars.push({ key: v.key, value: v.value });
      saveState(state);
      return delay(vars);
    },

    deleteVariable: (key) => {
      state.settings.rename.custom_variables = state.settings.rename.custom_variables.filter((v) => v.key !== key);
      saveState(state);
      return delay("OK");
    },

    renameFolders: () => delay([...state.settings.rename.monitored_folders]),

    addRenameFolder: (path, pattern_id, ignored_subfolders) => {
      const folders = state.settings.rename.monitored_folders;
      if (folders.some((f) => f.path === path)) throw new Error("Pasta já monitorada.");
      folders.push({ path, pattern_id, ignored_subfolders: ignored_subfolders || [] });
      saveState(state);
      return delay(folders);
    },

    assignPattern: (path, pattern_id) => {
      const f = state.settings.rename.monitored_folders.find((x) => x.path === path);
      if (!f) throw new Error("Pasta não encontrada.");
      f.pattern_id = pattern_id;
      saveState(state);
      return delay("OK");
    },

    removeRenameFolder: (path) => {
      state.settings.rename.monitored_folders = state.settings.rename.monitored_folders.filter((f) => f.path !== path);
      saveState(state);
      return delay("OK");
    },

    renameHistory: () => delay([...state.renameHistory]),

    clearRenameHistory: () => {
      state.renameHistory = [];
      saveState(state);
      return delay("OK");
    },

    renameErrorPolicy: () => delay({ ...DEFAULT_ERROR_POLICY, ...state.settings.rename.error_policy }),

    saveRenameErrorPolicy: (p) => {
      state.settings.rename.error_policy = { ...p };
      saveState(state);
      return delay(state.settings.rename.error_policy);
    },

    moveRules: () => delay([...state.settings.move.rules]),

    moveFilenameVariables: () => delay(MOVE_FILENAME_VARS),

    moveErrorPolicy: () => delay({ ...DEFAULT_ERROR_POLICY, ...state.settings.move.error_policy }),

    saveMoveErrorPolicy: (p) => {
      state.settings.move.error_policy = { ...p };
      saveState(state);
      return delay(state.settings.move.error_policy);
    },

    createRule: (r) => {
      const rules = state.settings.move.rules;
      const rule = { ...r, id: r.id || uid("rule") };
      rules.push(rule);
      saveState(state);
      return delay(rules);
    },

    updateRule: (id, r) => {
      const rules = state.settings.move.rules;
      const idx = rules.findIndex((x) => x.id === id);
      if (idx < 0) throw new Error("Regra não encontrada.");
      rules[idx] = { ...r, id };
      saveState(state);
      return delay(rules);
    },

    deleteRule: (id) => {
      state.settings.move.rules = state.settings.move.rules.filter((r) => r.id !== id);
      saveState(state);
      return delay("OK");
    },

    reorderRules: (ids) => {
      const rules = state.settings.move.rules;
      const byId = Object.fromEntries(rules.map((r) => [r.id, r]));
      const ordered = [];
      ids.forEach((id) => { if (byId[id]) { ordered.push(byId[id]); delete byId[id]; } });
      Object.values(byId).forEach((r) => ordered.push(r));
      state.settings.move.rules = ordered;
      saveState(state);
      return delay(ordered);
    },

    runMove: () => {
      state.moveHistory.unshift({
        timestamp: now(),
        file_name: "2026#99999#Cliente Exemplo.pdf",
        dest_path: "\\\\servidor-demo\\Arquivos\\Clientes\\99999-Cliente Exemplo\\2026#99999#Cliente Exemplo v1.pdf",
        status: "Sucesso",
        error_msg: "Processamento manual simulado concluído.",
      });
      saveState(state);
      return delay({ result: "Processamento simulado concluído — 3 arquivos processados." });
    },

    moveHistory: () => delay([...state.moveHistory]),

    clearMoveHistory: () => {
      state.moveHistory = [];
      saveState(state);
      return delay("OK");
    },

    errors: () => delay([...state.errors]),

    clearErrors: () => {
      state.errors = [];
      saveState(state);
      return delay("OK");
    },
  };
})();
