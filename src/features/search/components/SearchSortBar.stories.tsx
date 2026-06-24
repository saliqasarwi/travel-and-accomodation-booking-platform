import type { Meta, StoryObj } from "@storybook/react-vite";
import SearchSortBar from "./SearchSortBar";

const meta = {
  title: "Features/Search/SearchSortBar",
  component: SearchSortBar,
  parameters: {
    layout: "centered",
    router: {
      initialEntries: ["/search?sort=price_asc"],
    },
  },
  tags: ["autodocs"],
  args: {
    resultsCount: 12,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "min(780px, 100vw)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchSortBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FewResults: Story = {
  args: {
    resultsCount: 3,
  },
};
