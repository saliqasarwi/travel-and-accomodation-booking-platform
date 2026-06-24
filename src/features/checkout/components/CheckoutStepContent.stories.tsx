import { useState, type ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import CheckoutStepContent from "./CheckoutStepContent";
import type { CheckoutFormValues } from "../types/checkout.types";

type CheckoutStepContentProps = ComponentProps<typeof CheckoutStepContent>;

const values: CheckoutFormValues = {
  guestInfo: {
    firstName: "Lina",
    lastName: "Haddad",
    email: "lina@example.com",
    phone: "+972 59 123 4567",
  },
  paymentInfo: {
    method: "credit_card",
    cardNumber: "4242 4242 4242 4242",
    expiry: "08/29",
    cvv: "123",
    cardholderName: "Lina Haddad",
  },
  specialRequests: {
    notes: "High floor if available.",
  },
};

function StatefulCheckoutStepContent(args: CheckoutStepContentProps) {
  const [formValues, setFormValues] = useState(args.values);

  return (
    <CheckoutStepContent
      {...args}
      values={formValues}
      onGuestInfoChange={(next) => {
        setFormValues((current) => ({ ...current, guestInfo: next }));
        args.onGuestInfoChange(next);
      }}
      onPaymentInfoChange={(next) => {
        setFormValues((current) => ({ ...current, paymentInfo: next }));
        args.onPaymentInfoChange(next);
      }}
      onSpecialRequestsChange={(next) => {
        setFormValues((current) => ({ ...current, specialRequests: next }));
        args.onSpecialRequestsChange(next);
      }}
    />
  );
}

const meta = {
  title: "Features/Checkout/CheckoutStepContent",
  component: CheckoutStepContent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    activeStep: 0,
    values,
    onGuestInfoChange: fn(),
    onPaymentInfoChange: fn(),
    onSpecialRequestsChange: fn(),
    guestInfoErrors: {},
    guestInfoTouched: {},
    paymentInfoErrors: {},
    paymentInfoTouched: {},
    specialRequestsErrors: {},
    specialRequestsTouched: {},
    onBlur: fn(),
  },
  render: (args) => <StatefulCheckoutStepContent {...args} />,
  decorators: [
    (Story) => (
      <div style={{ width: "min(720px, 100vw)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CheckoutStepContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GuestInfo: Story = {};

export const Payment: Story = {
  args: {
    activeStep: 1,
  },
};

export const SpecialRequests: Story = {
  args: {
    activeStep: 2,
  },
};
