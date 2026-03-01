/* ==========================================================
   cinematic-scroll.js  v4
   Lenis inertia + GSAP scrubbed animations
   Right fly-in cards, varied chapter anims, GSAP pub stack, sidebar nav
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

  const isMobile = window.matchMedia('(max-width:1024px)').matches;

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
     SIDEBAR NAV — show after hero, active dots, click-to-scroll
  ══════════════════════════════════════════════ */
  const sidebarNav = document.querySelector('.sidebar-nav');
  const sidebarItems = sidebarNav ? [...sidebarNav.querySelectorAll('.sidebar-nav__item')] : [];
  const sections = [...document.querySelectorAll('[data-section]')];

  if (sidebarNav && !isMobile) {
    /* Show sidebar after scrolling past hero */
    ScrollTrigger.create({
      trigger: '.scene--hero',
      start: 'bottom 80%',
      onEnter: () => sidebarNav.classList.add('visible'),
      onLeaveBack: () => sidebarNav.classList.remove('visible'),
    });

    /* Click to scroll */
    sidebarItems.forEach((item) => {
      const target = item.getAttribute('data-target');
      const section = document.querySelector('[data-section="' + target + '"]');
      if (section) {
        item.addEventListener('click', () => {
          lenis.scrollTo(section, { offset: -60, duration: 2.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
        });
      }
    });

    /* Active dot tracking */
    sections.forEach((sec) => {
      const sectionName = sec.getAttribute('data-section');
      const matchingItem = sidebarItems.find((item) => item.getAttribute('data-target') === sectionName);
      if (!matchingItem) return;
      const dot = matchingItem.querySelector('.sidebar-nav__dot');

      ScrollTrigger.create({
        trigger: sec,
        start: 'top 60%',
        end: 'bottom 40%',
        onToggle: ({ isActive }) => {
          if (dot) dot.classList.toggle('active', isActive);
          matchingItem.classList.toggle('active', isActive);
        },
      });
    });

    /* Magnetic hover on dots */
    sidebarItems.forEach((item) => {
      const dot = item.querySelector('.sidebar-nav__dot');
      if (!dot) return;
      item.addEventListener('mouseenter', () => gsap.to(dot, { scale: 2, duration: 0.3, ease: 'back.out(2)' }));
      item.addEventListener('mouseleave', () => gsap.to(dot, { scale: dot.classList.contains('active') ? 1.5 : 1, duration: 0.3, ease: 'back.out(2)' }));
    });
  }

  /* ══════════════════════════════════════════════
     CHAPTERS — varied fly-in directions (desktop only)
  ══════════════════════════════════════════════ */
  const chapterAnimConfig = {
    about:    { xPercent: 100, yPercent: 0 },
    career:   { xPercent: -100, yPercent: 0 },
    research: { xPercent: 0, yPercent: 100 },
    news:     { xPercent: 100, yPercent: 0 },
    awards:   { xPercent: 100, yPercent: 0 },
  };

  const allChapters = gsap.utils.toArray('.chapter');

  allChapters.forEach((chapter, i) => {
    const sectionName = chapter.getAttribute('data-section');
    const config = chapterAnimConfig[sectionName];

    if (!isMobile && config) {
      /* Fly-in animation for the entire chapter card */
      gsap.fromTo(chapter,
        { xPercent: config.xPercent, yPercent: config.yPercent },
        {
          scrollTrigger: {
            trigger: chapter,
            start: 'top bottom',
            end: 'top 20%',
            scrub: 0.7,
          },
          xPercent: 0,
          yPercent: 0,
          ease: 'none',
        }
      );
    }

    /* Internal content animations (always, both mobile and desktop) */
    const counter   = chapter.querySelector('.chapter__counter');
    const label     = chapter.querySelector('.chapter__label');
    const headlines = chapter.querySelectorAll('.chapter__headline');
    const divider   = chapter.querySelector('.chapter__divider');
    const body      = chapter.querySelector('.chapter__body');

    const tl = gsap.timeline({
      scrollTrigger: { trigger: chapter, start: 'top 70%', end: 'top 15%', scrub: 0.75 },
    });

    if (counter) tl.to(counter, { opacity: 1, duration: 0.6, ease: 'none' }, 0);
    if (label)   tl.to(label, { opacity: 1, y: 0, duration: 0.8, ease: 'none' }, 0.05);
    if (headlines.length) tl.to(headlines, { y: '0%', duration: 1.1, stagger: 0.1, ease: 'none' }, 0.1);
    if (divider) tl.to(divider, { scaleX: 1, duration: 1, ease: 'none' }, 0.3);
    if (body)    tl.to(body, { opacity: 1, y: 0, duration: 1, ease: 'none' }, 0.4);
  });

  /* Chapter scale-down when next one enters (desktop only) */
  if (!isMobile) {
    allChapters.forEach((chapter, i) => {
      if (i < allChapters.length - 1) {
        const nextChapter = allChapters[i + 1];
        gsap.to(chapter, {
          scrollTrigger: {
            trigger: nextChapter,
            start: 'top bottom',
            end: 'top 30%',
            scrub: 0.5,
          },
          scale: 0.96,
          filter: 'brightness(0.75)',
          ease: 'none',
        });
      }
    });
  }

  /* ══════════════════════════════════════════════
     SERVICES+FOOTER — slide up
  ══════════════════════════════════════════════ */
  const servicesSection = document.querySelector('.scene--services-footer');
  if (servicesSection && !isMobile) {
    gsap.fromTo(servicesSection,
      { yPercent: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: servicesSection,
          start: 'top bottom',
          end: 'top 30%',
          scrub: 0.6,
        },
        yPercent: 0,
        opacity: 1,
        ease: 'none',
      }
    );
  }

  /* ══════════════════════════════════════════════
     TIMELINE ITEMS — stagger + slide
  ══════════════════════════════════════════════ */
  document.querySelectorAll('.timeline-item').forEach((item) => {
    gsap.fromTo(item,
      { opacity: 0, x: 30 },
      {
        scrollTrigger: { trigger: item, start: 'top 90%', end: 'top 55%', scrub: 0.5 },
        opacity: 1, x: 0, ease: 'none',
      }
    );
  });

  /* ══════════════════════════════════════════════
     RESEARCH TILES — stagger slide
  ══════════════════════════════════════════════ */
  document.querySelectorAll('.research-tile').forEach((tile) => {
    gsap.fromTo(tile,
      { opacity: 0, x: -20 },
      {
        scrollTrigger: { trigger: tile, start: 'top 90%', end: 'top 60%', scrub: 0.5 },
        opacity: 1, x: 0, ease: 'none',
      }
    );
  });

  /* ══════════════════════════════════════════════
     NEWS — staggered scrub reveals
  ══════════════════════════════════════════════ */
  document.querySelectorAll('.news-item').forEach((item) => {
    gsap.fromTo(item,
      { opacity: 0, x: 40 },
      {
        scrollTrigger: { trigger: item, start: 'top 92%', end: 'top 65%', scrub: 0.4 },
        opacity: 1, x: 0, ease: 'none',
      }
    );
  });

  /* ══════════════════════════════════════════════
     PUBLICATIONS — GSAP pinned card stack (desktop only)
  ══════════════════════════════════════════════ */
  const pubStack = document.querySelector('.pub-stack');
  const pubCards = pubStack ? gsap.utils.toArray('.pub-card') : [];

  if (pubStack && pubCards.length > 0 && !isMobile) {
    /* Set z-index for proper stacking */
    pubCards.forEach((card, i) => {
      card.style.zIndex = i + 1;
    });

    /* Pin the pub-stack for the duration of all cards */
    const totalScrollDistance = pubCards.length * 100; /* vh per card */

    ScrollTrigger.create({
      trigger: pubStack,
      start: 'top top',
      end: '+=' + (totalScrollDistance) + '%',
      pin: true,
      pinSpacing: true,
    });

    /* Each card flies in from xPercent:100 and scales down previous */
    pubCards.forEach((card, i) => {
      if (i === 0) {
        /* First card is already visible */
        gsap.set(card, { xPercent: 0 });
      } else {
        /* Subsequent cards fly in from the right */
        gsap.fromTo(card,
          { xPercent: 100 },
          {
            scrollTrigger: {
              trigger: pubStack,
              start: 'top top+=' + (i * (totalScrollDistance / pubCards.length)) + '%',
              end: 'top top+=' + ((i + 0.7) * (totalScrollDistance / pubCards.length)) + '%',
              scrub: 0.5,
            },
            xPercent: 0,
            ease: 'none',
          }
        );

        /* Scale down previous cards */
        for (let j = 0; j < i; j++) {
          const scaleVal = 1 - (0.03 * (i - j));
          gsap.to(pubCards[j], {
            scrollTrigger: {
              trigger: pubStack,
              start: 'top top+=' + (i * (totalScrollDistance / pubCards.length)) + '%',
              end: 'top top+=' + ((i + 0.5) * (totalScrollDistance / pubCards.length)) + '%',
              scrub: 0.5,
            },
            scale: Math.max(scaleVal, 0.88),
            filter: 'brightness(' + Math.max(0.6, 1 - 0.12 * (i - j)) + ')',
            ease: 'none',
          });
        }
      }
    });
  }

  /* ══════════════════════════════════════════════
     AWARDS — medal bounce on enter
  ══════════════════════════════════════════════ */
  document.querySelectorAll('.award-item').forEach((item) => {
    const medal = item.querySelector('.award-item__medal');

    gsap.fromTo(item,
      { opacity: 0, y: 24 },
      {
        scrollTrigger: { trigger: item, start: 'top 90%', end: 'top 58%', scrub: 0.45 },
        opacity: 1, y: 0, ease: 'none',
      }
    );

    if (medal) {
      ScrollTrigger.create({
        trigger: item,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(medal,
            { scale: 0 },
            { scale: 1, duration: 0.6, ease: 'back.out(3)' }
          );
        },
        once: true,
      });
    }
  });

})();
