import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HotelInformation from "../components/HotelInformation";
import type { HotelDetails } from "../types/hotel.types";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, unknown>) => {
      if (key === "hotel.starHotel") return `${options?.count} star hotel`;
      return key;
    },
    i18n: { language: "en" },
  }),
}));

vi.mock("@shared/utils/localize", () => ({
  localizeField: (value: string) => value,
}));

const hotelMock: HotelDetails = {
  hotelName: "Cinema Hotel",
  location: "Jenin",
  description: "A comfortable hotel near the city center.",
  amenities: [
    { id: 1, name: "WiFi", description: "Fast WiFi" },
    { id: 2, name: "Pool", description: "Outdoor pool" },
  ],
  starRating: 5,
  availableRooms: 4,
  imageUrl: "/hotel.jpg",
  latitude: 32.46,
  longitude: 35.3,
};

describe("HotelInformation", () => {
  it("renders hotel name, location, description, and rating text", () => {
    render(<HotelInformation hotel={hotelMock} />);

    expect(screen.getByText("Cinema Hotel")).toBeInTheDocument();
    expect(screen.getByText("Jenin")).toBeInTheDocument();
    expect(
      screen.getByText("A comfortable hotel near the city center.")
    ).toBeInTheDocument();
    expect(screen.getByText("5 star hotel")).toBeInTheDocument();
  });

  it("renders hotel amenities", () => {
    render(<HotelInformation hotel={hotelMock} />);

    expect(screen.getByText("WiFi")).toBeInTheDocument();
    expect(screen.getByText("Pool")).toBeInTheDocument();
  });
});
