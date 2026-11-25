Write one self-contained animated SVG of dye spreading into cloth: soft blots of colour that grow, overlap and reveal the weave underneath. Work with flat shape and texture, not outline.

Geometry
- viewBox 0 0 400 400, no width or height attributes, transparent background.
- Three blots of different sizes that overlap near the centre. Build each one as a circle whose radius is disturbed by three sine waves (2, 3 and 5 lobes, each with its own phase), sampled at 14 points and written as smooth quadratic segments. No filters.
- Fills: soft blue #8fa5cf at 55% opacity, rose #e2b4bb at 80%, beeswax #d9a938 at 55%. Use mix-blend-mode: multiply so overlaps mix into darker tones.
- Cloth texture: a fine linen (#a8967b) check made with <pattern>, rotated 3 degrees, drawn over the whole square but masked so it shows only inside the blots. Reuse the same three shapes for the mask.

Motion
- CSS keyframes only. No JavaScript, no SMIL.
- Each blot grows from nothing to full size from its own centre, half a second apart, fast at first and then slowing like liquid soaking in. The masked texture grows with it.
- Hold, then each blot fades.
- One 6 second loop with no visible seam. Animate transform and opacity only.

Constraints
- Colours as custom properties on the root.
- With animation switched off the file must show all three blots at full size. Add a prefers-reduced-motion rule that does exactly that.
- Include <title> and <desc>. No external references. Under 8 KB.
