import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import RecentlyVisited from "../components/RecentlyVisited";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      if (key === "home.noRecentHotels") return "No recent hotels";
      if (key === "home.recentlyVisited") return "Recently Visited";
      if (key === "home.recentlyVisitedSubtitle")
        return "Places you viewed before";
      if (key === "home.recentlyVisitedFallback") return "Recently visited";
      return key;
    },
    i18n: {
      language: "en",
    },
  }),
}));

vi.mock("@shared/utils/localize", () => ({
  localizeField: (
    value: string | Record<string, string> | undefined,
    language: string
  ) => {
    if (!value) return "";
    if (typeof value === "string") return value;
    return value[language] ?? value.en ?? Object.values(value)[0] ?? "";
  },
}));

vi.mock("@shared/utils/formatters", () => ({
  formatVisitDate: (visitDate: string, language: string, fallback: string) => {
    if (!visitDate) return fallback;
    return `Formatted: ${visitDate} (${language})`;
  },
}));

describe("RecentlyVisited", () => {
  it("renders empty state when items are empty", () => {
    render(<RecentlyVisited items={[]} />);

    expect(screen.getByText("No recent hotels")).toBeInTheDocument();
  });

  it("renders section heading and subtitle", () => {
    render(
      <RecentlyVisited
        items={[
          {
            hotelId: 1,
            hotelName: "Royal Hotel",
            cityName: "Jenin",
            thumbnailUrl: "/recent.jpg",
            visitDate: "2026-04-20",
            starRating: 4.5,
            priceLowerBound: 100,
            priceUpperBound: 200,
          },
        ]}
      />
    );

    expect(screen.getByText("Recently Visited")).toBeInTheDocument();
    expect(screen.getByText("Places you viewed before")).toBeInTheDocument();
  });

  it("renders localized hotel and city names", () => {
    render(
      <RecentlyVisited
        items={[
          {
            hotelId: 1,
            hotelName: "Royal Hotel",
            cityName: "Jenin",
            thumbnailUrl: "/recent.jpg",
            visitDate: "2026-04-20",
            starRating: 4.5,
            priceLowerBound: 100,
            priceUpperBound: 200,
          },
        ]}
      />
    );

    expect(screen.getByText("Royal Hotel")).toBeInTheDocument();
    expect(screen.getByText("Jenin")).toBeInTheDocument();
  });

  it("renders formatted visit date", () => {
    render(
      <RecentlyVisited
        items={[
          {
            hotelId: 1,
            hotelName: "Royal Hotel",
            cityName: "Jenin",
            thumbnailUrl: "/recent.jpg",
            visitDate: "2026-04-20",
            starRating: 4.5,
            priceLowerBound: 100,
            priceUpperBound: 200,
          },
        ]}
      />
    );

    expect(screen.getByText("Formatted: 2026-04-20 (en)")).toBeInTheDocument();
  });

  it("renders image with localized alt text", () => {
    render(
      <RecentlyVisited
        items={[
          {
            hotelId: 1,
            hotelName: "Royal Hotel",
            cityName: "Jenin",
            thumbnailUrl: "/recent.jpg",
            visitDate: "2026-04-20",
            starRating: 4.5,
            priceLowerBound: 100,
            priceUpperBound: 200,
          },
        ]}
      />
    );

    expect(screen.getByAltText("Royal Hotel")).toBeInTheDocument();
  });

  it("renders rating component", () => {
    render(
      <RecentlyVisited
        items={[
          {
            hotelId: 1,
            hotelName: "Royal Hotel",
            cityName: "Jenin",
            thumbnailUrl: "/recent.jpg",
            visitDate: "2026-04-20",
            starRating: 4.5,
            priceLowerBound: 100,
            priceUpperBound: 200,
          },
        ]}
      />
    );

    expect(screen.getByLabelText("4.5 Stars")).toBeInTheDocument();
  });
});
