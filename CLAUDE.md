# Pattern Book

A static Next.js site that shows animated SVGs with the prompts that produced them.

- `entries/<slug>/` holds the content. `SPEC.md` is the contract every entry must meet.
- `npm run check` validates entries. `npm run build` runs it, copies SVGs into `public/entries/` with a generated poster, and exports to `out/`.
- `node scripts/frames.cjs <slug>` renders a 12-frame strip for review (needs Playwright).
- Entries are shown with `<img>`. Never inline entry SVG into the page.
- To add or change an entry, use the `svg-motion` skill. Two agents review each entry (`motion-craft`, `prompt-provenance`); three review the site at milestones (`art-director`, `front-end`, `first-60-seconds`). The final decision is Maria's.
- Site copy and code comments are in English.
