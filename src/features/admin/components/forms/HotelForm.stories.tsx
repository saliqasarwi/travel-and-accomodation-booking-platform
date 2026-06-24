import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import HotelForm from "./HotelForm";

const meta = {
  title: "Features/Admin/Forms/HotelForm",
  component: HotelForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    initialValues: {
      hotelName: "Azure Bay Resort",
      location: "Tel Aviv waterfront",
      starRating: 5,
      availableRooms: 24,
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
} satisfies Meta<typeof HotelForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {};

export const Empty: Story = {
  args: {
    initialValues: {
      hotelName: "",
      location: "",
      starRating: undefined,
      availableRooms: undefined,
    },
  },
};
