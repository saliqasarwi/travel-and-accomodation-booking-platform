import type { Meta, StoryObj } from "@storybook/react-vite";
import type { HotelDetails } from "../types/hotel.types";
import HotelLocationMap from "./HotelLocationMap";

const hotel: HotelDetails = {
  hotelName: "Azure Bay Resort",
  location: "Tel Aviv waterfront",
  description: "A relaxed seaside hotel.",
  amenities: [],
  starRating: 4.7,
  availableRooms: 24,
  imageUrl: "",
  latitude: 32.0853,
  longitude: 34.7818,
};

const meta = {
  title: "Features/Hotel/HotelLocationMap",
  component: HotelLocationMap,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    hotel,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "min(760px, 100vw)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HotelLocationMap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
