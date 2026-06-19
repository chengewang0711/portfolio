/* ============================================================================
   FIREPULSE portfolio — interactions
   ========================================================================== */
(function () {
  'use strict';
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- motion gate (also driven by tweaks) ---- */
  function setMotion(on) {
    document.body.classList.toggle('motion', !!on && !prefersReduced);
  }
  setMotion(true);
  window.__setMotion = setMotion;

  /* ---- topbar + scroll progress ---- */
  const topbar = $('.topbar');
  const sbar = $('.scroll-bar');
  function onScroll() {
    const y = window.scrollY || 0;
    if (topbar) topbar.classList.toggle('scrolled', y > 40);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (sbar) sbar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- reveal on scroll ---- */
  const revObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); revObs.unobserve(e.target); } });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
  $$('.reveal').forEach((el) => revObs.observe(el));

  /* ---- dot nav active section ---- */
  const sections = $$('section[id]');
  const dots = {};
  $$('.dotnav a').forEach((a) => { dots[a.getAttribute('href').slice(1)] = a; });
  const navObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        Object.values(dots).forEach((d) => d.classList.remove('active'));
        const d = dots[e.target.id]; if (d) d.classList.add('active');
      }
    });
  }, { threshold: 0.5 });
  sections.forEach((s) => navObs.observe(s));

  /* ---- before / after slider ---- */
  $$('.ba').forEach((ba) => {
    const afterWrap = $('.after-wrap', ba);
    const handle = $('.handle', ba);
    const knob = $('.knob', ba);
    let p = 50;
    function set(pct) {
      p = Math.max(0, Math.min(100, pct));
      afterWrap.style.clipPath = `inset(0 0 0 ${p}%)`;
      handle.style.left = p + '%';
      knob.style.left = p + '%';
    }
    function fromEvent(ev) {
      const r = ba.getBoundingClientRect();
      const x = (ev.touches ? ev.touches[0].clientX : ev.clientX) - r.left;
      set((x / r.width) * 100);
    }
    let dragging = false;
    const start = (e) => { dragging = true; fromEvent(e); e.preventDefault(); };
    const move = (e) => { if (dragging) fromEvent(e); };
    const end = () => { dragging = false; };
    ba.addEventListener('pointerdown', start);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', end);
    set(50);
    // gentle auto-hint when first revealed
    const hintObs = new IntersectionObserver((en) => {
      en.forEach((x) => {
        if (x.isIntersecting && !ba.dataset.hinted && document.body.classList.contains('motion')) {
          ba.dataset.hinted = '1';
          let t = 0; const id = setInterval(() => {
            t += 1; set(50 + Math.sin(t / 3) * 16);
            if (t > 14) { clearInterval(id); set(50); }
          }, 45);
        }
      });
    }, { threshold: 0.5 });
    hintObs.observe(ba);
  });

  /* ---- UI viewer walkthrough ---- */
  (function viewer() {
    const slides = $$('.viewer .slide');
    const fslides = $$('.visor .screen .slide');
    const thumbs = $$('.thumb');
    const vstep = $('.viewer .vstep');
    const vtitle = $('.viewer .vtitle');
    const vdesc = $('.viewer .vdesc');
    const prog = $('.vprogress');
    if (!slides.length) return;
    const data = window.__UI_FLOW || [];
    let i = 0, timer = null, progT = null;
    const DUR = 5200;
    function show(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle('active', k === i));
      fslides.forEach((s, k) => s.classList.toggle('active', k === i));
      thumbs.forEach((t, k) => t.classList.toggle('active', k === i));
      const d = data[i] || {};
      if (vstep) vstep.textContent = d.step || ('Screen ' + (i + 1));
      if (vtitle) vtitle.textContent = d.title || '';
      if (vdesc) vdesc.textContent = d.desc || '';
      restartProgress();
    }
    function restartProgress() {
      if (!prog) return;
      clearTimeout(progT); prog.style.transition = 'none'; prog.style.width = '0%';
      // reflow
      void prog.offsetWidth;
      if (document.body.classList.contains('motion') && playing) {
        prog.style.transition = `width ${DUR}ms linear`; prog.style.width = '100%';
      }
    }
    let playing = true;
    function schedule() { clearInterval(timer); if (playing) timer = setInterval(() => show(i + 1), DUR); }
    thumbs.forEach((t, k) => t.addEventListener('click', () => { show(k); schedule(); }));
    const next = $('.vnav .next'), prev = $('.vnav .prev'), pause = $('.vnav .pause');
    if (next) next.addEventListener('click', () => { show(i + 1); schedule(); });
    if (prev) prev.addEventListener('click', () => { show(i - 1); schedule(); });
    if (pause) pause.addEventListener('click', () => {
      playing = !playing; pause.textContent = playing ? '❚❚' : '►';
      if (playing) { schedule(); restartProgress(); } else { clearInterval(timer); if (prog) { prog.style.transition='none'; } }
    });
    show(0); schedule();
    // pause auto when offscreen
    const vObs = new IntersectionObserver((en) => {
      en.forEach((x) => { if (!x.isIntersecting) clearInterval(timer); else schedule(); });
    }, { threshold: 0.3 });
    const vEl = $('.viewer'); if (vEl) vObs.observe(vEl);
  })();

  /* ---- task progress segments ---- */
  function runWhenVisible(sel, cb) {
    const els = $$(sel); if (!els.length) return;
    const o = new IntersectionObserver((en) => {
      en.forEach((x) => { if (x.isIntersecting) { cb(x.target); o.unobserve(x.target); } });
    }, { threshold: 0.4 });
    els.forEach((e) => o.observe(e));
  }
  runWhenVisible('.seg', (el) => setTimeout(() => el.classList.add('run'), 150));

  /* ---- compass ticks ---- */
  (function compass() {
    const track = $('.compass-ticks');
    if (!track) return;
    const dirs = { 0: 'N', 45: '45', 90: 'E', 135: '135', 180: 'S', 225: '225', 270: 'W', 315: '315', 360: 'N' };
    let html = '';
    for (let d = -30; d <= 390; d += 15) {
      const norm = ((d % 360) + 360) % 360;
      const major = norm % 45 === 0;
      html += `<div class="tk ${major ? 'major' : ''}"><i></i>${major ? '<b>' + (dirs[norm] || norm) + '</b>' : ''}</div>`;
    }
    track.innerHTML = html;
    const stage = $('.compass-bar');
    const tickW = 16;
    // center on 45deg heading
    function place(off) {
      const center = stage.clientWidth / 2;
      // index of -30 start; heading 45 -> position
      const startDeg = -30;
      const x = center - ((45 - startDeg) / 15) * tickW + off;
      track.style.transform = `translateX(${x}px)`;
    }
    let t = 0; place(0);
    function sway() {
      if (document.body.classList.contains('motion')) { t += 0.012; place(Math.sin(t) * 10); }
      requestAnimationFrame(sway);
    }
    requestAnimationFrame(sway);
  })();

  /* ---- assessment rings ---- */
  (function rings() {
    const cards = $$('.ring-wrap');
    if (!cards.length) return;
    const R = 50, C = 2 * Math.PI * R;
    cards.forEach((w) => {
      const prog = $('.prog', w);
      prog.style.strokeDasharray = C;
      prog.style.strokeDashoffset = C;
    });
    const o = new IntersectionObserver((en) => {
      en.forEach((x) => {
        if (!x.isIntersecting) return;
        const w = x.target; o.unobserve(w);
        const target = +w.dataset.val;
        const prog = $('.prog', w), label = $('.pct', w);
        const motion = document.body.classList.contains('motion');
        if (!motion) { prog.style.strokeDashoffset = C * (1 - target / 100); label.textContent = target + '%'; return; }
        const dur = 1400, t0 = performance.now();
        function tick(now) {
          const k = Math.min(1, (now - t0) / dur);
          const e = 1 - Math.pow(1 - k, 3);
          const v = target * e;
          prog.style.strokeDashoffset = C * (1 - v / 100);
          label.textContent = Math.round(v) + '%';
          if (k < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.45 });
    cards.forEach((w) => o.observe(w));
  })();

  /* ---- year ---- */
  const yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();
})();
