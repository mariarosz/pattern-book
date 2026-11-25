import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

const sections: [string, string][] = [
  [
    "What this is",
    "Pattern Book is an open library of SVG animations. Every entry comes with the prompt that produced it, so you can take the result, or take the prompt and make your own.",
  ],
  [
    "Why weaving",
    "A weave is a binary matrix: at every crossing a thread is either over or under. That makes cloth a good test of whether a language model is working something out or only imitating how it looks. The weave entries put the draft in the prompt and ask for it to be drawn honestly.",
  ],
  [
    "How entries are made",
    "Each animation is written by a language model from a prompt, checked by a script against a fixed spec, and reviewed before it is published. Every entry says whether it came out in one shot, took several turns, or was finished by hand.",
  ],
  [
    "The spec",
    "Square viewBox, no fixed size, fine strokes in a small palette of thread colours: linen, peach, rose, soft blue, beeswax. CSS keyframes, no JavaScript. A seamless loop of two to six seconds. Under 8 KB. With animation off, the file rests on a finished frame, which is also what you see if you prefer reduced motion.",
  ],
];

export default function About() {
  return (
    <div className="pt-16">
      {sections.map(([title, body]) => (
        <section key={title} className="grid gap-x-6 border-t border-ink py-8 md:grid-cols-2">
          <h2 className="font-bold">{title}</h2>
          <p className="max-w-[48ch]">{body}</p>
        </section>
      ))}
    </div>
  );
}
