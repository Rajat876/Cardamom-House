import type { OpenStatus } from "@/lib/status";

interface Props { name: string; tagline: string; status: OpenStatus }

export function Hero({ name, tagline, status }: Props) {
  return (
    <header className="on-dark relative overflow-hidden bg-pine text-paper">
      <svg aria-hidden viewBox="0 0 200 200" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 text-brand">
        <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="100" cy="100" r="68" fill="none" stroke="currentColor" strokeWidth="2" opacity=".6" />
        <circle cx="100" cy="100" r="40" fill="currentColor" opacity=".9" />
      </svg>
      <div className="steep relative mx-auto max-w-3xl px-5 pb-14 pt-16 sm:pt-24">
        <p role="status" className="inline-flex min-h-9 items-center gap-2 rounded-full border border-paper/25 px-4 text-sm font-semibold">
          <span aria-hidden className={`h-2.5 w-2.5 rounded-full ${status.isOpen ? "bg-emerald-400" : "bg-brand-light"}`} />
          {status.isOpen ? `Open now, until ${status.closesAt}` : `Closed. Opens ${status.nextOpening}`}
        </p>
        <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl">{name}</h1>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-paper/85">{tagline}</p>
      </div>
    </header>
  );
}
