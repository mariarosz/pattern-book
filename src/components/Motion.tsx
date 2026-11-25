"use client";

import { useState } from "react";

type Props = {
  slug: string;
  alt: string;
  children?: React.ReactNode;
};

/**
 * Shows an entry as an <img>. It plays from the start; Pause swaps in the
 * static poster. People who prefer reduced motion get the resting frame from
 * a media query inside the SVG itself. Loading SVG through <img> means the browser runs
 * no scripts from it and its ids and styles cannot leak into the page.
 */
export function Motion({ slug, alt, children }: Props) {
  const [playing, setPlaying] = useState(true);

  return (
    <div>
      <div className="aspect-square bg-ground">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="h-full w-full"
          src={`/entries/${slug}/${playing ? "animation" : "poster"}.svg`}
          alt={alt}
        />
      </div>
      <div className="grid grid-cols-2 gap-6 pt-4 md:grid-cols-4">
        {children}
        <button
          type="button"
          className="cursor-pointer justify-self-end text-mute hover:text-ink"
          onClick={() => setPlaying(!playing)}
        >
          {playing ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
}
