import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Herb } from "@/data/mock";
import { getNursery } from "@/data/mock";

export function HerbCard({ herb, index = 0 }: { herb: Herb; index?: number }) {
  const primary = getNursery(herb.nurseryIds[0]);
  const more = herb.nurseryIds.length - 1;
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group flex flex-col overflow-hidden rounded-3xl border bg-card shadow-sm transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={herb.image}
          alt={herb.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-1.5">
          <Badge variant="secondary" className="rounded-full bg-background/85 backdrop-blur">{herb.category}</Badge>
          <Badge className="rounded-full bg-primary/90">Appointment</Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="truncate font-display text-lg font-semibold">{herb.name}</h3>
          {herb.local && <p className="truncate text-xs text-muted-foreground">{herb.local}</p>}
        </div>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span className="truncate">
            {primary?.name}
            {more > 0 ? ` · +${more} more` : ""}
          </span>
        </p>
        <p className="text-xs font-medium text-primary">Available at Partner Nursery</p>
        <Button asChild size="sm" variant="secondary" className="mt-auto rounded-full">
          <Link to="/browse-herbs/$slug" params={{ slug: herb.slug }}>View Details</Link>
        </Button>
      </div>
    </motion.article>
  );
}