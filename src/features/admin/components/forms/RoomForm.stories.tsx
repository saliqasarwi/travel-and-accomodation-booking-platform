import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import RoomForm from "./RoomForm";

const meta = {
  title: "Features/Admin/Forms/RoomForm",
  component: RoomForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    initialValues: {
      roomNumber: 408,
      adultCapacity: 2,
      childrenCapacity: 1,
      availability: true,
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
} satisfies Meta<typeof RoomForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AvailableRoom: Story = {};

export const UnavailableRoom: Story = {
  args: {
    initialValues: {
      roomNumber: 512,
      adultCapacity: 3,
      childrenCapacity: 2,
      availability: false,
    },
  },
};
