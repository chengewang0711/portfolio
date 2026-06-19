/* ============================================================================
   FIREPULSE — Interactive UI prototype driver
   Real screens + hotspots, advancing through the operator flow.
   ========================================================================== */
(function () {
  'use strict';
  const root = document.getElementById('ui-proto');
  if (!root) return;
  const proto = root.closest('.proto');

  const FLOW = ['teaching', 'ready', 'live', 'success', 'eval'];
  const META = {
    teaching: { step: '01 · Prior to entry', title: 'Teaching Model', desc: 'Mission briefing overlay — the fire-scene map, heat-affected structures (A/B) and points of ignition, reviewed before entry. Confirm to stand by.' },
    ready:    { step: '02 · Standby', title: 'Ready to Deploy', desc: 'The trainee confirms the briefing and signals READY; the instructor releases the live scenario. EXIT returns to the briefing.' },
    live:     { step: '03 · In the fireground', title: 'Live Operational HUD', desc: 'Vitals (heart rate, oxygen), battery, heading compass and live task progress overlay the real scene. Raise the hose to extinguish the fire ahead.' },
    success:  { step: '04 · Objective cleared', title: 'Mission Success', desc: 'Primary fire source extinguished — the drill resolves and logging finalizes, handing off to the after-action report.' },
    eval:     { step: '05 · Data evaluation', title: 'After-Action Report', desc: 'Per-trainee scoring across reactivity, efficiency and accuracy, with badge level and squad ranking. Restart to run the drill again.' }
  };

  const screens = {};
  root.querySelectorAll('.proto-screen').forEach((s) => { screens[s.dataset.screen] = s; });
  const steps = Array.from(proto.querySelectorAll('.proto-step'));
  const pmStep = proto.querySelector('.pm-step');
  const pmTitle = proto.querySelector('.pm-title');
  const pmDesc = proto.querySelector('.pm-desc');
  let idx = 0;

  function show(name) {
    if (!screens[name]) name = 'teaching';
    idx = FLOW.indexOf(name);
    Object.entries(screens).forEach(([k, el]) => el.classList.toggle('active', k === name));
    steps.forEach((b, i) => {
      b.classList.toggle('on', i === idx);
      b.classList.toggle('done', i < idx);
    });
    const m = META[name];
    if (pmStep) pmStep.textContent = m.step;
    if (pmTitle) pmTitle.textContent = m.title;
    if (pmDesc) pmDesc.textContent = m.desc;
  }

  // hotspots + prompts carry data-go
  root.addEventListener('click', (e) => {
    const t = e.target.closest('[data-go]');
    if (!t) return;
    show(t.dataset.go);
  });

  // step rail
  steps.forEach((b, i) => b.addEventListener('click', () => show(FLOW[i])));

  // prev / next / restart / fullscreen
  const prev = proto.querySelector('.pn-prev');
  const next = proto.querySelector('.pn-next');
  const restart = proto.querySelector('.pn-restart');
  const full = proto.querySelector('.pn-full');
  if (prev) prev.addEventListener('click', () => show(FLOW[(idx - 1 + FLOW.length) % FLOW.length]));
  if (next) next.addEventListener('click', () => show(FLOW[(idx + 1) % FLOW.length]));
  if (restart) restart.addEventListener('click', () => show('teaching'));
  if (full) full.addEventListener('click', () => {
    const on = proto.classList.toggle('is-full');
    document.documentElement.style.overflow = on ? 'hidden' : '';
    full.textContent = on ? '⤡' : '⤢';
  });

  // keyboard when in view / fullscreen
  addEventListener('keydown', (e) => {
    const visible = proto.classList.contains('is-full') || isInView(proto);
    if (!visible) return;
    if (e.key === 'ArrowRight') show(FLOW[(idx + 1) % FLOW.length]);
    else if (e.key === 'ArrowLeft') show(FLOW[(idx - 1 + FLOW.length) % FLOW.length]);
    else if (e.key === 'Escape' && proto.classList.contains('is-full')) full && full.click();
  });
  function isInView(el) {
    const r = el.getBoundingClientRect();
    return r.top < innerHeight * 0.7 && r.bottom > innerHeight * 0.3;
  }

  // let the section's 3D list / external callers jump in
  window.__protoGoto = function (i) {
    show(FLOW[i] || 'teaching');
    proto.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  show('teaching');
})();
