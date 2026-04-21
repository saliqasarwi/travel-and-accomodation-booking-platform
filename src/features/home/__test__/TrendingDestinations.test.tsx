import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import TrendingDestinations from "../components/TrendingDestinations";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      if (key === "home.noTrendingDestinations")
        return "No trending destinations";
      if (key === "home.trendingDestinations") return "Trending Destinations";
      if (key === "home.trendingDestinationsSubtitle") {
        return "Explore popular places for your next trip";
      }
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

const trendingDestinationMock = {
  cityId: 1,
  cityName: "Paris",
  countryName: "France",
  description: "A beautiful city full of culture and landmarks.",
  thumbnailUrl: "/paris.jpg",
};

describe("TrendingDestinations", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders empty state when items are empty", () => {
    render(<TrendingDestinations items={[]} />);

    expect(screen.getByText("No trending destinations")).toBeInTheDocument();
  });

  it("renders section heading and subtitle", () => {
    render(<TrendingDestinations items={[trendingDestinationMock]} />);

    expect(screen.getByText("Trending Destinations")).toBeInTheDocument();
    expect(
      screen.getByText("Explore popular places for your next trip")
    ).toBeInTheDocument();
  });

  it("renders localized city, country, and description", () => {
    render(<TrendingDestinations items={[trendingDestinationMock]} />);

    expect(screen.getAllByText("Paris")[0]).toBeInTheDocument();
    expect(screen.getByText("France")).toBeInTheDocument();
    expect(
      screen.getByText("A beautiful city full of culture and landmarks.")
    ).toBeInTheDocument();
  });

  it("renders image with localized alt text", () => {
    render(<TrendingDestinations items={[trendingDestinationMock]} />);

    expect(screen.getByAltText("Paris")).toBeInTheDocument();
  });

  it("scrolls right when the next button is clicked", () => {
    const scrollByMock = vi.fn();

    Object.defineProperty(HTMLElement.prototype, "scrollBy", {
      configurable: true,
      value: scrollByMock,
    });

    render(<TrendingDestinations items={[trendingDestinationMock]} />);

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[1]);

    expect(scrollByMock).toHaveBeenCalledWith({
      left: 0,
      behavior: "smooth",
    });
  });

  it("scrolls left when the previous button is clicked", () => {
    const scrollByMock = vi.fn();

    Object.defineProperty(HTMLElement.prototype, "scrollBy", {
      configurable: true,
      value: scrollByMock,
    });

    render(<TrendingDestinations items={[trendingDestinationMock]} />);

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);

    expect(scrollByMock).toHaveBeenCalledWith({
      left: -0,
      behavior: "smooth",
    });
  });
});
