---
name: svg-motion
description: Create or revise a Pattern Book entry, an animated SVG with the prompt that produced it. Use when asked to add an entry, make an animation for the library, or fix one that failed review.
---

# Making an entry

An entry is a folder in `entries/<slug>/` with `animation.svg`, `prompt.md` and `meta.json`. Read `SPEC.md` first; it is the contract.

## Order of work

1. **Write the prompt first**, in `prompt.md`, using the sections Geometry, Colour, Motion, Constraints. Name the mathematics where there is any (a draft matrix for a weave, a trochoid for a looping line, sine-disturbed circles for a blot). Named structure produces better drawings than adjectives.
2. **Write the SVG from that prompt** and nothing else. If you find yourself adding something the prompt does not ask for, add it to the prompt.
3. **Check**: `npm run check`.
4. **Look**: `node scripts/frames.cjs <slug> /tmp/frames-<slug>.png` and read the image. Twelve frames, in order. Confirm the first and last frames join, the middle frames differ, and the picture reads at this small size.
5. **Review**: run the `motion-craft` and `prompt-provenance` agents on the entry.
6. **Record honestly** in `meta.json`: `single-shot` only if the first SVG was kept unchanged; otherwise `multi-turn` with the number of turns, or `hand-finished` if a person edited the file. `note` says what the prompt taught, including what went wrong. Set `reproduced` to `true` only after running the final `prompt.md` in a fresh context and getting an entry that passes.

## Things that reliably go wrong

- A dashed line cannot be drawn on with `stroke-dashoffset`. Reveal it through a mask whose solid stroke is animated with `pathLength="1"`.
- Elements with an `animation-delay` show their resting state before they start. Add `backwards` fill so they hold the first keyframe.
- `transform-origin` on SVG elements needs `transform-box: fill-box`, or explicit coordinates.
- Thread the same colour as the cloth disappears. Check contrast in the frame strip, not in your head.
- The resting state is the poster and the reduced-motion view. Keyframes should animate away from it and back, so that removing the animation leaves a finished picture.
