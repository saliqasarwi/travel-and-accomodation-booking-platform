import type { Meta, StoryObj } from "@storybook/react-vite";
import type { HotelDetails } from "../types/hotel.types";
import HotelLocationMap from "./HotelLocationMap";

const hotel: HotelDetails = {
  hotelName: "Ramallah Hills Hotel",
  location: "Ramallah city center",
  description: "A relaxed city hotel.",
  amenities: [],
  starRating: 4.7,
  availableRooms: 24,
  imageUrl: "",
  latitude: 31.9038,
  longitude: 35.2034,
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
