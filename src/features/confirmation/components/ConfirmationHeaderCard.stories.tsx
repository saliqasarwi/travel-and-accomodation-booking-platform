import type { Meta, StoryObj } from "@storybook/react-vite";
import ConfirmationHeaderCard from "./ConfirmationHeaderCard";

const meta = {
  title: "Features/Confirmation/ConfirmationHeaderCard",
  component: ConfirmationHeaderCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    confirmationNumber: "TRV-2026-1842",
    status: "Confirmed",
    createdAt: "2026-07-02T09:30:00Z",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "min(760px, 100vw)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ConfirmationHeaderCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Confirmed: Story = {};
