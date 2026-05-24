import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HotelRoomsCard from "../components/HotelRoomsCard";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    i18n: {
      language: "en",
    },
    t: (key: string) => {
      const translations: Record<string, string> = {
        "confirmation.hotelAndRooms": "Hotel and Rooms",
        "confirmation.night": "night",
        "confirmation.roomsLabel": "Rooms",
        "confirmation.nightsLabel": "nights",
        "confirmation.totalLabel": "Total",
        "admin.adults": "Adults",
        "admin.children": "Children",
        "home.recentlyVisitedFallback": "Unknown date",
      };

      return translations[key] ?? key;
    },
  }),
}));

vi.mock("@shared/utils/formatters", () => ({
  money: (value: number) => `$${value}`,
  formatVisitDate: (value: string) => value,
}));

vi.mock("@shared/utils/booking", () => ({
  nightsBetween: () => 3,
}));

describe("HotelRoomsCard", () => {
  const items = [
    {
      id: "cart-1",
      hotelId: 1,
      hotelName: "Cinema Hotel",
      cityName: "Jenin",
      starRating: 5,
      roomType: "Deluxe Room",
      roomPhotoUrl: "room.jpg",
      checkInDate: "2026-06-01",
      checkOutDate: "2026-06-04",
      adults: 2,
      children: 1,
      numberOfRooms: 1,
      pricePerNight: 120,
      discount: 0,
      quantity: 1,
    },
  ];

  it("renders hotel and room details", () => {
    render(<HotelRoomsCard items={items} />);

    expect(
      screen.getByRole("heading", { name: /hotel and rooms/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText((content) =>
        content.toLowerCase().includes("cinema hotel")
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText((content) =>
        content.toLowerCase().includes("deluxe room")
      )
    ).toBeInTheDocument();

    expect(screen.getByText(/jenin/i)).toBeInTheDocument();

    expect(
      screen.getByText(
        (content) => content.includes("$120") && content.includes("night")
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText((content) => content.includes("2026-06-01"))
    ).toBeInTheDocument();

    expect(
      screen.getByText((content) => content.includes("2026-06-04"))
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (content) =>
          content.includes("2") &&
          content.includes("adults") &&
          content.includes("1") &&
          content.includes("children") &&
          content.includes("rooms")
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (content) =>
          content.includes("3") &&
          content.includes("nights") &&
          content.includes("Total") &&
          content.includes("$360")
      )
    ).toBeInTheDocument();
  });
});
