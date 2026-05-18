import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import BookingSummaryCard from "../components/BookingSummaryCard";
import type { CartItem } from "@features/cart/types/cart.types";

let mockItems: CartItem[] = [];

vi.mock("@features/cart/useCart", () => ({
  useCart: () => ({
    state: {
      items: mockItems,
    },
    totalItems: mockItems.length,
  }),
}));

vi.mock("@shared/utils/booking", () => ({
  nightsBetween: () => 3,
  calculateBookingTotals: () => ({
    subtotal: 600,
    discounts: 50,
    total: 550,
  }),
}));

vi.mock("@shared/utils/formatters", () => ({
  money: (value: number) => `$${value}`,
  formatVisitDate: (value: string) => `formatted-${value}`,
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string, options?: Record<string, unknown>) => {
      const translations: Record<string, string> = {
        "checkout.bookingSummary": "Booking summary",
        "checkout.itemsInCart_other": `${options?.count} items in cart`,
        "checkout.room": `${options?.count} room`,
        "checkout.adults": "adults",
        "checkout.children": "children",
        "checkout.night": `${options?.count} nights`,
        "checkout.subtotal": "Subtotal",
        "checkout.discounts": "Discounts",
        "checkout.total": "Total",
      };

      return translations[key] ?? key;
    },
    i18n: {
      language: "en",
      resolvedLanguage: "en",
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

describe("BookingSummaryCard", () => {
  beforeEach(() => {
    mockItems = [cartItemMock];
  });

  it("renders booking summary title and item count", () => {
    render(<BookingSummaryCard />);

    expect(screen.getByText("Booking summary")).toBeInTheDocument();
    expect(screen.getByText("1 items in cart")).toBeInTheDocument();
  });

  it("renders cart item details", () => {
    render(<BookingSummaryCard />);

    expect(screen.getByText("Cinema Hotel")).toBeInTheDocument();
    expect(screen.getByText("Deluxe Room • 2 room")).toBeInTheDocument();

    expect(
      screen.getByText("formatted-2026-04-22 → formatted-2026-04-25")
    ).toBeInTheDocument();

    expect(screen.getByText("2 adults • 1 children")).toBeInTheDocument();
    expect(screen.getByText("2 room • 3 nights")).toBeInTheDocument();
    expect(screen.getAllByText("$600")).toHaveLength(2);
  });
  it("renders totals", () => {
    render(<BookingSummaryCard />);

    expect(screen.getByText("Subtotal")).toBeInTheDocument();
    expect(screen.getByText("Discounts")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();

    expect(screen.getByText("-$50")).toBeInTheDocument();
    expect(screen.getByText("$550")).toBeInTheDocument();
  });

  it("renders localized object values when item fields are localized objects", () => {
    mockItems = [
      {
        ...cartItemMock,
        hotelName: {
          en: "English Hotel",
          ar: "فندق عربي",
        } as unknown as string,
        roomType: { en: "English Room", ar: "غرفة عربية" } as unknown as string,
      },
    ];

    render(<BookingSummaryCard />);

    expect(screen.getByText("English Hotel")).toBeInTheDocument();
    expect(screen.getByText("English Room • 2 room")).toBeInTheDocument();
  });

  it("renders empty strings for unsupported localized values", () => {
    mockItems = [
      {
        ...cartItemMock,
        hotelName: null as unknown as string,
        roomType: null as unknown as string,
      },
    ];

    render(<BookingSummaryCard />);

    expect(screen.getByText("• 2 room")).toBeInTheDocument();
  });
});
