import type { Meta, StoryObj } from "@storybook/react-vite";
import HomePage from "./HomePage";

const meta = {
  title: "Features/Home/Pages/HomePage",
  component: HomePage,
  parameters: {
    layout: "fullscreen",
    router: {
      initialEntries: ["/"],
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loaded: Story = {};
