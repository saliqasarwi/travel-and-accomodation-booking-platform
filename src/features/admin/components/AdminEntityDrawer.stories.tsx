import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import AdminEntityDrawer from "./AdminEntityDrawer";

const meta = {
  title: "Features/Admin/AdminEntityDrawer",
  component: AdminEntityDrawer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    open: true,
    mode: "create",
    entity: "cities",
    title: "Create city",
    initialValues: {
      name: "Bethlehem",
      country: "Palestine",
      postOffice: "P150",
      numberOfHotels: 8,
    },
    onClose: fn(),
    onSubmit: fn(),
    saving: false,
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: 560, paddingTop: 64 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AdminEntityDrawer>;

export default meta;
type Story = StoryObj<typeof AdminEntityDrawer>;

export const CityDrawer: Story = {};

export const HotelDrawer: Story = {
  args: {
    entity: "hotels",
    title: "Edit hotel",
    mode: "edit",
    initialValues: {
      hotelName: "Carmel Garden Suites",
      location: "Haifa",
      starRating: 4,
      availableRooms: 18,
    },
  },
};

export const RoomDrawerSaving: Story = {
  args: {
    entity: "rooms",
    title: "Edit room",
    mode: "edit",
    initialValues: {
      roomNumber: 302,
      adultCapacity: 2,
      childrenCapacity: 2,
      availability: true,
    },
    saving: true,
  },
};
