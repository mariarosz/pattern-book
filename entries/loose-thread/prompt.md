Write one self-contained animated SVG of a single loose thread that loops across the square, as if it had been dropped on a table.

Geometry
- viewBox 0 0 400 400, no width or height attributes, transparent background.
- One path, 1.8px peach stroke (#e39b82 as --peach on the root), round caps and joins, no fill.
- Build the curve as a prolate trochoid along a gently curved baseline that runs from just inside the left edge to just inside the right edge: six turns of the generating circle (which read as five closed loops), radius up to 64px.
- Multiply the radius by sin²(πu) so the thread starts and ends as a calm tail and the loops swell in the middle. The ends must have no hooks or kinks.
- Sample the curve and write it as smooth quadratic segments, one decimal place.

Motion
- CSS keyframes only. No JavaScript, no SMIL.
- Use pathLength="1". The thread draws from left to right, rests for about a second, then is drawn out again from the end where it began, so the loop starts and ends on an empty square.
- One 6 second loop. Ease in and out.
- Animate stroke-dashoffset only.

Constraints
- With animation switched off the file must show the whole thread. Add a prefers-reduced-motion rule that does exactly that.
- Include <title> and <desc>. No external references. Under 8 KB.
