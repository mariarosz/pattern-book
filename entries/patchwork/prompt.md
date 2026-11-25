Write one self-contained animated SVG of a small textile collage: scraps of cloth that drift together and are joined by a line of running stitches. Work with flat shape and pattern, not outline.

Geometry
- viewBox 0 0 400 400, no width or height attributes, transparent background.
- Five scraps, each an irregular four- or five-sided polygon with straight cut edges, none of them parallel to the frame. They overlap in the middle of the square.
- Fills: one plain peach at 80% opacity, one fine blue pinstripe, one rose cloth with small peach dots, one linen check, one small plain beeswax yellow. Make the three patterned fills with <pattern>, each rotated a few degrees so nothing sits on the grid. Build every pattern ground from a palette colour at low opacity; use no colour outside the palette.
- Use mix-blend-mode: multiply so overlapping scraps darken like layered fabric.
- One curved line of running stitches in linen, 2.4px, multiplied over the cloth so it stays visible on every scrap.

Colour (custom properties on the root)
- linen #a8967b, peach #e39b82, rose #e2b4bb, blue #8fa5cf, wax #d9a938.

Motion
- CSS keyframes only. No JavaScript, no SMIL.
- The scraps rest as faint, scattered ghosts (22% opacity). One after another they slide and rotate a short way into place and become solid.
- Only when the last scrap has landed, the stitches are sewn along the line. A dashed stroke cannot be drawn with stroke-dashoffset, so reveal it through a mask whose own stroke is animated with pathLength="1".
- Hold briefly, then the stitches are pulled out and the scraps drift back apart to where they started. The square is never empty.
- One 6 second loop with no visible seam. Animate transform, opacity and stroke-dashoffset only.

Constraints
- With animation switched off the file must show the finished, stitched collage. Add a prefers-reduced-motion rule that does exactly that.
- Include <title> and <desc>. No external references. Under 8 KB.
