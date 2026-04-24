import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import SearchSortBar from "../components/SearchSortBar";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, unknown>) => {
      if (key === "search.resultsFound")
        return `${options?.count} results found`;
      if (key === "search.compareAndSort") return "شCompare and sort hotels";
      if (key === "search.sortBy") return "Sort by";
      if (key === "search.recommended") return "Recommended";
      if (key === "search.priceLowToHigh") return "Price low to high";
      if (key === "search.priceHighToLow") return "Price high to low";
      if (key === "search.ratingHighToLow") return "Rating high to low";
      return key;
    },
  }),
}));

function renderWithRouter(initialRoute = "/search") {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <SearchSortBar resultsCount={12} />
    </MemoryRouter>
  );
}

describe("SearchSortBar", () => {
  it("renders results count and subtitle", () => {
    renderWithRouter();

    expect(screen.getByText("12 results found")).toBeInTheDocument();
    expect(screen.getByText("Compare and sort hotels")).toBeInTheDocument();
  });

  it("renders sort select with recommended value", () => {
    renderWithRouter();

    expect(screen.getByLabelText("Sort by")).toBeInTheDocument();
    expect(screen.getByText("Recommended")).toBeInTheDocument();
  });

  it("renders current sort from URL params", () => {
    renderWithRouter("/search?sort=price_desc");

    expect(screen.getByText("Price high to low")).toBeInTheDocument();
  });

  it("changes sort value when selecting another option", () => {
    renderWithRouter();

    fireEvent.mouseDown(screen.getByLabelText("Sort by"));

    fireEvent.click(screen.getByRole("option", { name: "Price low to high" }));

    expect(screen.getByRole("combobox")).toHaveTextContent("Price low to high");
  });
});
