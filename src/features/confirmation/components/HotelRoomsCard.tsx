import {
  Card,
  CardContent,
  Divider,
  Rating,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { ReceiptLongRounded } from "@mui/icons-material";
import type { CartItem } from "../../cart/types/cart.types";
import { money } from "@shared/utils/formatters";
import { nightsBetween } from "@shared/utils/booking";

type Props = { items: CartItem[] };

export default function HotelRoomsCard({ items }: Props) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
      }}
    >
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Stack direction="row" spacing={1} alignItems="center" mb={2}>
          <ReceiptLongRounded />
          <Typography variant="h6" fontWeight={900}>
            Hotel & Rooms
          </Typography>
        </Stack>

        <Stack spacing={2}>
          {items.map((item, index) => {
            const nights = nightsBetween(item.checkInDate, item.checkOutDate);
            const lineTotal =
              item.pricePerNight * nights * (item.numberOfRooms || 1);

            return (
              <Box
                key={item.id}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "action.hover",
                }}
              >
                <Stack spacing={1}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ sm: "flex-start" }}
                    gap={1}
                  >
                    <Box>
                      <Typography fontWeight={900}>
                        {item.hotelName} • {item.roomType}
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        flexWrap="wrap"
                        useFlexGap
                        sx={{ mt: 0.5 }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {item.cityName}
                        </Typography>
                        <Rating
                          value={item.starRating}
                          precision={0.5}
                          readOnly
                          size="small"
                        />
                      </Stack>
                    </Box>

                    <Typography fontWeight={900} whiteSpace="nowrap">
                      {money(item.pricePerNight)} / night
                    </Typography>
                  </Stack>

                  <Typography variant="body2" color="text.secondary">
                    {item.checkInDate} → {item.checkOutDate} • {item.adults}{" "}
                    adults • {item.children} children • {item.numberOfRooms}{" "}
                    room(s)
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {nights} night(s) • total: {money(lineTotal)}
                  </Typography>
                </Stack>

                {index !== items.length - 1 && <Divider sx={{ mt: 2 }} />}
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
}
