/* /assets/js/i18n.js */
/*
   CORREÇÃO:
   Agora o dicionário usa 3 níveis:
   1) Idioma atual (TRANSLATIONS[lang])
   2) Português completo (TRANSLATIONS['pt'])
   3) FALLBACKS mínimos (pt)
*/

(function () {
  // --- FALLBACKS DE SEGURANÇA (Mínimo Vital em PT-BR) ---
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

  // 1. Pega o dicionário correto (Idioma > PT completo > Fallback mínimo)
  function getDict(lang) {
    const all = window.TRANSLATIONS || {};

    const primary = all[lang] || {};   // en / es / pt
    const basePt  = all["pt"] || {};   // PT completo
    const fallback = FALLBACKS[lang] || FALLBACKS["pt"] || {};

    return new Proxy({}, {
      get: (_, k) => {
        if (k in primary) return primary[k];
        if (k in basePt)  return basePt[k];
        return fallback[k];
      },
      has: (_, k) => (k in primary) || (k in basePt) || (k in fallback),
    });
  }

  function applyText(dict) {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = dict[key];
      if (val && typeof val === "string" && val.trim() !== "") {
        el.innerHTML = val;
      }
    });
  }

  function applyLists(dict) {
    document.querySelectorAll("[data-i18n-list]").forEach((ul) => {
      const key = ul.getAttribute("data-i18n-list");
      const arr = dict[key];

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

  function applyTitle(dict) {
    const meta = document.querySelector('meta[data-i18n-title]');
    if (!meta) return;
    const key = meta.getAttribute('data-i18n-title');
    const val = dict[key];
    if (val) document.title = val;
  }

  function markLang(lang) {
    document.querySelectorAll(".cabecalho__idiomas__link").forEach((a) => {
      const is = a.getAttribute("data-lang") === lang;
      a.setAttribute("aria-pressed", is ? "true" : "false");
    });
  }

  function applyAll(lang) {
    const dict = getDict(lang);
    applyText(dict);
    applyLists(dict);
    applyAttrs(dict);
    applyTitle(dict);
    markLang(lang);
  }

  const STORAGE_KEY = "siteLang";
  function detectLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    const nav = (navigator.language || "pt").toLowerCase();
    if (nav.startsWith("pt")) return "pt";
    if (nav.startsWith("es")) return "es";
    return "en";
  }

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

  document.addEventListener("DOMContentLoaded", () => {
    const lang = detectLang();
    applyAll(lang);
    bindLangButtons();
  });
})();

