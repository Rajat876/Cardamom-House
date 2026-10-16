import type { Category } from "@/data/menu";
import { MenuItem } from "./MenuItem";

interface Props { category: Category; soldOutId?: string; specialId?: string }

export function MenuSection({ category, soldOutId, specialId }: Props) {
  const headingId = `${category.id}-heading`;
  return (
    <section id={category.id} aria-labelledby={headingId} className="scroll-mt-20 pt-12">
      <div className="border-l-4 border-brand pl-4">
        <h2 id={headingId} className="font-display text-3xl font-semibold sm:text-4xl">{category.name}</h2>
        {category.description && <p className="mt-1 text-muted">{category.description}</p>}
      </div>
      <ul className="mt-4 divide-y divide-line/70">
        {category.items.map((item) => (
          <MenuItem key={item.id} item={item} soldOut={item.id === soldOutId} isSpecial={item.id === specialId} />
        ))}
      </ul>
    </section>
  );
}
