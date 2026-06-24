import type { Meta, StoryObj } from "@storybook/react-vite";
import HotelGallery from "./HotelGallery";

const image = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

const meta = {
  title: "Features/Hotel/HotelGallery",
  component: HotelGallery,
  tags: ["autodocs"],
  args: {
    items: [
      { url: image("photo-1566073771259-6a8506099945") },
      { url: image("photo-1551882547-ff40c63fe5fa") },
      { url: image("photo-1578683010236-d716f9a3f461") },
      { url: image("photo-1590490360182-c33d57733427") },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ width: "min(860px, 100vw)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HotelGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {};
