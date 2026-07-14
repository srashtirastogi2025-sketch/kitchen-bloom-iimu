import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HerbCard } from "@/components/site/HerbCard";
import { herbs, nurseries } from "@/data/mock";

export const Route = createFileRoute("/browse-herbs/")({
  head: () => ({
    meta: [
      { title: "Browse Kitchen Herbs — KitchenBloom" },
      { name: "description", content: "Search kitchen herbs, spices, medicinal plants and teas at verified nursery partners. Book an appointment to visit." },
      { property: "og:title", content: "Browse Kitchen Herbs — KitchenBloom" },
      { property: "og:description", content: "Search kitchen herbs, spices, medicinal plants and teas at verified nursery partners." },
    ],
  }),
  component: BrowseHerbs,
});

const CATEGORIES = ["Herb", "Spice", "Medicinal", "Tea", "Fruit"] as const;
const SUNLIGHT_BUCKETS = [
  { value: "full", label: "Full sun (6+ hrs)", match: (s: string) => /6\+|full/i.test(s) },
  { value: "partial", label: "Partial (4–5 hrs)", match: (s: string) => /4|5|partial/i.test(s) },
  { value: "shade", label: "Shade", match: (s: string) => /shade/i.test(s) },
];
const WATER_BUCKETS = [
  { value: "low", label: "Low (weekly)", match: (w: string) => /week|minimal/i.test(w) },
  { value: "medium", label: "Medium (every 2–3 days)", match: (w: string) => /2|3/.test(w) },
  { value: "high", label: "High (daily / keep moist)", match: (w: string) => /daily|moist/i.test(w) },
];

function BrowseHerbs() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const [nursery, setNursery] = useState("all");
  const [sunlight, setSunlight] = useState("all");
  const [water, setWater] = useState("all");

  const filtered = useMemo(() => herbs.filter((h) => {
    if (q && !`${h.name} ${h.local ?? ""} ${h.category} ${h.cooking.join(" ")} ${h.benefits.join(" ")}`.toLowerCase().includes(q.toLowerCase())) return false;
    if (category !== "all" && h.category !== category) return false;
    if (nursery !== "all" && !h.nurseryIds.includes(nursery)) return false;
    if (sunlight !== "all") {
      const b = SUNLIGHT_BUCKETS.find((x) => x.value === sunlight);
      if (!b || !b.match(h.care.sunlight)) return false;
    }
    if (water !== "all") {
      const b = WATER_BUCKETS.find((x) => x.value === water);
      if (!b || !b.match(h.care.watering)) return false;
    }
    return true;
  }), [q, category, nursery, sunlight, water]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-10 max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">Browse</p>
        <h1 className="mt-2 font-display text-5xl font-semibold">Every herb, spice and tea plant.</h1>
        <p className="mt-3 text-muted-foreground">Search across our verified nursery partners and book an appointment to visit.</p>
      </div>

      <div className="sticky top-16 z-30 mb-8 grid gap-3 rounded-3xl border bg-background/85 p-4 shadow-sm backdrop-blur sm:grid-cols-2 lg:grid-cols-5">
        <div className="relative sm:col-span-2 lg:col-span-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search Tulsi, Rosemary, Ilaichi…" className="pl-9 rounded-full" />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="rounded-full"><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={nursery} onValueChange={setNursery}>
          <SelectTrigger className="rounded-full"><SelectValue placeholder="Nursery" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All nurseries</SelectItem>
            {nurseries.map((n) => <SelectItem key={n.id} value={n.id}>{n.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={sunlight} onValueChange={setSunlight}>
          <SelectTrigger className="rounded-full"><SelectValue placeholder="Sunlight" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any sunlight</SelectItem>
            {SUNLIGHT_BUCKETS.map((b) => <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={water} onValueChange={setWater}>
          <SelectTrigger className="rounded-full"><SelectValue placeholder="Water" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any watering</SelectItem>
            {WATER_BUCKETS.map((b) => <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border bg-card p-16 text-center text-muted-foreground">
          No plants match your filters. Try broadening your search.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((h, i) => <HerbCard key={h.slug} herb={h} index={i} />)}
        </div>
      )}
    </div>
  );
}