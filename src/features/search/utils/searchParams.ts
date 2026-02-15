import type { URLSearchParamsInit } from "react-router-dom";

export type SearchQuery = {
  city: string;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  numberOfRooms: number;

  minPrice?: number;
  maxPrice?: number;
  stars?: number[];
  roomType?: string;
  amenities?: number[];
};

export function parseSearchParams(searchParams: URLSearchParams): SearchQuery {
  return {
    city: searchParams.get("city") ?? "",
    checkInDate: searchParams.get("checkInDate") ?? "",
    checkOutDate: searchParams.get("checkOutDate") ?? "",
    adults: Number(searchParams.get("adults") ?? 1),
    children: Number(searchParams.get("children") ?? 0),
    numberOfRooms: Number(searchParams.get("numberOfRooms") ?? 1),

    minPrice: searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined,

    maxPrice: searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined,

    stars: searchParams.get("stars")
      ? searchParams
          .get("stars")!
          .split(",")
          .map((s) => Number(s))
      : undefined,

    roomType: searchParams.get("roomType") ?? undefined,

    amenities: searchParams.get("amenities")
      ? searchParams
          .get("amenities")!
          .split(",")
          .map((a) => Number(a))
      : undefined,
  };
}
export function setSearchParamsFromPatch(
  current: URLSearchParams,
  patch: Partial<SearchQuery>
): URLSearchParamsInit {
  const next = new URLSearchParams(current);

  Object.entries(patch).forEach(([key, value]) => {
    if (
      value === undefined ||
      value === null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    ) {
      next.delete(key);
      return;
    }

    if (Array.isArray(value)) {
      next.set(key, value.join(","));
      return;
    }

    next.set(key, String(value));
  });

  return next;
}
