(function () {
  'use strict';
  if (typeof gsap === 'undefined' || typeof Lenis === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var isMobile = window.matchMedia('(max-width: 1024px)').matches;

  /* === Lenis === */
  var lenis = new Lenis({ lerp: 0.09, smoothWheel: true, syncTouch: false });
  gsap.registerPlugin(ScrollTrigger);
  gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
  gsap.ticker.lagSmoothing(0);
  lenis.on('scroll', ScrollTrigger.update);

  /* === Hero entrance === */
  var heroTl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.1 });
  heroTl.to('.hero__grid',    { opacity: 1, duration: 2.5 }, 0);
  heroTl.to('.hero__name',    { y: '0%', duration: 1.2 }, 0.15);
  heroTl.to('.hero__eyebrow', { opacity: 1, y: 0, duration: 0.9 }, 0.5);
  heroTl.to('.hero__tagline', { opacity: 1, y: 0, duration: 0.9 }, 0.7);
  heroTl.to('.hero__links',   { opacity: 1, y: 0, duration: 0.9 }, 0.9);
  heroTl.to('.hero__scroll',  { opacity: 1, duration: 0.7 }, 1.4);

  /* Hero exit parallax */
  gsap.to('.hero__inner', {
    scrollTrigger: { trigger: '.scene--hero', start: 'top top', end: 'bottom top', scrub: 0.8 },
    y: -80, opacity: 0, ease: 'none',
  });

  /* === Sidebar nav — show after hero === */
  var sidebar = document.querySelector('.sidebar-nav');
  var navItems = sidebar ? [].slice.call(sidebar.querySelectorAll('.sidebar-nav__item')) : [];
  var sections = [].slice.call(document.querySelectorAll('[data-section]'));

  var sidebarShown = false;
  ScrollTrigger.create({
    trigger: '.scene--hero',
    start: 'bottom 60%',
    onEnter: function () { if (!sidebarShown) { sidebar && sidebar.classList.add('visible'); sidebarShown = true; } },
  });

  sections.forEach(function (sec, i) {
    if (!navItems[i]) return;
    navItems[i].addEventListener('click', function () {
      lenis.scrollTo(sec, { offset: -40, duration: 2.2, easing: function (t) { return 1 - Math.pow(1-t, 4); } });
    });
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 55%',
      end: 'bottom 45%',
      onToggle: function (self) { navItems[i].classList.toggle('active', self.isActive); },
    });
  });

  /* Magnetic hover on nav dots */
  navItems.forEach(function (item) {
    var dot = item.querySelector('.sidebar-nav__dot');
    if (!dot) return;
    item.addEventListener('mouseenter', function () { gsap.to(dot, { scale: 2, duration: 0.3, ease: 'back.out(2)' }); });
    item.addEventListener('mouseleave', function () { gsap.to(dot, { scale: item.classList.contains('active') ? 1.6 : 1, duration: 0.3, ease: 'back.out(2)' }); });
  });

  if (isMobile) return; /* Skip animations on mobile */

  /* === Chapter card fly-in — ALL from RIGHT === */
  var chapters = gsap.utils.toArray('.chapter');

  chapters.forEach(function (chapter, i) {
    /* Card fly-in from right */
    gsap.fromTo(chapter,
      { xPercent: 100 },
      {
        xPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: chapter,
          start: 'top bottom',
          end: 'top top',
          scrub: 0.6,
        },
      }
    );

    /* Scale down this card when NEXT card enters */
    if (i < chapters.length - 1) {
      gsap.to(chapter, {
        scale: 0.96,
        filter: 'brightness(0.72)',
        ease: 'none',
        scrollTrigger: {
          trigger: chapters[i + 1],
          start: 'top bottom',
          end: 'top top',
          scrub: 0.5,
        },
      });
    }

    /* Internal content animations — trigger after card has flown in */
    var counter  = chapter.querySelector('.chapter__counter');
    var label    = chapter.querySelector('.chapter__label');
    var headline = chapter.querySelectorAll('.chapter__headline');
    var divider  = chapter.querySelector('.chapter__divider');
    var body     = chapter.querySelector('.chapter__body');

    var innerTl = gsap.timeline({
      scrollTrigger: {
        trigger: chapter,
        start: 'top 30%',
        end: 'top -20%',
        scrub: 0.6,
      },
    });
    if (counter)          innerTl.to(counter,  { opacity: 1, duration: 0.5 }, 0);
    if (label)            innerTl.to(label,    { opacity: 1, y: 0, duration: 0.6 }, 0.05);
    if (headline.length)  innerTl.to(headline, { y: '0%', duration: 0.9, stagger: 0.08 }, 0.1);
    if (divider)          innerTl.to(divider,  { scaleX: 1, duration: 0.8 }, 0.25);
    if (body)             innerTl.to(body,     { opacity: 1, y: 0, duration: 0.8 }, 0.35);
  });

  /* === PUBLICATIONS — single timeline bound to pin (CRITICAL FIX) === */
  var pubStack = document.querySelector('.pub-stack');
  var pubCards = pubStack ? gsap.utils.toArray('.pub-card') : [];
  var numPubs = pubCards.length;

  if (pubStack && numPubs > 1) {
    /* Set z-index */
    pubCards.forEach(function (card, i) { card.style.zIndex = i + 1; });

    /* SINGLE TIMELINE scrubbed to the pin — NOT separate ScrollTriggers */
    var pubTl = gsap.timeline({
      scrollTrigger: {
        trigger: pubStack,
        start: 'top top',
        end: function () { return '+=' + (numPubs * window.innerHeight) + 'px'; },
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
      },
    });

    /* First card already visible at xPercent:0 */
    pubCards.forEach(function (card, i) {
      if (i === 0) return;
      /* Card i flies in from right at position i in the timeline */
      pubTl.fromTo(card,
        { xPercent: 100 },
        { xPercent: 0, ease: 'none', duration: 1 },
        i  /* start at position i in timeline */
      );
      /* Scale down all previous cards when card i enters */
      for (var j = 0; j < i; j++) {
        pubTl.to(pubCards[j], {
          scale: Math.max(1 - 0.04 * (i - j), 0.84),
          filter: 'brightness(' + Math.max(0.6, 1 - 0.12 * (i - j)) + ')',
          ease: 'none',
          duration: 0.8,
        }, i);
      }
    });
  }

  /* === Awards medal bounce (on enter, once) === */
  document.querySelectorAll('.award-item__medal').forEach(function (medal) {
    gsap.fromTo(medal,
      { scale: 0, opacity: 0 },
      {
        scale: 1, opacity: 1,
        ease: 'back.out(3)',
        scrollTrigger: {
          trigger: medal,
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  /* === Services footer fly in === */
  var servicesSec = document.querySelector('.scene--services-footer');
  if (servicesSec) {
    gsap.fromTo(servicesSec,
      { xPercent: 100 },
      {
        xPercent: 0, ease: 'none',
        scrollTrigger: {
          trigger: servicesSec,
          start: 'top bottom',
          end: 'top top',
          scrub: 0.6,
        },
      }
    );
  }

})();
