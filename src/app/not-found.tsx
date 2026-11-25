import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <div className="pt-16">
      <h1 className="text-[1.78rem] font-bold leading-tight tracking-tight">Nothing on this page.</h1>
      <p className="pt-4">
        <Link href="/" className="underline">
          Back to the index
        </Link>
      </p>
    </div>
  );
}
