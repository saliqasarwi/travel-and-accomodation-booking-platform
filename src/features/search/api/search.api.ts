import type { HotelSearchItem, Amenity } from "../types/types";
export type SearchRequest = {
  city?: string;
  checkInDate?: string;
  checkOutDate?: string;
  adults?: number;
  children?: number;
  numberOfRooms?: number;
};

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchSearchResults(
  req: SearchRequest,
  signal?: AbortSignal
) {
  const params = new URLSearchParams();

  if (req.city) params.set("city", req.city);
  if (req.checkInDate) params.set("checkInDate", req.checkInDate);
  if (req.checkOutDate) params.set("checkOutDate", req.checkOutDate);
  if (typeof req.adults === "number") params.set("adults", String(req.adults));
  if (typeof req.children === "number")
    params.set("children", String(req.children));
  if (typeof req.numberOfRooms === "number")
    params.set("numberOfRooms", String(req.numberOfRooms));

  const res = await fetch(`${BASE_URL}/home/search?${params.toString()}`, {
    signal,
  });

  if (!res.ok) {
    throw new Error(`Search request failed (${res.status})`);
  }

  return (await res.json()) as HotelSearchItem[];
}

export async function fetchAmenities(signal?: AbortSignal) {
  const res = await fetch(`${BASE_URL}/search-results/amenities`, { signal });

  if (!res.ok) {
    throw new Error(`Amenities request failed (${res.status})`);
  }

  return (await res.json()) as Amenity[];
}
