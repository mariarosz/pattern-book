import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Grid } from "@/components/Grid";
import { categories, getEntries, type Category } from "@/lib/entries";
import { CATEGORIES } from "@/lib/schema.mjs";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map(([category]) => ({ category }));
}

export async function generateMetadata({ params }: PageProps<"/category/[category]">): Promise<Metadata> {
  const { category } = await params;
  return { title: CATEGORIES[category as Category] };
}

export default async function CategoryPage({ params }: PageProps<"/category/[category]">) {
  const { category } = await params;
  if (!(category in CATEGORIES)) notFound();
  const key = category as Category;
  return (
    <>
      <h1 className="pb-24 pt-16 text-[1.78rem] font-bold leading-tight tracking-tight">
        {CATEGORIES[key]}
      </h1>
      <Grid entries={getEntries().filter((entry) => entry.category === key)} active={key} />
    </>
  );
}
