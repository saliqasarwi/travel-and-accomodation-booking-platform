import type { Meta, StoryObj } from "@storybook/react-vite";
import HotelResults from "./HotelResults";

const meta = {
  title: "Features/Search/HotelResults",
  component: HotelResults,
  parameters: {
    router: {
      initialEntries: [
        "/search?city=Tel%20Aviv&checkInDate=2026-07-12&checkOutDate=2026-07-16&adults=2&children=1&numberOfRooms=1",
      ],
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "min(960px, 100vw)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HotelResults>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Results: Story = {};

export const NoResults: Story = {
  parameters: {
    router: {
      initialEntries: ["/search?stars=1"],
    },
  },
};
