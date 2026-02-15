import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HotelResults from "../components/HotelResults";
import * as searchApi from "../api/search.api";
import type { HotelSearchItem } from "../types/types";

let lastObserverCallback: IntersectionObserverCallback | null = null;

// Mock IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: readonly number[] = [];
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
  takeRecords = vi.fn();

  constructor(callback: IntersectionObserverCallback) {
    lastObserverCallback = callback;
  }
}

vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

const generateMockHotels = (count: number): HotelSearchItem[] => {
  return Array.from({ length: count }, (_, i) => ({
    hotelId: i + 1,
    hotelName: `Hotel ${i + 1}`,
    starRating: 5,
    latitude: 0,
    longitude: 0,
    roomPrice: 100,
    roomType: "Deluxe",
    cityName: "London",
    roomPhotoUrl: "",
    discount: 0,
    amenities: [],
    numberOfChildren: 0,
    numberOfAdults: 2,
    numberOfRooms: 1,
    checkInDate: "2026-01-01",
    checkOutDate: "2026-01-02",
  }));
};

describe("HotelResults Infinite Scroll", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    lastObserverCallback = null;
  });

  it("reveals more results when sentinel intersects", async () => {
    const mockHotels = generateMockHotels(15); // More than PAGE_SIZE (6)
    vi.spyOn(searchApi, "fetchSearchResults").mockResolvedValue(mockHotels);

    render(
      <MemoryRouter initialEntries={["/search?city=London"]}>
        <HotelResults />
      </MemoryRouter>
    );

    // Initial load: should show 6 hotels
    const hotels = await screen.findAllByText(/Hotel \d+/);
    expect(hotels).toHaveLength(6);

    // Verify sentinel exists because there are more results
    const sentinel = screen.getByTestId("infinite-scroll-sentinel");
    expect(sentinel).toBeDefined();

    // Trigger intersection
    if (!lastObserverCallback) {
      throw new Error("IntersectionObserver callback not captured");
    }

    act(() => {
      lastObserverCallback!(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    // Should now show 12 hotels (6 + 6)
    const moreHotels = await screen.findAllByText(/Hotel \d+/);
    expect(moreHotels).toHaveLength(12);

    // Trigger intersection again
    act(() => {
      lastObserverCallback!(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    // Should now show all 15 hotels
    const allHotels = await screen.findAllByText(/Hotel \d+/);
    expect(allHotels).toHaveLength(15);

    // Sentinel should be gone now
    expect(screen.queryByTestId("infinite-scroll-sentinel")).toBeNull();
  });
});
