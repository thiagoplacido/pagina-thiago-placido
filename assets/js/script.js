/* /assets/js/script.js */
(function () {
  // Funções de apoio para buscar o idioma e o dicionário de traduções
  const getCurrentLanguage = () => localStorage.getItem("siteLang") || "pt";
  const getDictionary = () => window.TRANSLATIONS[getCurrentLanguage()] || window.TRANSLATIONS["pt"];

  // --- MENU HAMBÚRGUER GLOBAL ---
  const btnHamb = document.querySelector('.cabecalho__menu-hamburguer');
  const menu = document.getElementById('menu-navegacao');

  if (btnHamb && menu) {
    btnHamb.setAttribute('aria-expanded', 'false');

    const toggleMenu = () => {
      const isAberto = menu.classList.contains('aberto');
      if (isAberto) {
        // Ação: Fechar
        menu.classList.remove('aberto');
        btnHamb.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      } else {
        // Ação: Abrir
        menu.classList.add('aberto');
        btnHamb.setAttribute('aria-expanded', 'true');
        document.body.classList.add('no-scroll');
      }
    };

    btnHamb.addEventListener('click', toggleMenu);

    // Fechar ao clicar em qualquer link
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('aberto');
        btnHamb.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      });
    });

    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('aberto')) {
        toggleMenu();
        btnHamb.focus();
      }
    });
  }

  // ----------------------------------------------------
  // --- MODAIS (Lógica de abertura e INJEÇÃO DE CONTEÚDO) ---
  // ----------------------------------------------------
  
  const openBtns = document.querySelectorAll('[data-modal-target]');
  const modals = document.querySelectorAll('.modal');

  function openModal(modal) {
    // CORREÇÃO CRÍTICA: Força a rolagem para o topo da página antes de abrir o modal e bloquear o scroll.
    window.scrollTo(0, 0); 
    
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('visivel'), 10);
    document.body.classList.add('no-scroll', 'modal-aberto');
  }

  function closeModal(modal) {
    modal.classList.remove('visivel');
    setTimeout(() => modal.style.display = 'none', 300);
    document.body.classList.remove('no-scroll', 'modal-aberto');
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-modal-target');
      const modal = document.getElementById(targetId);
      if (!modal) return;

      // --- INJEÇÃO DE CONTEÚDO ---
      if (targetId === 'exp-modal' || targetId.startsWith('modal-')) {
        const dict = getDictionary();
        const titleKey = btn.getAttribute('data-modal-title-key');
        const listKey = btn.getAttribute('data-modal-list-key'); 

        // Usa querySelector para pegar elementos dentro do modal (mais seguro)
        const titleEl = modal.querySelector('.modal-title');
        const bodyEl = modal.querySelector('.modal-body');
        
        // Aplica o Título (para modais de experiência e portfólio)
        if (titleKey && titleEl) {
           titleEl.textContent = dict[titleKey] || titleEl.textContent || 'Detalhes';
        }
        
        // Aplica a Lista de Itens (exp1Items, alpha1Items, etc.)
        if (listKey && bodyEl && dict[listKey] && Array.isArray(dict[listKey])) {
            const listItems = dict[listKey].map(item => `<li>${item}</li>`).join('');
            bodyEl.innerHTML = `<ul>${listItems}</ul>`;
        } else if (bodyEl) {
            // Se não for uma lista array, limpa ou mostra conteúdo estático/erro
            bodyEl.innerHTML = bodyEl.innerHTML || '<p>Conteúdo indisponível.</p>';
        }
      }
      // --- FIM DA INJEÇÃO DE CONTEÚDO ---
      
      openModal(modal);
    });
  });

  modals.forEach(modal => {
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', () => closeModal(modal));
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });
})();
