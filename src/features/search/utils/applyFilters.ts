import type { HotelSearchItem } from "../types/types";
import type { SearchQuery } from "./searchParams";

export function applyFilters(
  items: HotelSearchItem[],
  query: SearchQuery
): HotelSearchItem[] {
  const minPrice = query.minPrice;
  const maxPrice = query.maxPrice;

  const stars = query.stars;
  const roomType = query.roomType?.trim();
  const amenities = query.amenities;

  return items.filter((r) => {
    if (typeof minPrice === "number" && r.roomPrice < minPrice) return false;
    if (typeof maxPrice === "number" && r.roomPrice > maxPrice) return false;

    if (stars?.length && !stars.includes(r.starRating)) return false;

    if (roomType && r.roomType !== roomType) return false;

    if (amenities?.length) {
      const ids = r.amenities?.map((a) => a.id) ?? [];
      const hasAll = amenities.every((id) => ids.includes(id));
      if (!hasAll) return false;
    }

    return true;
  });
}
