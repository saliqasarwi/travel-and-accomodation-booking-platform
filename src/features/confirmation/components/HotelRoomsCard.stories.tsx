import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CartItem } from "@features/cart/types/cart.types";
import HotelRoomsCard from "./HotelRoomsCard";

const image = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=80`;

const items: CartItem[] = [
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

const meta = {
  title: "Features/Confirmation/HotelRoomsCard",
  component: HotelRoomsCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    items,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "min(760px, 100vw)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HotelRoomsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {};

export const Empty: Story = {
  args: {
    items: [],
  },
};
