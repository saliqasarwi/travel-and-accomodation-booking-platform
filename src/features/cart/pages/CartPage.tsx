import { Stack, Typography, Divider } from "@mui/material";
import CartItemsList from "../components/CartItemsList";
import CartSummary from "../components/CartSummary";
export default function CartPage() {
  return (
    <Stack spacing={3}>
      <Stack spacing={0.5}>
        <Typography variant="h4" fontWeight={800}>
          Cart
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Review selected rooms before checkout.
        </Typography>
      </Stack>

      <Divider />

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        alignItems="flex-start"
      >
        <Stack flex={1}>
          <CartItemsList />
        </Stack>

        <Stack width={{ xs: "100%", md: 360 }}>
          <CartSummary />
        </Stack>
      </Stack>
    </Stack>
  );
}
