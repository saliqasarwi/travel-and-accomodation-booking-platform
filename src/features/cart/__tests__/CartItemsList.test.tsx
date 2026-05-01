import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CartItemsList from "../components/CartItemsList";
import type { CartItem } from "../types/cart.types";

const mockNavigate = vi.fn();
const mockRemoveItem = vi.fn();

let mockItems: CartItem[] = [];

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../useCart", () => ({
  useCart: () => ({
    state: {
      items: mockItems,
    },
    removeItem: mockRemoveItem,
  }),
}));

vi.mock("@assets/empty-cart.webp", () => ({
  default: "empty-cart.webp",
}));

vi.mock("@shared/utils/localize", () => ({
  localizeField: (value: string) => value,
}));

vi.mock("@shared/utils/booking", () => ({
  nightsBetween: () => 3,
}));

vi.mock("@shared/utils/formatters", () => ({
  money: (value: number) => `$${value}`,
  formatDate: (value: string) => `formatted-${value}`,
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "cart.emptyTitle": "Your cart is empty",
        "cart.startExploring": "Start exploring hotels",
        "cart.exploreHotels": "Explore hotels",
        "hotel.perNight": "per night",
        "cart.adults": "adults",
        "cart.children": "children",
        "cart.rooms": "rooms",
        "cart.nights": "nights",
        "cart.total": "total",
        "cart.removeItem": "Remove item",
        "cart.removeItemMessage": "Are you sure you want to remove this item?",
        "cart.remove": "Remove",
      };

      return translations[key] ?? key;
    },
    i18n: {
      language: "en",
    },
  }),
}));

vi.mock("@shared/components/ConfirmActionDialog", () => ({
  default: ({
    open,
    title,
    message,
    confirmText,
    onClose,
    onConfirm,
  }: {
    open: boolean;
    title: string;
    message: string;
    confirmText: string;
    onClose: () => void;
    onConfirm: () => void;
  }) =>
    open ? (
      <div role="dialog">
        <p>{title}</p>
        <p>{message}</p>
        <button onClick={onConfirm}>{confirmText}</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    ) : null,
}));

const cartItemMock: CartItem = {
  id: "item-1",
  hotelId: 1,
  hotelName: "Royal Hotel",
  cityName: "Jenin",
  starRating: 5,
  roomType: "Deluxe Room",
  roomPhotoUrl: "/room.jpg",
  checkInDate: "2026-04-22",
  checkOutDate: "2026-04-25",
  adults: 2,
  children: 1,
  numberOfRooms: 2,
  pricePerNight: 100,
  discount: 0,
};

describe("CartItemsList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockItems = [];
  });

  it("renders empty cart state", () => {
    render(<CartItemsList />);

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    expect(screen.getByText("Start exploring hotels")).toBeInTheDocument();
    expect(screen.getByAltText("Your cart is empty")).toBeInTheDocument();
  });

  it("navigates home when explore hotels button is clicked", () => {
    render(<CartItemsList />);

    fireEvent.click(screen.getByRole("button", { name: "Explore hotels" }));

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("renders cart item details", () => {
    mockItems = [cartItemMock];

    render(<CartItemsList />);

    expect(screen.getByText("Royal Hotel")).toBeInTheDocument();
    expect(screen.getByText("Deluxe Room • Jenin")).toBeInTheDocument();
    expect(screen.getByAltText("Deluxe Room")).toBeInTheDocument();

    expect(
      screen.getByText("formatted-2026-04-22 → formatted-2026-04-25")
    ).toBeInTheDocument();

    expect(screen.getByText("2 adults • 1 children")).toBeInTheDocument();
    expect(screen.getByText("2 rooms • 3 nights")).toBeInTheDocument();

    expect(screen.getByText("$100 per night")).toBeInTheDocument();
    expect(screen.getByText("$600 total")).toBeInTheDocument();
  });

  it("opens remove confirmation dialog", () => {
    mockItems = [cartItemMock];

    render(<CartItemsList />);

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Remove item")).toBeInTheDocument();
    expect(
      screen.getByText("Are you sure you want to remove this item?")
    ).toBeInTheDocument();
  });

  it("removes item after confirmation", () => {
    mockItems = [cartItemMock];

    render(<CartItemsList />);

    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByRole("button", { name: "Remove" }));

    expect(mockRemoveItem).toHaveBeenCalledWith("item-1");
  });

  it("closes confirmation dialog without removing item", () => {
    mockItems = [cartItemMock];

    render(<CartItemsList />);

    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(mockRemoveItem).not.toHaveBeenCalled();
  });
});
