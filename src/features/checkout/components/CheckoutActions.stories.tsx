import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import CheckoutActions from "./CheckoutActions";

const meta = {
  title: "Features/Checkout/CheckoutActions",
  component: CheckoutActions,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    isLastStep: false,
    isSubmitting: false,
    activeStep: 1,
    onBack: fn(),
    onNext: fn(),
    onConfirm: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "min(620px, 100vw)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CheckoutActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MiddleStep: Story = {};

export const FirstStep: Story = {
  args: {
    activeStep: 0,
  },
};

export const LastStep: Story = {
  args: {
    activeStep: 2,
    isLastStep: true,
  },
};
