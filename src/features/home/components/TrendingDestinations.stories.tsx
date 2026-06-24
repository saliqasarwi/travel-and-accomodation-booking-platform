import type { Meta, StoryObj } from "@storybook/react-vite";
import type { TrendingDestination } from "../types/home.types";
import TrendingDestinations from "./TrendingDestinations";

const image = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

const destinations: TrendingDestination[] = [
  {
    cityId: 301,
    cityName: "Ramallah",
    countryName: "Palestine",
    description:
      "Lively cafes, hillside views, cultural venues, and easy access to central West Bank day trips.",
    thumbnailUrl: image("photo-1544971587-b842c27f8e14"),
  },
  {
    cityId: 302,
    cityName: "Bethlehem",
    countryName: "Palestine",
    description:
      "Historic streets, sacred landmarks, boutique stays, and stone courtyards full of atmosphere.",
    thumbnailUrl: image("photo-1542743408-218cc173cda0"),
  },
  {
    cityId: 303,
    cityName: "Nablus",
    countryName: "Palestine",
    description:
      "Historic markets, olive-soap workshops, mountain views, and easy access to northern West Bank trips.",
    thumbnailUrl: image("photo-1570722750791-5f14fbb57d72"),
  },
];

const meta = {
  title: "Features/Home/TrendingDestinations",
  component: TrendingDestinations,
  tags: ["autodocs"],
  args: {
    items: destinations,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "min(1160px, 100vw)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TrendingDestinations>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {};

export const Empty: Story = {
  args: {
    items: [],
  },
};
