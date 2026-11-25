import Link from "next/link";
import { categories, getEntries, type Category, type Entry } from "@/lib/entries";
import { CATEGORIES } from "@/lib/schema.mjs";
import { Motion } from "./Motion";

export function Grid({ entries, active }: { entries: Entry[]; active?: Category }) {
  // A filter is only useful once it narrows to more than one entry.
  const all = getEntries();
  const shown = categories.filter(([key]) => all.filter((e) => e.category === key).length > 1);

  return (
    <>
      {(shown.length > 1 || active) && (
      <nav aria-label="Categories" className="flex flex-wrap gap-x-8 gap-y-1 pb-8">
        <Link href="/" prefetch={false} aria-current={active ? undefined : "page"} className={active ? "text-mute hover:text-ink" : ""}>
          All
        </Link>
        {(active ? categories.filter(([key]) => key === active || shown.some(([k]) => k === key)) : shown).map(([key, name]) => (
          <Link
            key={key}
            href={`/category/${key}/`}
            prefetch={false}
            aria-current={active === key ? "page" : undefined}
            className={active === key ? "" : "text-mute hover:text-ink"}
          >
            {name}
          </Link>
        ))}
      </nav>
      )}
      {entries.length === 0 ? (
        <p className="text-mute">Nothing here yet.</p>
      ) : (
      <ul className="grid gap-x-6 gap-y-16 md:grid-cols-2">
        {entries.map((entry) => (
          <li key={entry.slug}>
            <Motion slug={entry.slug} title={entry.title} alt={entry.alt}>
              <Link href={`/entry/${entry.slug}/`} prefetch={false} className="flex gap-2 hover:underline">
                <span className="text-mute tabular-nums">{entry.number}</span>
                <span>{entry.title}</span>
              </Link>
              <p className="order-last col-span-2 md:order-none">
                {entry.description}
                <span className="block text-mute">{CATEGORIES[entry.category]}</span>
              </p>
            </Motion>
          </li>
        ))}
      </ul>
      )}
    </>
  );
}
