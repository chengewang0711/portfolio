/* Firepulse — Tweaks island. Drives variations by setting data-attrs / CSS vars on <html>. */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "hero": "Split",
  "accent": "#F36A13",
  "cursor": true,
  "motion": true
}/*EDITMODE-END*/;

const HERO_MAP = { "Split": "split", "Centered": "centered", "Full-bleed": "full" };

function FirepulseTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(() => {
    const r = document.documentElement;
    r.dataset.hero = HERO_MAP[t.hero] || "split";
    r.style.setProperty("--fire-orange", t.accent);
    if (window.__setMotion) window.__setMotion(t.motion);
    if (window.__setCursor) window.__setCursor(t.cursor);
  }, [t.hero, t.accent, t.motion, t.cursor]);

  return (
    <TweaksPanel>
      <TweakSection label="Hero" />
      <TweakRadio label="Layout" value={t.hero}
        options={["Split", "Centered", "Full-bleed"]}
        onChange={(v) => setTweak("hero", v)} />
      <TweakSection label="Interaction" />
      <TweakToggle label="Custom cursor" value={t.cursor}
        onChange={(v) => setTweak("cursor", v)} />
      <TweakToggle label="Motion" value={t.motion}
        onChange={(v) => setTweak("motion", v)} />
      <TweakSection label="Look" />
      <TweakColor label="Accent" value={t.accent}
        options={["#F36A13", "#FF8A18", "#E04422"]}
        onChange={(v) => setTweak("accent", v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<FirepulseTweaks />);
