import type { Meta, StoryObj } from "@storybook/react-vite";
import HomeSearchBar from "../../../shared/components/HomeSearchBar";
import { MemoryRouter } from "react-router-dom";

const meta: Meta<typeof HomeSearchBar> = {
  title: "Home/SearchBar",
  component: HomeSearchBar,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof HomeSearchBar>;

export const Default: Story = {};
