import type { Meta, StoryObj } from "@storybook/react-vite";
import EmptyBookingsState from "./EmptyBookingsState";

const meta = {
  title: "Features/Bookings/EmptyBookingsState",
  component: EmptyBookingsState,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "min(760px, 100vw)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EmptyBookingsState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
