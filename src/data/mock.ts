// Nursery cover & owner photos
import parijaatCover from "@/assets/kb/parijaat-nursery.jpg";
import parijaatOwner from "@/assets/kb/parijaat-owner.jpg";
import kalpvrakshCover from "@/assets/kb/kalpvraksh-nursery.jpg";
import barodaCover from "@/assets/kb/baroda-nursery.jpg";
import barodaTeam from "@/assets/kb/baroda-team.jpg";

// Herb photos
import curryPattaImg from "@/assets/kb/herb-curry-patta.jpg";
import rosemaryImg from "@/assets/kb/herb-rosemary.jpg";
import lemongrassImg from "@/assets/kb/herb-lemongrass.jpg";
import cardamomImg from "@/assets/kb/herb-cardamom.jpg";
import tejPattaImg from "@/assets/kb/herb-tej-patta.jpg";
import thymeImg from "@/assets/kb/herb-thyme.jpg";
import pudinaImg from "@/assets/kb/herb-pudina.jpg";
import parsleyImg from "@/assets/kb/herb-parsley.jpg";
import tulsiImg from "@/assets/kb/herb-tulsi.jpg";
import meethaNeemImg from "@/assets/kb/herb-meetha-neem.jpg";
import calcuttaPanImg from "@/assets/kb/herb-calcutta-pan.jpg";
import lemonImg from "@/assets/kb/herb-lemon.jpg";
import cloveImg from "@/assets/kb/herb-clove.jpg";
import allspiceImg from "@/assets/kb/herb-allspice.jpg";
import hingImg from "@/assets/kb/herb-hing.jpg";

export type HerbCategory = "Herb" | "Spice" | "Medicinal" | "Tea" | "Fruit";
export type Difficulty = "Easy" | "Moderate" | "Advanced";

export type Herb = {
  slug: string;
  name: string;
  local?: string;
  image: string;
  category: HerbCategory;
  nurseryIds: string[];
  description: string;
  cooking: string[];
  benefits: string[];
  care: {
    sunlight: string;
    watering: string;
    difficulty: Difficulty;
  };
};

export type Nursery = {
  id: string;
  name: string;
  city: string;
  address: string;
  hours: string;
  phone: string;
  image: string;
  ownerImage?: string;
  ownerName: string;
  tagline: string;
  about: string;
  quote: string;
  storyVideo?: string;
};

export type Booking = {
  id: string;
  customer: string;
  herb: string;
  nurseryId: string;
  phone: string;
  date: string;
  slot: string;
  status: "Pending" | "Accepted" | "Completed" | "Cancelled";
};

export type Grower = {
  nurseryId: string;
  name: string;
  nursery: string;
  city: string;
  image: string;
  tagline: string;
  quote: string;
};

export const nurseries: Nursery[] = [
  {
    id: "parijaat",
    name: "Parijaat Nursery",
    city: "Udaipur",
    address: "Parijaat Nursery, Udaipur, Rajasthan",
    hours: "8:00 AM – 7:00 PM",
    phone: "+91 98290 00001",
    image: parijaatCover,
    ownerImage: parijaatOwner,
    ownerName: "Parijaat Nursery Team",
    tagline: "Making home gardening simple for everyone.",
    about:
      "At Parijaat Nursery, the mission is to make growing herbs easy — even for first-time plant parents. The nursery specializes in kitchen herbs grown in innovative self-watering pots that reduce daily maintenance while helping plants stay healthy. Whether it's mint, parsley, thyme, rosemary, lemongrass, tulsi, curry leaves, or cardamom, every plant is selected to suit Indian homes and busy lifestyles.",
    quote:
      "If you can cook, you can grow. We make it easy for every family to enjoy fresh herbs at home.",
  },
  {
    id: "kalpvraksh",
    name: "Kalpvraksh Nursery",
    city: "Udaipur",
    address: "Kalpvraksh Nursery, Udaipur, Rajasthan",
    hours: "8:30 AM – 6:30 PM",
    phone: "+91 98290 00002",
    image: kalpvrakshCover,
    ownerName: "Kalpvraksh Nursery Team",
    tagline: "Rooted in tradition, growing for tomorrow.",
    about:
      "Kalpvraksh Nursery has been serving the gardening community with a focus on quality plants and sustainable growing practices. Every herb is nurtured with patience and care before it reaches someone's home. The nursery specializes in unique kitchen herbs such as Meetha Neem, Calcutta Paan, and Rosemary, carefully selected for their culinary and traditional value.",
    quote:
      "Every healthy plant starts with care, patience, and a love for nature.",
  },
  {
    id: "baroda",
    name: "Baroda Nursery",
    city: "Udaipur",
    address: "Baroda Nursery, Udaipur, Rajasthan",
    hours: "8:00 AM – 7:30 PM",
    phone: "+91 98290 00003",
    image: barodaCover,
    ownerImage: barodaTeam,
    ownerName: "Baroda Nursery Team",
    tagline: "Growing freshness, one herb at a time.",
    about:
      "Baroda Nursery was founded with a simple belief — every home deserves access to fresh, healthy herbs straight from nature. For years, the team has nurtured kitchen herbs and medicinal plants with care, helping families create greener homes and healthier kitchens. From aromatic rosemary and fragrant curry leaves to lemon, bay leaf, tulsi, cloves, and many other culinary herbs, every plant is carefully grown to thrive in home gardens.",
    quote:
      "A small herb plant in your kitchen can bring freshness to every meal and joy to every day.",
  },
];

export const herbs: Herb[] = [
  { slug: "curry-patta", name: "Curry Patta", local: "Kadi Patta", image: curryPattaImg, category: "Herb", nurseryIds: ["parijaat", "baroda"],
    description: "Aromatic South Indian staple, essential for tempering dals, curries and chutneys.",
    cooking: ["Tadka for dals", "South Indian curries", "Coconut chutney"],
    benefits: ["Rich in iron", "Supports hair health", "Aids digestion"],
    care: { sunlight: "6+ hours direct sun", watering: "Every 3 days", difficulty: "Moderate" } },
  { slug: "rosemary", name: "Rosemary", image: rosemaryImg, category: "Herb", nurseryIds: ["parijaat", "kalpvraksh", "baroda"],
    description: "Woody Mediterranean herb with a piney fragrance, perfect for roasts, breads and infused oils.",
    cooking: ["Roast potatoes", "Focaccia", "Grilled paneer & meats"],
    benefits: ["Rich in antioxidants", "May boost memory", "Aromatic infusions"],
    care: { sunlight: "6–8 hours sun", watering: "Weekly, deep watering", difficulty: "Moderate" } },
  { slug: "lemongrass", name: "Lemongrass", image: lemongrassImg, category: "Tea", nurseryIds: ["parijaat"],
    description: "Fragrant tropical grass with a bright citrus note — a staple for teas and Southeast Asian broths.",
    cooking: ["Lemongrass tea", "Thai curries", "Clear broths"],
    benefits: ["Aids digestion", "Calming aroma", "Rich in antioxidants"],
    care: { sunlight: "6+ hours sun", watering: "Every 2 days", difficulty: "Easy" } },
  { slug: "cardamom", name: "Cardamom", local: "Ilaichi", image: cardamomImg, category: "Spice", nurseryIds: ["parijaat"],
    description: "The queen of spices — warm, sweet and floral. Used in chai, desserts and biryanis.",
    cooking: ["Masala chai", "Kheer & desserts", "Biryani & pulao"],
    benefits: ["Freshens breath", "Aids digestion", "Warming spice"],
    care: { sunlight: "Partial shade", watering: "Keep soil moist", difficulty: "Advanced" } },
  { slug: "tej-patta", name: "Tej Patta", local: "Indian Bay Leaf", image: tejPattaImg, category: "Spice", nurseryIds: ["parijaat", "baroda"],
    description: "Warm, subtly clove-like leaf that layers depth into everyday Indian cooking.",
    cooking: ["Biryani & pulao", "Dal tadka", "Slow-cooked curries"],
    benefits: ["Aromatic in cooking", "Traditional digestive"],
    care: { sunlight: "5–6 hours sun", watering: "Weekly", difficulty: "Moderate" } },
  { slug: "thyme", name: "Thyme", image: thymeImg, category: "Herb", nurseryIds: ["parijaat"],
    description: "Delicate Mediterranean herb that shines in soups, stocks and slow roasts.",
    cooking: ["Soups & stocks", "Roasted vegetables", "Herb butter"],
    benefits: ["Antibacterial properties", "Aromatic", "Rich in vitamin C"],
    care: { sunlight: "6 hours sun", watering: "Weekly", difficulty: "Easy" } },
  { slug: "pudina", name: "Pudina", local: "Mint", image: pudinaImg, category: "Herb", nurseryIds: ["parijaat"],
    description: "Fast-growing aromatic herb, a must-have for chutneys, coolers and everyday cooking.",
    cooking: ["Pudina chutney", "Mint lemonade", "Raita"],
    benefits: ["Aids digestion", "Freshens breath", "Cooling effect"],
    care: { sunlight: "Partial sun, 4 hours", watering: "Daily light watering", difficulty: "Easy" } },
  { slug: "parsley", name: "Parsley", image: parsleyImg, category: "Herb", nurseryIds: ["parijaat"],
    description: "Fresh, grassy herb that lifts pastas, salads and grilled dishes with a clean finish.",
    cooking: ["Pasta & risotto", "Fresh salads", "Grilled seafood"],
    benefits: ["Rich in vitamin K", "Antioxidant", "Freshens breath"],
    care: { sunlight: "4–5 hours sun", watering: "Every 2 days", difficulty: "Easy" } },
  { slug: "tulsi", name: "Tulsi", local: "Holy Basil", image: tulsiImg, category: "Medicinal", nurseryIds: ["parijaat", "baroda"],
    description: "Sacred Indian herb prized for aromatic leaves and its long-standing role in wellness.",
    cooking: ["Tulsi chai", "Herbal infusions", "Kadha"],
    benefits: ["Supports immunity", "Adaptogenic", "Rich in antioxidants"],
    care: { sunlight: "5–6 hours direct sun", watering: "Every 2 days", difficulty: "Easy" } },
  { slug: "meetha-neem", name: "Meetha Neem", local: "Sweet Neem", image: meethaNeemImg, category: "Herb", nurseryIds: ["kalpvraksh"],
    description: "A prized aromatic leaf grown for its distinctive fragrance and traditional culinary use.",
    cooking: ["Tempering", "Chutneys", "South Indian preparations"],
    benefits: ["Rich in nutrients", "Aromatic", "Traditional wellness use"],
    care: { sunlight: "6+ hours sun", watering: "Every 3 days", difficulty: "Moderate" } },
  { slug: "calcutta-pan", name: "Calcutta Paan", image: calcuttaPanImg, category: "Medicinal", nurseryIds: ["kalpvraksh"],
    description: "Classic broad-leafed paan variety with a signature aroma and cultural significance.",
    cooking: ["Traditional paan", "Aromatic garnish"],
    benefits: ["Aromatic", "Cultural favorite"],
    care: { sunlight: "Partial shade", watering: "Keep evenly moist", difficulty: "Moderate" } },
  { slug: "lemon", name: "Lemon", image: lemonImg, category: "Fruit", nurseryIds: ["baroda"],
    description: "Fragrant home-grown lemon tree — fresh zest and juice, straight from your garden.",
    cooking: ["Lemonade", "Marinades", "Dals & chutneys"],
    benefits: ["Rich in vitamin C", "Aromatic zest", "Everyday flavor"],
    care: { sunlight: "6+ hours sun", watering: "Deep water weekly", difficulty: "Moderate" } },
  { slug: "clove", name: "Clove", local: "Laung", image: cloveImg, category: "Spice", nurseryIds: ["baroda"],
    description: "Warm, intensely aromatic spice — a cornerstone of garam masala and slow-cooked dishes.",
    cooking: ["Garam masala", "Biryani", "Chai"],
    benefits: ["Aromatic", "Traditional digestive", "Warming spice"],
    care: { sunlight: "Warm humid climate", watering: "Keep soil moist", difficulty: "Advanced" } },
  { slug: "allspice", name: "Allspice", image: allspiceImg, category: "Spice", nurseryIds: ["baroda"],
    description: "A single spice with the aroma of cinnamon, nutmeg and clove combined — versatile and warming.",
    cooking: ["Baked desserts", "Slow-cooked stews", "Spice rubs"],
    benefits: ["Aromatic", "Traditional use for digestion"],
    care: { sunlight: "Full sun", watering: "Weekly", difficulty: "Advanced" } },
  { slug: "hing", name: "Hing", local: "Asafoetida", image: hingImg, category: "Spice", nurseryIds: ["baroda"],
    description: "Pungent, savoury spice used in a pinch — transforms dals, sabzis and pickles.",
    cooking: ["Dal tadka", "Kadhi", "Pickles"],
    benefits: ["Traditional digestive aid", "Bold umami note"],
    care: { sunlight: "Full sun", watering: "Minimal", difficulty: "Advanced" } },
];

export const growers: Grower[] = nurseries.map((n) => ({
  nurseryId: n.id,
  name: n.ownerName,
  nursery: n.name,
  city: n.city,
  image: n.ownerImage ?? n.image,
  tagline: n.tagline,
  quote: n.quote,
}));

const customerNames = ["Ananya Rao","Vikram Singh","Priya Menon","Arjun Iyer","Neha Kapoor","Rohan Das","Sneha Kulkarni","Kabir Shah","Isha Verma","Aditya Nair","Riya Bose","Karan Malhotra","Meera Pillai","Devansh Jain","Tara Chowdhury","Nikhil Reddy","Sanya Gupta","Yash Bhatt","Anaya Sethi","Ravi Menon"];

export const bookings: Booking[] = customerNames.map((c, i) => {
  const herb = herbs[i % herbs.length];
  const nurseryId = herb.nurseryIds[i % herb.nurseryIds.length];
  const d = new Date();
  d.setDate(d.getDate() + (i - 5));
  const slots = ["09:00 AM","10:30 AM","12:00 PM","02:00 PM","04:30 PM","06:00 PM"];
  const statuses: Booking["status"][] = ["Pending","Accepted","Completed","Cancelled","Accepted","Pending"];
  return {
    id: `BK-${1000 + i}`,
    customer: c,
    herb: herb.name,
    nurseryId,
    phone: `+91 9${(800000000 + i * 12345).toString().slice(0, 9)}`,
    date: d.toISOString().slice(0, 10),
    slot: slots[i % slots.length],
    status: statuses[i % statuses.length],
  };
});

export const getHerb = (slug: string) => herbs.find((h) => h.slug === slug);
export const getNursery = (id: string) => nurseries.find((n) => n.id === id);
export const getHerbsForNursery = (id: string) => herbs.filter((h) => h.nurseryIds.includes(id));