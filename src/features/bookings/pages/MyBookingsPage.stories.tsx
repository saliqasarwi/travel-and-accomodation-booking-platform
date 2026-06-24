import type { Meta, StoryObj } from "@storybook/react-vite";
import MyBookingsPage from "./MyBookingsPage";

const meta = {
  title: "Features/Bookings/Pages/MyBookingsPage",
  component: MyBookingsPage,
  parameters: {
    router: {
      initialEntries: ["/bookings"],
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
} satisfies Meta<typeof MyBookingsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loaded: Story = {};
