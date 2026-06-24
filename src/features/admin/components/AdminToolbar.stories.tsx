import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import AdminToolbar from "./AdminToolbar";

const meta = {
  title: "Features/Admin/AdminToolbar",
  component: AdminToolbar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    title: "admin.hotels",
    searchValue: "garden",
    onSearchChange: fn(),
    onSearchSubmit: fn(),
    onClearSearch: fn(),
    onCreateClick: fn(),
    createLabel: "Create hotel",
  },
} satisfies Meta<typeof AdminToolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EmptySearch: Story = {
  args: {
    title: "admin.cities",
    searchValue: "",
    createLabel: "Create city",
  },
};
