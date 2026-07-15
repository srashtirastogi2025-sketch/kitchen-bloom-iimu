// import { supabase } from "@/integrations/supabase/client";
// import type { Booking, Herb, Supplier } from "./types";

// function mapSupplier(r: any): Supplier {
//   return {
//     id: r.id, user_id: r.user_id, slug: r.slug, name: r.name,
//     city: r.city ?? "", address: r.address ?? "", hours: r.hours ?? "",
//     about: r.about ?? "", rating: Number(r.rating ?? 0), image_url: r.image_url ?? null,
//   };
// }

// function mapHerb(r: any): Herb {
//   return {
//     id: r.id, supplier_id: r.supplier_id, slug: r.slug, name: r.name, local: r.local,
//     image_url: r.image_url ?? null, price: Number(r.price ?? 0),
//     availability: r.availability ?? "In stock", pickup: !!r.pickup,
//     description: r.description ?? "", benefits: r.benefits ?? [],
//     cooking: r.cooking ?? [], care: r.care ?? {}, stock: Number(r.stock ?? 0),
//   };
// }

// export async function fetchSuppliers(): Promise<Supplier[]> {
//   const { data, error } = await supabase.from("suppliers").select("*").order("name");
//   if (error) throw error;
//   return (data ?? []).map(mapSupplier);
// }

// export async function fetchHerbs(): Promise<Herb[]> {
//   const { data, error } = await supabase.from("herbs").select("*").order("name");
//   if (error) throw error;
//   return (data ?? []).map(mapHerb);
// }

// export async function fetchHerbBySlug(slug: string): Promise<Herb | null> {
//   const { data, error } = await supabase.from("herbs").select("*").eq("slug", slug).limit(1).maybeSingle();
//   if (error) throw error;
//   return data ? mapHerb(data) : null;
// }

// export async function fetchSupplierByUserId(userId: string): Promise<Supplier | null> {
//   const { data, error } = await supabase.from("suppliers").select("*").eq("user_id", userId).maybeSingle();
//   if (error) throw error;
//   return data ? mapSupplier(data) : null;
// }

// export async function fetchHerbsBySupplier(supplierId: string): Promise<Herb[]> {
//   const { data, error } = await supabase.from("herbs").select("*").eq("supplier_id", supplierId).order("created_at", { ascending: true });
//   if (error) throw error;
//   return (data ?? []).map(mapHerb);
// }

// export async function fetchBookingsForSupplier(supplierId: string): Promise<Booking[]> {
//   const { data, error } = await supabase.from("bookings").select("*").eq("supplier_id", supplierId).order("date", { ascending: false });
//   if (error) throw error;
//   return (data ?? []) as Booking[];
// }

// const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

// export async function uploadImage(bucket: "supplier-images" | "herb-images", userId: string, file: File): Promise<string> {
//   const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
//   const path = `${userId}/${crypto.randomUUID()}.${ext}`;
//   const { error: upErr } = await supabase.storage.from(bucket).upload(path, file, { upsert: false, contentType: file.type });
//   if (upErr) throw upErr;
//   const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, TEN_YEARS);
//   if (error || !data?.signedUrl) throw error ?? new Error("Failed to sign URL");
//   return data.signedUrl;
// }
import { supabase } from "@/integrations/supabase/client";
import type { Booking, Herb, Supplier } from "./types";

function mapSupplier(r: any): Supplier {
  return {
    id: r.id, user_id: r.user_id, slug: r.slug, name: r.name,
    city: r.city ?? "", address: r.address ?? "", hours: r.hours ?? "",
    about: r.about ?? "", rating: Number(r.rating ?? 0), image_url: r.image_url ?? null,
  };
}

function mapHerb(r: any): Herb {
  return {
    id: r.id, supplier_id: r.supplier_id, slug: r.slug, name: r.name, local: r.local,
    image_url: r.image_url ?? null, price: Number(r.price ?? 0),
    availability: r.availability ?? "In stock", pickup: !!r.pickup,
    description: r.description ?? "", benefits: r.benefits ?? [],
    cooking: r.cooking ?? [], care: r.care ?? {}, stock: Number(r.stock ?? 0),
  };
}

// NEW: Fetch only your 3 initial featured suppliers (for landing page)
export async function fetchFeaturedSuppliers(): Promise<Supplier[]> {
  // These IDs are your 3 initial suppliers from the database migration
  const FEATURED_IDS = [
    '11111111-1111-1111-1111-111111111101', // Parijaat Nursery
    '11111111-1111-1111-1111-111111111102', // Kalpvraksh Nursery
    '11111111-1111-1111-1111-111111111103', // Baroda Nursery
  ];
  
  const { data, error } = await supabase
    .from("suppliers")
    .select("*")
    .in("id", FEATURED_IDS)
    .order("name");  // Sort the 3 alphabetically
  
  if (error) throw error;
  return (data ?? []).map(mapSupplier);
}

// UPDATED: Fetch all suppliers (including new signups) for nurseries page
export async function fetchSuppliers(): Promise<Supplier[]> {
  const { data, error } = await supabase.from("suppliers").select("*").order("name");
  if (error) throw error;
  return (data ?? []).map(mapSupplier);
}

// BONUS: Alias for clarity
export async function fetchAllSuppliers(): Promise<Supplier[]> {
  return fetchSuppliers();
}

export async function fetchHerbs(): Promise<Herb[]> {
  const { data, error } = await supabase.from("herbs").select("*").order("name");
  if (error) throw error;
  return (data ?? []).map(mapHerb);
}

export async function fetchHerbBySlug(slug: string): Promise<Herb | null> {
  const { data, error } = await supabase.from("herbs").select("*").eq("slug", slug).limit(1).maybeSingle();
  if (error) throw error;
  return data ? mapHerb(data) : null;
}

export async function fetchSupplierByUserId(userId: string): Promise<Supplier | null> {
  const { data, error } = await supabase.from("suppliers").select("*").eq("user_id", userId).maybeSingle();
  if (error) throw error;
  return data ? mapSupplier(data) : null;
}

export async function fetchHerbsBySupplier(supplierId: string): Promise<Herb[]> {
  const { data, error } = await supabase.from("herbs").select("*").eq("supplier_id", supplierId).order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapHerb);
}

export async function fetchBookingsForSupplier(supplierId: string): Promise<Booking[]> {
  const { data, error } = await supabase.from("bookings").select("*").eq("supplier_id", supplierId).order("date", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Booking[];
}

const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

export async function uploadImage(bucket: "supplier-images" | "herb-images", userId: string, file: File): Promise<string> {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const path = `${userId}/${crypto.randomUUID()}.${ext}`;
  const { error: upErr } = await supabase.storage.from(bucket).upload(path, file, { upsert: false, contentType: file.type });
  if (upErr) throw upErr;
  const { data, error } = await supabase.storage.from(bucket).createSignedUrl(path, TEN_YEARS);
  if (error || !data?.signedUrl) throw error ?? new Error("Failed to sign URL");
  return data.signedUrl;
}