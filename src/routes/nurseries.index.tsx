import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { nurseries, getHerbsForNursery } from "@/data/mock";

export const Route = createFileRoute("/nurseries/")({
  head: () => ({
    meta: [
      { title: "Verified Nursery Partners — KitchenBloom" },
      { name: "description", content: "Meet our verified nursery partners in Udaipur growing fresh kitchen herbs, spices and medicinal plants." },
      { property: "og:title", content: "Verified Nursery Partners — KitchenBloom" },
      { property: "og:description", content: "Discover trusted nurseries growing kitchen herbs and edible plants." },
    ],
  }),
  component: NurseriesPage,
});

function NurseriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-12 max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">Verified partners</p>
        <h1 className="mt-2 font-display text-5xl font-semibold">Our nursery partners.</h1>
        <p className="mt-3 text-muted-foreground">Every plant on KitchenBloom is grown by a verified, local nursery. Visit them in person.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {nurseries.map((n) => {
          const nherbs = getHerbsForNursery(n.id);
          return (
            <article key={n.id} className="group flex flex-col overflow-hidden rounded-3xl border bg-card shadow-sm transition-shadow hover:shadow-xl">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={n.image} alt={n.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div>
                  <h3 className="font-display text-xl font-semibold">{n.name}</h3>
                  <p className="text-xs text-muted-foreground">{n.tagline}</p>
                </div>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="h-4 w-4" /> {n.city}</p>
                <p className="line-clamp-3 text-sm text-muted-foreground">{n.about}</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {nherbs.slice(0, 4).map((h) => (
                    <span key={h.slug} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs">{h.name}</span>
                  ))}
                  {nherbs.length > 4 && <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs">+{nherbs.length - 4}</span>}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">Open {n.hours}</p>
                <Button asChild variant="secondary" className="mt-auto rounded-full">
                  <Link to="/nurseries/$id" params={{ id: n.id }}>Visit nursery page</Link>
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}