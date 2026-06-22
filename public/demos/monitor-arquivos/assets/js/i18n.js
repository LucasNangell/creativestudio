/** Utilitários de internacionalização e tradução dinâmica do HT Monitor */
(() => {
  "use strict";

  window.HTTranslations = {};

  // Default values mapping (fallback if backend doesn't have it or API fails)
  const DEFAULTS = {
    titulo_painel: "HT Monitor",
    menu_dashboard: "Dashboard",
    menu_banco_dados: "Banco de dados",
    menu_renomeador: "Renomeador",
    menu_movimentacoes: "Movimentações",
    menu_erros: "Log de Erros",
    card_banco_dados: "Banco de Dados",
    lbl_monitoramento: "Monitoramento",
    lbl_conexao: "Conexão",
    status_ativo: "Ativo",
    status_ativa: "Ativa",
    status_parado: "Parado",
    status_inativa: "Inativa",
    status_conectado: "Conectado",
    status_desconectado: "Desconectado",
    btn_reestabelecer: "Reestabelecer",
    card_renomeador: "Renomeador",
    card_movimentacoes: "Movimentações",
    help_titulo_renomeacao: "Renomeação de PDFs originais",
    help_titulo_movimentacao: "Movimentação Automática",
    help_titulo_configuracao: "Configurações Globais",
    help_titulo_ajuda: "Ajuda e Documentação",
    status_pasta: "pasta",
    status_pastas: "pastas",
    status_regra_ativa: "regra ativa",
    status_regras_ativas: "regras ativas"
  };

  const isEditMode = window.location.search.includes("edit_mode=true") || window.location.search.includes("edit_mode=1");

  window._t = function(key, fallback = "") {
    const val = window.HTTranslations[key] || fallback || DEFAULTS[key] || key;
    if (isEditMode) {
      return `<span data-i18n="${key}" contenteditable="true" class="editable-translation-inline" style="outline: 1px dashed #10b981; outline-offset: 2px; cursor: text; display: inline-block; min-width: 20px;">${val}</span>`;
    }
    return val;
  };

  // --- Helpers de Mapeamento (Compartilhados entre Editor e Front Real) ---
  function isTechnicalOrData(text) {
    const t = text.trim();
    if (!t) return true;
    if (t.length === 1 && !/[a-zA-Z0-9à-úÀ-Ú]/.test(t)) return true;
    if (/^\d+([.,]\d+)?$/.test(t)) return true;
    if (/^\d{2,4}[-/.]\d{2}[-/.]\d{2,4}$/.test(t)) return true;
    if (/^\d{2}:\d{2}(:\d{2})?$/.test(t)) return true;
    if (t === "********") return true;
    if (t.endsWith(".exe") || t.endsWith(".pdf") || t.endsWith(".zip") || t.endsWith(".war")) return true;
    if (t.includes("\\") || (t.includes("/") && !t.includes(" "))) return true;
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(t)) return true;
    return false;
  }

  function isInteractive(el) {
    if (!el) return false;
    const tag = el.tagName.toUpperCase();
    if (["BUTTON", "A", "LABEL", "INPUT", "SELECT", "TEXTAREA"].includes(tag)) return true;
    if (el.classList && (el.classList.contains("btn") || el.classList.contains("nav-item") || el.classList.contains("tab"))) return true;
    return false;
  }

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

    let hash = 5381;
    for (let i = 0; i < inputStr.length; i++) {
      hash = ((hash << 5) + hash) + inputStr.charCodeAt(i);
    }
    return "dyn_" + Math.abs(hash & 0xFFFFFFFF).toString(16);
  }

  function wrapTextNodes(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) return false;
    const children = Array.from(element.childNodes);
    let changed = false;

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

  // --- Processar e Traduzir Elemento ---
  function translateElement(el) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return;

    const tag = el.tagName.toUpperCase();
    if (["SCRIPT", "STYLE", "IFRAME", "NOSCRIPT", "IMG", "SVG", "CODE", "PRE", "INPUT", "SELECT", "TEXTAREA", "HEAD", "HTML", "BODY"].includes(tag)) return;
    if (el.closest(".data-table tbody") || el.closest(".path-list") || el.closest(".folder-assign-list") || el.closest("#toasts")) return;
    if (el.hasAttribute("data-no-translate") || el.classList.contains("no-translate") || el.closest("[data-no-translate]") || el.closest(".no-translate")) return;

    // Placeholders e tooltips
    if (el.placeholder) {
      const origPlaceholder = el.placeholder;
      const key = "placeholder_" + generateTextHash(el, origPlaceholder);
      el.setAttribute("data-edit-placeholder-key", key);
      if (!el.dataset.placeholderOriginal) el.dataset.placeholderOriginal = origPlaceholder;
      if (window.HTTranslations[key] !== undefined && el.placeholder !== window.HTTranslations[key]) {
        el.placeholder = window.HTTranslations[key];
      }
    }

    if (el.title) {
      const origTitle = el.title;
      const key = "title_" + generateTextHash(el, origTitle);
      el.setAttribute("data-edit-title-key", key);
      if (!el.dataset.titleOriginal) el.dataset.titleOriginal = origTitle;
      if (window.HTTranslations[key] !== undefined && el.title !== window.HTTranslations[key]) {
        el.title = window.HTTranslations[key];
      }
    }

    // Texto interno
    const hasDataI18n = el.hasAttribute("data-i18n");

    if (hasDataI18n) {
      if (!el.dataset.i18nOriginal) {
        el.dataset.i18nOriginal = el.innerText.trim();
      }
      const key = el.getAttribute("data-i18n");
      const val = window.HTTranslations[key] || DEFAULTS[key] || el.dataset.i18nOriginal || key;
      
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

      // Aplicar estilos salvos
      const styleKey = "style_" + key;
      if (window.HTTranslations[styleKey] !== undefined) {
        el.style.cssText += ";" + window.HTTranslations[styleKey];
      }

      if (isEditMode) {
        el.setAttribute("contenteditable", "true");
        el.classList.add("editable-translation-node");
        el.style.outline = "1px dashed #10b981";
        el.style.outlineOffset = "2px";
        el.style.cursor = "text";

        el.addEventListener("click", (e) => {
          if (e.ctrlKey || e.shiftKey || e.metaKey) {
            return;
          }
          e.stopPropagation();
          if (el.tagName === "A" || el.closest("a")) {
            e.preventDefault();
          }
        });

        el.oninput = () => {
          window.HTTranslations[key] = el.innerText.trim();
        };
      }
    } else {
      wrapTextNodes(el);

      let directText = "";
      let hasMeaningfulText = false;
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
        const cleanedText = el.dataset.editOriginal || directText.trim();
        const key = generateTextHash(el, cleanedText);

        el.setAttribute("data-edit-key", key);
        if (!el.dataset.editOriginal) el.dataset.editOriginal = cleanedText;

        if (window.HTTranslations[key] !== undefined) {
          const val = window.HTTranslations[key];
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

        // Aplicar estilos salvos
        const styleKey = "style_" + key;
        if (window.HTTranslations[styleKey] !== undefined) {
          el.style.cssText += ";" + window.HTTranslations[styleKey];
        }

        if (isEditMode) {
          el.setAttribute("contenteditable", "true");
          el.style.outline = "1px dashed #10b981";
          el.style.outlineOffset = "2px";
          el.style.cursor = "text";
        }
      }
    }
  }

  function translateNodeRecursive(node) {
    if (!node) return;
    if (node.nodeType === Node.ELEMENT_NODE) {
      translateElement(node);
      Array.from(node.children).forEach(child => translateNodeRecursive(child));
    }
  }

  window.HTTranslatePage = function() {
    translateNodeRecursive(document.body);
  };

  // Setup MutationObserver para traduzir elementos dinâmicos em tempo real no front ativo
  let observer = null;
  const observerConfig = {
    childList: true,
    subtree: true,
    characterData: true
  };

  function initDynamicTranslationObserver() {
    observer = new MutationObserver((mutations) => {
      // Pausa a observação para evitar que as nossas próprias alterações causem loop recursivo assíncrono
      observer.disconnect();

      const targets = new Set();
      mutations.forEach(mutation => {
        if (mutation.type === "characterData") {
          const parent = mutation.target.parentElement;
          if (parent) targets.add(parent);
        } else if (mutation.type === "childList") {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              targets.add(node);
            } else if (node.nodeType === Node.TEXT_NODE && node.parentElement) {
              targets.add(node.parentElement);
            }
          });
        }
      });

      if (targets.size > 0) {
        targets.forEach(target => {
          if (target.nodeType === Node.ELEMENT_NODE) {
            if (target.hasAttribute("data-i18n") || target.hasAttribute("data-edit-key")) {
              translateElement(target);
            } else {
              translateNodeRecursive(target);
            }
          }
        });
      }

      // Retoma a observação de novas mutações no DOM
      observer.observe(document.body, observerConfig);
    });

    observer.observe(document.body, observerConfig);
  }

  // Load translations on startup
  window.HTLoadTranslations = async function() {
    try {
      const res = await fetch("/HTmonitor/api/translations?t=" + Date.now(), {
        headers: {
          "Cache-Control": "no-cache",
          "Pragma": "no-cache"
        }
      }).catch(() => null);
      if (res && res.ok) {
        const json = await res.json();
        if (json && json.success && json.data) {
          window.HTTranslations = json.data;
        }
      }
    } catch (e) {
      console.warn("Could not load translations from API, using defaults.", e);
    }
    window.HTTranslatePage();
    initDynamicTranslationObserver();
  };
})();
