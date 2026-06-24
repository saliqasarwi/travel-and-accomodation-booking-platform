import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import type { AvailableRoom } from "../types/room.types";
import HotelRooms from "./HotelRooms";

const image = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=80`;

const rooms: AvailableRoom[] = [
  {
    hotelId: 101,
    roomId: 501,
    roomNumber: "501",
    roomPhotoUrl: image("photo-1590490360182-c33d57733427"),
    roomType: "Deluxe Sea View",
    capacityOfAdults: 2,
    capacityOfChildren: 1,
    amenities: [
      { id: 1, name: "Free WiFi" },
      { id: 2, name: "Balcony" },
      { id: 3, name: "Breakfast" },
    ],
    price: 184,
    availability: true,
  },
  {
    hotelId: 101,
    roomId: 608,
    roomNumber: "608",
    roomPhotoUrl: image("photo-1578683010236-d716f9a3f461"),
    roomType: "Executive Suite",
    capacityOfAdults: 3,
    capacityOfChildren: 2,
    amenities: [
      { id: 1, name: "Free WiFi" },
      { id: 4, name: "Kitchenette" },
      { id: 5, name: "Sea view" },
    ],
    price: 236,
    availability: false,
  },
];

const meta = {
  title: "Features/Hotel/HotelRooms",
  component: HotelRooms,
  tags: ["autodocs"],
  args: {
    rooms,
    onAddToCart: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "min(900px, 100vw)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HotelRooms>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {};

export const Empty: Story = {
  args: {
    rooms: [],
  },
};
