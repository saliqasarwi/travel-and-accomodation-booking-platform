import type { Meta, StoryObj } from "@storybook/react-vite";
import TotalsCard from "./TotalsCard";

const meta = {
  title: "Features/Confirmation/TotalsCard",
  component: TotalsCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    subtotal: 2148,
    discounts: 284,
    total: 1864,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TotalsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
