import { describe, expect, it } from "vitest";
import { applyFilters } from "../utils/applyFilters";
import type { HotelSearchItem } from "../types/types";

const hotels: HotelSearchItem[] = [
  {
    hotelId: 1,
    hotelName: "Royal Hotel",
    starRating: 5,
    latitude: 0,
    longitude: 0,
    roomPrice: 300,
    roomType: "Deluxe",
    cityName: "Jenin",
    roomPhotoUrl: "/1.jpg",
    discount: 10,
    amenities: [
      { id: 1, name: "WiFi", description: "Fast WiFi" },
      { id: 2, name: "Pool", description: "Outdoor pool" },
    ],
    numberOfChildren: 1,
    numberOfAdults: 2,
    numberOfRooms: 1,
    checkInDate: "2026-04-22",
    checkOutDate: "2026-04-25",
  },
  {
    hotelId: 2,
    hotelName: "City Inn",
    starRating: 3,
    latitude: 0,
    longitude: 0,
    roomPrice: 120,
    roomType: "Standard",
    cityName: "Jenin",
    roomPhotoUrl: "/2.jpg",
    discount: 0,
    amenities: [{ id: 1, name: "WiFi", description: "Fast WiFi" }],
    numberOfChildren: 0,
    numberOfAdults: 2,
    numberOfRooms: 1,
    checkInDate: "2026-04-22",
    checkOutDate: "2026-04-25",
  },
];

describe("applyFilters", () => {
  it("returns all items when no filters are provided", () => {
    expect(applyFilters(hotels, {})).toEqual(hotels);
  });

  it("filters by minPrice", () => {
    const result = applyFilters(hotels, { minPrice: 200 });
    expect(result).toEqual([hotels[0]]);
  });

  it("filters by maxPrice", () => {
    const result = applyFilters(hotels, { maxPrice: 150 });
    expect(result).toEqual([hotels[1]]);
  });

  it("filters by stars", () => {
    const result = applyFilters(hotels, { stars: [5] });
    expect(result).toEqual([hotels[0]]);
  });

  it("filters by roomType", () => {
    const result = applyFilters(hotels, { roomType: "Standard" });
    expect(result).toEqual([hotels[1]]);
  });

  it("filters by amenities requiring all selected amenities", () => {
    const result = applyFilters(hotels, { amenities: [1, 2] });
    expect(result).toEqual([hotels[0]]);
  });

  it("returns empty array when no hotel matches all amenities", () => {
    const result = applyFilters(hotels, { amenities: [2] });
    expect(result).toEqual([hotels[0]]);
  });

  it("returns empty array when no hotel matches combined filters", () => {
    const result = applyFilters(hotels, {
      minPrice: 400,
      stars: [5],
    });
    expect(result).toEqual([]);
  });
});
