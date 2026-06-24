import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import CityForm from "./CityForm";

const meta = {
  title: "Features/Admin/Forms/CityForm",
  component: CityForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    initialValues: {
      name: "Jerusalem",
      country: "Palestine",
      postOffice: "9103401",
      numberOfHotels: 12,
    },
    onSubmit: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CityForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {};

export const Empty: Story = {
  args: {
    initialValues: {
      name: "",
      country: "",
      postOffice: "",
      numberOfHotels: undefined,
    },
  },
};
