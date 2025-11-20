/* /assets/js/script.js */
(function () {
  // ================================
  // 1. DESTACAR LINK ATUAL NO MENU
  // ================================
  function highlightCurrentLink() {
    const menu = document.querySelector(".site-nav");
    if (!menu) return;

    const links = menu.querySelectorAll("a[href]");
    if (!links.length) return;

    const path = window.location.pathname;
    const currentPage = path.split("/").pop() || "index.html";

    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;
      const linkPage = href.split("/").pop();

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
  }

  // ================================
  // 2. MENU HAMBÚRGUER
  // ================================
  function initHamburgerMenu() {
    // CORRIGIDO: agora bate com o HTML (.site-headers__menu-toggle)
    const btnHamb = document.querySelector(".site-headers__menu-toggle");
    const menu = document.querySelector(".site-nav");
    if (!btnHamb || !menu) return;

    btnHamb.setAttribute("aria-expanded", "false");

    const toggleMenu = () => {
      const isAberto =
        menu.classList.contains("aberto") ||
        menu.classList.contains("ativo");

      if (isAberto) {
        menu.classList.remove("aberto", "ativo");
        btnHamb.setAttribute("aria-expanded", "false");
        document.body.classList.remove("no-scroll");
      } else {
        menu.classList.add("aberto", "ativo");
        btnHamb.setAttribute("aria-expanded", "true");
        document.body.classList.add("no-scroll");
      }
    };

    btnHamb.addEventListener("click", toggleMenu);

    // Fecha ao clicar em um link do menu
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("aberto", "ativo");
        btnHamb.setAttribute("aria-expanded", "false");
        document.body.classList.remove("no-scroll");
      });
    });

    // Fecha com ESC
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        (menu.classList.contains("aberto") ||
          menu.classList.contains("ativo"))
      ) {
        toggleMenu();
        btnHamb.focus();
      }
    });
  }

  // ================================
  // 3. MODAIS (PORTFÓLIO / EXP)
  // ================================
  function initModals() {
    const openBtns = document.querySelectorAll("[data-modal-target]");
    const modals = document.querySelectorAll(".modal");
    if (!openBtns.length || !modals.length) return;

    const openModal = (modal) => {
      if (!modal) return;
      modal.style.display = "flex";
      requestAnimationFrame(() => {
        modal.classList.add("visivel");
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
    };

    openBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
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
    highlightCurrentLink();
    initHamburgerMenu();
    initModals();
  }

  if (window.includesReady) {
    initSite();
  } else {
    document.addEventListener("includes:ready", initSite);
  }
})();
