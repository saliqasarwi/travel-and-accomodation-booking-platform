import type { Meta, StoryObj } from "@storybook/react-vite";
import ConfirmationPage from "./ConfirmationPage";

const meta = {
  title: "Features/Confirmation/Pages/ConfirmationPage",
  component: ConfirmationPage,
  parameters: {
    router: {
      initialEntries: ["/confirmation/1842"],
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "min(1180px, 100vw)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ConfirmationPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loaded: Story = {};
