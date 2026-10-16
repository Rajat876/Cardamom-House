"use client";
import { useEffect, useRef, useState } from "react";

interface Props { sections: { id: string; name: string }[] }

export function CategoryNav({ sections }: Props) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-25% 0px -65% 0px" },
    );
    sections.forEach((s) => { const el = document.getElementById(s.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [sections]);

  // keep the active pill visible inside the horizontally scrolling bar (mobile)
  useEffect(() => {
    const link = listRef.current?.querySelector<HTMLElement>('[aria-current="true"]');
    const list = listRef.current;
    if (link && list) list.scrollTo({ left: link.offsetLeft - list.clientWidth / 2 + link.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav aria-label="Menu categories" className="no-print sticky top-0 mt-8 z-30 border-b border-line bg-paper/95 backdrop-blur">
      <ul ref={listRef} className="mx-auto flex max-w-3xl gap-2 overflow-x-auto px-4 py-2 [scrollbar-width:none]">
        {sections.map((s) => {
          const isActive = s.id === active;
          return (
            <li key={s.id} className="shrink-0">
              <a href={`#${s.id}`} aria-current={isActive ? "true" : undefined}
                className={`flex min-h-11 items-center rounded-full px-4 text-sm font-semibold transition-colors ${
                  isActive ? "bg-brand text-white" : "text-ink hover:bg-brand/10 hover:text-brand-dark"}`}>
                {s.name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
