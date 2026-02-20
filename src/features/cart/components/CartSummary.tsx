import { Stack, Typography, Button } from "@mui/material";
import { useCart } from "../useCart";

export default function CartSummary() {
  const { totalItems } = useCart();

  return (
    <Stack spacing={2}>
      <Typography fontWeight={800}>Summary</Typography>
      <Typography color="text.secondary">Items: {totalItems}</Typography>
      <Button variant="contained">Proceed to checkout</Button>
    </Stack>
  );
}
