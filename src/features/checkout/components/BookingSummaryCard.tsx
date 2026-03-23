import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon from "@mui/icons-material/People";
import HotelIcon from "@mui/icons-material/Hotel";
import { useCart } from "@features/cart/useCart";
import { calculateBookingTotals, nightsBetween } from "@shared/utils/booking";
import { money } from "@shared/utils/formatters";

export default function BookingSummaryCard() {
  const { state, totalItems } = useCart();
  const items = state.items;

  const { subtotal, discounts, total } = calculateBookingTotals(items);

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
        bgcolor: "background.paper",
      }}
    >
      <CardContent sx={{ p: 2.25 }}>
        <Stack spacing={2}>
          <Stack spacing={0.25}>
            <Typography variant="h6" fontWeight={800}>
              Booking summary
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {totalItems} item{totalItems === 1 ? "" : "s"} in cart
            </Typography>
          </Stack>

          <Divider />

          <Stack spacing={1.25}>
            {items.map((item) => {
              const roomsCount = item.numberOfRooms || 1;
              const nights = nightsBetween(item.checkInDate, item.checkOutDate);
              const itemTotal = item.pricePerNight * roomsCount * nights;

              return (
                <Box
                  key={item.id}
                  sx={{
                    p: 1.25,
                    borderRadius: 1.5,
                    bgcolor: "action.hover",
                  }}
                >
                  <Stack spacing={0.75}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      spacing={1}
                    >
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="body2" fontWeight={700} noWrap>
                          {item.hotelName}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          noWrap
                        >
                          {item.roomType} • {roomsCount} room
                          {roomsCount === 1 ? "" : "s"}
                        </Typography>
                      </Box>

                      <Typography
                        variant="body2"
                        fontWeight={700}
                        whiteSpace="nowrap"
                      >
                        {money(itemTotal)}
                      </Typography>
                    </Stack>

                    <Stack spacing={0.35}>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <CalendarMonthIcon
                          sx={{ fontSize: 14, color: "text.secondary" }}
                        />
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          noWrap
                        >
                          {item.checkInDate} → {item.checkOutDate}
                        </Typography>
                      </Stack>

                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <PeopleIcon
                          sx={{ fontSize: 14, color: "text.secondary" }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {item.adults} adult{item.adults !== 1 ? "s" : ""} •{" "}
                          {item.children} child
                          {item.children !== 1 ? "ren" : ""}
                        </Typography>
                      </Stack>

                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <HotelIcon
                          sx={{ fontSize: 14, color: "text.secondary" }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {roomsCount} room{roomsCount !== 1 ? "s" : ""} •{" "}
                          {nights} night{nights !== 1 ? "s" : ""}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Box>
              );
            })}
          </Stack>

          <Divider />

          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Subtotal
              </Typography>
              <Typography variant="body2" fontWeight={700}>
                {money(subtotal)}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Discounts
              </Typography>
              <Typography variant="body2" fontWeight={700}>
                -{money(discounts)}
              </Typography>
            </Stack>

            <Divider />

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" fontWeight={800}>
                Total
              </Typography>
              <Typography variant="subtitle1" fontWeight={800}>
                {money(total)}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
