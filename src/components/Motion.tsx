"use client";

import { useState, useSyncExternalStore } from "react";

type Props = {
  slug: string;
  title: string;
  alt: string;
  /** Load straight away (entry page) instead of lazily (grid tiles). */
  eager?: boolean;
  children?: React.ReactNode;
};

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

/**
 * Shows an entry as an <img>. It plays from the start; Pause swaps in the
 * static poster. Loading SVG through <img> means the browser runs no scripts
 * from it and its ids and styles cannot leak into the page.
 *
 * People who prefer reduced motion get the poster and no play control: the
 * SVG itself would stay still anyway, so a Play button would do nothing.
 */
export function Motion({ slug, title, alt, eager = false, children }: Props) {
  const [paused, setPaused] = useState(false);
  const reduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
  const base = `/entries/${slug}`;
  const still = paused || reduced;

  return (
    <div>
      <div className="aspect-square bg-ground">
        <picture>
          <source media={QUERY} srcSet={`${base}/poster.svg`} />
          <img
            className="h-full w-full"
            src={`${base}/${still ? "poster" : "animation"}.svg`}
            alt={alt}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
          />
        </picture>
      </div>
      <div className="grid grid-cols-2 gap-6 pt-4 md:grid-cols-4">
        {children}
        {reduced ? (
          <p className="justify-self-end text-mute">Still</p>
        ) : (
          <button
            type="button"
            className="cursor-pointer self-start justify-self-end text-mute hover:text-ink"
            aria-label={`${paused ? "Play" : "Pause"} ${title}`}
            onClick={() => setPaused(!paused)}
          >
            {paused ? "Play" : "Pause"}
          </button>
        )}
      </div>
    </div>
  );
}
