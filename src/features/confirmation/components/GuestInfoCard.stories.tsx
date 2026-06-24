import type { Meta, StoryObj } from "@storybook/react-vite";
import GuestInfoCard from "./GuestInfoCard";

const meta = {
  title: "Features/Confirmation/GuestInfoCard",
  component: GuestInfoCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    guest: {
      firstName: "Lina",
      lastName: "Haddad",
      email: "lina@example.com",
      phone: "+972 59 123 4567",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GuestInfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {};
