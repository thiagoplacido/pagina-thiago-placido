/* /assets/js/i18n.js */
/*
   CORREÇÃO:
   Este script agora busca 'window.TRANSLATIONS' com segurança.
   Se não encontrar, usa o FALLBACKS interno para garantir que o site
   sempre mostre conteúdo, mesmo se houver erro de carregamento.
*/

(function () {
  // --- FALLBACKS DE SEGURANÇA (Mínimo Vital em PT-BR) ---
  // Garante que o site não fique branco se o translations.js falhar
  const FALLBACKS = {
    pt: {
      homeLink: "Início",
      portfolioTitle: "Portfólio",
      heroTitle: "Thiago Placido • DEV",
      heroParagraph: "Transformo problemas em soluções simples.",
      footerText: "© 2025 • Thiago Placido • DEV",
      pageTitleHome: "Portfólio",
      contactLink: "Contato",
      aboutLink: "Sobre",
      skillsLink: "Habilidades",
      ideasLink: "Ideias",
      deliveryLink: "Entrega",
      educationLink: "Formação",
      experienceLink: "Experiência"
    }
  };

  // 1. Pega o dicionário correto (Window > Fallback > Vazio)
  function getDict(lang) {
    // Tenta pegar do arquivo translations.js
    const global = (window.TRANSLATIONS && window.TRANSLATIONS[lang]) || {};
    // Tenta pegar do fallback local
    const fallback = FALLBACKS[lang] || FALLBACKS['pt'] || {};
    
    // Mescla: Global tem prioridade sobre Fallback
    return new Proxy({}, {
      get: (_, k) => (k in global ? global[k] : fallback[k]),
      has: (_, k) => (k in global) || (k in fallback),
    });
  }

  // 2. Aplica textos simples (data-i18n)
  function applyText(dict) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = dict[key];
      // Só substitui se houver texto válido
      if (val && typeof val === "string" && val.trim() !== "") {
        el.innerHTML = val; // innerHTML permite tags básicas como <strong>
      }
    });
  }

  // 3. Aplica listas (data-i18n-list)
  function applyLists(dict) {
    document.querySelectorAll("[data-i18n-list]").forEach((ul) => {
      const key = ul.getAttribute("data-i18n-list");
      const arr = dict[key];
      
      // Verifica se é uma array (ex: items) ou string HTML (ex: <li>...</li>)
      if (Array.isArray(arr) && arr.length) {
        ul.innerHTML = "";
        arr.forEach((item) => {
          const li = document.createElement("li");
          li.innerHTML = item;
          ul.appendChild(li);
        });
      } else if (typeof arr === "string") {
         ul.innerHTML = arr;
      }
    });
  }

  // 4. Aplica atributos (data-i18n-attr="alt:key,title:key")
  function applyAttrs(dict) {
    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      const pairs = el.getAttribute("data-i18n-attr").split(",");
      pairs.forEach((pair) => {
        const [attr, key] = pair.split(":").map((s) => s.trim());
        const val = dict[key];
        if (val) el.setAttribute(attr, val);
      });
    });
  }

  // 5. Aplica título da aba do navegador
  function applyTitle(dict) {
    const meta = document.querySelector('meta[data-i18n-title]');
    if (!meta) return;
    const key = meta.getAttribute('data-i18n-title');
    const val = dict[key];
    if (val) document.title = val;
  }

  // 6. Atualiza botões de idioma (visual)
  function markLang(lang) {
    document.querySelectorAll(".cabecalho__idiomas__link").forEach((a) => {
      const is = a.getAttribute("data-lang") === lang;
      a.setAttribute("aria-pressed", is ? "true" : "false");
    });
  }

  // Função Mestra: Aplica tudo
  function applyAll(lang) {
    const dict = getDict(lang);
    applyText(dict);
    applyLists(dict);
    applyAttrs(dict);
    applyTitle(dict);
    markLang(lang);
  }

  // Detecção inicial do idioma
  const STORAGE_KEY = "siteLang";
  function detectLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    const nav = (navigator.language || "pt").toLowerCase();
    if (nav.startsWith("pt")) return "pt";
    if (nav.startsWith("es")) return "es";
    return "en";
  }

  // Escuta cliques nos botões de bandeira
  function bindLangButtons() {
    document.querySelectorAll(".cabecalho__idiomas__link").forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const lang = a.getAttribute("data-lang") || "pt";
        localStorage.setItem(STORAGE_KEY, lang);
        applyAll(lang);
      });
    });
  }

  // Inicialização
  document.addEventListener("DOMContentLoaded", () => {
    const lang = detectLang();
    applyAll(lang);
    bindLangButtons();
  });
})();