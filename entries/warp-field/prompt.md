Write one self-contained animated SVG background: a field of fine threads hanging side by side and swaying, like a warp before any weft has gone in.

Geometry
- viewBox 0 0 400 400, no width or height attributes, transparent background.
- 24 vertical threads spread across the full width and a little past both side edges, each jittered a few pixels sideways. Neighbours may touch or cross.
- Each thread is a smooth curve, not a straight line: a sine wave of its own amplitude (6 to 16px) and phase, written as quadratic segments. Extend every thread about 20px past the top and bottom edges so the field has no visible ends.
- Round caps, no fill.

Colour (custom properties on the root)
- Most threads linen #a8967b at 1.5px.
- Scatter a few heavier 2.2px threads: four peach #e39b82, two rose #e2b4bb, two soft blue #8fa5cf and one beeswax yellow #d9a938.

Motion
- CSS keyframes only. No JavaScript, no SMIL.
- Every thread sways 7px to each side with a very slight lean, pivoting from its top end (set the transform origin there explicitly) so the lower end travels further, as if the threads were hung from above. Ease in and out.
- Give each thread a different negative animation-delay so they are all mid-sway from the first frame and never move in step.
- One 6 second loop with no visible seam. Animate transform only.

Constraints
- With animation switched off the file must show the still field. Add a prefers-reduced-motion rule that does exactly that.
- Include <title> and <desc>. No external references. Under 8 KB.
