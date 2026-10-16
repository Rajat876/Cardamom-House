import { DAYS, capitalise } from "@/lib/status";
import type { Day } from "@/data/menu";

interface Props { hours: Record<Day, string>; today: Day }

export function HoursBlock({ hours, today }: Props) {
  return (
    <section aria-labelledby="hours-heading" className="pt-16">
      <div className="border-l-4 border-brand pl-4">
        <h2 id="hours-heading" className="font-display text-3xl font-semibold sm:text-4xl">Opening hours</h2>
      </div>
      <table className="mt-4 w-full text-left">
        <caption className="sr-only">Weekly opening hours</caption>
        <thead className="sr-only"><tr><th scope="col">Day</th><th scope="col">Hours</th></tr></thead>
        <tbody>
          {DAYS.map((day) => {
            const closed = hours[day] === "Closed";
            const isToday = day === today;
            return (
              <tr key={day} aria-current={isToday ? "date" : undefined}
                className={`border-b border-line/70 ${isToday ? "bg-brand/10" : ""}`}>
                <th scope="row" className={`py-3 pl-3 font-medium ${isToday ? "border-l-4 border-brand font-bold" : "border-l-4 border-transparent"} ${closed ? "text-muted" : ""}`}>
                  {capitalise(day)}{isToday && <span className="ml-2 text-xs font-semibold text-brand-dark">Today</span>}
                </th>
                <td className={`py-3 pr-3 text-right tabular-nums ${closed ? "italic text-muted line-through decoration-muted/40" : "font-semibold"}`}>
                  {hours[day]}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
