import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  RouterProvider,
  createMemoryRouter,
  useLocation,
} from "react-router-dom";

import SearchFilters from "../components/SearchFilters";
import * as searchApi from "../api/search.api";
import type { Amenity, HotelSearchItem } from "../types/types";

// to spy on URL changes
function SearchSpy() {
  const location = useLocation();
  return <div data-testid="search-params">{location.search}</div>;
}

// Mock API responses
const mockAmenities: Amenity[] = [
  { id: 1, name: "Free Wi-Fi", description: "High-speed internet" },
  { id: 2, name: "Pool", description: "Swimming pool" },
];

const mockSearchResults: HotelSearchItem[] = [
  {
    hotelId: 101,
    hotelName: "Hotel A",
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
    checkInDate: "2024-01-01",
    checkOutDate: "2024-01-02",
  },
  {
    hotelId: 102,
    hotelName: "Hotel B",
    starRating: 4,
    latitude: 0,
    longitude: 0,
    roomPrice: 80,
    roomType: "Standard",
    cityName: "London",
    roomPhotoUrl: "",
    discount: 0,
    amenities: [],
    numberOfChildren: 0,
    numberOfAdults: 2,
    numberOfRooms: 1,
    checkInDate: "2024-01-01",
    checkOutDate: "2024-01-02",
  },
];

describe("SearchFilters URL wiring", () => {
  const renderFilters = (initialSearch: string = "?city=London") => {
    const router = createMemoryRouter(
      [
        {
          path: "/search",
          element: (
            <>
              <SearchFilters />
              <SearchSpy />
            </>
          ),
        },
      ],
      { initialEntries: [`/search${initialSearch}`] }
    );
    render(<RouterProvider router={router} />);
    return {
      getParams: () => {
        const search = screen.getByTestId("search-params").textContent ?? "";
        return new URLSearchParams(search);
      },
    };
  };

  it("updates stars param on checkbox click", async () => {
    vi.spyOn(searchApi, "fetchAmenities").mockResolvedValue(mockAmenities);
    vi.spyOn(searchApi, "fetchSearchResults").mockResolvedValue(
      mockSearchResults
    );
    const { getParams } = renderFilters();

    const star5 = await screen.findByLabelText(/5 stars/i);
    fireEvent.click(star5);
    expect(getParams().get("stars")).toBe("5");
  });

  it("updates amenities param on checkbox click", async () => {
    vi.spyOn(searchApi, "fetchAmenities").mockResolvedValue(mockAmenities);
    vi.spyOn(searchApi, "fetchSearchResults").mockResolvedValue(
      mockSearchResults
    );
    const { getParams } = renderFilters();

    const wifi = await screen.findByLabelText(/Free Wi-Fi/i);
    fireEvent.click(wifi);
    expect(getParams().get("amenities")).toBe("1");
  });

  it("updates roomType param on select change", async () => {
    vi.spyOn(searchApi, "fetchAmenities").mockResolvedValue(mockAmenities);
    vi.spyOn(searchApi, "fetchSearchResults").mockResolvedValue(
      mockSearchResults
    );
    const { getParams } = renderFilters();

    const roomTypeSelect = await screen.findByLabelText(/Room type/i);
    fireEvent.mouseDown(roomTypeSelect);
    const deluxeOption = await screen.findByRole("option", { name: /Deluxe/i });
    fireEvent.click(deluxeOption);
    expect(getParams().get("roomType")).toBe("Deluxe");
  });

  it("updates minPrice and maxPrice params on input", async () => {
    vi.spyOn(searchApi, "fetchAmenities").mockResolvedValue(mockAmenities);
    vi.spyOn(searchApi, "fetchSearchResults").mockResolvedValue(
      mockSearchResults
    );
    const { getParams } = renderFilters();

    const minPriceInput = screen.getByPlaceholderText("0");
    const maxPriceInput = screen.getByPlaceholderText("1000");

    fireEvent.change(minPriceInput, { target: { value: "100" } });
    expect(getParams().get("minPrice")).toBe("100");

    fireEvent.change(maxPriceInput, { target: { value: "500" } });
    expect(getParams().get("maxPrice")).toBe("500");
  });
});
