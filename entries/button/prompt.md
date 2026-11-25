Write one self-contained animated SVG icon: a four-hole button being sewn on. It should work as a small "attached" or "done" micro-interaction.

Geometry
- viewBox 0 0 400 400, no width or height attributes, transparent background.
- A round button centred in the square, outline only: an outer circle (radius 112, 2px) and an inner rim (radius 88, 1.5px at 60% opacity so it sits back), both linen #a8967b.
- Four holes, small outlined circles (radius 9, 2px linen) at the corners of a 60px square around the centre.
- Thread: two straight peach #e39b82 stitches, 2px with round caps, the same weight as the outline, crossing diagonally from hole to hole. Nothing is filled.

Motion
- CSS keyframes only. No JavaScript, no SMIL.
- The first stitch is drawn from the top left hole to the bottom right, then the second from the top right to the bottom left. Use pathLength="1".
- As each stitch is pulled tight the whole button dips to 95% of its size and recovers.
- Hold with both stitches in place, then the thread is drawn out in the same order, the second stitch only after the first has gone.
- One 4 second loop that starts and ends with a bare button. Ease in and out.
- Animate transform and stroke-dashoffset only.

Constraints
- Colours as custom properties on the root.
- With animation switched off the file must show the button with both stitches. Add a prefers-reduced-motion rule that does exactly that.
- Include <title> and <desc>. No external references. Under 8 KB.
