import { Stack, Typography, Divider, Button } from "@mui/material";
import CartItemsList from "../components/CartItemsList";
import { useNavigate } from "react-router-dom";
import { useCart } from "../useCart";
export default function CartPage() {
  const navigate = useNavigate();
  const { state } = useCart();
  const items = state.items;
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

      <Stack direction="row" spacing={3}>
        <Stack flex={1}>
          <CartItemsList />
        </Stack>
      </Stack>
      <Button
        variant="contained"
        size="large"
        disabled={items.length === 0}
        onClick={() => navigate("/checkout")}
      >
        Proceed to checkout
      </Button>
    </Stack>
  );
}
