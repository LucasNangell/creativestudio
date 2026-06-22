/**
 * Estúdio de Tradução Visual — Script de Controle Principal
 * Controla o iframe, intercepta ações críticas, observa alterações no DOM (MutationObserver) e sincroniza com a sidebar.
 */
(() => {
  "use strict";

  // Dicionário mestre de traduções (chave -> texto)
  let translations = {};
  let originalValues = {}; // Guarda os valores originais para restauração
  let selectedElement = null; // Elemento atualmente selecionado para edição na sidebar

  const iframe = document.getElementById("editor-iframe");
  const logsBox = document.getElementById("logs-box");
  const btnSave = document.getElementById("btn-save");
  const btnRestore = document.getElementById("btn-restore");
  const btnExport = document.getElementById("btn-export");
  const btnImportTrigger = document.getElementById("btn-import-trigger");
  const fileImport = document.getElementById("file-import");
  const propertiesContainer = document.getElementById("element-properties-content");

  // --- Função de Log Auxiliar ---
  function logEditor(message, type = "info") {
    const time = new Date().toLocaleTimeString();
    if (logsBox) {
      const entry = document.createElement("div");
      entry.className = `log-entry ${type}`;
      entry.textContent = `[${time}] ${message}`;
      logsBox.appendChild(entry);
      logsBox.scrollTop = logsBox.scrollHeight;
    }
    console.log(`[Editor] ${message}`);
  }

  // --- Validador de dados técnicos (para não traduzir números, datas, etc) ---
  function isTechnicalOrData(text) {
    const t = text.trim();
    if (!t) return true;
    if (t.length === 1 && !/[a-zA-Z0-9à-úÀ-Ú]/.test(t)) return true; // Símbolos avulsos
    if (/^\d+([.,]\d+)?$/.test(t)) return true; // Números puros
    if (/^\d{2,4}[-/.]\d{2}[-/.]\d{2,4}$/.test(t)) return true; // Datas
    if (/^\d{2}:\d{2}(:\d{2})?$/.test(t)) return true; // Horas
    if (t === "********") return true; // Senhas mascaradas
    if (t.endsWith(".exe") || t.endsWith(".pdf") || t.endsWith(".zip") || t.endsWith(".war")) return true; // Arquivos
    if (t.includes("\\") || (t.includes("/") && !t.includes(" "))) return true; // Caminhos UNC/Arquivos
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(t)) return true; // IPs
    return false;
  }

  // --- Gerador de Chave Preditiva por Hash ---
  function generateTextHash(element, text) {
    let path = [];
    let curr = element;
    while (curr && curr !== curr.ownerDocument.body) {
      let selector = curr.tagName.toLowerCase();
      if (curr.id) {
        selector += "#" + curr.id;
      } else if (curr.className) {
        const firstClass = curr.className.split(" ").filter(c => c && !c.includes("editable") && !c.includes("processed") && !c.includes("selected"))[0];
        if (firstClass) selector += "." + firstClass;
      }
      path.unshift(selector);
      curr = curr.parentElement;
    }
    const fullPath = path.join(">");
    const cleanText = text.trim();
    const inputStr = `${fullPath}:${cleanText}`;

    // djb2 hash simples e previsível
    let hash = 5381;
    for (let i = 0; i < inputStr.length; i++) {
      hash = ((hash << 5) + hash) + inputStr.charCodeAt(i);
    }
    return "dyn_" + Math.abs(hash & 0xFFFFFFFF).toString(16);
  }

  // --- Carregar Traduções Mestre ---
  async function loadTranslations() {
    try {
      const res = await fetch("../api/translations");
      if (!res.ok) throw new Error("Erro HTTP " + res.status);
      const json = await res.json();
      if (json.success && json.data) {
        translations = json.data;
        logEditor("Dicionário de traduções carregado do servidor.");
      }
    } catch (e) {
      logEditor("Falha ao carregar traduções do servidor. Usando fallback local.", "warn");
    }
  }

  // --- Salvar no Servidor ---
  async function saveTranslations() {
    btnSave.disabled = true;
    btnSave.textContent = "Salvando...";
    logEditor("Enviando traduções atualizadas para o servidor...");
    try {
      const res = await fetch("../api/translations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ translations })
      });
      if (!res.ok) throw new Error("Falha HTTP ao salvar.");
      logEditor("Traduções salvas com sucesso no servidor e replicadas no Tomcat!", "info");
      showToast("Alterações salvas com sucesso!");
    } catch (e) {
      logEditor(`Erro ao salvar no servidor: ${e.message}`, "err");
      showToast("Erro ao salvar traduções.", true);
    } finally {
      btnSave.disabled = false;
      btnSave.textContent = "Salvar no Servidor";
    }
  }

  // --- Exportar JSON ---
  function exportTranslations() {
    logEditor("Exportando JSON de traduções editadas...");
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(translations, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "translations.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      logEditor("Exportação de JSON concluída com sucesso.");
    } catch (e) {
      logEditor(`Erro na exportação: ${e.message}`, "err");
    }
  }

  // --- Importar JSON ---
  function importTranslations(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const imported = JSON.parse(e.target.result);
        if (typeof imported !== "object" || imported === null) {
          throw new Error("O arquivo carregado não é um objeto JSON válido.");
        }
        logEditor(`Importando ${Object.keys(imported).length} chaves do arquivo JSON...`);
        
        // Mesclar com dicionário ativo
        Object.assign(translations, imported);
        if (iframe.contentWindow && iframe.contentWindow.HTTranslations) {
          Object.assign(iframe.contentWindow.HTTranslations, imported);
        }

        // Aplicar alterações na tela
        applyActiveTranslations();
        logEditor("Importação concluída. Lembre-se de clicar em 'Salvar' para consolidar as alterações.", "info");
        showToast("JSON importado com sucesso!");
      } catch (err) {
        logEditor(`Erro na importação: ${err.message}`, "err");
        showToast("Falha ao importar JSON.", true);
      }
    };
    reader.readAsText(file);
  }

  // --- Restaurar Originais ---
  function restoreOriginals() {
    if (!confirm("Tem certeza que deseja redefinir todos os textos para os originais de fábrica?")) return;
    logEditor("Restaurando todos os textos do painel...");

    const iframeDoc = iframe.contentDocument;
    if (!iframeDoc) return;

    // Restaurar textos marcados com data-i18n
    iframeDoc.querySelectorAll("[data-i18n]").forEach(el => {
      const orig = el.dataset.i18nOriginal;
      const key = el.getAttribute("data-i18n");
      if (orig && key) {
        el.textContent = orig;
        translations[key] = orig;
        if (iframe.contentWindow && iframe.contentWindow.HTTranslations) {
          iframe.contentWindow.HTTranslations[key] = orig;
        }
      }
      el.style.color = "";
      el.style.fontFamily = "";
      el.style.fontSize = "";
      el.style.fontWeight = "";
      el.style.textAlign = "";
      el.style.letterSpacing = "";
      el.style.lineHeight = "";
      const styleKey = "style_" + key;
      delete translations[styleKey];
      if (iframe.contentWindow && iframe.contentWindow.HTTranslations) {
        delete iframe.contentWindow.HTTranslations[styleKey];
      }
    });

    // Restaurar chaves dinâmicas geradas
    iframeDoc.querySelectorAll("[data-edit-key]").forEach(el => {
      const orig = el.dataset.editOriginal;
      const key = el.getAttribute("data-edit-key");
      if (orig && key) {
        el.textContent = orig;
        translations[key] = orig;
        if (iframe.contentWindow && iframe.contentWindow.HTTranslations) {
          iframe.contentWindow.HTTranslations[key] = orig;
        }
      }
      el.style.color = "";
      el.style.fontFamily = "";
      el.style.fontSize = "";
      el.style.fontWeight = "";
      el.style.textAlign = "";
      el.style.letterSpacing = "";
      el.style.lineHeight = "";
      const styleKey = "style_" + key;
      delete translations[styleKey];
      if (iframe.contentWindow && iframe.contentWindow.HTTranslations) {
        delete iframe.contentWindow.HTTranslations[styleKey];
      }
    });

    // Restaurar placeholders
    iframeDoc.querySelectorAll("[data-edit-placeholder-key]").forEach(el => {
      const orig = el.dataset.placeholderOriginal;
      const key = el.getAttribute("data-edit-placeholder-key");
      if (orig && key) {
        el.placeholder = orig;
        translations[key] = orig;
      }
    });

    // Restaurar tooltips
    iframeDoc.querySelectorAll("[data-edit-title-key]").forEach(el => {
      const orig = el.dataset.titleOriginal;
      const key = el.getAttribute("data-edit-title-key");
      if (orig && key) {
        el.title = orig;
        translations[key] = orig;
      }
    });

    if (selectedElement) {
      updateSidebarForElement(selectedElement);
    }

    logEditor("Textos originais restaurados na tela com sucesso.", "info");
  }

  // Floating style editor elements
  const floatingPanel = document.getElementById("floating-style-editor");
  const floatingHeader = document.getElementById("floating-panel-hdr");
  const editorTextContent = document.getElementById("editor-text-content");
  const styleColorPicker = document.getElementById("style-color-picker");
  const styleColorText = document.getElementById("style-color-text");
  const styleFontFamily = document.getElementById("style-font-family");
  const styleFontSize = document.getElementById("style-font-size");
  const styleSizeVal = document.getElementById("style-size-val");
  const styleFontWeight = document.getElementById("style-font-weight");
  const styleTextAlign = document.getElementById("style-text-align");
  const styleLetterSpacing = document.getElementById("style-letter-spacing");
  const styleSpacingVal = document.getElementById("style-spacing-val");
  const styleLineHeight = document.getElementById("style-line-height");
  const styleHeightVal = document.getElementById("style-height-val");
  const btnResetElementStyle = document.getElementById("btn-reset-element-style");
  const btnCloseStyleEditor = document.getElementById("btn-close-style-editor");

  // New layout elements
  const styleWidth = document.getElementById("style-width");
  const styleWidthVal = document.getElementById("style-width-val");
  const styleMarginTop = document.getElementById("style-margin-top");
  const styleMarginTopVal = document.getElementById("style-margin-top-val");
  const styleMarginBottom = document.getElementById("style-margin-bottom");
  const styleMarginBottomVal = document.getElementById("style-margin-bottom-val");
  const styleMarginLeft = document.getElementById("style-margin-left");
  const styleMarginLeftVal = document.getElementById("style-margin-left-val");
  const styleMarginRight = document.getElementById("style-margin-right");
  const styleMarginRightVal = document.getElementById("style-margin-right-val");

  // Helper to convert rgb/rgba to hex
  function rgbToHex(rgb) {
    if (!rgb) return "#ffffff";
    const match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
    if (!match) return "#ffffff";
    const r = parseInt(match[1]).toString(16).padStart(2, '0');
    const g = parseInt(match[2]).toString(16).padStart(2, '0');
    const b = parseInt(match[3]).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
  }

  // Load computed / saved styles into the floating style editor panel
  function loadElementStyles(el) {
    if (!el) return;

    // Load text value
    if (editorTextContent) {
      editorTextContent.value = el.textContent;
    }

    // Get iframe window's computed style
    const iframeWin = iframe.contentWindow;
    if (!iframeWin) return;
    const style = iframeWin.getComputedStyle(el);

    // Color conversion
    const computedColor = style.color;
    const hexColor = rgbToHex(computedColor);
    if (styleColorPicker) styleColorPicker.value = hexColor;
    if (styleColorText) styleColorText.value = hexColor;

    // Font Family selection
    const fontFamily = style.fontFamily.replace(/['"]/g, '').toLowerCase();
    let matchedFont = "";
    if (fontFamily.includes("outfit")) {
      matchedFont = "'Outfit', sans-serif";
    } else if (fontFamily.includes("dm sans")) {
      matchedFont = "'DM Sans', sans-serif";
    } else if (fontFamily.includes("jetbrains mono")) {
      matchedFont = "'JetBrains Mono', monospace";
    } else if (fontFamily.includes("monospace")) {
      matchedFont = "monospace";
    } else if (fontFamily.includes("sans-serif")) {
      matchedFont = "sans-serif";
    } else if (fontFamily.includes("serif")) {
      matchedFont = "serif";
    }
    if (styleFontFamily) styleFontFamily.value = matchedFont;

    // Font Size
    const fontSizePx = parseFloat(style.fontSize) || 16;
    if (styleFontSize) {
      styleFontSize.value = Math.round(fontSizePx);
    }
    if (styleSizeVal) {
      styleSizeVal.textContent = Math.round(fontSizePx) + "px";
    }

    // Font Weight
    const fontWeight = style.fontWeight;
    let weightVal = "";
    if (fontWeight === "bold" || fontWeight === "700") weightVal = "700";
    else if (fontWeight === "normal" || fontWeight === "400") weightVal = "400";
    else if (["300", "500", "600", "800"].includes(fontWeight)) weightVal = fontWeight;
    if (styleFontWeight) styleFontWeight.value = weightVal;

    // Text Align
    const textAlign = style.textAlign;
    if (styleTextAlign) {
      if (["left", "center", "right", "justify"].includes(textAlign)) {
        styleTextAlign.value = textAlign;
      } else {
        styleTextAlign.value = "";
      }
    }

    // Letter Spacing
    let letterSpacing = style.letterSpacing;
    if (letterSpacing === "normal") {
      letterSpacing = 0;
    } else {
      letterSpacing = parseFloat(letterSpacing) || 0;
    }
    if (styleLetterSpacing) {
      styleLetterSpacing.value = letterSpacing;
    }
    if (styleSpacingVal) {
      styleSpacingVal.textContent = letterSpacing.toFixed(1) + "px";
    }

    // Line Height
    let lh = style.lineHeight;
    if (lh === "normal") {
      lh = 1.5;
    } else if (lh.endsWith("px")) {
      lh = (parseFloat(lh) / fontSizePx).toFixed(1);
    } else {
      lh = parseFloat(lh) || 1.5;
    }
    if (styleLineHeight) {
      styleLineHeight.value = lh;
    }
    if (styleHeightVal) {
      styleHeightVal.textContent = lh;
    }

    // Width
    const inlineWidth = el.style.width;
    if (inlineWidth) {
      const parsedWidth = parseFloat(inlineWidth);
      if (styleWidth) styleWidth.value = isNaN(parsedWidth) ? 300 : parsedWidth;
      if (styleWidthVal) styleWidthVal.textContent = inlineWidth;
    } else {
      if (styleWidth) styleWidth.value = 300;
      if (styleWidthVal) styleWidthVal.textContent = "Padrão";
    }

    // Margins
    const parseMargin = (val) => {
      if (!val || val === "auto") return 0;
      return parseFloat(val) || 0;
    };
    const mt = parseMargin(style.marginTop);
    const mb = parseMargin(style.marginBottom);
    const ml = parseMargin(style.marginLeft);
    const mr = parseMargin(style.marginRight);

    if (styleMarginTop) styleMarginTop.value = mt;
    if (styleMarginTopVal) styleMarginTopVal.textContent = mt + "px";

    if (styleMarginBottom) styleMarginBottom.value = mb;
    if (styleMarginBottomVal) styleMarginBottomVal.textContent = mb + "px";

    if (styleMarginLeft) styleMarginLeft.value = ml;
    if (styleMarginLeftVal) styleMarginLeftVal.textContent = ml + "px";

    if (styleMarginRight) styleMarginRight.value = mr;
    if (styleMarginRightVal) styleMarginRightVal.textContent = mr + "px";
  }

  // Apply inputs values as styles directly to elements
  function applyStylesToElement() {
    if (!selectedElement) return;
    const key = selectedElement.getAttribute("data-i18n") || selectedElement.getAttribute("data-edit-key");
    if (!key) return;

    const color = styleColorText ? styleColorText.value.trim() : "";
    const fontFamily = styleFontFamily ? styleFontFamily.value : "";
    const fontSize = styleFontSize ? styleFontSize.value : "";
    const fontWeight = styleFontWeight ? styleFontWeight.value : "";
    const textAlign = styleTextAlign ? styleTextAlign.value : "";
    const letterSpacing = styleLetterSpacing ? styleLetterSpacing.value : "0";
    const lineHeight = styleLineHeight ? styleLineHeight.value : "1.5";

    const width = (styleWidth && styleWidthVal && styleWidthVal.textContent !== "Padrão") ? styleWidth.value + "px" : "";
    const marginTop = styleMarginTop ? styleMarginTop.value + "px" : "";
    const marginBottom = styleMarginBottom ? styleMarginBottom.value + "px" : "";
    const marginLeft = styleMarginLeft ? styleMarginLeft.value + "px" : "";
    const marginRight = styleMarginRight ? styleMarginRight.value + "px" : "";

    // Set inline styles on element inside iframe
    selectedElement.style.color = color || "";
    selectedElement.style.fontFamily = fontFamily || "";
    selectedElement.style.fontSize = fontSize ? fontSize + "px" : "";
    selectedElement.style.fontWeight = fontWeight || "";
    selectedElement.style.textAlign = textAlign || "";
    selectedElement.style.letterSpacing = (letterSpacing && parseFloat(letterSpacing) !== 0) ? letterSpacing + "px" : "";
    selectedElement.style.lineHeight = lineHeight || "";

    if (width) selectedElement.style.width = width;
    else selectedElement.style.width = "";

    selectedElement.style.marginTop = (marginTop && parseFloat(marginTop) !== 0) ? marginTop : "";
    selectedElement.style.marginBottom = (marginBottom && parseFloat(marginBottom) !== 0) ? marginBottom : "";
    selectedElement.style.marginLeft = (marginLeft && parseFloat(marginLeft) !== 0) ? marginLeft : "";
    selectedElement.style.marginRight = (marginRight && parseFloat(marginRight) !== 0) ? marginRight : "";

    // Build translation CSS styles representation
    let styles = [];
    if (color) styles.push(`color: ${color}`);
    if (fontFamily) styles.push(`font-family: ${fontFamily}`);
    if (fontSize) styles.push(`font-size: ${fontSize}px`);
    if (fontWeight) styles.push(`font-weight: ${fontWeight}`);
    if (textAlign) styles.push(`text-align: ${textAlign}`);
    if (letterSpacing && parseFloat(letterSpacing) !== 0) styles.push(`letter-spacing: ${letterSpacing}px`);
    if (lineHeight) styles.push(`line-height: ${lineHeight}`);
    if (width) styles.push(`width: ${width}`);
    if (marginTop && parseFloat(marginTop) !== 0) styles.push(`margin-top: ${marginTop}`);
    if (marginBottom && parseFloat(marginBottom) !== 0) styles.push(`margin-bottom: ${marginBottom}`);
    if (marginLeft && parseFloat(marginLeft) !== 0) styles.push(`margin-left: ${marginLeft}`);
    if (marginRight && parseFloat(marginRight) !== 0) styles.push(`margin-right: ${marginRight}`);

    const cssString = styles.join("; ");
    const styleKey = "style_" + key;

    if (cssString) {
      translations[styleKey] = cssString;
      if (iframe.contentWindow && iframe.contentWindow.HTTranslations) {
        iframe.contentWindow.HTTranslations[styleKey] = cssString;
      }
    } else {
      delete translations[styleKey];
      if (iframe.contentWindow && iframe.contentWindow.HTTranslations) {
        delete iframe.contentWindow.HTTranslations[styleKey];
      }
    }
  }

  // Positioning logic to make sure the panel does not obstruct the text
  function positionModalNextToElement(el) {
    if (!el || !floatingPanel) return;
    const rect = el.getBoundingClientRect();
    const iframeRect = iframe.getBoundingClientRect();

    // Absolute position in parent window
    const elemTop = iframeRect.top + rect.top + window.scrollY;
    const elemLeft = iframeRect.left + rect.left + window.scrollX;
    const elemWidth = rect.width;
    const elemHeight = rect.height;

    const panelWidth = floatingPanel.offsetWidth || 340;
    const panelHeight = floatingPanel.offsetHeight || 420;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Try to position to the right of the element
    let top = elemTop;
    let left = elemLeft + elemWidth + 20;

    // If too far right, place to the left
    if (left + panelWidth > viewportWidth) {
      left = elemLeft - panelWidth - 20;
    }

    // If still out of bounds (or no space on left either), default to right side of viewport
    if (left < 10 || left + panelWidth > viewportWidth) {
      left = Math.max(10, viewportWidth - panelWidth - 40);
    }

    // Vertical adjustments
    if (top + panelHeight > viewportHeight) {
      top = Math.max(10, viewportHeight - panelHeight - 20);
    }
    if (top < 10) {
      top = 10;
    }

    floatingPanel.style.top = top + "px";
    floatingPanel.style.left = left + "px";
  }

  // Drag & drop logic for floating style editor
  function makePanelDraggable() {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (floatingHeader) {
      floatingHeader.onmousedown = dragMouseDown;
    } else if (floatingPanel) {
      floatingPanel.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      if (e.target.closest("#btn-close-style-editor")) return;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      let newTop = floatingPanel.offsetTop - pos2;
      let newLeft = floatingPanel.offsetLeft - pos1;

      // Restrict panel within viewport boundaries
      const maxLeft = window.innerWidth - floatingPanel.offsetWidth;
      const maxTop = window.innerHeight - floatingPanel.offsetHeight;

      newLeft = Math.max(0, Math.min(newLeft, maxLeft));
      newTop = Math.max(0, Math.min(newTop, maxTop));

      floatingPanel.style.top = newTop + "px";
      floatingPanel.style.left = newLeft + "px";
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  // Stub function to maintain compatibility with other parts of script (e.g. restore)
  function updateSidebarForElement(el) {
    loadElementStyles(el);
  }

  // --- Aplicar todas as traduções carregadas/importadas ao DOM do Iframe ---
  function applyActiveTranslations() {
    const iframeDoc = iframe.contentDocument;
    if (!iframeDoc) return;

    iframeDoc.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (translations[key] !== undefined) {
        const val = translations[key];
        const currentText = el.innerText.trim();
        if (currentText !== val) {
          if (val.includes("\n")) {
            const temp = el.ownerDocument.createElement("div");
            temp.textContent = val;
            el.innerHTML = temp.innerHTML.replace(/\n/g, "<br>");
          } else {
            el.textContent = val;
          }
        }
      }
      const styleKey = "style_" + key;
      if (translations[styleKey] !== undefined) {
        el.style.cssText += ";" + translations[styleKey];
      }
    });

    iframeDoc.querySelectorAll("[data-edit-key]").forEach(el => {
      const key = el.getAttribute("data-edit-key");
      if (translations[key] !== undefined) {
        const val = translations[key];
        const currentText = el.innerText.trim();
        if (currentText !== val) {
          if (val.includes("\n")) {
            const temp = el.ownerDocument.createElement("div");
            temp.textContent = val;
            el.innerHTML = temp.innerHTML.replace(/\n/g, "<br>");
          } else {
            el.textContent = val;
          }
        }
      }
      const styleKey = "style_" + key;
      if (translations[styleKey] !== undefined) {
        el.style.cssText += ";" + translations[styleKey];
      }
    });

    iframeDoc.querySelectorAll("[data-edit-placeholder-key]").forEach(el => {
      const key = el.getAttribute("data-edit-placeholder-key");
      if (translations[key] !== undefined) {
        el.placeholder = translations[key];
      }
    });

    iframeDoc.querySelectorAll("[data-edit-title-key]").forEach(el => {
      const key = el.getAttribute("data-edit-title-key");
      if (translations[key] !== undefined) {
        el.title = translations[key];
      }
    });
  }

  // --- MOCK API E BLOQUEIO DE AÇÕES CRÍTICAS ---
  function mockIframeApi() {
    const win = iframe.contentWindow;
    if (!win || !win.HTApi) return;

    const writeMethods = [
      "restartServices", "restartMonitor", "restartRename", "restartMove",
      "testMysql", "saveMysql", "saveMonitorApi", "addMonitorFolder",
      "removeMonitorFolder", "syncMonitor", "createPattern", "updatePattern",
      "deletePattern", "saveVariable", "deleteVariable", "addRenameFolder",
      "assignPattern", "removeRenameFolder", "saveRenameErrorPolicy",
      "clearRenameHistory", "saveMoveErrorPolicy", "createRule", "updateRule",
      "deleteRule", "reorderRules", "runMove", "clearMoveHistory", "clearErrors"
    ];

    writeMethods.forEach(method => {
      if (win.HTApi[method]) {
        win.HTApi[method] = async function(...args) {
          logEditor(`[BLOQUEADO] Chamada crítica '${method}' simulada/bloqueada para segurança. Args: ${JSON.stringify(args)}`, "warn");
          return { success: true, message: `[Simulação] Método ${method} executado com sucesso.` };
        };
      }
    });

    logEditor("Endpoints de gravação do cliente HTApi interceptados com sucesso.");
  }

  // --- Injetar Estilos CSS de Edição no Iframe ---
  function injectIframeStyles() {
    const iframeDoc = iframe.contentDocument;
    if (!iframeDoc) return;
    
    // Evita duplicidade
    if (iframeDoc.getElementById("editor-inline-styles")) return;

    const style = iframeDoc.createElement("style");
    style.id = "editor-inline-styles";
    style.textContent = `
      [data-i18n], [data-edit-key] {
        outline: 1px dashed #10b981 !important;
        outline-offset: 2px !important;
        cursor: text !important;
        transition: outline 0.15s ease, background 0.15s ease !important;
      }
      [data-i18n]:hover, [data-edit-key]:hover {
        background: rgba(16, 185, 129, 0.08) !important;
        outline: 1.5px dashed #10b981 !important;
      }
      [data-i18n]:focus, [data-edit-key]:focus {
        outline: 2px solid #10b981 !important;
        background: rgba(16, 185, 129, 0.12) !important;
      }
      .selected-editable-element {
        outline: 2px solid #3b82f6 !important;
        background: rgba(59, 130, 246, 0.15) !important;
        outline-offset: 2px !important;
      }
      a[data-i18n], button[data-i18n], a[data-edit-key], button[data-edit-key] {
        cursor: text !important;
      }
    `;
    iframeDoc.head.appendChild(style);
    logEditor("Estilos de edição visual inline injetados no frame.");
  }

  function isInteractive(el) {
    if (!el) return false;
    const tag = el.tagName.toUpperCase();
    if (["BUTTON", "A", "LABEL", "INPUT", "SELECT", "TEXTAREA"].includes(tag)) return true;
    if (el.classList && (el.classList.contains("btn") || el.classList.contains("nav-item") || el.classList.contains("tab"))) return true;
    return false;
  }

  // --- Função Recursiva para Envelopar Text Nodes Soltos ---
  // Impede que tags filhas quebrem ao editar contêineres maiores
  function wrapTextNodes(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) return false;
    const children = Array.from(element.childNodes);
    let changed = false;

    // Envelopar se o contêiner tiver outros nós filhos HTML OU se for um elemento interativo
    // (isso evita que o contenteditable seja aplicado diretamente no botão/link, travando o clique nativo do navegador)
    if (element.children.length > 0 || isInteractive(element)) {
      children.forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          const text = child.textContent.trim();
          if (text && !isTechnicalOrData(text)) {
            const span = element.ownerDocument.createElement("span");
            span.className = "editable-text-wrapper";
            span.textContent = child.textContent;
            element.replaceChild(span, child);
            changed = true;
          }
        }
      });
    }
    return changed;
  }

  // --- Processar e preparar um Elemento Único ---
  function processElement(el) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return;

    // Ignorar elementos críticos e técnicos
    const tag = el.tagName.toUpperCase();
    if (["SCRIPT", "STYLE", "IFRAME", "NOSCRIPT", "IMG", "SVG", "CODE", "PRE", "INPUT", "SELECT", "TEXTAREA", "HEAD", "HTML", "BODY"].includes(tag)) return;
    
    // Ignorar tabelas de histórico ou listas de caminhos do banco/sincronização
    if (el.closest(".data-table tbody") || el.closest(".path-list") || el.closest(".folder-assign-list") || el.closest("#toasts")) return;
    if (el.hasAttribute("data-no-translate") || el.classList.contains("no-translate") || el.closest("[data-no-translate]") || el.closest(".no-translate")) return;
    
    // Se já foi processado, pular
    if (el.hasAttribute("data-editor-processed")) return;

    // 1. Verificar Placeholders e Titles antes de filtrar texto interno
    if (el.placeholder && !el.hasAttribute("data-edit-placeholder-key")) {
      const origPlaceholder = el.placeholder;
      const key = "placeholder_" + generateTextHash(el, origPlaceholder);
      el.setAttribute("data-edit-placeholder-key", key);
      el.dataset.placeholderOriginal = origPlaceholder;
      if (translations[key] === undefined) {
        translations[key] = origPlaceholder;
      } else {
        el.placeholder = translations[key];
      }
      logEditor(`[CHAVE CRIADA] Placeholder detectado: '${origPlaceholder}' -> '${key}'`);
    }

    if (el.title && !el.hasAttribute("data-edit-title-key")) {
      const origTitle = el.title;
      const key = "title_" + generateTextHash(el, origTitle);
      el.setAttribute("data-edit-title-key", key);
      el.dataset.titleOriginal = origTitle;
      if (translations[key] === undefined) {
        translations[key] = origTitle;
      } else {
        el.title = translations[key];
      }
      logEditor(`[CHAVE CRIADA] Tooltip (title) detectado: '${origTitle}' -> '${key}'`);
    }

    // 2. Processar texto interno
    const hasDataI18n = el.hasAttribute("data-i18n");

    if (hasDataI18n) {
      // Elemento com chave predefinida no HTML
      el.setAttribute("contenteditable", "true");
      el.setAttribute("data-editor-processed", "true");
      if (!el.dataset.i18nOriginal) {
        el.dataset.i18nOriginal = el.innerText.trim();
      }
      const key = el.getAttribute("data-i18n");
      if (translations[key] !== undefined) {
        const val = translations[key];
        const currentText = el.innerText.trim();
        if (currentText !== val) {
          if (val.includes("\n")) {
            const temp = el.ownerDocument.createElement("div");
            temp.textContent = val;
            el.innerHTML = temp.innerHTML.replace(/\n/g, "<br>");
          } else {
            el.textContent = val;
          }
        }
      } else {
        translations[key] = el.innerText.trim();
      }

      // Aplicar estilos salvos
      const styleKey = "style_" + key;
      if (translations[styleKey] !== undefined) {
        el.style.cssText += ";" + translations[styleKey];
      }

      logEditor(`[ELEMENTO DETECTADO] Texto estático com chave data-i18n='${key}'`);
    } else {
      // Verificar se possui nós de texto direto válidos
      let directText = "";
      let hasMeaningfulText = false;

      // Envelopar se necessário
      wrapTextNodes(el);

      Array.from(el.childNodes).forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          const text = child.textContent.trim();
          if (text && !isTechnicalOrData(text)) {
            directText += text + " ";
            hasMeaningfulText = true;
          }
        }
      });

      if (hasMeaningfulText && el.children.length === 0) {
        // Elemento folha com texto puro
        const cleanedText = el.dataset.editOriginal || directText.trim();
        const key = generateTextHash(el, cleanedText);

        el.setAttribute("data-edit-key", key);
        el.setAttribute("contenteditable", "true");
        el.setAttribute("data-editor-processed", "true");
        if (!el.dataset.editOriginal) el.dataset.editOriginal = cleanedText;

        if (translations[key] !== undefined) {
          const val = translations[key];
          const currentText = el.innerText.trim();
          if (currentText !== val) {
            if (val.includes("\n")) {
              const temp = el.ownerDocument.createElement("div");
              temp.textContent = val;
              el.innerHTML = temp.innerHTML.replace(/\n/g, "<br>");
            } else {
              el.textContent = val;
            }
          }
        } else {
          translations[key] = cleanedText;
        }

        // Aplicar estilos salvos
        const styleKey = "style_" + key;
        if (translations[styleKey] !== undefined) {
          el.style.cssText += ";" + translations[styleKey];
        }

        logEditor(`[CHAVE CRIADA] Texto dinâmico: '${cleanedText.slice(0, 30)}...' -> '${key}'`);
      }
    }
  }

  // --- Varrer Recursivamente um Elemento e seus Filhos ---
  function scanNode(node) {
    if (!node) return;
    if (node.nodeType === Node.ELEMENT_NODE) {
      processElement(node);
      Array.from(node.children).forEach(child => scanNode(child));
    }
  }

  // --- Configurar MutationObserver para capturar elementos adicionados dinamicamente ---
  let observer = null;
  function setupMutationObserver() {
    const iframeDoc = iframe.contentDocument;
    if (!iframeDoc) return;

    if (observer) observer.disconnect();

    observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Atrasar levemente o scan para garantir que scripts do frame preencham o conteúdo
            setTimeout(() => {
              scanNode(node);
            }, 50);
          }
        });
      });
    });

    observer.observe(iframeDoc.body, { childList: true, subtree: true });
    logEditor("MutationObserver ativado no documento do frame.");
  }

  // --- Configurar Listeners de Eventos no Frame ---
  function setupIframeEventListeners() {
    const iframeDoc = iframe.contentDocument;
    if (!iframeDoc) return;

    // 1. Delegar cliques para selecionar elementos
    iframeDoc.body.addEventListener("click", (e) => {
      const el = e.target.closest("[data-i18n], [data-edit-key]");
      if (el) {
        // Se o usuário clicar segurando Ctrl, Shift ou Cmd, deixa o clique passar para o comportamento nativo
        if (e.ctrlKey || e.shiftKey || e.metaKey) {
          return;
        }

        // Impedir navegação, envio de formulário ou disparo de botões
        e.preventDefault();
        e.stopPropagation();

        // Destacar elemento visualmente
        iframeDoc.querySelectorAll(".selected-editable-element").forEach(node => {
          node.classList.remove("selected-editable-element");
        });
        el.classList.add("selected-editable-element");

        selectedElement = el;

        // Mostrar painel de estilos
        if (floatingPanel) {
          floatingPanel.style.display = "block";
          loadElementStyles(el);
          positionModalNextToElement(el);
        }

        logEditor(`Elemento selecionado: [Tag: ${el.tagName.toLowerCase()}]`);
      } else {
        // Se clicar em um botão normal sem edição para abrir um modal ou navegar
        const button = e.target.closest("button, .btn, .nav-item");
        if (button) {
          // Bloquear botões de configuração que iniciam gravação, exceto para abrir modais ou tabs
          if (button.id && ["btn-save-mysql", "btn-save-api", "btn-save-pattern", "btn-save-rename-errors", "btn-save-move-errors"].includes(button.id)) {
            e.preventDefault();
            e.stopPropagation();
            logEditor(`[BLOQUEADO] Envio do formulário '${button.id}' bloqueado para segurança no modo de edição.`, "warn");
            showToast("Ação de gravação bloqueada no editor.", true);
          }
        }
      }
    }, true);

    // 2. Escutar entrada de texto direta (inline contenteditable)
    iframeDoc.body.addEventListener("input", (e) => {
      const el = e.target.closest("[data-i18n], [data-edit-key]");
      if (el) {
        const key = el.getAttribute("data-i18n") || el.getAttribute("data-edit-key");
        const val = el.innerText.trim();
        translations[key] = val;
        
        if (iframe.contentWindow && iframe.contentWindow.HTTranslations) {
          iframe.contentWindow.HTTranslations[key] = val;
        }

        // Se o elemento estiver ativo no painel, atualizar o textarea
        if (selectedElement === el && editorTextContent) {
          editorTextContent.value = val;
        }

        logEditor(`Texto alterado inline: "${val.slice(0, 30)}..." [Chave: ${key}]`);
      }
    });

    logEditor("Listeners de evento vinculados ao frame.");
  }

  // --- Sincronizar interações dos Sliders e Inputs do modal de Estilo ---
  function initStyleEditorListeners() {
    if (styleColorPicker) {
      styleColorPicker.addEventListener("input", (e) => {
        if (styleColorText) styleColorText.value = e.target.value;
        applyStylesToElement();
      });
    }

    if (styleColorText) {
      styleColorText.addEventListener("input", (e) => {
        const val = e.target.value;
        if (/^#[0-9A-F]{6}$/i.test(val)) {
          if (styleColorPicker) styleColorPicker.value = val;
        }
        applyStylesToElement();
      });
    }

    if (styleFontFamily) {
      styleFontFamily.addEventListener("change", applyStylesToElement);
    }

    if (styleFontSize) {
      styleFontSize.addEventListener("input", (e) => {
        if (styleSizeVal) styleSizeVal.textContent = e.target.value + "px";
        applyStylesToElement();
      });
    }

    if (styleFontWeight) {
      styleFontWeight.addEventListener("change", applyStylesToElement);
    }

    if (styleTextAlign) {
      styleTextAlign.addEventListener("change", applyStylesToElement);
    }

    if (styleLetterSpacing) {
      styleLetterSpacing.addEventListener("input", (e) => {
        if (styleSpacingVal) styleSpacingVal.textContent = parseFloat(e.target.value).toFixed(1) + "px";
        applyStylesToElement();
      });
    }

    if (styleLineHeight) {
      styleLineHeight.addEventListener("input", (e) => {
        if (styleHeightVal) styleHeightVal.textContent = e.target.value;
        applyStylesToElement();
      });
    }

    if (styleWidth) {
      styleWidth.addEventListener("input", (e) => {
        if (styleWidthVal) styleWidthVal.textContent = e.target.value + "px";
        applyStylesToElement();
      });
    }

    if (styleMarginTop) {
      styleMarginTop.addEventListener("input", (e) => {
        if (styleMarginTopVal) styleMarginTopVal.textContent = e.target.value + "px";
        applyStylesToElement();
      });
    }

    if (styleMarginBottom) {
      styleMarginBottom.addEventListener("input", (e) => {
        if (styleMarginBottomVal) styleMarginBottomVal.textContent = e.target.value + "px";
        applyStylesToElement();
      });
    }

    if (styleMarginLeft) {
      styleMarginLeft.addEventListener("input", (e) => {
        if (styleMarginLeftVal) styleMarginLeftVal.textContent = e.target.value + "px";
        applyStylesToElement();
      });
    }

    if (styleMarginRight) {
      styleMarginRight.addEventListener("input", (e) => {
        if (styleMarginRightVal) styleMarginRightVal.textContent = e.target.value + "px";
        applyStylesToElement();
      });
    }

    if (editorTextContent) {
      editorTextContent.addEventListener("input", (e) => {
        if (!selectedElement) return;
        const key = selectedElement.getAttribute("data-i18n") || selectedElement.getAttribute("data-edit-key");
        if (!key) return;
        const val = e.target.value;
        
        if (val.includes("\n")) {
          const temp = selectedElement.ownerDocument.createElement("div");
          temp.textContent = val;
          selectedElement.innerHTML = temp.innerHTML.replace(/\n/g, "<br>");
        } else {
          selectedElement.textContent = val;
        }
        
        translations[key] = val;
        if (iframe.contentWindow && iframe.contentWindow.HTTranslations) {
          iframe.contentWindow.HTTranslations[key] = val;
        }
      });
    }

    if (btnResetElementStyle) {
      btnResetElementStyle.onclick = () => {
        if (!selectedElement) return;
        const key = selectedElement.getAttribute("data-i18n") || selectedElement.getAttribute("data-edit-key");
        if (!key) return;

        // Reset style
        selectedElement.style.color = "";
        selectedElement.style.fontFamily = "";
        selectedElement.style.fontSize = "";
        selectedElement.style.fontWeight = "";
        selectedElement.style.textAlign = "";
        selectedElement.style.letterSpacing = "";
        selectedElement.style.lineHeight = "";
        selectedElement.style.width = "";
        selectedElement.style.marginTop = "";
        selectedElement.style.marginBottom = "";
        selectedElement.style.marginLeft = "";
        selectedElement.style.marginRight = "";

        const styleKey = "style_" + key;
        delete translations[styleKey];
        if (iframe.contentWindow && iframe.contentWindow.HTTranslations) {
          delete iframe.contentWindow.HTTranslations[styleKey];
        }

        // Reload to show defaults
        loadElementStyles(selectedElement);
        logEditor(`Estilos do elemento resetados [Chave: ${key}]`);
      };
    }

    if (btnCloseStyleEditor) {
      btnCloseStyleEditor.onclick = () => {
        if (floatingPanel) floatingPanel.style.display = "none";
        if (selectedElement) {
          selectedElement.classList.remove("selected-editable-element");
          selectedElement = null;
        }
      };
    }

    makePanelDraggable();
  }

  // --- Toast Flutuante no Pai ---
  function showToast(text, isError = false) {
    const toast = document.getElementById("toast");
    if (toast) {
      toast.textContent = text;
      toast.style.background = isError ? "rgba(239, 68, 68, 0.95)" : "rgba(16, 185, 129, 0.95)";
      toast.style.color = isError ? "#fff" : "#000";
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 3000);
    }
  }

  // --- Rotina de Inicialização do Frame ---
  async function initEditor() {
    logEditor("Carregando ambiente do editor...");
    
    // Carregar traduções mestre
    await loadTranslations();

    // Configurar os handlers e listeners do editor de estilo flutuante
    initStyleEditorListeners();

    // Varrer DOM inicial do iframe
    scanNode(iframe.contentDocument.body);

    // Mapear traduções existentes na tela
    applyActiveTranslations();

    // Interceptar chamadas de API
    mockIframeApi();

    // Injetar estilos CSS de hover/seleção
    injectIframeStyles();

    // Iniciar MutationObserver
    setupMutationObserver();

    // Configurar listeners de clique/input
    setupIframeEventListeners();

    logEditor("Ambiente de tradução visual pronto para uso!", "info");
  }

  // --- Ligar eventos da Sidebar Principal ---
  btnSave.onclick = saveTranslations;
  btnRestore.onclick = restoreOriginals;
  btnExport.onclick = exportTranslations;
  btnImportTrigger.onclick = () => fileImport.click();
  fileImport.onchange = (e) => {
    if (e.target.files.length) {
      importTranslations(e.target.files[0]);
    }
  };

  // Se o iframe já estiver carregado (ou ao carregar)
  if (iframe.contentDocument && iframe.contentDocument.readyState === "complete") {
    initEditor();
  } else {
    iframe.onload = initEditor;
  }
})();
