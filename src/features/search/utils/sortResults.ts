import type { HotelSearchItem } from "../types/types";
import type { SearchSort } from "./searchParams";

export function sortResults(
  items: HotelSearchItem[],
  sort: SearchSort = "price_asc"
): HotelSearchItem[] {
  const copy = [...items];

  switch (sort) {
    case "price_asc":
      return copy.sort((a, b) => a.roomPrice - b.roomPrice);

    case "price_desc":
      return copy.sort((a, b) => b.roomPrice - a.roomPrice);

    case "rating_desc":
      return copy.sort((a, b) => (b.starRating ?? 0) - (a.starRating ?? 0));
    case "recommended":
    default:
      return copy;
  }
}
