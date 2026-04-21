import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import FeaturedDeals from "../components/FeaturedDeals";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, unknown>) => {
      if (key === "home.noFeaturedDeals") return "No featured deals";
      if (key === "home.featuredDeals") return "Featured Deals";
      if (key === "home.featuredDealsSubtitle")
        return "Best offers for your next stay";
      if (key === "home.savePercent") return `Save ${options?.value}%`;
      if (key === "home.startingFrom") return "Starting from";
      if (key === "home.perNight") return "per night";
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

describe("FeaturedDeals", () => {
  it("renders empty state when items are empty", () => {
    render(<FeaturedDeals items={[]} />);

    expect(screen.getByText("No featured deals")).toBeInTheDocument();
  });

  it("renders section heading and subtitle", () => {
    render(
      <FeaturedDeals
        items={[
          {
            hotelId: 1,
            hotelName: "Cinema Hotel",
            cityName: "Jenin",
            originalRoomPrice: 120,
            finalPrice: 90,
            discount: 25,
            roomPhotoUrl: "/hotel.jpg",
          },
        ]}
      />
    );

    expect(screen.getByText("Featured Deals")).toBeInTheDocument();
    expect(
      screen.getByText("Best offers for your next stay")
    ).toBeInTheDocument();
  });

  it("renders localized hotel and city names", () => {
    render(
      <FeaturedDeals
        items={[
          {
            hotelId: 1,
            hotelName: "Cinema Hotel",
            cityName: "Jenin",
            originalRoomPrice: 120,
            finalPrice: 90,
            discount: 25,
            roomPhotoUrl: "/hotel.jpg",
          },
        ]}
      />
    );

    expect(screen.getByText("Cinema Hotel")).toBeInTheDocument();
    expect(screen.getByText("Jenin")).toBeInTheDocument();
  });

  it("renders discount chip when discount exists", () => {
    render(
      <FeaturedDeals
        items={[
          {
            hotelId: 1,
            hotelName: "Cinema Hotel",
            cityName: "Jenin",
            originalRoomPrice: 120,
            finalPrice: 90,
            discount: 25,
            roomPhotoUrl: "/hotel.jpg",
          },
        ]}
      />
    );

    expect(screen.getByText("Save 25%")).toBeInTheDocument();
  });

  it("does not render discount chip when discount is missing", () => {
    render(
      <FeaturedDeals
        items={[
          {
            hotelId: 1,
            hotelName: "Royal Hotel",
            cityName: "Jenin",
            originalRoomPrice: 120,
            finalPrice: 90,
            roomPhotoUrl: "/hotel.jpg",
          },
        ]}
      />
    );

    expect(screen.queryByText(/Save/i)).not.toBeInTheDocument();
  });

  it("renders original and final prices", () => {
    render(
      <FeaturedDeals
        items={[
          {
            hotelId: 1,
            hotelName: "Cinema Hotel",
            cityName: "Jenin",
            originalRoomPrice: 120,
            finalPrice: 90,
            discount: 25,
            roomPhotoUrl: "/hotel.jpg",
          },
        ]}
      />
    );

    expect(screen.getByText("US$120")).toBeInTheDocument();
    expect(screen.getByText("US$90")).toBeInTheDocument();
    expect(screen.getByText("Starting from")).toBeInTheDocument();
    expect(screen.getByText("per night")).toBeInTheDocument();
  });

  it("renders image with localized alt text", () => {
    render(
      <FeaturedDeals
        items={[
          {
            hotelId: 1,
            hotelName: "Cinema Hotel",
            cityName: "Jenin",
            originalRoomPrice: 120,
            finalPrice: 90,
            discount: 25,
            roomPhotoUrl: "/hotel.jpg",
          },
        ]}
      />
    );

    expect(screen.getByAltText("Cinema Hotel")).toBeInTheDocument();
  });
});
