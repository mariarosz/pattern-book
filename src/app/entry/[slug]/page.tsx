import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Copy } from "@/components/Copy";
import { Motion } from "@/components/Motion";
import { getEntries, getEntry } from "@/lib/entries";
import { CATEGORIES } from "@/lib/schema.mjs";

export const dynamicParams = false;

export function generateStaticParams() {
  return getEntries().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/entry/[slug]">): Promise<Metadata> {
  const entry = getEntry((await params).slug);
  return entry ? { title: entry.title, description: entry.description } : {};
}

function Block({ title, text, copyLabel, code = false }: { title: string; text: string; copyLabel: string; code?: boolean }) {
  return (
    <section className="pt-16">
      <div className="flex items-baseline justify-between border-b border-ink pb-2">
        <h2 className="font-bold">{title}</h2>
        <Copy text={text} label={copyLabel} />
      </div>
      {code ? (
        <pre
          tabIndex={0}
          role="region"
          aria-label={`${title} source`}
          className="max-h-[32rem] overflow-auto whitespace-pre-wrap break-words border-b border-ground pt-4 font-mono text-[0.72rem] leading-relaxed"
        >
          {text}
        </pre>
      ) : (
        <div className="max-w-[60ch] whitespace-pre-wrap pt-4 text-[0.89rem] leading-relaxed">{text}</div>
      )}
    </section>
  );
}

export default async function EntryPage({ params }: PageProps<"/entry/[slug]">) {
  const entry = getEntry((await params).slug);
  if (!entry) notFound();

  const facts: [string, React.ReactNode][] = [
    ["Category", <Link key="c" href={`/category/${entry.category}/`} className="hover:underline">{CATEGORIES[entry.category]}</Link>],
    ["Technique", entry.technique],
    ["Loop", `${entry.duration} s`],
    ["Size", `${(entry.bytes / 1024).toFixed(1)} KB`],
    ["Model", entry.model],
    ["Provenance", `${entry.provenance}, ${entry.iterations} ${entry.iterations === 1 ? "iteration" : "iterations"}`],
    ["Cold run", entry.reproduced ? "prompt reproduced the entry" : "not yet tested"],
    ["Date", entry.date],
  ];

  return (
    <article className="grid gap-x-6 pt-16 md:grid-cols-2">
      <div className="md:sticky md:top-6 md:self-start">
        <Motion slug={entry.slug} title={entry.title} alt={entry.alt} eager>
          <a href={`/entries/${entry.slug}/${entry.slug}.svg`} download={`${entry.slug}.svg`} className="md:col-span-3 hover:underline">
            Download SVG
          </a>
        </Motion>
      </div>
      <div className="pt-16 md:pt-0">
        <p className="text-mute tabular-nums">{entry.number}</p>
        <h1 className="text-[1.78rem] font-bold leading-tight tracking-tight">{entry.title}</h1>
        <p className="max-w-[40ch] pt-4">{entry.description}</p>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-1 pt-16">
          {facts.map(([term, value]) => (
            <div key={term} className="contents">
              <dt className="text-mute">{term}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <section className="pt-16">
          <h2 className="border-b border-ink pb-2 font-bold">What the prompt taught</h2>
          <p className="max-w-[48ch] pt-4">{entry.note}</p>
        </section>
        <Block title="Prompt" text={entry.prompt} copyLabel="Copy prompt" />
        <Block title="SVG" text={entry.svg.trim()} copyLabel="Copy SVG" code />
        {entry.credentials && (
          <p className="max-w-[48ch] pt-4 text-mute">
            The downloadable file also carries Content Credentials (C2PA) metadata that records how it was made. It is left out here for readability and is not counted in the size.
          </p>
        )}
      </div>
    </article>
  );
}
