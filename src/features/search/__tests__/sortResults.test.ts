import { describe, expect, it } from "vitest";
import { sortResults } from "../utils/sortResults";
import type { HotelSearchItem } from "../types/types";

const hotels: HotelSearchItem[] = [
  {
    hotelId: 1,
    hotelName: "A",
    starRating: 3,
    latitude: 0,
    longitude: 0,
    roomPrice: 300,
    roomType: "Deluxe",
    cityName: "Nablus",
    roomPhotoUrl: "/1.jpg",
    discount: 0,
    amenities: [],
    numberOfChildren: 0,
    numberOfAdults: 2,
    numberOfRooms: 1,
    checkInDate: "2026-04-22",
    checkOutDate: "2026-04-25",
  },
  {
    hotelId: 2,
    hotelName: "B",
    starRating: 5,
    latitude: 0,
    longitude: 0,
    roomPrice: 100,
    roomType: "Standard",
    cityName: "Jenin",
    roomPhotoUrl: "/2.jpg",
    discount: 0,
    amenities: [],
    numberOfChildren: 0,
    numberOfAdults: 2,
    numberOfRooms: 1,
    checkInDate: "2026-04-22",
    checkOutDate: "2026-04-25",
  },
  {
    hotelId: 3,
    hotelName: "C",
    starRating: 4,
    latitude: 0,
    longitude: 0,
    roomPrice: 200,
    roomType: "Suite",
    cityName: "Ramallah",
    roomPhotoUrl: "/3.jpg",
    discount: 0,
    amenities: [],
    numberOfChildren: 0,
    numberOfAdults: 2,
    numberOfRooms: 1,
    checkInDate: "2026-04-22",
    checkOutDate: "2026-04-25",
  },
];

describe("sortResults", () => {
  it("sorts by price ascending", () => {
    const result = sortResults(hotels, "price_asc");
    expect(result.map((h) => h.hotelId)).toEqual([2, 3, 1]);
  });

  it("sorts by price descending", () => {
    const result = sortResults(hotels, "price_desc");
    expect(result.map((h) => h.hotelId)).toEqual([1, 3, 2]);
  });

  it("sorts by rating descending", () => {
    const result = sortResults(hotels, "rating_desc");
    expect(result.map((h) => h.hotelId)).toEqual([2, 3, 1]);
  });

  it("returns copy as-is for recommended", () => {
    const result = sortResults(hotels, "recommended");
    expect(result.map((h) => h.hotelId)).toEqual([1, 2, 3]);
    expect(result).not.toBe(hotels);
  });

  it("defaults to price ascending when sort is omitted", () => {
    const result = sortResults(hotels);
    expect(result.map((h) => h.hotelId)).toEqual([2, 3, 1]);
  });
});
