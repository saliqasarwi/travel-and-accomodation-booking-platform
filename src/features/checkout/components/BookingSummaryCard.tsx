import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon from "@mui/icons-material/People";
import HotelIcon from "@mui/icons-material/Hotel";
import { useCart } from "@features/cart/useCart";

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function BookingSummaryCard() {
  const { state, totalItems } = useCart();
  const items = state.items;

  const subtotal = items.reduce((sum, item) => {
    const roomsCount = item.numberOfRooms || 1;
    return sum + item.pricePerNight * roomsCount;
  }, 0);

  const discounts = items.reduce((sum, item) => {
    const itemPrice = item.pricePerNight * (item.numberOfRooms ?? 1);
    const discountPercentage = item.discount ?? 0;
    const discountAmount = itemPrice * (discountPercentage / 100);
    return sum + discountAmount;
  }, 0);

  const total = Math.max(0, subtotal - discounts);

  return (
    <Card sx={{ borderRadius: 3, position: "sticky", top: 88 }}>
      <CardContent>
        <Stack spacing={2}>
          <Stack spacing={0.5}>
            <Typography variant="h6" fontWeight={800}>
              Booking summary
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {totalItems} item{totalItems === 1 ? "" : "s"} in cart
            </Typography>
          </Stack>

          <Divider />

          <Stack spacing={1.5}>
            {items.slice(0, 3).map((item) => (
              <Stack key={item.id} spacing={0.5}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                >
                  <Stack sx={{ minWidth: 0 }}>
                    <Typography variant="body2" fontWeight={700} noWrap>
                      {item.hotelName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {item.roomType} • {item.numberOfRooms} room
                      {item.numberOfRooms === 1 ? "" : "s"}
                    </Typography>
                  </Stack>

                  <Typography
                    variant="body2"
                    fontWeight={700}
                    whiteSpace="nowrap"
                  >
                    {formatMoney(
                      item.pricePerNight * (item.numberOfRooms || 1)
                    )}
                  </Typography>
                </Stack>

                <Stack spacing={0.25} sx={{ pl: 0.5 }}>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <CalendarMonthIcon
                      sx={{ fontSize: 14, color: "text.secondary" }}
                    />
                    <Typography variant="caption" color="text.secondary">
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
                    <HotelIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                    <Typography variant="caption" color="text.secondary">
                      {item.numberOfRooms} room
                      {item.numberOfRooms !== 1 ? "s" : ""}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            ))}

            {items.length > 3 && (
              <Typography variant="caption" color="text.secondary">
                +{items.length - 3} more…
              </Typography>
            )}
          </Stack>

          <Divider />

          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Subtotal
              </Typography>
              <Typography variant="body2" fontWeight={700}>
                {formatMoney(subtotal)}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Discounts
              </Typography>
              <Typography variant="body2" fontWeight={700}>
                -{formatMoney(discounts)}
              </Typography>
            </Stack>

            <Divider />

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" fontWeight={800}>
                Total
              </Typography>
              <Typography variant="subtitle1" fontWeight={800}>
                {formatMoney(total)}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
