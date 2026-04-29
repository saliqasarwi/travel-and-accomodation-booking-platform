import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HotelLocationMap from "../components/HotelLocationMap";
import type { HotelDetails } from "../types/hotel.types";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "hotel.location": "Location",
        "hotel.openInGoogleMaps": "Open in Google Maps",
      };

      return translations[key] ?? key;
    },
  }),
}));

const hotelMock: HotelDetails = {
  hotelName: "Cinema Hotel",
  location: "Jenin",
  description: "Nice hotel.",
  amenities: [],
  starRating: 5,
  availableRooms: 2,
  imageUrl: "/hotel.jpg",
  latitude: 32.46,
  longitude: 35.3,
};

describe("HotelLocationMap", () => {
  it("renders location title and map iframe", () => {
    render(<HotelLocationMap hotel={hotelMock} />);

    expect(screen.getByText("Location")).toBeInTheDocument();

    const iframe = screen.getByTitle("hotel-map");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      "src",
      "https://maps.google.com/maps?q=32.46,35.3&z=14&output=embed"
    );
  });

  it("renders Google Maps link", () => {
    render(<HotelLocationMap hotel={hotelMock} />);

    expect(
      screen.getByRole("link", { name: "Open in Google Maps" })
    ).toHaveAttribute("href", "https://www.google.com/maps?q=32.46,35.3");
  });
});
