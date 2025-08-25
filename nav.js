// nav.js
(function () {
  const btn = document.getElementById('navToggle');
  const nav = document.getElementById('site-nav');
  const backdrop = document.getElementById('nav-backdrop');

  if (!btn || !nav) return;

  const openNav = () => {
    document.body.classList.add('nav-open');
    btn.setAttribute('aria-expanded', 'true');
    if (backdrop) backdrop.hidden = false;
    // focus al primer link
    const firstLink = nav.querySelector('a');
    firstLink && firstLink.focus();
  };

  const closeNav = () => {
    document.body.classList.remove('nav-open');
    btn.setAttribute('aria-expanded', 'false');
    if (backdrop) backdrop.hidden = true;
    btn.focus();
  };

  btn.addEventListener('click', () => {
    document.body.classList.contains('nav-open') ? closeNav() : openNav();
  });

  // Cerrar con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
      closeNav();
    }
  });

  // Cerrar al clickear un link o el backdrop
  nav.addEventListener('click', (e) => {
    const t = e.target;
    if (t && t.matches && t.matches('a')) closeNav();
  });
  backdrop && backdrop.addEventListener('click', closeNav);

  // Si se agranda la ventana a desktop, cierra el panel
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && document.body.classList.contains('nav-open')) {
      closeNav();
    }
  });
})();