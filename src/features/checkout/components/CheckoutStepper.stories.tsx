import type { Meta, StoryObj } from "@storybook/react-vite";
import CheckoutStepper from "./CheckoutStepper";

const meta = {
  title: "Features/Checkout/CheckoutStepper",
  component: CheckoutStepper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    activeStep: 1,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "min(760px, 100vw)", overflowX: "auto" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CheckoutStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PaymentStep: Story = {};

export const PersonalInfoStep: Story = {
  args: {
    activeStep: 0,
  },
};

export const SpecialRequestsStep: Story = {
  args: {
    activeStep: 2,
  },
};
