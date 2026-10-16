interface Props { name: string; address: string; phone: string; instagram: string }

export function Footer({ name, address, phone, instagram }: Props) {
  const link = "underline decoration-brand-light/60 underline-offset-4 hover:decoration-brand-light";
  return (
    <footer className="on-dark mt-20 bg-pine text-paper">
      <div className="mx-auto grid max-w-3xl gap-8 px-5 py-12 sm:grid-cols-2">
        <div>
          <p className="font-display text-2xl font-semibold">{name}</p>
          <address className="mt-3 not-italic leading-relaxed text-paper/85">
            <a className={link} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}>{address}</a>
          </address>
        </div>
        <ul className="space-y-1 text-paper/85">
          <li><a className={`${link} inline-flex min-h-11 items-center`} href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a></li>
          <li><a className={`${link} inline-flex min-h-11 items-center`} href={`https://instagram.com/${instagram.replace("@", "")}`}>{instagram} on Instagram</a></li>
        </ul>
      </div>
    </footer>
  );
}
