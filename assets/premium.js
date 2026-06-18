/* ============================================================================
   FIREPULSE — Premium interaction engine
   ========================================================================== */
(function () {
  'use strict';
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  /* ---- screen data (logical operator flow) ---- */
  const SCREENS = [
    { img: 'assets/img/ui-teaching.jpg', step: '01 · PRIOR TO ENTRY', name: 'Teaching Model', tag: 'Mission briefing', desc: 'Instructors sync mission-specific tasks; the trainee previews the fire location, heat-affected structures and operation map before entry.' },
    { img: 'assets/img/ui-ready.jpg', step: '02 · STANDBY', name: 'Ready to Deploy', tag: 'Confirm & deploy', desc: 'The trainee confirms the briefing and signals READY; the instructor releases the live scenario onto the physical space.' },
    { img: 'assets/img/ui-hud.jpg', step: '03 · IN THE FIREGROUND', name: 'Live Operational HUD', tag: 'Vitals · heading · tasks', desc: 'Vitals, heading, trajectory guidance and live task progress are overlaid directly onto the real scene as the drill runs.' },
    { img: 'assets/img/ui-success.jpg', step: '04 · OBJECTIVE CLEARED', name: 'Mission Success', tag: 'Resolve & log', desc: 'Primary fire source extinguished — the drill resolves and the system finalizes logging for the after-action report.' },
    { img: 'assets/img/ui-eval.jpg', step: '05 · DATA EVALUATION', name: 'After-Action Report', tag: 'Score · badge · rank', desc: 'Per-trainee scoring across reactivity, efficiency and accuracy, with badge level and squad ranking.' }
  ];

  /* =========================================================
     CUSTOM CURSOR
     ========================================================= */
  let cursorOn = false;
  function enableCursor(on) {
    cursorOn = on && fine && !reduce;
    document.body.classList.toggle('has-cursor', cursorOn);
  }
  (function cursor() {
    if (!fine) return;
    const dot = document.createElement('div'); dot.className = 'cursor-dot';
    const ring = document.createElement('div'); ring.className = 'cursor-ring';
    const label = document.createElement('span'); label.className = 'cur-label'; ring.appendChild(label);
    document.body.append(dot, ring);
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
      const t = (e.target instanceof Element) ? e.target.closest('a, button, .ui-row, .thumb, [data-magnetic], .knob, input, .um-arrow, .um-rail button') : null;
      document.body.classList.toggle('is-interactive', !!t);
      const lbl = t && t.getAttribute('data-cursor-label');
      document.body.classList.toggle('is-label', !!lbl);
      if (lbl) label.textContent = lbl;
    }, { passive: true });
    addEventListener('mousedown', () => document.body.classList.add('is-down'));
    addEventListener('mouseup', () => document.body.classList.remove('is-down'));
    addEventListener('mouseleave', () => { dot.style.opacity = ring.style.opacity = 0; });
    addEventListener('mouseenter', () => { if (cursorOn) { dot.style.opacity = ring.style.opacity = 1; } });
    (function loop() {
      rx = lerp(rx, mx, 0.18); ry = lerp(ry, my, 0.18);
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
    enableCursor(true);
  })();
  window.__setCursor = enableCursor;

  /* =========================================================
     MAGNETIC ELEMENTS
     ========================================================= */
  if (fine && !reduce) {
    $$('[data-magnetic]').forEach((el) => {
      const strength = parseFloat(el.getAttribute('data-magnetic')) || 0.3;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* =========================================================
     3D TILT
     ========================================================= */
  if (fine && !reduce) {
    $$('[data-tilt]').forEach((el) => {
      const max = parseFloat(el.getAttribute('data-tilt')) || 7;
      let raf = null;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg)`;
        });
      });
      el.addEventListener('mouseleave', () => { el.style.transform = 'perspective(900px) rotateY(0) rotateX(0)'; });
    });
  }

  /* =========================================================
     UNVEIL-STYLE 3D LIST + cursor preview
     ========================================================= */
  (function uiList() {
    const list = $('.ui-list');
    if (!list) return;
    const rows = $$('.ui-row', list);
    const preview = $('.ui-preview');
    const imgA = preview ? $$('.up-img img', preview) : [];
    let curImg = 0, px = innerWidth / 2, py = innerHeight / 2, tx = px, ty = py, shown = false, vx = 0;

    function setPreview(i) {
      if (!preview) return;
      const src = SCREENS[i].img;
      const next = imgA[(curImg + 1) % imgA.length];
      next.src = src;
      next.onload = () => {
        imgA.forEach((im) => im.classList.remove('on'));
        next.classList.add('on');
        curImg = (curImg + 1) % imgA.length;
      };
      if (next.complete) next.onload();
    }

    rows.forEach((row, i) => {
      row.addEventListener('mouseenter', () => {
        list.classList.add('is-hovering');
        rows.forEach((r) => r.classList.remove('is-active'));
        row.classList.add('is-active');
        setPreview(i);
        if (preview) { preview.classList.add('show'); shown = true; }
      });
      // intra-row tilt for the 3D feel
      row.addEventListener('mousemove', (e) => {
        const r = row.getBoundingClientRect();
        const ry = (e.clientY - r.top) / r.height - 0.5;
        row.style.setProperty('--rx', (-ry * 6).toFixed(2) + 'deg');
      });
      row.addEventListener('click', () => {
        if (window.__hudGoto) window.__hudGoto(i);
        else openModal(i);
      });
    });
    list.addEventListener('mouseleave', () => {
      list.classList.remove('is-hovering');
      rows.forEach((r) => { r.classList.remove('is-active'); r.style.removeProperty('--rx'); });
      if (preview) { preview.classList.remove('show'); shown = false; }
    });

    if (preview) {
      addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; }, { passive: true });
      (function follow() {
        const nx = lerp(px, tx, 0.14), ny = lerp(py, ty, 0.14);
        vx = nx - px; px = nx; py = ny;
        const tilt = clamp(vx * 0.6, -16, 16);
        preview.style.left = px + 'px';
        preview.style.top = py + 'px';
        if (shown) preview.style.transform = `translate(-50%,-50%) scale(1) perspective(800px) rotateY(${tilt}deg)`;
        requestAnimationFrame(follow);
      })();
    }
  })();

  /* =========================================================
     WALKTHROUGH MODAL (interactive system flow)
     ========================================================= */
  let modal, mSlides, mStep, mTitle, mDesc, mRail, mProg, mPlay, mIdx = 0, mTimer = null, mPlaying = false;
  const M_DUR = 4800;

  function buildModal() {
    modal = document.createElement('div');
    modal.className = 'ui-modal'; modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true');
    modal.innerHTML = `
      <div class="um-shell">
        <div class="um-top">
          <div class="um-step"></div>
          <button class="um-close" data-cursor-label="Close" aria-label="Close">✕</button>
        </div>
        <div class="um-stage">
          <button class="um-arrow um-prev" data-cursor-label="Prev" aria-label="Previous">‹</button>
          <div class="um-screenframe">
            <div class="um-prog"></div>
            ${SCREENS.map((s, i) => `<div class="um-slide${i === 0 ? ' active' : ''}"><img src="${s.img}" alt="${s.name}" /></div>`).join('')}
            <div class="um-vignette"></div>
          </div>
          <button class="um-arrow um-next" data-cursor-label="Next" aria-label="Next">›</button>
        </div>
        <div class="um-foot">
          <div>
            <div class="um-title"></div>
            <div class="um-desc"></div>
            <button class="um-play"><span class="pi">▶</span><span class="pl">Auto-play flow</span></button>
          </div>
          <div class="um-rail">${SCREENS.map((_, i) => `<button data-i="${i}" aria-label="Go to screen ${i + 1}"></button>`).join('')}</div>
        </div>
      </div>`;
    document.body.appendChild(modal);
    mSlides = $$('.um-slide', modal);
    mStep = $('.um-step', modal); mTitle = $('.um-title', modal); mDesc = $('.um-desc', modal);
    mRail = $$('.um-rail button', modal); mProg = $('.um-prog', modal); mPlay = $('.um-play', modal);
    $('.um-close', modal).addEventListener('click', closeModal);
    $('.um-prev', modal).addEventListener('click', () => { showM(mIdx - 1); stopPlay(); });
    $('.um-next', modal).addEventListener('click', () => { showM(mIdx + 1); stopPlay(); });
    mRail.forEach((b) => b.addEventListener('click', () => { showM(+b.dataset.i); stopPlay(); }));
    mPlay.addEventListener('click', togglePlay);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  }

  function showM(n) {
    mIdx = (n + SCREENS.length) % SCREENS.length;
    const s = SCREENS[mIdx];
    mSlides.forEach((sl, k) => sl.classList.toggle('active', k === mIdx));
    mRail.forEach((b, k) => b.classList.toggle('on', k === mIdx));
    mStep.textContent = s.step; mTitle.textContent = s.name; mDesc.textContent = s.desc;
    restartProg();
  }
  function restartProg() {
    if (!mProg) return;
    mProg.style.transition = 'none'; mProg.style.width = '0%'; void mProg.offsetWidth;
    if (mPlaying && document.body.classList.contains('motion')) {
      mProg.style.transition = `width ${M_DUR}ms linear`; mProg.style.width = '100%';
    }
  }
  function schedule() { clearInterval(mTimer); if (mPlaying) mTimer = setInterval(() => showM(mIdx + 1), M_DUR); }
  function togglePlay() { mPlaying ? stopPlay() : startPlay(); }
  function startPlay() { mPlaying = true; mPlay.querySelector('.pi').textContent = '❚❚'; mPlay.querySelector('.pl').textContent = 'Pause'; schedule(); restartProg(); }
  function stopPlay() { mPlaying = false; if (mPlay) { mPlay.querySelector('.pi').textContent = '▶'; mPlay.querySelector('.pl').textContent = 'Auto-play flow'; } clearInterval(mTimer); if (mProg) mProg.style.transition = 'none'; }

  function openModal(i) {
    if (!modal) buildModal();
    showM(i);
    requestAnimationFrame(() => modal.classList.add('open'));
    document.documentElement.style.overflow = 'hidden';
    addEventListener('keydown', onKey);
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open'); stopPlay();
    document.documentElement.style.overflow = '';
    removeEventListener('keydown', onKey);
  }
  function onKey(e) {
    if (e.key === 'Escape') closeModal();
    else if (e.key === 'ArrowRight') { showM(mIdx + 1); stopPlay(); }
    else if (e.key === 'ArrowLeft') { showM(mIdx - 1); stopPlay(); }
  }
  window.__openWalkthrough = openModal;
})();
