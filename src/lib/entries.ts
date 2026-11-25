import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { z } from "zod";
import { CATEGORIES, metaSchema } from "./schema.mjs";

export type Category = keyof typeof CATEGORIES;
export type Entry = z.infer<typeof metaSchema> & {
  slug: string;
  category: Category;
  number: string;
  prompt: string;
  svg: string;
  bytes: number;
};

const dir = join(process.cwd(), "entries");

export const categories = Object.entries(CATEGORIES) as [Category, string][];

export function getEntries(): Entry[] {
  return readdirSync(dir)
    .map((slug) => {
      const read = (name: string) => readFileSync(join(dir, slug, name), "utf8");
      const meta = metaSchema.parse(JSON.parse(read("meta.json")));
      const svg = read("animation.svg");
      return {
        ...meta,
        category: meta.category as Category,
        slug,
        prompt: read("prompt.md").trim(),
        svg,
        bytes: Buffer.byteLength(svg),
        number: "",
      };
    })
    .sort((a, b) => a.date.localeCompare(b.date) || a.slug.localeCompare(b.slug))
    .map((entry, i) => ({ ...entry, number: String(i + 1).padStart(2, "0") }));
}

export function getEntry(slug: string): Entry | undefined {
  return getEntries().find((entry) => entry.slug === slug);
}
