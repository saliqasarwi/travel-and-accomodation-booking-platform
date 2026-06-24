import type { Meta, StoryObj } from "@storybook/react-vite";
import AdminCitiesPage from "./AdminCitiesPage";

const meta = {
  title: "Features/Admin/Pages/AdminCitiesPage",
  component: AdminCitiesPage,
  parameters: {
    router: {
      initialEntries: ["/admin/cities"],
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
} satisfies Meta<typeof AdminCitiesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loaded: Story = {};
