import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { CartContext, type CartContextValue } from "@features/cart/CartContext";
import type { CartItem } from "@features/cart/types/cart.types";
import BookingSummaryCard from "./BookingSummaryCard";

const image = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=80`;

const summaryItems: CartItem[] = [
  {
    id: "101|Deluxe City View|2026-07-12|2026-07-16|2|1|1",
    hotelId: 101,
    hotelName: "Ramallah Hills Hotel",
    cityName: "Ramallah",
    starRating: 4.7,
    roomType: "Deluxe City View",
    roomPhotoUrl: image("photo-1566073771259-6a8506099945"),
    checkInDate: "2026-07-12",
    checkOutDate: "2026-07-16",
    adults: 2,
    children: 1,
    numberOfRooms: 1,
    pricePerNight: 184,
    discount: 18,
  },
  {
    id: "103|Executive Suite|2026-09-10|2026-09-13|2|2|2",
    hotelId: 103,
    hotelName: "Nablus Heritage Suites",
    cityName: "Nablus",
    starRating: 5,
    roomType: "Executive Suite",
    roomPhotoUrl: image("photo-1578683010236-d716f9a3f461"),
    checkInDate: "2026-09-10",
    checkOutDate: "2026-09-13",
    adults: 2,
    children: 2,
    numberOfRooms: 2,
    pricePerNight: 236,
    discount: 12,
  },
];

function withCart(items: CartItem[]): Decorator {
  return (Story) => {
    const value: CartContextValue = {
      state: { items },
      totalItems: items.length,
      addItem: fn(),
      removeItem: fn(),
      clearCart: fn(),
    };

    return (
      <CartContext.Provider value={value}>
        <Story />
      </CartContext.Provider>
    );
  };
}

const meta = {
  title: "Features/Checkout/BookingSummaryCard",
  component: BookingSummaryCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BookingSummaryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {
  decorators: [withCart(summaryItems)],
};

export const Empty: Story = {
  decorators: [withCart([])],
};
