import type { Meta, StoryObj } from "@storybook/react-vite";
import CheckoutHeader from "./CheckoutHeader";

const meta = {
  title: "Features/Checkout/CheckoutHeader",
  component: CheckoutHeader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "min(720px, 100vw)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CheckoutHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
