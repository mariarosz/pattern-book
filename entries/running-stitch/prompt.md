Write one self-contained animated SVG loading indicator made of running stitches.

Geometry
- viewBox 0 0 400 400, no width or height attributes, transparent background.
- Two concentric rings of short dashes with round caps, centred in the square: an outer ring in peach (#e39b82, 2.5px, radius 118) and an inner ring in linen (#a8967b, about 1.8px, radius 84) with shorter dashes. No fill. Choose each dash period so that it divides the circumference exactly; a ring must not end on a broken or doubled stitch.

Motion
- CSS keyframes only. No JavaScript, no SMIL.
- The stitches are sewn around each ring starting at the top, the outer ring clockwise and the inner ring anticlockwise, held for a moment as complete rings, then unpicked from where they started.
- A dashed stroke cannot be drawn with stroke-dashoffset, so reveal each ring through its own mask: a solid circle with pathLength="1" whose dash offset runs from 1 to 0 to -1.
- While this happens both rings make one full revolution together, so the last stitch leaves where the first one arrives.
- One 3 second loop that starts and ends empty. Ease in and out.

Constraints
- Colours as custom properties on the root.
- With animation switched off the file must show both complete rings. Add a prefers-reduced-motion rule that does exactly that.
- Include <title> and <desc>. No external references. Under 8 KB.
