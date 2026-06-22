/** Helpers de formulário, tooltips e previews (somente UI) */
window.HTForms = (() => {
  "use strict";

  function esc(s) {
    return String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  }

  function tip(text) {
    return `<span class="field-tip" title="${esc(text)}" aria-label="${esc(text)}">?</span>`;
  }

  function field(label, hint, inputHtml, extraClass = "") {
    return `<label class="form-field ${extraClass}">
      <span class="field-label">${label}${hint ? tip(hint) : ""}</span>
      ${inputHtml}
    </label>`;
  }

  function section(title, desc, innerHtml) {
    return `<section class="form-section">
      <h4 class="form-section__title">${title}</h4>
      ${desc ? `<p class="form-section__desc">${desc}</p>` : ""}
      ${innerHtml}
    </section>`;
  }

  const MOVE_FILENAME_SAMPLE = {
    OPNUM: "02345",
    YYYY: "2026",
    DBPATH: "10482-Cliente Alpha",
    PART: "Capa",
    VERSAO: "2",
    SUFIXO: "Sfx",
    ARQUIVO: "02345-Exemplo v1",
    NAME_APPEND: "_BaseSefoc",
    SHEETFMT: "210x297mm",
  };

  const MOVE_BUILTIN_VARS = [
    ["OPNUM", "Número da OP (5 dígitos extraídos do arquivo)"],
    ["YYYY", "Ano (4 dígitos) extraído do nome do arquivo"],
    ["DBPATH", "Nome da pasta da OS no destino"],
    ["PART", "Capa ou Miolo (páginas do PDF ou nome do arquivo)"],
    ["VERSAO", "Número da versão (vN)"],
    ["ARQUIVO", "Nome original do PDF sem extensão"],
    ["SHEETFMT", "Formato da folha do PDF (largura x altura em mm, ex.: 210x297mm)"],
  ];

  const MOVE_DEST_SAMPLE = {
    YYYY: "2026",
    OPNUM: "02345",
    DBPATH: "Cliente Alpha",
    PART: "Capa",
    ARQUIVO: "2026#10482#Cliente Alpha#Capa",
  };

  const MOVE_DEST_VARS = [
    ["YYYY", "Ano (4 dígitos) extraído do nome do arquivo"],
    ["OPNUM", "Número da OP (5 dígitos) extraído do nome do arquivo"],
    ["DBPATH", "Texto extraído da posição correspondente no nome do arquivo"],
    ["PART", "Capa ou Miolo (detectado por páginas ou pelo nome)"],
    ["ARQUIVO", "Nome original do PDF sem extensão"],
  ];

  function previewMoveFilenamePattern(pattern, opts = {}) {
    if (!pattern || !pattern.trim()) return null;
    const ctx = { ...MOVE_FILENAME_SAMPLE, ...(opts.vars || {}) };
    ctx.SUFIXO = opts.sufixo || ctx.SUFIXO;
    ctx.NAME_APPEND = opts.name_append || ctx.NAME_APPEND;
    
    // Alias PATH and DBPATH
    if (ctx.PATH && !ctx.DBPATH) ctx.DBPATH = ctx.PATH;
    else if (ctx.DBPATH && !ctx.PATH) ctx.PATH = ctx.DBPATH;

    let out = pattern.trim();
    Object.keys(ctx).sort((a, b) => b.length - a.length).forEach((k) => {
      out = out.split(`{${k}}`).join(ctx[k]);
    });
    if (!out.toLowerCase().endsWith(".pdf")) out += ".pdf";
    if (out.includes("{")) return `${out} (variáveis restantes não substituídas)`;
    if (opts.keep_old && !/\{vers[aã]o\}/i.test(pattern)) {
      return out.replace(/\.pdf$/i, "") + " (2).pdf";
    }
    return out;
  }

  function moveVarSelectHtml(vars) {
    const hiddenVars = new Set(["SUFIXO", "NAME_APPEND"]);
    const list = (vars?.length ? vars : MOVE_BUILTIN_VARS).filter(([key]) => !hiddenVars.has(key));
    const opts = list.map(([key, desc]) =>
      `<option value="${esc(key)}">{${esc(key)}} — ${esc(desc)}</option>`
    ).join("");
    return `<label class="form-field form-field--full">
      <span class="field-label">Variáveis disponíveis ${tip("Selecione uma variável para inserir no padrão na posição do cursor")}</span>
      <select id="move-var-select" class="var-insert-select">
        <option value="">— Selecione uma variável —</option>
        ${opts}
      </select>
    </label>`;
  }

  const RENAME_SAMPLE = {
    YYYY: "2026",
    OPNUM: "02345",
    NOME_PASTA: "Nome-da-pasta",
    PART: "Capa",
  };

  function toFrontendPattern(pattern) {
    if (!pattern) return "";
    return pattern
      .split("{yyyy}").join("{YYYY}")
      .split("{opnum}").join("{OPNUM}")
      .split("{nome_pasta}").join("{NOME_PASTA}")
      .split("{marcador}").join("{PART}")
      .split("{marcador_str}").join("{PART}");
  }

  function toBackendPattern(pattern) {
    if (!pattern) return "";
    return pattern
      .split("{YYYY}").join("{yyyy}")
      .split("{OPNUM}").join("{opnum}")
      .split("{NOME_PASTA}").join("{nome_pasta}");
  }

  function previewRenamePattern(pattern, customVars = []) {
    if (!pattern) return "—";
    const vars = { ...RENAME_SAMPLE };
    (customVars || []).forEach((v) => {
      if (v?.key) vars[v.key] = v.value ?? "";
    });
    let out = toFrontendPattern(pattern);
    Object.entries(vars).forEach(([k, val]) => {
      out = out.split(`{${k}}`).join(val);
    });
    return out.includes("{") ? `${out} (variáveis restantes não substituídas)` : out;
  }

  function previewDestPattern(pattern, srcPattern) {
    if (!pattern || !pattern.trim()) return null;
    let ctx = { ...MOVE_DEST_SAMPLE };
    if (srcPattern && srcPattern.trim()) {
      const sampleFile = "2026#10482#Cliente Alpha#Capa";
      const srcClean = srcPattern.replace(/\.pdf$/i, "");
      const tokenRe = /\{([A-Za-z_]\w*)\}/g;
      const tokens = [...srcClean.matchAll(tokenRe)].map(m => m[1]);
      if (tokens.length > 0) {
        const parts = srcClean.split(tokenRe);
        let regexParts = [];
        let tokenIdx = 0;
        for (let i = 0; i < parts.length; i++) {
          if (i % 2 === 0) {
            regexParts.push(parts[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
          } else {
            if (tokenIdx === tokens.length - 1) {
              regexParts.push("(.+)");
            } else {
              regexParts.push("([^#]+?)");
            }
            tokenIdx++;
          }
        }
        try {
          const m = new RegExp("^" + regexParts.join("") + "$", "i").exec(sampleFile);
          if (m) {
            tokens.forEach((t, idx) => {
              ctx[t] = m[idx + 1].trim();
            });
          }
        } catch (e) { }
      }
    }
    
    // Alias PATH and DBPATH
    if (ctx.PATH && !ctx.DBPATH) ctx.DBPATH = ctx.PATH;
    else if (ctx.DBPATH && !ctx.PATH) ctx.PATH = ctx.DBPATH;

    let out = pattern.trim();
    Object.keys(ctx).sort((a, b) => b.length - a.length).forEach((k) => {
      out = out.split(`{${k}}`).join(ctx[k]);
    });
    // Resolver ~ como busca: mostrar "~02345" como "02345-..."
    out = out.replace(/~(\w+)/g, "$1-...");
    if (out.includes("{")) return `${out} (variáveis não resolvidas)`;
    return out;
  }

  function destVarSelectHtml() {
    const opts = MOVE_DEST_VARS.map(([key, desc]) =>
      `<option value="${esc(key)}">{${esc(key)}} — ${esc(desc)}</option>`
    ).join("");
    return `<label class="form-field form-field--full">
      <span class="field-label">Variáveis disponíveis para caminho ${tip("Selecione uma variável para inserir no padrão de destino")}</span>
      <select id="dest-var-select" class="var-insert-select">
        <option value="">— Selecione uma variável —</option>
        ${opts}
      </select>
    </label>`;
  }

  function previewMoveRule(values) {
    const v = values || {};
    const sampleFile = "02345-Exemplo v1.pdf";
    const opnum = "02345";
    const ano = "2026";
    const base = (v.base_rede || "\\\\servidor-demo\\Arquivos\\Clientes").replace(/\\+$/, "");
    const sub = v.default_subfolder || "Sefoc";
    const mode = v.mode || "default";

    if (mode === "auto") {
      const autoSub = v.auto_subdir ? `\\${v.auto_subdir.replace(/^\\+/, "")}` : "";
      return {
        mode: "Modo selecionado: Automático (destino registrado no banco)",
        origin: `${v.source_dir || "\\\\origem\\PDF_In"}\\${sampleFile}`,
        destination: `{caminhosefoc do banco}${autoSub}`,
        file: buildDestFilename(v, opnum, sampleFile),
        note: "O destino vem do campo caminhosefoc/registro MySQL. auto_subdir acrescenta subpasta relativa.",
      };
    }

    // Se dest_pattern estiver preenchido, mostrar destino resolvido
    if (v.dest_pattern && v.dest_pattern.trim()) {
      const destPreview = previewDestPattern(v.dest_pattern, v.source_filename_pattern);
      const srcFile = v.source_filename_pattern
        ? v.source_filename_pattern.replace(/\{(\w+)\}/g, (_, k) => MOVE_DEST_SAMPLE[k] || `{${k}}`)
        : sampleFile;
      return {
        mode: "Modo selecionado: Padrão com caminho de destino por variáveis",
        origin: `${v.source_dir || "\\\\origem\\PDF_In"}\\${srcFile}`,
        destination: destPreview || v.dest_pattern,
        file: buildDestFilename(v, opnum, sampleFile),
        note: "O destino é montado a partir das variáveis extraídas do nome do arquivo. Use ~ para busca por prefixo.",
      };
    }

    const pastaDep = `${base}\\${ano}-${opnum}`;
    const destDir = `${pastaDep}\\${sub}`;
    return {
      mode: "Modo selecionado: Padrão (destino a partir do nome do arquivo)",
      origin: `${v.source_dir || "\\\\origem\\PDF_In"}\\${sampleFile}`,
      destination: destDir,
      file: buildDestFilename(v, opnum, sampleFile),
      note: "O sistema localiza a pasta do cliente pelo OPNUM dentro de Destino base rede.",
    };
  }

  function buildDestFilename(v, opnum, sampleFile) {
    const usePattern = v.name_mode === "pattern";
    if (!usePattern && v.filename_override) {
      const n = v.filename_override;
      return n.toLowerCase().endsWith(".pdf") ? n : `${n}.pdf`;
    }
    if (usePattern) {
      const patternPreview = previewMoveFilenamePattern(v.filename_pattern, {
        include_version: v.include_version !== false,
        keep_old: v.keep_old !== false,
      });
      if (patternPreview) return patternPreview;
    }
    if (v.rename_to && v.rename_to.toLowerCase() === "auto") {
      const ver = v.include_version !== false ? " v2" : "";
      return `${opnum}-NomeCliente${ver}.pdf`;
    }
    let nome = "Exemplo";
    if (v.name_append) nome += v.name_append;
    if (v.sufixo) nome = nome.replace(new RegExp(`-${v.sufixo}$`, "i"), "");
    if (v.include_version === false) {
      const suf = v.sufixo ? `-${v.sufixo}` : "";
      return `${opnum}-${nome}${suf}.pdf`;
    }
    const suf = v.sufixo ? `-${v.sufixo}` : "";
    return `${opnum}-${nome} v2${suf}.pdf`;
  }

  function ruleFormHtml(r = {}) {
    const chk = (n, cond = true) => (r[n] !== false && cond !== false ? "checked" : "");
    const val = (n, d = "") => esc(r[n] ?? d);

    // Determinar o modo de destino inicial para a UI
    const isAuto = (r.mode || "default") === "auto";
    const hasDestPattern = !!(r.dest_pattern || "").trim();
    let destMode = "default";
    if (isAuto) {
      destMode = "auto";
    } else if (hasDestPattern) {
      destMode = "manual";
    }

    const identitySec = section(
      "Identificação",
      "Nome exibido na lista de regras. O identificador técnico (ID) não muda ao editar." +
      (r.id ? ` ID: ${esc(r.id)}` : ""),
      field(
        "Nome da regra",
        "Ex.: Entrada PDF, Miolo Clientes",
        `<input name="name" value="${val("name")}" placeholder="Ex.: Entrada principal" maxlength="120" />`,
        "form-field--full"
      ) + (r.id ? `<p class="hint" style="margin:0">ID interno (não editável): <code class="inline-code">${esc(r.id)}</code></p>` : "")
    );

    const statusSec = section(
      "Status da regra",
      "Regras desativadas são ignoradas pelo monitoramento contínuo.",
      `<label class="checkbox-row form-field--full">
        <input type="checkbox" name="enabled" ${chk("enabled")} />
        <span>Regra ativa — monitorar pasta de origem</span>
      </label>`
    );

    const originSec = section(
      "Pasta de saída do Hot Ticket",
      "Defina a pasta de saída do Hot Ticket para que seja feita a transferência pra pasta de destino da OP.",
      field(
        "Pasta monitorada",
        "Pasta monitorada pelo watchdog. Ex.: \\\\servidor-demo\\Mover\\Origem",
        `<input name="source_dir" value="${val("source_dir")}" required placeholder="\\\\servidor\\pasta\\entrada" />`,
        "form-field--full"
      )
    );

    const destinationSec = section(
      "Destino",
      "Defina como o caminho de destino final do arquivo PDF será determinado.",
      `<div class="form-grid form-grid--2">
        ${field(
        "Modo de destino",
        "Escolha o método para determinar a pasta de destino final",
        `<select name="dest_mode">
            <option value="default" ${destMode === "default" ? "selected" : ""}>Padrão (Pasta base + busca por OPNUM)</option>
            <option value="manual" ${destMode === "manual" ? "selected" : ""}>Manual (Caminho completo com variáveis)</option>
            <option value="auto" ${destMode === "auto" ? "selected" : ""}>Automático (Consulta ao banco de dados MySQL)</option>
          </select>`,
        "form-field--full"
      )}
      </div>

      <!-- Configurações do modo Padrão -->
      <div class="form-grid form-grid--2" data-dest-mode-field="default" ${destMode !== 'default' ? 'style="display:none"' : ''}>
        ${field("Pasta base para o destino final", "Raiz onde o sistema busca pastas Ano-OPNUM do cliente. Ex.: \\\\servidor-demo\\Arquivos\\Clientes", `<input name="base_rede" value="${val("base_rede")}" placeholder="\\\\servidor-demo\\Arquivos\\Clientes" />`, "form-field--full")}
        ${field("Subpasta destino", "Nome da pasta final sob o cliente (modo default). Padrão: Producao", `<input name="default_subfolder" value="${val("default_subfolder", "Producao")}" placeholder="Producao" />`, "form-field--full")}
      </div>

      <!-- Configurações do modo Automático -->
      <div class="form-grid form-grid--2" data-dest-mode-field="auto" ${destMode !== 'auto' ? 'style="display:none"' : ''}>
        ${field("Subpasta auto (opcional)", "Acrescentada ao caminho retornado pelo banco (modo auto)", `<input name="auto_subdir" value="${val("auto_subdir")}" placeholder="Ex.: Miolo" />`, "form-field--full")}
      </div>

      <!-- Configurações do modo Manual -->
      <div class="form-grid form-grid--2" data-dest-mode-field="manual" ${destMode !== 'manual' ? 'style="display:none"' : ''}>
        <label class="checkbox-row form-field--full" style="margin-top: -12px; margin-left: 16px; margin-bottom: 12px;">
          <input type="checkbox" id="chk-create-vars" ${r.source_filename_pattern ? "checked" : ""} />
          <span>Criar variáveis a partir do nome</span>
        </label>
        
        <div id="source-pattern-field-wrap" class="form-field--full" ${r.source_filename_pattern ? '' : 'style="display:none"'}>
          ${field(
          "Padrão do nome do arquivo de origem",
          "Define quais partes do nome do arquivo correspondem a cada variável. Ex.: {YYYY}#{OPNUM}#{DBPATH}#{PART}.pdf",
          `<input name="source_filename_pattern" value="${val("source_filename_pattern")}" placeholder="{YYYY}#{OPNUM}#{DBPATH}#{PART}.pdf" autocomplete="off" />`,
          "form-field--full"
        )}
        </div>

        ${field(
        "Padrão do caminho de destino",
        "Caminho completo com variáveis. Ex.: \\\\servidor\\share\\{YYYY}\\~{OPNUM}\\Sefoc",
        `<div class="input-group">
            <input name="dest_pattern" value="${val("dest_pattern")}" placeholder="\\\\servidor\\share\\{YYYY}\\~{OPNUM}\\Sefoc" autocomplete="off" />
            <div class="var-popover-wrapper">
              <button type="button" class="btn btn--secondary var-popover-btn" data-target="dest_pattern" title="Inserir variável">{}</button>
              <div class="var-popover-menu" id="dest-var-popover"></div>
            </div>
          </div>`,
        "form-field--full"
      )}
        <div class="preview-box preview-box--inline form-field--full" id="dest-pattern-preview-wrap" ${hasDestPattern ? '' : 'hidden'}>
          <span class="preview-box__label">Exemplo do caminho gerado:</span>
          <code class="preview-box__value mono" id="dest-pattern-preview">—</code>
        </div>
      </div>`
    );

    const nameSec = section(
      "Nome do arquivo PDF",
      "Defina o nome final do PDF usando um padrão com variáveis.",
      `<input type="hidden" name="name_mode" id="name-mode-value" value="pattern" />
      <div class="form-grid form-grid--2">
        ${field(
        "Padrão de nome",
        "Modelo do PDF. Ex.: {OPNUM}-{DBPATH}-BaseSefoc {VERSAO}.pdf",
        `<div class="input-group">
            <input name="filename_pattern" value="${val("filename_pattern")}" placeholder="{OPNUM}-{DBPATH}-BaseSefoc {VERSAO}.pdf" autocomplete="off" />
            <div class="var-popover-wrapper">
              <button type="button" class="btn btn--secondary var-popover-btn" data-target="filename_pattern" title="Inserir variável">{}</button>
              <div class="var-popover-menu" id="filename-var-popover"></div>
            </div>
          </div>`,
        "form-field--full"
      )}
        <div class="preview-box preview-box--inline form-field--full" id="move-filename-preview-wrap">
          <span class="preview-box__label">Exemplo do nome gerado:</span>
          <code class="preview-box__value mono" id="move-filename-preview">—</code>
        </div>
        <label class="checkbox-row form-field--full">
          <input type="checkbox" name="keep_old" ${r.keep_old !== false ? "checked" : ""} />
          <span>Manter versões antigas ${tip("Não remove PDFs anteriores na pasta de destino")}</span>
        </label>
      </div>`
    );

    const previewSec = `<div class="preview-box preview-box--modal" id="rule-preview">
      <div class="preview-box__title">Pré-visualização (exemplo)</div>
      <dl class="preview-dl">
        <dt>Origem</dt><dd id="rule-preview-origin">—</dd>
        <dt>Destino</dt><dd id="rule-preview-dest">—</dd>
        <dt>Arquivo</dt><dd id="rule-preview-file">—</dd>
      </dl>
      <p class="preview-box__note" id="rule-preview-note"></p>
    </div>`;

    return `<form id="rule-form" class="form-modal">${identitySec}${statusSec}${originSec}${destinationSec}${nameSec}${previewSec}</form>`;
  } function bindMoveRulePreview(builtinVars) {
    const form = document.getElementById("rule-form");
    if (!form) return;

    const destPopover = document.getElementById("dest-var-popover");
    const filenamePopover = document.getElementById("filename-var-popover");

    const updateDynamicVariables = () => {
      const val = form.source_filename_pattern?.value || "";
      const matches = [...val.matchAll(/\{([A-Za-z_]\w*)\}/g)].map(m => m[1]);

      // Filter out duplicates
      const uniqueMatches = [...new Set(matches)];

      // Base lists
      const baseDestVars = [...MOVE_DEST_VARS];
      const baseFilenameVars = (builtinVars?.length ? builtinVars : MOVE_BUILTIN_VARS).filter(([key]) => key !== "SUFIXO" && key !== "NAME_APPEND");

      // Add missing matches to dest vars and filename vars
      uniqueMatches.forEach((name) => {
        if (!baseDestVars.some(([key]) => key === name)) {
          baseDestVars.push([name, `Extraído do padrão de origem: {${name}}`]);
        }
        if (!baseFilenameVars.some(([key]) => key === name)) {
          baseFilenameVars.push([name, `Extraído do padrão de origem: {${name}}`]);
        }
      });

      // Update popover HTMLs
      if (destPopover) {
        destPopover.innerHTML = baseDestVars.map(([key, desc]) =>
          `<div class="var-popover-item" data-var="${esc(key)}">
            <code>{${esc(key)}}</code>
            <span>${esc(desc)}</span>
          </div>`
        ).join("");
      }
      if (filenamePopover) {
        filenamePopover.innerHTML = baseFilenameVars.map(([key, desc]) =>
          `<div class="var-popover-item" data-var="${esc(key)}">
            <code>{${esc(key)}}</code>
            <span>${esc(desc)}</span>
          </div>`
        ).join("");
      }
    };

    const read = () => {
      const dest_mode = form.dest_mode?.value || "default";
      const isAuto = dest_mode === "auto";
      const isManual = dest_mode === "manual";
      const chkCreateVars = form.querySelector("#chk-create-vars");

      return {
        name_mode: "pattern",
        enabled: form.enabled?.checked,
        source_dir: form.source_dir?.value.trim(),
        base_rede: dest_mode === "default" ? form.base_rede?.value.trim() : "",
        default_subfolder: dest_mode === "default" ? form.default_subfolder?.value.trim() : "Sefoc",
        mode: isAuto ? "auto" : "default",
        auto_subdir: isAuto ? form.auto_subdir?.value.trim() : "",
        filename_pattern: form.filename_pattern?.value.trim() || "",
        include_version: true,
        filename_override: "",
        rename_to: "",
        name_append: "",
        sufixo: "",
        keep_old: form.keep_old?.checked !== false,
        dest_pattern: isManual ? (form.dest_pattern?.value.trim() || "") : "",
        source_filename_pattern: (isManual && chkCreateVars?.checked) ? (form.source_filename_pattern?.value.trim() || "") : "",
      };
    };

    const renderFilenamePreview = () => {
      const v = read();
      const box = document.getElementById("move-filename-preview");
      if (!box) return;

      // Extract sample variables if source_filename_pattern is provided
      let sampleVars = {};
      if (v.source_filename_pattern) {
        const sampleFile = "2026#10482#Cliente Alpha#Capa";
        const srcClean = v.source_filename_pattern.replace(/\.pdf$/i, "");
        const tokenRe = /\{([A-Za-z_]\w*)\}/g;
        const tokens = [...srcClean.matchAll(tokenRe)].map(m => m[1]);
        if (tokens.length > 0) {
          const parts = srcClean.split(tokenRe);
          let regexParts = [];
          let tokenIdx = 0;
          for (let i = 0; i < parts.length; i++) {
            if (i % 2 === 0) {
              regexParts.push(parts[i].replace(/[.*+?^${}()|[\\]]/g, '\\$&'));
            } else {
              if (tokenIdx === tokens.length - 1) {
                regexParts.push("(.+)");
              } else {
                regexParts.push("([^#]+?)");
              }
              tokenIdx++;
            }
          }
          try {
            const m = new RegExp("^" + regexParts.join("") + "$", "i").exec(sampleFile);
            if (m) {
              tokens.forEach((t, idx) => {
                sampleVars[t] = m[idx + 1].trim();
              });
            }
          } catch (e) { }
        }
      }

      const fromPattern = previewMoveFilenamePattern(v.filename_pattern, {
        include_version: v.include_version,
        keep_old: v.keep_old !== false,
        vars: sampleVars,
      });
      box.textContent = fromPattern || "—";
    };

    const renderDestPatternPreview = () => {
      const v = read();
      const box = document.getElementById("dest-pattern-preview");
      const wrap = document.getElementById("dest-pattern-preview-wrap");
      const dest_mode = form.dest_mode?.value || "default";
      if (wrap) wrap.hidden = dest_mode !== "manual" || !v.dest_pattern;
      if (!box) return;
      if (dest_mode === "manual" && v.dest_pattern) {
        const preview = previewDestPattern(v.dest_pattern, v.source_filename_pattern);
        box.textContent = preview || "—";
      } else {
        box.textContent = "—";
      }
    };
    const render = () => {
      updateDynamicVariables();
      const p = previewMoveRule(read());
      const el = (id, text) => {
        const n = document.getElementById(id);
        if (n) n.textContent = text;
      };
      el("rule-preview-origin", p.origin);
      el("rule-preview-dest", p.destination);
      el("rule-preview-file", p.file);
      el("rule-preview-note", `${p.mode}. ${p.note}`);
      renderFilenamePreview();
      renderDestPatternPreview();
    };

    const toggleOpMode = () => {
      const dest_mode = form.dest_mode?.value || "default";
      const chkCreateVars = form.querySelector("#chk-create-vars");
      form.querySelectorAll("[data-dest-mode-field]").forEach((el) => {
        const fieldMode = el.dataset.destModeField;
        const show = fieldMode === dest_mode;

        if (el.tagName === "INPUT" || el.tagName === "SELECT" || el.tagName === "TEXTAREA") {
          el.disabled = !show;
          el.closest(".form-field")?.classList.toggle("form-field--muted", !show);
        } else {
          el.style.display = show ? "" : "none";
          el.querySelectorAll("input, select, textarea").forEach((child) => {
            if (child.name === "source_filename_pattern") {
              child.disabled = !show || (chkCreateVars && !chkCreateVars.checked);
            } else {
              child.disabled = !show;
            }
          });
        }
      });
      render();
    };

    // Listeners para botões popovers e inserção de variáveis
    form.querySelectorAll(".var-popover-btn").forEach((btn) => {
      btn.onclick = (e) => {
        e.stopPropagation();
        const wrapper = btn.closest(".var-popover-wrapper");
        const menu = wrapper?.querySelector(".var-popover-menu");

        form.querySelectorAll(".var-popover-menu").forEach((m) => {
          if (m !== menu) m.classList.remove("is-active");
        });

        menu?.classList.toggle("is-active");
      };
    });

    form.querySelectorAll(".var-popover-menu").forEach((menu) => {
      menu.onclick = (e) => {
        const item = e.target.closest(".var-popover-item");
        if (!item) return;
        e.stopPropagation();

        const key = item.dataset.var;
        const targetBtn = menu.closest(".var-popover-wrapper")?.querySelector(".var-popover-btn");
        const targetInputName = targetBtn?.dataset.target;
        const inp = form[targetInputName];

        if (inp && key) {
          const token = `{${key}}`;
          const pos = inp.selectionStart ?? inp.value.length;
          inp.value = inp.value.slice(0, pos) + token + inp.value.slice(pos);
          inp.focus();
          inp.selectionStart = inp.selectionEnd = pos + token.length;
        }

        menu.classList.remove("is-active");
        render();
      };
    });

    document.addEventListener("click", () => {
      form.querySelectorAll(".var-popover-menu").forEach((m) => {
        m.classList.remove("is-active");
      });
    });

    form.querySelectorAll("input, select").forEach((el) => {
      el.addEventListener("input", render);
      el.addEventListener("change", () => {
        if (el.name === "dest_mode") toggleOpMode();
        render();
      });
    });

    const chkCreateVars = form.querySelector("#chk-create-vars");
    const sourcePatternWrap = form.querySelector("#source-pattern-field-wrap");

    if (chkCreateVars && sourcePatternWrap) {
      const toggleSourcePatternField = () => {
        const checked = chkCreateVars.checked;
        sourcePatternWrap.style.display = checked ? "" : "none";
        const inp = sourcePatternWrap.querySelector("input[name='source_filename_pattern']");
        if (inp) {
          inp.disabled = !checked;
        }
      };
      
      chkCreateVars.addEventListener("change", () => {
        toggleSourcePatternField();
        render();
      });

      toggleSourcePatternField();
    }

    toggleOpMode();
    render();
  }

  function pathPromptHtml(title, hint) {
    return `${section(
      title,
      hint,
      field(
        "Caminho completo",
        "Use UNC (\\\\servidor\\share) ou letra de unidade (J:\\Pasta). Evite barras simples.",
        `<input id="modal-input" placeholder="\\\\servidor\\share\\pasta ou J:\\Pasta" autocomplete="off" />`,
        "form-field--full"
      )
    )}`;
  }

  function renameFolderPromptHtml(title, hint) {
    return `${section(
      title,
      hint,
      field(
        "Caminho completo",
        "Use UNC (\\\\servidor\\share) ou letra de unidade (J:\\Pasta). Evite barras simples.",
        `<input id="modal-input" placeholder="\\\\servidor\\share\\pasta ou J:\\Pasta" autocomplete="off" />`,
        "form-field--full"
      ) +
      field(
        "Subpastas a ignorar (opcional)",
        "Caminhos relativos ou nomes de pastas separados por vírgula. Ex: ignorar, temp, preflight",
        `<input id="modal-ignored" placeholder="Ex: ignorar, temp, preflight" autocomplete="off" />`,
        "form-field--full"
      )
    )}`;
  }

  return {
    esc,
    tip,
    field,
    section,
    toFrontendPattern,
    toBackendPattern,
    previewRenamePattern,
    previewMoveFilenamePattern,
    ruleFormHtml,
    bindMoveRulePreview,
    pathPromptHtml,
    renameFolderPromptHtml,
  };
})();
