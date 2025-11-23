/* /assets/js/script.js (VERSÃO AJUSTADA E SEGURA) */
(function () {
  // Flags para evitar inicializações duplicadas
  let linksHighlighted = false;
  let hamburgerInitialized = false;
  let modalsInitialized = false;

  // ================================
  // 1. DESTACAR LINK ATUAL NO MENU
  // ================================
  function highlightCurrentLink() {
    if (linksHighlighted) return;

    const menu = document.querySelector("#menu-navegacao");
    if (!menu) return;

    const links = menu.querySelectorAll("a[href]");
    if (!links.length) return;

    const path = window.location.pathname;
    const currentPage = path.split("/").pop() || "index.html";

    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;

      const linkPage = href.split("/").pop() || "index.html";

      const isHomePage =
        (currentPage === "" || currentPage === "index.html") &&
        (linkPage === "" || linkPage === "index.html");

      const isSamePage = !isHomePage && currentPage === linkPage;

      if (isHomePage || isSamePage) {
        link.setAttribute("aria-current", "page");
        link.classList.add("is-active");
      } else {
        link.removeAttribute("aria-current");
        link.classList.remove("is-active");
      }
    });

    linksHighlighted = true;
  }

  // ================================
  // 2. MENU HAMBÚRGUER (MOBILE)
  // ================================
  function initHamburgerMenu() {
    // Evita registrar eventos mais de uma vez
    if (hamburgerInitialized) return;

    // Busca direta no documento (mais robusto entre páginas)
    const btnHamb = document.querySelector(".site-headers__menu-toggle");
    const menu = document.querySelector("#menu-navegacao");

    if (!btnHamb || !menu) {
      // Se ainda não existirem (includes não carregados), não marca como inicializado
      return;
    }

    hamburgerInitialized = true;

    btnHamb.setAttribute("aria-expanded", "false");

    const toggleMenu = (event) => {
      const isAberto =
        menu.classList.contains("aberto") || menu.classList.contains("ativo");

      if (isAberto) {
        // FECHAR
        menu.classList.remove("aberto", "ativo");
        btnHamb.setAttribute("aria-expanded", "false");
        document.body.classList.remove("no-scroll");

        // Se fechou por ESC, devolve foco ao botão
        if (event && event.type === "keydown") {
          btnHamb.focus();
        }
      } else {
        // ABRIR
        menu.classList.add("aberto", "ativo");
        btnHamb.setAttribute("aria-expanded", "true");
        document.body.classList.add("no-scroll");

        // Acessibilidade: foco no primeiro link
        const firstLink = menu.querySelector("a");
        if (firstLink) {
          firstLink.focus();
        }
      }
    };

    // Clique no ícone do hambúrguer
    btnHamb.addEventListener("click", toggleMenu);

    // Fecha ao clicar em um link do menu
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (e) => {
        if (menu.classList.contains("aberto") || menu.classList.contains("ativo")) {
          toggleMenu(e);
        }
      });
    });

    // Fecha com ESC
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        (menu.classList.contains("aberto") || menu.classList.contains("ativo"))
      ) {
        toggleMenu(e);
      }
    });
  }

  // ================================
  // 3. MODAIS (PORTFÓLIO / EXP)
  // ================================
  function initModals() {
    if (modalsInitialized) return;

    const openBtns = document.querySelectorAll("[data-modal-target]");
    const modals = document.querySelectorAll(".modal");

    // Se não houver modais na página, apenas marca como inicializado
    if (!openBtns.length || !modals.length) {
      modalsInitialized = true;
      return;
    }

    modalsInitialized = true;

    let triggerElement = null;

    const openModal = (modal) => {
      if (!modal) return;

      modal.style.display = "flex";
      requestAnimationFrame(() => {
        modal.classList.add("visivel");

        const modalContent = modal.querySelector(".modal-content");
        if (modalContent) {
          modalContent.setAttribute("tabindex", "-1");
          modalContent.focus();
        }
      });
      document.body.classList.add("no-scroll", "modal-aberto");
    };

    const closeModal = (modal) => {
      if (!modal) return;

      modal.classList.remove("visivel");
      setTimeout(() => {
        modal.style.display = "none";
      }, 250);
      document.body.classList.remove("no-scroll", "modal-aberto");

      if (triggerElement) {
        triggerElement.focus();
        triggerElement = null;
      }
    };

    openBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        triggerElement = btn;
        const targetId = btn.getAttribute("data-modal-target");
        const modal = document.getElementById(targetId);
        openModal(modal);
      });
    });

    modals.forEach((modal) => {
      const closeBtn = modal.querySelector(".modal-close");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => closeModal(modal));
      }

      modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal(modal);
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      const aberto = document.querySelector(".modal.visivel");
      if (aberto) closeModal(aberto);
    });
  }

  // ================================
  // 4. INICIALIZAÇÃO GERAL
  // ================================
  function initSite() {
    // Tudo que depende do header injetado
    highlightCurrentLink();
    initHamburgerMenu();
    initModals();
  }

  // Aguarda includes.js sinalizar que terminou
  document.addEventListener("includes:ready", initSite);

  // Se o includes já terminou antes do script carregar
  if (window.includesReady) {
    initSite();
  }
})();
