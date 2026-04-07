import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Alert,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import HomeRounded from "@mui/icons-material/HomeRounded";
import PrintRounded from "@mui/icons-material/PrintRounded";
import { getBookingDetails } from "../api/confirmation.api";
import type { BookingApiResponse } from "../types/confirmation.types";
import ConfirmationHeaderCard from "../components/ConfirmationHeaderCard";
import HotelRoomsCard from "../components/HotelRoomsCard";
import GuestInfoCard from "../components/GuestInfoCard";
import SpecialRequestsCard from "../components/SpecialRequestCard";
import { calculateBookingTotals } from "@shared/utils/booking";
import TotalsCard from "../components/TotalsCard";
import { printBookingDocument } from "../components/printBookingDocument";
export default function ConfirmationPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState<BookingApiResponse | null>(null);

  useEffect(() => {
    let alive = true;

    async function run() {
      try {
        setLoading(true);
        setError(null);

        const id = Number(bookingId);
        if (!bookingId || Number.isNaN(id))
          throw new Error("Invalid booking id");

        const data = await getBookingDetails(id);
        if (!alive) return;

        setBooking(data);
      } catch (e) {
        if (!alive) return;
        setError(e instanceof Error ? e.message : "Failed to load booking");
      } finally {
        if (alive) setLoading(false);
      }
    }

    run();
    return () => {
      alive = false;
    };
  }, [bookingId]);

  if (loading) {
    return (
      <Stack alignItems="center" mt={8} spacing={2}>
        <CircularProgress />
        <Typography color="text.secondary">Loading confirmation…</Typography>
      </Stack>
    );
  }

  if (error || !booking) {
    return (
      <Stack spacing={2} mt={3}>
        <Alert severity="error">{error ?? "Booking not found"}</Alert>
        <Button
          startIcon={<HomeRounded />}
          variant="contained"
          onClick={() => navigate("/")}
          sx={{ width: "fit-content" }}
        >
          Back to Home
        </Button>
      </Stack>
    );
  }

  const { subtotal, discounts, total } = calculateBookingTotals(
    booking.request.items
  );

  return (
    <Box
      sx={{
        px: { xs: 2, md: 4, lg: 6 },
        py: { xs: 2.5, md: 4 },
      }}
    >
      <Stack spacing={3}>
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
            Confirmation
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Your booking has been confirmed successfully.
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
        <Grid container spacing={3} alignItems="stretch">
          <Grid size={{ xs: 12, lg: 8 }}>
            <ConfirmationHeaderCard
              confirmationNumber={booking.confirmationNumber}
              status={booking.bookingStatus}
              createdAt={booking.createdAt}
            />
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <Card
              sx={{
                borderRadius: 3,
                height: "100%",
                border: "1px solid",
                borderColor: "divider",
                boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
              }}
            >
              <CardContent
                sx={{
                  p: { xs: 2, md: 3 },
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Stack spacing={1.5}>
                  <Button
                    variant="contained"
                    startIcon={<PrintRounded />}
                    onClick={() => printBookingDocument(booking)}
                    fullWidth
                    sx={{ fontWeight: 700, borderRadius: 2 }}
                  >
                    Print Booking
                  </Button>

                  <Button
                    variant="outlined"
                    startIcon={<HomeRounded />}
                    onClick={() => navigate("/")}
                    fullWidth
                    sx={{ fontWeight: 700, borderRadius: 2 }}
                  >
                    Back to Home
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, lg: 8 }}>
            <HotelRoomsCard items={booking.request.items} />
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <Box
              sx={{
                position: { lg: "sticky" },
                top: { lg: 96 },
              }}
            >
              <TotalsCard
                subtotal={subtotal}
                discounts={discounts}
                total={total}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <GuestInfoCard guest={booking.request.guestInfo} />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <SpecialRequestsCard notes={booking.request.specialRequests} />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
