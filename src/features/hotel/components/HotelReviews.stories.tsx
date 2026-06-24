import type { Meta, StoryObj } from "@storybook/react-vite";
import type { HotelReview } from "../types/review.types";
import HotelReviews from "./HotelReviews";

const reviews: HotelReview[] = [
  {
    reviewId: 1,
    customerName: "Maya Cohen",
    rating: 5,
    description:
      "The room was spotless, the breakfast was generous, and the staff helped us plan a perfect day in the old city.",
  },
  {
    reviewId: 2,
    customerName: "Omar Khalil",
    rating: 4,
    description:
      "Comfortable stay with a great location. The rooftop view at sunset was the highlight.",
  },
];

const meta = {
  title: "Features/Hotel/HotelReviews",
  component: HotelReviews,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    reviews,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "min(760px, 100vw)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HotelReviews>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {};

export const Empty: Story = {
  args: {
    reviews: [],
  },
};
