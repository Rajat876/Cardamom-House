export function ClosedBanner({ nextOpening }: { nextOpening?: string }) {
  return (
    <section aria-labelledby="closed-heading" className="rounded-2xl bg-brand p-6 text-white shadow-lg shadow-brand/20">
      <h2 id="closed-heading" className="font-display text-2xl font-semibold">We&apos;re closed today</h2>
      <p className="mt-2 max-w-[46ch] text-lg leading-relaxed">
        Even cardamom needs a rest day. {nextOpening ? `We open ${nextOpening}.` : ""} Have a look at the menu and plan your order.
      </p>
    </section>
  );
}
