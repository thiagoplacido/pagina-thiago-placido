// assets/js/includes.js
document.addEventListener('DOMContentLoaded', () => {
  const includeElements = document.querySelectorAll('[data-include][data-src]');

  if (!includeElements.length) {
    window.includesReady = true;
    document.dispatchEvent(new Event('includes:ready'));
    return;
  }

  const promises = Array.from(includeElements).map((el) => {
    const src = el.getAttribute('data-src');

    return fetch(src)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro ao carregar include: ${src}`);
        }
        return response.text();
      })
      .then((html) => {
        // Troca o <div data-include> inteiro pelo conteúdo do arquivo
        el.outerHTML = html;
      })
      .catch((err) => {
        console.error(err);
      });
  });

  Promise.all(promises).then(() => {
    window.includesReady = true;
    document.dispatchEvent(new Event('includes:ready'));
  });
});
