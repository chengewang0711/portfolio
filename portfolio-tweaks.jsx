/* Portfolio — unified Tweaks (motion, scale, both accents, cursor). */
const PF_DEFAULTS = /*EDITMODE-BEGIN*/{
  "motion": true,
  "maxw": 1900,
  "fireAccent": "#F36A13",
  "oxyAccent": "#2BB7BC",
  "cursor": true
}/*EDITMODE-END*/;

function PortfolioTweaks() {
  const [t, setTweak] = useTweaks(PF_DEFAULTS);
  React.useEffect(() => {
    const root = document.documentElement;
    const fire = document.getElementById("fire");
    const oxy = document.getElementById("oxy");
    // motion on body + both project wrappers
    [document.body, fire, oxy].forEach((el) => el && el.classList.toggle("motion", !!t.motion));
    if (window.__setMotion) window.__setMotion(t.motion);
    // content width (single measure shared by every column)
    root.style.setProperty("--pf-maxw", t.maxw + "px");
    root.style.setProperty("--pf-col", "min(" + t.maxw + "px, 94vw)");
    // accents
    if (fire) fire.style.setProperty("--fire-orange", t.fireAccent);
    if (oxy) oxy.style.setProperty("--oxy-cyan", t.oxyAccent);
    root.style.setProperty("--pf-fire", t.fireAccent);
    root.style.setProperty("--pf-oxy", t.oxyAccent);
    // cursor
    if (window.__setCursor) window.__setCursor(t.cursor);
  }, [t.motion, t.maxw, t.fireAccent, t.oxyAccent, t.cursor]);

  return (
    <TweaksPanel>
      <TweakSection label="Layout" />
      <TweakSlider label="Content width" min={1200} max={2200} step={40}
        value={t.maxw} onChange={(v) => setTweak("maxw", v)} />
      <TweakSection label="Interaction" />
      <TweakToggle label="Motion" value={t.motion} onChange={(v) => setTweak("motion", v)} />
      <TweakToggle label="Custom cursor" value={t.cursor} onChange={(v) => setTweak("cursor", v)} />
      <TweakSection label="Firepulse accent" />
      <TweakColor label="Signal" value={t.fireAccent}
        options={["#F36A13", "#FF8A18", "#E04422"]}
        onChange={(v) => setTweak("fireAccent", v)} />
      <TweakSection label="Oxy Loop accent" />
      <TweakColor label="Cyan" value={t.oxyAccent}
        options={["#2BB7BC", "#35CBD0", "#53D9D6"]}
        onChange={(v) => setTweak("oxyAccent", v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<PortfolioTweaks />);
