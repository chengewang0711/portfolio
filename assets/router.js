/* ============================================================================
   PORTFOLIO ROUTER — turn the long scroll into discrete "pages".

   • Home  = cover + CV + masthead (Selected Projects). Scrolling the home
     page ends at the three project cards — nothing below them.
   • Each project (Firepulse / TouchTune / Oxy Loop) is its own page, shown
     only when chosen from the left rail / top tabs / cards / footer.
   • Switching between pages is an INSTANT swap — no long scroll-through
     animation. Within a page, ordinary scrolling still works.
   ========================================================================== */
(function () {
  'use strict';

  // tell portfolio.js to stop driving theme/active state from scroll position
  window.__pagedNav = true;

  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const html = document.documentElement;

  /* ---- which top-level sections belong to which page ---- */
  const PAGES = {
    home: ['hero-cover', 'cv', 'intro'],
    fire: ['fire'],
    tt:   ['tt'],
    oxy:  ['oxy'],
  };
  const THEME = { home: 'theme-fire', fire: 'theme-fire', tt: 'theme-tt', oxy: 'theme-oxy' };

  /* ---- raw anchor id -> { page, anchor } ----
     anchor = element to land on inside that page (null = top). */
  const ROUTES = {
    'hero-cover': { page: 'home', anchor: null },
    'cv':         { page: 'home', anchor: 'cv' },
    'intro':      { page: 'home', anchor: 'intro' },
    'fire':       { page: 'fire', anchor: null },
    'tt':         { page: 'tt',   anchor: null },
    'oxy':        { page: 'oxy',  anchor: null },
  };

  function display(id, on) {
    const el = document.getElementById(id);
    if (el) el.style.display = on ? '' : 'none';
  }

  /* ---- nudge canvas / lazy-init scripts on the newly visible page ---- */
  function relayout() {
    const fire = () => {
      try { window.dispatchEvent(new Event('resize')); } catch (e) {}
      try { window.dispatchEvent(new Event('scroll')); } catch (e) {}
    };
    fire();
    requestAnimationFrame(fire);
    setTimeout(fire, 260);
  }

  /* ---- safety: never leave a shown page's content hidden ---- */
  function forceReveals(name) {
    setTimeout(() => {
      (PAGES[name] || []).forEach((id) => {
        const root = document.getElementById(id);
        if (!root) return;
        $$('.reveal', root).forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < innerHeight * 0.95) el.classList.add('is-in');
        });
      });
    }, 700);
  }

  function showPage(name) {
    if (!PAGES[name]) name = 'home';
    html.dataset.page = name;

    Object.keys(PAGES).forEach((p) => {
      const on = p === name;
      PAGES[p].forEach((id) => display(id, on));
    });

    // decorative scroll-transition bands are never used in paged mode
    $$('.pf-transition').forEach((t) => { t.style.display = 'none'; });

    // footer belongs at the foot of a project page, not on the home scroll
    const foot = document.querySelector('.pf-foot');
    if (foot) foot.style.display = name === 'home' ? 'none' : '';

    document.body.classList.remove('theme-fire', 'theme-tt', 'theme-oxy');
    document.body.classList.add(THEME[name] || 'theme-fire');

    relayout();
    forceReveals(name);
  }

  function setActive(targetKey) {
    $$('.prn-item').forEach((r) => r.classList.toggle('active', r.dataset.target === targetKey));
    $$('.pf-tab').forEach((t) => t.classList.toggle('active', t.dataset.target === targetKey));
  }

  function scrollToAnchor(anchor, instant) {
    const behavior = instant ? 'instant' : 'smooth';
    if (anchor) {
      const el = document.getElementById(anchor);
      if (el) {
        const top = Math.max(0, el.getBoundingClientRect().top + scrollY - 54);
        try { window.scrollTo({ top, behavior }); } catch (e) { window.scrollTo(0, top); }
        return;
      }
    }
    try { window.scrollTo({ top: 0, behavior }); } catch (e) { window.scrollTo(0, 0); }
  }

  function navigate(targetKey, opts) {
    const route = ROUTES[targetKey];
    if (!route) return;
    opts = opts || {};
    const samePage = html.dataset.page === route.page;

    if (samePage) {
      scrollToAnchor(route.anchor, opts.instant);
    } else {
      // cross-page is ALWAYS an instant swap — no scroll-through animation.
      // Scroll synchronously (display change makes layout available at once),
      // then re-assert after layout/images settle. We avoid depending on
      // requestAnimationFrame, which is throttled when the page isn't painting.
      showPage(route.page);
      scrollToAnchor(route.anchor, true);
      setTimeout(() => scrollToAnchor(route.anchor, true), 0);
      setTimeout(() => scrollToAnchor(route.anchor, true), 90);
    }
    setActive(targetKey);
    try { history.replaceState(null, '', '#' + targetKey); } catch (e) {}
  }
  window.pfNavigate = navigate;

  /* ---- intercept page-level nav clicks in the CAPTURE phase, so the old
     per-anchor smooth-scroll handler never runs for them. In-page scroll
     cues (.scroll-cue, cover "Enter", etc.) are left alone and scroll
     normally within the active page. ---- */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const pageLevel =
      a.classList.contains('prn-item') ||
      a.classList.contains('pf-tab') ||
      a.classList.contains('pf-card') ||
      a.classList.contains('pf-brand') ||
      !!a.closest('.pf-foot');
    if (!pageLevel) return;

    const id = (a.getAttribute('href') || '').slice(1);
    if (!ROUTES[id]) return;

    e.preventDefault();
    e.stopImmediatePropagation();
    const crossPage = ROUTES[id].page !== html.dataset.page;
    navigate(id, { instant: true || crossPage });
  }, true);

  /* ---- home scroll-spy: highlight cover/cv/intro tab + the CV rail item ---- */
  function homeSpy() {
    if (html.dataset.page !== 'home') return;
    const mid = innerHeight * 0.4;
    let cur = 'hero-cover';
    ['cv', 'intro'].forEach((id) => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= mid) cur = id;
    });
    $$('.pf-tab').forEach((t) => t.classList.toggle('active', t.dataset.target === cur));
    $$('.prn-item').forEach((r) => r.classList.toggle('active', r.dataset.target === 'cv' && cur === 'cv'));
  }
  addEventListener('scroll', homeSpy, { passive: true });

  /* ---- the masthead "Scroll" cue implied more below; the cards are the
     bottom of home now, so retire it. ---- */
  const introCue = document.querySelector('.pf-introcue');
  if (introCue) introCue.style.display = 'none';

  /* ---- initial page (respect a #hash deep-link, else home cover) ---- */
  const hashId = (location.hash || '').slice(1);
  const initKey = ROUTES[hashId] ? hashId : 'hero-cover';
  showPage(ROUTES[initKey].page);
  setActive(initKey);
  if (ROUTES[initKey].anchor) {
    scrollToAnchor(ROUTES[initKey].anchor, true);
    setTimeout(() => scrollToAnchor(ROUTES[initKey].anchor, true), 90);
  } else {
    try { window.scrollTo({ top: 0, behavior: 'instant' }); } catch (e) { window.scrollTo(0, 0); }
  }
  homeSpy();
})();
