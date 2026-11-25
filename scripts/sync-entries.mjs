// Copies each entry's SVG into /public and derives a static poster from it.
// The poster is the same file with animation switched off, so every animation
// must rest on a composed frame when it is not moving (see SPEC.md).
import { cpSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const src = join(root, "entries");
const out = join(root, "public", "entries");

for (const slug of readdirSync(src)) {
  const full = readFileSync(join(src, slug, "animation.svg"), "utf8");
  // The copies shown on the page drop any Content Credentials block to keep
  // tiles light. The download keeps the file exactly as it is in the repo.
  const svg = full.replace(/<metadata>[\s\S]*?<\/metadata>/, "");
  const poster = svg.replace(
    /<\/svg>\s*$/,
    "<style>*{animation:none!important}</style></svg>\n",
  );
  mkdirSync(join(out, slug), { recursive: true });
  writeFileSync(join(out, slug, "animation.svg"), svg);
  cpSync(join(src, slug, "animation.svg"), join(out, slug, `${slug}.svg`));
  writeFileSync(join(out, slug, "poster.svg"), poster);
}
