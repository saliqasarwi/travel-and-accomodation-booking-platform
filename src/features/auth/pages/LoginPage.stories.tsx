import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { AuthContext } from "@app/providers/AuthContext";
import LoginPage from "./LoginPage";

const meta = {
  title: "Features/Auth/Pages/LoginPage",
  component: LoginPage,
  parameters: {
    layout: "fullscreen",
    router: {
      initialEntries: ["/login"],
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <AuthContext.Provider
        value={{
          token: null,
          userType: null,
          isAuthenticated: false,
          setSession: fn(),
          logout: fn(),
        }}
      >
        <Story />
      </AuthContext.Provider>
    ),
  ],
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
