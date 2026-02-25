import {
  Card,
  CardContent,
  Divider,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { ReceiptLongRounded } from "@mui/icons-material";
import type { CartItem } from "../../cart/types/cart.types";
import { money, nightsBetween } from "../utils/formatters.ts";

type Props = { items: CartItem[] };

export default function HotelRoomsCard({ items }: Props) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
          <ReceiptLongRounded />
          <Typography variant="h6" fontWeight={900}>
            Hotel & Rooms
          </Typography>
        </Stack>

        <Stack spacing={2}>
          {items.map((item) => {
            const nights = nightsBetween(item.checkInDate, item.checkOutDate);
            const lineTotal =
              item.pricePerNight * nights * (item.numberOfRooms || 1);

            return (
              <Stack key={item.id} spacing={1}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="baseline"
                  gap={2}
                >
                  <Typography fontWeight={900}>
                    {item.hotelName} • {item.roomType}
                  </Typography>
                  <Typography fontWeight={900}>
                    {money(item.pricePerNight)} / night
                  </Typography>
                </Stack>

                <Typography variant="body2" color="text.secondary">
                  {item.cityName}
                  <Rating value={item.starRating} precision={0.5}></Rating>
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {item.checkInDate} → {item.checkOutDate} • {item.adults}{" "}
                  adults • {item.children} children • {item.numberOfRooms}{" "}
                  room(s)
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  {nights} night(s) • total: {money(lineTotal)}
                </Typography>

                <Divider />
              </Stack>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
}
