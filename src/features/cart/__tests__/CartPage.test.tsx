import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CartPage from "../pages/CartPage";
import type { CartItem } from "../types/cart.types";

const mockNavigate = vi.fn();

let mockItems: CartItem[] = [];

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../useCart", () => ({
  useCart: () => ({
    state: {
      items: mockItems,
    },
  }),
}));

vi.mock("../components/CartItemsList", () => ({
  default: () => <div>Cart Items List</div>,
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "cart.title": "My cart",
        "cart.subtitle": "Review your selected rooms before checkout",
        "cart.proceedToCheckout": "Proceed to checkout",
      };

      return translations[key] ?? key;
    },
  }),
}));

const cartItemMock: CartItem = {
  id: "item-1",
  hotelId: 1,
  hotelName: "Cinema Hotel",
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

describe("CartPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockItems = [];
  });

  it("renders cart page heading and cart items list", () => {
    render(<CartPage />);

    expect(screen.getByText("My cart")).toBeInTheDocument();
    expect(
      screen.getByText("Review your selected rooms before checkout")
    ).toBeInTheDocument();
    expect(screen.getByText("Cart Items List")).toBeInTheDocument();
  });

  it("does not render checkout button when cart is empty", () => {
    render(<CartPage />);

    expect(
      screen.queryByRole("button", { name: "Proceed to checkout" })
    ).not.toBeInTheDocument();
  });

  it("renders checkout button when cart has items", () => {
    mockItems = [cartItemMock];

    render(<CartPage />);

    expect(
      screen.getByRole("button", { name: "Proceed to checkout" })
    ).toBeInTheDocument();
  });

  it("navigates to checkout when checkout button is clicked", () => {
    mockItems = [cartItemMock];

    render(<CartPage />);

    fireEvent.click(
      screen.getByRole("button", { name: "Proceed to checkout" })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/checkout");
  });
});
