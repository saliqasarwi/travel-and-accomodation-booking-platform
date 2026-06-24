import type { Meta, StoryObj } from "@storybook/react-vite";
import type { FeaturedDeal } from "../types/home.types";
import FeaturedDeals from "./FeaturedDeals";

const image = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

const deals: FeaturedDeal[] = [
  {
    hotelId: 101,
    hotelName: "Ramallah Hills Hotel",
    cityName: "Ramallah",
    originalRoomPrice: 230,
    discount: 20,
    finalPrice: 184,
    roomPhotoUrl: image("photo-1566073771259-6a8506099945"),
  },
  {
    hotelId: 102,
    hotelName: "Bethlehem Stone Inn",
    cityName: "Bethlehem",
    originalRoomPrice: 178,
    discount: 15,
    finalPrice: 151,
    roomPhotoUrl: image("photo-1551882547-ff40c63fe5fa"),
  },
  {
    hotelId: 103,
    hotelName: "Nablus Heritage Suites",
    cityName: "Nablus",
    originalRoomPrice: 268,
    discount: 12,
    finalPrice: 236,
    roomPhotoUrl: image("photo-1578683010236-d716f9a3f461"),
  },
];

const meta = {
  title: "Features/Home/FeaturedDeals",
  component: FeaturedDeals,
  tags: ["autodocs"],
  args: {
    items: deals,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "min(1100px, 100vw)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FeaturedDeals>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {};

export const Empty: Story = {
  args: {
    items: [],
  },
};
