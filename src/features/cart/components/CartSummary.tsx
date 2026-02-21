import { Stack, Typography, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../useCart";

export default function CartSummary() {
  const navigate = useNavigate();
  const { state } = useCart();
  const items = state.items;
  const subtotal = items.reduce(
    (sum, item) => sum + item.pricePerNight * (item.numberOfRooms ?? 1),
    0
  );
  const totalDiscount = items.reduce((sum, item) => {
    const itemPrice = item.pricePerNight * (item.numberOfRooms ?? 1);
    const discountPercentage = item.discount ?? 0;
    const discountAmount = itemPrice * (discountPercentage / 100);
    return sum + discountAmount;
  }, 0);

  const total = Math.max(0, subtotal - totalDiscount);
  return (
    <Stack
      spacing={2}
      sx={{
        p: 2,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography fontWeight={800}>Booking Summary</Typography>
      <Stack direction="row" justifyContent="space-between">
        <Typography color="text.secondary">Subtotal</Typography>
        <Typography>${subtotal.toFixed(2)}</Typography>
      </Stack>

      <Stack direction="row" justifyContent="space-between">
        <Typography color="text.secondary">Discount</Typography>
        <Typography>${totalDiscount.toFixed(2)}</Typography>
      </Stack>

      <Divider />

      <Stack direction="row" justifyContent="space-between">
        <Typography fontWeight={900}>Total</Typography>
        <Typography fontWeight={900}>${total.toFixed(2)}</Typography>
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
