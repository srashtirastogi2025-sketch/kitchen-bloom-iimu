import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Droplet, MapPin, Phone, Sprout, Sun } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getHerb, getNursery, type Nursery } from "@/data/mock";
import { BookingModal } from "@/components/site/BookingModal";

export const Route = createFileRoute("/browse-herbs/$slug")({
  loader: ({ params }) => {
    const herb = getHerb(params.slug);
    if (!herb) throw notFound();
    return { herb };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.herb.name} — KitchenBloom` },
      { name: "description", content: loaderData.herb.description },
      { property: "og:title", content: `${loaderData.herb.name} — KitchenBloom` },
      { property: "og:description", content: loaderData.herb.description },
      { property: "og:image", content: loaderData.herb.image },
    ] : [{ title: "Herb — KitchenBloom" }],
  }),
  component: HerbDetail,
});

function HerbDetail() {
  const { herb } = Route.useLoaderData();
  const [open, setOpen] = useState(false);
  const availableAt: Nursery[] = (herb.nurseryIds as string[])
    .map((id: string) => getNursery(id))
    .filter((n): n is Nursery => Boolean(n));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Link to="/browse-herbs" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All plants
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-hidden rounded-[2.5rem] bg-secondary">
          <img src={herb.image} alt={herb.name} className="h-full w-full object-cover" />
        </motion.div>
        <div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="rounded-full">{herb.category}</Badge>
            <Badge className="rounded-full">Appointment Booking</Badge>
          </div>
          <h1 className="mt-4 font-display text-5xl font-semibold">{herb.name}</h1>
          {herb.local && <p className="mt-1 text-lg text-muted-foreground">{herb.local}</p>}
          <p className="mt-4 text-muted-foreground">{herb.description}</p>
          <p className="mt-6 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">Available at Partner Nursery</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" className="rounded-full" onClick={() => setOpen(true)}>Book Nursery Visit</Button>
            <Button size="lg" variant="outline" className="rounded-full" asChild>
              <a href={`tel:${availableAt[0]?.phone.replace(/\s/g, "") ?? ""}`}>
                <Phone className="h-4 w-4" /> Contact Nursery
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border bg-card p-6">
          <h3 className="font-display text-xl font-semibold">Culinary uses</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {herb.cooking.map((b: string) => <li key={b} className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> {b}</li>)}
          </ul>
        </div>
        <div className="rounded-3xl border bg-card p-6">
          <h3 className="font-display text-xl font-semibold">Health benefits</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {herb.benefits.map((b: string) => <li key={b} className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> {b}</li>)}
          </ul>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {[
          { icon: Sun, label: "Sunlight", value: herb.care.sunlight },
          { icon: Droplet, label: "Water", value: herb.care.watering },
          { icon: Sprout, label: "Growing difficulty", value: herb.care.difficulty },
        ].map((c) => (
          <div key={c.label} className="rounded-3xl border bg-secondary/40 p-5">
            <c.icon className="h-5 w-5 text-primary" />
            <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">{c.label}</p>
            <p className="mt-1 text-sm font-medium">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="font-display text-3xl font-semibold">Available at these nurseries</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {availableAt.map((n: Nursery) => (
            <article key={n.id} className="flex flex-col overflow-hidden rounded-3xl border bg-card">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={n.image} alt={n.name} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <p className="font-display text-lg font-semibold">{n.name}</p>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="h-4 w-4" /> {n.city} · {n.hours}</p>
                <p className="text-xs text-muted-foreground">{n.address}</p>
                <div className="mt-auto flex gap-2 pt-3">
                  <Button size="sm" className="flex-1 rounded-full" onClick={() => setOpen(true)}>Book Visit</Button>
                  <Button size="sm" variant="outline" className="rounded-full" asChild>
                    <Link to="/nurseries/$id" params={{ id: n.id }}>Details</Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <BookingModal herb={herb} open={open} onOpenChange={setOpen} />
    </div>
  );
}