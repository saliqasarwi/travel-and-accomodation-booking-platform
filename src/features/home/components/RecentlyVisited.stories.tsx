import type { Meta, StoryObj } from "@storybook/react-vite";
import type { RecentHotel } from "../types/home.types";
import RecentlyVisited from "./RecentlyVisited";

const image = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

const hotels: RecentHotel[] = [
  {
    hotelId: 201,
    hotelName: "Azure Bay Resort",
    cityName: "Tel Aviv",
    starRating: 4.7,
    visitDate: "2026-06-20T12:15:00Z",
    thumbnailUrl: image("photo-1566073771259-6a8506099945"),
    priceLowerBound: 184,
    priceUpperBound: 320,
  },
  {
    hotelId: 202,
    hotelName: "Old City Boutique Hotel",
    cityName: "Jerusalem",
    starRating: 4.4,
    visitDate: "2026-06-18T09:10:00Z",
    thumbnailUrl: image("photo-1551882547-ff40c63fe5fa"),
    priceLowerBound: 151,
    priceUpperBound: 260,
  },
  {
    hotelId: 203,
    hotelName: "Carmel Garden Suites",
    cityName: "Haifa",
    starRating: 5,
    visitDate: "2026-06-12T17:45:00Z",
    thumbnailUrl: image("photo-1578683010236-d716f9a3f461"),
    priceLowerBound: 236,
    priceUpperBound: 410,
  },
];

const meta = {
  title: "Features/Home/RecentlyVisited",
  component: RecentlyVisited,
  tags: ["autodocs"],
  args: {
    items: hotels,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "min(1100px, 100vw)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RecentlyVisited>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {};

export const Empty: Story = {
  args: {
    items: [],
  },
};
