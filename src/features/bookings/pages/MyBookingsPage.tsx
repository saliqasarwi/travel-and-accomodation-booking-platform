import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getBookings, type BookingItem } from "../api/bookings.api";
import { money } from "@shared/utils/formatters";
import { nightsBetween } from "@shared/utils/booking";
import EmptyBookingsState from "../components/EmptyBookingsState";

export default function BookingsPage() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadBookings() {
      try {
        setLoading(true);
        setErrorMessage("");
        const data = await getBookings();

        const sorted = [...data].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setBookings(sorted);
      } catch (error) {
        console.error(error);
        setErrorMessage("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, []);

  if (loading) {
    return (
      <Box sx={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Stack
      spacing={3}
      sx={{
        px: { xs: 2, md: 4, lg: 6 },
        py: { xs: 2, md: 3 },
      }}
    >
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "2rem", md: "2.5rem" },
            lineHeight: 1.05,
            background: "linear-gradient(135deg, #1565C0 0%, #0F9D94 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 0.75,
          }}
        >
          My Bookings
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Review your confirmed bookings.
        </Typography>

        <Box
          sx={{
            width: 72,
            height: 4,
            borderRadius: 999,
            background: "linear-gradient(135deg, #1565C0 0%, #0F9D94 100%)",
          }}
        />
      </Box>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      {bookings.length === 0 ? (
        <EmptyBookingsState />
      ) : (
        <Grid container spacing={3}>
          {bookings.map((booking) => {
            const firstItem = booking.request.items[0];
            const total = booking.request.items.reduce((sum, item) => {
              const nights = nightsBetween(item.checkInDate, item.checkOutDate);
              return (
                sum + item.pricePerNight * (item.numberOfRooms || 1) * nights
              );
            }, 0);

            return (
              <Grid key={booking.bookingId} size={{ xs: 12, md: 6, xl: 4 }}>
                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.25,
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={2}
                  >
                    <Box>
                      <Typography variant="h6" fontWeight={800}>
                        {firstItem?.hotelName ?? "Booking"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {booking.confirmationNumber}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        px: 1.25,
                        py: 0.5,
                        borderRadius: 99,
                        bgcolor: "rgba(21,101,192,0.08)",
                        color: "primary.main",
                        fontWeight: 700,
                      }}
                    >
                      {booking.bookingStatus}
                    </Typography>
                  </Stack>

                  <Typography variant="body2" color="text.secondary">
                    Created: {new Date(booking.createdAt).toLocaleString()}
                  </Typography>

                  {firstItem && (
                    <>
                      <Typography variant="body2" color="text.secondary">
                        {firstItem.roomType} • {firstItem.cityName}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {firstItem.checkInDate} → {firstItem.checkOutDate}
                      </Typography>

                      <Typography variant="body2" color="text.secondary">
                        {booking.request.items.length} room selection
                        {booking.request.items.length !== 1 ? "s" : ""}
                      </Typography>
                    </>
                  )}

                  <Box sx={{ flexGrow: 1 }} />

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ pt: 1 }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight={800}
                      color="primary.main"
                    >
                      {money(total)}
                    </Typography>

                    <Button
                      variant="outlined"
                      onClick={() =>
                        navigate(`/confirmation/${booking.bookingId}`)
                      }
                      sx={{ fontWeight: 700 }}
                    >
                      View details
                    </Button>
                  </Stack>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Stack>
  );
}
