/* ============================================================================
   TOUCHTUNE — interactive engine
   anatomy hotspots · playable device sim (WebAudio) · NFC card modes
   ========================================================================== */
(function () {
  'use strict';
  const root = document.querySelector('.proj-tt');
  if (!root) return;
  const $ = (s, r) => (r || root).querySelector(s);
  const $$ = (s, r) => Array.from((r || root).querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================================================
     1 · DEVICE ANATOMY — hotspots over the flat render
     ========================================================= */
  const SPOTS = [
    { x: 14, y: 20, tag: 'Reading zone', name: 'NFC card slot', desc: 'Tap any TouchTune card here. The device reads it instantly and announces the mode aloud — no menus, no screens.',
      touch: 'Place a card', output: 'Voice confirms the mode', next: 'Sheet display refreshes' },
    { x: 14, y: 60, tag: 'Tactile display', name: 'Refreshable braille sheet', desc: 'Three rows of electronic braille cells raise and lower to render sheet music as touchable notes, with numbered notation.',
      touch: 'Read dots left to right', output: 'Raised orange pins', next: 'Page turns on demand' },
    { x: 14, y: 90, tag: 'Navigation', name: 'Page up / down', desc: 'Chevrons at the sheet edge step through pages of the score. The page number is embossed between them.',
      touch: 'Press a chevron', output: 'Cells re-render', next: 'Next page of notes' },
    { x: 38.5, y: 17, tag: 'Transport', name: 'Record', desc: 'Arms recording in the composition mode. Every key you press is captured with its timing — like a tactile tape recorder.',
      touch: 'Press once', output: 'Soft click + pulse', next: 'Keys are being captured' },
    { x: 47, y: 17, tag: 'Transport', name: 'Play / Pause', desc: 'Plays the current material: the loaded sheet in recognition mode, or your own recording in composition mode.',
      touch: 'Press once', output: 'Audio playback', next: 'Braille cursor follows' },
    { x: 57.5, y: 17, tag: 'Transport', name: 'Prev / Next', desc: 'Steps note by note through the score. Each step plays the note and raises its braille cell — listen and touch in sync.',
      touch: 'Press either end', output: 'One note sounds', next: 'Cursor moves one cell' },
    { x: 70, y: 17, tag: 'Transport', name: 'Delete', desc: 'Removes the last note you recorded. A short descending tone confirms the deletion without needing sight.',
      touch: 'Press once', output: 'Descending cue', next: 'Last note removed' },
    { x: 92.5, y: 13, tag: 'Signature control', name: 'Key Control knob', desc: 'The single vivid orange control. Turning it transposes everything you play into a new musical key.',
      touch: 'Turn the knob', output: 'Key announced', next: 'All notes transpose' },
    { x: 64, y: 62, tag: 'Instrument', name: 'Braille keyboard', desc: 'Fifteen soft keys in two rows, each embossed with the braille name of its note. Press to sound; press together for chords.',
      touch: 'Press a key', output: 'The note sounds', next: 'Cell lights on the sheet' }
  ];
  (function anatomy() {
    const stage = $('.anatomy-stage'); if (!stage) return;
    const imgwrap = $('.anatomy-imgwrap') || stage;
    const panel = { tag: $('.ap-tag'), h: $('.anatomy-panel h3'), p: $('.anatomy-panel p'),
      touch: $('#ap-touch'), output: $('#ap-output'), next: $('#ap-next') };
    const dotsWrap = $('.ap-dots');
    let hots = [], dots = [];
    SPOTS.forEach((s, i) => {
      const b = document.createElement('button');
      b.className = 'hot'; b.style.left = s.x + '%'; b.style.top = s.y + '%';
      b.setAttribute('aria-label', s.name);
      b.addEventListener('click', () => select(i));
      imgwrap.appendChild(b); hots.push(b);
      const d = document.createElement('i');
      d.addEventListener('click', () => select(i));
      dotsWrap.appendChild(d); dots.push(d);
    });
    function select(i) {
      const s = SPOTS[i];
      hots.forEach((h, k) => h.classList.toggle('on', k === i));
      dots.forEach((d, k) => d.classList.toggle('on', k === i));
      panel.tag.textContent = s.tag; panel.h.textContent = s.name; panel.p.textContent = s.desc;
      panel.touch.textContent = s.touch; panel.output.textContent = s.output; panel.next.textContent = s.next;
    }
    select(7); // start on the signature knob
  })();

  /* =========================================================
     2 · AUDIO — soft, friendly synth
     ========================================================= */
  let AC = null, master = null;
  function audio() {
    if (AC) return AC;
    AC = new (window.AudioContext || window.webkitAudioContext)();
    master = AC.createGain(); master.gain.value = 0.5; master.connect(AC.destination);
    return AC;
  }
  function playMidi(midi, dur, vel) {
    try {
      const ctx = audio(); if (ctx.state === 'suspended') ctx.resume();
      const t = ctx.currentTime; dur = dur || 0.45; vel = vel == null ? 1 : vel;
      const f = 440 * Math.pow(2, (midi - 69) / 12);
      const o1 = ctx.createOscillator(); o1.type = 'triangle'; o1.frequency.value = f;
      const o2 = ctx.createOscillator(); o2.type = 'sine'; o2.frequency.value = f * 2;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.32 * vel, t + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      const g2 = ctx.createGain(); g2.gain.value = 0.16;
      o1.connect(g); o2.connect(g2); g2.connect(g); g.connect(master);
      o1.start(t); o2.start(t); o1.stop(t + dur + 0.05); o2.stop(t + dur + 0.05);
    } catch (e) { /* audio unavailable */ }
  }
  function buzz() {
    try {
      const ctx = audio(); const t = ctx.currentTime;
      const o = ctx.createOscillator(); o.type = 'square'; o.frequency.value = 96;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.12, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
      o.connect(g); g.connect(master); o.start(t); o.stop(t + 0.2);
    } catch (e) {}
  }
  function cueDown() { playMidi(52, 0.22, .7); setTimeout(() => playMidi(45, 0.3, .6), 110); }
  function cueUp() { playMidi(72, 0.16, .7); setTimeout(() => playMidi(79, 0.26, .8), 110); }

  /* =========================================================
     3 · PLAYGROUND — playable device
     ========================================================= */
  const NOTE_LETTERS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const SOLFEGE = { C: 'do', D: 're', E: 'mi', F: 'fa', G: 'sol', A: 'la', B: 'ti' };
  // braille dot patterns for letters a–g (dot numbers 1..6)
  const BRAILLE = { A: [1], B: [1, 2], C: [1, 4], D: [1, 4, 5], E: [1, 5], F: [1, 2, 4], G: [1, 2, 4, 5] };
  // DOM order of dots in a cell: rows (1,4)(2,5)(3,6)
  const DOT_ORDER = [1, 4, 2, 5, 3, 6];
  const SEMI = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

  const MELODY = ['C', 'C', 'G', 'G', 'A', 'A', 'G', 'F', 'F', 'E', 'E', 'D', 'D', 'C']; // Twinkle
  const KEYS_CYCLE = [{ n: 'C', off: 0 }, { n: 'G', off: 7 }, { n: 'D', off: 2 }, { n: 'A', off: 9 }, { n: 'F', off: 5 }];

  const sim = $('#tt-sim'); if (!sim) return;
  const fb = $('#tt-feedback');
  const modeTag = $('#tt-mode-tag');
  const modeTitle = $('#tt-mode-title');
  const modeDesc = $('#tt-mode-desc');
  const nowLbl = $('#tt-now');
  const pageLbl = $('#tt-page');
  const knob = $('#tt-knob');
  const knobKey = $('#tt-knob-key');
  const recBtn = $('#tt-rec'); const playBtn = $('#tt-play');
  const prevBtn = $('#tt-prev'); const nextBtn = $('#tt-next'); const delBtn = $('#tt-del');

  /* ---- build braille cells ---- */
  const CELLS = 8;
  const rowEl = $('#tt-brow');
  const cells = [];
  for (let i = 0; i < CELLS; i++) {
    const c = document.createElement('div'); c.className = 'bcell';
    DOT_ORDER.forEach(() => { const d = document.createElement('i'); c.appendChild(d); });
    const nm = document.createElement('span'); nm.className = 'nm'; c.appendChild(nm);
    rowEl.appendChild(c); cells.push(c);
  }
  function renderCell(i, letter, current) {
    const c = cells[i]; if (!c) return;
    const dots = $$('i', c);
    const pat = letter ? (BRAILLE[letter] || []) : [];
    DOT_ORDER.forEach((dn, k) => dots[k].classList.toggle('on', pat.includes(dn)));
    c.classList.toggle('cur', !!current);
    $('.nm', c).textContent = letter ? letter + ' · ' + SOLFEGE[letter] : '';
  }
  function renderSheet(seq, cursor) {
    const start = Math.max(0, Math.min(cursor - 3, seq.length - CELLS));
    for (let i = 0; i < CELLS; i++) {
      const idx = start + i;
      renderCell(i, seq[idx], idx === cursor);
    }
    if (pageLbl) pageLbl.textContent = seq.length ? `Note ${Math.min(cursor + 1, seq.length)} / ${seq.length}` : 'Empty sheet';
  }

  /* ---- build keyboard ---- */
  const r1 = $('#tt-r1'), r2 = $('#tt-r2');
  const keyEls = [];
  function makeKey(letter, midi, rowEl) {
    const b = document.createElement('button');
    b.className = 'key'; b.dataset.letter = letter; b.dataset.midi = midi;
    b.setAttribute('aria-label', letter + ' key');
    const kd = document.createElement('span'); kd.className = 'kdots';
    const pat = BRAILLE[letter];
    DOT_ORDER.forEach((dn) => {
      const d = document.createElement('i');
      if (!pat.includes(dn)) d.classList.add('hide');
      kd.appendChild(d);
    });
    const nm = document.createElement('span'); nm.className = 'kname'; nm.textContent = letter;
    b.appendChild(nm); b.appendChild(kd);
    rowEl.appendChild(b); keyEls.push(b);
    const press = (e) => { e.preventDefault(); onKeyPress(b); };
    b.addEventListener('pointerdown', press);
    return b;
  }
  NOTE_LETTERS.forEach((L, i) => makeKey(L, 72 + SEMI[L], r1));            // top row C5–B5
  NOTE_LETTERS.forEach((L, i) => makeKey(L, 60 + SEMI[L], r2));            // bottom row C4–B4
  makeKey('C', 72, r2);                                                     // bottom row ends on C5

  /* ---- state ---- */
  let mode = 'recognize';            // recognize | practice | compose
  let transpose = 0, keyIdx = 0;
  let cursor = 0;                    // recognize cursor
  let practiceIdx = 0, streak = 0;
  let recording = false, recSeq = [], playTimer = null, playing = false;

  function setFeedback(html) { if (fb) fb.innerHTML = html; }
  function setNow(t) { if (nowLbl) nowLbl.textContent = t; }

  function seqFor() { return mode === 'compose' ? recSeq : MELODY; }

  function stopPlayback() {
    playing = false; clearInterval(playTimer); playTimer = null;
    playBtn.classList.remove('on');
  }

  function noteMidi(letter, base) { return (base || 60) + SEMI[letter] + transpose; }

  function flashKey(letter) {
    const el = keyEls.find((k) => k.dataset.letter === letter && +k.dataset.midi < 72);
    if (!el) return;
    el.classList.add('down'); setTimeout(() => el.classList.remove('down'), 180);
  }

  /* ---- key presses ---- */
  function onKeyPress(el) {
    const letter = el.dataset.letter;
    const midi = +el.dataset.midi + transpose;
    playMidi(midi, 0.5);
    el.classList.add('down'); setTimeout(() => el.classList.remove('down'), 150);

    if (mode === 'practice') {
      const target = MELODY[practiceIdx];
      if (letter === target) {
        streak++;
        practiceIdx++;
        if (practiceIdx >= MELODY.length) {
          setFeedback(`<em>Perfect!</em> You played the whole melody — ${streak} notes in a row. Starting over for another round.`);
          cueUp(); practiceIdx = 0; streak = 0;
        } else {
          setFeedback(`<em>Correct!</em> ${letter} · ${SOLFEGE[letter]}. Next note is raised on the sheet — find it by touch.`);
        }
        renderSheet(MELODY, practiceIdx); hintPractice();
      } else {
        streak = 0; buzz();
        setFeedback(`Not quite — that was <em>${letter}</em>. The sheet shows <em>${MELODY[practiceIdx]} · ${SOLFEGE[MELODY[practiceIdx]]}</em>. Try again.`);
      }
      return;
    }
    if (mode === 'compose' && recording) {
      recSeq.push(letter);
      renderSheet(recSeq, recSeq.length - 1);
      setFeedback(`Captured <em>${letter} · ${SOLFEGE[letter]}</em> — ${recSeq.length} note${recSeq.length > 1 ? 's' : ''} on your sheet.`);
      return;
    }
    setFeedback(`<em>${letter} · ${SOLFEGE[letter]}</em>${transpose ? ' (transposed)' : ''} — every key speaks its note.`);
  }

  function hintPractice() {
    keyEls.forEach((k) => k.classList.remove('hint'));
    if (mode !== 'practice') return;
    const target = MELODY[practiceIdx];
    const el = keyEls.find((k) => k.dataset.letter === target && +k.dataset.midi < 72);
    if (el) el.classList.add('hint');
  }

  /* ---- transport ---- */
  recBtn.addEventListener('click', () => {
    if (mode !== 'compose') { switchMode('compose'); }
    recording = !recording;
    recBtn.classList.toggle('on', recording);
    if (recording) { stopPlayback(); setNow('REC'); setFeedback('<em>Recording.</em> Play the keys — each note is written onto your braille sheet.'); }
    else { setNow('Composition'); setFeedback(`Recording stopped — <em>${recSeq.length}</em> notes captured. Press Play to hear your piece.`); }
  });

  playBtn.addEventListener('click', () => {
    if (playing) { stopPlayback(); setFeedback('Paused.'); return; }
    const seq = seqFor();
    if (!seq.length) { setFeedback('Your sheet is empty — press <em>Record</em> and play some keys first.'); buzz(); return; }
    if (recording) { recording = false; recBtn.classList.remove('on'); }
    playing = true; playBtn.classList.add('on');
    let i = 0;
    setFeedback(mode === 'compose' ? '<em>Playing your composition…</em>' : '<em>Playing the sheet…</em> the cursor follows each braille cell.');
    playTimer = setInterval(() => {
      if (i >= seq.length) { stopPlayback(); setFeedback('End of sheet. <em>Prev/Next</em> steps through it note by note.'); return; }
      const L = seq[i];
      playMidi(noteMidi(L), 0.42); flashKey(L);
      cursor = i; renderSheet(seq, i);
      i++;
    }, 460);
  });

  function step(dir) {
    stopPlayback();
    const seq = seqFor();
    if (!seq.length) { buzz(); setFeedback('Nothing on the sheet yet.'); return; }
    cursor = Math.max(0, Math.min(seq.length - 1, cursor + dir));
    const L = seq[cursor];
    playMidi(noteMidi(L), 0.5); flashKey(L);
    renderSheet(seq, cursor);
    setFeedback(`Note ${cursor + 1} of ${seq.length}: <em>${L} · ${SOLFEGE[L]}</em> — raised under your finger.`);
  }
  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));

  delBtn.addEventListener('click', () => {
    if (mode !== 'compose' || !recSeq.length) { buzz(); setFeedback(mode === 'compose' ? 'Nothing to delete.' : 'Delete works in <em>composition</em> mode — dock the white card.'); return; }
    const gone = recSeq.pop(); cueDown();
    cursor = Math.max(0, recSeq.length - 1);
    renderSheet(recSeq, cursor);
    setFeedback(`Deleted <em>${gone}</em> — ${recSeq.length} note${recSeq.length === 1 ? '' : 's'} left.`);
  });

  /* ---- knob ---- */
  let knobAngle = 0;
  knob.addEventListener('click', () => {
    keyIdx = (keyIdx + 1) % KEYS_CYCLE.length;
    const k = KEYS_CYCLE[keyIdx];
    transpose = k.off;
    knobAngle += 72;
    knob.style.transform = `rotate(${knobAngle}deg)`;
    knobKey.firstChild.textContent = 'Key of ' + k.n;
    playMidi(60 + k.off, 0.4); setTimeout(() => playMidi(64 + k.off, 0.4), 140); setTimeout(() => playMidi(67 + k.off, 0.5), 280);
    setFeedback(`Key Control turned — everything now sounds in <em>${k.n} major</em>.`);
  });

  /* ---- modes / cards ---- */
  const MODES = {
    recognize: { tag: 'Recognition card · docked', title: 'Sheet music explorer',
      desc: 'The orange card loads a braille score — <b>Twinkle Twinkle Little Star</b>. Step through it with Prev/Next, or press Play and follow the moving cursor. Every key still sounds, so you can explore freely.',
      now: 'Recognition' },
    practice: { tag: 'Practice card · docked', title: 'Follow the raised note',
      desc: 'The sheet raises <b>one note at a time</b>. Find and press the matching key — a correct press advances the score, a wrong one buzzes gently. (Turn on “show note names” below if you need help.)',
      now: 'Practice' },
    compose: { tag: 'Composition card · docked', title: 'My music studio',
      desc: 'A blank braille sheet. Press <b>Record</b> and play — your notes are written as braille in real time. Play it back, step through it, or Delete the last note.',
      now: 'Composition' }
  };
  const cards = $$('.nfc-card');
  function switchMode(m) {
    mode = m;
    stopPlayback(); recording = false; recBtn.classList.remove('on');
    cursor = 0; practiceIdx = 0; streak = 0;
    cards.forEach((c) => c.classList.toggle('docked', c.dataset.mode === m));
    const M = MODES[m];
    modeTag.textContent = M.tag; modeTitle.textContent = M.title; modeDesc.innerHTML = M.desc;
    setNow(M.now);
    if (m === 'compose') { renderSheet(recSeq, recSeq.length - 1); setFeedback('Blank sheet ready. Press <em>Record</em>, then play the keys.'); }
    else { renderSheet(MELODY, 0); setFeedback(m === 'practice' ? 'Find the raised note: <em>' + MELODY[0] + ' · ' + SOLFEGE[MELODY[0]] + '</em>.' : 'Card read. Press <em>Play</em> or step with <em>Prev/Next</em>.'); }
    hintPractice();
    cueUp();
  }
  cards.forEach((c) => c.addEventListener('click', () => switchMode(c.dataset.mode)));

  /* ---- show note names toggle ---- */
  const tog = $('#tt-names');
  if (tog) tog.addEventListener('click', () => {
    tog.classList.toggle('on');
    sim.classList.toggle('show-names', tog.classList.contains('on'));
  });

  /* ---- init (no audio until first gesture) ---- */
  cards.forEach((c) => { if (c.dataset.mode === 'recognize') c.classList.add('docked'); });
  renderSheet(MELODY, 0);
  renderCell(0, 'C', true);
})();
