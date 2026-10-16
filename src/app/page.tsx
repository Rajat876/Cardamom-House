import { categories, findItem, restaurant, todaySpecial } from "@/data/menu";
import { DEMO_NOW, getStatus, parseState } from "@/lib/status";
import { ClosedBanner } from "@/components/ClosedBanner";
import { CategoryNav } from "@/components/CategoryNav";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HoursBlock } from "@/components/HoursBlock";
import { MenuSection } from "@/components/MenuSection";
import { SpecialCallout } from "@/components/SpecialCallout";

interface PageProps { searchParams: Promise<{ state?: string | string[] }> }

export default async function Page({ searchParams }: PageProps) {
  const state = parseState((await searchParams).state);
  const { day, minutes } = DEMO_NOW[state];
  const status = getStatus(restaurant.hours, day, minutes);
  const special = findItem(todaySpecial.itemId);
  const alternative = findItem("brunch_01");
  const specialSoldOut = state === "special-sold-out";

  return (
    <>
      <Hero name={restaurant.name} tagline={restaurant.tagline} status={status} />
      <div className="mx-auto max-w-3xl px-5">
        <div className="-mt-8 relative z-10">
          {status.isOpen
            ? special && <SpecialCallout blurb={todaySpecial.blurb} item={special} soldOut={specialSoldOut} alternative={alternative} />
            : <ClosedBanner nextOpening={status.nextOpening} />}
        </div>
      </div>
      <CategoryNav sections={categories.map(({ id, name }) => ({ id, name }))} />
      <main id="menu" className="mx-auto max-w-3xl px-5">
        <p className="pt-6 text-sm text-muted">V = vegetarian, GF = gluten-free. Ask us about allergens.</p>
        {categories.map((c) => (
          <MenuSection key={c.id} category={c}
            soldOutId={specialSoldOut ? todaySpecial.itemId : undefined}
            specialId={status.isOpen && !specialSoldOut ? todaySpecial.itemId : undefined} />
        ))}
        <HoursBlock hours={restaurant.hours} today={day} />
      </main>
      <Footer name={restaurant.name} address={restaurant.address} phone={restaurant.phone} instagram={restaurant.instagram} />
    </>
  );
}
