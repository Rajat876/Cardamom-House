import type { Tag as TagType } from "@/data/menu";

const LABELS: Record<TagType, { short: string; long: string }> = {
  V: { short: "V", long: "Vegetarian" },
  GF: { short: "GF", long: "Gluten-free" },
  spicy: { short: "Spicy", long: "Spicy" },
};

export function Tag({ tag }: { tag: TagType }) {
  const { short, long } = LABELS[tag];
  return (
    <abbr title={long} aria-label={long}
      className="inline-flex h-5 items-center rounded-full border border-line px-2 text-[0.7rem] font-semibold text-muted no-underline">
      {short}
    </abbr>
  );
}
