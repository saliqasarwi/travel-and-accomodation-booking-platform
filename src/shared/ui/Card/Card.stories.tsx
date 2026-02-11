import type { Meta, StoryObj } from "@storybook/react-vite";
import AppCard from "./AppCard.tsx";
import { Typography } from "@mui/material";

const meta: Meta<typeof AppCard> = {
  title: "Shared/Card",
  component: AppCard,
};
export default meta;

type Story = StoryObj<typeof AppCard>;

export const Basic: Story = {
  render: () => (
    <AppCard>
      <Typography variant="h6">Card title</Typography>
      <Typography variant="body2">content inside the card.</Typography>
    </AppCard>
  ),
};
export const Colored: Story = {
  render: () => (
    <AppCard
      sx={{ color: "crimson", background: "pink", borderRadius: "10px" }}
    >
      <Typography variant="h6">Card title</Typography>
      <Typography variant="body2">content inside the card.</Typography>
    </AppCard>
  ),
};
