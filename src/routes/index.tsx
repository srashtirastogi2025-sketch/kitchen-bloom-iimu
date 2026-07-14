import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Calendar, CheckCircle2, ChevronDown, Heart, Leaf, MapPin, Package, PlayCircle, Search, ShoppingBag, Sprout } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { HerbCard } from "@/components/site/HerbCard";
import heroImg from "@/assets/kb/parijaat-nursery.jpg";
import flatlay from "@/assets/kb/baroda-team.jpg";
import { herbs, growers, nurseries } from "@/data/mock";

export const Route = createFileRoute("/")({
  component: Home,
});

const CATEGORY_CARDS: { label: string; blurb: string; icon: typeof Leaf }[] = [
  { label: "Kitchen Herbs", blurb: "Everyday cooking staples", icon: Leaf },
  { label: "Spices", blurb: "Cardamom, clove, bay leaf & more", icon: Sprout },
  { label: "Medicinal", blurb: "Tulsi, paan and wellness plants", icon: Heart },
  { label: "Tea Plants", blurb: "Lemongrass and infusions", icon: Package },
];

const FAQS = [
  { q: "Does KitchenBloom sell plants online?", a: "No. KitchenBloom is a discovery and appointment booking platform. All plants are purchased directly from our verified nursery partners." },
  { q: "How do I book a nursery visit?", a: "Open any plant or nursery page and tap 'Book Nursery Visit'. Pick a date and time slot and we'll share the details with the nursery." },
  { q: "Are there any charges for booking?", a: "No. Booking an appointment on KitchenBloom is completely free." },
  { q: "Where are your nurseries located?", a: "Our first three verified partners — Parijaat, Kalpvraksh and Baroda Nursery — are all based in Udaipur." },
  { q: "Can I contact the nursery directly?", a: "Yes. Every nursery page has a 'Contact Nursery' button with their phone number." },
];

function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bloom-gradient">
        <img src={heroImg} alt="" aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-2/3 object-cover opacity-90 md:block" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/10" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:py-28 lg:py-32">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground">
              <Leaf className="h-3.5 w-3.5 text-primary" /> Kitchen herbs from verified nurseries
            </span>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Fresh herbs.<br /> Every day.<br />
              <span className="text-primary">Zero effort.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              Discover kitchen herbs, spices and medicinal plants at verified local nurseries.
              Book a visit and grow fresh ingredients right from your home.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/browse-herbs">Browse Herbs <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link to="/become-a-supplier">Become a Nursery Partner</Link>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> 3 Verified Nursery Partners</span>
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Kitchen Herb Collection</span>
              <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Appointment Booking Available</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Browse Kitchen Herbs (categories) */}
      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-primary">Browse</p>
            <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">Browse kitchen herbs.</h2>
            <p className="mt-2 max-w-xl text-muted-foreground">Explore by category or search for a specific plant, spice or medicinal use.</p>
          </div>
          <Button asChild variant="ghost" className="rounded-full">
            <Link to="/browse-herbs">Search all plants <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_CARDS.map((c) => (
            <Link key={c.label} to="/browse-herbs"
              className="group rounded-3xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg">
              <span className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                <c.icon className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg font-semibold">{c.label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">Explore <ArrowRight className="h-3.5 w-3.5" /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Herbs */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-primary">Featured</p>
            <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">Herbs your kitchen will love.</h2>
          </div>
          <Button asChild variant="ghost" className="rounded-full">
            <Link to="/browse-herbs">See all plants <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {herbs.slice(0, 8).map((h, i) => <HerbCard key={h.slug} herb={h} index={i} />)}
        </div>
      </section>

      {/* Verified Nursery Partners */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-10 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">Verified partners</p>
            <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">Meet our verified nursery partners.</h2>
            <p className="mt-3 text-muted-foreground">Three trusted nurseries in Udaipur growing herbs, spices and medicinal plants with care.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {nurseries.map((n) => (
              <Link key={n.id} to="/nurseries/$id" params={{ id: n.id }}
                className="group flex flex-col overflow-hidden rounded-3xl border bg-card shadow-sm transition-shadow hover:shadow-xl">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={n.image} alt={n.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <div className="flex items-center gap-2 text-xs font-medium text-primary">
                    <CheckCircle2 className="h-4 w-4" /> Verified Partner
                  </div>
                  <h3 className="font-display text-xl font-semibold">{n.name}</h3>
                  <p className="flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="h-4 w-4" /> {n.city}</p>
                  <p className="text-sm text-muted-foreground">{n.tagline}</p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm font-medium text-primary group-hover:gap-2 transition-all">Visit nursery page <ArrowRight className="h-3.5 w-3.5" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why KitchenBloom */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">Why KitchenBloom</p>
          <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">A kinder way to buy fresh herbs.</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: MapPin, title: "Find nearby nurseries", desc: "Discover trusted local growers stocking the herbs you cook with every day." },
            { icon: Calendar, title: "Book an appointment", desc: "Reserve a nursery visit in seconds. No online payments, no delivery fees." },
            { icon: Sprout, title: "Learn plant care", desc: "Step-by-step guides so every herb thrives on your kitchen windowsill." },
            { icon: Heart, title: "Support local nurseries", desc: "Every appointment helps a small nursery grow — with zero commission on plants." },
          ].map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group rounded-3xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg">
              <span className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-secondary/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">How it works</p>
            <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">From search to windowsill in 5 steps.</h2>
          </div>
          <ol className="grid gap-4 md:grid-cols-5">
            {[
              { icon: Search, t: "Search herbs" },
              { icon: MapPin, t: "Choose nursery" },
              { icon: Calendar, t: "Book appointment" },
              { icon: ShoppingBag, t: "Collect plant" },
              { icon: Sprout, t: "Grow fresh herbs" },
            ].map((s, i) => (
              <li key={s.t} className="relative rounded-3xl border bg-card p-6 shadow-sm">
                <span className="absolute right-4 top-4 font-display text-3xl font-semibold text-primary/30">{String(i+1).padStart(2,"0")}</span>
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-primary/10 text-primary"><s.icon className="h-5 w-5" /></span>
                <p className="mt-4 font-display text-lg font-semibold">{s.t}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Founder story */}
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 md:grid-cols-2 md:items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative aspect-[5/4] overflow-hidden rounded-[2.5rem]">
          <img src={flatlay} alt="The team at Baroda Nursery" loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute -bottom-4 -right-4 hidden rounded-3xl border bg-card/90 p-4 shadow-lg backdrop-blur sm:block">
            <p className="font-display text-2xl font-semibold">3</p>
            <p className="text-xs text-muted-foreground">verified nursery partners</p>
          </div>
        </motion.div>
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-primary">Our story</p>
          <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">Why we started KitchenBloom.</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>KitchenBloom began with a simple observation. Every week, households purchased fresh herbs only to watch them wilt within days. Frequent trips to markets became inconvenient, while many people wanted to grow herbs but didn't know where to begin.</p>
            <p>During conversations with local nursery owners, we discovered another challenge. They stocked healthy herb plants but had almost no online visibility. Customers rarely knew what was available, and nurseries relied entirely on walk-in traffic.</p>
            <p>We realized one digital platform could solve both problems. KitchenBloom was built to connect people who love cooking with local nursery owners who nurture these plants every day.</p>
            <p className="rounded-2xl border bg-secondary/50 p-4 text-foreground">
              <b>Our mission:</b> Help every household grow fresh herbs, while helping local nurseries grow their business.
            </p>
          </div>
        </div>
      </section>

      {/* Our Stories — Meet the Growers */}
      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-primary">Our stories</p>
            <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">Meet the growers.</h2>
            <p className="mt-3 text-muted-foreground">The people who nurture every plant before it reaches your home.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {growers.map((g, i) => (
              <motion.figure key={g.nurseryId} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="flex flex-col overflow-hidden rounded-3xl border bg-card shadow-sm">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={g.image} alt={g.nursery} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <p className="font-display text-lg font-semibold">{g.nursery}</p>
                  <p className="text-xs uppercase tracking-widest text-primary">{g.name} · {g.city}</p>
                  <p className="text-sm text-muted-foreground">{g.tagline}</p>
                  <blockquote className="rounded-2xl bg-secondary/60 p-3 text-sm italic text-foreground">“{g.quote}”</blockquote>
                  <div className="mt-auto flex flex-wrap gap-2 pt-1">
                    <Button size="sm" variant="outline" className="rounded-full"
                      onClick={() => toast("Owner story video coming soon. Uploaded video will be embedded here.")}>
                      <PlayCircle className="h-4 w-4" /> Watch Their Story
                    </Button>
                    <Button asChild size="sm" variant="ghost" className="rounded-full">
                      <Link to="/nurseries/$id" params={{ id: g.nurseryId }}>Visit nursery</Link>
                    </Button>
                  </div>
                </div>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary p-10 text-primary-foreground sm:p-16">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative max-w-2xl">
            <Package className="mb-6 h-8 w-8" />
            <h2 className="font-display text-4xl font-semibold sm:text-5xl">Become a nursery partner.</h2>
            <p className="mt-4 text-primary-foreground/85">List your herbs, accept appointments, and grow your customer base — with zero commission on plant sales.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary" className="rounded-full">
                <Link to="/become-a-supplier">Become a Nursery Partner</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-white/30 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
                <Link to="/login">Supplier Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 pb-24 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">FAQ</p>
          <h2 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">Questions, answered.</h2>
        </div>
        <div className="divide-y overflow-hidden rounded-3xl border bg-card">
          {FAQS.map((f, i) => (
            <button key={f.q} onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-secondary/40">
              <div>
                <p className="font-display text-base font-semibold">{f.q}</p>
                {openFaq === i && <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>}
              </div>
              <ChevronDown className={`mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
            </button>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button asChild variant="ghost" className="rounded-full">
            <Link to="/faqs">See all FAQs <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
}
