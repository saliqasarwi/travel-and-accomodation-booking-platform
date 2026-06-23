import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import HotelResults from "../components/HotelResults";
import type { HotelSearchItem } from "../types/types";

const mockFetchSearchResults = vi.fn();
const mockApplyFilters = vi.fn();
const mockSortResults = vi.fn();
const mockResetPage = vi.fn();
const mockSentinelRef = vi.fn();

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      if (key === "search.loadFailed") return "Failed to load search results";
      if (key === "search.noResults") return "No results found";
      if (key === "search.noResultsHint") return "Try changing your filters";
      return key;
    },
  }),
}));

vi.mock("../api/search.api", () => ({
  fetchSearchResults: (...args: unknown[]) => mockFetchSearchResults(...args),
}));

vi.mock("../utils/applyFilters", () => ({
  applyFilters: (...args: unknown[]) => mockApplyFilters(...args),
}));

vi.mock("../utils/sortResults", () => ({
  sortResults: (...args: unknown[]) => mockSortResults(...args),
}));

vi.mock("../hooks/useInfiniteScroll", () => ({
  default: () => ({
    sentinelRef: mockSentinelRef,
    page: 1,
    resetPage: mockResetPage,
  }),
}));

vi.mock("../components/HotelCard", () => ({
  default: ({ hotel }: { hotel: HotelSearchItem }) => (
    <div>Hotel Card: {hotel.hotelName}</div>
  ),
}));

vi.mock("../components/SearchSortBar", () => ({
  default: ({ resultsCount }: { resultsCount: number }) => (
    <div>Sort Bar: {resultsCount}</div>
  ),
}));

const hotelsMock: HotelSearchItem[] = [
  {
    hotelId: 1,
    hotelName: "Royal Hotel",
    starRating: 5,
    latitude: 0,
    longitude: 0,
    roomPrice: 300,
    roomType: "Deluxe",
    cityName: "Jenin",
    roomPhotoUrl: "/hotel-1.jpg",
    discount: 10,
    amenities: [{ id: 1, name: "WiFi", description: "Fast WiFi" }],
    numberOfChildren: 1,
    numberOfAdults: 2,
    numberOfRooms: 1,
    checkInDate: "2026-04-22",
    checkOutDate: "2026-04-25",
  },
  {
    hotelId: 2,
    hotelName: "City Inn",
    starRating: 4,
    latitude: 0,
    longitude: 0,
    roomPrice: 150,
    roomType: "Standard",
    cityName: "Nablus",
    roomPhotoUrl: "/hotel-2.jpg",
    discount: 0,
    amenities: [],
    numberOfChildren: 0,
    numberOfAdults: 2,
    numberOfRooms: 1,
    checkInDate: "2026-04-22",
    checkOutDate: "2026-04-25",
  },
];

function renderWithRouter(route = "/search?city=Jenin") {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <HotelResults />
    </MemoryRouter>
  );
}

describe("HotelResults", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockApplyFilters.mockImplementation((items) => items);
    mockSortResults.mockImplementation((items) => items);
  });

  it("renders loading state initially", () => {
    mockFetchSearchResults.mockReturnValue(new Promise(() => {}));

    renderWithRouter();

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("fetches results using city search param", async () => {
    mockFetchSearchResults.mockResolvedValue(hotelsMock);

    renderWithRouter("/search?city=Jenin");

    await waitFor(() => {
      expect(mockFetchSearchResults).toHaveBeenCalled();
    });

    expect(mockFetchSearchResults).toHaveBeenCalledWith(
      { city: "Jenin" },
      expect.any(AbortSignal)
    );
  });

  it("renders hotel cards and sort bar after successful fetch", async () => {
    mockFetchSearchResults.mockResolvedValue(hotelsMock);

    renderWithRouter();

    expect(
      await screen.findByText("Hotel Card: Royal Hotel")
    ).toBeInTheDocument();
    expect(screen.getByText("Hotel Card: City Inn")).toBeInTheDocument();
    expect(screen.getByText("Sort Bar: 2")).toBeInTheDocument();

    expect(mockApplyFilters).toHaveBeenCalled();
    expect(mockSortResults).toHaveBeenCalled();
    expect(mockResetPage).toHaveBeenCalled();
  });

  it("renders empty state when no results are available", async () => {
    mockFetchSearchResults.mockResolvedValue([]);
    mockApplyFilters.mockReturnValue([]);
    mockSortResults.mockReturnValue([]);

    renderWithRouter();

    expect(await screen.findByText("No results found")).toBeInTheDocument();
    expect(screen.getByText("Try changing your filters")).toBeInTheDocument();
  });

  it("renders error message when fetch fails", async () => {
    mockFetchSearchResults.mockRejectedValue(new Error("Network error"));

    renderWithRouter();

    expect(
      await screen.findByText("Failed to load search results")
    ).toBeInTheDocument();
  });

  it("renders infinite scroll sentinel when there are more than one page of hotels", async () => {
    const manyHotels = Array.from({ length: 7 }, (_, index) => ({
      ...hotelsMock[0],
      hotelId: index + 1,
      hotelName: `Hotel ${index + 1}`,
    }));

    mockFetchSearchResults.mockResolvedValue(manyHotels);

    renderWithRouter();

    expect(await screen.findByText("Hotel Card: Hotel 1")).toBeInTheDocument();
    expect(screen.getByTestId("infinite-scroll-sentinel")).toBeInTheDocument();
  });

  it("does not render infinite scroll sentinel when all hotels are visible", async () => {
    mockFetchSearchResults.mockResolvedValue(hotelsMock);

    renderWithRouter();

    expect(
      await screen.findByText("Hotel Card: Royal Hotel")
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId("infinite-scroll-sentinel")
    ).not.toBeInTheDocument();
  });
});
