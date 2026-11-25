// Checks every entry against SPEC.md. Exits 1 on the first failing entry list.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { metaSchema } from "../src/lib/schema.mjs";

const MAX_BYTES = 8 * 1024;
const dir = join(process.cwd(), "entries");
let failed = 0;

for (const slug of readdirSync(dir)) {
  const errors = [];
  const file = (name) => join(dir, slug, name);
  for (const name of ["animation.svg", "prompt.md", "meta.json"]) {
    if (!existsSync(file(name))) errors.push(`missing ${name}`);
  }
  if (errors.length === 0) {
    const meta = metaSchema.safeParse(JSON.parse(readFileSync(file("meta.json"), "utf8")));
    if (!meta.success) {
      for (const issue of meta.error.issues) errors.push(`meta.${issue.path.join(".")}: ${issue.message}`);
    }
    // Files may carry a Content Credentials (C2PA) manifest in <metadata>.
    // It is provenance, not drawing, so the rules apply to the rest.
    const svg = readFileSync(file("animation.svg"), "utf8").replace(/<metadata>[\s\S]*?<\/metadata>/, "");
    const rootTag = svg.match(/<svg[^>]*>/)?.[0] ?? "";
    const box = rootTag.match(/viewBox="0 0 (\d+) (\d+)"/);
    if (!box || box[1] !== box[2]) errors.push("root needs a square viewBox starting at 0 0");
    if (/\s(width|height)=/.test(rootTag)) errors.push("root must not set width or height");
    if (Buffer.byteLength(svg) > MAX_BYTES) errors.push("larger than 8 KB");
    if (/<script|<foreignObject|\son\w+=/i.test(svg)) errors.push("scripts, foreignObject and event handlers are not allowed");
    if (/(href|src)="(?!#)/i.test(svg) || /url\((?!['"]?#)/i.test(svg) || /@import/i.test(svg)) errors.push("external references are not allowed");
    if (!/<title[ >]/.test(svg) || !/<desc[ >]/.test(svg)) errors.push("needs <title> and <desc>");
    if (!/prefers-reduced-motion/.test(svg)) errors.push("needs a prefers-reduced-motion rule");
    const palette = ["#a8967b", "#e39b82", "#e2b4bb", "#8fa5cf", "#d9a938", "#111", "#fff"];
    for (const hex of new Set(svg.match(/#[0-9a-f]{3,8}\b/gi) ?? [])) {
      if (!palette.includes(hex.toLowerCase())) errors.push(`colour ${hex} is not in the palette`);
    }
    if (/feTurbulence|feDisplacementMap/.test(svg) && /<animate/.test(svg)) errors.push("animated turbulence or displacement filters are not allowed");
  }
  if (errors.length) {
    failed++;
    console.error(`✗ ${slug}\n${errors.map((e) => `  - ${e}`).join("\n")}`);
  } else {
    console.log(`✓ ${slug}`);
  }
}
process.exit(failed ? 1 : 0);
