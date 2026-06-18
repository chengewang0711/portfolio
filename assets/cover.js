/* ============================================================================
   FIREPULSE — Cover heat-haze shader (WebGL)
   Domain-warped fbm "flowing glass / heat wave" in the Firepulse palette.
   ========================================================================== */
(function () {
  'use strict';
  const canvas = document.getElementById('cover-gl');
  if (!canvas) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false });
  if (!gl) { document.documentElement.classList.add('no-gl'); return; }

  const vsrc = 'attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }';
  const fsrc = `
  precision highp float;
  uniform vec2  u_res;
  uniform float u_time;
  uniform vec2  u_mouse;   // 0..1
  uniform float u_warp;

  // --- hash & value noise ---
  float hash(vec2 p){ p = fract(p*vec2(123.34, 345.45)); p += dot(p, p+34.345); return fract(p.x*p.y); }
  float noise(vec2 p){
    vec2 i = floor(p); vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i+vec2(1.0,0.0));
    float c = hash(i+vec2(0.0,1.0));
    float d = hash(i+vec2(1.0,1.0));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for(int i=0;i<6;i++){ v += a*noise(p); p *= 2.02; a *= 0.5; }
    return v;
  }

  // Firepulse palette ramp
  vec3 palette(float t){
    t = clamp(t, 0.0, 1.0);
    vec3 c0 = vec3(0.035,0.027,0.024); // carbon black
    vec3 c1 = vec3(0.086,0.043,0.027); // smoke brown
    vec3 c2 = vec3(0.141,0.063,0.027); // burnt panel
    vec3 c3 = vec3(0.953,0.416,0.075); // fire orange
    vec3 c4 = vec3(1.0,0.541,0.094);   // heat amber
    vec3 c5 = vec3(1.0,0.765,0.353);   // warning gold
    vec3 col = mix(c0,c1, smoothstep(0.0,0.30,t));
    col = mix(col,c2, smoothstep(0.28,0.52,t));
    col = mix(col,c3, smoothstep(0.52,0.74,t));
    col = mix(col,c4, smoothstep(0.74,0.90,t));
    col = mix(col,c5, smoothstep(0.90,1.0,t));
    return col;
  }

  void main(){
    vec2 uv = gl_FragCoord.xy / u_res.xy;
    vec2 p = uv;
    p.x *= u_res.x / u_res.y;

    float t = u_time * 0.06;

    // heat rises: bias the flow upward + drift
    vec2 flow = vec2(0.0, -t*1.6);

    // domain warp (two levels) → flowing glass
    vec2 q = vec2( fbm(p*2.0 + flow + vec2(0.0, t)),
                   fbm(p*2.0 + flow + vec2(5.2, 1.3) - t*0.5) );
    vec2 r = vec2( fbm(p*2.0 + u_warp*q + vec2(1.7,9.2) + flow*1.3),
                   fbm(p*2.0 + u_warp*q + vec2(8.3,2.8) - flow*0.7) );

    // mouse adds a local heat bloom
    float md = distance(uv, u_mouse);
    float bloom = smoothstep(0.45, 0.0, md) * 0.35;

    float f = fbm(p*2.0 + u_warp*r + flow);
    f = f*0.85 + bloom;

    // vertical falloff: hotter toward bottom (ground fire) & top-right ember glow
    float grad = mix(0.20, 0.62, uv.y);
    float corner = smoothstep(0.4, 1.3, (uv.x*0.6 + uv.y));
    float heat = f*1.15 - grad*0.55 + corner*0.18;

    vec3 col = palette(heat);

    // subtle shimmer lines (heat wave ripple)
    float ripple = sin((uv.y*60.0) + u_time*1.2 + r.x*8.0) * 0.012;
    col += ripple * vec3(1.0,0.55,0.2);

    // grain
    float g = (hash(uv*u_res.xy + u_time) - 0.5) * 0.045;
    col += g;

    // vignette
    float vig = smoothstep(1.25, 0.25, distance(uv, vec2(0.5)));
    col *= mix(0.55, 1.05, vig);

    gl_FragColor = vec4(max(col, 0.0), 1.0);
  }`;

  function compile(type, src) {
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); }
    return s;
  }
  const prog = gl.createProgram();
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, vsrc));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, fsrc));
  gl.linkProgram(prog); gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const uRes = gl.getUniformLocation(prog, 'u_res');
  const uTime = gl.getUniformLocation(prog, 'u_time');
  const uMouse = gl.getUniformLocation(prog, 'u_mouse');
  const uWarp = gl.getUniformLocation(prog, 'u_warp');

  let W = 0, H = 0, dpr = Math.min(devicePixelRatio || 1, 1.5);
  function resize() {
    const r = canvas.getBoundingClientRect();
    W = Math.max(2, Math.round(r.width * dpr)); H = Math.max(2, Math.round(r.height * dpr));
    canvas.width = W; canvas.height = H; gl.viewport(0, 0, W, H);
  }
  resize(); addEventListener('resize', resize);

  let mx = 0.7, my = 0.7, tmx = 0.7, tmy = 0.7;
  addEventListener('mousemove', (e) => {
    const r = canvas.getBoundingClientRect();
    // When the cover is on a hidden page (display:none) its rect collapses to
    // 0×0 — dividing by that would push u_mouse to Infinity/NaN and freeze the
    // heat-bloom for the whole session. Ignore moves while it isn't laid out.
    if (r.width < 2 || r.height < 2) return;
    tmx = (e.clientX - r.left) / r.width; tmy = 1.0 - (e.clientY - r.top) / r.height;
  }, { passive: true });

  const warp = 4.0;
  let running = true, t0 = performance.now();
  // pause when cover scrolled away (the section id is 'fire-cover')
  const sect = document.getElementById('fire-cover');
  if (sect && 'IntersectionObserver' in window) {
    new IntersectionObserver((es) => es.forEach((x) => { running = x.isIntersecting; if (running) loop(); }), { threshold: 0.01 }).observe(sect);
  }

  function frame(now) {
    // self-heal if a stray value ever made the target non-finite
    if (!isFinite(tmx) || !isFinite(tmy)) { tmx = 0.7; tmy = 0.7; }
    if (!isFinite(mx) || !isFinite(my)) { mx = tmx; my = tmy; }
    mx += (tmx - mx) * 0.05; my += (tmy - my) * 0.05;
    const time = reduce ? 8.0 : (now - t0) / 1000;
    gl.uniform2f(uRes, W, H);
    gl.uniform1f(uTime, time);
    gl.uniform2f(uMouse, mx, my);
    gl.uniform1f(uWarp, warp);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  function loop() {
    if (!running) return;
    frame(performance.now());
    if (!reduce) requestAnimationFrame(loop);
  }
  loop();
  if (reduce) frame(performance.now());
})();
