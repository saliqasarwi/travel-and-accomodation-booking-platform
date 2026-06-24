import { useState, type ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import PaymentStep from "./PaymentStep";

type PaymentStepProps = ComponentProps<typeof PaymentStep>;

function StatefulPaymentStep(args: PaymentStepProps) {
  const [value, setValue] = useState(args.value);

  return (
    <PaymentStep
      {...args}
      value={value}
      onChange={(next) => {
        setValue(next);
        args.onChange(next);
      }}
    />
  );
}

const meta = {
  title: "Features/Checkout/PaymentStep",
  component: PaymentStep,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    value: {
      method: "credit_card",
      cardNumber: "4242 4242 4242 4242",
      expiry: "08/29",
      cvv: "123",
      cardholderName: "Lina Haddad",
    },
    onChange: fn(),
    onBlur: fn(),
    errors: {},
    touched: {},
  },
  render: (args) => <StatefulPaymentStep {...args} />,
  decorators: [
    (Story) => (
      <div style={{ width: "min(720px, 100vw)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PaymentStep>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreditCard: Story = {};

export const PayAtHotel: Story = {
  args: {
    value: {
      method: "pay_at_hotel",
      cardNumber: "",
      expiry: "",
      cvv: "",
      cardholderName: "",
    },
  },
};

export const WithValidation: Story = {
  args: {
    value: {
      method: "credit_card",
      cardNumber: "1234",
      expiry: "",
      cvv: "",
      cardholderName: "",
    },
    errors: {
      cardNumber: "Too short",
      expiry: "Use MM/YY",
      cvv: "CVV is required",
      cardholderName: "Cardholder name is required",
    },
    touched: {
      cardNumber: true,
      expiry: true,
      cvv: true,
      cardholderName: true,
    },
  },
};
