/* /assets/js/script.js */
(function () {
  // Funções de apoio para buscar o idioma e o dicionário de traduções
  const getCurrentLanguage = () => localStorage.getItem("siteLang") || "pt";

  const getDictionary = () => {
    const lang = getCurrentLanguage();
    const all = window.TRANSLATIONS || {};

    const primary = all[lang] || {};
    const basePt  = all["pt"] || {};

    return new Proxy({}, {
      get: (_, k) => {
        if (k in primary) return primary[k];
        return basePt[k];
      },
      has: (_, k) => (k in primary) || (k in basePt),
    });
  };

  // --- MENU HAMBÚRGUER GLOBAL ---
  const btnHamb = document.querySelector('.cabecalho__menu-hamburguer');
  const menu = document.getElementById('menu-navegacao');

  if (btnHamb && menu) {
    btnHamb.setAttribute('aria-expanded', 'false');

    const toggleMenu = () => {
      const isAberto = menu.classList.contains('aberto');
      if (isAberto) {
        menu.classList.remove('aberto');
        btnHamb.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      } else {
        menu.classList.add('aberto');
        btnHamb.setAttribute('aria-expanded', 'true');
        document.body.classList.add('no-scroll');
      }
    };

    btnHamb.addEventListener('click', toggleMenu);

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('aberto');
        btnHamb.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      });
    });

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

      // --- INJEÇÃO DE CONTEÚDO PARA EXP / PORTFÓLIO ---
      if (targetId === 'exp-modal' || targetId.startsWith('modal-')) {
        const dict = getDictionary();
        const titleKey = btn.getAttribute('data-modal-title-key');
        const listKey = btn.getAttribute('data-modal-list-key'); 

        const titleEl = modal.querySelector('.modal-title');
        const bodyEl = modal.querySelector('.modal-body');
        
        if (titleKey && titleEl) {
          titleEl.textContent = dict[titleKey] || titleEl.textContent || 'Detalhes';
        }
        
        if (listKey && bodyEl && Array.isArray(dict[listKey])) {
          const listItems = dict[listKey].map(item => `<li>${item}</li>`).join('');
          bodyEl.innerHTML = `<ul>${listItems}</ul>`;
        } else if (bodyEl && !bodyEl.innerHTML.trim()) {
          bodyEl.innerHTML = '<p>Conteúdo indisponível.</p>';
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
