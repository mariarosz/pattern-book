Write one self-contained animated SVG of a loose, hand-woven gauze being woven. It should feel light and a little irregular, like fine thread, not like a diagram.

Draft (1 = warp thread on top, 0 = weft thread on top), repeated over a 12 × 12 cloth:

```
0 1
1 0
```

Geometry
- viewBox 0 0 400 400, no width or height attributes, transparent background.
- 12 warp threads and 12 weft threads, all 1.7px strokes with round caps. Nothing is filled.
- Hand-woven irregularity: jitter each thread's position by up to 3px, tilt it by up to 4px end to end, and let every thread overhang the cloth by a different length (22 to 40px) so the edges read as a loose fringe. The irregularity should look hand-made, not like noise.
- Draw the over/under honestly without a background colour: where the draft says the warp is on top, leave a gap of about 7px in the weft; where the weft is on top, let it cross the warp unbroken.

Colour (custom properties on the root)
- Warp: undyed linen #a8967b.
- Weft: mostly peach #e39b82, with two rose #e2b4bb (slightly heavier, 2.2px, so the pale colour holds), two soft blue #8fa5cf and one beeswax yellow #d9a938.

Motion
- CSS keyframes only. No JavaScript, no SMIL.
- The weft threads slip in one after another, top to bottom, each starting before the last has arrived, alternating from the left and from the right. They rest as cloth, then slip out in the same order.
- While this happens the whole cloth breathes: a rotation of one and a half degrees each way.
- One 6 second loop with no visible seam. Ease in and out.
- Animate transform and opacity only.

Constraints
- With animation switched off the file must show the finished cloth. Add a prefers-reduced-motion rule that does exactly that.
- Include <title> and <desc>. No external references. Under 8 KB.
