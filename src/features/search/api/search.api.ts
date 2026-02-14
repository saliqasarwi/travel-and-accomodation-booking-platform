import { httpClient } from "@shared/api";

import type { HotelSearchItem, Amenity } from "../types/types";
export type SearchRequest = {
  city?: string;
  checkInDate?: string;
  checkOutDate?: string;
  adults?: number;
  children?: number;
  numberOfRooms?: number;
};

export async function fetchSearchResults(
  req: SearchRequest,
  signal?: AbortSignal
): Promise<HotelSearchItem[]> {
  const res = await httpClient.get<HotelSearchItem[]>("/home/search", {
    params: req,
    signal,
  });

  return res.data;
}

export async function fetchAmenities(signal?: AbortSignal): Promise<Amenity[]> {
  const res = await httpClient.get<Amenity[]>("/search-results/amenities", {
    signal,
  });

  return res.data;
}
