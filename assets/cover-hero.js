/* ============================================================================
   COVER — monochrome "PORTFOLIO" landing (Frame 25).
   · A dithered moon disc clipped to the big annotated circle.
   · A TouchDesigner-style WOVEN field: drifting particles linked by a faint
     mesh ("织线"), and a bright tracking line that traces the cursor sweep —
     nearby particles thread themselves onto the cursor as it passes.
   ========================================================================== */
(function () {
  'use strict';
  const cover = document.getElementById('hero-cover');
  if (!cover) return;
  const canvas = cover.querySelector('.hc-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const VB = { w: 1920, h: 1080, cx: 210, cy: 735, r: 600 };
  let W = 0, H = 0, DPR = Math.min(2, window.devicePixelRatio || 1);
  let scale = 1, circle = { x: 0, y: 0, r: 0 };
  let moon = null, parts = [];

  /* ---------- pointer ---------- */
  let rawx = -9999, rawy = -9999, mx = -9999, my = -9999;
  let active = false, t = 0;
  const trail = [];

  cover.addEventListener('pointermove', (e) => {
    const r = cover.getBoundingClientRect();
    rawx = e.clientX - r.left; rawy = e.clientY - r.top;
    active = true;
  }, { passive: true });
  cover.addEventListener('pointerleave', () => { active = false; });

  /* ---------- value-noise fbm (dithered moon) ---------- */
  function hash(x, y) { const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return n - Math.floor(n); }
  function vnoise(x, y) {
    const xi = Math.floor(x), yi = Math.floor(y);
    const xf = x - xi, yf = y - yi;
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }
  function fbm(x, y) { let s = 0, amp = 0.5, f = 1; for (let i = 0; i < 5; i++) { s += amp * vnoise(x * f, y * f); f *= 2.03; amp *= 0.5; } return s; }
  const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

  function buildMoon() {
    const d = Math.max(60, Math.min(1280, Math.round(circle.r * 2)));
    const oc = document.createElement('canvas'); oc.width = d; oc.height = d;
    const o = oc.getContext('2d');
    const img = o.createImageData(d, d), data = img.data, R = d / 2, ns = d / 9;
    for (let y = 0; y < d; y++) for (let x = 0; x < d; x++) {
      const i = (y * d + x) * 4, dx = x - R, dy = y - R, rr = Math.hypot(dx, dy);
      if (rr > R - 0.5) { data[i + 3] = 0; continue; }
      let n = fbm(x / ns, y / ns); n = (n - 0.18) / 0.7;
      n += fbm(x / (ns * 0.34) + 40, y / (ns * 0.34) + 40) * 0.22;
      const shade = 0.55 + (-dx - dy) / (R * 2.4);
      const rim = 1 - Math.pow(rr / R, 2.3) * 0.85;
      const dir = 0.30 + 0.70 * Math.max(0, Math.min(1, ((-dx + dy) / (1.5 * R)) + 0.5));
      let val = Math.max(0, Math.min(1, n * shade * rim * dir));
      const thr = (BAYER[(y & 3) * 4 + (x & 3)] + 0.5) / 16;
      if (val > thr * 0.92) { const g = 60 + val * 150; data[i] = g; data[i + 1] = g + 6; data[i + 2] = g + 10; data[i + 3] = 150 + val * 105; }
      else data[i + 3] = 0;
    }
    o.putImageData(img, 0, 0); moon = oc;
  }

  /* ---------- particle field ---------- */
  function seedParts() {
    const target = Math.round(Math.max(110, Math.min(260, (W * H) / 7600)));
    parts = [];
    for (let i = 0; i < target; i++) {
      parts.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
        r: 0.45 + Math.random() * 0.85
      });
    }
  }

  function resize() {
    const r = cover.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    scale = Math.max(W / VB.w, H / VB.h);
    circle.x = W / 2 + (VB.cx - VB.w / 2) * scale;
    circle.y = H / 2 + (VB.cy - VB.h / 2) * scale;
    circle.r = VB.r * scale;
    buildMoon(); seedParts();
  }
  resize();
  addEventListener('resize', resize, { passive: true });

  /* ---------- draw ---------- */
  const LINK = 106, CURSOR_R = 230, TRAIL_MAX = 52;

  function frame() {
    t++;
    ctx.clearRect(0, 0, W, H);
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';

    // smoothed pointer
    if (active) { if (mx < -5000) { mx = rawx; my = rawy; } mx += (rawx - mx) * 0.2; my += (rawy - my) * 0.2; }

    // moon (slight parallax toward pointer)
    if (moon) {
      const par = active ? ((mx - circle.x) / W) * 20 * scale : 0;
      const parY = active ? ((my - circle.y) / H) * 16 * scale : 0;
      ctx.drawImage(moon, circle.x - circle.r + par, circle.y - circle.r + parY, circle.r * 2, circle.r * 2);
    }

    // advance particles + gentle cursor pull
    for (const p of parts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < -10) p.x = W + 10; else if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10; else if (p.y > H + 10) p.y = -10;
      if (active) {
        const dx = mx - p.x, dy = my - p.y, d = Math.hypot(dx, dy);
        if (d < CURSOR_R && d > 0.1) { const f = (1 - d / CURSOR_R) * 0.5; p.x += (dx / d) * f; p.y += (dy / d) * f; }
      }
    }

    // woven mesh between particles
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      for (let j = i + 1; j < parts.length; j++) {
        const q = parts[j];
        const dx = p.x - q.x, dy = p.y - q.y, dd = dx * dx + dy * dy;
        if (dd < LINK * LINK) {
          const a = (1 - Math.sqrt(dd) / LINK) * 0.16;
          ctx.strokeStyle = 'rgba(150,166,174,' + a.toFixed(3) + ')';
          ctx.lineWidth = 0.5;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
    }

    // particle dots + cursor threading
    for (const p of parts) {
      let near = 0;
      if (active) near = Math.max(0, 1 - Math.hypot(mx - p.x, my - p.y) / CURSOR_R);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r + near * 1.1, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(214,224,229,' + (0.3 + near * 0.55).toFixed(3) + ')';
      ctx.fill();
      if (near > 0.04) {
        ctx.strokeStyle = 'rgba(225,233,238,' + (near * near * 0.5).toFixed(3) + ')';
        ctx.lineWidth = 0.7;
        ctx.beginPath(); ctx.moveTo(mx, my); ctx.lineTo(p.x, p.y); ctx.stroke();
      }
    }

    // cursor sweep — tracking line
    if (active) {
      const last = trail[trail.length - 1];
      if (!last || Math.hypot(mx - last.x, my - last.y) > 5) trail.push({ x: mx, y: my, life: 1 });
    }
    for (let i = trail.length - 1; i >= 0; i--) { trail[i].life -= 0.022; if (trail[i].life <= 0) trail.splice(i, 1); }
    if (trail.length > TRAIL_MAX) trail.splice(0, trail.length - TRAIL_MAX);
    if (trail.length > 2) {
      for (let i = 1; i < trail.length - 1; i++) {
        const p0 = trail[i - 1], p1 = trail[i], p2 = trail[i + 1];
        const m0x = (p0.x + p1.x) / 2, m0y = (p0.y + p1.y) / 2;
        const m1x = (p1.x + p2.x) / 2, m1y = (p1.y + p2.y) / 2;
        const lf = Math.min(p0.life, p1.life, p2.life);
        ctx.strokeStyle = 'rgba(232,239,243,' + (lf * 0.5).toFixed(3) + ')';
        ctx.lineWidth = 1 + lf * 0.8;
        ctx.beginPath(); ctx.moveTo(m0x, m0y); ctx.quadraticCurveTo(p1.x, p1.y, m1x, m1y); ctx.stroke();
      }
      // thread the trail into nearby particles
      for (const tp of trail) {
        if (tp.life < 0.3) continue;
        for (const p of parts) {
          const dd = (tp.x - p.x) * (tp.x - p.x) + (tp.y - p.y) * (tp.y - p.y);
          if (dd < 6400) {
            const a = (1 - Math.sqrt(dd) / 80) * tp.life * 0.28;
            ctx.strokeStyle = 'rgba(205,217,223,' + a.toFixed(3) + ')';
            ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(tp.x, tp.y); ctx.lineTo(p.x, p.y); ctx.stroke();
          }
        }
      }
    }
    // bright cursor node
    if (active) {
      ctx.beginPath(); ctx.arc(mx, my, 2.4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(240,245,248,.9)'; ctx.fill();
    }

    requestAnimationFrame(frame);
  }

  if (reduce) {
    ctx.clearRect(0, 0, W, H);
    if (moon) ctx.drawImage(moon, circle.x - circle.r, circle.y - circle.r, circle.r * 2, circle.r * 2);
    for (let i = 0; i < parts.length; i++) for (let j = i + 1; j < parts.length; j++) {
      const p = parts[i], q = parts[j], dx = p.x - q.x, dy = p.y - q.y, dd = dx * dx + dy * dy;
      if (dd < LINK * LINK) { ctx.strokeStyle = 'rgba(150,166,174,' + ((1 - Math.sqrt(dd) / LINK) * 0.14).toFixed(3) + ')'; ctx.lineWidth = 0.5; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
    }
    parts.forEach((p) => { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(214,224,229,.32)'; ctx.fill(); });
  } else {
    requestAnimationFrame(frame);
  }
})();
