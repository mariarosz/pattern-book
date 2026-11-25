import { z } from "zod";

export const CATEGORIES = /** @type {const} */ ({
  weaves: "Weaves & patterns",
  line: "Line drawing",
  loaders: "Loaders",
  icons: "Icon micro-interactions",
  masks: "Masks & reveals",
  backgrounds: "Generative backgrounds",
});

export const metaSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10).max(120),
  alt: z.string().min(10),
  category: z.enum(/** @type {[string, ...string[]]} */ (Object.keys(CATEGORIES))),
  technique: z.enum(["CSS keyframes", "SMIL", "CSS + SMIL"]),
  duration: z.number().min(2).max(6),
  model: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  provenance: z.enum(["single-shot", "multi-turn", "hand-finished"]),
  iterations: z.number().int().min(1),
  // Has prompt.md been run in a fresh context and produced a passing entry?
  reproduced: z.boolean(),
  note: z.string().min(10),
  author: z.string(),
  license: z.literal("CC-BY-4.0"),
});
