import {
  Stack,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Rating,
  IconButton,
} from "@mui/material";
import { useCart } from "../useCart";
import DeleteIcon from "@mui/icons-material/Delete";
export default function CartItemsList() {
  const { state, removeItem } = useCart();
  const items = state.items;
  if (items.length === 0) {
    return <Typography color="text.secondary">Your cart is empty.</Typography>;
  }

  return (
    <Stack spacing={2}>
      {items.map((item) => (
        <Card key={item.id} sx={{ borderRadius: 3, overflow: "hidden" }}>
          <Stack direction={{ xs: "column", md: "row" }}>
            <CardMedia
              component="img"
              image={item.roomPhotoUrl}
              alt={item.roomType}
              sx={{
                width: { md: 260 },
                height: 200,
                objectFit: "cover",
              }}
            />

            <CardContent
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Stack spacing={1}>
                <Typography
                  variant="h6"
                  fontWeight={900}
                  sx={{ display: "flex" }}
                >
                  {item.hotelName}
                  <Rating
                    value={item.starRating}
                    precision={0.1}
                    readOnly
                    size="medium"
                    sx={{ color: "gold" }}
                  />
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {item.roomType} • {item.cityName}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {item.checkInDate} → {item.checkOutDate}
                </Typography>
              </Stack>

              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6" fontWeight={900}>
                  ${item.pricePerNight} / night
                </Typography>

                <IconButton
                  size="large"
                  color="error"
                  onClick={() => removeItem(item.id)}
                >
                  <DeleteIcon sx={{ fontSize: 32 }} />
                </IconButton>
              </Stack>
            </CardContent>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}
