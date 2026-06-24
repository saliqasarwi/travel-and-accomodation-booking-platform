import type { Meta, StoryObj } from "@storybook/react-vite";
import SpecialRequestsCard from "./SpecialRequestCard";

const meta = {
  title: "Features/Confirmation/SpecialRequestsCard",
  component: SpecialRequestsCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    notes: {
      notes:
        "High floor if available, late check-in around 10 PM, and extra pillows.",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SpecialRequestsCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithNotes: Story = {};

export const NoRequests: Story = {
  args: {
    notes: {
      notes: "",
    },
  },
};
