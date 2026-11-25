// Copies each entry's SVG into /public and derives a static poster from it.
// The poster is the same file with animation switched off, so every animation
// must rest on a composed frame when it is not moving (see SPEC.md).
import { cpSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const src = join(root, "entries");
const out = join(root, "public", "entries");

for (const slug of readdirSync(src)) {
  const svg = readFileSync(join(src, slug, "animation.svg"), "utf8");
  const poster = svg.replace(
    /<\/svg>\s*$/,
    "<style>*{animation:none!important}</style></svg>\n",
  );
  mkdirSync(join(out, slug), { recursive: true });
  cpSync(join(src, slug, "animation.svg"), join(out, slug, "animation.svg"));
  writeFileSync(join(out, slug, "poster.svg"), poster);
}
