/* ==========================================================
   cinematic-scroll.js  v3
   Lenis inertia + GSAP scrubbed animations, 2-column layout
   ========================================================== */

(function () {
  'use strict';

  if (typeof gsap === 'undefined') return;
  if (typeof Lenis === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* ── Lenis ── */
  const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, syncTouch: false });
  gsap.registerPlugin(ScrollTrigger);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  lenis.on('scroll', ScrollTrigger.update);

  /* ══════════════════════════════════════════════
     HERO ENTRANCE
  ══════════════════════════════════════════════ */
  const heroTl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.1 });

  heroTl.to('.hero__grid',    { opacity: 1, duration: 2.5 }, 0);
  heroTl.to('.hero__name',    { y: '0%', duration: 1.2 }, 0.15);
  heroTl.to('.hero__eyebrow', { opacity: 1, y: 0, duration: 0.9 }, 0.5);
  heroTl.to('.hero__tagline', { opacity: 1, y: 0, duration: 0.9 }, 0.7);
  heroTl.to('.hero__links',   { opacity: 1, y: 0, duration: 0.9, stagger: 0.05 }, 0.85);
  heroTl.to('.hero__scroll',  { opacity: 1, duration: 0.7 }, 1.4);

  /* hero parallax exit */
  gsap.to('.hero__inner', {
    scrollTrigger: { trigger: '.scene--hero', start: 'top top', end: 'bottom top', scrub: 0.8 },
    y: -80, opacity: 0, ease: 'none',
  });
  gsap.to('.hero__grid', {
    scrollTrigger: { trigger: '.scene--hero', start: 'top top', end: 'bottom top', scrub: 1.2 },
    scale: 1.08, opacity: 0, ease: 'none',
  });

  /* ══════════════════════════════════════════════
     CHAPTERS — scrubbed 2-column reveals
  ══════════════════════════════════════════════ */
  document.querySelectorAll('.chapter').forEach((chapter) => {
    const label     = chapter.querySelector('.chapter__label');
    const headlines = chapter.querySelectorAll('.chapter__headline');
    const body      = chapter.querySelector('.chapter__body');

    /* vertical rule between columns */
    const rule = chapter;   /* ::before pseudo – animate via CSS var trick */
    gsap.to(chapter, {
      scrollTrigger: { trigger: chapter, start: 'top 80%', end: 'top 30%', scrub: 0.6 },
      '--rule-scale': 1,    /* custom property driven by CSS (see ::before) */
      ease: 'none',
    });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: chapter, start: 'top 82%', end: 'top 15%', scrub: 0.75 },
    });

    /* label: slides in from left */
    if (label)
      tl.to(label, { opacity: 1, x: 0, duration: 1, ease: 'none' }, 0);

    /* headline: clips up from bottom */
    if (headlines.length)
      tl.to(headlines, { y: '0%', duration: 1.1, stagger: 0.1, ease: 'none' }, 0.08);

    /* body: rises up */
    if (body)
      tl.to(body, { opacity: 1, y: 0, duration: 1, ease: 'none' }, 0.25);
  });

  /* ── divider rule reveal (pseudo-element via JS) ── */
  document.querySelectorAll('.chapter').forEach((chapter) => {
    gsap.fromTo(chapter, { '--divider-scale': 0 }, {
      '--divider-scale': 1,
      scrollTrigger: { trigger: chapter, start: 'top 75%', end: 'top 25%', scrub: 0.6 },
      ease: 'none',
    });
  });

  /* ══════════════════════════════════════════════
     TIMELINE ITEMS — stagger + slide
  ══════════════════════════════════════════════ */
  document.querySelectorAll('.timeline-item').forEach((item, i) => {
    gsap.fromTo(item,
      { opacity: 0, x: 30 },
      {
        scrollTrigger: { trigger: item, start: 'top 90%', end: 'top 55%', scrub: 0.5 },
        opacity: 1, x: 0, ease: 'none',
      }
    );
  });

  /* ══════════════════════════════════════════════
     NEWS — stagger slide up
  ══════════════════════════════════════════════ */
  document.querySelectorAll('.news-item').forEach((item, i) => {
    gsap.fromTo(item,
      { opacity: 0, y: 20 },
      {
        scrollTrigger: { trigger: item, start: 'top 92%', end: 'top 65%', scrub: 0.4 },
        opacity: 1, y: 0, ease: 'none',
      }
    );
  });

  /* ══════════════════════════════════════════════
     AWARDS — stagger scale + fade
  ══════════════════════════════════════════════ */
  document.querySelectorAll('.award-item').forEach((item, i) => {
    gsap.fromTo(item,
      { opacity: 0, y: 24, scale: 0.97 },
      {
        scrollTrigger: { trigger: item, start: 'top 90%', end: 'top 58%', scrub: 0.45 },
        opacity: 1, y: 0, scale: 1, ease: 'none',
      }
    );
  });

  /* ══════════════════════════════════════════════
     PUBLICATIONS heading — clip reveal
  ══════════════════════════════════════════════ */
  const pubHeading = document.querySelector('.scene--publications h2');
  if (pubHeading) {
    gsap.fromTo(pubHeading,
      { opacity: 0, y: 40 },
      {
        scrollTrigger: { trigger: pubHeading, start: 'top 82%', end: 'top 45%', scrub: 0.6 },
        opacity: 1, y: 0, ease: 'none',
      }
    );
  }

  /* pub rows stagger */
  document.querySelectorAll('.pub-row').forEach((row, i) => {
    gsap.fromTo(row,
      { opacity: 0, y: 30 },
      {
        scrollTrigger: { trigger: row, start: 'top 92%', end: 'top 60%', scrub: 0.5 },
        opacity: 1, y: 0, ease: 'none',
      }
    );
  });

  /* ══════════════════════════════════════════════
     SCROLL NAV DOTS
  ══════════════════════════════════════════════ */
  const navEl   = document.querySelector('.scroll-nav');
  const dots    = navEl ? [...navEl.querySelectorAll('.scroll-nav__dot')] : [];
  const sections = [...document.querySelectorAll('[data-section]')];

  let shown = false;
  lenis.on('scroll', ({ scroll }) => {
    if (!shown && scroll > 80) { navEl && navEl.classList.add('visible'); shown = true; }
  });

  sections.forEach((sec, i) => {
    if (!dots[i]) return;
    dots[i].addEventListener('click', () => {
      lenis.scrollTo(sec, { offset: -60, duration: 2.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
    });
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 60%',
      end: 'bottom 40%',
      onToggle: ({ isActive }) => dots[i].classList.toggle('active', isActive),
    });
  });

  /* ══════════════════════════════════════════════
     MAGNETIC NAV DOTS micro-interaction
  ══════════════════════════════════════════════ */
  dots.forEach((dot) => {
    dot.addEventListener('mouseenter', () => gsap.to(dot, { scale: 1.8, duration: 0.3, ease: 'back.out(2)' }));
    dot.addEventListener('mouseleave', () => gsap.to(dot, { scale: dot.classList.contains('active') ? 1.6 : 1, duration: 0.3, ease: 'back.out(2)' }));
  });

})();
