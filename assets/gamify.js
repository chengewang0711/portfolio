/* ============================================================================
   FIREPULSE — gamified HUD layer for the featured playable prototype.
   Watches the prototype flow (teaching → ready → live → success → eval) and
   drives SCORE / XP / LEVEL / OBJECTIVES / mission timer in the chrome bar.
   Purely additive — does not touch screens.js behaviour.
   ========================================================================== */
(function () {
  'use strict';
  const wrap = document.getElementById('ui-proto');
  if (!wrap) return;
  const chrome = document.querySelector('.proto-chrome.gamehud');
  if (!chrome) return;

  const elScore = chrome.querySelector('[data-gh-score]');
  const elXP    = chrome.querySelector('[data-gh-xp]');
  const elLvl   = chrome.querySelector('[data-gh-level]');
  const elObj   = chrome.querySelector('[data-gh-obj]');
  const elTimer = chrome.querySelector('[data-gh-timer]');

  const FLOW = ['teaching', 'ready', 'live', 'success', 'eval'];
  // cumulative score the FIRST time each screen is reached
  const REWARD = { teaching: 0, ready: 250, live: 600, success: 1200, eval: 1500 };
  const TOTAL_OBJ = FLOW.length;

  const reached = new Set();
  let score = 0, shown = 0;

  /* ---- animated score counter ---- */
  function renderScore() {
    if (shown === score) return;
    const diff = score - shown;
    shown += Math.max(1, Math.round(diff * 0.18));
    if (Math.abs(score - shown) < 2) shown = score;
    if (elScore) elScore.textContent = shown.toLocaleString();
    const lvl = Math.floor(shown / 1000) + 1;
    if (elLvl) elLvl.textContent = 'LVL ' + lvl;
    if (elXP) elXP.style.width = ((shown % 1000) / 10) + '%';
    if (shown !== score) requestAnimationFrame(renderScore);
  }
  function bump(target) {
    score = target;
    chrome.classList.add('gh-pop');
    setTimeout(() => chrome.classList.remove('gh-pop'), 420);
    requestAnimationFrame(renderScore);
  }

  /* ---- mission timer (runs only during the live drill) ---- */
  let t0 = 0, running = false, frozen = '00:00';
  function fmt(ms) {
    const s = Math.floor(ms / 1000);
    return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  }
  (function tickTimer() {
    if (running && elTimer) elTimer.textContent = fmt(performance.now() - t0);
    requestAnimationFrame(tickTimer);
  })();

  /* ---- react to the active screen ---- */
  function onScreen(name) {
    const i = FLOW.indexOf(name);
    if (i < 0) return;
    // objectives = how far you've progressed
    const objHit = Math.max(reached.size, i + (name === 'eval' ? 1 : 1));
    if (!reached.has(name)) {
      reached.add(name);
      bump(REWARD[name] != null ? REWARD[name] : score);
      if (elObj) elObj.textContent = Math.min(reached.size, TOTAL_OBJ) + '/' + TOTAL_OBJ;
      // brief flash on objective gain
      flash();
    }
    // timer control
    if (name === 'live') { t0 = performance.now(); running = true; }
    else if (name === 'success' || name === 'eval') { running = false; }
    else if (name === 'teaching' || name === 'ready') { running = false; if (elTimer) elTimer.textContent = '00:00'; }

    // restart resets the run
    if (name === 'teaching' && reached.size > 1) {
      reached.clear(); reached.add('teaching');
      score = 0; shown = 0;
      if (elScore) elScore.textContent = '0';
      if (elXP) elXP.style.width = '0%';
      if (elLvl) elLvl.textContent = 'LVL 1';
      if (elObj) elObj.textContent = '0/' + TOTAL_OBJ;
      if (elTimer) elTimer.textContent = '00:00';
    }
  }

  function flash() {
    const f = document.createElement('span');
    f.className = 'gh-flash';
    f.textContent = '+OBJ';
    chrome.appendChild(f);
    setTimeout(() => f.remove(), 900);
  }

  /* ---- spray bonus: small score trickle while clearing the fire ---- */
  const stage = wrap.querySelector('[data-spray]');
  if (stage) {
    let last = 0;
    stage.addEventListener('pointerdown', () => {
      const now = performance.now();
      if (now - last > 140 && reached.has('live') && !reached.has('success')) {
        last = now; score += 15; requestAnimationFrame(renderScore);
      }
    });
  }

  /* ---- observe active screen via class mutations ---- */
  const screens = Array.from(wrap.querySelectorAll('.proto-screen'));
  const mo = new MutationObserver(() => {
    const active = screens.find((s) => s.classList.contains('active'));
    if (active) onScreen(active.dataset.screen);
  });
  screens.forEach((s) => mo.observe(s, { attributes: true, attributeFilter: ['class'] }));

  // init
  onScreen('teaching');
})();
