/* ============================================================================
   TOUCHTUNE — "willow & notes" field (verlet)
   A reusable curtain of strands that hang from the top, droop under gravity
   and sway with an ambient breeze. The cursor acts as a gust of wind, parting
   the willows as it passes. Two instances run:
     • #tt-cover-gl  — the cover: notes hang on the strands, fading downward.
     • #tt-trans-gl  — the dark transition above it: no notes, fading *up* so
                       the strands are strongest at the bottom and visibly
                       extend down into the cover below (same column grid).
   ========================================================================== */
(function () {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- shared pointer state (client coords + velocity) ----
  let cx = -9999, cy = -9999, cvx = 0, cvy = 0, haveMouse = false;
  function track(x, y) {
    if (haveMouse) { cvx = x - cx; cvy = y - cy; }
    cx = x; cy = y; haveMouse = true;
  }
  addEventListener('mousemove', (e) => track(e.clientX, e.clientY), { passive: true });
  addEventListener('touchmove', (e) => { const t = e.touches[0]; if (t) track(t.clientX, t.clientY); }, { passive: true });
  addEventListener('mouseout', () => { haveMouse = false; }, { passive: true });
  // bleed velocity off globally so gusts settle
  setInterval(() => { cvx *= 0.8; cvy *= 0.8; }, 32);

  const GLYPHS = ['\u2669', '\u266A', '\u266B', '\u266C']; // ♩ ♪ ♫ ♬
  const NOTE_FONT = "'Noto Music','Segoe UI Symbol','Apple Symbols','Noto Sans',serif";

  function makeWillows(canvas, opts) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const o = Object.assign({
      notes: true, dir: 'down', onDark: false, lenMin: 0.40, lenMax: 0.92, sect: null
    }, opts || {});

    let Wc = 0, Hc = 0, dpr = Math.min(devicePixelRatio || 1, 1.75);
    let strands = [];

    function build() {
      const r = canvas.getBoundingClientRect();
      Wc = Math.max(2, r.width); Hc = Math.max(2, r.height);
      canvas.width = Math.round(Wc * dpr);
      canvas.height = Math.round(Hc * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      strands = [];
      // deterministic column grid → cover & transition strands share x columns
      const gap = Math.max(28, Math.min(48, Wc / 32));
      const count = Math.min(56, Math.ceil(Wc / gap) + 1);
      const seg = 17;
      for (let i = 0; i < count; i++) {
        const ax = (i + 0.5) * gap;
        const len = Hc * (o.lenMin + Math.random() * (o.lenMax - o.lenMin));
        const n = Math.max(7, Math.round(len / seg));
        const pts = [];
        for (let j = 0; j < n; j++) {
          const y = j * seg - 10;
          pts.push({ x: ax, y: y, px: ax, py: y, pin: j === 0 });
        }
        const notes = [];
        if (o.notes) {
          const nc = Math.random() < 0.66 ? 1 + ((Math.random() * 2) | 0) : 0;
          for (let k = 0; k < nc; k++) {
            const idx = Math.min(n - 1, ((n * 0.5) + Math.random() * n * 0.48) | 0);
            notes.push({ idx, g: GLYPHS[(Math.random() * GLYPHS.length) | 0], size: 13 + Math.random() * 13, ph: Math.random() * 6.283 });
          }
        }
        strands.push({
          ax, seg, pts, notes,
          lean: (Math.random() - 0.5) * (o.onDark ? 0.10 : 0.16),
          phase: Math.random() * 6.283,
          bright: Math.random() < (o.onDark ? 0.4 : 0.28)
        });
      }
    }

    let t = 0;
    function step() {
      t += 0.016;
      const r = canvas.getBoundingClientRect();
      const mx = haveMouse ? cx - r.left : -9999;
      const my = haveMouse ? cy - r.top : -9999;
      const breeze = Math.sin(t * 0.6) * 0.13 + Math.sin(t * 0.27 + 1.3) * 0.08;
      for (const s of strands) {
        const pts = s.pts, n = pts.length;
        for (let j = 0; j < n; j++) {
          const p = pts[j];
          if (p.pin) {
            p.x = s.ax + Math.sin(t * 0.5 + s.ax * 0.02) * 2.2;
            p.y = -10; p.px = p.x; p.py = p.y; continue;
          }
          const depth = j / n;
          let nx = p.x + (p.x - p.px) * 0.96;
          let ny = p.y + (p.y - p.py) * 0.96;
          ny += 0.36;
          nx += s.lean * (0.3 + depth * 1.1);
          nx += (breeze + Math.sin(t * 1.1 + j * 0.4 + s.phase) * 0.10) * (0.4 + depth * 1.2);
          if (haveMouse) {
            const dx = p.x - mx, dy = p.y - my, R = 150, d2 = dx * dx + dy * dy;
            if (d2 < R * R) {
              const d = Math.sqrt(d2) || 1, f = 1 - d / R;
              nx += (cvx * 0.20 + (dx / d) * 2.4) * f * (0.45 + depth);
              ny += (cvy * 0.10 + (dy / d) * 0.7) * f * (0.45 + depth);
            }
          }
          p.px = p.x; p.py = p.y; p.x = nx; p.y = ny;
        }
        for (let it = 0; it < 3; it++) {
          for (let j = 0; j < n - 1; j++) {
            const a = pts[j], b = pts[j + 1];
            const dx = b.x - a.x, dy = b.y - a.y;
            const d = Math.sqrt(dx * dx + dy * dy) || 0.0001;
            const diff = (d - s.seg) / d;
            if (a.pin) { b.x -= dx * diff; b.y -= dy * diff; }
            else { const ox = dx * 0.5 * diff, oy = dy * 0.5 * diff; a.x += ox; a.y += oy; b.x -= ox; b.y -= oy; }
          }
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, Wc, Hc);
      ctx.lineCap = 'round';
      const up = o.dir === 'up';
      for (const s of strands) {
        const pts = s.pts, n = pts.length;
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let j = 1; j < n - 1; j++) {
          const xc = (pts[j].x + pts[j + 1].x) / 2, yc = (pts[j].y + pts[j + 1].y) / 2;
          ctx.quadraticCurveTo(pts[j].x, pts[j].y, xc, yc);
        }
        ctx.lineTo(pts[n - 1].x, pts[n - 1].y);
        const a0 = (s.bright ? 0.50 : 0.24) * (o.onDark ? 1.5 : 1);
        const g = ctx.createLinearGradient(0, pts[0].y, 0, pts[n - 1].y);
        if (up) {
          g.addColorStop(0, 'rgba(255,178,122,0)');
          g.addColorStop(0.45, 'rgba(255,150,84,' + (a0 * 0.5).toFixed(3) + ')');
          g.addColorStop(1, 'rgba(255,140,46,' + Math.min(1, a0).toFixed(3) + ')');
        } else {
          g.addColorStop(0, 'rgba(255,116,23,' + (a0 * 0.92).toFixed(3) + ')');
          g.addColorStop(0.5, 'rgba(255,150,84,' + (a0 * 0.66).toFixed(3) + ')');
          g.addColorStop(1, 'rgba(255,178,122,0)');
        }
        ctx.strokeStyle = g;
        ctx.lineWidth = s.bright ? 1.5 : 1.0;
        if (o.onDark) { ctx.shadowColor = 'rgba(255,116,23,0.5)'; ctx.shadowBlur = 6; }
        ctx.stroke();
        ctx.shadowBlur = 0;

        for (const nt of s.notes) {
          const i = Math.min(nt.idx, n - 1);
          const p = pts[i], prev = pts[Math.max(0, i - 1)];
          const lean = Math.max(-0.5, Math.min(0.5, (p.x - prev.x) * 0.05));
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(lean + Math.sin(t * 1.3 + nt.ph) * 0.10);
          ctx.font = nt.size + 'px ' + NOTE_FONT;
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
          ctx.shadowColor = 'rgba(255,116,23,0.55)'; ctx.shadowBlur = 11;
          ctx.fillStyle = 'rgba(255,116,23,0.92)';
          ctx.fillText(nt.g, 0, 0);
          ctx.restore();
        }
      }
    }

    function settle(k) { for (let i = 0; i < k; i++) step(); }

    let running = true;
    function loop() { if (!running) return; step(); draw(); requestAnimationFrame(loop); }

    build();
    addEventListener('resize', (function () { let to; return function () { clearTimeout(to); to = setTimeout(build, 180); }; })());

    if (reduce) { settle(140); draw(); return; }
    settle(34);
    if (o.sect && 'IntersectionObserver' in window) {
      new IntersectionObserver((es) => es.forEach((x) => {
        const was = running; running = x.isIntersecting; if (running && !was) loop();
      }), { threshold: 0.01 }).observe(o.sect);
    }
    loop();
  }

  const cover = document.getElementById('tt-cover-gl');
  if (cover) makeWillows(cover, { notes: true, dir: 'down', onDark: false, lenMin: 0.40, lenMax: 0.92, sect: document.getElementById('tt-cover') });
})();
