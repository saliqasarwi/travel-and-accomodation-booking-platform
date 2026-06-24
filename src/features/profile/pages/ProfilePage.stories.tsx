import type { Meta, StoryObj } from "@storybook/react-vite";
import ProfilePage from "./ProfilePage";

const meta = {
  title: "Features/Profile/Pages/ProfilePage",
  component: ProfilePage,
  parameters: {
    router: {
      initialEntries: ["/profile"],
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "min(960px, 100vw)" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProfilePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loaded: Story = {};
