/* ==========================================================
   Cinematic Scroll – GSAP ScrollTrigger + Lenis
   Drives the scene-reveal animations on the homepage layout.
   ========================================================== */

(function () {
  'use strict';

  /* --- Bail out early when dependencies are missing --- */
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    // No GSAP → make every scene visible as a no-JS-like fallback
    document.querySelectorAll('.scene:not(.scene--hero)').forEach(function (s) {
      s.classList.add('is-visible');
    });
    return;
  }

  /* --- Reduced-motion check --- */
  var prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    document.querySelectorAll('.scene:not(.scene--hero)').forEach(function (s) {
      s.classList.add('is-visible');
    });
    return; // skip all animation setup
  }

  /* --- Register GSAP plugin --- */
  gsap.registerPlugin(ScrollTrigger);

  /* --- Lenis smooth-scroll (optional) --- */
  var lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.1,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      orientation: 'vertical',
      smoothWheel: true,
    });

    // Pipe Lenis into GSAP's ticker so ScrollTrigger stays in sync
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  /* --- Scene-reveal animations --- */
  var scenes = gsap.utils.toArray('.scene:not(.scene--hero)');
  scenes.forEach(function (scene) {
    gsap.fromTo(
      scene,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: scene,
          start: 'top 85%',
          end: 'top 50%',
          toggleActions: 'play none none none',
          once: true,
          onEnter: function () { scene.classList.add('is-visible'); },
        },
      }
    );
  });

  /* --- Hero scroll-hint fade-out --- */
  var scrollHint = document.querySelector('.hero__scroll-hint');
  if (scrollHint) {
    gsap.to(scrollHint, {
      opacity: 0,
      scrollTrigger: {
        trigger: '.scene--hero',
        start: 'top top',
        end: '+=200',
        scrub: true,
      },
    });
  }
})();
