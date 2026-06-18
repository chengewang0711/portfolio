/* Oxy Loop — Tweaks island. */
const OXY_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#35CBD0",
  "motion": true
}/*EDITMODE-END*/;

function OxyTweaks() {
  const [t, setTweak] = useTweaks(OXY_TWEAK_DEFAULTS);
  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty("--oxy-cyan", t.accent);
    if (window.__setMotion) window.__setMotion(t.motion);
  }, [t.accent, t.motion]);

  return (
    <TweaksPanel>
      <TweakSection label="Motion" />
      <TweakToggle label="Animation" value={t.motion}
        onChange={(v) => setTweak("motion", v)} />
      <TweakSection label="Brand accent" />
      <TweakColor label="Signature cyan" value={t.accent}
        options={["#35CBD0", "#53D9D6", "#2BB7BC"]}
        onChange={(v) => setTweak("accent", v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<OxyTweaks />);
