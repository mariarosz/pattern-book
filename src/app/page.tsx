import { Grid } from "@/components/Grid";
import { getEntries } from "@/lib/entries";

export default function Home() {
  return (
    <>
      <h1 className="max-w-[28ch] pb-24 pt-16 text-[1.78rem] font-bold leading-tight tracking-tight">
        SVG animations and the prompts that made them. Copy either one.
      </h1>
      <Grid entries={getEntries()} />
    </>
  );
}
