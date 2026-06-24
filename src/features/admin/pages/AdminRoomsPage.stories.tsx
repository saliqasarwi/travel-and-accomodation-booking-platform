import type { Meta, StoryObj } from "@storybook/react-vite";
import AdminRoomsPage from "./AdminRoomsPage";

const meta = {
  title: "Features/Admin/Pages/AdminRoomsPage",
  component: AdminRoomsPage,
  parameters: {
    router: {
      initialEntries: ["/admin/rooms"],
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
} satisfies Meta<typeof AdminRoomsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loaded: Story = {};
