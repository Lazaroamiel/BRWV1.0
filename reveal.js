(function () {
  // Respeta usuarios con reduce-motion
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return; // ya lo maneja el CSS

  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || items.length === 0) {
    // Fallback: sin IO, mostrar todo
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger suave según posición en la página
        const index = [...items].indexOf(entry.target);
        entry.target.style.transitionDelay = `${Math.min(index * 60, 300)}ms`;
        entry.target.classList.add('is-visible');

        // Quitar observación para no reanimar
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.12,         // aparece cuando ~12% sea visible
    rootMargin: '0px 0px -10% 0px' // adelanta un poquito
  });

  items.forEach(el => io.observe(el));
})();

// Cerrar otras FAQs cuando se abre una
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.faq__item');
  items.forEach(d => {
    d.addEventListener('toggle', () => {
      if (d.open) items.forEach(o => { if (o !== d) o.open = false; });
    });
  });
});
