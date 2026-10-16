import type { MenuItemData } from "@/data/menu";
import { formatEUR } from "@/lib/status";
import { Tag } from "./Tag";

interface Props { item: MenuItemData; soldOut?: boolean; isSpecial?: boolean }

export function MenuItem({ item, soldOut = false, isSpecial = false }: Props) {
  return (
    <li id={item.id} className="scroll-mt-24 py-4">
      <div className={soldOut ? "opacity-60" : undefined}>
        <div className="flex items-baseline gap-3">
          <h3 className="font-display text-xl font-semibold leading-snug">{item.name}</h3>
          <span aria-hidden className="mb-1 min-w-4 flex-1 border-b border-dotted border-muted/50" />
          <span className={`font-semibold tabular-nums ${soldOut ? "line-through" : ""}`}>{formatEUR(item.price)}</span>
        </div>
        {item.description && <p className="mt-1 max-w-[60ch] text-[0.95rem] leading-relaxed text-muted">{item.description}</p>}
      </div>
      {(item.tags.length > 0 || soldOut || isSpecial) && (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {isSpecial && <span className="inline-flex h-6 items-center rounded-full bg-brand px-3 text-xs font-semibold text-white">Today&apos;s special</span>}
          {soldOut && <span className="inline-flex h-6 items-center rounded-full bg-ink px-3 text-xs font-semibold text-paper">Sold out</span>}
          {item.tags.map((t) => <Tag key={t} tag={t} />)}
        </div>
      )}
    </li>
  );
}
