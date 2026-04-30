import { beforeEach, describe, expect, it, vi } from "vitest";
import { loadCartState, saveCartState } from "../cart.storage";

describe("cart.storage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("returns empty cart when localStorage is empty", () => {
    expect(loadCartState()).toEqual({ items: [] });
  });

  it("loads saved cart state from localStorage", () => {
    const state = {
      items: [
        {
          id: "1",
          hotelId: 1,
          hotelName: "Cinema Hotel",
          cityName: "Jenin",
          starRating: 5,
          roomType: "Deluxe",
          roomPhotoUrl: "/room.jpg",
          checkInDate: "2026-04-22",
          checkOutDate: "2026-04-25",
          adults: 2,
          children: 1,
          numberOfRooms: 1,
          pricePerNight: 150,
          discount: 0,
        },
      ],
    };

    localStorage.setItem("travel_cart_v1", JSON.stringify(state));

    expect(loadCartState()).toEqual(state);
  });

  it("returns empty cart when stored data is invalid JSON", () => {
    localStorage.setItem("travel_cart_v1", "invalid-json");

    expect(loadCartState()).toEqual({ items: [] });
  });

  it("returns empty cart when parsed data has no items", () => {
    localStorage.setItem("travel_cart_v1", JSON.stringify({ wrong: [] }));

    expect(loadCartState()).toEqual({ items: [] });
  });

  it("saves cart state to localStorage", () => {
    const state = {
      items: [
        {
          id: "1",
          hotelId: 1,
          hotelName: "Cinema Hotel",
          cityName: "Jenin",
          starRating: 5,
          roomType: "Deluxe",
          checkInDate: "2026-04-22",
          checkOutDate: "2026-04-25",
          adults: 2,
          children: 0,
          numberOfRooms: 1,
          pricePerNight: 150,
        },
      ],
    };

    saveCartState(state);

    expect(localStorage.getItem("travel_cart_v1")).toBe(JSON.stringify(state));
  });

  it("ignores localStorage setItem errors", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Storage error");
    });

    expect(() => saveCartState({ items: [] })).not.toThrow();
  });
});
