/* ============================================================================
   OXY LOOP — case study interactions
   reveals · loop diagram · journey state machine (phone/station + insert)
   ========================================================================== */
(function () {
  'use strict';
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setMotion(on) { document.body.classList.toggle('motion', !!on && !reduce); }
  setMotion(true);
  window.__setMotion = setMotion;

  /* ---- top progress + bar ---- */
  const railFill = $('.rail-fill'); const topbar = $('.topbar');
  function onScroll() {
    const y = scrollY || 0; const h = document.documentElement.scrollHeight - innerHeight;
    if (railFill) railFill.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    if (topbar) topbar.classList.toggle('solid', y > 40);
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---- visibility checker (robust; does not rely on IntersectionObserver,
          which can fail to fire in some embedded preview iframes) ---- */
  function inViewport(el, frac) {
    const r = el.getBoundingClientRect();
    if (r.height === 0 && r.width === 0) return false;
    const vh = innerHeight || document.documentElement.clientHeight;
    const need = frac == null ? 0.10 : frac;
    const visible = Math.min(r.bottom, vh) - Math.max(r.top, 0);
    return r.top < vh * (1 - 0) && visible > Math.min(r.height * need, vh * 0.2) && r.bottom > 0;
  }

  /* ---- reveals ----
     CSS transition drives the fade in real browsers; we then pin the
     end-state via inline styles so content is NEVER left hidden, even in
     environments where CSS transitions don't advance (some capture iframes). */
  const reveals = $$('.reveal');
  function pin(el) { el.style.transition = 'none'; el.style.opacity = '1'; el.style.transform = 'none'; }
  function reveal(el) {
    if (el.dataset.shown) return;
    el.dataset.shown = '1';
    el.classList.add('in');
    setTimeout(() => pin(el), 1000);
  }
  function checkReveals() {
    reveals.forEach((el) => { if (!el.dataset.shown && inViewport(el, 0.06)) reveal(el); });
  }
  checkReveals();
  addEventListener('scroll', checkReveals, { passive: true });
  addEventListener('resize', checkReveals, { passive: true });
  addEventListener('load', checkReveals);
  [60, 160, 320, 600, 900, 1300].forEach((t) => setTimeout(checkReveals, t));
  let passes = 0;
  (function settle() { checkReveals(); if (++passes < 90) requestAnimationFrame(settle); })();
  // hard safety: reveal anything still hidden
  setTimeout(() => reveals.forEach(reveal), 2200);

  /* ---- loop diagram node placement ---- */
  (function loop() {
    const wrap = $('.loopwrap'); if (!wrap) return;
    const nodes = $$('.loop-node', wrap);
    const fg = $('.ring-fg', wrap);
    // place nodes evenly around circle, starting at top
    const N = nodes.length;
    nodes.forEach((n, i) => {
      const ang = (-90 + (360 / N) * i) * Math.PI / 180;
      const cx = 50 + Math.cos(ang) * 50;
      const cy = 50 + Math.sin(ang) * 50;
      n.style.left = cx + '%'; n.style.top = cy + '%';
    });
    // animate ring draw when first visible
    if (fg) {
      const len = fg.getTotalLength();
      fg.style.strokeDasharray = len; fg.style.strokeDashoffset = len;
      let drawn = false;
      function maybeDraw() {
        if (drawn) return;
        if (!inViewport(wrap, 0.3)) return;
        drawn = true;
        if (!document.body.classList.contains('motion')) { fg.style.strokeDashoffset = 0; return; }
        fg.style.transition = 'stroke-dashoffset 2.2s var(--ease-soft)';
        requestAnimationFrame(() => fg.style.strokeDashoffset = 0);
        removeEventListener('scroll', maybeDraw);
      }
      maybeDraw();
      addEventListener('scroll', maybeDraw, { passive: true });
    }
    // cycle highlight
    let idx = 0;
    function tick() {
      nodes.forEach((n, i) => n.classList.toggle('on', i === idx));
      idx = (idx + 1) % N;
    }
    tick();
    if (!reduce) setInterval(() => { if (document.body.classList.contains('motion')) tick(); }, 2200);
  })();

  /* =========================================================
     INTERACTIVE JOURNEY
     ========================================================= */
  (function journey() {
    const stage = $('.device-stage'); if (!stage) return;
    const device = $('.device', stage);
    const screen = $('.screen', device);
    const imgA = $$('.scr-img', screen);
    const phaseRows = $$('.phase-row');
    const sTag = $('.journey-copy .surface-tag');
    const sTitle = $('.journey-copy h3');
    const sDesc = $('.journey-copy p');
    const subdots = $('.subdots');
    const dmSurface = $('.device-meta .dm-surface');
    const dmCount = $('.device-meta .dm-count');
    const prevBtn = $('.dctl.prev'); const nextBtn = $('.dctl.next');

    // step model
    //  tap: an on-screen hotspot positioned over the REAL button in the
    //  screenshot, so the flow can be driven by clicking the UI itself
    //  (label = the button's wording). Prev/Next remain as a backup.
    const STEPS = [
      { phase: 0, surface: 'phone',   img: 'assets/oxy/ui/nav.png',      title: 'Find a nearby station', surfaceLabel: 'On your phone',
        tap: { x: 51, y: 88, w: 42, h: 9, label: 'Go Now' },
        desc: 'Open the mini-program and locate the closest plateau oxygen station — 5 minutes\u2019 walk, 25 jars in stock. Tap Go Now to start.' },
      { phase: 0, surface: 'phone',   img: 'assets/oxy/ui/purchase.png', title: 'Rent a reusable cylinder', surfaceLabel: 'On your phone',
        tap: { x: 39, y: 88, w: 54, h: 9, label: 'Purchase' },
        desc: 'Browse the reusable oxygen cylinder and rent it for $1.25 \u2014 a refillable canister instead of a single-use can.' },
      { phase: 1, surface: 'station', img: 'assets/oxy/ui/scan.png',     title: 'Scan to begin', surfaceLabel: 'At the station',
        tap: { x: 21, y: 27, w: 60, h: 56, label: 'Scan to enter' },
        desc: 'At the physical station, scan the QR code to start your session. The cyan frame is the system\u2019s signature active state.' },
      { phase: 1, surface: 'station', img: 'assets/oxy/ui/landing.png',  title: 'Rent or refill', surfaceLabel: 'At the station',
        tap: { x: 54, y: 66, w: 37, h: 16, label: 'Refill' },
        desc: 'Choose to rent a fresh reusable canister, or refill the one you already carry \u2014 the loop keeps the same bottle in service.' },
      { phase: 1, surface: 'station', img: 'assets/oxy/ui/refill.png',   title: 'Refill your canister', surfaceLabel: 'At the station',
        tap: { x: 18, y: 30, w: 72, h: 38, label: 'Top up oxygen' },
        desc: 'Insert your canister into the refill port and follow the inflation guide to top up its oxygen. No packaging, no waste.' },
      { phase: 2, surface: 'station', img: 'assets/oxy/ui/recycle1.png', empty: 'assets/oxy/ui/recycle1-empty.png',
        title: 'Recycle \u00b7 put in your mask', surfaceLabel: 'At the station', interactive: true,
        hot: { x: 30, y: 30, w: 40, h: 38 }, hint: 'Tap to drop in the mask',
        desc: 'Separate the oxygen mask from the cylinder and place it into the recycling chute. Tap the slot to drop it in \u2014 the tile confirms with a cyan check.' },
      { phase: 2, surface: 'station', img: 'assets/oxy/ui/recycle2.png', empty: 'assets/oxy/ui/recycle2-empty.png',
        title: 'Recycle \u00b7 put in your bottle', surfaceLabel: 'At the station', interactive: true,
        hot: { x: 30, y: 30, w: 40, h: 38 }, hint: 'Tap to drop in the bottle',
        desc: 'Throw the empty bottle into the lower recycling slot to complete the recycling process. Tap the slot to recover it.' },
      { phase: 2, surface: 'station', img: 'assets/oxy/ui/recycle3.png', title: 'Recycle successful', surfaceLabel: 'At the station',
        tap: { x: 28, y: 71, w: 45, h: 15, label: 'Next' },
        desc: 'Both the mask and bottle are recovered into the loop. Tap Next to claim your reward for closing the cycle.' },
      { phase: 3, surface: 'station', img: 'assets/oxy/ui/redeem.png',   title: 'Choose a souvenir', surfaceLabel: 'At the station',
        tap: { x: 27, y: 69, w: 46, h: 14, label: 'Redeem' },
        desc: 'Your souvenir is made from the very masks travelers recycled \u2014 a small keepsake for protecting the plateau. Redeem to finish the loop.' }
    ];
    // phase -> step indices (for sub-dots)
    const phaseSteps = [[], [], [], []];
    STEPS.forEach((s, i) => phaseSteps[s.phase].push(i));

    let cur = 0, inserted = false;

    // preload
    STEPS.forEach((s) => { [s.img, s.empty].forEach((u) => { if (u) { const im = new Image(); im.src = u; } }); });

    function buildImgFor(step, useEmpty) {
      // returns a fresh layer with the right image
      return step.surface === 'station'
        ? `<img class="station-img" src="${useEmpty ? step.empty : step.img}" alt="" />`
        : `<img src="${step.img}" alt="" />`;
    }

    // two reusable layers for crossfade
    let layerToggle = 0;
    function show(n, opts) {
      opts = opts || {};
      const prevStep = STEPS[cur];
      cur = Math.max(0, Math.min(STEPS.length - 1, n));
      const step = STEPS[cur];
      inserted = false;

      // surface morph
      device.classList.toggle('phone', step.surface === 'phone');
      device.classList.toggle('station', step.surface === 'station');

      // crossfade image
      const layers = imgA;
      const curLayer = layers[layerToggle];
      const nextLayer = layers[1 - layerToggle];
      nextLayer.innerHTML = buildImgFor(step, step.interactive);
      // place interactive hotspot
      clearHot();
      nextLayer.style.transition = 'opacity .45s var(--ease-soft)';
      curLayer.style.transition = 'opacity .45s var(--ease-soft)';
      void nextLayer.offsetWidth;
      nextLayer.classList.add('show'); nextLayer.style.opacity = '1';
      curLayer.classList.remove('show'); curLayer.style.opacity = '0';
      layerToggle = 1 - layerToggle;
      // pin end-state (capture-safe + reliable where transitions don't advance)
      const a = nextLayer, b = curLayer;
      setTimeout(() => { a.style.transition = 'none'; a.style.opacity = '1'; b.style.transition = 'none'; b.style.opacity = '0'; }, 520);

      if (step.interactive) addHot(nextLayer, step);
      else if (step.tap) addTap(nextLayer, step);

      // copy
      if (sTag) sTag.textContent = step.surfaceLabel;
      if (sTitle) sTitle.textContent = step.title;
      if (sDesc) sDesc.textContent = step.desc;
      if (dmSurface) dmSurface.textContent = step.surfaceLabel;
      if (dmCount) dmCount.textContent = 'Step ' + (cur + 1) + ' / ' + STEPS.length;

      // phase rows
      phaseRows.forEach((r, i) => {
        r.classList.toggle('active', i === step.phase);
        r.classList.toggle('done', i < step.phase);
      });

      // sub dots within phase
      renderDots(step);
      // next button state
      updateNext();
    }

    function renderDots(step) {
      if (!subdots) return;
      const arr = phaseSteps[step.phase];
      subdots.innerHTML = arr.map((idx) => {
        const cls = idx === cur ? 'on' : (idx < cur ? 'done' : '');
        return `<i class="${cls}"></i>`;
      }).join('');
    }

    function updateNext() {
      const step = STEPS[cur];
      const blocked = step.interactive && !inserted;
      if (nextBtn) {
        nextBtn.disabled = blocked && false; // keep enabled but guide; we handle via insert
        nextBtn.classList.toggle('locked', blocked);
      }
      if (prevBtn) prevBtn.disabled = cur === 0;
      // last step label
      if (nextBtn) {
        const lbl = $('.nx-label', nextBtn);
        if (lbl) lbl.textContent = cur === STEPS.length - 1 ? 'Restart' : (step.interactive && !inserted ? 'Insert first' : 'Next');
      }
    }

    // hotspot for interactive insert
    function clearHot() {
      $$('.insert-hotspot, .insert-hint, .tap-hotspot, .tap-hint', screen).forEach((e) => e.remove());
    }

    // in-UI advance hotspot — sits over the real button in the screenshot
    function addTap(layer, step) {
      const t = step.tap;
      const hot = document.createElement('button');
      hot.className = 'tap-hotspot pulse';
      hot.setAttribute('aria-label', t.label || 'Continue');
      hot.style.left = t.x + '%'; hot.style.top = t.y + '%';
      hot.style.width = t.w + '%'; hot.style.height = t.h + '%';
      const hint = document.createElement('div');
      hint.className = 'tap-hint';
      hint.innerHTML = `<span class="dotpulse"></span>Tap · ${t.label || 'Continue'}`;
      hint.style.left = (t.x + t.w / 2) + '%';
      hint.style.top = (t.y - 4) + '%';
      hint.style.transform = 'translate(-50%, -100%)';
      screen.appendChild(hint); screen.appendChild(hot);
      hot.addEventListener('click', goNext);
    }
    function addHot(layer, step) {
      const hot = document.createElement('button');
      hot.className = 'insert-hotspot pulse';
      hot.setAttribute('aria-label', step.hint || 'Insert item');
      hot.style.left = step.hot.x + '%'; hot.style.top = step.hot.y + '%';
      hot.style.width = step.hot.w + '%'; hot.style.height = step.hot.h + '%';
      const hint = document.createElement('div');
      hint.className = 'insert-hint';
      hint.innerHTML = `<span class="dotpulse"></span>${step.hint || 'Tap to insert'}`;
      hint.style.left = (step.hot.x + step.hot.w / 2) + '%';
      hint.style.top = (step.hot.y - 9) + '%';
      hint.style.transform = 'translate(-50%, -100%)';
      screen.appendChild(hint); screen.appendChild(hot);
      hot.addEventListener('click', () => {
        if (inserted) return;
        inserted = true;
        // swap empty -> filled (cyan tile + check appears)
        const img = $('img', layer);
        if (img) { img.style.transition = 'opacity .35s var(--ease-soft)'; img.style.opacity = '0';
          setTimeout(() => { img.src = step.img; img.style.opacity = '1'; }, 180); }
        hot.classList.remove('pulse'); hot.remove(); hint.remove();
        updateNext();
        // little success cue on next btn
        if (nextBtn) { nextBtn.classList.add('ready'); }
        // auto-advance so the whole loop runs from inside the UI
        setTimeout(() => { if (STEPS[cur] === step) goNext(); }, 900);
      });
    }

    // controls
    function goNext() {
      const step = STEPS[cur];
      if (step.interactive && !inserted) {
        // flash the insert hotspot to guide
        const hot = $('.insert-hotspot', screen);
        if (hot) { hot.animate([{ boxShadow: '0 0 0 0 rgba(53,217,214,.5)' }, { boxShadow: '0 0 0 12px rgba(53,217,214,0)' }], { duration: 600 }); }
        return;
      }
      if (cur === STEPS.length - 1) { show(0); return; }
      show(cur + 1);
    }
    if (nextBtn) nextBtn.addEventListener('click', goNext);
    if (prevBtn) prevBtn.addEventListener('click', () => show(cur - 1));
    phaseRows.forEach((r, i) => r.addEventListener('click', () => {
      const first = phaseSteps[i][0]; show(first);
    }));

    // keyboard when journey in view
    addEventListener('keydown', (e) => {
      if (!inViewport(stage, 0.2)) return;
      if (e.key === 'ArrowRight') { if (nextBtn) nextBtn.click(); }
      else if (e.key === 'ArrowLeft') show(cur - 1);
    });

    show(0);
  })();

  /* ---- year ---- */
  const yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();
})();
