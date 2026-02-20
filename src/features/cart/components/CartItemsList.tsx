import { Stack, Typography } from "@mui/material";
import { useCart } from "../useCart";

export default function CartItemsList() {
  const { state } = useCart();
  const items = state.items;
  if (items.length === 0) {
    return <Typography color="text.secondary">Your cart is empty.</Typography>;
  }

  return (
    <Stack spacing={2}>
      {items.map((room) => (
        <Typography key={room.id}>
          {room.hotelName} — {room.roomType}
        </Typography>
      ))}
    </Stack>
  );
}
