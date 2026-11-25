import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

const grotesk = localFont({
  src: "../fonts/SchibstedGrotesk.woff2",
  variable: "--font-grotesk",
  weight: "400 900",
});

const REPO = "https://github.com/mariarosz/pattern-book";

export const metadata: Metadata = {
  title: { default: "Pattern Book", template: "%s | Pattern Book" },
  description:
    "An open library of SVG animations and the prompts that made them.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${grotesk.variable} antialiased`}>
      <body className="font-sans leading-snug">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-2 focus:bg-paper"
        >
          Skip to content
        </a>
        <header className="grid grid-cols-2 items-baseline gap-6 px-6 py-8 md:grid-cols-4">
          <Link href="/" className="font-bold uppercase tracking-tight md:col-span-2">
            Pattern Book
          </Link>
          <nav aria-label="Main" className="flex justify-end gap-8 md:col-span-2 md:justify-start">
            <Link href="/">Index</Link>
            <Link href="/about/">About</Link>
            <a href={REPO}>GitHub</a>
          </nav>
        </header>
        <main id="main" className="px-6">
          {children}
        </main>
        <footer className="grid grid-cols-2 gap-6 px-6 pb-8 pt-32 text-mute md:grid-cols-4">
          <p className="md:col-span-2">
            Code MIT. Animations and prompts CC BY 4.0.
          </p>
          <p className="md:col-span-2">
            Made by{" "}
            <a className="text-ink" href="https://mariaroszyk.dev">
              Maria Roszyk
            </a>{" "}
            with Claude.
          </p>
        </footer>
      </body>
    </html>
  );
}
