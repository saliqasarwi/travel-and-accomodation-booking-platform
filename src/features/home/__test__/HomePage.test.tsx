import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import HomePage from "../pages/HomePage";

const mockGetFeaturedDeals = vi.fn();
const mockGetTrendingDestinations = vi.fn();
const mockGetRecentHotels = vi.fn();

vi.mock("react-i18next", () => {
  const t = (key: string) => {
    const translations: Record<string, string> = {
      "home.heroTitle": "Find your perfect stay",
      "home.heroSubtitle":
        "Discover hotels, featured deals, and trending destinations for your next trip",
      "home.loadFailed": "Failed to load home data",
    };

    return translations[key] ?? key;
  };

  return {
    useTranslation: () => ({ t }),
  };
});

vi.mock("../api/home.api", () => ({
  getFeaturedDeals: (...args: unknown[]) => mockGetFeaturedDeals(...args),
  getTrendingDestinations: (...args: unknown[]) =>
    mockGetTrendingDestinations(...args),
  getRecentHotels: (...args: unknown[]) => mockGetRecentHotels(...args),
}));

vi.mock("../../../shared/components/HomeSearchBar/HomeSearchBar", () => ({
  default: () => <div>Home Search Bar</div>,
}));

vi.mock("../components/FeaturedDeals", () => ({
  default: ({ items }: { items: unknown[] }) => (
    <div>Featured Deals Component ({items.length})</div>
  ),
}));

vi.mock("../components/TrendingDestinations", () => ({
  default: ({ items }: { items: unknown[] }) => (
    <div>Trending Destinations Component ({items.length})</div>
  ),
}));

vi.mock("../components/RecentlyVisited", () => ({
  default: ({ items }: { items: unknown[] }) => (
    <div>Recently Visited Component ({items.length})</div>
  ),
}));

vi.mock("react-icons/bs", () => ({
  BsMouse: () => <span>Mouse Icon</span>,
}));

vi.mock("@mui/material", async () => {
  const actual =
    await vi.importActual<typeof import("@mui/material")>("@mui/material");

  return {
    ...actual,
    Skeleton: ({ height }: { height?: number }) => (
      <div data-testid={`skeleton-${height ?? "default"}`}>Skeleton</div>
    ),
  };
});

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading skeletons initially", () => {
    mockGetFeaturedDeals.mockReturnValue(new Promise(() => {}));
    mockGetTrendingDestinations.mockReturnValue(new Promise(() => {}));
    mockGetRecentHotels.mockReturnValue(new Promise(() => {}));

    render(<HomePage />);

    expect(screen.getByText("Find your perfect stay")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Discover hotels, featured deals, and trending destinations for your next trip"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Home Search Bar")).toBeInTheDocument();

    expect(screen.getByTestId("skeleton-300")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-360")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-260")).toBeInTheDocument();
  });

  it("renders child sections after successful API calls", async () => {
    mockGetFeaturedDeals.mockResolvedValue([
      { hotelId: 1, hotelName: "Royal Hotel" },
    ]);
    mockGetTrendingDestinations.mockResolvedValue([
      { cityId: 1, cityName: "Paris" },
    ]);
    mockGetRecentHotels.mockResolvedValue([
      { hotelId: 1, hotelName: "Royal Hotel" },
    ]);

    render(<HomePage />);

    await waitFor(() => {
      expect(
        screen.getByText("Featured Deals Component (1)")
      ).toBeInTheDocument();
    });

    expect(
      screen.getByText("Trending Destinations Component (1)")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Recently Visited Component (1)")
    ).toBeInTheDocument();

    expect(mockGetFeaturedDeals).toHaveBeenCalledTimes(1);
    expect(mockGetTrendingDestinations).toHaveBeenCalledTimes(1);
    expect(mockGetRecentHotels).toHaveBeenCalledWith(2);
  });

  it("renders error alert when API call fails with message", async () => {
    mockGetFeaturedDeals.mockRejectedValue(new Error("Network error"));
    mockGetTrendingDestinations.mockResolvedValue([]);
    mockGetRecentHotels.mockResolvedValue([]);

    render(<HomePage />);

    expect(await screen.findByText("Network error")).toBeInTheDocument();
  });

  it("renders fallback error message when thrown value has no message", async () => {
    mockGetFeaturedDeals.mockRejectedValue("bad error");
    mockGetTrendingDestinations.mockResolvedValue([]);
    mockGetRecentHotels.mockResolvedValue([]);

    render(<HomePage />);

    expect(
      await screen.findByText("Failed to load home data")
    ).toBeInTheDocument();
  });

  it("scrolls to featured deals when mouse icon area is clicked", async () => {
    mockGetFeaturedDeals.mockResolvedValue([]);
    mockGetTrendingDestinations.mockResolvedValue([]);
    mockGetRecentHotels.mockResolvedValue([]);

    const scrollIntoViewMock = vi.fn();
    const getElementByIdSpy = vi
      .spyOn(document, "getElementById")
      .mockReturnValue({
        scrollIntoView: scrollIntoViewMock,
      } as unknown as HTMLElement);

    render(<HomePage />);

    fireEvent.click(screen.getByText("Mouse Icon"));

    expect(getElementByIdSpy).toHaveBeenCalledWith("featured-deals");
    expect(scrollIntoViewMock).toHaveBeenCalledWith({
      behavior: "smooth",
    });

    getElementByIdSpy.mockRestore();
  });
});
