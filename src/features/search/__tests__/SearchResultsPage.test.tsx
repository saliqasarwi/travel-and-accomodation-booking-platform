import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import SearchResultsPage from "../pages/SearchResultsPage";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, unknown>) => {
      if (key === "search.summaryPrefix") return "Search results for";
      if (key === "search.yourDestination") return "your destination";
      if (key === "search.fromTo") {
        return `from ${options?.checkIn} to ${options?.checkOut}`;
      }
      return key;
    },
  }),
}));

vi.mock("@shared/components/HomeSearchBar/HomeSearchBar", () => ({
  default: () => <div>Home Search Bar</div>,
}));

vi.mock("../components/SearchFilters", () => ({
  default: () => <div>Search Filters</div>,
}));

vi.mock("../components/HotelResults", () => ({
  default: () => <div>Hotel Results</div>,
}));

function renderWithRouter(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <SearchResultsPage />
    </MemoryRouter>
  );
}

describe("SearchResultsPage", () => {
  it("renders search bar, filters, and hotel results", () => {
    renderWithRouter("/search?city=Jenin");

    expect(screen.getByText("Home Search Bar")).toBeInTheDocument();
    expect(screen.getByText("Search Filters")).toBeInTheDocument();
    expect(screen.getByText("Hotel Results")).toBeInTheDocument();
  });

  it("renders city from query params", () => {
    renderWithRouter("/search?city=Jenin");

    expect(screen.getByText("Search results for")).toBeInTheDocument();
    expect(screen.getByText("Jenin")).toBeInTheDocument();
  });

  it("renders fallback destination when city is missing", () => {
    renderWithRouter("/search");

    expect(screen.getByText("your destination")).toBeInTheDocument();
  });

  it("renders date range when check-in and check-out exist", () => {
    renderWithRouter(
      "/search?city=Jenin&checkInDate=2026-04-22&checkOutDate=2026-04-25"
    );

    expect(
      screen.getByText(/from 2026-04-22 to 2026-04-25/)
    ).toBeInTheDocument();
  });
});
