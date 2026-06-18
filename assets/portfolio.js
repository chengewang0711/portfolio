/* ============================================================================
   PORTFOLIO — shared chrome: progress, nav state, theme switching, polish
   ========================================================================== */
(function () {
  'use strict';
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  const nav = $('.pf-nav');
  const railFill = $('.pf-rail-fill');
  const tabs = $$('.pf-tab');
  const railNav = $('.pf-rail-nav');
  const railItems = $$('.prn-item');
  const fire = $('#fire');
  const oxy = $('#oxy');
  const tt = $('#tt');

  function onScroll() {
    const y = scrollY || 0;
    const h = document.documentElement.scrollHeight - innerHeight;
    if (railFill) railFill.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    if (nav) nav.classList.toggle('solid', y > 40);

    // when the router is active it owns theme + active state per page —
    // skip the scroll-position guess (hidden projects would read as active).
    if (window.__pagedNav) return;

    // active project / theme by viewport midpoint (rect-based: zoom-safe)
    const mid = innerHeight * 0.45;
    let active = 'intro';
    if (oxy && oxy.getBoundingClientRect().top <= mid) active = 'oxy';
    else if (tt && tt.getBoundingClientRect().top <= mid) active = 'tt';
    else if (fire && fire.getBoundingClientRect().top <= mid) active = 'fire';
    document.body.classList.toggle('theme-tt', active === 'tt');
    document.body.classList.toggle('theme-oxy', active === 'oxy');
    document.body.classList.toggle('theme-fire', active !== 'oxy' && active !== 'tt');
    tabs.forEach((t) => t.classList.toggle('active', t.dataset.target === active));
    railItems.forEach((r) => r.classList.toggle('active', r.dataset.target === active));
    if (railNav) railNav.classList.toggle('show', y > innerHeight * 0.7);
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll, { passive: true });
  onScroll();
  // failsafe: some embeds swallow programmatic scroll events — watch scrollY per frame
  let lastY = -1;
  (function watchScroll(){
    if (scrollY !== lastY) { lastY = scrollY; onScroll(); }
    requestAnimationFrame(watchScroll);
  })();

  // smooth-scroll for in-page anchors (offset for fixed nav)
  // links flagged [data-instant] (e.g. the masthead project cards) jump
  // straight to the target with no long scroll-through "drop" animation.
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const top = el.getBoundingClientRect().top + scrollY - 54;
      const instant = a.hasAttribute('data-instant');
      scrollTo({ top, behavior: instant ? 'auto' : 'smooth' });
      if (instant) { history.replaceState(null, '', id); onScroll(); }
    });
  });

  // masthead card sheen follows cursor
  $$('.pf-card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });

  // transition particles — monochrome, echoing the cover's woven field
  $$('.pf-transition:not(.t-music) .torbs').forEach((torbs) => {
    for (let i = 0; i < 18; i++) {
      const s = document.createElement('span');
      const sz = 2 + Math.random() * 4;
      s.style.width = s.style.height = sz + 'px';
      s.style.left = (Math.random() * 100) + '%';
      s.style.top = (Math.random() * 100) + '%';
      s.style.background = 'rgba(232,238,242,1)';
      s.style.opacity = (0.12 + Math.random() * 0.32).toFixed(2);
      torbs.appendChild(s);
    }
  });
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && $('.pf-transition:not(.t-music) .torbs')) {
    (function float() {
      const t = performance.now() / 1000;
      $$('.pf-transition:not(.t-music) .torbs span').forEach((s, i) => {
        s.style.transform = `translateY(${Math.sin(t * 0.6 + i) * 14}px)`;
      });
      requestAnimationFrame(float);
    })();
  }

  // year (in case project JS didn't run)
  const yr = $('#year'); if (yr && !yr.textContent.trim()) yr.textContent = new Date().getFullYear();

  // smoother section ↔ section transitions: reveal band + footer content on enter
  const revealBands = $$('.pf-transition, .pf-foot');
  if (revealBands.length) {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) en.target.classList.add('in-view'); });
      }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
      revealBands.forEach((b) => io.observe(b));
    } else {
      revealBands.forEach((b) => b.classList.add('in-view'));
    }
  }
})();


/* ============================================================================
   PORTFOLIO — premium motion layer: title word reveal + scroll parallax
   ========================================================================== */
(function () {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- masthead title word-stagger reveal ---- */
  const title = document.querySelector('.pf-title');
  if (title && !reduce) {
    let wi = 0;
    const wrap = (node) => {
      Array.from(node.childNodes).forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const s = document.createElement('span');
            s.className = 'w'; s.style.setProperty('--wi', wi++); s.textContent = part;
            frag.appendChild(s);
          });
          node.replaceChild(frag, n);
        }
      });
    };
    wrap(title);
  }

  /* ---- gentle scroll parallax for [data-parallax] ---- */
  const els = Array.from(document.querySelectorAll('[data-parallax]'));
  if (els.length && !reduce) {
    let ticking = false;
    function apply() {
      ticking = false;
      const vh = innerHeight;
      els.forEach((el) => {
        const k = parseFloat(el.dataset.parallax) || 0.15;
        const r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const mid = r.top + r.height / 2 - vh / 2;
        el.style.transform = 'translateY(' + (mid * -k).toFixed(1) + 'px)';
      });
    }
    function onS() { if (!ticking) { ticking = true; requestAnimationFrame(apply); } }
    addEventListener('scroll', onS, { passive: true });
    addEventListener('resize', onS, { passive: true });
    apply();
  }
})();


/* ============================================================================
   CV — prepend a line icon to every award / honour row (clearer scanning)
   ========================================================================== */
(function () {
  'use strict';
  const sw = 'fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"';
  const S = (p) => '<svg viewBox="0 0 24 24" ' + sw + '>' + p + '</svg>';

  // Award-mark colours — jewel / metallic tones tuned for the dark CV panel.
  const C = {
    red:    '#e2574c', // Red Dot
    gold:   '#d4ad53', // gold winner / scholarship / merit
    silver: '#b9c2cc', // silver placements
    bronze: '#c2895a', // bronze placements
    violet: '#9b8cf0', // future designer
    teal:   '#56b6a4', // CADA / visual design
    indigo: '#7d97ec', // digital art / paper
    blue:   '#6aa0e0', // industrial design
    green:  '#6cbf78', // Xinmiao sprout
    amber:  '#e0a94e', // innovation / merit
    orange: '#e08a4e', // basketball
    steel:  '#94a6ba'  // discus / academic cup
  };

  const ICON = {
    // Red Dot Award — the mark literally IS a red dot
    target: S('<circle cx="12" cy="12" r="9.5"/><circle cx="12" cy="12" r="3.4" fill="currentColor" stroke="none"/>'),
    // trophy — MUSE Gold
    trophy: S('<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>'),
    // academic cup / flask — Challenge Cup
    flask: S('<path d="M10 2v6.6a2 2 0 0 1-.3 1.05L4.6 18.4A2 2 0 0 0 6.3 21.5h11.4a2 2 0 0 0 1.7-3.1L14.3 9.65A2 2 0 0 1 14 8.6V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/>'),
    // medal — silver / bronze placements
    medal: S('<path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"/><path d="M11 12 5.12 2.2"/><path d="m13 12 5.88-9.8"/><path d="M8 7h8"/><circle cx="12" cy="17" r="5"/><path d="M12 18v-2h-.5"/>'),
    // rosette ribbon — outstanding athlete
    award: S('<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>'),
    // pen-tool — Future Designer (vector design)
    pen: S('<path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"/><path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"/><path d="m2.3 2.3 7.286 7.286"/><circle cx="11" cy="11" r="2"/>'),
    // palette — CADA (art & design)
    palette: S('<path d="M12 22a10 10 0 1 1 0-20 9 9 0 0 1 9 9 4.5 4.5 0 0 1-4.5 4.5h-2.2a1.7 1.7 0 0 0-1.3 2.7l.2.3a1.7 1.7 0 0 1-1.3 2.7z"/><circle cx="13.5" cy="6.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="17.5" cy="10.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="6.5" cy="12.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="8.5" cy="7.5" r="1.1" fill="currentColor" stroke="none"/>'),
    // monitor — Cross-Strait Digital Art & Design
    monitor: S('<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>'),
    // landmark — Milan Design Week (Italy / international)
    landmark: S('<path d="M3 22h18"/><path d="M6 18v-7"/><path d="M10 18v-7"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="m12 2 8 5H4z"/>'),
    // ruler — industrial design competition
    ruler: S('<path d="M21.3 8.7 8.7 21.3a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4Z"/><path d="m7.5 10.5 2 2"/><path d="m10.5 7.5 2 2"/><path d="m13.5 4.5 2 2"/><path d="m4.5 13.5 2 2"/>'),
    // graduation cap — government scholarship
    cap: S('<path d="M21.42 10.92a1 1 0 0 0 0-1.84L12.83 5.2a2 2 0 0 0-1.66 0L2.58 9.08a1 1 0 0 0 0 1.84l8.59 3.89a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>'),
    // star badge — merit student
    star: S('<path d="M11.48 3.5a.6.6 0 0 1 1.04 0l2.32 4.7 5.18.76a.6.6 0 0 1 .33 1.02l-3.75 3.65.88 5.16a.6.6 0 0 1-.87.63L12 17.77l-4.63 2.43a.6.6 0 0 1-.87-.63l.88-5.16-3.75-3.65a.6.6 0 0 1 .33-1.02l5.18-.76z"/>'),
    // lightbulb — innovation project
    bulb: S('<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>'),
    // sprout — "Xinmiao" (new sprout) talent program
    sprout: S('<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>'),
    // document — A-class paper / conference
    file: S('<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v5h5"/><path d="M16 13H8M16 17H8M10 9H8"/>'),
    // printer — Asia Print Award
    printer: S('<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="13" width="12" height="8" rx="1"/>'),
    // discus — throwing event
    disc: S('<ellipse cx="12" cy="12" rx="10" ry="5.5"/><circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none"/>'),
    // basketball
    ball: S('<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2v20"/><path d="M5 5c3.2 3 3.2 11 0 14"/><path d="M19 5c-3.2 3-3.2 11 0 14"/>')
  };

  // [test regex, icon, colour] — first match wins, so list specific keywords first.
  const MAP = [
    [/red dot/,                     ICON.target,   C.red],
    [/muse/,                        ICON.trophy,   C.gold],
    [/challenge cup/,               ICON.flask,    C.steel],
    [/xinmiao|talent/,              ICON.sprout,   C.green],
    [/innovation/,                  ICON.bulb,     C.amber],
    [/print award|asia print/,      ICON.printer,  C.bronze],
    [/paper|conference|ahfe/,       ICON.file,     C.indigo],
    [/merit student/,               ICON.star,     C.amber],
    [/scholarship/,                 ICON.cap,      C.gold],
    [/industrial design/,           ICON.ruler,    C.blue],
    [/cada/,                        ICON.palette,  C.teal],
    [/digital art|cross-strait/,    ICON.monitor,  C.indigo],
    [/milan/,                       ICON.landmark, C.gold],
    [/future designer/,             ICON.pen,      C.violet],
    [/discus|record/,               ICON.disc,     C.steel],
    [/basketball|zuba/,             ICON.ball,     C.orange],
    [/athlete|gold medal|sports meet|games/, ICON.award, C.gold],
    [/silver/,                      ICON.medal,    C.silver],
    [/bronze/,                      ICON.medal,    C.bronze]
  ];

  function pick(s) {
    s = s.toLowerCase();
    for (const [re, svg, color] of MAP) {
      if (re.test(s)) return { svg, color };
    }
    return { svg: ICON.award, color: C.gold };
  }

  /* Per review: the per-row award/athletics icons were removed. The two
     section headers now carry a single white solid icon (see .cv-h4-ic in
     the markup) instead of a coloured mark on every line. */
  void pick;
})();


/* ============================================================================
   TRANSITION → TouchTune — interactive musical-note field.
   Notes gently bob (the "jump" of the music) and spring away from the cursor.
   ========================================================================== */
(function () {
  'use strict';
  const band = document.querySelector('.pf-transition.t-music');
  if (!band) return;
  const layer = band.querySelector('.torbs');
  if (!layer) return;
  layer.innerHTML = '';
  return; // notes removed — the willow strands (#tt-trans-gl) now carry this transition

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const GLYPHS = ['\u266A', '\u266B', '\u2669', '\u266C', '\u266D']; // ♪ ♫ ♩ ♬ ♭
  const N = 24;
  const notes = [];

  for (let i = 0; i < N; i++) {
    const el = document.createElement('span');
    el.className = 'tnote';
    el.textContent = GLYPHS[(Math.random() * GLYPHS.length) | 0];
    const size = 16 + Math.random() * 30;
    const lx = 4 + Math.random() * 92;   // %
    const ly = 10 + Math.random() * 80;  // %
    el.style.left = lx + '%';
    el.style.top = ly + '%';
    el.style.fontSize = size.toFixed(1) + 'px';
    const op = 0.18 + Math.random() * 0.4;
    el.style.opacity = op.toFixed(2);
    el.style.color = Math.random() < 0.62 ? 'var(--pf-tt)' : 'rgba(255,239,224,.92)';
    layer.appendChild(el);
    notes.push({
      el, lx, ly, baseOp: op,
      phase: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 0.7,
      amp: 5 + Math.random() * 10,
      dx: 0, dy: 0, vx: 0, vy: 0
    });
  }

  let px = -9999, py = -9999, active = false;
  let rect = band.getBoundingClientRect();
  const sync = () => { rect = band.getBoundingClientRect(); };
  band.addEventListener('pointermove', (e) => { sync(); px = e.clientX - rect.left; py = e.clientY - rect.top; active = true; });
  band.addEventListener('pointerleave', () => { active = false; });
  window.addEventListener('resize', sync);
  window.addEventListener('scroll', sync, { passive: true });

  if (reduce) return; // static, themed placement is enough

  const R = 175, STR = 64, K = 0.12, DAMP = 0.78;
  (function frame() {
    const t = performance.now() / 1000;
    const w = rect.width || band.clientWidth || 1;
    const h = rect.height || band.clientHeight || 1;
    for (const n of notes) {
      const bob = Math.sin(t * n.speed + n.phase) * n.amp;
      let tx = 0, ty = 0, force = 0;
      if (active) {
        const ax = n.lx / 100 * w, ay = n.ly / 100 * h;
        const ddx = ax - px, ddy = ay - py;
        const dist = Math.hypot(ddx, ddy);
        if (dist < R) {
          force = 1 - dist / R;
          const inv = 1 / (dist || 1);
          tx = ddx * inv * force * STR;
          ty = ddy * inv * force * STR;
        }
      }
      n.vx += (tx - n.dx) * K; n.vx *= DAMP; n.dx += n.vx;
      n.vy += (ty - n.dy) * K; n.vy *= DAMP; n.dy += n.vy;
      const sc = 1 + force * 0.7;
      n.el.style.transform = 'translate(' + n.dx.toFixed(1) + 'px,' + (bob + n.dy).toFixed(1) + 'px) scale(' + sc.toFixed(3) + ')';
      n.el.style.opacity = Math.min(1, n.baseOp + force * 0.6).toFixed(2);
    }
    requestAnimationFrame(frame);
  })();
})();
