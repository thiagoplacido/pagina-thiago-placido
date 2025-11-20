document.addEventListener("DOMContentLoaded", () => {
  /**
   * Carrega arquivos HTML em elementos com o atributo [data-include],
   * garantindo que outros scripts possam aguardar sua conclusão.
   */
  async function loadIncludes() {
    const elements = document.querySelectorAll("[data-include]");

    // Cria um array de promises para cada operação de fetch.
    // O map sempre retornará uma promise, mesmo que a operação falhe,
    // permitindo que Promise.all aguarde a conclusão de todas.
    const promises = Array.from(elements).map(async (el) => {
      const file = el.dataset.include;
      if (!file) return;

      try {
        const response = await fetch(file);

        if (!response.ok) {
          // Lança um erro para ser capturado pelo bloco catch.
          throw new Error(`Falha na requisição com status ${response.status}`);
        }

        el.innerHTML = await response.text();
      } catch (error) {
        console.error(`Erro ao carregar o include: ${file}`, error);
        // Insere um comentário no HTML para facilitar a depuração.
        el.innerHTML = `<!-- Erro ao carregar ${file} -->`;
      }
    });

    // Aguarda que todos os includes (sucessos ou falhas) terminem.
    await Promise.all(promises);

    // Sinaliza globalmente que o processo foi concluído.
    window.includesReady = true;
    document.dispatchEvent(new CustomEvent("includes:ready"));
  }

  loadIncludes();
});

