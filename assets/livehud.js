/* ============================================================================
   FIREPULSE — Live HUD driver (animation + spray interaction)
   ========================================================================== */
(function () {
  'use strict';
  const root = document.getElementById('live-hud');
  if (!root) return;
  const screen = root.closest('.proto-screen');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s) => root.querySelector(s);

  const elHr = $('[data-hr]'), elO2 = $('[data-o2]');
  const elBatt = $('[data-batt]'), elBattFill = $('[data-batt-fill]');
  const elDist = $('[data-dist]'), elNote = $('[data-note]');
  const compass = $('[data-compass]');
  const stage = $('[data-spray]');
  const fireTask = $('[data-task="fire"]'), fireFill = $('[data-fire-fill]'), fireCnt = $('[data-fire-cnt]');
  const donePrompt = $('.lh-done');

  /* ---- compass ticks ---- */
  (function buildCompass() {
    const labels = { 0: 'N', 45: '45', 90: 'E', 135: '135', 180: 'S', 225: '225', 270: 'W', 315: '315', 360: 'N', 405: '45' };
    let html = '';
    for (let d = -45; d <= 450; d += 15) {
      const norm = ((d % 360) + 360) % 360;
      const major = norm % 45 === 0;
      html += `<div class="tk ${major ? 'major' : ''}"><i></i>${major ? '<b>' + (labels[((d % 360) + 360) % 360] || norm) + '</b>' : ''}</div>`;
    }
    compass.innerHTML = html;
  })();

  /* ---- state ---- */
  let fire = 0.7, hr = 96, o2 = 98, batt = 85, dist = 46, t = 0, cleared = false;
  const TICK_W_DEG = 15;
  const fireHeadHtml = '<span>Extinguish the main fire source</span><span class="cnt" data-fire-cnt>2/3</span>';

  function resetState() {
    fire = 0.7; hr = 96; o2 = 98; batt = 85; cleared = false;
    fireTask.classList.remove('is-done');
    fireTask.querySelector('.tk-h').innerHTML = fireHeadHtml;
    if (elNote) elNote.textContent = 'Raise the hose to extinguish the fire ahead!';
    screen.classList.remove('cleared');
    if (donePrompt) donePrompt.classList.remove('show');
    renderFire();
  }

  function renderFire() {
    fireFill.style.width = Math.min(100, fire * 100) + '%';
    const n = Math.min(3, Math.floor(fire * 3 + 0.001));
    const fc = root.querySelector('[data-fire-cnt]');
    if (fc) fc.textContent = n + '/3';
    if (fire >= 0.999 && !cleared) {
      cleared = true;
      fireTask.classList.add('is-done');
      const cnt = fireTask.querySelector('.cnt'); if (cnt) { cnt.outerHTML = '<span class="done">✓ Completed</span>'; }
      if (elNote) elNote.textContent = 'Fire source extinguished — area clear.';
      screen.classList.add('cleared');
      if (donePrompt) donePrompt.classList.add('show');
    }
  }
  renderFire();

  // reset the drill each time the Live screen is (re)entered
  let wasActive = screen.classList.contains('active');
  new MutationObserver(() => {
    const now = screen.classList.contains('active');
    if (now && !wasActive) resetState();
    wasActive = now;
  }).observe(screen, { attributes: true, attributeFilter: ['class'] });

  /* ---- spray interaction ---- */
  function spray(clientX, clientY) {
    if (cleared) return;
    const r = stage.getBoundingClientRect();
    const x = clientX - r.left, y = clientY - r.top;
    // water jet from bottom-right nozzle toward click
    const jet = document.createElement('div');
    jet.className = 'lh-jet';
    const nozX = r.width * 0.68, nozY = r.height * 0.86;
    const dx = x - nozX, dy = y - nozY;
    const len = Math.hypot(dx, dy);
    const ang = Math.atan2(dy, dx) * 180 / Math.PI - 90;
    jet.style.left = nozX + 'px'; jet.style.top = (nozY - len) + 'px'; jet.style.height = len + 'px';
    jet.style.transformOrigin = 'bottom center';
    jet.style.transform = `rotate(${ang}deg)`;
    stage.appendChild(jet);
    setTimeout(() => jet.remove(), 170);
    // progress + vitals react
    fire = Math.min(1, fire + 0.05);
    hrTarget = Math.min(150, hrTarget + 4);
    renderFire();
  }
  let down = false;
  stage.addEventListener('pointerdown', (e) => { down = true; spray(e.clientX, e.clientY); });
  stage.addEventListener('pointermove', (e) => { if (down) spray(e.clientX, e.clientY); });
  addEventListener('pointerup', () => { down = false; });

  /* ---- ambient animation loop (only while live screen active) ---- */
  let hrTarget = 110;
  let last = performance.now();
  function frame(now) {
    requestAnimationFrame(frame);
    const active = screen.classList.contains('active');
    if (!active) { last = now; return; }
    const dt = Math.min(0.1, (now - last) / 1000); last = now;
    t += dt;

    // heart rate random-walk toward target, easing target back to rest
    hr += (hrTarget - hr) * dt * 1.2;
    hrTarget += (108 - hrTarget) * dt * 0.4 + (Math.random() - 0.5) * 2;
    if (elHr) elHr.textContent = Math.round(hr);

    // oxygen drifts slowly
    o2 = Math.max(95, Math.min(99.5, o2 + (Math.random() - 0.52) * dt * 4));
    if (elO2) elO2.textContent = Math.round(o2);

    // battery slow drain
    batt = Math.max(40, batt - dt * 0.25);
    if (elBatt) elBatt.textContent = Math.round(batt) + '%';
    if (elBattFill) elBattFill.style.width = batt + '%';

    // distance flickers a touch
    if (Math.random() < 0.02) { dist = 44 + Math.round(Math.random() * 5); if (elDist) elDist.textContent = dist + 'm'; }

    // compass sway: heading oscillates around 60°, centered on the pin
    if (!reduce) {
      const heading = 60 + Math.sin(t * 0.5) * 14;
      const tickW = compass.firstChild ? compass.firstChild.getBoundingClientRect().width : 0;
      const startDeg = -45;
      const px = -((heading - startDeg) / TICK_W_DEG) * tickW + compass.parentElement.clientWidth / 2;
      compass.style.transform = `translateX(${px}px)`;
    }
  }
  requestAnimationFrame(frame);
})();
