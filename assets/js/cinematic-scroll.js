(function () {
  'use strict';

  var reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isMobile = window.matchMedia('(max-width: 1024px)').matches;

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof Lenis === 'undefined') return;
  if (reduced) return;

  gsap.registerPlugin(ScrollTrigger);

  /* ── Lenis ── */
  var lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false });
  gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
  gsap.ticker.lagSmoothing(0);
  lenis.on('scroll', ScrollTrigger.update);

  /* ════════════════════════════════════════════════════
     HERO ENTRANCE
  ════════════════════════════════════════════════════ */
  var heroTl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.15 });
  heroTl.to('.hero__grid',    { opacity: 1, duration: 2.5 }, 0);
  heroTl.to('.hero__name',    { y: '0%', duration: 1.2 }, 0.15);
  heroTl.to('.hero__eyebrow', { opacity: 1, y: 0, duration: 0.9 }, 0.5);
  heroTl.to('.hero__tagline', { opacity: 1, y: 0, duration: 0.9 }, 0.7);
  heroTl.to('.hero__links',   { opacity: 1, y: 0, duration: 0.9 }, 0.85);
  heroTl.to('.hero__scroll',  { opacity: 1, duration: 0.7 }, 1.3);

  /* Hero parallax exit */
  gsap.to('.hero__inner', {
    scrollTrigger: { trigger: '.scene--hero', start: 'top top', end: 'bottom top', scrub: 0.8 },
    y: -60, opacity: 0, ease: 'none',
  });

  /* ════════════════════════════════════════════════════
     SIDEBAR NAV
  ════════════════════════════════════════════════════ */
  var sidebar  = document.querySelector('.sidebar-nav');
  var navDots  = sidebar ? [].slice.call(sidebar.querySelectorAll('.sidebar-nav__item')) : [];
  var sections = [].slice.call(document.querySelectorAll('[data-section]'));

  ScrollTrigger.create({
    trigger: '.scene--hero',
    start: 'bottom 65%',
    onEnter:     function () { sidebar && sidebar.classList.add('visible'); },
    onLeaveBack: function () { sidebar && sidebar.classList.remove('visible'); },
  });

  sections.forEach(function (sec, i) {
    if (!navDots[i]) return;
    navDots[i].addEventListener('click', function () {
      lenis.scrollTo(sec, { offset: -20, duration: 2.2,
        easing: function (t) { return 1 - Math.pow(1 - t, 4); }
      });
    });
    ScrollTrigger.create({
      trigger: sec, start: 'top 60%', end: 'bottom 40%',
      onToggle: function (self) { navDots[i].classList.toggle('active', self.isActive); },
    });
  });

  navDots.forEach(function (item) {
    var dot = item.querySelector('.sidebar-nav__dot');
    if (!dot) return;
    item.addEventListener('mouseenter', function () { gsap.to(dot, { scale: 2.2, duration: 0.3, ease: 'back.out(2)' }); });
    item.addEventListener('mouseleave', function () {
      gsap.to(dot, { scale: item.classList.contains('active') ? 1.7 : 1, duration: 0.3, ease: 'back.out(2)' });
    });
  });

  if (isMobile) return;

  /* ════════════════════════════════════════════════════
     CHAPTER CARDS — fly in from right, sticky stack
     .chapters-wrapper is gone; body clips via overflow-x:clip on html.
     Each chapter flies xPercent 100→0 while entering viewport.
     Previous chapter dims ONLY after next is ≥70% into view (so
     content stays readable longer — fixes "disappears too fast").
  ════════════════════════════════════════════════════ */
  var chapters = gsap.utils.toArray('.chapter');

  /* Set GSAP initial state */
  gsap.set(chapters, { xPercent: 100 });
  if (chapters[0]) gsap.set(chapters[0], { xPercent: 0 });

  chapters.forEach(function (ch, i) {
    if (i > 0) {
      /* Fly in from right as chapter scrolls into view */
      gsap.to(ch, {
        xPercent: 0, ease: 'none',
        scrollTrigger: { trigger: ch, start: 'top bottom', end: 'top top', scrub: 0.55 },
      });
    }

    /* ── Dim PREVIOUS chapter — start only when NEXT is 60% in ──
       Previously this started at 'top bottom' (immediately when next enters).
       Now we delay to 'top 40%' so the current card stays fully bright longer. */
    if (i < chapters.length - 1) {
      var next = chapters[i + 1];
      gsap.to(ch, {
        scale: 0.992, filter: 'brightness(0.85)', ease: 'none',
        scrollTrigger: { trigger: next, start: 'top 25%', end: 'top top', scrub: 0.45 },
      });
    }

    /* ── Headline clip reveal ── */
    var headline = ch.querySelector('.chapter__headline');
    if (headline) {
      gsap.set(headline, { yPercent: 108 });
      gsap.to(headline, {
        yPercent: 0, ease: 'expo.out', duration: 1.1,
        scrollTrigger: { trigger: ch, start: 'top 70%', toggleActions: 'play none none reverse' },
      });
    }

    /* ── Divider expand ── */
    var divider = ch.querySelector('.chapter__divider');
    if (divider) {
      gsap.set(divider, { scaleX: 0, transformOrigin: 'left' });
      gsap.to(divider, {
        scaleX: 1, ease: 'expo.out', duration: 0.9,
        scrollTrigger: { trigger: ch, start: 'top 60%', toggleActions: 'play none none reverse' },
      });
    }
  });

  /* ════════════════════════════════════════════════════
     PUBLICATIONS — horizontal gallery / slideshow
     Pin the section, then scrub the whole pub-stack
     leftward so each card slides past like a slideshow.
  ════════════════════════════════════════════════════ */
  var pubSection = document.querySelector('.scene--publications');
  var pubStack   = document.querySelector('.pub-stack');
  if (!pubSection || !pubStack) return;

  var pubCards = gsap.utils.toArray('.pub-card');
  var n = pubCards.length;
  if (n < 1) return;

  /* Scrub the whole strip leftward: each vh of scroll = 1 card width */
  gsap.to(pubStack, {
    x: function () { return -(n - 1) * window.innerWidth; },
    ease: 'none',
    scrollTrigger: {
      trigger: pubSection,
      start: 'top top',
      end: function () { return '+=' + ((n - 1) * window.innerHeight * 1.5); },
      pin: true,
      pinSpacing: true,
      scrub: true,
      anticipatePin: 1,
    },
  });

  /* Pub headline reveal (triggered once when section enters) */
  var pubHeadline = pubSection.querySelector('.chapter__headline');
  if (pubHeadline) {
    gsap.set(pubHeadline, { yPercent: 108 });
    gsap.to(pubHeadline, {
      yPercent: 0, ease: 'expo.out', duration: 1.1,
      scrollTrigger: { trigger: pubSection, start: 'top 70%', toggleActions: 'play none none reverse' },
    });
  }
  var pubDivider = pubSection.querySelector('.chapter__divider');
  if (pubDivider) {
    gsap.set(pubDivider, { scaleX: 0, transformOrigin: 'left' });
    gsap.to(pubDivider, {
      scaleX: 1, ease: 'expo.out', duration: 0.9,
      scrollTrigger: { trigger: pubSection, start: 'top 60%', toggleActions: 'play none none reverse' },
    });
  }

  /* ── Awards medal pop ── */
  document.querySelectorAll('.award-item__medal').forEach(function (medal) {
    gsap.fromTo(medal, { scale: 0, opacity: 0 }, {
      scale: 1, opacity: 1, ease: 'back.out(3)',
      scrollTrigger: { trigger: medal, start: 'top 88%', toggleActions: 'play none none reverse' },
    });
  });

})();
