# Entry spec

Every animation in `entries/` has to pass `npm run check`. The rules:

**File**
- One self-contained SVG, under 8 KB.
- Square `viewBox` starting at `0 0`. No `width` or `height` on the root.
- `<title>` and `<desc>`.
- No scripts, no `foreignObject`, no event handlers, no external references.

**Look**
- Light. Either thread: fine strokes (1.5 to 2.5px on a 400 box) with round caps. Or cloth: flat shapes with a pattern or partial opacity, and no outline around them.
- Transparent background.
- Colours come from the Pattern Book palette, set as custom properties on the root. No other colour appears in the file (white is allowed inside masks): linen `#a8967b`, peach `#e39b82`, rose `#e2b4bb`, soft blue `#8fa5cf`, beeswax `#d9a938`, ink `#111`.
- No gradients, no drop shadows.

**Motion**
- CSS keyframes. SMIL only where CSS cannot do the job (path morphs).
- One seamless loop of 2 to 6 seconds.
- Animate `transform`, `opacity` and `stroke-dashoffset`. Nothing moves linearly except rotation.
- No animated turbulence or displacement filters.

**Rest state**
- With animation switched off, the file shows a finished, composed frame. The site uses that frame as the poster, and a `prefers-reduced-motion` rule inside the SVG shows the same frame to people who ask for less motion.

**Provenance**
Each `meta.json` says how the file was made:
- `single-shot`: the first answer to the prompt, unedited.
- `multi-turn`: the result was looked at and the prompt revised. `prompt.md` is the final, consolidated version, and `note` says what changed along the way.
- `hand-finished`: edited by hand after the model's last answer.

`iterations` counts versions, so the first attempt is 1.

`reproduced` says whether `prompt.md` has been run cold, in a fresh context, and produced an entry that passes the check. For a `multi-turn` entry the consolidated prompt has not produced the file by itself until this is `true`.
