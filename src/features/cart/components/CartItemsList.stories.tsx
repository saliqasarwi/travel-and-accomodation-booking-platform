import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { CartContext, type CartContextValue } from "../CartContext";
import type { CartItem } from "../types/cart.types";
import CartItemsList from "./CartItemsList";

const image = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=80`;

const cartItems: CartItem[] = [
  {
    id: "101|Deluxe Sea View|2026-07-12|2026-07-16|2|1|1",
    hotelId: 101,
    hotelName: "Azure Bay Resort",
    cityName: "Tel Aviv",
    starRating: 4.7,
    roomType: "Deluxe Sea View",
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
    id: "102|Superior King Room|2026-08-04|2026-08-08|2|0|1",
    hotelId: 102,
    hotelName: "Old City Boutique Hotel",
    cityName: "Jerusalem",
    starRating: 4.4,
    roomType: "Superior King Room",
    roomPhotoUrl: image("photo-1551882547-ff40c63fe5fa"),
    checkInDate: "2026-08-04",
    checkOutDate: "2026-08-08",
    adults: 2,
    children: 0,
    numberOfRooms: 1,
    pricePerNight: 142,
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
  title: "Features/Cart/CartItemsList",
  component: CartItemsList,
  parameters: {
    router: {
      initialEntries: ["/cart"],
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CartItemsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {
  decorators: [withCart(cartItems)],
};

export const Empty: Story = {
  decorators: [withCart([])],
};
