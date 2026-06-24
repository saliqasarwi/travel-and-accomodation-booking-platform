import { useState, type ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import GuestInfoStep from "./GuestInfoStep";

type GuestInfoStepProps = ComponentProps<typeof GuestInfoStep>;

function StatefulGuestInfoStep(args: GuestInfoStepProps) {
  const [value, setValue] = useState(args.value);

  return (
    <GuestInfoStep
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
  title: "Features/Checkout/GuestInfoStep",
  component: GuestInfoStep,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    value: {
      firstName: "Lina",
      lastName: "Haddad",
      email: "lina@example.com",
      phone: "+972 59 123 4567",
    },
    onChange: fn(),
    onBlur: fn(),
    errors: {},
    touched: {},
  },
  render: (args) => <StatefulGuestInfoStep {...args} />,
  decorators: [
    (Story) => (
      <div style={{ width: "min(720px, 100vw)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GuestInfoStep>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {};

export const WithValidation: Story = {
  args: {
    value: {
      firstName: "",
      lastName: "",
      email: "not-an-email",
      phone: "",
    },
    errors: {
      firstName: "First name is required",
      lastName: "Last name is required",
      email: "Invalid email",
      phone: "Phone is required",
    },
    touched: {
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    },
  },
};
