import type { Meta, StoryObj } from "@storybook/react-vite";
import AppButton from "./AppButton.tsx";

const meta: Meta<typeof AppButton> = {
  title: "Shared/Button",
  component: AppButton,
  args: {
    children: "Button",
    variant: "contained",
  },
};
export default meta;

type Story = StoryObj<typeof AppButton>;

export const Primary: Story = {};

export const Outlined: Story = {
  args: { variant: "outlined" },
};

export const Disabled: Story = {
  args: { disabled: true },
};
