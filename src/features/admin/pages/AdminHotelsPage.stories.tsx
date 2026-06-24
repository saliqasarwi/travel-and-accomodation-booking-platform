import type { Meta, StoryObj } from "@storybook/react-vite";
import AdminHotelsPage from "./AdminHotelsPage";

const meta = {
  title: "Features/Admin/Pages/AdminHotelsPage",
  component: AdminHotelsPage,
  parameters: {
    router: {
      initialEntries: ["/admin/hotels"],
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
} satisfies Meta<typeof AdminHotelsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loaded: Story = {};
