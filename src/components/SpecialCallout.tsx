import type { MenuItemData } from "@/data/menu";
import { formatEUR } from "@/lib/status";

interface Props { blurb: string; item: MenuItemData; soldOut: boolean; alternative?: MenuItemData }

export function SpecialCallout({ blurb, item, soldOut, alternative }: Props) {
  if (soldOut) {
    return (
      <section aria-labelledby="special-heading" className="rounded-2xl border-2 border-dashed border-brand p-6">
        <h2 id="special-heading" className="font-display text-2xl font-semibold text-brand-dark">Today&apos;s special has sold out</h2>
        <p className="mt-2 text-muted">
          The {item.name} went fast today. {alternative && <>Try the <a className="font-semibold text-brand-dark underline underline-offset-4" href={`#${alternative.id}`}>{alternative.name}</a> while you are here.</>}
        </p>
      </section>
    );
  }
  return (
    <section aria-labelledby="special-heading" className="rounded-2xl bg-brand p-6 text-white shadow-lg shadow-brand/20">
      <h2 id="special-heading" className="font-display text-2xl font-semibold">Today&apos;s special</h2>
      <p className="mt-2 max-w-[46ch] text-lg leading-relaxed">{blurb}</p>
      <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="text-xl font-semibold tabular-nums">{formatEUR(item.price)}</span>
        <a href={`#${item.id}`} className="inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-brand-dark outline-offset-4 hover:bg-paper focus-visible:outline-white">
          Find it on the menu
        </a>
      </p>
    </section>
  );
}
