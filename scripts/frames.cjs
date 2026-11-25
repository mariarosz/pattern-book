// Renders a 12-frame contact sheet of one entry for review:
//   node scripts/frames.cjs <slug> [out.png]
// Each frame is the SVG alone in a page, with every animation paused and
// seeked, so masks and ids behave exactly as they do in the real file.
// Needs Playwright: npm i -D playwright && npx playwright install chromium
const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const { chromium } = require("playwright");

(async () => {
const [slug, out = `frames-${slug}.png`] = process.argv.slice(2);
const dir = join(process.cwd(), "entries", slug);
const svg = readFileSync(join(dir, "animation.svg"), "utf8");
const { duration } = JSON.parse(readFileSync(join(dir, "meta.json"), "utf8"));
const FRAMES = 12;
const SIZE = 200;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: SIZE, height: SIZE } });
const shots = [];
for (let i = 0; i < FRAMES; i++) {
  await page.setContent(`<body style="margin:0;background:#f3f3f1">${svg}</body>`);
  await page.evaluate((ms) => {
    for (const a of document.getAnimations()) {
      a.pause();
      a.currentTime = ms;
    }
  }, (i / FRAMES) * duration * 1000);
  shots.push((await page.screenshot()).toString("base64"));
}
await page.setViewportSize({ width: SIZE * 6, height: SIZE * 2 });
await page.setContent(
  `<body style="margin:0;display:flex;flex-wrap:wrap">${shots
    .map((s) => `<img width="${SIZE}" height="${SIZE}" src="data:image/png;base64,${s}">`)
    .join("")}</body>`,
);
await page.screenshot({ path: out });
await browser.close();
console.log(out);
})();
