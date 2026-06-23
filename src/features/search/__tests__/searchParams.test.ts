import { describe, expect, it } from "vitest";
import { createSearchParams } from "react-router-dom";
import {
  parseSearchParams,
  setSearchParamsFromPatch,
} from "../utils/searchParams";

describe("parseSearchParams", () => {
  it("parses full search params correctly", () => {
    const params = new URLSearchParams({
      city: "Jenin",
      checkInDate: "2026-04-22",
      checkOutDate: "2026-04-25",
      adults: "2",
      children: "1",
      numberOfRooms: "3",
      minPrice: "100",
      maxPrice: "500",
      stars: "3,4,5",
      amenities: "1,2",
      roomType: "Deluxe",
      sort: "price_asc",
    });

    expect(parseSearchParams(params)).toEqual({
      city: "Jenin",
      checkInDate: "2026-04-22",
      checkOutDate: "2026-04-25",
      adults: 2,
      children: 1,
      numberOfRooms: 3,
      minPrice: 100,
      maxPrice: 500,
      stars: [3, 4, 5],
      amenities: [1, 2],
      roomType: "Deluxe",
      sort: "price_asc",
    });
  });

  it("returns defaults when params are missing", () => {
    const params = new URLSearchParams();

    expect(parseSearchParams(params)).toEqual({
      city: "",
      checkInDate: "",
      checkOutDate: "",
      adults: 1,
      children: 0,
      numberOfRooms: 1,
      minPrice: undefined,
      maxPrice: undefined,
      stars: undefined,
      roomType: undefined,
      amenities: undefined,
      sort: undefined,
    });
  });
});

describe("setSearchParamsFromPatch", () => {
  it("sets primitive values", () => {
    const current = new URLSearchParams("city=Jenin");
    const next = setSearchParamsFromPatch(current, {
      minPrice: 100,
      roomType: "Deluxe",
      sort: "price_desc",
    });

    const result = createSearchParams(next);

    expect(result.toString()).toContain("city=Jenin");
    expect(result.get("minPrice")).toBe("100");
    expect(result.get("roomType")).toBe("Deluxe");
    expect(result.get("sort")).toBe("price_desc");
  });

  it("sets array values as comma-separated strings", () => {
    const current = new URLSearchParams();
    const next = setSearchParamsFromPatch(current, {
      stars: [3, 4, 5],
      amenities: [1, 2],
    });

    const result = createSearchParams(next);

    expect(result.get("stars")).toBe("3,4,5");
    expect(result.get("amenities")).toBe("1,2");
  });

  it("removes keys for undefined, empty string, and empty arrays", () => {
    const current = new URLSearchParams({
      minPrice: "100",
      roomType: "Deluxe",
      stars: "5",
      amenities: "1,2",
    });

    const next = setSearchParamsFromPatch(current, {
      minPrice: undefined,
      roomType: "",
      stars: [],
      amenities: [],
    });

    const result = createSearchParams(next);

    expect(result.has("minPrice")).toBe(false);
    expect(result.has("roomType")).toBe(false);
    expect(result.has("stars")).toBe(false);
    expect(result.has("amenities")).toBe(false);
  });
});
