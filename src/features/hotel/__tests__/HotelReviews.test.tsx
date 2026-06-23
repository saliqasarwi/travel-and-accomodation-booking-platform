import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HotelReviews from "../components/HotelReviews";
import type { HotelReview } from "../types/review.types";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "hotel.guestReviews": "Guest reviews",
        "hotel.noReviews": "No reviews yet",
        "hotel.anonymous": "Anonymous",
      };

      return translations[key] ?? key;
    },
    i18n: { language: "en" },
  }),
}));

vi.mock("@shared/utils/localize", () => ({
  localizeField: (value: string) => value,
}));

const reviewMock: HotelReview = {
  reviewId: 1,
  customerName: "Sali",
  rating: 5,
  description: "Amazing stay and friendly staff.",
};

describe("HotelReviews", () => {
  it("renders empty state when reviews are empty", () => {
    render(<HotelReviews reviews={[]} />);

    expect(screen.getByText("Guest reviews")).toBeInTheDocument();
    expect(screen.getByText("No reviews yet")).toBeInTheDocument();
  });

  it("renders review information", () => {
    render(<HotelReviews reviews={[reviewMock]} />);

    expect(screen.getByText("Guest reviews")).toBeInTheDocument();
    expect(screen.getByText("Sali")).toBeInTheDocument();
    expect(
      screen.getByText('"Amazing stay and friendly staff."')
    ).toBeInTheDocument();
  });

  it("renders anonymous fallback when customer name is empty", () => {
    render(
      <HotelReviews
        reviews={[
          {
            ...reviewMock,
            customerName: "",
          },
        ]}
      />
    );

    expect(screen.getByText("Anonymous")).toBeInTheDocument();
    expect(screen.getByText("?")).toBeInTheDocument();
  });
});
