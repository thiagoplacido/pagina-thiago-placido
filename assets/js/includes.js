// /assets/js/includes.js
(function () {
  async function processIncludes() {
    const includeEls = document.querySelectorAll("[data-include][data-src]");
    if (!includeEls.length) {
      window.includesReady = true;
      document.dispatchEvent(new CustomEvent("includes:ready"));
      return;
    }

    const promises = Array.from(includeEls).map(async (el) => {
      const src = el.getAttribute("data-src");
      if (!src) return;

      try {
        const resp = await fetch(src);
        if (!resp.ok) throw new Error("Erro ao buscar " + src);
        const html = await resp.text();
        el.innerHTML = html;
      } catch (err) {
        console.error("include error:", src, err);
        el.innerHTML = "<!-- erro ao carregar include: " + src + " -->";
      }
    });

    await Promise.all(promises);

    // Marca que terminou
    window.includesReady = true;
    document.dispatchEvent(new CustomEvent("includes:ready"));

    // Se o i18n expuser uma função global, reaplica nas novas partes
    if (typeof window.applyTranslations === "function") {
      window.applyTranslations();
    }
  }

  document.addEventListener("DOMContentLoaded", processIncludes);
})();
