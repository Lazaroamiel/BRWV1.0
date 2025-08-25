// carousel.js
(function(){
  const carousels = document.querySelectorAll('.carousel');
  if (!carousels.length) return;

  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel__track');
    const prev  = carousel.querySelector('.prev');
    const next  = carousel.querySelector('.next');
    const viewport = carousel.querySelector('.carousel__viewport');

    // Asegura que el viewport sea navegable con teclado
    viewport.setAttribute('tabindex', '0');
    viewport.setAttribute('aria-roledescription', 'carrusel');

    const updateButtons = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      const atStart = track.scrollLeft <= 2;                 // tolerancia
      const atEnd   = track.scrollLeft >= maxScroll - 2;

      prev.disabled = atStart;
      next.disabled = atEnd;
    };

    const slideBy = (dir = 1) => {
      const width = viewport.clientWidth;
      track.scrollBy({ left: width * dir, behavior: 'smooth' });
    };

    prev.addEventListener('click', () => slideBy(-1));
    next.addEventListener('click', () => slideBy(1));

    track.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);

    // Soporta teclado (← →) cuando el viewport tiene foco
    viewport.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); slideBy(1); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); slideBy(-1); }
    });

    // Inicial
    updateButtons();
  });
})();