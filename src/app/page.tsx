import { Grid } from "@/components/Grid";
import { getEntries } from "@/lib/entries";

export default function Home() {
  return (
    <>
      <div className="grid gap-x-6 gap-y-6 pb-16 pt-12 md:grid-cols-2">
        <h1 className="max-w-[24ch] text-[1.78rem] font-bold leading-tight tracking-tight">
          SVG animations and the prompts behind them. Copy either one.
        </h1>
        <p className="max-w-[44ch]">
          Each one was written by Claude from the prompt beside it and checked by a script. Many are
          weaves: cloth is a binary matrix, over or under at every crossing, so it shows whether a
          model worked something out or only imitated a look.
        </p>
      </div>
      <Grid entries={getEntries()} />
    </>
  );
}
