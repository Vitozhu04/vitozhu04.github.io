/* ==========================================================
   cinematic-scroll.js  v2
   Lenis inertia scroll + GSAP scrubbed animations
   ========================================================== */

(function () {
  'use strict';

  /* ── guards ── */
  if (typeof gsap === 'undefined') return;
  if (typeof Lenis === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* ── Lenis: inertia smooth scroll ── */
  const lenis = new Lenis({
    lerp: 0.09,          // momentum feel — lower = more glide
    smoothWheel: true,
    syncTouch: false,
  });

  gsap.registerPlugin(ScrollTrigger);

  /* pipe Lenis into GSAP ticker */
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  /* keep ScrollTrigger in sync with Lenis */
  lenis.on('scroll', ScrollTrigger.update);

  /* ══════════════════════════════════════════════
     HERO — entrance animation on page load
  ══════════════════════════════════════════════ */
  const heroTl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.15 });

  /* grid */
  heroTl.to('.hero__grid', { opacity: 1, duration: 2 }, 0);

  /* name slides up from clip */
  heroTl.to('.hero__name', { y: '0%', duration: 1.1 }, 0.2);

  /* eyebrow */
  heroTl.to('.hero__eyebrow', { opacity: 1, y: 0, duration: 0.8 }, 0.55);

  /* tagline */
  heroTl.to('.hero__tagline', { opacity: 1, y: 0, duration: 0.8 }, 0.75);

  /* social links */
  heroTl.to('.hero__links', { opacity: 1, y: 0, duration: 0.8 }, 0.9);

  /* scroll hint */
  heroTl.to('.hero__scroll', { opacity: 1, duration: 0.6 }, 1.3);

  /* ── hero exits on scroll (scale + fade) ── */
  gsap.to('.hero__inner', {
    scrollTrigger: {
      trigger: '.scene--hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 0.8,
    },
    y: -60,
    opacity: 0,
    ease: 'none',
  });

  gsap.to('.hero__grid', {
    scrollTrigger: {
      trigger: '.scene--hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
    scale: 1.06,
    opacity: 0,
    ease: 'none',
  });

  /* ══════════════════════════════════════════════
     CHAPTERS — scrubbed reveals
  ══════════════════════════════════════════════ */
  document.querySelectorAll('.chapter').forEach((chapter) => {
    const label = chapter.querySelector('.chapter__label');
    const headlines = chapter.querySelectorAll('.chapter__headline');
    const body = chapter.querySelector('.chapter__body');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: chapter,
        start: 'top 78%',
        end: 'top 20%',
        scrub: 0.7,
      },
    });

    if (label)       tl.to(label, { opacity: 1, x: 0, duration: 1 }, 0);
    if (headlines.length)
                     tl.to(headlines, { y: '0%', duration: 1, stagger: 0.12 }, 0.1);
    if (body)        tl.to(body, { opacity: 1, y: 0, duration: 1 }, 0.45);
  });

  /* ══════════════════════════════════════════════
     TIMELINE ITEMS — staggered, scrubbed
  ══════════════════════════════════════════════ */
  document.querySelectorAll('.timeline-item').forEach((item) => {
    gsap.to(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 88%',
        end: 'top 55%',
        scrub: 0.55,
      },
      opacity: 1,
      x: 0,
      ease: 'none',
    });
  });

  /* ══════════════════════════════════════════════
     NEWS ITEMS
  ══════════════════════════════════════════════ */
  document.querySelectorAll('.news-item').forEach((item) => {
    gsap.to(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 90%',
        end: 'top 62%',
        scrub: 0.45,
      },
      opacity: 1,
      y: 0,
      ease: 'none',
    });
  });

  /* ══════════════════════════════════════════════
     AWARD ITEMS
  ══════════════════════════════════════════════ */
  document.querySelectorAll('.award-item').forEach((item) => {
    gsap.to(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 88%',
        end: 'top 58%',
        scrub: 0.45,
      },
      opacity: 1,
      y: 0,
      ease: 'none',
    });
  });

  /* ══════════════════════════════════════════════
     PUBLICATIONS heading
  ══════════════════════════════════════════════ */
  const pubHeading = document.querySelector('.scene--publications h2');
  if (pubHeading) {
    gsap.from(pubHeading, {
      scrollTrigger: {
        trigger: pubHeading,
        start: 'top 80%',
        end: 'top 45%',
        scrub: 0.6,
      },
      y: 30,
      opacity: 0,
      ease: 'none',
    });
  }

  /* ══════════════════════════════════════════════
     SCROLL NAV DOTS
  ══════════════════════════════════════════════ */
  const navEl = document.querySelector('.scroll-nav');
  const dots  = navEl ? navEl.querySelectorAll('.scroll-nav__dot') : [];
  const sections = document.querySelectorAll('[data-section]');

  let shown = false;
  lenis.on('scroll', ({ scroll }) => {
    if (!shown && scroll > 80) {
      navEl && navEl.classList.add('visible');
      shown = true;
    }
  });

  sections.forEach((sec, i) => {
    if (!dots[i]) return;

    /* scroll to section on dot click */
    dots[i].addEventListener('click', () => {
      lenis.scrollTo(sec, { offset: -80, duration: 2.2, easing: (t) => 1 - Math.pow(1 - t, 4) });
    });

    /* highlight active dot */
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 60%',
      end: 'bottom 40%',
      onToggle: (self) => {
        dots[i].classList.toggle('active', self.isActive);
      },
    });
  });

})();
