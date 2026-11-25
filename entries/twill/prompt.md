Write one self-contained animated SVG of a 2/2 twill cloth, drawn as a pattern of short rounded floats rather than as lines.

Draft
- 10 × 10 crossings. At column i, row j the weft is on top where (i − j) mod 4 is 0 or 1; otherwise the warp is on top. This gives ribs that slant down to the right.

Geometry
- viewBox 0 0 400 400, no width or height attributes, transparent background.
- Each crossing is a 32px cell, the cloth centred in the square.
- Weft on top: a horizontal bar 28 × 12 with fully rounded ends, centred in the cell. Warp on top: the same bar turned upright.
- No strokes. Define each bar once in <defs> and place it with <use>.

Colour (custom properties on the root)
- Warp bars: linen #a8967b at 55% opacity.
- Weft bars: peach #e39b82, except every fifth row starting with the third in soft blue #8fa5cf and every fifth row starting with the fifth in rose #e2b4bb.

Motion
- CSS keyframes only. No JavaScript, no SMIL.
- The cloth appears along the diagonal: group the bars by i + j and give each group a slightly later start (about 0.09s apart), so a front sweeps from the top left corner to the bottom right. Each group fades in while sliding 7px on each axis into place.
- Hold as finished cloth, then clear with the same sweep, sliding 7px onward.
- One 6 second loop with no visible seam. Animate transform and opacity only.

Constraints
- With animation switched off the file must show the finished cloth. Add a prefers-reduced-motion rule that does exactly that.
- Include <title> and <desc>. No external references. Under 8 KB.
