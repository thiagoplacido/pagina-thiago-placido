/* /assets/js/script.js (VERSÃO FINAL E FUNCIONAL) */
(function () {
  // ================================
  // 1. DESTACAR LINK ATUAL NO MENU
  // ================================
  function highlightCurrentLink() {
    // Busca o elemento de navegação principal (que agora tem o ID)
    const menu = document.querySelector("#menu-navegacao"); 
    if (!menu) return;

    const links = menu.querySelectorAll("a[href]");
    if (!links.length) return;

    const path = window.location.pathname;
    // Pega o nome do arquivo, tratando a raiz ('/') como 'index.html'
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
  }

  // ================================
  // 2. MENU HAMBÚRGUER (Acessibilidade: Foco e Estado)
  // ================================
  function initHamburgerMenu() {
    // 💡 CORREÇÃO APLICADA: Busca o container principal que foi alvo do includes.js
    const headerElement = document.getElementById("site-headers"); 
    if (!headerElement) return; // Se o container não existe, para.

    // Procura o botão e o menu DENTRO do header injetado (Infalível em páginas injetadas)
    const btnHamb = headerElement.querySelector(".site-headers__menu-toggle");
    const menu = headerElement.querySelector(".site-nav"); 
    
    if (!btnHamb || !menu) return; // Se os elementos internos não existirem, para.

    btnHamb.setAttribute("aria-expanded", "false");

    const toggleMenu = (event) => {
      const isAberto =
        menu.classList.contains("aberto") ||
        menu.classList.contains("ativo");

      if (isAberto) {
        // Ações de Fechamento
        menu.classList.remove("aberto", "ativo");
        btnHamb.setAttribute("aria-expanded", "false");
        document.body.classList.remove("no-scroll");

        // Retorna o foco ao botão que abriu, exceto se for fechado por clique em link
        if (event && event.type !== 'click') {
           btnHamb.focus();
        }

      } else {
        // Ações de Abertura
        menu.classList.add("aberto", "ativo");
        btnHamb.setAttribute("aria-expanded", "true");
        document.body.classList.add("no-scroll");

        // MELHORIA A11Y: Move o foco para o primeiro link do menu
        const firstLink = menu.querySelector("a");
        if (firstLink) {
          firstLink.focus();
        }
      }
    };

    btnHamb.addEventListener("click", toggleMenu);

    // Fecha ao clicar em um link do menu (Garante que o toggleMenu é chamado para fechar)
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (e) => {
        if (menu.classList.contains("aberto") || menu.classList.contains("ativo")) {
            // Chama toggleMenu para atualizar estados, passando o evento de clique
            toggleMenu(e); 
        }
      });
    });

    // Fecha com ESC
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        (menu.classList.contains("aberto") ||
          menu.classList.contains("ativo"))
      ) {
        // Chama toggleMenu para fechar, passando o evento de tecla
        toggleMenu(e); 
        btnHamb.focus(); // Retorna o foco para o botão após fechar com ESC
      }
    });
  }

  // ================================
  // 3. MODAIS (PORTFÓLIO / EXP) - (Acessibilidade: Foco)
  // ================================
  function initModals() {
    const openBtns = document.querySelectorAll("[data-modal-target]");
    const modals = document.querySelectorAll(".modal");
    if (!openBtns.length || !modals.length) return;
    
    // Variável para armazenar o botão que abriu o modal (para focar nele depois)
    let triggerElement = null; 

    const openModal = (modal) => {
      if (!modal) return;
      modal.style.display = "flex";
      requestAnimationFrame(() => {
        modal.classList.add("visivel");
        
        // MELHORIA A11Y: Move o foco para o container do modal
        const modalContent = modal.querySelector(".modal-content");
        if (modalContent) {
           modalContent.setAttribute("tabindex", "-1"); 
           modalContent.focus(); // Move o foco para dentro do modal
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
      
      // MELHORIA A11Y: Retorna o foco para o elemento que abriu
      if (triggerElement) {
        triggerElement.focus();
        triggerElement = null; // Limpa o elemento de disparo
      }
    };

    openBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        triggerElement = btn; // Armazena o botão que abriu
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

      // Fecha ao clicar fora do conteúdo
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
    // EXECUTAR AS FUNÇÕES QUE DEPENDEM DE ELEMENTOS INJETADOS
    highlightCurrentLink();
    initHamburgerMenu(); 
    initModals();
}

// 💡 GARANTIA DE EXECUÇÃO: Aguarda o evento 'includes:ready'
document.addEventListener("includes:ready", initSite);

// Redundância para navegadores que carregam includes rapidamente
if (window.includesReady) {
    initSite();
}
})();
