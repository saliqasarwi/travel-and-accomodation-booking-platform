import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { CartContext, type CartContextValue } from "@features/cart/CartContext";
import type { CartItem } from "@features/cart/types/cart.types";
import CheckoutPage from "./CheckoutPage";

const image = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=80`;

const checkoutItems: CartItem[] = [
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
    id: "103|Executive Suite|2026-09-10|2026-09-13|2|2|2",
    hotelId: 103,
    hotelName: "Carmel Garden Suites",
    cityName: "Haifa",
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
  title: "Features/Checkout/Pages/CheckoutPage",
  component: CheckoutPage,
  parameters: {
    router: {
      initialEntries: ["/checkout"],
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CheckoutPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FilledCart: Story = {
  decorators: [withCart(checkoutItems)],
};

export const EmptyCart: Story = {
  decorators: [withCart([])],
};
