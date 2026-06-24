import type { Meta, StoryObj } from "@storybook/react-vite";
import SearchResultsPage from "./SearchResultsPage";

const meta = {
  title: "Features/Search/Pages/SearchResultsPage",
  component: SearchResultsPage,
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
      <div style={{ width: "min(1200px, 100vw)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchResultsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loaded: Story = {};

export const NoResults: Story = {
  parameters: {
    router: {
      initialEntries: ["/search?stars=1"],
    },
  },
};
