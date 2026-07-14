import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Clock, MapPin, Phone, PlayCircle, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { getNursery, getHerbsForNursery, herbs as allHerbs } from "@/data/mock";
import { BookingModal } from "@/components/site/BookingModal";

export const Route = createFileRoute("/nurseries/$id")({
  loader: ({ params }) => {
    const nursery = getNursery(params.id);
    if (!nursery) throw notFound();
    return { nursery };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.nursery.name} — KitchenBloom` },
      { name: "description", content: loaderData.nursery.about.slice(0, 155) },
      { property: "og:title", content: `${loaderData.nursery.name} — KitchenBloom` },
      { property: "og:description", content: loaderData.nursery.about.slice(0, 155) },
      { property: "og:image", content: loaderData.nursery.image },
    ] : [{ title: "Nursery — KitchenBloom" }],
  }),
  component: NurseryDetail,
});

function NurseryDetail() {
  const { nursery } = Route.useLoaderData();
  const plants = getHerbsForNursery(nursery.id);
  const bookableHerb = plants[0] ?? allHerbs[0];
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Link to="/nurseries" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> All nurseries
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:items-start">
        <div className="overflow-hidden rounded-[2.5rem] bg-secondary">
          <img src={nursery.image} alt={nursery.name} className="h-full w-full object-cover" />
        </div>
        <div>
          <Badge variant="secondary" className="rounded-full">Verified Nursery Partner</Badge>
          <h1 className="mt-3 font-display text-5xl font-semibold">{nursery.name}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{nursery.tagline}</p>
          <div className="mt-5 grid gap-2 text-sm">
            <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {nursery.address}</p>
            <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> {nursery.hours}</p>
            <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> {nursery.phone}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" className="rounded-full" onClick={() => setOpen(true)}>Book Nursery Visit</Button>
            <Button size="lg" variant="outline" className="rounded-full" asChild>
              <a href={`tel:${nursery.phone.replace(/\s/g, "")}`}><Phone className="h-4 w-4" /> Contact Nursery</a>
            </Button>
          </div>
        </div>
      </div>

      <section className="mt-16 grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
        {nursery.ownerImage ? (
          <div className="overflow-hidden rounded-3xl bg-secondary">
            <img src={nursery.ownerImage} alt={`${nursery.name} owner`} className="h-full w-full object-cover" />
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl bg-secondary">
            <img src={nursery.image} alt={nursery.name} className="h-full w-full object-cover" />
          </div>
        )}
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-primary">Our story</p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{nursery.tagline}</h2>
          <p className="mt-4 whitespace-pre-line text-muted-foreground">{nursery.about}</p>
          <blockquote className="mt-6 flex gap-3 rounded-3xl border bg-secondary/50 p-5 text-foreground">
            <Quote className="h-6 w-6 shrink-0 text-primary" />
            <p className="italic">“{nursery.quote}”</p>
          </blockquote>
          <Button className="mt-6 rounded-full" variant="outline"
            onClick={() => toast("Owner story video coming soon. Uploaded video will be embedded here.")}>
            <PlayCircle className="h-4 w-4" /> Watch Their Story
          </Button>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-3xl font-semibold">Plants available here</h2>
        <p className="mt-1 text-sm text-muted-foreground">Available at Partner Nursery — book an appointment to visit and collect.</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {plants.map((h) => (
            <Link key={h.slug} to="/browse-herbs/$slug" params={{ slug: h.slug }}
              className="group flex flex-col overflow-hidden rounded-3xl border bg-card shadow-sm transition-shadow hover:shadow-xl">
              <div className="aspect-[4/3] overflow-hidden bg-secondary">
                <img src={h.image} alt={h.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex-1 p-4">
                <p className="font-display text-base font-semibold">{h.name}</p>
                {h.local && <p className="text-xs text-muted-foreground">{h.local}</p>}
                <p className="mt-2 text-xs font-medium text-primary">Enquire at Nursery</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <BookingModal herb={bookableHerb} open={open} onOpenChange={setOpen} />
    </div>
  );
}