import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import LoginForm from "./LoginForm";

const meta = {
  title: "Features/Auth/LoginForm",
  component: LoginForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onSubmit: fn(),
    isLoading: false,
    error: null,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const WithError: Story = {
  args: {
    error: "Invalid username or password.",
  },
};
