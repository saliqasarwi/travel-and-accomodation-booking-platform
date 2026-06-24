import type { Meta, StoryObj } from "@storybook/react-vite";
import SearchFilters from "./SearchFilters";

const meta = {
  title: "Features/Search/SearchFilters",
  component: SearchFilters,
  parameters: {
    router: {
      initialEntries: [
        "/search?city=Tel%20Aviv&checkInDate=2026-07-12&checkOutDate=2026-07-16&adults=2&children=1&numberOfRooms=1&minPrice=120&maxPrice=260&stars=5&amenities=1,3&roomType=Executive%20Suite",
      ],
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 390 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchFilters>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithActiveFilters: Story = {};

export const EmptyFilters: Story = {
  parameters: {
    router: {
      initialEntries: ["/search"],
    },
  },
};
