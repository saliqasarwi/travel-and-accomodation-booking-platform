import { Stack, Typography, Card, CardContent, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../useCart";
export default function CartPage() {
  const { state } = useCart();
  const navigate = useNavigate();
  if (!state.items.length) {
    return (
      <Stack spacing={3}>
        <Typography variant="h4" fontWeight={800}>
          Cart
        </Typography>

        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography fontWeight={700}>Your cart is empty.</Typography>

            <Typography variant="body2" color="text.secondary">
              Add a room from any hotel page.
            </Typography>

            <Button
              sx={{ mt: 2 }}
              variant="contained"
              onClick={() => navigate("/")}
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </Stack>
    );
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h4" fontWeight={800}>
        Cart
      </Typography>

      {state.items.map((item, index) => (
        <Card key={index} sx={{ borderRadius: 3 }}>
          <CardContent>
            <Stack spacing={1}>
              <Typography fontWeight={800}>{item.hotelName}</Typography>

              <Typography variant="body2" color="text.secondary">
                {item.roomType}
              </Typography>

              <Typography>${item.pricePerNight} / night</Typography>
            </Stack>
          </CardContent>
        </Card>
      ))}

      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("/checkout")}
      >
        Proceed to Checkout
      </Button>
    </Stack>
  );
}
