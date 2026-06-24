import type { Decorator, Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { CartContext, type CartContextValue } from "@features/cart/CartContext";
import HotelPage from "./HotelPage";

const withCart: Decorator = (Story) => {
  const value: CartContextValue = {
    state: { items: [] },
    totalItems: 0,
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

const meta = {
  title: "Features/Hotel/Pages/HotelPage",
  component: HotelPage,
  parameters: {
    router: {
      initialEntries: [
        "/hotels/101?checkInDate=2026-07-12&checkOutDate=2026-07-16&adults=2&children=1&numberOfRooms=1",
      ],
    },
  },
  tags: ["autodocs"],
  decorators: [withCart],
} satisfies Meta<typeof HotelPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loaded: Story = {};
