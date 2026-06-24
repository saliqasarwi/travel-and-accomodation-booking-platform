import type { Meta, StoryObj } from "@storybook/react-vite";
import type { HotelDetails } from "../types/hotel.types";
import HotelInformation from "./HotelInformation";

const hotel: HotelDetails = {
  hotelName: "Azure Bay Resort",
  location: "Tel Aviv waterfront",
  description:
    "A relaxed seaside hotel with bright rooms, walkable beach access, and a rooftop terrace for sunset views.",
  amenities: [
    { id: 1, name: "Free WiFi", description: "High-speed wireless internet" },
    { id: 2, name: "Pool", description: "Outdoor pool access" },
    { id: 3, name: "Breakfast", description: "Breakfast included" },
    { id: 4, name: "Airport shuttle", description: "Scheduled shuttle" },
  ],
  starRating: 4.7,
  availableRooms: 24,
  imageUrl:
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80",
  latitude: 32.0853,
  longitude: 34.7818,
};

const meta = {
  title: "Features/Hotel/HotelInformation",
  component: HotelInformation,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    hotel,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "min(780px, 100vw)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HotelInformation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
