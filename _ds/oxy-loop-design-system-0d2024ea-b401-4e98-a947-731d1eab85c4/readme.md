# Oxy Loop — Design System

> Oxy Loop is a clean, calm, circular oxygen service system — visually light, operationally clear, and environmentally responsible.

Oxy Loop is a **plateau-circulating shared oxygen service** for high-altitude travel. Instead of single-use oxygen cans (which create resource waste and litter at altitude), Oxy Loop runs public **stations** where travelers **Rent · Refill · Recycle · Redeem** reusable oxygen cylinders and canisters. The brand should feel like a **public-health utility**, not an outdoor gadget: medical cleanliness + low-pressure friendliness + circular sustainability.

**Surfaces in this system**
- **Mobile mini-program** — find a nearby station on a map, view product detail, rent/purchase, follow the recycle/refill flow, redeem a souvenir.
- **Kiosk station UI** — the physical station's touch panel (Rent / Refill / Recycle bays) with large tap targets for quick public use.
- **Presentation boards** — pitch/handoff boards that share the interface's visual DNA.

## Source material
- `uploads/OxyLoop_Style_Guide.pdf` — the 12-page *Visual Style Guide / Designer Handoff* this system is derived from. All colors, type rules, components, layout and flow specs come from it.
- `uploads/imgs/` — product renders, UI mockups and flow states extracted from the PDF (reference only). Clean copies used by the system live in `assets/imagery/`.

No codebase or Figma file was provided — this system is reconstructed from the style guide + its embedded renders.

---

## Content fundamentals

**Voice:** calm, helpful, ecological, precise. Oxy Loop talks like a trustworthy public utility guiding one person through one task.

- **Tone** — reassuring and direct. Never salesy, never panicky/emergency, never densely technical. *"Oxy Loop is a clean, calm, circular oxygen service."*
- **Casing** — **sentence case** for everything: instructions, titles, card labels. e.g. *"Put in your mask"*, *"Plateau oxygen station"*, *"Click Next to receive your souvenir"*. The only uppercase is short station-bay labels on hardware (**RENT / REFILL / RECYCLE**) and small eyebrow labels.
- **Person** — imperative second person, addressed to the traveler: *"Put in your bottle"*, *"Follow station guide"*. Avoid "I"/"we" marketing voice.
- **CTAs** — verb-first and short, ideally one word: **Rent · Refill · Recycle · Redeem · Purchase · Go Now · Next · Take · Scan**.
- **Keyword set** — rent, refill, recycle, redeem, reusable, oxygen level, station, walking time, jar retention, souvenir.
- **Length** — one task per screen, one primary CTA per step. 1–2 line instructions on kiosks; avoid dense explanatory paragraphs. Bold **only** the key problem word in a sentence (e.g. *"…caused by **single-use oxygen cans**…"*).
- **Emoji** — none. Status is communicated with line icons + check marks + text, never emoji and never color alone.
- **Numbers** — paired with a clear unit/label and an icon: *"5mins · Walking time"*, *"25 · Jar retention"*, *"$0.52 /Once"*.

**Avoid:** aggressive sales language, emergency/panic tone, heavy technical wording, multi-paragraph copy on action screens.

---

## Visual foundations

**Overall vibe** — hygienic, airy, low-noise. White space, pale mint fields, generous rounding, a single cyan signature accent and one deep-green contrast color. Feels like fresh air at altitude.

**Color** (see `tokens/colors.css`)
- **Oxy Cyan `#35CBD0`** is the system signature: active/selected state, success, QR borders, the O₂ mark. **Aqua Light `#53D9D6`** is the brighter "liquid/glow" fill used on brand buttons and product liquid.
- **Deep Oxygen `#001F1D`** is the high-contrast color — primary text, primary CTA buttons, and bottom-sheet / action zones. **Pine Text `#173230`** is for headlines & info cards.
- Neutrals are cool: **Mist `#EAF7F7`** backgrounds, **Ice White `#F5FCFC`** cards, **Border Mint `#C5DEDE`** frames/dividers, **Muted Gray `#6F807F`** secondary copy.
- Semantics: success **`#61D392`** (sufficient oxygen), warning **`#F0CE4E`** (low oxygen), error **`#EF6D6D`** (missing item). **Never rely on color alone** — pair with a check/icon/label.
- **Recommended ratio:** ~55% mist · 25% white · 12% deep oxygen · 8% cyan. Cyan is an accent, not a flood.

**Type** (see `tokens/typography.css`) — rounded geometric sans, but **composed and steady** (not bubbly). Large confident headings, generous line-height, simple sentence structure. **M PLUS Rounded 1c** for display headlines (grounded rounded geometric, close to the guide's SF Pro Rounded intent), **Nunito** for body & UI. Scale: hero 44–56 / page 32–40 / section 20–24 / body 16–20 / caption 11–13. Use strong bold only for primary messages; avoid competing headline sizes.

**Backgrounds** — pale, cool, photographic-clean: snow, mist, very pale cyan gradients. No dark photo backdrops, no warm saturated fields. Dark is reserved for CTA zones / bottom sheets (Deep Oxygen).

**Corner radii** — highly rounded everywhere. Buttons 24–30px, cards 18–24px, bottom sheets ~36px, pills/avatars full. Nothing sharp; geometry feels soft/inflated.

**Cards** — Ice-White fill on a Mist page, thin 1.5px Border-Mint outline, soft low-cast shadow (`--shadow-sm`/`--shadow-md`). No heavy industrial drop shadows. Selection tiles get a 4px cyan outline + a circular check badge when active.

**Shadows** — soft, cool, low spread (`rgba(0,31,29,…)` at 5–12% alpha). Aqua buttons may carry a subtle cyan **glow** (`--glow-brand`). Bottom sheets cast upward (`--shadow-sheet`). Never harsh black shadows.

**Borders & dividers** — 1.5px Border Mint. Active = 4px Oxy Cyan. Disabled = Border Mint outline + muted fill.

**Layout** — large safe margins, rounded containers, and a clear split: top **60–70%** is instruction / map / product render; bottom **25–35%** is a fixed action zone (often a dark Deep-Oxygen sheet) keeping the primary CTA visible without scrolling.

**Transparency & blur** — product renders read as semi-transparent plastic / oxygen clarity; status bars and floating back-buttons may sit on a frosted white. Used sparingly, always clean.

**Motion** — calm and soft. Gentle fades and slides on a soft ease (`--ease-soft`), 140–360ms. State changes (default → detected → completed) animate the cyan outline and check badge in. No bounces, no infinite decorative loops, respect reduced-motion.

**Hover / press** — hover: slight lift + brightness (aqua buttons brighten toward Aqua Light, dark buttons lighten ~8%). Press: subtle shrink (`scale .97`) and shadow reduction. Disabled: Muted-Gray fill / Border-Mint outline, no shadow.

**Imagery** — lightweight, transparent, hygienic, environmental. Single hero object + station, soft studio lighting, minimal cast shadow, translucent highlights, cool white/snow/pale-cyan backgrounds. Front-facing and UI-readable.

---

## Iconography

Icons are **line-based, rounded, functional** — quick cues, never decorative. Core set from the guide: **walking, bottle/can, recycle, leaf, gift, station, mask, location** (plus status check / warning / error).

- **Stroke** 2–3px, **round caps and joins**, geometric/even. Do **not** mix icon packs with inconsistent stroke weights.
- **Color** — Deep Oxygen on light backgrounds, White on dark CTAs, Cyan only for selected/success states.
- **Labels** under 2 words, sentence case.
- **Substitution flag:** the guide ships its own custom line icons (not provided as files). This system uses **[Lucide](https://lucide.dev)** (2px round-cap line icons) via CDN as the closest open match — `footprints, milk (bottle), recycle, leaf, gift, store/building (station), shield/wind (mask), map-pin, check, alert-triangle, alert-circle`. Loaded in components/kits from `https://unpkg.com/lucide@latest`. If you have the original icon SVGs, drop them in `assets/icons/` and swap the references.
- **Emoji / unicode** — never used as icons.
- **Illustration** — thin gray technical linework + one cyan highlight, object centered in a rounded mint frame.

The **O₂ logo mark** is a rounded-square "O" with a small subscript ₂ — soft, inflated, modular. See `assets/logo/`. Keep ≥ ¼ mark-width clear space on all sides; don't stretch, add hard drop shadows, recolor to red/orange, or place cyan-on-busy-cyan photography.

---

## Index / manifest

**Root**
- `styles.css` — global entry (import this). `@import`s the token files below.
- `readme.md` — this guide. · `SKILL.md` — Agent-Skill wrapper.

**Tokens** (`tokens/`)
- `fonts.css` — `@font-face` (M PLUS Rounded 1c, Nunito). · `colors.css` · `typography.css` · `spacing.css` (spacing/radius/shadow/motion) · `base.css` (element defaults + helpers).

**Assets** (`assets/`)
- `fonts/` — M PLUS Rounded 1c & Nunito woff2. · `logo/` — O₂ marks & wordmark (SVG). · `imagery/` — product/station renders. · (icons via Lucide CDN.)

**Foundation cards** (`guidelines/`) — Design System tab specimens: color, type, spacing, radius, shadow, logo.

**Components** (`components/`)
- `core/` — Button, IconButton, Badge, Tag, StatusPill
- `surfaces/` — Card, SelectTile, StatTile, BottomSheet
- `forms/` — Input, Stepper
- `navigation/` — TopBar, StepDots

**UI kits** (`ui_kits/`)
- `mobile/` — Oxy Loop mini-program (map / station finder → product detail → recycle flow → success/redeem).
- `kiosk/` — station touch panel (Rent / Refill / Recycle).

**Slides** (`slides/`) — presentation-board specimens using the brand DNA.
