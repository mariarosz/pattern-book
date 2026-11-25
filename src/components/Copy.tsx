"use client";

import { useState } from "react";

export function Copy({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="cursor-pointer text-mute hover:text-ink"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
    >
      <span aria-live="polite">{copied ? "Copied" : label}</span>
    </button>
  );
}
