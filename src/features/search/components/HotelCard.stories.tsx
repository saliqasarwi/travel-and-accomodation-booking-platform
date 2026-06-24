import type { Meta, StoryObj } from "@storybook/react-vite";
import type { HotelSearchItem } from "../types/types";
import HotelCard from "./HotelCard";

const hotel: HotelSearchItem = {
  hotelId: 101,
  hotelName: "Azure Bay Resort",
  starRating: 4.7,
  latitude: 32.0853,
  longitude: 34.7818,
  roomPrice: 184,
  roomType: "Deluxe Sea View",
  cityName: "Tel Aviv",
  roomPhotoUrl:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  discount: 18,
  amenityIds: [1, 2, 3],
  amenities: [
    { id: 1, name: "Free WiFi", description: "High-speed wireless internet" },
    { id: 2, name: "Pool", description: "Outdoor pool access" },
    { id: 3, name: "Breakfast", description: "Breakfast included" },
  ],
  numberOfChildren: 1,
  numberOfAdults: 2,
  numberOfRooms: 1,
  checkInDate: "2026-07-12",
  checkOutDate: "2026-07-16",
};

const meta = {
  title: "Features/Search/HotelCard",
  component: HotelCard,
  parameters: {
    router: {
      initialEntries: [
        "/search?city=Tel%20Aviv&checkInDate=2026-07-12&checkOutDate=2026-07-16&adults=2&children=1&numberOfRooms=1",
      ],
    },
  },
  tags: ["autodocs"],
  args: {
    hotel,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "min(900px, 100vw)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HotelCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithDiscount: Story = {};

export const WithoutDiscount: Story = {
  args: {
    hotel: {
      ...hotel,
      hotelId: 102,
      hotelName: "Old City Boutique Hotel",
      cityName: "Jerusalem",
      roomType: "Superior King Room",
      roomPrice: 142,
      starRating: 4.4,
      discount: 0,
      roomPhotoUrl:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80",
    },
  },
};
