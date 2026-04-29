import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HotelRooms from "../components/HotelRooms";
import type { AvailableRoom } from "../types/room.types";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "hotel.availableRooms": "Available rooms",
        "hotel.noAvailableRooms": "No available rooms",
        "hotel.capacity": "Capacity",
        "hotel.adults": "adults",
        "hotel.children": "children",
        "hotel.amenities": "Amenities",
        "hotel.perNight": "per night",
        "hotel.addToCart": "Add to cart",
        "admin.notAvailable": "Not available",
      };

      return translations[key] ?? key;
    },
    i18n: { language: "en" },
  }),
}));

vi.mock("@shared/utils/localize", () => ({
  localizeField: (value: string) => value,
}));

const availableRoomMock: AvailableRoom = {
  hotelId: 1,
  roomId: 10,
  roomNumber: "101",
  roomPhotoUrl: "/room.jpg",
  roomType: "Deluxe Room",
  capacityOfAdults: 2,
  capacityOfChildren: 1,
  amenities: [
    { id: 1, name: "WiFi", description: "Fast WiFi" },
    { id: 2, name: "TV", description: "Smart TV" },
  ],
  price: 150,
  availability: true,
};

describe("HotelRooms", () => {
  it("renders empty state when no rooms exist", () => {
    render(<HotelRooms rooms={[]} onAddToCart={vi.fn()} />);

    expect(screen.getByText("Available rooms")).toBeInTheDocument();
    expect(screen.getByText("No available rooms")).toBeInTheDocument();
  });

  it("renders room details", () => {
    render(<HotelRooms rooms={[availableRoomMock]} onAddToCart={vi.fn()} />);

    expect(screen.getByText("Deluxe Room")).toBeInTheDocument();
    expect(screen.getByText(/Capacity/i)).toBeInTheDocument();
    expect(screen.getByText(/2 adults/i)).toBeInTheDocument();
    expect(screen.getByText(/1 children/i)).toBeInTheDocument();
    expect(screen.getByText(/WiFi • TV/i)).toBeInTheDocument();
    expect(screen.getByText("$150 / per night")).toBeInTheDocument();
  });

  it("calls onAddToCart when available room button is clicked", () => {
    const onAddToCart = vi.fn();

    render(
      <HotelRooms rooms={[availableRoomMock]} onAddToCart={onAddToCart} />
    );

    fireEvent.click(screen.getByRole("button", { name: "Add to cart" }));

    expect(onAddToCart).toHaveBeenCalledWith(availableRoomMock);
  });

  it("disables button when room is not available", () => {
    const unavailableRoom = {
      ...availableRoomMock,
      availability: false,
    };

    render(<HotelRooms rooms={[unavailableRoom]} onAddToCart={vi.fn()} />);

    expect(
      screen.getByRole("button", { name: "Not available" })
    ).toBeDisabled();
  });

  it("renders room image with alt text", () => {
    render(<HotelRooms rooms={[availableRoomMock]} onAddToCart={vi.fn()} />);

    expect(screen.getByAltText("Deluxe Room")).toBeInTheDocument();
  });
});
