import { useState, type ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import SpecialRequestsStep from "./SpecialRequestsStep";

type SpecialRequestsStepProps = ComponentProps<typeof SpecialRequestsStep>;

function StatefulSpecialRequestsStep(args: SpecialRequestsStepProps) {
  const [value, setValue] = useState(args.value);

  return (
    <SpecialRequestsStep
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
  title: "Features/Checkout/SpecialRequestsStep",
  component: SpecialRequestsStep,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    value: {
      notes: "High floor if available, and a late check-in around 10 PM.",
    },
    onChange: fn(),
    onBlur: fn(),
    errors: {},
    touched: {},
  },
  render: (args) => <StatefulSpecialRequestsStep {...args} />,
  decorators: [
    (Story) => (
      <div style={{ width: "min(720px, 100vw)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SpecialRequestsStep>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {};

export const Empty: Story = {
  args: {
    value: {
      notes: "",
    },
  },
};

export const WithValidation: Story = {
  args: {
    errors: {
      notes: "Too long (max 500 chars)",
    },
    touched: {
      notes: true,
    },
  },
};
